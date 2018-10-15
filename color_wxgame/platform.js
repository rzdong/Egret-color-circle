/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {

    name = 'wxgame'

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        })
    }

  openCustomerServiceConversation(){
    wx.openCustomerServiceConversation();
  }
  /**
   * @param obj any
   * {
   *    title: string,
   *    imageUrl: string
   * }
   */
  showShareMenu(obj) {
    wx.showShareMenu();
    wx.onShareAppMessage(() => {
      return {
        title: '恕我直言，在座的各位，都没我6',
        imageUrl: 'resource/game_res/share1.jpg'
      }
    })
  }
  openDataContext = new WxgameOpenDataContext();

  shareToFriend(obj) {
    wx.shareAppMessage(obj)
  }

  shake(types){
    if(types == 1){
      wx.vibrateShort()
    }else if(types == 2){
      wx.vibrateLong()
    }
  }

  playAudio(url){
    var audio = wx.createInnerAudioContext()
    audio.src = url // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
    audio.play()
  }
  feedBackBtn = null
  createFeedbackButton() {
    // this.feedBackBtn = wx.createFeedbackButton({
    //   type: 'text',
    //   text: '打开意见反馈页面',
    //   style: {
    //     left: 10,
    //     top: 76,
    //     width: 200,
    //     height: 40,
    //     lineHeight: 40,
    //     backgroundColor: '#ff0000',
    //     color: '#ffffff',
    //     textAlign: 'center',
    //     fontSize: 16,
    //     borderRadius: 4
    //   }
    // })
    // wx.createGameClubButton({
    //   icon: 'green',
    //   style: {
    //     left: 10,
    //     top: 76,
    //     width: 40,
    //     height: 40
    //   }
    // })
    // wx.checkIsUserAdvisedToRest({ todayPlayedTime: 72000,success: (res) => {
    //   console.log(res)
    // }})
  }

}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = 600;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.canvas.width = 350;
        openDataContext.canvas.height = 600;
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();