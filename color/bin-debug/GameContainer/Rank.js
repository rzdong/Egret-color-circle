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
        platform.hideFeedBack();
        var Width = 400;
        var Height = 750;
        var vLayout = new eui.VerticalLayout();
        vLayout.gap = 6;
        vLayout.paddingTop = 5;
        vLayout.paddingRight = 5;
        vLayout.paddingBottom = 5;
        vLayout.paddingLeft = 5;
        this.shapebg = new BaseShape(this.stage.stageWidth, this.stage.stageHeight);
        this.shapebg.alpha = 0;
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
        this.shapeWhite.graphics.beginFill(0x000000, 1);
        this.shapeWhite.graphics.drawRect(0, 0, Width, Height);
        this.shapeWhite.graphics.endFill();
        this.addChild(this.shapeWhite);
        var header = new eui.Label('排行榜');
        header.width = Width;
        header.height = 100;
        header.size = 40;
        header.textAlign = egret.HorizontalAlign.CENTER;
        header.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.shapeWhite.addChild(header);
        var group = new eui.Group();
        group.width = Width;
        group.height = Height - header.height;
        group.y = header.height;
        group.layout = vLayout;
        this.shapeWhite.addChild(group);
        this.rankBitmap = platform.openDataContext.createDisplayObject(null, 400, 650);
        // console.log(this.rankBitmap)
        group.addChild(new eui.Group().addChild(this.rankBitmap));
        platform.openDataContext.postMessage({
            command: 'open'
        });
        egret.Tween.get(this.shapeWhite).to({ x: 0 }, 300).call(function () {
            egret.Tween.removeTweens(_this.shapeWhite);
        });
        egret.Tween.get(this.shapebg).to({ alpha: 0.3 }, 300).call(function () {
            egret.Tween.removeTweens(_this.shapebg);
        });
    };
    Rank.prototype.closeRank = function () {
        var _this = this;
        this.touchEnabled = false;
        platform.playAudio('resource/music/tap1.mp3');
        // platform.openDataContext.postMessage({
        // 	command: 'close'
        // })
        // return
        egret.Tween.get(this.shapeWhite).to({ x: -350 }, 300).call(function () {
            platform.openDataContext.postMessage({
                command: 'close'
            });
            platform.showFeedBack();
            _this.removeChildren();
            _this.shapeWhite.removeChildren();
            _this.parent.removeChild(_this);
        });
        egret.Tween.get(this.shapebg).to({ alpha: 0 }, 300).call(function () {
            egret.Tween.removeTweens(_this.shapebg);
        });
    };
    return Rank;
}(BaseUILayer));
__reflect(Rank.prototype, "Rank");
//# sourceMappingURL=Rank.js.map