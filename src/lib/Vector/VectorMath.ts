export class VectorArray extends Array {
  public getAdd(a: VectorArray) {
    const output = new VectorArray();
    for (let i = 0; i < this.length; i++) {
      output.push(this[i] + a[i]);
    }
    return output;
  }
  public getSub(a: VectorArray) {
    const output = new VectorArray();
    for (let i = 0; i < this.length; i++) {
      output.push(this[i] - a[i]);
    }
    return output;
  }
  public getMagnitude() {
    let output = 0;
    for (let i = 0; i < this.length; i++) {
      output += this[i] ** 2;
    }
    return Math.sqrt(output);
  }
  public getNormalized(a: number) {
    const output = new VectorArray();
    let mag = 0;
    for (let i = 0; i < this.length; i++) {
      mag += this[i] ** 2;
    }
    mag = Math.sqrt(mag);
    for (let i = 0; i < this.length; i++) {
      output.push((this[i] * a) / mag);
    }
    return output;
  }
  public getDistance(a: VectorArray) {
    let output = 0;
    for (let i = 0; i < this.length; i++) {
      output += (this[i] - a[i]) ** 2;
    }
    return Math.sqrt(output);
  }
  public getDot(a:VectorArray){
    let output=0;
    for(let i=0;i<this.length;i++){
        output+= (this[i]*a[i]);
    }
    return(output);
  }
}
