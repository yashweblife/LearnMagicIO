export class Color {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 1
  ) {}
  public dark(val: number) {
    return new Color(this.r - val, this.g - val, this.b - val, this.a);
  }
  public setAlpha(val: number) {
    return new Color(this.r, this.g, this.b, this.a - val);
  }
  public toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }
}
