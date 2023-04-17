/**
 * ### Vector
 * Vectors is a simple way to keep account of positional data
 */

export class Vector {
  /**
   *
   * @param x : x value; default is 0
   * @param y : y value; default is 0
   * @param z : z value; default is 0
   */
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  /**
   * adds a vector
   * @param v
   */
  public add = (v: Vector) => {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  };
  /**
   * subtracts a vector
   * @param s
   */
  public sub = (s: Vector) => {
    this.x -= s.x;
    this.y -= s.y;
    this.z -= s.z;
  };
  /**
   * multiplies vector with a number
   * @param m
   */
  public mul = (m: number) => {
    this.x *= m;
    this.y *= m;
    this.z *= m;
  };
  /**
   * divides vector with a number
   * @param d
   */
  public div = (d: number) => {
    this.x /= d;
    this.y /= d;
    this.z /= d;
  };
  /**
   * returns distance between vectors
   * @param v
   * @returns
   */
  public distance = (v: Vector): number => {
    return Math.sqrt(
      (this.x - v.x) ** 2 + (this.y - v.y) ** 2 + (this.z - v.z) ** 2
    );
  };
  /**
   * returns vector magnitude
   * @returns
   */
  public mag = (): number => {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  };
  /**
   * returns angle of the vector
   * @returns
   */
  public angle = (): number => {
    var angle = Math.atan2(this.y, this.x);
    var degrees = (180 * angle) / Math.PI;
    return (360 + Math.round(degrees)) % 360;
  };
  /**
   * returns vector dot product
   * @param v
   * @returns
   */
  public dot = (v: Vector): number => {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  };
  /**
   * returns vector cross product
   * @param v
   * @returns
   */
  public cross = (v: Vector): Vector => {
    const x = this.x * v.y - this.y * v.x;
    const y = this.y * v.z - this.z * v.y;
    const z = this.z * v.x - this.x * v.z;
    return new Vector(x, y, z);
  };
  public rotateX = (angle: number) => {
    this.x = this.x;
    this.y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
    this.z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
  };
  public rotateY = (angle: number) => {
    this.x = this.x * Math.cos(angle) + this.z * Math.sin(angle);
    this.y = this.y;
    this.z = -this.x * Math.sin(angle) + this.z * Math.cos(angle);
  };
  public rotateZ = (angle: number) => {
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.z = this.z;
  };
  public clone = () => {
    return new Vector(this.x, this.y, this.z);
  };
  public normalize = (val: number = 1) => {
    const m = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    this.mul(val / m);
  };
  public static getAdd(vec1:Vector,vec2:Vector){
    return(
      new Vector(
        vec1.x+vec2.x,
        vec1.y+vec2.y
      )
    )
  }
  public static getRandom(mag:number=1){
    return new Vector(Math.random()*mag, Math.random()*mag);
  }
}

export function lerp(a: number, b: number, c: number) {
  return a + (b - a) * c;
}
/*
export function vectorAdd(a:Vector, b:Vector):Vector{}
export function vectorAddArray(a:Vector[]):Vector{}
export function vectorSubtract(a:Vector, b:Vector):Vector{}
export function vectorSubtractArray(a:Vector[]):Vector{}
export function vectorMultiply(a:Vector, b:Vector):Vector{}
export function vectorMultiplyArray(a:Vector[]):Vector{}
export function vectorAverageArray(a:Vector[]):Vector{}
export function vectorRandom(a:number=-1, b:number=1):Vector{}
export function vectorRandomArray(a:number=-1, b:number=1):Vector[]{}
export function vectorLerp(a:Vector,b:Vector,c:number):Vector{}
export function vecToMatrix(a:Vector){}
export function largestVector(a:Vector[]){}
export function smallestVector(a:Vector[]){}
*/
