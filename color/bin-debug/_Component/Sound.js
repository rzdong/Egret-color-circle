var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundContainer = (function () {
    function SoundContainer(arr) {
        this.soundArr = {};
        this.arr = [];
        this.arr = arr;
        this.init();
    }
    SoundContainer.prototype.init = function () {
        for (var i = 0; i < this.arr.length; i++) {
            this.soundArr[this.arr[i]] = new Sound(this.arr[i]);
        }
    };
    SoundContainer.prototype.getSound = function (str) {
        return this.soundArr[str];
    };
    return SoundContainer;
}());
__reflect(SoundContainer.prototype, "SoundContainer");
var Sound = (function () {
    /**
     * @param str string 资源名字
     */
    function Sound(str) {
        this.sound = RES.getRes(str);
    }
    Sound.prototype.play = function () {
        this.soundChanner = this.sound.play(0, 1);
    };
    Sound.prototype.stop = function () {
        this.soundChanner.stop();
    };
    return Sound;
}());
__reflect(Sound.prototype, "Sound");
//# sourceMappingURL=Sound.js.map