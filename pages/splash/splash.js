
// 在页面中定义激励视频广告
let videoAd = null
Page({
  data: {
    phonenum:
  },
  onLoad(options) {
    this.data.
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-c15434b67a651f0d'
      })
      videoAd.onLoad(() => {}) // 用户触发广告后，显示激励视频广告 
      videoAd.onError((err) => {})
      videoAd.onClose((res) => { //判断用户是否将广告播放完成，则跳转至目标页面或者其它后续功能
        if (res && res.isEnded) {
          wx.redirectTo({
            url: '/pages/index/index'
          })
        } else {
          //判断用户是否将广告播放完成，没有则跳转返回上一页
          wx.showModal({
            title: '提示',
            content: '请先看完广告，谢谢',
            showCancel: false,
            complete: (res) => {
              if (res.cancel) {
                this.shouVideoAd()
              }
              if (res.confirm) {
                this.showVideoAd()
              }
            }
          })
        }
      })
    }
  },
  onShow() {
    wx.redirectTo({
      url: '/pages/index/index'
    })
    // this.shouVideoAd()
  },
  shouVideoAd: function () {
    console.log('This is a shouVideoAd function.');
    if (videoAd) {
      videoAd.show().catch(() => {
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },
})