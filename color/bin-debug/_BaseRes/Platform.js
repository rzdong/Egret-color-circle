var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DebugPlatform = (function () {
    function DebugPlatform() {
        this.openDataContext = {
            createDisplayObject: function () { },
            postMessage: function () { }
        };
        this.userInfo = null;
        this.feedBackBtn = null;
    }
    DebugPlatform.prototype.getUserInfo = function (cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.openCustomerServiceConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DebugPlatform.prototype.showShareMenu = function (obj) {
    };
    DebugPlatform.prototype.shareToFriend = function (obj) {
    };
    DebugPlatform.prototype.shake = function (type) {
    };
    DebugPlatform.prototype.playAudio = function (url) {
    };
    DebugPlatform.prototype.createFeedbackButton = function () {
    };
    DebugPlatform.prototype.hideFeedBack = function () {
    };
    DebugPlatform.prototype.showFeedBack = function () {
    };
    DebugPlatform.prototype.setToStorage = function (key, value) {
    };
    DebugPlatform.prototype.getFromStorage = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
__reflect(DebugPlatform.prototype, "DebugPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new DebugPlatform();
}
/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */
// class WxgamePlatform {
//     name = 'wxgame'
//     login() {
//         return new Promise((resolve, reject) => {
//             wx.login({
//                 success: (res) => {
//                     resolve(res)
//                 }
//             })
//         })
//     }
//     getUserInfo() {
//         return new Promise((resolve, reject) => {
//             wx.getUserInfo({
//                 withCredentials: true,
//                 success: function (res) {
//                     var userInfo = res.userInfo
//                     var nickName = userInfo.nickName
//                     var avatarUrl = userInfo.avatarUrl
//                     var gender = userInfo.gender //性别 0：未知、1：男、2：女
//                     var province = userInfo.province
//                     var city = userInfo.city
//                     var country = userInfo.country
//                     resolve(userInfo);
//                 }
//             })
//         })
//     }
//   openCustomerServiceConversation(){
//     wx.openCustomerServiceConversation();
//   }
//   /**
//    * @param obj any
//    * {
//    *    title: string,
//    *    imageUrl: string
//    * }
//    */
//   showShareMenu(obj) {
//     wx.showShareMenu();
//     wx.onShareAppMessage(() => {
//       return {
//         title: '恕我直言，在座的各位，都没我6',
//         imageUrl: 'resource/game_res/share1.jpg'
//       }
//     })
//   }
//   openDataContext = new WxgameOpenDataContext();
//   shareToFriend(obj) {
//     wx.shareAppMessage(obj)
//   }
//   shake(types){
//     if(types == 1){
//       wx.vibrateShort()
//     }else if(types == 2){
//       wx.vibrateLong()
//     }
//   }
//   playAudio(url){
//     var audio = wx.createInnerAudioContext()
//     audio.src = url // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
//     audio.play()
//   }
// }
// class WxgameOpenDataContext {
//     createDisplayObject(type, width, height) {
//         const bitmapdata = new egret.BitmapData(sharedCanvas);
//         bitmapdata.$deleteSource = false;
//         const texture = new egret.Texture();
//         texture._setBitmapData(bitmapdata);
//         const bitmap = new egret.Bitmap(texture);
//         bitmap.width = width;
//         bitmap.height = height;
//         if (egret.Capabilities.renderMode == "webgl") {
//             const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
//             const context = renderContext.context;
//             ////需要用到最新的微信版本
//             ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
//             ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
//             if (!context.wxBindCanvasTexture) {
//                 egret.startTick((timeStarmp) => {
//                     egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
//                     bitmapdata.webGLTexture = null;
//                     return false;
//                 }, this);
//             }
//         }
//         return bitmap;
//     }
//     postMessage(data) {
//         const openDataContext = wx.getOpenDataContext();
//         openDataContext.postMessage(data);
//     }
// }
// window.platform = new WxgamePlatform();
//# sourceMappingURL=Platform.js.map