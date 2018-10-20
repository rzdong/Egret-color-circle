/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class WxgamePlatform {
    openDataContext = new WxgameOpenDataContext();
    name = 'wxgame'
    userInfo = null
    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getUserInfo(cb) {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']){
              wx.getUserInfo({
                lang: 'en',
                success: (ress) => {
                  this.userInfo = ress.userInfo
                },
                fail: (err) => {
                  console.log(err)
                }
              })
          }else {
            let sysinfo = wx.getSystemInfoSync()
            let rate = sysinfo.windowHeight / 750
            let button = wx.createUserInfoButton({
              lang: 'en',
              type: 'text',
              text: ' ',
              style: {
                left: (sysinfo.windowWidth - 380 * rate) / 2  ,
                top: (sysinfo.windowHeight - 124 * rate),
                width: 380 * rate,
                height: 124 * rate,
                // backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 124 * rate,
              }
            })
            button.onTap((res) => {
              console.log('点击按钮获取的用户信息', res)
              this.userInfo = res.userInfo
              if(cb) cb()
              button.destroy()
            })
          }
        }
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
    // wx.setUserCloudStorage({
    //   KVDataList: [{ key: 'maxScore', value: '0' }],
    //   success: (res) => {
    //     // updateRank()
    //   },
    //   fail: (err) => {
    //   },
    //   complete: () => {

    //   }
    // })
    // wx.removeUserCloudStorage({
    //   keyList: ['score']
    // })
    if(this.feedBackBtn){
      this.showFeedBack();
      return;
    }

    let sysinfo = wx.getSystemInfoSync()
    let rate = sysinfo.windowHeight / 750
    this.feedBackBtn = wx.createFeedbackButton({
      type: 'text',
      text: ' ',
      style: {
        left: sysinfo.windowWidth - 190 * rate,
        top: sysinfo.windowHeight - 124 * rate,
        width: 190 * rate,
        height: 124 * rate,
        lineHeight: 124 * rate,
        // backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        // borderRadius: 4
      }
    })
    this.feedBackBtn.onTap(() => {
      // this.playAudio("resource/music /tap1.mp3")
      // this.feedBackBtn.destroy()
      console.log('点击了建议按钮')
    })
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

  hideFeedBack() {
    if(this.feedBackBtn) this.feedBackBtn.hide();console.log('hide')
  }
  showFeedBack() {
    if(this.feedBackBtn) this.feedBackBtn.show();console.log('show')
  }

  setUserCloudStorage() {
    wx.setUserCloudStorage({
      KVDataList: [{ key: 'maxScore', value: '0' }],
      success: (res) => {
      },
      fail: (err) => {
      },
      complete: () => {

      }
    })
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
        bitmap.height = height;

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
        let sysinof = wx.getSystemInfoSync()
        let rate = sysinof.windowHeight / 750;

        openDataContext.canvas.width = 365 * rate;
        openDataContext.canvas.height = 650 * rate;
        openDataContext.postMessage(data);
    }
}


window.platform = new WxgamePlatform();