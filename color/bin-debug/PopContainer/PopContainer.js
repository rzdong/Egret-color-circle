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
var PopContainer = (function (_super) {
    __extends(PopContainer, _super);
    function PopContainer() {
        return _super.call(this) || this;
    }
    PopContainer.prototype.init = function () {
        this.touchEnabled = true;
        this.touchThrough = true;
        console.log('PopContainer已加载');
        // 初始化多层
    };
    return PopContainer;
}(BaseUILayer));
__reflect(PopContainer.prototype, "PopContainer");
//# sourceMappingURL=PopContainer.js.map