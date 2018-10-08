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
    function About() {
        return _super.call(this) || this;
    }
    About.prototype.init = function () {
        var Width = 800;
        var Height = 500;
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
        var swiper = new eui.Scroller();
        swiper.width = Width;
        swiper.height = Height;
        swiper.horizontalCenter = 0;
        swiper.verticalCenter = -this.stage.stageHeight / 2;
        swiper.viewport = group;
        this.addChild(swiper);
        swiper.verticalScrollBar.autoVisibility = false;
        swiper.verticalScrollBar.visible = false;
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        group.addChild(new eui.Label('任振东'));
        this.addChild(swiper);
        egret.Tween.get(swiper).to({ verticalCenter: 0 }, 500, egret.Ease.backOut).call(function () {
            egret.Tween.removeTweens(swiper);
        });
    };
    return About;
}(BaseUILayer));
__reflect(About.prototype, "About");
//# sourceMappingURL=About.js.map