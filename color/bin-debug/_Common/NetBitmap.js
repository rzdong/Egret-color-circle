/**
 * 加载网络图片，返回egretBitmap
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
var NetBitmap = (function (_super) {
    __extends(NetBitmap, _super);
    // http://seopic.699pic.com/photo/50035/3303.jpg_wh1200.jpg
    function NetBitmap(url) {
        var _this = _super.call(this) || this;
        var imgLoader = new egret.ImageLoader;
        imgLoader.crossOrigin = 'anonymous';
        imgLoader.once(egret.Event.COMPLETE, _this.imgLoadHandler, _this);
        imgLoader.load(url);
        return _this;
    }
    NetBitmap.prototype.imgLoadHandler = function (ev) {
        var loader = ev.currentTarget;
        var bmd = loader.data;
        var texture = new egret.Texture();
        texture._setBitmapData(bmd);
        this.texture = texture;
    };
    return NetBitmap;
}(egret.Bitmap));
__reflect(NetBitmap.prototype, "NetBitmap");
//# sourceMappingURL=NetBitmap.js.map