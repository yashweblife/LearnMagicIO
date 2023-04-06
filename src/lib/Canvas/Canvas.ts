import { Vector } from "../Vector/Vector";

export class Color {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 0
  ) {}
  public get() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
  public setAlpha(val: number) {
    this.a = val;
  }
  public normalize(val: number = 1) {
    const mag = Math.sqrt(this.r ** 2 + this.g ** 2 + this.b ** 2);
    this.r /= mag;
    this.g /= mag;
    this.b /= mag;
    Math.floor(this.r * val);
    Math.floor(this.g * val);
    Math.floor(this.b * val);
  }
}
export interface CanvasConstructor {
  size: Vector;
  parent: HTMLElement;
}
export interface CircleInterface {
  pos: Vector;
  radius: number;
}
export class Canvas {
  public size: Vector;
  public dom: HTMLCanvasElement = document.createElement("canvas");
  public c: CanvasRenderingContext2D = this.dom.getContext("2d")!;
  public bound: DOMRect = this.dom.getBoundingClientRect();
  public origin:Vector = new Vector();
  constructor(
    details: CanvasConstructor = {
      size: new Vector(500, 500),
      parent: document.body,
    }
  ) {
    this.size = details.size;
    details.parent.append(this.dom);
    this.dom.width = this.size.x;
    this.dom.height = this.size.y;
    this.bound = this.dom.getBoundingClientRect();
  }
  public setSize(val: Vector) {
    this.size = val;
    this.dom.width = this.size.x;
    this.dom.height = this.size.y;
    this.bound = this.dom.getBoundingClientRect();
  }
  public recalibrate() {
    this.bound = this.dom.getBoundingClientRect();
  }
  public start() {
    this.c.beginPath();
  }
  public end() {
    this.c.closePath();
  }
  public addGridLines(x: number = 10, y: number = 10) {
    this.c.strokeStyle = "rgba(0,0,0,0.1)";
    for (let i = 0; i < this.size.x; i += x) {
      this.c.beginPath();
      this.c.moveTo(i-this.origin.x, -this.origin.y);
      this.c.lineTo(i-this.origin.x, this.size.x);
      this.c.stroke();
      this.c.closePath();
    }
    for (let i = 0; i <= this.size.y; i += y) {
      this.c.beginPath();
      this.c.moveTo(-this.origin.x, i-this.origin.y);
      this.c.lineTo(this.size.y, i-this.origin.y);
      this.c.stroke();
      this.c.closePath();
    }
    this.c.strokeStyle = "rgba(0,0,0,0.4)";
    this.c.beginPath();
    this.c.moveTo(-this.origin.x,0);
    this.c.lineTo(this.origin.x*2,0);
    this.c.stroke();
    this.c.closePath();
    this.c.beginPath();
    this.c.moveTo(0,-this.origin.y);
    this.c.lineTo(0,this.origin.x*2);
    this.c.stroke();
    this.c.closePath();
  }
  public arc(pos: Vector, radius: number) {
    this.c.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
  }
  public rect(start: Vector, end: Vector) {
    this.c.rect(start.x, start.y, end.x, end.y);
  }
  public setOrigin(x:number=0,y:number=0){
    this.origin = new Vector(x,y);
    this.c.translate(x,y);
  }
  public line(start: Vector, end: Vector) {
    this.c.moveTo(start.x, start.y);
    this.c.lineTo(end.x, end.y);
  }
  public clear(from: Vector, to: Vector) {
    this.c.clearRect(from.x, from.y, to.x, to.y);
  }
  public clearAll() {
    this.c.clearRect(-this.origin.x,-this.origin.y , this.size.x, this.size.y);
  }
  public background(color: string) {
    this.c.rect(0, 0, this.size.x, this.size.y);
    this.c.fillStyle = color;
    this.c.fill();
  }
  public fill(color: string = "rgb(0,0,0)") {
    this.c.fillStyle = color;
    this.c.fill();
  }
  public stroke(color: string = "rgb(0,0,0)") {
    this.c.strokeStyle = color;
    this.c.stroke();
  }
  public text(
    val: string,
    pos: Vector,
    offsetX: number = 0,
    offsetY: number = 0
  ) {
    this.c.fillText(val, pos.x + offsetX, pos.y + offsetY);
  }
  public drawImage(img: HTMLImageElement | HTMLVideoElement) {
    this.c.drawImage(img, 0, 0, this.size.x, this.size.y);
  }
  public getImageData() {
    return this.c.getImageData(0, 0, this.size.x, this.size.y);
  }
}
