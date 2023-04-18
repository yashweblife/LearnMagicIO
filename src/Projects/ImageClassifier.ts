import { Canvas } from "../lib/Canvas";
import { Matrix } from "../lib/Matrix/Matrix";
import { Vector } from "../lib/Vector/Vector";

// function gatherData(name: string) {
//   //   console.log(name);
//   const mod = trainingDataset.find((val: any) => val.name == name);
//   const newMatrix = MatrixMath.getMatrixClone(imageMatrix);

//   if (mod) {
//     mod.data.push(newMatrix);
//   } else {
//     trainingDataset.push({ name: name, data: [newMatrix] } as DataSet);
//     const b = document.createElement("button");
//     b.innerHTML = name;
//     b.addEventListener("click", () => {
//       gatherData(name);
//     });
//     document.body.appendChild(b);
//   }
// }

// document.querySelector("#train-me")?.addEventListener("click", () => {
//   let name = document.querySelector("#class-name") as HTMLInputElement;
//   gatherData(name.value);
// });

// function predict() {
//   if (trainingDataset.length == 0) return;
//   let distance = 100000;
//   let output = "";
//   for (let i = 0; i < trainingDataset.length; i++) {
//     if (trainingDataset[i].data.length > 1) {
//       const avg = MatrixMath.getMatrixAverage(trainingDataset[i].data);
//       const dist = MatrixMath.getMatrixDistance(avg, imageMatrix);
//       if (dist < distance) {
//         distance = dist;
//         output = trainingDataset[i].name;
//       }
//     } else {
//       const dist = MatrixMath.getMatrixDistance(trainingDataset[i].data[0], imageMatrix);
//       if (dist < distance) {
//         distance = dist;
//         output = trainingDataset[i].name;
//       }
//     }
//   }
//   console.log(output, distance);
// }
// function animation() {
//   canvas.drawImage(video);
//   const { data } = canvas.getImageData();
//   const input = [];
//   for (let i = 0; i < data.length - 4; i += data.length / resolution) {
//     input.push([data[i], data[i + 1], data[i + 2]]);
//   }
//   for (let i = 0; i < imageMatrix.components.length; i++) {
//     const norm = input[i];
//     const val = (norm[0] + norm[1] + norm[2]) / 3;
//     imageMatrix.components[i] = val;
//   }
//   predict();
//   requestAnimationFrame(animation);
// }
// animation()

const canvas = new Canvas({
  parent: document.body,
  size: new Vector(300, 300),
});
const video = document.createElement("video");
navigator.mediaDevices.getUserMedia({
  video: {
    width: 300,
    height: 300,
  },
}).then((stream:MediaStream)=>{
  video.srcObject=stream;
  video.play();
  animate();
})
const res = 10 ;
const rModal = new Matrix(res);
const gModal = new Matrix(res);
const bModal = new Matrix(res);
const bwModal = new Matrix(res);
const imageMatrix = new Matrix(res)
interface TrainingData{
  name:string
  red:Matrix[]
  green:Matrix[]
  blue:Matrix[]
  bw:Matrix[]
}
const trainingDataset:TrainingData[] = []
const traningButton = document.querySelector("#train-me") as HTMLButtonElement;
const className = document.querySelector("#class-name") as HTMLInputElement;
const predictionDiv = document.querySelector("#prediction") as HTMLElement; 
traningButton.addEventListener("click",()=>{
  
})
function animate() {
  canvas.drawImage(video);
  const {data} = canvas.getImageData();
  let index = 0;
  for(let i=0;i<data.length-4;i+=data.length/res){
    bwModal.components[index] = ((data[i] + data[i+1] + data[i+2])/3)/255;
    rModal.components[index] = data[i]/255
    gModal.components[index] = data[i+1]/255
    bModal.components[index] = data[i+2]/255
    index+=1;
  }
  requestAnimationFrame(animate);
}
