import { Ball } from "../lib/Ball/Ball";
import { Canvas } from "../lib/Canvas";
import { Vector, VectorMath } from "../lib/Vector/Vector";

export class Agent extends Ball {
  public dna: Vector[] = VectorMath.getVectorRandomArray(100, 1);
  public fitness: number = 0;
  public dead: boolean = false;
  constructor(position: Vector = new Vector(10, 300)) {
    super();
    this.pos = position;
    this.size = 2;
    this.color = "rgba(255,0,0,1)";
  }
  public calculateFitness(target: Vector) {
    if (this.dead) {
      this.fitness = 1000000;
    } else {
      this.fitness = this.pos.distance(target);
    }
    return this.fitness;
  }
  public mutate() {
    for (let i = 0; i < this.dna.length; i++) {
      if (Math.random() > 0.9) {
        this.dna[i].mul((Math.random()-0.5) * 2);
      }
    }
  }
  public breed(a: Agent) {
    const baba = new Agent();
    for (let i = 0; i < this.dna.length; i++) {
      if (Math.random() > 0.5) {
        baba.dna[i] = this.dna[i];
      } else {
        baba.dna[i] = a.dna[i];
      }
    }
    return baba;
  }
  public update(time: number = 0): void {
    if (this.dead) return;
    if (Math.floor(time) < this.dna.length) {
      this.acc = this.dna[Math.floor(time)];
    }
    this.vel.add(this.acc);
    this.vel.mul(0.9);
    this.pos.add(this.vel);
  }
  public static fromDNA(dna: Vector[]) {
    const output = new Agent();
    for(let i=0;i<dna.length;i++){
        const {x,y,z} = dna[i]
        output.dna[i] = new Vector(x,y,z);
    }
    return output;
  }
}

export class GeneticAlgorithm {
  public agents: Agent[] = [];
  public canvas: Canvas;
  public time: number = 0;
  public target: Vector;
  public blocks: Vector[][] = new Array(3);
  public bestAgent: Agent = new Agent();
  constructor(parent: HTMLElement = document.body) {
    this.canvas = new Canvas({ parent: parent, size: new Vector(500, 500) });
    this.createAgents();
    this.target = new Vector(this.canvas.size.x - 10, this.canvas.size.y / 2);
    this.blocks[0] = [new Vector(100, 0), new Vector(10, 100)];
    this.blocks[1] = [new Vector(200, 200), new Vector(10, 100)];
    this.blocks[2] = [new Vector(300, 0), new Vector(10, 100)];
  }
  private createAgents() {
    for (let i = 0; i < 100; i++) {
      this.agents.push(new Agent());
    }
  }
  public createAgentsFromBaseDNA(dna: Vector[]) {
    const output = [];
    for (let i = 0; i < 100; i++) {
      const agent = Agent.fromDNA(dna);
      agent.mutate();
      output.push(agent);
    }
    this.agents = [...output];
  }
  public checkCollision() {
    this.agents.forEach((agent: Agent) => {
      for (let i = 0; i < this.blocks.length; i++) {
        //Check if the agent collides with the block where the
        if (
          agent.pos.x < this.blocks[i][0].x + this.blocks[i][1].x &&
          agent.pos.x + agent.size > this.blocks[i][0].x &&
          agent.pos.y < this.blocks[i][0].y + this.blocks[i][1].y &&
          agent.pos.y + agent.size > this.blocks[i][0].y
        ) {
          agent.dead = true;
        }
      }
    });
  }
  public draw() {
    this.canvas.background("rgba(255,255,255,0.1)")
    this.canvas.start();
    this.canvas.arc(this.target, 10);
    this.canvas.fill("green");
    this.canvas.end();
    this.agents.forEach((agent: Agent) => {
      agent.draw(this.canvas);
    });
    this.blocks.forEach((block: Vector[]) => {
      this.canvas.start();
      this.canvas.rect(block[0], block[1]);
      this.canvas.fill("red");
      this.canvas.end();
    });
  }
  public calculateFitness() {
    let average = 0;
    this.agents.forEach((agent: Agent) => {
      average += agent.calculateFitness(this.target);
    });
    average /= this.agents.length;
    const best: Agent[] = [];
    this.agents.forEach((agent: Agent) => {
      if (agent.fitness < average) {
        best.push(agent);
      }
    });
    return best;
  }
  public breed(input: Agent[]) {
    const output: Agent[] = [];
    if (input.length == 0) return;
    this.bestAgent = input.find(
      (agent: Agent) =>
        agent.fitness == Math.min(...input.map((a: Agent) => a.fitness))
    )!;
    for (let i = 0; i < 100; i++) {
      if (Math.random() > 0.2) {
        const newBaba = this.bestAgent.breed(
          input[Math.floor(Math.random() * input.length)]
        );
        newBaba.mutate();
        output.push(newBaba);
      } else {
        const newBaba = input[Math.floor(Math.random() * input.length)].breed(
          input[Math.floor(Math.random() * input.length)]
        );
        newBaba.mutate();
        output.push(newBaba);
      }
    }
    return output;
  }
  public update() {
    this.agents.forEach((agent: Agent) => {
      agent.update(this.time);
    });
    this.checkCollision();
    this.time += 1;
    if (Math.floor(this.time) >= 100) {
      this.time = 0;
      const test = this.breed(this.calculateFitness());
      if (test) {
        this.agents = [...test];
      }
    }
  }
  public animate() {
    this.update();
    this.draw();
  }
}
