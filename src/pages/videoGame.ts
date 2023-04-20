import { Canvas } from "../lib/Canvas";
import { Vector } from "../lib/Vector/Vector";

const canvas = new Canvas();
// canvas.setOrigin(0, canvas.size.y - 100);
canvas.addGridLines();
window.addEventListener("load", () => {
  animate();
});
const image = document.querySelector(
  "#player-stationary-image"
) as HTMLImageElement;

class Motion {
  constructor(public name: string, public frameCount: number) {}
}
class Player {
  public asset: HTMLImageElement;
  public pos: Vector = new Vector(50, 200);
  public vel: Vector = new Vector(0, 0);
  public acc: Vector = new Vector(0, 0);
  public size: Vector = new Vector(100, 91);
  public motions: Motion[] = [];
  public currentMotion: string = "stationary";
  public time = 0;
  constructor(assets: HTMLImageElement) {
    this.asset = assets;
    this.motions.push(new Motion("stationary", 7));
    this.motions.push(new Motion("jump-up", 7));
    this.motions.push(new Motion("jump-down", 7));
    this.motions.push(new Motion("strut", 9));
    this.motions.push(new Motion("down", 11));
    this.motions.push(new Motion("sit", 5));
    this.motions.push(new Motion("roll", 7));
    this.motions.push(new Motion("dead", 12));
    this.motions.push(new Motion("hurt", 4));
  }
  public draw(c: Canvas) {
    let current = this.motions[0];
    let index = 0;
    for (let i = 0; i < this.motions.length; i++) {
      if (this.motions[i].name == this.currentMotion) {
        current = this.motions[i];
        index = i;
      }
    }

    c.drawSpecificImage(
      this.asset,
      new Vector(Math.floor(this.time) * this.size.x, this.size.y * index),
      this.size,
      this.pos,
      this.size
    );

    this.time += 0.5;
    if (this.time >= current.frameCount) {
      this.time = 0;
      if (current.name == "jump-up") {
        this.currentMotion = "jump-down";
      } else {
        this.currentMotion = "stationary";
      }
    }
  }
  public update(c: Canvas) {
    if (this.currentMotion == "jump-up") {
      this.acc.y = -3;
    }
    if (this.currentMotion == "jump-down") {
      this.acc.y = 3;
    }
    if (this.currentMotion == "strut") {
      this.acc.x = 1;
    }
    if (this.pos.y > c.size.y - this.size.y - 1) {
      this.pos.y = c.size.y - this.size.y;
      this.vel.y = 0;
    }
    if (this.vel.y < 0.001 && this.vel.y > -0.001) {
      this.vel.y = 0;
    }
    if (this.pos.x > c.size.x) {
      this.pos.x = -this.size.x;
    }
    this.vel.mul(0.9);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mul(0);
  }
}
const player = new Player(image);

window.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key == "ArrowUp") {
    player.currentMotion = "jump-up";
  }
  if (e.key == "ArrowDown") {
    player.currentMotion = "down";
  }
  if (e.key == "ArrowRight") {
    player.currentMotion = "strut";
  }
  if (e.key == "ArrowLeft") {
  }
});

function animate() {
  canvas.clearAll();
  player.update(canvas);
    player.draw(canvas);
  requestAnimationFrame(animate);
}
