class Canvas {
  protected canvas: HTMLCanvasElement;

  constructor(private id: string) {
    this.canvas = <HTMLCanvasElement> document.getElementById(id);
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = document.body.clientHeight;

    //window.addEventListener('resize', this.resizeCanvas.bind(this), false);
  }

  


}