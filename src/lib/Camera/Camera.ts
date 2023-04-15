export class Camera{
    public video:HTMLVideoElement = document.createElement("video");
    constructor(){
        navigator.mediaDevices.getUserMedia({video:{width:300,height:300}}).then((stream:MediaStream)=>{
            this.video.srcObject = stream;
            this.video.play();
        })
    }
    public getVideo(){
        return(this.video)
    }
}