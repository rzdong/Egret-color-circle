class Toast extends BaseUILayer {


    private toastArr = [];

    constructor(){
        super();
        this.touchThrough = true;
    }

    protected init(): void {




    }

    public Toast(str: string, time?: number): void {
        let toast = new ToastChild(str, time);
        // this.toastArr.push(toast);
        this.addChild(toast);
    }
}

class ToastChild extends BaseSprite {
    
    private text: string = '';
    private size: number = 28;
    private time: number = 2000;

    constructor(str: string, time?: number){
        super();
        this.text = str;
        if(time) this.time = time;
    }

    protected init(): void {
        this.alpha = 0
        let Width = this.stage.stageWidth;
        let Height = this.stage.stageHeight;


        this.width = this.text.length * this.size + 30 *2;
        this.height = this.size + 30 * 2;

        this.graphics.beginFill(0xffffff, 0.8);
        this.graphics.drawRoundRect(0, 0, this.width, this.height, 30);
        this.graphics.endFill();

        this.x = (Width - this.width) / 2;
        this.y = (Height - this.height) / 2 + 80;

        let textFild = new egret.TextField();
        textFild.size = this.size;
        textFild.text = this.text;
        textFild.textColor = 0x000000;
        textFild.width = this.width;
        textFild.height = this.height;
        textFild.textAlign = egret.HorizontalAlign.CENTER;
        textFild.verticalAlign = egret.VerticalAlign.MIDDLE;

        this.addChild(textFild);

        egret.Tween.get(this).to({y: (Height - this.height) / 2, alpha: 1}, 300).wait(this.time).to({alpha: 0, y: (Height - this.height) / 2 - 20}, 300).call(() => {
            egret.Tween.removeTweens(this);
            this.parent.removeChild(this)
        })

    }

}