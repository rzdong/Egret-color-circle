/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
declare interface Platform {

    getUserInfo(cb): any;

    login(): Promise<any>

    openCustomerServiceConversation(): Promise<any>

    showShareMenu(obj: any)

    shareToFriend(obj: any)

    shake(type: number)

    playAudio(url: string)
    
    createFeedbackButton()

    openDataContext: any
    userInfo: any
    feedBackBtn: any
    hideFeedBack()
    showFeedBack()
    setToStorage(key: string, value: any)
    getFromStorage(key: string): Promise<any>
}

class DebugPlatform implements Platform {
    openDataContext = {
        createDisplayObject: () => {},
        postMessage: () => {}
    }
    userInfo = null
    feedBackBtn = null
    async getUserInfo(cb) {
        return { nickName: "username" }
    }
    async login() {

    }
    
    async openCustomerServiceConversation() {
        
    }

    showShareMenu(obj: any) {

    }
    shareToFriend(obj: any) {

    }

    shake(type: number){

    }

    playAudio(url: string){

    }
    createFeedbackButton(){

    }
    hideFeedBack(){

    }
    showFeedBack(){
        
    }

    setToStorage(key: string, value: any){

    }

    async getFromStorage(key: string) {

    }
    
}


if (!window.platform) {
    window.platform = new DebugPlatform();
}



declare let platform: Platform;

declare interface Window {

    platform: Platform
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





