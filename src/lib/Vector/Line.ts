import { Canvas } from "../Canvas/Canvas";
import { Vector } from "./Vector";

export class Line {
  constructor(
    public start: Vector = new Vector(),
    public end: Vector = new Vector()
  ) {}
  public getLerp(val: number = 0.5) {
    const x = this.start.x + (this.end.x - this.start.x) * val;
    const y = this.start.y + (this.end.y - this.start.y) * val;
    return new Vector(x, y);
  }
  public getIntersect(l:Line){
    const tTop =
      (l.end.x - l.start.x) * (this.start.y - l.start.y) -
      (l.end.y - l.start.y) * (this.start.x - l.start.x);
    const uTop =
      (l.start.y - this.start.y) * (this.start.x - this.end.x) -
      (l.start.x - this.start.x) * (this.start.y - this.end.y);
    const bottom =
      (l.end.y - l.start.y) * (this.end.x - this.start.x) -
      (l.end.x - l.start.x) * (this.end.y - this.start.y);
    if (bottom != 0) {
      const t = tTop / bottom;
      const u = uTop / bottom;
      if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return new Vector(
          lerp(this.start.x, this.end.x, t),
          lerp(this.start.y, this.end.y, t),
          t
        );
      }
    }
    return null;
  }
  public draw(c:Canvas){
    c.start()
    c.line(this.start,this.end);
    c.stroke();
    c.end()
  }
}
