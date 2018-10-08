/**
 * uilayer基类
 *
 */
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
var BaseUILayer = (function (_super) {
    __extends(BaseUILayer, _super);
    function BaseUILayer() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        return _this;
    }
    BaseUILayer.prototype.init = function () {
        console.log('11');
    };
    BaseUILayer.prototype.remove = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    return BaseUILayer;
}(eui.UILayer));
__reflect(BaseUILayer.prototype, "BaseUILayer");
//# sourceMappingURL=_BaseUILayer.js.map