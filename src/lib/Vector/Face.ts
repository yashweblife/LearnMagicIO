import { Canvas, Color } from "../Canvas";
import { Line } from "./Line";
import { Vector } from "./Vector";

export class Face {
  public angle: Vector = new Vector(0, 0, 0);
  public center: Vector = new Vector(0, 0, 0);
  public scale: number = 1;
  public color: Color = new Color(255, 0, 0, 1);
  constructor(public lines: Line[] = []) {

  }
  public setAngle(x: number = 0, y: number = 0, z: number = 0) {
    this.angle.x = x;
    this.angle.y = y;
    this.angle.z = z;
  }
  public setCenter(x: number = 0, y: number = 0, z: number = 0) {
    this.center.x = x;
    this.center.y = y;
    this.center.z = z;
  }
  public setScale(val: number) {
    this.scale = val;
  }
  public setColor(val: Color) {
    this.color = val;
  }
  public getMaxZ() {
    let zVal = -50000;
    this.lines.forEach((line: Line) => {
      let start = line.start
        .RotateX(this.angle.x)
        .RotateY(this.angle.y)
        .RotateZ(this.angle.z)
        .getScale(this.scale)
        .Add(this.center);

      let end = line.end
        .RotateX(this.angle.x)
        .RotateY(this.angle.y)
        .RotateZ(this.angle.z)
        .getScale(this.scale)
        .Add(this.center);
      if (start.z > zVal) {
        zVal = start.z;
      }
      if (end.z > zVal) {
        zVal = end.z;
      }
    });
    return zVal;
  }
  public drawLines(c: Canvas) {
    this.lines.forEach((line: Line) => {
      c.start();
      c.line(
        line.start
          .RotateX(this.angle.x)
          .RotateY(this.angle.y)
          .RotateZ(this.angle.z)
          .getScale(this.scale)
          .Add(this.center),
        line.end
          .RotateX(this.angle.x)
          .RotateY(this.angle.y)
          .RotateZ(this.angle.z)
          .getScale(this.scale)
          .Add(this.center)
      );
      c.stroke();
      c.end();
    });
  }
  public drawFace(c: Canvas) {
    c.start();
    c.moveTo(
      this.lines[0].start
        .RotateX(this.angle.x)
        .RotateY(this.angle.y)
        .RotateZ(this.angle.z)
        .getScale(this.scale)
        .Add(this.center)
    );
    for (let i = 1; i < this.lines.length; i++) {
      c.lineTo(
        this.lines[i].start
          .RotateX(this.angle.x)
          .RotateY(this.angle.y)
          .RotateZ(this.angle.z)
          .getScale(this.scale)
          .Add(this.center)
      );
    }
    c.lineTo(
      this.lines[0].start
        .RotateX(this.angle.x)
        .RotateY(this.angle.y)
        .RotateZ(this.angle.z)
        .getScale(this.scale)
        .Add(this.center)
    );
    c.end();
    c.fill(this.color.dark(1/this.getMaxZ()).setAlpha(0.5).toString());
  }
}
