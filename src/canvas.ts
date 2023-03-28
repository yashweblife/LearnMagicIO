import { Canvas } from "./lib/Canvas/Canvas";
import { Vector } from "./lib/Vector/Vector";
import "./styles/canvas.scss";
import "./styles/common.scss";

const canvasCoordinateSystemDemoDom = document.querySelector(
  "#canvas-coordinate-system-demo"
) as HTMLElement;
const canvasCoordinateSystemDemo = new Canvas({
  parent: canvasCoordinateSystemDemoDom,
  size: new Vector(500, 200),
});
const mouse = new Vector();
canvasCoordinateSystemDemo.dom.addEventListener(
  "mousemove",
  (e: MouseEvent) => {
    mouse.x =
      (e.clientX - canvasCoordinateSystemDemo.bound.left) ;
    mouse.y =
      (e.clientY - canvasCoordinateSystemDemo.bound.top);
  }
);
function canvasCoordinateSystemAnimation() {
  canvasCoordinateSystemDemo.clearAll();
  canvasCoordinateSystemDemo.start();
  canvasCoordinateSystemDemo.arc(mouse,1);
  canvasCoordinateSystemDemo.text(`X:${mouse.x}, Y:${Math.round(mouse.y)}`, mouse, 10, 10)
  canvasCoordinateSystemDemo.fill();
  requestAnimationFrame(canvasCoordinateSystemAnimation);
}
canvasCoordinateSystemAnimation();
