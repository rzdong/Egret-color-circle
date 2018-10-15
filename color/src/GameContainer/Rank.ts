class Rank extends BaseUILayer {

	private swiper: eui.Scroller;
	private shapebg
	private shapeWhite

	public constructor() {
		super()
	}


	protected init() {
		let Width = 350;
		let Height = 750;

        let vLayout = new eui.VerticalLayout();
		vLayout.gap = 6;
		vLayout.paddingTop = 5;
		vLayout.paddingRight = 5;
		vLayout.paddingBottom = 5;
		vLayout.paddingLeft = 5;

		this.shapebg = new BaseShape(this.stage.stageWidth, this.stage.stageHeight)
		this.shapebg.alpha = 0.3
		this.shapebg.touchEnabled = true;
		this.shapebg.graphics.beginFill(0x000000, 1)
		this.shapebg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
		this.shapebg.graphics.endFill();
		this.addChild(this.shapebg)
		this.shapebg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRank, this);

		this.shapeWhite = new BaseSprite()
		this.shapeWhite.width = Width;
		this.shapeWhite.height = Height;
		this.shapeWhite.x = -Width;
		this.shapeWhite.touchEnabled = true;
		this.shapeWhite.graphics.beginFill(0x000000, 0.7)
		this.shapeWhite.graphics.drawRect(0, 0, Width, Height);
		this.shapeWhite.graphics.endFill();
		this.addChild(this.shapeWhite)


		let group = new eui.Group();
		group.width = Width;
		group.height = Height - 150;
		group.layout = vLayout;
		this.shapeWhite.addChild(group);


		this.swiper = new eui.Scroller();
		this.swiper.width = Width;
		this.swiper.x = 0
		this.swiper.y = 150;
		this.swiper.height = Height - 150;
        this.swiper.scrollPolicyH = 'OFF'
		this.swiper.viewport = group;
		this.shapeWhite.addChild(this.swiper);
		this.swiper.verticalScrollBar.autoVisibility = false;
		this.swiper.verticalScrollBar.visible = false;

		

		let header = new eui.Label('排行榜')
		header.width = Width;
		header.height = 150;
		header.size = 50;
		header.textAlign = egret.HorizontalAlign.CENTER;
		header.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.shapeWhite.addChild(header);

		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))
		// group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'))

		let bit = platform.openDataContext.createDisplayObject(null,350, null) as egret.Bitmap
        group.addChild(new eui.Group().addChild(bit))
        platform.openDataContext.postMessage({
            command: 'open'
        })

		egret.Tween.get(this.shapeWhite).to({x: 0}, 300).call(() => {
			egret.Tween.removeTweens(this.swiper)
		})
		egret.Tween.get(this.shapebg).to({alpha: 0.3}, 300).call(() => {
			egret.Tween.removeTweens(this.shapebg);
		})
	}

	private closeRank(): void {
		platform.playAudio('resource/music/tap1.mp3')
		egret.Tween.get(this.shapeWhite).to({x: -350}, 300, egret.Ease.backOut).call(() => {
			egret.Tween.removeTweens(this.swiper);
			platform.openDataContext.postMessage({
                command: 'close'
            })
			this.removeChildren()
			this.parent.removeChild(this)
		})
		egret.Tween.get(this.shapebg).to({alpha: 0}, 280).call(() => {
			egret.Tween.removeTweens(this.shapebg);
		})
	}
}