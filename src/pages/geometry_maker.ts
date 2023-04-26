import { Canvas } from "../lib/Canvas";
import { Vector, VectorMath } from "../lib/Vector";

const c = new Canvas();
c.enableMouseOver();
class Point {
  selected: boolean = false;
  size: number = 3;
  constructor(public pos: Vector) {}
  public draw(c: Canvas) {
    c.start();
    c.arc(this.pos, this.selected ? this.size * 2 : this.size);
    c.fill(this.selected ? "rgba(255,0,0,0.1)" : "rgba(0,0,0,1)");
    c.end();
    if (this.selected) {
      c.text(`${this.pos.x}, ${this.pos.y}`, this.pos, -10, -10);
    }
  }
  public update(m: Vector) {
    if (this.pos.distance(m) < this.size * 4) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }
}
const bodies: Point[][] = [];

let points: Point[] = [];
function animate() {
  c.clearAll();
  c.addGridLines();
  c.start();
  c.arc(c.mouse, 10);
  c.fill("rgba(0,0,0,0.1)");
  c.end();
  if (c.mouse.w == 1) {
    const newPoint: Point = new Point(c.mouse.clone());
    if (points.length > 1) {
      if(newPoint.pos.distance(points[points.length-1].pos)<10){
        newPoint.pos = points[points.length-1].pos.clone();
        points.push(newPoint);
        bodies.push(points.map((p) => p))
        points=[]
        console.log("Body", bodies)
      }else{
          points.push(newPoint);
      }
    }else{
        points.push(newPoint);
    }
  }
  if (points.length > 0) {
    for (let i = 0; i < points.length - 1; i++) {
      const p = points[i];
      const p1 = points[i + 1];
      c.start();
      c.line(p.pos, p1.pos);
      c.stroke("rgba(0,0,0,1)");
      c.end();
      p.update(c.mouse);
      p.draw(c);
    }
    points[points.length - 1].update(c.mouse);
    points[points.length - 1].draw(c);
    const avg = new Vector();
    const center = VectorMath.getAverageVector(points.map((p) => p.pos));
    c.start();
    c.arc(center, 10);
    c.fill("rgba(0,255,0,0.1)");
    c.end();
  }
  if (bodies.length > 0) {
    bodies.forEach((p: Point[]) => {
      for (let i = 0; i < p.length - 1; i++) {
        const p0 = p[i];
        const p1 = p[i + 1];
        c.start();
        c.line(p0.pos, p1.pos);
        c.stroke("rgba(0,0,0,1)");
        c.end();
        p0.update(c.mouse);
        p0.draw(c);
      }
      p[p.length - 1].update(c.mouse);
      p[p.length - 1].draw(c);
      const avg = new Vector();
      const center = VectorMath.getAverageVector(p.map((p0) => p0.pos));
      c.start();
      c.arc(center, 10);
      c.fill("rgba(0,255,0,0.1)");
      c.end();
    });
  }
  requestAnimationFrame(animate);
}

animate();
