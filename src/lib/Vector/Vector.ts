export class Vector{
    
    public x:number = 0;
    public y:number = 0;
    public z:number = 0;

    constructor (x:number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    public add = (v:Vector)=>{
        this.x+=v.x;
        this.y+=v.y;
        this.z+=v.z;
    }
}