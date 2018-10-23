class Game extends BaseUILayer {

    private leftBtn: egret.Sprite // 左侧按钮

    private rightBtn: egret.Sprite // 右侧按钮

    private circleGroup: BaseEUIGroup // 圆环容器

    private currentColorIndex: number // 当前转到对应的颜色索引 
    private nextColorIndex: number

    private jumpSound;

    private currentDeg: number = 0 // 当前转过的角度。

    private colorList: Array<string> // 颜色数组
    private colorTexture: Array<egret.Texture>


    private ball: egret.Bitmap;

    private score: eui.Label;

    private backBitmap: egret.Bitmap; // 后退按钮
    // private circleStatus: Array<any> = []
    private _GameContainer: GameContainer; // 父类实例

    constructor(GC: GameContainer){
        super();
        this._GameContainer = GC;
    }

    protected init() {
        console.log('Game已加载')
        platform.hideFeedBack()
        this.colorList = ['violet', 'dyellow', 'blue', 'red' ,'yellow', 'green']
        this.colorTexture = [
                RES.getRes('circle-violte_png'),
                RES.getRes('circle-dyellow_png'),
                RES.getRes('circle-blue_png'),
                RES.getRes('circle-red_png'),
                RES.getRes('circle-yellow_png'),
                RES.getRes('circle-green_png')
            ]
        this.jumpSound = Data.i().Sound('jump_wav')
        this.currentColorIndex = 0;
        this.nextColorIndex = 0;
        
        

        let Width = this.stage.stageWidth;
        let Height = this.stage.stageHeight;

        this.leftBtn = new egret.Sprite();
        this.leftBtn.touchEnabled = true;
        this.leftBtn.width = 270;
        this.leftBtn.height = 500;  
        this.leftBtn.x = -this.leftBtn.width;
        this.leftBtn.y = (Height - this.leftBtn.height) / 2
        this.leftBtn.graphics.beginFill(0xaaaaaa, 0.25);
        this.leftBtn.graphics.drawRoundRect(0, 0, this.leftBtn.width, this.leftBtn.height, 20);
        this.leftBtn.graphics.endFill();
        this.addChild(this.leftBtn);

        let group = new eui.Group();
        group.width = this.leftBtn.width;
        group.height = this.leftBtn.height;
        this.leftBtn.addChild(group);

        let leftText = new eui.Label();
        leftText.text = 'Left';
        leftText.size = 40;
        leftText.textColor = 0xeeeeee;
        leftText.verticalCenter = 0;
        leftText.horizontalCenter = 0;
        group.addChild(leftText)




        this.rightBtn = new egret.Sprite();
        this.rightBtn.touchEnabled = true;
        this.rightBtn.width = 270;
        this.rightBtn.height = 500;
        this.rightBtn.x = Width;
        this.rightBtn.y = (Height - this.rightBtn.height) / 2
        this.rightBtn.graphics.beginFill(0xaaaaaa, 0.25);
        this.rightBtn.graphics.drawRoundRect(0, 0, this.rightBtn.width, this.rightBtn.height, 20);
        this.rightBtn.graphics.endFill();
        this.addChild(this.rightBtn);

        let group1 = new eui.Group();
        group1.width = this.rightBtn.width;
        group1.height = this.rightBtn.height;
        this.rightBtn.addChild(group1);

        let rightText = new eui.Label();
        rightText.text = 'Right';
        rightText.size = 40;
        rightText.textColor = 0xeeeeee;
        rightText.verticalCenter = 0;
        rightText.horizontalCenter = 0;
        group1.addChild(rightText)

        egret.Tween.get(this.leftBtn).to({x: -30}, 500, egret.Ease.backOut).call(() => {
            console.log('左侧动画完成')
            egret.Tween.removeTweens(this.leftBtn)
        })

        egret.Tween.get(this.rightBtn).to({x: Width - this.rightBtn.width + 30}, 500, egret.Ease.backOut).call(() => {
            console.log('右侧动画完成')
            egret.Tween.removeTweens(this.rightBtn)
        })

        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.LeftBegin, this)
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.RightBegin, this)


        
        this.circleGroup = new BaseEUIGroup();
        
        this.circleGroup.width = 680;
        this.circleGroup.height = 680;
        this.circleGroup.anchorOffsetX = this.circleGroup.width / 2;
        this.circleGroup.anchorOffsetY = this.circleGroup.height / 2;
        this.circleGroup.x = Width / 2;
        this.circleGroup.y = -Height / 2;
        this.addChild(this.circleGroup);

        let circleImg = Util.createBitmapByName('circle6-sheet0_png');
        circleImg.width = this.circleGroup.width;
        circleImg.height = this.circleGroup.height;
        this.circleGroup.addChild(circleImg);

        this.score = new eui.Label();
        this.score.size = 160;
        this.score.text = 0 + '';
        this.score.bold = true;
        this.score.stroke = 4;
        this.score.strokeColor = 0x888888;
        this.score.textColor = 0x888888;
        this.score.horizontalCenter = 0;
        this.score.verticalCenter = 0;
        this.addChild(this.score);

        this.ball = new egret.Bitmap();
        this.ball.scaleX = 1.5;
        this.ball.scaleY = 1.5; 
        this.ball.texture = this.colorTexture[this.currentColorIndex]
        this.ball.x = Width / 2;
        this.ball.y = -100;
        this.ball.width = 60;
        this.ball.height = 60;
        this.ball.anchorOffsetX = this.ball.width / 2;
        this.ball.anchorOffsetY = this.ball.height / 2;
        this.addChild(this.ball)

        egret.Tween.get(this.circleGroup).to({y: Height / 2}, 500, egret.Ease.backOut).call(() => {
            egret.Tween.removeTweens(this.circleGroup);
        })

        egret.Tween.get(this.ball).to({y: Height / 2 - 150}, 500, egret.Ease.backOut).wait(200).call(() => {
            egret.Tween.removeTweens(this.ball);

            this.startGame();
            
        })

        

 
    }
    private startGame(): void {
        let Width = this.stage.stageWidth;
        let Height = this.stage.stageHeight;


        egret.Tween.get(this.ball, {loop: true, onChange: () => {
            if(Math.random() > 0.5){
                let shape1 = new egret.Bitmap();
                shape1.width = Math.floor(Math.random() * 20 + 20)
                shape1.height = shape1.width;
                shape1.texture = this.colorTexture[this.nextColorIndex];
                shape1.anchorOffsetX = shape1.width / 2;
                shape1.anchorOffsetY = shape1.height / 2;
                shape1.x = this.ball.x;
                shape1.y = this.ball.y;
                this.addChild(shape1);
                egret.Tween.get(shape1).to({alpha: 0, x: shape1.x + Math.random() * 50 - 25, y: shape1.y + Math.random() * 50 - 25}, 500).call(() => {
                    egret.Tween.removeTweens(shape1);
                    this.removeChild(shape1);
                })
            }
            
        }}).to({y: 600}, 650, egret.Ease.cubicIn)
            .call(() => {
                
                if(this.nextColorIndex != this.currentColorIndex){
                    console.log('游戏结束')
                    this.removeChild(this.ball);
                    egret.Tween.removeTweens(this.ball)
                    this.createGameOver()
                }else {
                    this.score.text = Number(this.score.text) + 1 + '' // 分数增加
                    
                    // this.jumpSound.play() // 音效播放
                    platform.playAudio('resource/music/jump.wav')

                    platform.shake(1); // 震动效果

                    this.nextColorIndex = Math.floor(Math.random() * this.colorTexture.length) // 随机下次颜色记录索引

                    this.ball.texture = this.colorTexture[this.nextColorIndex] // 改变贴图

                    egret.Tween.get(this.circleGroup).to({scaleX: 1.1, scaleY:1.1}, 100).to({scaleX: 1, scaleY: 1}, 100).call(() => {

                    })
                }

                console.log('球的' + this.nextColorIndex, '圆环' + this.currentColorIndex)

                
            })
            .to({y: Height / 2 - 150}, 600, egret.Ease.circOut)
    }
    private gameOverMusic;
    // private homeBitmap: egret.Bitmap
    private shareBitmap: egret.Bitmap;
    private shareText: eui.Label;
    private createGameOver(){
        platform.shake(2); // 长震动效果
        this.leftBtn.touchEnabled = false;
        this.rightBtn.touchEnabled = false;
        if(!this.stage) return;
        let Width = this.stage.stageWidth;
        let Height = this.stage.stageHeight;

        this.gameOverMusic = Data.i().Sound('gameover_wav')
        this.gameOverMusic.play()

        egret.Tween.get(this.leftBtn).to({x: -this.leftBtn.width}, 500, egret.Ease.backIn).call(() => {
            egret.Tween.removeTweens(this.leftBtn)
        })

        egret.Tween.get(this.rightBtn).to({x: Width}, 500, egret.Ease.backIn).call(() => {
            egret.Tween.removeTweens(this.rightBtn)
        })

        this.removeChild(this.circleGroup)

        egret.Tween.get(this.score).to({verticalCenter: -500}, 500, egret.Ease.backIn).call(() => {
            egret.Tween.removeTweens(this.score);
        })

        // this.removeChild(this.backBitmap)


        let scoreText = new eui.Label('S C O R E');
        scoreText.alpha = 0;
        scoreText.horizontalCenter = 0
        scoreText.fontFamily = '楷体'
        scoreText.strokeColor = 0xffffff
        scoreText.stroke = 10
        scoreText.size = 80;
        scoreText.y = 100;
        scoreText.textColor = 0x33CCFF;
        this.addChild(scoreText)

        let score = new eui.Label(this.score.text);
        score.alpha = 0;
        score.horizontalCenter = 0
        score.fontFamily = '楷体'
        score.strokeColor = 0xffffff
        score.stroke = 8
        score.bold = true;
        score.size = 160;
        score.verticalCenter = 0;
        score.horizontalCenter = 0
        score.textColor = 0x33CCFF;
        this.addChild(score)

        console.error('platform.userInfo', platform.userInfo)

        platform.openDataContext.postMessage({
            command: 'updateScore',
            score: this.score.text,
            userInfo: platform.userInfo
        })


        let reBegin = new eui.Label('重新开始');
        reBegin.alpha = 0;
        reBegin.horizontalCenter = 0
        reBegin.fontFamily = '楷体'
        reBegin.strokeColor = 0xffffff
        reBegin.stroke = 4
        reBegin.bold = true;
        reBegin.size = 50;
        reBegin.verticalCenter = 200;
        reBegin.horizontalCenter = 0;
        reBegin.textColor = 0x33CCFF;
        this.addChild(reBegin)

        egret.Tween.get(reBegin, {loop: true})
            .wait(2500)
            .to({scaleX: 1.1, scaleY: 1.1}, 80)
            .to({scaleX: 1, scaleY: 1}, 80)
            .to({scaleX: 1.1, scaleY: 1.1}, 80)
            .to({scaleX: 1, scaleY: 1}, 80)
            

        this.backBitmap = Util.createBitmapByName('back_png');
        this.backBitmap.alpha = 0;
		this.backBitmap.touchEnabled = true;
		this.backBitmap.width = 200 * 0.6;
		this.backBitmap.height = 130 * 0.5;
		this.backBitmap.anchorOffsetX = this.backBitmap.width / 2;
		this.backBitmap.anchorOffsetY = this.backBitmap.height / 2;
		this.backBitmap.x = this.backBitmap.width / 2 + 10;
		this.backBitmap.y = this.backBitmap.height / 2 + 16;
		this.addChild(this.backBitmap);
		this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.backBegin, this);

        reBegin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reBegin, this);


        this.shareText = new eui.Label('分享战绩');
        this.shareText.alpha = 0;
        this.shareText.fontFamily = '楷体'
        this.shareText.strokeColor = 0xffffff
        this.shareText.stroke = 2
        this.shareText.bold = true;
        this.shareText.size = 35;
        this.shareText.verticalCenter = 300;
        this.shareText.horizontalCenter = 0;
        this.shareText.textColor = 0x33CCFF;
        this.addChild(this.shareText)

        // this.homeBitmap = Util.createBitmapByName('home1_png')
        // this.homeBitmap.touchEnabled = true;
        // this.homeBitmap.alpha = 0;
        // this.homeBitmap.width = 110;
        // this.homeBitmap.anchorOffsetX = this.homeBitmap.width / 2;
        // this.homeBitmap.anchorOffsetY = this.homeBitmap.height / 2;
        // this.homeBitmap.height = 110;
        // this.homeBitmap.x = this.homeBitmap.width / 2; 
        // this.homeBitmap.y = Height - this.homeBitmap.height / 2 - 10
        // this.addChild(this.homeBitmap);
        // this.homeBitmap.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.homeBegin, this)

        // this.shareBitmap = Util.createBitmapByName('share_png')
        // this.shareBitmap.touchEnabled = true;
        // this.shareBitmap.alpha = 0;
        // this.shareBitmap.width = 110;
        // this.shareBitmap.anchorOffsetX = this.shareBitmap.width / 2;
        // this.shareBitmap.anchorOffsetY = this.shareBitmap.height / 2;
        // this.shareBitmap.height = 110;
        // this.shareBitmap.x = Width - this.shareBitmap.width /2; 
        // this.shareBitmap.y = Height - this.shareBitmap.height / 2 - 5;
        // this.addChild(this.shareBitmap);
        this.shareText.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBegin, this)

        egret.Tween.get(scoreText, {onChange: (value) => {
            score.alpha = scoreText.alpha;
            reBegin.alpha = scoreText.alpha;
            // this.homeBitmap.alpha = scoreText.alpha;
            this.shareText.alpha = scoreText.alpha;
            this.backBitmap.alpha = scoreText.alpha;
            // console.log(scoreText.alpha);
        }}).to({alpha: 1}, 500)

    }

    // private homeBegin() {
    //     this.homeBitmap.scaleX = 0.9;
    //     this.homeBitmap.scaleY = 0.9;
    //     this.homeBitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.homeEnd, this)
    //     this.homeBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.homeEnd, this);
    // }
    // private homeEnd(ev){
    //     this.homeBitmap.scaleX = 1;
    //     this.homeBitmap.scaleY = 1;
    //     this.homeBitmap.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.homeEnd, this)
    //     this.homeBitmap.removeEventListener(egret.TouchEvent.TOUCH_END, this.homeEnd, this);
    //     if(ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){

    //     }else if(ev.type == egret.TouchEvent.TOUCH_END){
    //         this.removeChildren();
    //         this._GameContainer.createHome();
    //     }

    // }

    private shareBegin() {
        this.shareText.scaleX = 0.9;
        this.shareText.scaleY = 0.9;
        this.shareText.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareEnd, this)
        this.shareText.addEventListener(egret.TouchEvent.TOUCH_END, this.shareEnd, this);
    }
    private shareEnd(ev){
        
        this.shareText.scaleX = 1;
        this.shareText.scaleY = 1;
        this.shareText.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareEnd, this)
        this.shareText.removeEventListener(egret.TouchEvent.TOUCH_END, this.shareEnd, this);
        if(ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){

        }else if(ev.type == egret.TouchEvent.TOUCH_END){
            platform.playAudio('resource/music/tap1.mp3')
            platform.shareToFriend({
                title: '我得了' + this.score.text + '分, 快来挑战我吧',
                imageUrl: 'resource/game_res/share1.jpg'
            })
        }

    }
    private reBegin(){
        platform.playAudio('resource/music/tap1.mp3')
        this.gameOverMusic.stop()
        this.removeChildren();
        this._GameContainer.createGame();
    }


    private LeftBegin(ev) {
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.LeftEnd, this);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.LeftEnd, this)
        this.leftBtn.alpha = 0.5
    }
    private LeftEnd(ev) {
        this.leftBtn.alpha = 1
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.LeftEnd, this);
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.LeftEnd, this)
        if(ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
        }else if(ev.type == egret.TouchEvent.TOUCH_END) {
            // platform.playAudio('resource/music/tap1.mp3')
            this.leftRound();
        }
    }

    private RightBegin(ev) {
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.RightEnd, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.RightEnd, this)
        this.rightBtn.alpha = 0.5
    }
    private RightEnd(ev) {
        this.rightBtn.alpha = 1
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.RightEnd, this);
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.RightEnd, this)
        if(ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){
        }else if(ev.type == egret.TouchEvent.TOUCH_END) {
            // console.log('点击有效')
            // platform.playAudio('resource/music/tap1.mp3')
            this.RightRound()
        }
    }

    public beforeRemove(){
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.LeftBegin, this)
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.RightBegin, this)
        egret.Tween.removeTweens(this.ball);
        // this.removeChild(this.leftBtn);
        // this.removeChild(this.rightBtn);
        // this.removeChild(this.circleGroup);
        this.removeChildren()
        this.parent.removeChild(this)
        console.log('remove')
    }


    private currTemp = 0
    private leftRound() : void {
        platform.shake(1); // 震动效果
        egret.Tween.removeTweens(this.circleGroup);
        let timekeep = 0;
        timekeep = Math.abs(this.circleGroup.rotation - this.currTemp) * 5

        if(this.currTemp == -180) this.circleGroup.rotation = 180
        this.currentColorIndex = (++this.currentColorIndex) % 6
        this.currentDeg -= 60
        if(this.currentDeg < -180){
            this.currentDeg = 360 + this.currentDeg
        }

        this.currTemp = this.currentDeg

        timekeep = Math.abs(this.circleGroup.rotation - this.currTemp) * 5


        egret.Tween.get(this.circleGroup).to({rotation: this.currTemp}, timekeep, egret.Ease.sineInOut).call(() => {
            
            console.log(this.colorList[this.currentColorIndex], this.currentColorIndex, this.currentDeg , this.circleGroup.rotation)
        })
        
    }
    
    private RightRound() : void {
        
        platform.shake(1); // 震动效果
        egret.Tween.removeTweens(this.circleGroup);

        let timekeep = 0;

        if(this.currTemp == 180) this.circleGroup.rotation = -180

        if(--this.currentColorIndex < 0){
            this.currentColorIndex = 6 - Math.abs(this.currentColorIndex % 6)
        }
        this.currentDeg += 60

        if(this.currentDeg > 180){
            this.currentDeg = this.currentDeg - 360
        }

        this.currTemp = this.currentDeg
        timekeep = Math.abs(this.circleGroup.rotation - this.currTemp) * 5
        
        egret.Tween.get(this.circleGroup).to({rotation: this.currTemp}, timekeep, egret.Ease.sineInOut).call(() => {
            // console.log(this.colorList[this.currentColorIndex], this.currentColorIndex, this.currentDeg , this.circleGroup.rotation)
        })
        
    }


    private backBegin(): void {
		this.backBitmap.scaleX = 0.9;
		this.backBitmap.scaleY = 0.9;
		this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
		this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this)
	}

	private backEnd(ev): void {
        platform.playAudio('resource/music/tap1.mp3')
		this.backBitmap.scaleX = 1;
		this.backBitmap.scaleY = 1;
		this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
		this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this)

		if(ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE){

        }else if(ev.type == egret.TouchEvent.TOUCH_END){
            console.log('回到首页')
            if(this.gameOverMusic) this.gameOverMusic.stop()
            platform.playAudio('resource/music/tap1.mp3')
            egret.setTimeout(() => {
                this.beforeRemove();
			    this._GameContainer.createHome()
            }, this, 80)
            
        }
	}

}