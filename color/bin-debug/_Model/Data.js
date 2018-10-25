/**
 * 全局单例，数据存储
 *
 * 继承Event，可以收发事件
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
var Data = (function (_super) {
    __extends(Data, _super);
    function Data() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toast = null;
        _this.grade = 750;
        return _this;
    }
    Data.i = function () {
        if (this.data) {
            return this.data;
        }
        else {
            this.data = new Data();
            return this.data;
        }
    };
    Data.prototype.Toast = function (str, time) {
        this.toast.Toast(str, time);
    };
    Data.prototype.Sound = function (str) {
        return this.sound.getSound(str);
    };
    Data.data = null;
    return Data;
}(egret.EventDispatcher));
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map