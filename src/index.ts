import { Converter } from 'showdown';
import "./styles/index.scss";

const t = new Converter();
var op = t.makeHtml(''+document.getElementById('test')?.innerHTML)
console.log(op) 
document.body.append(op)