import { Vector } from "../Vector";
import { Line } from "../Vector/Line";

export const CubeMatrix = [
  [
    new Line(new Vector(-1, -1, 1), new Vector(1, -1, 1)),
    new Line(new Vector(1, -1, 1), new Vector(1, 1, 1)),
    new Line(new Vector(1, 1, 1), new Vector(-1, 1, 1)),
    new Line(new Vector(-1, 1, 1), new Vector(-1, -1, 1)),
  ],
  [
    new Line(new Vector(-1, -1, -1), new Vector(1, -1, -1)),
    new Line(new Vector(1, -1, -1), new Vector(1, 1, -1)),
    new Line(new Vector(1, 1, -1), new Vector(-1, 1, -1)),
    new Line(new Vector(-1, 1, -1), new Vector(-1, -1, -1)),
  ],
  [
    new Line(new Vector(-1, -1, 1), new Vector(-1, -1, -1)),
    new Line(new Vector(-1, -1, -1), new Vector(-1, 1, -1)),
    new Line(new Vector(-1, 1, -1), new Vector(-1, 1, 1)),
    new Line(new Vector(-1, 1, 1), new Vector(-1, -1, 1)),
  ],
  [
    new Line(new Vector(1, -1, 1), new Vector(1, -1, -1)),
    new Line(new Vector(1, -1, -1), new Vector(1, 1, -1)),
    new Line(new Vector(1, 1, -1), new Vector(1, 1, 1)),
    new Line(new Vector(1, 1, 1), new Vector(1, -1, 1)),
  ],
  [
    new Line(new Vector(1, 1, 1), new Vector(-1, 1, 1)),
    new Line(new Vector(-1, 1, 1), new Vector(-1, 1, -1)),
    new Line(new Vector(-1, 1, -1), new Vector(1, 1, -1)),
    new Line(new Vector(1, 1, -1), new Vector(1, 1, 1)),
  ],
  [
    new Line(new Vector(1, -1, 1), new Vector(-1, -1, 1)),
    new Line(new Vector(-1, -1, 1), new Vector(-1, -1, -1)),
    new Line(new Vector(-1, -1, -1), new Vector(1, -1, -1)),
    new Line(new Vector(1, -1, -1), new Vector(1, -1, 1)),
  ],
];
