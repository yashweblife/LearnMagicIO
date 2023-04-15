import "md-block";
import { Ball } from "../lib/Ball/Ball";
import { Canvas, Color } from "../lib/Canvas";
import { Face } from "../lib/Vector/Face";
import { Line } from "../lib/Vector/Line";
import { Vector } from "../lib/Vector/Vector";
import "../styles/article.scss";
import "../styles/common.scss";
import "./article";

function demo1() {
  const dom = document.querySelector("#demo1")! as HTMLElement;
  dom.innerHTML="";
  const c = new Canvas({ parent: dom, size: new Vector(300, 300) });

  c.enableMouseOver();
  c.setDepth(300);

  const b1 = new Ball(new Vector(c.size.x / 2, c.size.y / 2, 150));
  const b: Ball[] = [];

  for (let i = 0; i < 10; i++) {
    const ball = new Ball();
    ball.setSize(Math.random() * 20 + 10);
    ball.setColor(
      `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},${1})`
    );
    ball.setVel(0, 0);
    b.push(ball);
  }

  b1.setSize(10);

  let play_status = true;

  function update() {
    if (!play_status) return;
    c.background("rgba(255,255,255,1");
    c.addGridLines(20, 20);
    b1.setPos(c.mouse.x, c.mouse.y);
    for (let i = 0; i < b.length; i++) {
      let ball = b[i];
      for (let j = 0; j < b.length; j++) {
        let ball1 = b[j];
        if (i != j) {
          if (ball.pos.distance(ball1.pos) > 0 + (ball.size + ball1.size)) {
            ball.attract(ball1, 2);
          } else {
            ball.repel(ball1, 3);
            ball.vel.mul(0.9);
            ball.acc.mul(0);
          }
        }
      }
      ball.attract(b1);
      ball.update();
      ball.bound(0, 0, 0, c.size.x, c.size.y, c.depth);
    }
    b.sort((a: Ball, b: Ball) => {
      if (a.pos.z < b.pos.z) {
        return -1;
      }
      if (a.pos.z > b.pos.z) {
        return 1;
      }
      return 0;
    });
    b.forEach((ball: Ball) => {
      ball.draw(c);
    });
    b1.draw(c);
    requestAnimationFrame(update);
  }

  update();
}
function demo2() {
  const dom = document.querySelector("#demo1")! as HTMLElement;
  dom.innerHTML="";
  const c = new Canvas({ parent: dom, size: new Vector(300, 300) });

  c.enableMouseOver();
  c.setDepth(300);

  const b1 = new Ball(new Vector(c.size.x / 2, c.size.y / 2, 150));
  const b: Ball[] = [];

  for (let i = 0; i < 10; i++) {
    const ball = new Ball(new Vector(i * 10, 10));
    ball.setSize(5);
    ball.setAcc(0, 0.8);
    ball.setColor(
      `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},${1})`
    );
    ball.setVel(0, 0);
    b.push(ball);
  }

  b1.setSize(10);

  let play_status = true;

  function update() {
    if (!play_status) return;
    c.background("rgba(255,255,255,1");
    c.addGridLines(20, 20);
    b1.setPos(c.mouse.x, c.mouse.y);
    for (let i = 0; i < b.length; i++) {
      let ball = b[i];
      ball.setAcc(0, 0.8);
      for (let j = 0; j < b.length; j++) {
        let ball1 = b[j];
        if (i != j) {
          if (ball.pos.distance(ball1.pos) <= ball.size + ball1.size) {
            ball.repel(ball1);
            ball.vel.mul(0.5);
          }
        }
      }
      ball.update();
      ball.acc.mul(0);
      ball.bound(0, 0, 0, c.size.x, c.size.y, c.depth);
      ball.draw(c);
    }
    requestAnimationFrame(update);
  }

  update();
}

function demo3() {
  const dom = document.querySelector("#demo1")! as HTMLElement;
  dom.innerHTML="";
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
demo1();
const b1 = document.querySelector("#demo1-1") as HTMLButtonElement;
const b2 = document.querySelector("#demo1-2") as HTMLButtonElement;
const b3 = document.querySelector("#demo1-3") as HTMLButtonElement;
b1.addEventListener("click", () => {
  b1.classList.add("selected");
  b2.classList.remove("selected");
  b3.classList.remove("selected");
  demo1();
});
b2.addEventListener("click", () => {
  b2.classList.add("selected");
  b1.classList.remove("selected");
  b3.classList.remove("selected");
  demo2();
});
b3.addEventListener("click", () => {
  b3.classList.add("selected");
  b2.classList.remove("selected");
  b1.classList.remove("selected");
  demo3();
});

function demo4(){
  const dom = document.querySelector("#demo2")! as HTMLElement;
  dom.innerHTML="";
  const c = new Canvas({ parent: dom, size: new Vector(300, 300) });

  c.enableMouseOver();
  c.setDepth(300);

  const b1 = new Ball(new Vector(c.size.x / 2, c.size.y / 2, 150));
  b1.setSize(10);
  b1.draw(c);
}
demo4();
function demo5(){
  const dom = document.querySelector("#demo3")! as HTMLElement;
  dom.innerHTML="";
  const c = new Canvas({ parent: dom, size: new Vector(300, 300) });

  c.enableMouseOver();
  c.setDepth(300);

  const b1 = new Ball(new Vector(c.size.x / 2, c.size.y / 2, 150));
  b1.setSize(10);
  function update(){
    b1.pos.x+=1;
    b1.draw(c)
    requestAnimationFrame(update)
  }
  update();
}
demo5();

function demo6(){
  const dom = document.querySelector("#demo4")! as HTMLElement;
  dom.innerHTML="";
  const c = new Canvas({ parent: dom, size: new Vector(300, 300) });

  c.enableMouseOver();
  c.setDepth(300);

  const b1 = new Ball(new Vector(c.size.x / 2, c.size.y / 2, 150));
  b1.setSize(10);
  function update(){
    c.clearAll();
    b1.pos.x+=1;
    b1.draw(c)
    requestAnimationFrame(update)
  }
  update();
}
demo6();