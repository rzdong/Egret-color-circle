/**
 * 全局单例，数据存储
 * 
 * 继承Event，可以收发事件
 * 
 */

class Data extends egret.EventDispatcher{
    public static data: Data = null;
    public static i(): Data{
        if(this.data){
            return this.data;
        }else {
            this.data = new Data();
            return this.data;
        }
    }

    public toast: Toast = null;
    public Toast(str: string, time?: number){
        this.toast.Toast(str, time)
    }


    public sound: SoundContainer;
    public Sound(str: string): Sound{
        return this.sound.getSound(str);
    }


    public grade: number = 750;

    
}