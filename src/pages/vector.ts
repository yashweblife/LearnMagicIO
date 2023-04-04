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
  vectorDemo.dom.addEventListener("mouseenter", (e: MouseEvent) => {
    activate = true;
    vectorDemoAnimation();
  });
  vectorDemo.dom.addEventListener("mouseleave", (e: MouseEvent) => {
    activate = false;
  });
  window.addEventListener("scroll", () => {
    vectorDemo.recaliberate();
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
  canvas.dom.addEventListener("mouseenter", (e: MouseEvent) => {
    activate = true;
    demoAnimation();
  });
  canvas.dom.addEventListener("mouseleave", (e: MouseEvent) => {
    activate = false;
  });
  window.addEventListener("scroll", () => {
    canvas.recaliberate();
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
VectorDemo1();
VectorDemo2();
