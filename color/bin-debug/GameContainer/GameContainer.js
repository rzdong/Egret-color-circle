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
var GameContainer = (function (_super) {
    __extends(GameContainer, _super);
    function GameContainer() {
        return _super.call(this) || this;
    }
    GameContainer.prototype.init = function () {
        console.log('GameContainer已加载');
        this.home = new Home(this);
        this.addChild(this.home);
        // 初始化游戏层
    };
    GameContainer.prototype.createGame = function () {
        if (this.contains(this.game)) {
            this.removeChild(this.game);
        }
        this.game = new Game(this);
        this.addChild(this.game);
    };
    GameContainer.prototype.createAbout = function () {
        if (this.contains(this.about)) {
            this.removeChild(this.about);
        }
        this.about = new About(this);
        this.addChild(this.about);
    };
    GameContainer.prototype.createHome = function () {
        if (this.contains(this.home)) {
            this.removeChild(this.home);
        }
        this.home = new Home(this);
        this.addChild(this.home);
    };
    GameContainer.prototype.createSetting = function () {
        if (this.contains(this.setting)) {
            this.removeChild(this.setting);
        }
        this.setting = new Setting(this);
        this.addChild(this.setting);
    };
    GameContainer.prototype.createGrade = function () {
        if (this.contains(this.grade)) {
            this.removeChild(this.grade);
        }
        this.grade = new Grade(this);
        this.addChild(this.grade);
    };
    GameContainer.prototype.createSuggest = function () {
        if (this.contains(this.suggest)) {
            this.removeChild(this.suggest);
        }
        this.suggest = new Suggest(this);
        this.addChild(this.suggest);
    };
    return GameContainer;
}(BaseUILayer));
__reflect(GameContainer.prototype, "GameContainer");
//# sourceMappingURL=GameContainer.js.map