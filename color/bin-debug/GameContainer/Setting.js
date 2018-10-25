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
var Setting = (function (_super) {
    __extends(Setting, _super);
    function Setting(GC) {
        var _this = _super.call(this) || this;
        _this._GameContainer = GC;
        return _this;
    }
    Setting.prototype.init = function () {
        var _this = this;
        var Width = 800;
        var Height = 500;
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
        vLayout.gap = 10;
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
        this.addChild(this.swiper);
        egret.Tween.get(this.swiper).to({ verticalCenter: 0 }, 400, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.swiper);
        });
    };
    Setting.prototype.backBegin = function () {
        this.backBitmap.scaleX = 0.9;
        this.backBitmap.scaleY = 0.9;
        this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.backEnd, this);
        this.backBitmap.addEventListener(egret.TouchEvent.TOUCH_END, this.backEnd, this);
    };
    Setting.prototype.backEnd = function (ev) {
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
    Setting.prototype.beforeRemove = function () {
        this.backBitmap.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.backEnd, this);
        this.parent.removeChild(this);
    };
    return Setting;
}(BaseUILayer));
__reflect(Setting.prototype, "Setting");
//# sourceMappingURL=Setting.js.map