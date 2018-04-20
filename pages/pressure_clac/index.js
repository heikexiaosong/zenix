//index.js
//获取应用实例
const app = getApp()

/**
 *   <!--changeName
     管道总长 = (  网络中允许压降bar x  管道内径mm 5次方 x 绝对进气压力bar(a)   ) /(450 x 压缩机空气输送流速 1.85次方)


     dp = (L × 450 × Qc^1.85)/（d^5 × p）
     ==>
     dp × d^5 × p = L × 450 × Qc^1.85
     ==>
     L = (dp × d^5 × p)/(450 × Qc^1.85)
      dp = 压降（建议最大值为0.1bar）
      length = 管道长度（以米计算）
      diameter= 管道内经（以毫米计算）
      bar = 压缩机排气口的绝对压力（以bar计算）
      qc = 压缩机排气量（以升/秒计算）
  -->
 */

var data = {
  length: 200,
  diameter: 50,
  bar: 7,
  qc: 7.64,
  dp: 0.07,
  sv: 3.6,
  r: "在建议值范围内，推荐使用",
  color: "green"
}

function changeName(data) {
  //dp = (L × 450 × Qc^1.85)/（d^5 × p）
  // B2: length B3: diameter B4: sv B5: bar
  // dp =(B2*450*POWER(B4*1000/60,1.85))/(POWER(B3,5)*(B5+1))
  // qc =B4/60/(3.14*(B3/2000)*(B3/2000))/(B5+1)
  var dp = (parseFloat(data.length) * 450 * Math.pow(parseFloat(data.sv) * 1000 / 60, 1.85)) / (Math.pow(parseFloat(data.diameter), 5) * (parseFloat(data.bar) + 1));
  var qc = parseFloat(data.sv) / 60 / (3.14 * (parseFloat(data.diameter) / 2000) * (parseFloat(data.diameter) / 2000)) / (parseFloat(data.bar) + 1);

  console.log({ dp: dp.toFixed(2), qc: qc.toFixed(2), r: r, color: color });
  var r = "在建议值范围内，推荐使用";
  var color = "green";
  if (dp > 0.1 ){
    r = "压降过大，建议增大管径或者减小管长";
    color = "red";
  }

  return { dp: dp.toFixed(2), qc: qc.toFixed(2), r: r, color: color};
}

Page({
  data: data,
  //事件处理函数

  bindblur_l: function (e) {
    this.setData({
      length: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      dp: result.dp,
      qc: result.qc,
      r: result.r,
      color: result.color
    });
  },

  bindblur_d: function (e) {
    this.setData({
      diameter: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      dp: result.dp,
      qc: result.qc,
      r: result.r,
      color: result.color
    });
  },


  bindblur_p: function (e) {
    this.setData({
      bar: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      dp: result.dp,
      qc: result.qc,
      r: result.r,
      color: result.color
    });
  },

  bindblur_sv: function (e) {
    this.setData({
      sv: e.detail.value
    });
    var result = changeName(this.data);
    this.setData({
      dp: result.dp,
      qc: result.qc,
      r: result.r,
      color: result.color
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
