const terms: string[] = [
  "collision detection",
  "vector",
  "canvas",
  "Matrix",
  "Graph",
  "Infection Simulator",
  "Genetic Algorithm",
];

export class SearchBar {
  public dom: HTMLSelectElement = document.createElement("select");
  constructor(public parent: HTMLElement) {
    parent.append(this.dom);
    terms.forEach((val:string)=>{
        this.createOption(val);
        console.log(1)
    })
  }
  createOption(name: string) {
    const option = document.createElement("option");
    option.innerText = name;
    this.dom.append(option);
  }

}
