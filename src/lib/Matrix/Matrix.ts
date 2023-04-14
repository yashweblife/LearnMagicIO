export class Matrix {
  public components: number[];
  public size: number = 0;
  constructor(size: number) {
    this.size = size;
    this.components = new Array(size);
    for (let i = 0; i < this.components.length; i++) {
      this.components[i] = 0;
    }
  }
}
export class MatrixMath {
  constructor() {}
  public static getMatrixAdd(a: Matrix, b: Matrix) {
    const output = new Matrix(a.size);
    for (let i = 0; i < a.size; i++) {
      output.components[i] = a.components[i] + b.components[i];
    }
    return output;
  }
  public static getMatrixSub(a: Matrix, b: Matrix) {
    const output = new Matrix(a.size);
    for (let i = 0; i < a.size; i++) {
      output.components[i] = a.components[i] - b.components[i];
    }
    return output;
  }
  public static getMatrixAverage(a: Matrix[]) {
    const output = new Matrix(a[0].size);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].size; j++) {
        output.components[j] += a[i].components[j]
      }
    }
    for(let i=0;i<output.size;i++){
      output.components[i] /= a.length;
    }
    return(output)
  }
  public static getMatrixMagnitude(a: Matrix) {
    let output = 0;
    for (let i = 0; i < a.size; i++) {
      output += a.components[i] * a.components[i];
    }
    return Math.sqrt(output);
  }
  public static getMatrixNormalize(a: Matrix, b: number = 1) {
    const output = new Matrix(a.size);
    let magnitude = 0;
    for (let i = 0; i < a.size; i++) {
      magnitude += a.components[i] * a.components[i];
    }
    magnitude = Math.sqrt(magnitude);
    for (let i = 0; i < a.size; i++) {
      output.components[i] = (a.components[i] * b) / magnitude;
    }
    return output;
  }
  public static getMatrixDistance(a: Matrix, b: Matrix) {
    let output = 0;
    for (let i = 0; i < a.size; i++) {
      output +=
        (a.components[i] - b.components[i]) *
        (a.components[i] - b.components[i]);
    }
    return Math.sqrt(output);
  }
  public static getMatrixClone(a: Matrix) {
    const output: Matrix = new Matrix(a.size);
    output.components = [...a.components];
    return output;
  }
}
export class Matrix2D {
  public components: Matrix[];
  constructor(size_x: number, size_y: number) {
    this.components = new Array(size_x);
    for (let i = 0; i < size_x; i++) {
      this.components[i] = new Matrix(size_y);
    }
  }
}
