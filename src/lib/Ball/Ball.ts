import { Canvas } from "../Canvas/Canvas";
import { Vector } from "../Vector/Vector";

export class Ball {
  public size: number = 0;
  public vel: Vector = new Vector();
  public acc: Vector = new Vector();
  public mass: number = 1;
  public color: string = "rgb(0,0,0)";
  constructor(public pos: Vector = Vector.getRandom(300)) {}
  public setSize(val: number) {
    this.size = val;
  }
  public setPos(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }
  public setColor(val: string) {
    this.color = val;
  }
  public setVel(x: number, y: number) {
    this.vel.x = x;
    this.vel.y = y;
  }
  public setAcc(x: number, y: number, z:number=0) {
    this.acc.x = x;
    this.acc.y = y;
    this.acc.z = z;
  }
  public setMass(val: number) {
    this.mass = val;
  }
  public attract(b:Ball,mag:number=1){
    let nVec = Vector.getSub(this.pos, b.pos)
    nVec.normalize(-mag)
    this.vel.add(nVec)
  }
  public repel(b:Ball,mag:number=1){
    let nVec = Vector.getSub(this.pos, b.pos)
    nVec.normalize(mag)
    this.vel.add(nVec)
  }
  public bound(x: number, y: number, z:number, w: number, h: number, b:number) {
    if (this.pos.x < x + this.size) {
      this.pos.x = x + this.size;
      this.vel.x = -this.vel.x
    }
    if (this.pos.x > x + w - this.size) {
      this.pos.x = x + w - this.size;
      this.vel.x = -this.vel.x
    }
    if (this.pos.y < y + this.size) {
      this.pos.y = y + this.size;
      this.vel.y = -this.vel.y
    }
    if (this.pos.y > y + h - this.size) {
      this.pos.y = y + h - this.size;
      this.vel.y = -this.vel.y
    }
    if (this.pos.z < z + this.size) {
      this.pos.z = z + this.size;
      this.vel.z = -this.vel.z
    }
    if (this.pos.z > z + b - this.size) {
      this.pos.z = z + b - this.size;
      this.vel.z = -this.vel.z
    }
  }
  public draw(c: Canvas) {
    c.start();
    c.arc(this.pos, this.size);
    c.fill(this.color);
    c.end();
  }
  public update() { 
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
}
