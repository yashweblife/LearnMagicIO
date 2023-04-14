import { Canvas } from "../lib/Canvas";
import { Matrix, MatrixMath } from "../lib/Matrix/Matrix";
import { Vector, lerp } from "../lib/Vector/Vector";

class Network {
  public levels: Level[] = [];
  constructor(nodeCount: number[] = []) {
    for (let i = 0; i < nodeCount.length - 1; i++) {
      this.levels.push(new Level(nodeCount[i], nodeCount[i + 1]));
    }
  }
  public static feedForward(inputs: Matrix, network: Network) {
    let output = Level.feedForward(inputs, network.levels[0]);
    for (let i = 1; i < network.levels.length; i++) {
      output = Level.feedForward(output, network.levels[i]);
    }
    return output;
  }
  public static mutate(network: Network, mag: number = 1) {
    network.levels.forEach((level: Level) => {
      level.biases.components.forEach((b: number) => {
        b = lerp(b, Math.random() * 2 - 1, mag);
      });
      for (let i = 0; i < level.weights.length; i++) {
        for (let j = 0; j < level.weights[i].size; j++) {
          let w = level.weights[i].components[j];
          level.weights[i].components[j] = lerp(w, Math.random() * 2 - 1, mag);
        }
      }
    });
  }
  
}
class Level {
  public inputs: Matrix;
  public outputs: Matrix;
  public biases: Matrix;
  public weights: Matrix[] = [];
  constructor(inputCount: number = 100, outputCount: number = 4) {
    this.inputs = new Matrix(inputCount);
    this.outputs = new Matrix(outputCount);
    this.biases = new Matrix(outputCount);
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Matrix(outputCount);
    }
    Level.randomize(this);
  }
  public static randomize(level: Level) {
    for (let i = 0; i < level.inputs.size; i++) {
      for (let j = 0; j < level.outputs.size; j++) {
        level.weights[i].components[j] = Math.random() * 2 - 1;
      }
    }
    for (let i = 0; i < level.biases.size; i++) {
      level.biases.components[i] = Math.random() * 2 - 1;
    }
  }
  public static feedForward(inputs: Matrix, level: Level) {
    //Set the level to inputs
    for (let i = 0; i < level.inputs.size; i++) {
      level.inputs.components[i] = inputs.components[i];
    }
    for (let i = 0; i < level.outputs.size; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.size; j++) {
        sum += level.inputs.components[j] * level.weights[j].components[i];
      }
      if (sum > level.biases.components[i]) {
        level.outputs.components[i] = 1;
      } else {
        level.outputs.components[i] = 0;
      }
    }
    return level.outputs;
  }
}

interface DataSet {
  name: string;
  data: Matrix[];
}
class ImageClassifier {
  public resolution: number = 500;
  public imageMatrix: Matrix;
  public canvas: Canvas;
  public video: HTMLVideoElement;
  public trainingData: DataSet[] = [];
  public isVideoReady: boolean = false;
  public brain:Network;
  constructor(parent: HTMLElement = document.body, resolution: number = 500) {
    this.resolution = resolution;
    this.imageMatrix = new Matrix(this.resolution);
    this.canvas = new Canvas({ parent: parent, size: new Vector(300, 300) });
    this.video = document.createElement("video");
    this.video.style.display = "none";
    this.brain = new Network([resolution,100,50, 10])
    parent.append(this.video);
    this.readyVideo();
    document.querySelector("#train-me")?.addEventListener("click",()=>{
        let inputs = document.querySelector("#class-name") as HTMLInputElement;
        this.gatherData(inputs.value)
    })
  }
  public readyVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300, height: 300 } })
      .then((stream: MediaStream) => {
        this.video.srcObject = stream;
        this.video.play();
        this.isVideoReady = true;
      });
  }
  public createButton(name: string) {
    const button = document.createElement("button");
    button.innerHTML = "Train " + name;
    button.addEventListener("click", () => {
      this.gatherData(name);
    });
    return button;
  }
  public gatherData(name: string) {
    let test = this.trainingData.find((val) => (val.name = name));
    const newMatrix = MatrixMath.getMatrixClone(this.imageMatrix);
    // const output = Network.feedForward(MatrixMath.getMatrixNormalize(newMatrix), this.brain)
    if (test) {
      test.data.push(newMatrix);
    } else {
      const data = {
        name: name,
        data: [newMatrix],
      };
      this.trainingData.push(data);
      return this.createButton(name);
    }
  }
  public predict() {
    if (this.trainingData.length == 0) return;
    // const output = Network.feedForward(MatrixMath.getMatrixNormalize(this.imageMatrix), this.brain)
    // console.log(output.components)    
    // console.log([...output.components])
}
  public animation = () => {
    if (this.isVideoReady) {
      this.canvas.drawImage(this.video);
      const { data } = this.canvas.getImageData();
      let index = 0;
      for (let i = 0; i < data.length - 4; i += data.length / this.resolution) {
        const pix = (data[i] + data[i + 1] + data[i + 2]) / 3;
        this.imageMatrix.components[index] = pix;
        index += 1;
      }
      this.predict()
    }
    requestAnimationFrame(this.animation);
  };
}

const classifier = new ImageClassifier();
classifier.animation();


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
