//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.w = 680;
        _this.r = 8;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.createView, _this);
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var shape = new egret.Shape();
        shape.graphics.beginFill(0x222222);
        shape.graphics.drawRect(0, 0, stageW, stageH);
        shape.graphics.endFill();
        this.addChild(shape);
        var sky = new NetBitmap('resource/game_res/loadingbg.jpg'); //'https://static01.coloros.com/bbs/data/attachment/forum/201312/27/174621xzs8lj9gzi28npu2.jpg'
        this.addChild(sky);
        sky.width = stageW;
        sky.height = stageH;
        var r = this.r;
        var w = this.w;
        var shapeP = new egret.Shape();
        shapeP.width = w;
        shapeP.height = r * 2;
        shapeP.x = (this.stage.stageWidth - shapeP.width) / 2;
        shapeP.y = this.stage.stageHeight - shapeP.height - 40;
        shapeP.graphics.beginFill(0xdddddd, 0.3);
        shapeP.graphics.moveTo(r, 0);
        shapeP.graphics.lineTo(w - r, 0);
        shapeP.graphics.drawArc(w - r, r, r, -Math.PI / 2, Math.PI / 2);
        shapeP.graphics.lineTo(r, 2 * r);
        shapeP.graphics.drawArc(r, r, r, Math.PI / 2, -Math.PI / 2);
        shapeP.graphics.lineTo(r, 0);
        shapeP.graphics.endFill();
        this.addChild(shapeP);
        var shapeMask = new egret.Shape();
        shapeMask.width = w;
        shapeMask.height = r * 2;
        shapeMask.x = (this.stage.stageWidth - shapeMask.width) / 2;
        shapeMask.y = this.stage.stageHeight - shapeMask.height - 40;
        shapeMask.graphics.beginFill(0x35f7ff);
        shapeMask.graphics.moveTo(r, 0);
        shapeMask.graphics.lineTo(w - r, 0);
        shapeMask.graphics.drawArc(w - r, r, r, -Math.PI / 2, Math.PI / 2);
        shapeMask.graphics.lineTo(r, 2 * r);
        shapeMask.graphics.drawArc(r, r, r, Math.PI / 2, -Math.PI / 2);
        shapeMask.graphics.lineTo(r, 0);
        shapeMask.graphics.endFill();
        this.addChild(shapeMask);
        this.shapeProgress = new egret.Sprite();
        this.shapeProgress.width = w;
        this.shapeProgress.height = r * 2;
        this.shapeProgress.anchorOffsetX = this.shapeProgress.width;
        this.shapeProgress.x = (this.stage.stageWidth - this.shapeProgress.width) / 2;
        this.shapeProgress.y = this.stage.stageHeight - this.shapeProgress.height - 40;
        this.shapeProgress.graphics.beginFill(0x33CCFF);
        this.shapeProgress.graphics.moveTo(r, 0);
        this.shapeProgress.graphics.lineTo(w - r, 0);
        this.shapeProgress.graphics.drawArc(w - r, r, r, -Math.PI / 2, Math.PI / 2);
        this.shapeProgress.graphics.lineTo(r, 2 * r);
        this.shapeProgress.graphics.drawArc(r, r, r, Math.PI / 2, -Math.PI / 2);
        this.shapeProgress.graphics.lineTo(r, 0);
        this.shapeProgress.graphics.endFill();
        this.shapeProgress.mask = shapeMask;
        this.addChild(this.shapeProgress);
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.stage.stageHeight - 100;
        this.textField.width = this.stage.stageWidth;
        this.textField.height = 50;
        this.textField.textAlign = "center";
        this.textField.text = "资源加载中...";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        var d = current * this.w / total;
        this.shapeProgress.x = d + (this.stage.stageWidth - this.shapeProgress.width) / 2;
        // this.particle.x = this.shapeProgress.x - 5
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
//# sourceMappingURL=LoadingUI.js.map