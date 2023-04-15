import { Canvas } from "../Canvas";
import { Vector } from "../Vector/Vector";

/**
 * The Graph Object contains a canvas and can plot points over a 2D space.
 * ```javascript
 * const g = new Graph()
 * ```
 */
export class Graph {
  public canvas: Canvas;
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas({ parent: parent, size: new Vector(300, 300) });
  }
}
