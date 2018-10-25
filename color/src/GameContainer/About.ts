class About extends BaseUILayer {

	private _GameContainer: GameContainer;

	private backBitmap: egret.Bitmap;
	private swiper: eui.Scroller;


	public constructor(GC: GameContainer) {
		super()
		this._GameContainer = GC;
	}


	protected init() {
		platform.hideFeedBack()
		let Width = this.stage.stageWidth - 300;
		let Height = this.stage.stageHeight - 200;

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
		vLayout.gap = 60;
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


		group.addChild(new eui.Label('1. 点击左右控制圆环转动，在球落下的时候，保证下方的颜色与球颜色一致'))

		group.addChild(new eui.Label('2. 有任何建议或者意见可以点击首页右下角建议按钮提供给开发者'))

		group.addChild(new eui.Label('3. 排行榜优化，设置功能，后续会跟进'))


		this.addChild(this.swiper)
	

		let label = new eui.Label('')

		egret.Tween.get(this.swiper).to({verticalCenter: 0}, 400, egret.Ease.backOut).call(() => {
			egret.Tween.removeTweens(this.swiper);
		})


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
			egret.setTimeout(() => {
                this.beforeRemove();
				this._GameContainer.createHome()
            }, this, 80)
            
        }
	}

	private beforeRemove(): void {
		this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.backEnd, this)
		this.parent.removeChild(this)
	}
}