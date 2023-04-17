import { Canvas } from "../lib/Canvas/Canvas";
import { Vector } from "../lib/Vector/Vector";

class Ball {
  public pos: Vector = new Vector();
  public vel: Vector = new Vector();
  public acc: Vector = new Vector();
  public color: string = "red";
  public size: number = Math.random() * 20 + 5;

  constructor() {
    this.pos.x = Math.random() * 300;
    this.pos.y = Math.random() * 300;
  }

  public draw(c: Canvas): void {
    c.start();
    c.arc(this.pos, this.size);
    c.fill(this.color);
    c.end();
  }

  public update(): void {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
}

export class GravityDemo {
  public canvas: Canvas;

  public balls: Ball[] = [];

  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas({
      parent: parent,
      size: new Vector(300, 300),
    });

    for (let i = 0; i < 10; i++) {
      const b = new Ball();
      b.acc.y = 0.05;
      this.balls.push(b);
    }
  }
  public update(){
    this.canvas.clearAll();
    this.balls.forEach((b:Ball)=>{
      b.update()
      b.draw(this.canvas)
    })
  }
}

const gd = new GravityDemo(document.querySelector("#app") as HTMLElement);

function animate(){
  gd.update();
  requestAnimationFrame(animate)
}
animate();