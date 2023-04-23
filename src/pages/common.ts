export const list_of_projects:string[] = [
    "animation",
    "apis",
    "arduino",
    "article",
    "ball",
    "boid",
    "brownian_motion",
    "camera",
    "canvas",
    "classes",
    "collisions",
    "common",
    "datatypes",
    "firebase",
    "genetic_algorithm",
    "gravity",
    "index",
    "infection_simulator",
    "neural_networks",
    "pixel_art",
    "programming",
    "README",
    "resources",
    "rope",
    "seeking_behavior",
    "sorting",
    "vector",
    "vector_fields",
    "videoGame",
    "webcam",
    "web_development",
];
export function Footer(){
    let footer = document.createElement("footer")
    for(let i=0;i<list_of_projects.length;i++){
        const link = document.createElement("a")
        link.href = "./"+list_of_projects[i]
        link.innerText = list_of_projects[i].toUpperCase().split("_").join(" ");
        footer.appendChild(link)
    }
    return(footer);
}