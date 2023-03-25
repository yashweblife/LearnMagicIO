/**
 * # Functions to be added
 * Subtract (Vector)=>void
 * Multiply (number)=>void
 * Divide (number)=>void
 * Distance (Vector)=>number
 * Magnitude ()=>number
 * getAngle ()=>number 
 * Dot (Vector)=>void
 * Cross (Vector)=>void
 * RotateX (number)=>void
 * RotateY (number)=>void
 * RotateZ (number)=>void
 */
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