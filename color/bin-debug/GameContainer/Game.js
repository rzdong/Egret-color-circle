var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(GC) {
        var _this = _super.call(this) || this;
        _this.currentDeg = 0; // 当前转过的角度。
        _this._GameContainer = GC;
        return _this;
    }
    Game.prototype.init = function () {
        var _this = this;
        console.log('Game已加载');
        this.colorList = ['violet', 'dyellow', 'blue', 'red', 'yellow', 'green'];
        this.colorTexture = [
            RES.getRes('circle-violte_png'),
            RES.getRes('circle-dyellow_png'),
            RES.getRes('circle-blue_png'),
            RES.getRes('circle-red_png'),
            RES.getRes('circle-yellow_png'),
            RES.getRes('circle-green_png')
        ];
        this.jumpSound = Data.i().Sound('jump_wav');
        this.currentColorIndex = 0;
        this.nextColorIndex = 0;
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
        var Width = this.stage.stageWidth;
        var Height = this.stage.stageHeight;
        this.leftBtn = new egret.Sprite();
        this.leftBtn.touchEnabled = true;
        this.leftBtn.width = 270;
        this.leftBtn.height = 500;
        this.leftBtn.x = -this.leftBtn.width;
        this.leftBtn.y = (Height - this.leftBtn.height) / 2;
        this.leftBtn.graphics.beginFill(0xaaaaaa, 0.25);
        this.leftBtn.graphics.drawRoundRect(0, 0, this.leftBtn.width, this.leftBtn.height, 20);
        this.leftBtn.graphics.endFill();
        this.addChild(this.leftBtn);
        var group = new eui.Group();
        group.width = this.leftBtn.width;
        group.height = this.leftBtn.height;
        this.leftBtn.addChild(group);
        var leftText = new eui.Label();
        leftText.text = 'Left';
        leftText.size = 40;
        leftText.textColor = 0xeeeeee;
        leftText.verticalCenter = 0;
        leftText.horizontalCenter = 0;
        group.addChild(leftText);
        this.rightBtn = new egret.Sprite();
        this.rightBtn.touchEnabled = true;
        this.rightBtn.width = 270;
        this.rightBtn.height = 500;
        this.rightBtn.x = Width;
        this.rightBtn.y = (Height - this.rightBtn.height) / 2;
        this.rightBtn.graphics.beginFill(0xaaaaaa, 0.25);
        this.rightBtn.graphics.drawRoundRect(0, 0, this.rightBtn.width, this.rightBtn.height, 20);
        this.rightBtn.graphics.endFill();
        this.addChild(this.rightBtn);
        var group1 = new eui.Group();
        group1.width = this.rightBtn.width;
        group1.height = this.rightBtn.height;
        this.rightBtn.addChild(group1);
        var rightText = new eui.Label();
        rightText.text = 'Right';
        rightText.size = 40;
        rightText.textColor = 0xeeeeee;
        rightText.verticalCenter = 0;
        rightText.horizontalCenter = 0;
        group1.addChild(rightText);
        egret.Tween.get(this.leftBtn).to({ x: -30 }, 500, egret.Ease.backOut).call(function () {
            console.log('左侧动画完成');
            egret.Tween.removeTweens(_this.leftBtn);
        });
        egret.Tween.get(this.rightBtn).to({ x: Width - this.rightBtn.width + 30 }, 500, egret.Ease.backOut).call(function () {
            console.log('右侧动画完成');
            egret.Tween.removeTweens(_this.rightBtn);
        });
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.LeftBegin, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.RightBegin, this);
        this.circleGroup = new BaseEUIGroup();
        this.circleGroup.width = 680;
        this.circleGroup.height = 680;
        this.circleGroup.anchorOffsetX = this.circleGroup.width / 2;
        this.circleGroup.anchorOffsetY = this.circleGroup.height / 2;
        this.circleGroup.x = Width / 2;
        this.circleGroup.y = -Height / 2;
        this.addChild(this.circleGroup);
        var circleImg = Util.createBitmapByName('circle6-sheet0_png');
        circleImg.width = this.circleGroup.width;
        circleImg.height = this.circleGroup.height;
        this.circleGroup.addChild(circleImg);
        this.score = new eui.Label();
        this.score.size = 160;
        this.score.text = 0 + '';
        this.score.textColor = 0x888888;
        this.score.horizontalCenter = 0;
        this.score.verticalCenter = 0;
        this.addChild(this.score);
        this.ball = new egret.Bitmap();
        this.ball.scaleX = 1.5;
        this.ball.scaleY = 1.5;
        this.ball.texture = this.colorTexture[this.currentColorIndex];
        this.ball.x = Width / 2;
        this.ball.y = -100;
        this.ball.width = 60;
        this.ball.height = 60;
        this.ball.anchorOffsetX = this.ball.width / 2;
        this.ball.anchorOffsetY = this.ball.height / 2;
        this.addChild(this.ball);
        egret.Tween.get(this.circleGroup).to({ y: Height / 2 }, 500, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.circleGroup);
        });
        egret.Tween.get(this.ball).to({ y: Height / 2 - 150 }, 500, egret.Ease.backOut).wait(200).call(function () {
            egret.Tween.removeTweens(_this.ball);
            _this.startGame();
        });
    };
    Game.prototype.startGame = function () {
        var _this = this;
        var Width = this.stage.stageWidth;
        var Height = this.stage.stageHeight;
        egret.Tween.get(this.ball, { loop: true, onChange: function () {
                if (Math.random() > 0.5) {
                    var shape1_1 = new egret.Bitmap();
                    shape1_1.width = Math.floor(Math.random() * 20 + 20);
                    shape1_1.height = shape1_1.width;
                    shape1_1.texture = _this.colorTexture[_this.nextColorIndex];
                    shape1_1.anchorOffsetX = shape1_1.width / 2;
                    shape1_1.anchorOffsetY = shape1_1.height / 2;
                    shape1_1.x = _this.ball.x;
                    shape1_1.y = _this.ball.y;
                    _this.addChild(shape1_1);
                    egret.Tween.get(shape1_1).to({ alpha: 0, x: shape1_1.x + Math.random() * 50 - 25, y: shape1_1.y + Math.random() * 50 - 25 }, 500).call(function () {
                        egret.Tween.removeTweens(shape1_1);
                        _this.removeChild(shape1_1);
                    });
                }
            } }).to({ y: 600 }, 650, egret.Ease.cubicIn)
            .call(function () {
            if (_this.nextColorIndex != _this.currentColorIndex) {
                console.log('游戏结束');
                _this.removeChild(_this.ball);
                egret.Tween.removeTweens(_this.ball);
                _this.createGameOver();
            }
            else {
                _this.score.text = Number(_this.score.text) + 1 + ''; // 分数增加
                _this.jumpSound.play(); // 音效播放
                platform.shake(1); // 震动效果
                _this.nextColorIndex = Math.floor(Math.random() * _this.colorTexture.length); // 随机下次颜色记录索引
                _this.ball.texture = _this.colorTexture[_this.nextColorIndex]; // 改变贴图
                egret.Tween.get(_this.circleGroup).to({ scaleX: 1.1, scaleY: 1.1 }, 100).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                });
            }
            console.log('球的' + _this.nextColorIndex, '圆环' + _this.currentColorIndex);
        })
            .to({ y: Height / 2 - 150 }, 600, egret.Ease.circOut);
    };
    Game.prototype.createGameOver = function () {
        var _this = this;
        platform.shake(2); // 震动效果
        this.leftBtn.touchEnabled = false;
        this.rightBtn.touchEnabled = false;
        if (!this.stage)
            return;
        var Width = this.stage.stageWidth;
        var Height = this.stage.stageHeight;
        this.gameOverMusic = Data.i().Sound('gameover_wav');
        this.gameOverMusic.play();
        egret.Tween.get(this.leftBtn).to({ x: -this.leftBtn.width }, 500, egret.Ease.backIn).call(function () {
            egret.Tween.removeTweens(_this.leftBtn);
        });
        egret.Tween.get(this.rightBtn).to({ x: Width }, 500, egret.Ease.backIn).call(function () {
            egret.Tween.removeTweens(_this.rightBtn);
        });
        // egret.Tween.get(this.circleGroup).to({y: -Height / 2}, 500, egret.Ease.backIn).call(() => {
        //     egret.Tween.removeTweens(this.circleGroup);
        // })
        this.removeChild(this.circleGroup);
        egret.Tween.get(this.score).to({ verticalCenter: -500 }, 500, egret.Ease.backIn).call(function () {
            egret.Tween.removeTweens(_this.score);
        });
        // this.removeChild(this.backBitmap)
        var scoreText = new eui.Label('S C O R E');
        scoreText.alpha = 0;
        scoreText.horizontalCenter = 0;
        scoreText.fontFamily = '楷体';
        scoreText.strokeColor = 0xffffff;
        scoreText.stroke = 10;
        scoreText.size = 80;
        scoreText.y = 100;
        scoreText.textColor = 0x33CCFF;
        this.addChild(scoreText);
        var score = new eui.Label(this.score.text);
        score.alpha = 0;
        score.horizontalCenter = 0;
        score.fontFamily = '楷体';
        score.strokeColor = 0xffffff;
        score.stroke = 8;
        score.bold = true;
        score.size = 160;
        score.verticalCenter = 0;
        score.horizontalCenter = 0;
        score.textColor = 0x33CCFF;
        this.addChild(score);
        var reBegin = new eui.Label('重新开始');
        reBegin.alpha = 0;
        reBegin.horizontalCenter = 0;
        reBegin.fontFamily = '楷体';
        reBegin.strokeColor = 0xffffff;
        reBegin.stroke = 4;
        reBegin.bold = true;
        reBegin.size = 50;
        reBegin.verticalCenter = 200;
        reBegin.horizontalCenter = 0;
        reBegin.textColor = 0x33CCFF;
        this.addChild(reBegin);
        egret.Tween.get(reBegin, { loop: true })
            .wait(2500)
            .to({ scaleX: 1.1, scaleY: 1.1 }, 80)
            .to({ scaleX: 1, scaleY: 1 }, 80)
            .to({ scaleX: 1.1, scaleY: 1.1 }, 80)
            .to({ scaleX: 1, scaleY: 1 }, 80);
        reBegin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reBegin, this);
        this.shareText = new eui.Label('分享战绩');
        this.shareText.alpha = 0;
        this.shareText.fontFamily = '楷体';
        this.shareText.strokeColor = 0xffffff;
        this.shareText.stroke = 2;
        this.shareText.bold = true;
        this.shareText.size = 35;
        this.shareText.verticalCenter = 300;
        this.shareText.horizontalCenter = 0;
        this.shareText.textColor = 0x33CCFF;
        this.addChild(this.shareText);
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
        this.shareText.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shareBegin, this);
        egret.Tween.get(scoreText, { onChange: function (value) {
                score.alpha = scoreText.alpha;
                reBegin.alpha = scoreText.alpha;
                // this.homeBitmap.alpha = scoreText.alpha;
                _this.shareText.alpha = scoreText.alpha;
                // console.log(scoreText.alpha);
            } }).to({ alpha: 1 }, 500);
    };
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
    Game.prototype.shareBegin = function () {
        this.shareText.scaleX = 0.9;
        this.shareText.scaleY = 0.9;
        this.shareText.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareEnd, this);
        this.shareText.addEventListener(egret.TouchEvent.TOUCH_END, this.shareEnd, this);
    };
    Game.prototype.shareEnd = function (ev) {
        this.shareText.scaleX = 1;
        this.shareText.scaleY = 1;
        this.shareText.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.shareEnd, this);
        this.shareText.removeEventListener(egret.TouchEvent.TOUCH_END, this.shareEnd, this);
        if (ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            Data.i().Sound('tap1_mp3').play();
            platform.shareToFriend({
                title: '我得了' + this.score.text + '分, 快来挑战我吧',
                imageUrl: 'resource/game_res/share1.jpg'
            });
        }
    };
    Game.prototype.reBegin = function () {
        Data.i().Sound('tap1_mp3').play();
        this.gameOverMusic.stop();
        this.removeChildren();
        this._GameContainer.createGame();
    };
    Game.prototype.LeftBegin = function (ev) {
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.LeftEnd, this);
        this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.LeftEnd, this);
        this.leftBtn.alpha = 0.5;
    };
    Game.prototype.LeftEnd = function (ev) {
        this.leftBtn.alpha = 1;
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.LeftEnd, this);
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.LeftEnd, this);
        if (ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            // Data.i().Sound('tap1_mp3').play()
            this.leftRound();
        }
    };
    Game.prototype.RightBegin = function (ev) {
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.RightEnd, this);
        this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.RightEnd, this);
        this.rightBtn.alpha = 0.5;
    };
    Game.prototype.RightEnd = function (ev) {
        this.rightBtn.alpha = 1;
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.RightEnd, this);
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.RightEnd, this);
        if (ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            // console.log('点击有效')
            // Data.i().Sound('tap1_mp3').play()
            this.RightRound();
        }
    };
    Game.prototype.beforeRemove = function () {
        this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.LeftBegin, this);
        this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.RightBegin, this);
        this.removeChild(this.leftBtn);
        this.removeChild(this.rightBtn);
        this.removeChild(this.circleGroup);
        this.parent.removeChild(this);
        console.log('remove');
    };
    Game.prototype.leftRound = function () {
        var _this = this;
        egret.Tween.removeTweens(this.circleGroup);
        if (this.circleGroup.rotation == -180)
            this.circleGroup.rotation = 180;
        this.currentColorIndex = (++this.currentColorIndex) % 6;
        this.currentDeg -= 60;
        if (this.currentDeg < -180) {
            this.currentDeg = 360 + this.currentDeg;
        }
        var currTemp = this.currentDeg;
        egret.Tween.get(this.circleGroup).to({ rotation: currTemp }, 200, egret.Ease.circInOut).call(function () {
            console.log(_this.colorList[_this.currentColorIndex], _this.currentColorIndex, _this.currentDeg, _this.circleGroup.rotation);
        });
    };
    Game.prototype.RightRound = function () {
        egret.Tween.removeTweens(this.circleGroup);
        if (this.circleGroup.rotation == 180)
            this.circleGroup.rotation = -180;
        if (--this.currentColorIndex < 0) {
            this.currentColorIndex = 6 - Math.abs(this.currentColorIndex % 6);
        }
        this.currentDeg = (this.currentDeg + 60);
        if (this.currentDeg > 180) {
            this.currentDeg = this.currentDeg - 360;
        }
        console.log(this.colorList[this.currentColorIndex], this.currentColorIndex, this.currentDeg, this.circleGroup.rotation);
        var currTemp = this.currentDeg;
        egret.Tween.get(this.circleGroup).to({ rotation: currTemp }, 200, egret.Ease.circInOut).call(function () {
            // console.log(this.colorList[this.currentColorIndex], this.currentColorIndex, this.currentDeg , this.circleGroup.rotation)
        });
    };
    Game.prototype.backBegin = function () {
        this.backBitmap.scaleX = 0.9;
        this.backBitmap.scaleY = 0.9;
        this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
        this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this);
    };
    Game.prototype.backEnd = function (ev) {
        Data.i().Sound('tap1_mp3').play();
        this.backBitmap.scaleX = 1;
        this.backBitmap.scaleY = 1;
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this);
        if (ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            console.log('回到首页');
            this.gameOverMusic.stop();
            this.beforeRemove();
            this._GameContainer.createHome();
        }
    };
    return Game;
}(BaseUILayer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map