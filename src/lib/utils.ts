export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
export function createDOM(a: string = "div") {
  return document.createElement(a);
}
export function toggleDOM(a: string, b: string) {
  document.querySelector(a)?.classList.toggle(b);
}
