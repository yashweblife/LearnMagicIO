class Canvas {
  protected canvas: HTMLCanvasElement;

  constructor(private id: string) {
    this.canvas = <HTMLCanvasElement> document.getElementById(id);
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
  }

  public getE1(): HTMLCanvasElement {
    return <HTMLCanvasElement> this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return <CanvasRenderingContext2D> this.canvas.getContext('2d');
  } 
  
  public getWidth(): number {
    return this.canvas.width;
  }

  public getHeight(): number {
      return this.canvas.height;
  }

  protected resizeCanvas(): void {
      this.canvas.width = document.body.clientWidth;
      this.canvas.height = document.body.clientHeight;
  }

}

interface Loopable {
  draw(): void;
  update(): void;
}

class Ball implements Loopable {
  protected canvas: Canvas;
  protected x: number;
  protected y: number;
  protected velX: number;
  protected velY: number;
  protected color: string;
  protected size: number; 

  constructor(canvas: Canvas, x: number, y: number, velX: number, velY: number, color: string, size: number) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

public draw(): void {
  let context = this.canvas.getContext();

  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  context.fill();
}

public update(): void {
  if((this.x + this.size) >= this.canvas.getWidth()) {
      this.velX = -(this.velX);
  }

}


}