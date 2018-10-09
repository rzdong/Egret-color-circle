/**
 * 自定义事件类
 * 
 * 继承自egret.Event
 * 
 * 
 */

class GameEvent extends egret.Event {


    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false){
        super(type,bubbles,cancelable);
    }

    /**
     * 事件触发类
     * 
     * 事件接收类
     * 
     * 事件传递参数
     */
    public static DATE:string = "事件名字";
    public _year: number = 0;
    

    public static changeScene: string = "changeScene";
    public sceneType: string;

}