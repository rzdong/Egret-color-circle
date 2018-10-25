class Grade extends BaseUILayer {

	private _GameContainer: GameContainer;

	private backBitmap: egret.Bitmap;
	private swiper: eui.Scroller;

	private _info: eui.Label

	public constructor(GC: GameContainer) {
		super()
		this._GameContainer = GC;
	}


	protected init() {
		let Width = 700;
		let Height = 500;

		this.backBitmap = Util.createBitmapByName('back_png');
		this.backBitmap.touchEnabled = true;
		this.backBitmap.width = 200 * 0.6;
		this.backBitmap.height = 130 * 0.5;
		this.backBitmap.anchorOffsetX = this.backBitmap.width / 2;
		this.backBitmap.anchorOffsetY = this.backBitmap.height / 2;
		this.backBitmap.x = this.backBitmap.width / 2 + 10;
		this.backBitmap.y = this.backBitmap.height / 2 + 16;
		this.addChild(this.backBitmap);
		this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.backBegin, this);


		let vLayout = new eui.VerticalLayout();
		vLayout.gap = 30;
		vLayout.paddingTop = 15;
		vLayout.paddingRight = 15;
		vLayout.paddingBottom = 15;
		vLayout.paddingLeft = 15;

		let group = new eui.Group();
		group.width = Width;
		group.height = Height;
		group.layout = vLayout;
		this.addChild(group);


		this.swiper = new eui.Scroller();
		this.swiper.width = Width;
		this.swiper.height = Height;
		this.swiper.horizontalCenter = 0;
		this.swiper.verticalCenter = -this.stage.stageHeight / 2;
		this.swiper.viewport = group;
		this.addChild(this.swiper);
		this.swiper.verticalScrollBar.autoVisibility = false;
		this.swiper.verticalScrollBar.visible = false;


		let label1 = new eui.Label();
		label1.text = '请选择一个难度(注意：只有 [一般] 及其以上的难度才会被计入排行榜)';
		label1.textColor = 0xffffff;
		label1.size = 30;
		label1.horizontalCenter = 0
		label1.verticalCenter = -this.stage.stageHeight / 2;
		this.addChild(label1);

		///单选按钮组
        var radioGroup:eui.RadioButtonGroup = new eui.RadioButtonGroup();
		
        /*** 本示例关键代码段开始 ***/

		var radio0:eui.RadioButton = new eui.RadioButton();
		radio0.height = 50;
        radio0.label = "手残党（950ms）";
        ///设置单选按钮所属组件，同一组件内的只能选择一个单选按钮组
        radio0.group = radioGroup;
        radio0.value = "950";
        radio0.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio0);

        var radio1:eui.RadioButton = new eui.RadioButton();
		radio1.height = 50;
        radio1.label = "入门（750ms）";
        ///设置单选按钮所属组件，同一组件内的只能选择一个单选按钮组
        radio1.group = radioGroup;
        radio1.value = "750";
        radio1.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio1);


        var radio2:eui.RadioButton = new eui.RadioButton();
		radio2.height = 50;
        radio2.label = "简单（710ms）";
        radio2.group = radioGroup;
        radio2.value = "710";
        radio2.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio2);

        var radio3:eui.RadioButton = new eui.RadioButton();
		radio3.height = 50;
        radio3.label = "一般（680ms）";
        radio3.group = radioGroup;
        radio3.value = "680";
        radio3.addEventListener(egret.Event.CHANGE,this.onChange,this);
        group.addChild(radio3);

		var radio4:eui.RadioButton = new eui.RadioButton();
		radio4.height = 50;
        radio4.label = "困难（625ms）";
        radio4.group = radioGroup;
        radio4.value = "625";
        radio4.addEventListener(egret.Event.CHANGE,this.onChange,this);
		group.addChild(radio4);

		var radio5:eui.RadioButton = new eui.RadioButton();
		radio5.height = 50;
        radio5.label = "非人类（510ms）";
        radio5.group = radioGroup;
        radio5.value = "510";
        radio5.addEventListener(egret.Event.CHANGE,this.onChange,this);
		group.addChild(radio5);
        
		radioGroup.selectedValue = Data.i().grade + '';

		this.addChild(this.swiper)
	
		egret.Tween.get(this.swiper).to({verticalCenter: 70}, 400, egret.Ease.backOut).call(() => {
			egret.Tween.removeTweens(this.swiper);
		})
		egret.Tween.get(label1).to({verticalCenter: -Height / 2}, 400, egret.Ease.backOut).call(() => {
			egret.Tween.removeTweens(label1);
		})

	}

	private onChange(e:egret.Event){
		platform.playAudio('resource/music/tap.wav')
        var radioButton = <eui.RadioButton>e.target;
        ///获取选择到的单选按钮的值
        let value = radioButton.value;
		Data.i().grade = Number(value)
		platform.setToStorage('_KEY_GRADE_', value)
		let str = ''
		switch(value){
			case "950":
				str = "手残党";
				break;
			case "750":
				str = "入门";
				break;
			case "710":
				str = "简单";
				break;
			case "680":
				str = "一般";
				break;
			case "625":
				str = "困难";
				break;
			case "510":
				str = "非人类";
				break;

		}
		Data.i().Toast('已为您切换到 [' + str + '] 级别')
		console.log('value: ' + value, str)
    }

	private backBegin(): void {
		this.backBitmap.scaleX = 0.9;
		this.backBitmap.scaleY = 0.9;
		this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
		this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this)
	}

	private backEnd(ev): void {
		this.backBitmap.scaleX = 1;
		this.backBitmap.scaleY = 1;
		this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
		this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this)

		if(ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){

        }else if(ev.type == egret.TouchEvent.TOUCH_END){
			platform.playAudio('resource/music/tap1.mp3')
            console.log('进入游戏')
            this.beforeRemove();
			this._GameContainer.createHome()
        }
	}

	private beforeRemove(): void {
		this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.backEnd, this)
		
		this.parent.removeChild(this)
	}
}