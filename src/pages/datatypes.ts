import "../styles/common.scss"
import "../styles/article.scss"

function illus1(){
    const parent = document.createElement("div")
    const dom = document.querySelector('#illus1')
    parent.style.display="grid"
    parent.style.gridTemplateColumns="repeat(50,1fr)"
    for(let i=0;i<50;i++){
        let x = document.createElement("div")
        x.style.border="1px solid black"
        x.style.width="100%"
        x.style.aspectRatio="1/1"
        x.style.borderRadius="50%"
        parent.append(x)
    }
    dom?.append(parent)
}
function illus2(){
    const parent = document.createElement("div")
    const dom = document.querySelector('#illus2')
    parent.style.display="grid"
    parent.style.gridTemplateColumns="repeat(50,1fr)"
    for(let i=0;i<50;i++){
        let x = document.createElement("div")
        x.style.border="1px solid black"
        x.style.width="100%"
        x.style.aspectRatio="1/1"
        x.style.borderRadius="50%"
        if(i<8){
            x.style.backgroundColor = "rgb(100,100,100)"
        }
        parent.append(x)
    }
    dom?.append(parent)
}
function illus3(){
    const parent = document.createElement("div")
    const dom = document.querySelector('#illus3')
    parent.style.display="grid"
    parent.style.gridTemplateColumns="repeat(50,1fr)"
    for(let i=0;i<50;i++){
        let x = document.createElement("div")
        x.style.border="1px solid black"
        x.style.width="100%"
        x.style.aspectRatio="1/1"
        x.style.borderRadius="50%"
        if(i<15){
            x.style.backgroundColor = "rgb(100,100,100)"
        }
        parent.append(x)
    }
    dom?.append(parent)
}
function illus4(){
    const parent = document.createElement("div")
    const dom = document.querySelector('#illus4')
    parent.style.display="grid"
    parent.style.gridTemplateColumns="repeat(50,1fr)"
    for(let i=0;i<50;i++){
        let x = document.createElement("div")
        x.style.border="1px solid black"
        x.style.width="100%"
        x.style.aspectRatio="1/1"
        x.style.borderRadius="50%"
        if(i<23){
            x.style.backgroundColor = "rgb(100,100,100)"
        }
        parent.append(x)
    }
    dom?.append(parent)
}


illus1();
illus2();
illus3();
illus4();   