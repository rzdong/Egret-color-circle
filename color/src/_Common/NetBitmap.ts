/**
 * 加载网络图片，返回egretBitmap
 */

class NetBitmap extends egret.Bitmap {
    // http://seopic.699pic.com/photo/50035/3303.jpg_wh1200.jpg
    
    constructor(url){
        super();
        let imgLoader:egret.ImageLoader = new egret.ImageLoader;
        imgLoader.crossOrigin = 'anonymous'
        imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this ); 
        imgLoader.load(url);
    }

    private imgLoadHandler(ev: egret.Event){
        var loader:egret.ImageLoader = ev.currentTarget;
        var bmd:egret.BitmapData = loader.data;
        let texture = new egret.Texture();
        texture._setBitmapData(bmd)
        this.texture = texture
    }
}