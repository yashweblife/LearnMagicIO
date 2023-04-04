import { Canvas } from "../lib/Canvas/Canvas";
import { Vector } from "../lib/Vector/Vector";

export class Camera {
  public canvas: Canvas;
  public video: HTMLVideoElement = document.createElement("video");
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas({ parent: parent, size: new Vector(300, 300) });
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 300,
          height: 300,
        },
        audio: false,
      })
      .then((stream: MediaStream) => {
        this.video.srcObject = stream;
        this.video.play();
      });
  }
  public drawImage() {
    this.canvas.drawImage(this.video);
  }
  public getImageData() {
    return this.canvas.getImageData();
  }
}
