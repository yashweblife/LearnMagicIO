import { Canvas, Color } from "../../lib/Canvas";
import { Vector } from "../../lib/Vector";
import { Face } from "../../lib/Vector/Face";
import { Line } from "../../lib/Vector/Line";

export class Cube {
  public front: Face;
  public back: Face;
  public left: Face;
  public right: Face;
  public top: Face;
  public bottom: Face;
  public size:Vector=new Vector();
  public pos:Vector=new Vector();
  public vel:Vector=new Vector();
  public acc:Vector=new Vector();
  public rotation:Vector = new Vector();
  public r_vel:Vector = new Vector();
  public r_acc:Vector = new Vector();

  constructor() {
    this.front = new Face([
      new Line(new Vector(-1, -1, 1), new Vector(1, -1, 1)),
      new Line(new Vector(1, -1, 1), new Vector(1, 1, 1)),
      new Line(new Vector(1, 1, 1), new Vector(-1, 1, 1)),
      new Line(new Vector(-1, 1, 1), new Vector(-1, -1, 1)),
    ]);
    this.left = new Face([
        new Line(new Vector(-1, -1, 1), new Vector(-1, -1, -1)),
        new Line(new Vector(-1, -1, -1), new Vector(-1, 1, -1)),
        new Line(new Vector(-1, 1, -1), new Vector(-1, 1, 1)),
        new Line(new Vector(-1, 1, 1), new Vector(-1, -1, 1)),
    ]);
    this.back = new Face([
        new Line(new Vector(-1, -1, -1), new Vector(1, -1, -1)),
        new Line(new Vector(1, -1, -1), new Vector(1, 1, -1)),
        new Line(new Vector(1, 1, -1), new Vector(-1, 1, -1)),
        new Line(new Vector(-1, 1, -1), new Vector(-1, -1, -1)),
    ])
    this.right = new Face([
        new Line(new Vector(1, -1, 1), new Vector(1, -1, -1)),
        new Line(new Vector(1, -1, -1), new Vector(1, 1, -1)),
        new Line(new Vector(1, 1, -1), new Vector(1, 1, 1)),
        new Line(new Vector(1, 1, 1), new Vector(1, -1, 1)),
    ])
    this.top = new Face([
        new Line(new Vector(1, -1, 1), new Vector(-1, -1, 1)),
        new Line(new Vector(-1, -1, 1), new Vector(-1, -1, -1)),
        new Line(new Vector(-1, -1, -1), new Vector(1, -1, -1)),
        new Line(new Vector(1, -1, -1), new Vector(1, -1, 1)),
    ])
    this.bottom = new Face([
        new Line(new Vector(1, 1, 1), new Vector(-1, 1, 1)),
        new Line(new Vector(-1, 1, 1), new Vector(-1, 1, -1)),
        new Line(new Vector(-1, 1, -1), new Vector(1, 1, -1)),
        new Line(new Vector(1, 1, -1), new Vector(1, 1, 1)),
    ])
  }
}

function demo3() {
  const dom = document.querySelector("#demo1")! as HTMLElement;
  dom.innerHTML = "";
  const c = new Canvas({ parent: dom, size: new Vector(300, 300) });

  c.enableMouseOver();
  c.setDepth(300);

  const cube = [
    new Face([
      new Line(new Vector(-1, -1, 1), new Vector(1, -1, 1)),
      new Line(new Vector(1, -1, 1), new Vector(1, 1, 1)),
      new Line(new Vector(1, 1, 1), new Vector(-1, 1, 1)),
      new Line(new Vector(-1, 1, 1), new Vector(-1, -1, 1)),
    ]),
    new Face([
      new Line(new Vector(-1, -1, -1), new Vector(1, -1, -1)),
      new Line(new Vector(1, -1, -1), new Vector(1, 1, -1)),
      new Line(new Vector(1, 1, -1), new Vector(-1, 1, -1)),
      new Line(new Vector(-1, 1, -1), new Vector(-1, -1, -1)),
    ]),
    new Face([
      new Line(new Vector(-1, -1, 1), new Vector(-1, -1, -1)),
      new Line(new Vector(-1, -1, -1), new Vector(-1, 1, -1)),
      new Line(new Vector(-1, 1, -1), new Vector(-1, 1, 1)),
      new Line(new Vector(-1, 1, 1), new Vector(-1, -1, 1)),
    ]),
    new Face([
      new Line(new Vector(1, -1, 1), new Vector(1, -1, -1)),
      new Line(new Vector(1, -1, -1), new Vector(1, 1, -1)),
      new Line(new Vector(1, 1, -1), new Vector(1, 1, 1)),
      new Line(new Vector(1, 1, 1), new Vector(1, -1, 1)),
    ]),
    new Face([
      new Line(new Vector(1, 1, 1), new Vector(-1, 1, 1)),
      new Line(new Vector(-1, 1, 1), new Vector(-1, 1, -1)),
      new Line(new Vector(-1, 1, -1), new Vector(1, 1, -1)),
      new Line(new Vector(1, 1, -1), new Vector(1, 1, 1)),
    ]),
    new Face([
      new Line(new Vector(1, -1, 1), new Vector(-1, -1, 1)),
      new Line(new Vector(-1, -1, 1), new Vector(-1, -1, -1)),
      new Line(new Vector(-1, -1, -1), new Vector(1, -1, -1)),
      new Line(new Vector(1, -1, -1), new Vector(1, -1, 1)),
    ]),
  ];
  cube.forEach((face: Face) => {
    face.setCenter(c.size.x / 2, c.size.y / 2, 0);
    face.setScale(50);
    face.setAngle(1, 1, 0);
    face.setColor(new Color(255, 0, 0, 1));
  });
  let ax = 0;
  let s = 10;
  let ds = 0.1;
  function update() {
    c.clearAll();
    c.addGridLines();
    cube.sort((face: Face, face1: Face) => face1.getMaxZ() - face.getMaxZ());
    ax += 0.01;
    if (s > 50) {
      s = 50;
      ds = -ds;
    }
    if (s < 10) {
      s = 10;
      ds = -ds;
    }
    s += ds;
    cube.forEach((face: Face) => {
      face.setAngle(ax, 45 * (Math.PI / 180), 0);
      face.setScale(s);
      face.drawLines(c);
      face.drawFace(c);
    });
    requestAnimationFrame(update);
  }

  update();
}
