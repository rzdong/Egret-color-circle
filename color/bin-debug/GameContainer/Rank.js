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
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        return _super.call(this) || this;
    }
    Rank.prototype.init = function () {
        var _this = this;
        var Width = 350;
        var Height = 750;
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = 6;
        vLayout.paddingTop = 5;
        vLayout.paddingRight = 5;
        vLayout.paddingBottom = 5;
        vLayout.paddingLeft = 5;
        this.shapebg = new BaseShape(this.stage.stageWidth, this.stage.stageHeight);
        this.shapebg.alpha = 0.3;
        this.shapebg.touchEnabled = true;
        this.shapebg.graphics.beginFill(0x000000, 1);
        this.shapebg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.shapebg.graphics.endFill();
        this.addChild(this.shapebg);
        this.shapebg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeRank, this);
        this.shapeWhite = new BaseSprite();
        this.shapeWhite.width = Width;
        this.shapeWhite.height = Height;
        this.shapeWhite.x = -Width;
        this.shapeWhite.touchEnabled = true;
        this.shapeWhite.graphics.beginFill(0x000000, 0.7);
        this.shapeWhite.graphics.drawRect(0, 0, Width, Height);
        this.shapeWhite.graphics.endFill();
        this.addChild(this.shapeWhite);
        var group = new eui.Group();
        group.width = Width;
        group.height = Height - 150;
        group.layout = vLayout;
        this.shapeWhite.addChild(group);
        this.swiper = new eui.Scroller();
        this.swiper.width = Width;
        this.swiper.x = 0;
        this.swiper.y = 150;
        this.swiper.height = Height - 150;
        this.swiper.scrollPolicyH = 'OFF';
        this.swiper.viewport = group;
        this.shapeWhite.addChild(this.swiper);
        this.swiper.verticalScrollBar.autoVisibility = false;
        this.swiper.verticalScrollBar.visible = false;
        var header = new eui.Label('排行榜');
        header.width = Width;
        header.height = 150;
        header.size = 50;
        header.textAlign = egret.HorizontalAlign.CENTER;
        header.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.shapeWhite.addChild(header);
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        group.addChild(new eui.Label('排行榜排行榜排行榜排行榜'));
        var bit = platform.openDataContext.createDisplayObject(null, 350, 750);
        group.addChild(new eui.Group().addChild(bit));
        platform.openDataContext.postMessage({
            command: 'open'
        });
        egret.Tween.get(this.shapeWhite).to({ x: 0 }, 300).call(function () {
            egret.Tween.removeTweens(_this.swiper);
        });
        egret.Tween.get(this.shapebg).to({ alpha: 0.3 }, 300).call(function () {
            egret.Tween.removeTweens(_this.shapebg);
        });
    };
    Rank.prototype.closeRank = function () {
        var _this = this;
        platform.playAudio('resource/music/tap1.mp3');
        egret.Tween.get(this.shapeWhite).to({ x: -350 }, 300, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(_this.swiper);
            platform.openDataContext.postMessage({
                command: 'close'
            });
            _this.removeChildren();
            _this.parent.removeChild(_this);
        });
        egret.Tween.get(this.shapebg).to({ alpha: 0 }, 280).call(function () {
            egret.Tween.removeTweens(_this.shapebg);
        });
    };
    return Rank;
}(BaseUILayer));
__reflect(Rank.prototype, "Rank");
//# sourceMappingURL=Rank.js.map