import { Canvas } from "../Canvas/Canvas";
import { Vector } from "../Vector/Vector";

export class Ball {
  public size: number = 0;
  public vel: Vector = new Vector();
  public acc: Vector = new Vector();
  public mass: number = 1;
  public color: string = "rgb(0,0,0)";
  constructor(public pos: Vector = Vector.getRandom(10)) {}
  public setSize(val: number) {
    this.size = val;
  }
  public setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }
  public setVel(x: number, y: number) {
    this.vel.x = x;
    this.vel.y = y;
  }
  public setAcc(x: number, y: number) {
    this.acc.x = x;
    this.acc.y = y;
  }
  public setMass(val: number) {
    this.mass = val;
  }
  public bound(x: number, y: number, w: number, h: number) {}
  public draw(c: Canvas) {}
  public update() {}
}
