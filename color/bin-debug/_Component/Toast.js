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
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super.call(this) || this;
        _this.toastArr = [];
        _this.touchThrough = true;
        return _this;
    }
    Toast.prototype.init = function () {
    };
    Toast.prototype.Toast = function (str, time) {
        var toast = new ToastChild(str, time);
        // this.toastArr.push(toast);
        this.addChild(toast);
    };
    return Toast;
}(BaseUILayer));
__reflect(Toast.prototype, "Toast");
var ToastChild = (function (_super) {
    __extends(ToastChild, _super);
    function ToastChild(str, time) {
        var _this = _super.call(this) || this;
        _this.text = '';
        _this.size = 28;
        _this.time = 2000;
        _this.text = str;
        if (time)
            _this.time = time;
        return _this;
    }
    ToastChild.prototype.init = function () {
        var _this = this;
        this.alpha = 0;
        var Width = this.stage.stageWidth;
        var Height = this.stage.stageHeight;
        this.width = this.text.length * this.size + 30 * 2;
        this.height = this.size + 30 * 2;
        this.graphics.beginFill(0xffffff, 0.8);
        this.graphics.drawRoundRect(0, 0, this.width, this.height, 30);
        this.graphics.endFill();
        this.x = (Width - this.width) / 2;
        this.y = (Height - this.height) / 2 + 80;
        var textFild = new egret.TextField();
        textFild.size = this.size;
        textFild.text = this.text;
        textFild.textColor = 0x000000;
        textFild.width = this.width;
        textFild.height = this.height;
        textFild.textAlign = egret.HorizontalAlign.CENTER;
        textFild.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(textFild);
        egret.Tween.get(this).to({ y: (Height - this.height) / 2, alpha: 1 }, 300).wait(this.time).to({ alpha: 0, y: (Height - this.height) / 2 - 20 }, 300).call(function () {
            egret.Tween.removeTweens(_this);
            _this.parent.removeChild(_this);
        });
    };
    return ToastChild;
}(BaseSprite));
__reflect(ToastChild.prototype, "ToastChild");
//# sourceMappingURL=Toast.js.map