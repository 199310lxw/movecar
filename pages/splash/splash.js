// index.js
// 获取应用实例
const app = getApp()
// 在页面中定义激励视频广告
let videoAd = null
Page({
 
    makePhoneCall() {
      const phoneNumber = '13632871195'; // 替换成要拨打的电话号码
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      })
    },

  data: {
    
    motto: 'splash',
    userInfo: {},
    isplay:false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  goto() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad() {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if(wx.getSystemInfoSync().SDKVersion >= "2.6.0") {
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-0c3757d9bab8cf29'
        })
        videoAd.onLoad(() => {})
        videoAd.onError((err) => {})
        videoAd.onClose((res) => {
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖
              wx.navigateTo({
                url: '../index/index'
              })
          }
        })
        videoAd.show()
        // 用户点击了【关闭广告】按钮
      }
    }

    if(!this.data.isplay) {
      wx.showModal({
      title: '温馨提示',
      content: '须观看激励视频广告，才能解锁使用',
        success(res) {
          if (res.confirm) {
            videoAd.show()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }  else {
      
    }
  },
})
