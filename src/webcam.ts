import { Vector } from "./lib/Vector/Vector";
import { Camera } from "./Projects/Camera";

const camera = new Camera();
const image: Vector[][] = [];
const res = 30;
const outputDOM = document.getElementById("r1")!;
for (let i = 0; i < res; i++) {
  const line = [];
  for (let j = 0; j < res; j++) {
    line.push(new Vector());
  }
  image.push(line);
}
const blue = new Vector(0, 0, 255);
const rectange = {
  pos: new Vector(100, 100),
  size: new Vector(30, 30),
  intersect: false,
};
const rectange1 = {
  pos: new Vector(100, 10),
  size: new Vector(30, 30),
  intersect: false,
};
function animate() {
  camera.drawImage();
  const { data } = camera.getImageData();
  const test = [];
  for (let i = 0; i < data.length; i += 4) {
    const val = new Vector(data[i], data[i + 1], data[i + 2]);
    if (val.distance(blue) < 150) {
      test.push(
        new Vector(
          (i / 4) % camera.canvas.size.x,
          Math.floor(i / 4 / camera.canvas.size.x)
        )
      );
    }
  }
  if (test.length > 0) {
    let average = new Vector();
    test.forEach((val: Vector) => {
      average.add(val);
    });
    let radius = 10//(test.length * 100) / camera.canvas.size.x;
    average.div(test.length);
    camera.canvas.start();
    camera.canvas.arc(average, radius);
    if (
      average.x <= rectange.pos.x + rectange.size.x + radius &&
      average.y <= rectange.pos.y + rectange.size.y + radius &&
      average.x >= rectange.pos.x - radius &&
      average.y >= rectange.pos.y - radius
    ) {
      rectange.intersect = true;
    } else {
      rectange.intersect = false;
    }
    if (
      average.x <= rectange1.pos.x + rectange1.size.x + radius &&
      average.y <= rectange1.pos.y + rectange1.size.y + radius &&
      average.x >= rectange1.pos.x - radius &&
      average.y >= rectange1.pos.y - radius
    ) {
      rectange1.intersect = true;
    } else {
      rectange1.intersect = false;
    }
    const gradient = camera.canvas.c.createRadialGradient(
      average.x,
      average.y,
      0,
      average.x,
      average.y,
      radius
    );
    gradient.addColorStop(0, "rgba(255,255,0,0.9)");
    gradient.addColorStop(1, "rgba(255,255,0,0.1)");
    camera.canvas.c.fillStyle = gradient;
    camera.canvas.c.fill();
    camera.canvas.end();
  }
  camera.canvas.start();
  camera.canvas.rect(rectange.pos, rectange.size);
  if (rectange.intersect) {
    camera.canvas.fill("red");
    outputDOM.innerHTML="This is working"
  } else {
    camera.canvas.stroke("red");
  }
  camera.canvas.end();
  camera.canvas.start();
  camera.canvas.rect(rectange1.pos, rectange1.size);
  if (rectange1.intersect) {
    camera.canvas.fill("red");
    outputDOM.innerHTML="Hello World"
} else {
    camera.canvas.stroke("red");
  }
  camera.canvas.end();

  requestAnimationFrame(animate);
}
animate();
