import { Camera } from "./Projects/Camera";

const camera = new Camera();
function animate(){
    camera.drawImage()
    requestAnimationFrame(animate)
}
animate();