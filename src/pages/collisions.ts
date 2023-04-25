import { Canvas, Color } from "../lib/Canvas";
import { Vector, VectorMath } from "../lib/Vector";
import { Face } from "../lib/Vector/Face";
import { Line } from "../lib/Vector/Line";
import "../styles/article.scss";
import "../styles/common.scss";
import "./article";
const points = []
for(let i=-Math.PI;i<Math.PI;i+=0.2){
    points.push(new Vector(Math.cos(i), Math.sin(i)))
}

const canvas=new Canvas({parent:document.body,size:new Vector(300,300)});
// points.forEach((p:Vector)=>{
//     canvas.start();
//     canvas.arc(VectorMath.getVectorAdd(new Vector(105,105),p.getScale(100)),1),
//     canvas.fill();
//     canvas.end();
// })
const lines = []
for(let i=0;i<points.length-1;i++){
    lines.push(new Line(VectorMath.getVectorAdd(new Vector(105,105),points[i].getScale(100)), VectorMath.getVectorAdd(new Vector(105,105),points[i+1].getScale(100))))
}

lines.push(new Line(VectorMath.getVectorAdd(new Vector(105,105),points[points.length-1].getScale(100)), VectorMath.getVectorAdd(new Vector(105,105),points[0].getScale(100))))
const f = new Face(lines);
f.setColor(new Color(255,0,0,0))
f.drawLines(canvas)