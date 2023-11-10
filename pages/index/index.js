
let phone = null
Page(wrap({
  makePhoneCall() {
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },
  scanCode() {
    // https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html
    wx.scanCode({
      success({ path }) {
        // 非本程序生成
        if (!path) return wx.showToast({
          title: '无法识别',
          icon: 'error',
          duration: 3000,
        });
        wx.navigateTo({
          url: '/' + path,
        });
      }
    });
  },
}));
