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
var About = (function (_super) {
    __extends(About, _super);
    function About(GC) {
        var _this = _super.call(this) || this;
        _this._GameContainer = GC;
        return _this;
    }
    About.prototype.init = function () {
        var _this = this;
        var Width = this.stage.stageWidth - 300;
        var Height = this.stage.stageHeight - 200;
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
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = 60;
        vLayout.paddingTop = 15;
        vLayout.paddingRight = 15;
        vLayout.paddingBottom = 15;
        vLayout.paddingLeft = 15;
        var group = new eui.Group();
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
        group.addChild(new eui.Label('1. 点击左右控制圆环转动，在球落下的时候，保证下方的颜色与球颜色一致'));
        group.addChild(new eui.Label('2. 有任何建议或者意见可以点击首页右下角建议按钮提供给开发者'));
        group.addChild(new eui.Label('3. 排行榜，设置，难度相关功能后续会跟进'));
        this.addChild(this.swiper);
        var label = new eui.Label('');
        egret.Tween.get(this.swiper).to({ verticalCenter: 0 }, 400, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.swiper);
        });
    };
    About.prototype.backBegin = function () {
        this.backBitmap.scaleX = 0.9;
        this.backBitmap.scaleY = 0.9;
        this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
        this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this);
    };
    About.prototype.backEnd = function (ev) {
        this.backBitmap.scaleX = 1;
        this.backBitmap.scaleY = 1;
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this);
        if (ev.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
        }
        else if (ev.type == egret.TouchEvent.TOUCH_END) {
            Data.i().Sound('tap1_mp3').play();
            this.beforeRemove();
            this._GameContainer.createHome();
        }
    };
    About.prototype.beforeRemove = function () {
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.backEnd, this);
        this.parent.removeChild(this);
    };
    return About;
}(BaseUILayer));
__reflect(About.prototype, "About");
//# sourceMappingURL=About.js.map