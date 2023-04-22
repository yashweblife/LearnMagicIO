export class CameraDemo{
    public video:HTMLVideoElement;
    public stream:(MediaStream|undefined);
    constructor(){
        this.video = document.createElement("video")!;
        navigator.mediaDevices.getUserMedia({
            video:true
        }).then((stream:MediaStream)=>{
            this.video.srcObject=stream;
            this.stream = stream;
            this.video.play();
        })
    }
    public animation(){

    }
}