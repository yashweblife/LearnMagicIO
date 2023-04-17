import { Canvas } from "../lib/Canvas/Canvas";
import { Vector } from "../lib/Vector/Vector";
import "../styles/article.scss";
import "../styles/common.scss";
import "./article";

const mouse = new Vector();
/**
 * This demo shows the coordinate system
 */
function VectorDemo1() {
  const canvasContainer = document.querySelector("#vector-demo") as HTMLElement;
  const vectorDemo = new Canvas({
    parent: canvasContainer,
    size: new Vector(200, 200),
  });
  let activate = false;
  vectorDemo.dom.addEventListener("mousemove", (e: MouseEvent) => {
    mouse.x = e.clientX - vectorDemo.bound.left;
    mouse.y = e.clientY - vectorDemo.bound.top;
  });
  vectorDemo.dom.addEventListener("mouseenter", () => {
    activate = true;
    vectorDemoAnimation();
  });
  vectorDemo.dom.addEventListener("mouseleave", () => {
    activate = false;
  });
  window.addEventListener("scroll", () => {
    vectorDemo.recalibrate();
  });
  function vectorDemoAnimation() {
    if (!activate) return;
    vectorDemo.clearAll();
    vectorDemo.addGridLines(20, 20);
    vectorDemo.start();
    vectorDemo.arc(mouse, 1);
    vectorDemo.text(`<X:${mouse.x}, Y:${Math.round(mouse.y)}>`, mouse, 10, 10);
    vectorDemo.fill();
    requestAnimationFrame(vectorDemoAnimation);
  }
  vectorDemoAnimation();
}
function VectorDemo2() {
  const canvasContainer = document.querySelector(
    "#vector-distance-demo"
  ) as HTMLElement;
  const canvas = new Canvas({
    parent: canvasContainer,
    size: new Vector(200, 200),
  });
  canvas.dom.addEventListener("mousemove", (e: MouseEvent) => {
    mouse.x = e.clientX - canvas.bound.left;
    mouse.y = e.clientY - canvas.bound.top;
  });
  let activate = false;
  canvas.dom.addEventListener("mouseenter", () => {
    activate = true;
    demoAnimation();
  });
  canvas.dom.addEventListener("mouseleave", () => {
    activate = false;
  });
  window.addEventListener("scroll", () => {
    canvas.recalibrate();
  });
  const p1 = new Vector(10, 10);
  const p2 = new Vector(190, 190);
  const p3 = new Vector();
  const p4 = new Vector();
  function demoAnimation() {
    if (!activate) return;
    p3.x = (p1.x + mouse.x) / 2;
    p3.y = (p1.y + mouse.y) / 2;
    p4.x = (p2.x + mouse.x) / 2;
    p4.y = (p2.y + mouse.y) / 2;

    canvas.clearAll();
    canvas.addGridLines(20, 20);
    canvas.start();
    canvas.arc(p1, 5);
    canvas.arc(p2, 5);
    canvas.fill();
    canvas.end();
    canvas.start();
    canvas.arc(mouse, 10);
    canvas.arc(p3, 5);
    canvas.fill();
    canvas.end();
    canvas.start();
    canvas.line(p1, mouse);
    canvas.line(p2, mouse);
    canvas.stroke();
    canvas.end();
    canvas.start();
    canvas.arc(p4, 5);
    canvas.fill();
    canvas.end();
    canvas.start();
    canvas.text(`D: ${Math.floor(p1.distance(mouse))}px`, p3, 10, 10);
    canvas.text(`D: ${Math.floor(p2.distance(mouse))}px`, p4, 10, 10);
    canvas.end();
    requestAnimationFrame(demoAnimation);
  }
  demoAnimation();
}
/**
 * Addition Subtraction Multiplication
 */
function VectorDemo3() {
  const canvasContainer = document.querySelector("#vector-arithmetics-demo")! as HTMLElement;
  const canvas = new Canvas({
    parent: canvasContainer,
    size: new Vector(200, 200),
  });
  // let tab = 0;
  const b1:HTMLButtonElement = document.querySelector("#vector-arithmetics-add")!;
  const b2:HTMLButtonElement = document.querySelector("#vector-arithmetics-dot")!;
  const b3:HTMLButtonElement = document.querySelector("#vector-arithmetics-cross")!;
  b1?.addEventListener("click",()=>{
    b1.style.backgroundColor="red"
    b2.style.backgroundColor="white"
    b3.style.backgroundColor="white"
    addition();
  })
  b2?.addEventListener("click",()=>{
    b1.style.backgroundColor="white"
    b2.style.backgroundColor="red"
    b3.style.backgroundColor="white"
    dotProduct();
  })
  b3?.addEventListener("click",()=>{
    b1.style.backgroundColor="white"
    b2.style.backgroundColor="white"
    b3.style.backgroundColor="red"
  })
  canvas.setOrigin(canvas.size.x/2,canvas.size.y/2)
  function addition(){
    const v = new Vector(0,40);
    const v1 = new Vector(40,0);
    const v2 = Vector.getAdd(v,v1);
    function animate(){
      canvas.clearAll();
      canvas.addGridLines(20,20)
      canvas.start();
      canvas.arc(v, 3);
      canvas.fill()
      canvas.end();
      canvas.start();
      canvas.arc(v1, 3);
      canvas.fill()
      canvas.end();
      canvas.start();
      canvas.arc(v2, 4);
      canvas.fill("rgb(255,0,0)")
      canvas.end();
      canvas.start();
      canvas.line(v1,v2)
      canvas.stroke("rgb(0,255,255)");
      canvas.end();
      canvas.start();
      canvas.line(v,v2)
      canvas.stroke("rgb(0,255,255)");
      canvas.end();
      // requestAnimationFrame(animate)
    }
    animate();
  }
  function dotProduct(){
    const base = new Vector(50, 0);
    const test = new Vector(50,50);
    const origin = new Vector();
    const outcome = new Vector(0,0);
    function animate(){
      canvas.clearAll();
      canvas.addGridLines();

      canvas.start();
      canvas.line(origin, base);
      canvas.stroke("rgba(255,0,0,0.5)");
      canvas.end();

      canvas.start();
      canvas.line(origin, test);
      canvas.stroke("rgba(0,255,0,0.5)");
      canvas.end();

      outcome.x = test.dot(base);
      outcome.y = test.dot(base);

      canvas.start();
      canvas.line(origin, outcome);
      canvas.stroke("rgba(0,0,255,0.5)");
      canvas.end();
    }
    animate();
  }
  dotProduct();
}
VectorDemo1();
VectorDemo2();
VectorDemo3()
