/**
 * uilayer基类
 * 
 */

class BaseShape extends egret.Shape{
    public width: number;
    public height: number;

    constructor(width: number, height: number){
        super();
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    }


    protected init(){
        
        // console.log('11')
    }

    private remove(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    }
}