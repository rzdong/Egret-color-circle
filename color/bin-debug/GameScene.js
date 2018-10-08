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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.init = function () {
        console.log('GameScene主场景加载');
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.bg = new BackgroundContainer();
        this.addChild(this.bg);
        this.gc = new GameContainer();
        this.addChild(this.gc);
        this.pc = new PopContainer();
        this.addChild(this.pc);
    };
    return GameScene;
}(BaseDisplayOC));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map