//index.js
//获取应用实例
const app = getApp()

var data = {
  b4: 10,
  b5: 0.6,
  b6: 1.44,
  b7: 0.7,
  b8: 1.43,
  b9: 11.43
}

function changeName(data) {
  console.log(data);

  var b4 = parseFloat(data.b4);
  var b5 = parseFloat(data.b5);
  var b7 = parseFloat(data.b7);

  var b6 = (101 * b4 * 1000 / (b5 * 1000 + 101) / 1000);
  var b9 = ((b7 * 1000 + 101) * b6 * 1000 / 101 / 1000);
  var b8 = (b9 - b4); 
  console.log(b8);
  console.log({ b6: b6, b8: b8, b9: b9 }); 
  return { b6: parseFloat(b6.toFixed(2)), b8: parseFloat(b8.toFixed(2)), b9: parseFloat(b9.toFixed(2))};
}

Page({
  data: data,
  //事件处理函数

  bindblur_b4: function (e) {
    this.setData({
      b4: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      b6: result.b6,
      b8: result.b8,
      b9: result.b9
    });
  },

  bindblur_b5: function (e) {
    this.setData({
      b5: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      b6: result.b6,
      b8: result.b8,
      b9: result.b9
    });
  },


  bindblur_b7: function (e) {
    this.setData({
      b7: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      b6: result.b6,
      b8: result.b8,
      b9: result.b9
    });
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
