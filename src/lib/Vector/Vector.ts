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
  public Add(vec1: Vector) {
    return new Vector(this.x + vec1.x, this.y + vec1.y, this.z + vec1.z);
  }
  public RotateX(angle: number) {
    return new Vector(
      this.x,
      this.y * Math.cos(angle) - this.z * Math.sin(angle),
      this.y * Math.sin(angle) + this.z * Math.cos(angle)
    );
  }
  public RotateY(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) + this.z * Math.sin(angle),
      this.y,
      -this.x * Math.sin(angle) + this.z * Math.cos(angle)
    );
  }
  public RotateZ(angle: number) {
    return new Vector(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle),
      this.z
    );
  }
  public static getAdd(vec1: Vector, vec2: Vector) {
    return new Vector(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
  }
  public static getSub(vec1: Vector, vec2: Vector) {
    return new Vector(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
  }
  public getScale(val: number) {
    return new Vector(this.x * val, this.y * val, this.z * val);
  }
  public static getRandom(mag: number = 1) {
    return new Vector(Math.random() * mag, Math.random() * mag);
  }
}

export class VectorMath {
  public static getVectorAdd(a: Vector, b: Vector) {
    return new Vector(a.x + b.x, a.y + b.y, a.z + b.z);
  }
  public static getVectorSubtract(a: Vector, b: Vector) {
    return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  public static getVectorMultiply(a: Vector, b: Vector) {
    return new Vector(a.x * b.x, a.y * b.y, a.z * b.z);
  }
  public static getVectorMagnitude(a: Vector) {
    return Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2);
  }
  public static getVectorDistance(a: Vector, b: Vector) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.x) ** 2 + (a.z - b.z) ** 2);
  }
  public static getVectorNormalize(a: Vector, b: number = 1) {
    const mag = Math.sqrt(a.x ** 2 + a.y ** 2 + a.z ** 2);
    return new Vector((a.x * b) / mag, (a.y * b) / mag, (a.z * b) / mag);
  }
  public static getVectorRotateX(a: Vector, b: number = 0) {
    return new Vector(
      a.x,
      a.y * Math.cos(b) - a.z * Math.sin(b),
      a.y * Math.sin(b) + a.z * Math.cos(b)
    );
  }
  public static getVectorRotateY(a: Vector, b: number = 0) {
    return new Vector(
      a.x * Math.cos(b) + a.z * Math.sin(b),
      a.y,
      -a.x * Math.sin(b) + a.z * Math.cos(b)
    );
  }
  public static getVectorRotateZ(a: Vector, b: number = 0) {
    return new Vector(
      a.x * Math.cos(b) - a.y * Math.sin(b),
      a.x * Math.sin(b) + a.y * Math.cos(b),
      a.z
    );
  }
}
