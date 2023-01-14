var o = getApp();
var app = o;
Page({

  /* 页面的初始数据*/
  data: {
    userInfo: {},
    realName: '',
    picture: '',
    imgSrc: "",
    wxCode: '',
    UserId: '',
    logo: '',
    path: '/images/gh_918cc58891c8_430.jpg'
  },

  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    var that = this;
    const promise = new Promise(function (resolve, reject) {
      wx.request({
        url: app.getUrl("GetWxCode"),
        data: {
          scene: 'ReferralUserId_' + options.UserId,
          page: 'pages/home/home'
        },
        success: function (e) {
          that.setData({
            wxCode: e.data.url
          })
          resolve();
        }
      });
    }).then(() => {
      that.init();
    })



    app.getSiteInfo(function () {
      that.setData({
        logo: app.globalData.siteInfo.MemberBgImg,
        realName: options.realName,
        picture: options.picture,
        UserId: options.UserId
      });
    });

  },

  // 封装获取网络图片的方法
  getImgInfo: function (src) {
    return new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: src,
        success: resolve,
        fail: reject
      })
    })
  },

  // 绘制生成小程序码
  init: function () {
    var that = this;
    wx.showLoading({
      title: '正在生成...',
    })
    Promise.all([
      // 获取用户头像
      that.getImgInfo(that.data.picture),
      // 获取小程序码
      that.getImgInfo(that.data.wxCode),
      // 获取小程序logo
      // that.getImgInfo(that.data.logo),
    ]).then(res => {
      console.log(res);
      const ctx = wx.createCanvasContext('shareCanvas')
      // 绘制背景色和大小
      ctx.setFillStyle("#fff")
      ctx.fillRect(0, 0, 540, 800)

      // 绘制文字
      ctx.setTextBaseline('top')
      ctx.setTextAlign('left')
      ctx.setFillStyle('#000')
      ctx.setFontSize(30)
      ctx.fillText("招金e定制", 205, 80)

      // 绘制头像
      ctx.save()
      ctx.setFillStyle('#fff')
      ctx.beginPath()
      ctx.arc(175, 640, 40, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(res[0].path, 130, 600, 90, 90)
      ctx.restore()

      // 绘制昵称
      ctx.font = 'normal bold 26px sans-serif';
      ctx.fillText(String(that.data.realName), 250, 635)
      ctx.font = 'normal normal 20px sans-serif';
      ctx.setFillStyle('#616165')

      // 绘制小程序码
      ctx.drawImage(res[1].path, 110, 180, 320, 320)
      


      ctx.draw(false, () => {
        that.canvasToImage()
      })
    })
  },

  // canvasToTempFilePath()必须放到draw()的回调里面；
  canvasToImage: function () {
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: res => {
        wx.hideLoading()
        this.setData({
          imgSrc: res.tempFilePath
        })
      }
    })
  },

  //保存小程序码
  download() {
    wx.showLoading({
      title: '正在保存'
    });
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imgSrc,
      success: function () {
        wx.showToast({
          title: '保存成功'
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '保存失败'
        });
      },
      complete: function () {
        wx.hideLoading()
      }
    });
  },

  // 分享给朋友
  onShareAppMessage: function (res) {
    return {
      title: '招金e定制',
      path: '/pages/home/home',
    };

  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady() {},

  /*生命周期函数--监听页面显示*/
  onShow() {
    // var that = this;
    // that.init();
  },

  /* 生命周期函数--监听页面隐藏*/
  onHide() {},

  /*生命周期函数--监听页面卸载*/
  onUnload() {},

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {},

  /*页面上拉触底事件的处理函数*/
  onReachBottom() {},
})