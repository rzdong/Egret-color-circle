class SoundContainer {
    private soundArr: any = {};
    private arr = [];
    constructor(arr){
        this.arr = arr
        this.init()
    }

    private init() {

        for(let i = 0;i<this.arr.length;i++){
            this.soundArr[this.arr[i]] = new Sound(this.arr[i])
        }
    }


    public getSound(str: string){

        return this.soundArr[str]
    }




}

class Sound {
    private soundChanner: egret.SoundChannel;
    
    private sound: egret.Sound;

    /**
     * @param str string 资源名字
     */
    constructor(str: string){
        this.sound = RES.getRes(str)
    }


    public play() {
        this.soundChanner = this.sound.play(0, 1)
    }

    public stop() {
        this.soundChanner.stop();
    }

}