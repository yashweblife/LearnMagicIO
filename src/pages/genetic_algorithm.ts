import { GeneticAlgorithm } from "../Projects/GeneticAlgo";
import "../styles/article.scss";
import "../styles/common.scss";
import "./article";

const app = new GeneticAlgorithm();
const saveButton = document.querySelector("#save-button")
const deleteButton = document.querySelector("#delete-button")

saveButton?.addEventListener("click", () => {
    localStorage.setItem("best-agent",JSON.stringify(app.bestAgent.dna)) 
});
deleteButton?.addEventListener("click", () => {
    localStorage.removeItem("best-agent")
})
if(localStorage.getItem("best-agent")){
    const dna = JSON.parse(localStorage.getItem("best-agent")!);
    app.createAgentsFromBaseDNA(dna)
}
deleteButton?.addEventListener("click", () => {});
function animation(){
    app.animate();
    requestAnimationFrame(animation)
}
animation();