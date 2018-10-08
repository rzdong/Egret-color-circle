/**
 * 全局单例，数据存储
 *
 * 继承Event，可以收发事件
 *
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
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
    Data.data = null;
    return Data;
}());
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map