class About extends BaseUILayer {



	public constructor() {
		super()
	}


	protected init() {
		let Width = 800;
		let Height = 500;

		let vLayout = new eui.VerticalLayout();
		vLayout.gap = 10;
		vLayout.paddingTop = 15;
		vLayout.paddingRight = 15;
		vLayout.paddingBottom = 15;
		vLayout.paddingLeft = 15;

		let group = new eui.Group();
		group.width = Width;
		group.height = Height;
		group.layout = vLayout;
		this.addChild(group);


		let swiper = new eui.Scroller();
		swiper.width = Width;
		swiper.height = Height;
		swiper.horizontalCenter = 0;
		swiper.verticalCenter = -this.stage.stageHeight / 2;
		swiper.viewport = group;
		this.addChild(swiper);
		swiper.verticalScrollBar.autoVisibility = false;
		swiper.verticalScrollBar.visible = false;


		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))
		group.addChild(new eui.Label('任振东'))

		this.addChild(swiper)
	
		egret.Tween.get(swiper).to({verticalCenter: 0}, 500, egret.Ease.backOut).call(() => {
			egret.Tween.removeTweens(swiper);
		})


	}
}