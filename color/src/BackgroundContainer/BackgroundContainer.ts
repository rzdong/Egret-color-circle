class BackgroundContainer extends BaseUILayer{
	
	private particle: particle.GravityParticleSystem;

	public constructor() {
		super()
	}



	protected init(){
		console.log('BackgroundContainer已加载')
		// 初始化背景

		// let shape = new BaseShape(this.stage.stageWidth, this.stage.stageHeight);
		// shape.graphics.beginFill(0x222222);
		// shape.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
		// shape.graphics.endFill();
		// this.addChild(shape)

		let sky = new NetBitmap('resource/game_res/loadingbg.jpg')//'https://static01.coloros.com/bbs/data/attachment/forum/201312/27/174621xzs8lj9gzi28npu2.jpg'

        this.addChild(sky);
        
		let Width = this.stage.stageWidth;
        let Height = this.stage.stageHeight;


        let texture = RES.getRes("bgParticle_png");
        let config = RES.getRes("bgParticle_json");
        this.particle = new particle.GravityParticleSystem(texture, config)
        this.particle.x = Width / 2;
        this.particle.y = Height / 2;
        this.addChild(this.particle)
        this.particle.start()


        sky.width = Width;
        sky.height = Height;
		this.createStaticStars();
	}


	private createStaticStars(): void {
		for(let i=0;i<50;i++){
			this.createStar()
		}
	}


	private createStar(): void {
		let Width = this.stage.stageWidth;
        let Height = this.stage.stageHeight;
		let imgTemp = Util.createBitmapByName('bgParticle_png');
			imgTemp.x = Math.floor(Math.random() * (Width - 20) + 10);
			imgTemp.y = Math.floor(Math.random() * (Height - 20) + 10);
			imgTemp.width = Math.floor(Math.random() * 5 + 1);
			imgTemp.height = imgTemp.width;
			imgTemp.anchorOffsetX = imgTemp.width / 2;
			imgTemp.anchorOffsetY = imgTemp.width / 2;
			imgTemp.scaleX = 0.01;
			imgTemp.scaleY = 0.01;
			this.addChild(imgTemp);
			egret.Tween.get(imgTemp, {loop: true})
				.wait(Math.floor(Math.random() * 4000) + 3000)
				.to({scaleX: 1, scaleY: 1}, Math.floor(Math.random() * 1000) + 500)
				.wait(Math.floor(Math.random() * 3500) + 3500)
				.to({scaleX: 0.01, scaleY: 0.01}, Math.floor(Math.random() * 1000) + 500)
				.wait(Math.floor(Math.random() * 3000) + 4000)
				.to({scaleX: 1, scaleY: 1}, Math.floor(Math.random() * 1000) + 500)
				.wait(Math.floor(Math.random() * 3500) + 3500)
				.to({scaleX: 0.01, scaleY: 0.01}, Math.floor(Math.random() * 1000) + 500)
				.call(() => {
					// imgTemp.x = Math.floor(Math.random() * (Width - 20) + 10);
					// imgTemp.y = Math.floor(Math.random() * (Height - 20) + 10);
				})
	}
}