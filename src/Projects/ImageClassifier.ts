import { Canvas } from "../lib/Canvas";
import { Matrix, MatrixMath } from "../lib/Matrix/Matrix";
import { Vector } from "../lib/Vector/Vector";
import "../styles/article.scss";
import "../styles/common.scss";

class ImageClassifier{
  public video:HTMLVideoElement = document.createElement("video");
  public canvas:Canvas;
  public resolution:number=500;
  constructor(parent:HTMLElement){
    this.canvas = new Canvas({parent:parent,size:new Vector(300, 300)})
    navigator.mediaDevices.getUserMedia({
      video:{
        width:300,
        height:300
      }
    }).then((stream:MediaStream)=>{
      this.video.srcObject = stream;
      this.video.play()
      animate();
    })
  }
  public animate(){

    requestAnimationFrame(this.animate);
  }
}


const canvas = new Canvas({
  parent: document.getElementById("camera-holder")!,
  size: new Vector(300, 300),
});
const visual = new Canvas({parent:document.getElementById('visualizer')!,size:new Vector(300, 500)})
const video = document.createElement("video");
navigator.mediaDevices
  .getUserMedia({
    video: {
      width: 300,
      height: 300,
    },
  })
  .then((stream: MediaStream) => {
    video.srcObject = stream;
    video.play();
    animate();
  });
const res = 400;
const rModal = new Matrix(res);
const gModal = new Matrix(res);
const bModal = new Matrix(res);
const bwModal = new Matrix(res);
interface TrainingData {
  name: string;
  red: Matrix[];
  green: Matrix[];
  blue: Matrix[];
  bw: Matrix[];
}
interface RefinedData {
  name: string;
  red: Matrix;
  green: Matrix;
  blue: Matrix;
  bw: Matrix;
}
const trainingDataset: TrainingData[] = [];
const trainingButton = document.querySelector("#train-me") as HTMLButtonElement;
const className = document.querySelector("#class-name") as HTMLInputElement;
const predictionDiv = document.querySelector("#prediction") as HTMLElement;
trainingButton.addEventListener("click", () => {
  const { value } = className;
  gatherTrainingData(value, rModal, gModal, bModal, bwModal);
});
function gatherTrainingData(
  name: string,
  r: Matrix,
  g: Matrix,
  b: Matrix,
  bw: Matrix
) {
  const test = trainingDataset.filter(
    (data: TrainingData) => data.name == name
  );
  if (test.length == 1) {
    test[0].red.push(MatrixMath.getMatrixClone(r));
    test[0].green.push(MatrixMath.getMatrixClone(g));
    test[0].blue.push(MatrixMath.getMatrixClone(b));
    test[0].bw.push(MatrixMath.getMatrixClone(bw));
  } else {
    const output: TrainingData = {
      name: name,
      red: [MatrixMath.getMatrixClone(r)],
      green: [MatrixMath.getMatrixClone(g)],
      blue: [MatrixMath.getMatrixClone(b)],
      bw: [MatrixMath.getMatrixClone(bw)],
    };
    trainingDataset.push(output);
    const button = document.createElement("button")!;
    button.innerHTML = name;
    button.addEventListener("click", () => {
      console.log(name);
      gatherTrainingData(name, rModal, gModal, bModal, bwModal);
    });
    document.body.appendChild(button);
  }
  console.log(trainingDataset);
}
function refineTrainingData(data: TrainingData) {
  const output = {
    name: data.name,
    red: MatrixMath.getMatrixAverage(data.red),
    green: MatrixMath.getMatrixAverage(data.green),
    blue: MatrixMath.getMatrixAverage(data.blue),
    bw: MatrixMath.getMatrixAverage(data.bw),
  };
  return output;
}
function compareRefinedToTest(inp1: RefinedData, inp2: RefinedData) {
  const r = MatrixMath.getMatrixDistance(inp1.red, inp2.red);
  const g = MatrixMath.getMatrixDistance(inp1.green, inp2.green);
  const b = MatrixMath.getMatrixDistance(inp1.blue, inp2.blue);
  const bw = MatrixMath.getMatrixDistance(inp1.bw, inp2.bw);
  return r + g + b + bw;
}
function predict() {
  if (trainingDataset.length == 0) return;
  let d = 100000;
  let output = ""
  trainingDataset.forEach((data: TrainingData) => {
    const test = refineTrainingData(data);
    const base:RefinedData = {
      name: "",
      red: rModal,
      green: gModal,
      blue: bModal,
      bw: bwModal,
    };
    let D = compareRefinedToTest(test, base);
    if(D<d){
      d=D;
      output = test.name
    }
  });
  predictionDiv.innerHTML = `${output} ${d}`;
}
function animate() {
  canvas.drawImage(video);
  visual.clearAll();
  const { data } = canvas.getImageData();
  let index = 0;
  for (let i = 0; i < data.length - 4; i += data.length / res) {
    bwModal.components[index] = (data[i + 0] + data[i + 1] + data[i + 2]) / 3 / 255;
    rModal.components[index] = data[i + 0] / 255;
    gModal.components[index] = data[i + 1] / 255;
    bModal.components[index] = data[i + 2] / 255;
    index += 1;
  }
  let x_plot = 0;
  let y_plot = 0;
  for(let i=0; i<bwModal.size;i++){
    let bwVal = bwModal.components[i];
    let rVal = rModal.components[i];
    let gVal = gModal.components[i];
    let bVal = bModal.components[i];
    const mag = 5;
    visual.start();
    // visual.rect(new Vector(i * (300/bwModal.size), 300-(mag*2)), new Vector((300/bwModal.size),  -bwVal*mag));
    visual.arc(new Vector(((x_plot))* mag*2, (y_plot)*mag*2),mag);
    visual.fill(`rgb(${rVal*255}, ${gVal*255}, ${bVal*255})`);
    visual.end();
    x_plot+=1;
    if(x_plot>=Math.sqrt(res)){
      x_plot=0;
      y_plot+=1;
    }
    // visual.start();
    // visual.rect(new Vector(i* (300/rModal.size), 300-(mag*4)), new Vector((300/rModal.size),-rVal*mag));
    // visual.fill(`rgb(${Math.floor(rVal*255)}, 0, 0)`);
    // // visual.end();
    // visual.start();
    // visual.rect(new Vector(i* (300/gModal.size), 300-(mag*6)), new Vector((300/gModal.size), -gVal*mag));
    // visual.fill(`rgb(0, ${Math.floor(gVal*255)},0)`);
    // // visual.end();
    // visual.start();
    // visual.rect(new Vector(i* (300/bModal.size), 300-(mag*8)), new Vector((300/bModal.size), -bVal*mag));
    // visual.fill(`rgb(0, 0, ${Math.floor(bVal*255)})`);
    // visual.end();
  }


  predict();
  requestAnimationFrame(animate);
}
