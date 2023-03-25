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
 * (number, number)=>number
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
    public sub = (s:Vector)=>{
        this.x-=s.x;
        this.y-=s.y;
        this.z-=s.z;
    }
    public mul = (m:number)=>{
        this.x*=m;
        this.y*=m;
        this.z*=m;
    }
    public div = (d:number)=>{
        this.x/=d;
        this.y/=d;
        this.z/=d;
    }
    public dist = (v:Vector):number=>{
        return Math.sqrt((this.x - v.x)**2 + (this.y - v.y)**2 + (this.z - v.z)**2);
    }
    public mag = ():number=>{
        return Math.sqrt((this.x)**2 + (this.y)**2 + (this.z)**2);
    }
    public angle = ():number=>{
        var angle = Math.atan2(this.y, this.x);
        var degrees = 180 * angle / Math.PI;
        return (360 + Math.round(degrees)) % 360;
    }
    public dot = (v:Vector)=>{
        this.x*v.x + this.y*v.y + this.z*v.z;
    }
    public cross = (v:Vector)=>{
        this.x*v.y - this.y*v.x;
        this.y*v.z - this.z*v.y;
        this.z*v.x - this.x*v.z;
    }
    public rotateX = (angle: number) => {
        this.x;
        this.y * Math.cos(angle) - this.z * Math.sin(angle);
        this.y * Math.sin(angle) + this.z * Math.cos(angle);
      };
      public rotateY = (angle: number) => {
        this.x * Math.cos(angle) + this.z * Math.sin(angle);
        this.y;
        -this.x * Math.sin(angle) + this.z * Math.cos(angle);
      };
      public rotateZ = (angle: number) => {
        this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.z;
      };

}