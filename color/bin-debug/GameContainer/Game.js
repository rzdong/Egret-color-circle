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
        this.currentColorIndex = 0;
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
        egret.Tween.get(this.circleGroup).to({ y: Height / 2 }, 500, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.circleGroup);
        });
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
            console.log('点击无效');
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            console.log('点击有效');
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
            console.log('点击无效');
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            // console.log('点击有效')
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
        this.backBitmap.scaleX = 1;
        this.backBitmap.scaleY = 1;
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this);
        if (ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            console.log('进入游戏');
            this.beforeRemove();
            this._GameContainer.createHome();
        }
    };
    return Game;
}(BaseUILayer));
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map