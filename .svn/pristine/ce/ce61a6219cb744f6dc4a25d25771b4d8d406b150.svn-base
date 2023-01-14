// pages/giftshopcart/giftshopcart.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartinfo: {},
    RequestUrl: app.getRequestUrl,
    TotalPoint: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    t.loadshopcart();
  },
  loadshopcart: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var t = this;
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('GiftShoppingCart'),
        data: {
          openId: o,
          client: 'wap'
        },
        success(res) {
          wx.hideLoading();
          if (res.data.Status == 'OK') {
            var p = 0;
            res.data.Data.LineGifts.forEach(function (gift) {
              p = p + gift.SubPointTotal;
            })
            t.setData({
              cartinfo: res.data.Data,
              TotalPoint: p
            })
          } else {
            t.setData({
              cartinfo: {},
              TotalPoint: 0
            })
          }
        }
      })
    })

  },
  del: function (e) {
    var t = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除吗?',
      success(res) {
        if (res.confirm) {
          app.getOpenId(function (o) {
            wx.request({
              url: app.getUrl('DeleteCartGift'),
              data: {
                openId: o,
                giftId: id
              },
              success(re) {
                if (re.data == "OK")
                  t.loadshopcart();
              }
            })
          })
        } else if (res.cancel) {

        }
      },
    })

  },
  add: function (e) {
    var t = this;
    var id = e.currentTarget.dataset.id;
    var quantity = e.currentTarget.dataset.quantity;

    t.updatequantity(quantity + 1, id);
  },
  plus: function (e) {
    var t = this;
    var id = e.currentTarget.dataset.id;
    var quantity = e.currentTarget.dataset.quantity;
    t.updatequantity(quantity - 1, id);

  },
  updatequantity: function (q, id) {
    var t = this;
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('ChageGiftQuantity'),
        data: {
          openId: o,
          giftId: id,
          quantity: q
        },
        success(res) {
          if (res.data == "OK")
            t.loadshopcart();
        }
      })
    })
  },
  submit: function () {
    var t=this;
    if(t.data.cartinfo&&t.data.cartinfo.LineGifts&&t.data.cartinfo.LineGifts.length>0)
    {
      app.getOpenId(function(o){
        wx.request({
          url: app.getUrl('CanSubmitGiftOrder'),
          data:{
            openId:o
          },
          success(res){           
            if(res.data.Status=='OK')
            {
              wx.navigateTo({
                url: '/pages/submitorder/submitorder?frompage=&buyamount=&productsku=',
              })
            }else{
              wx.showModal({
                title:'提示',
                content:res.data.Message,
                showCancel:false
              })
            }
          }
        })
      })
    }else{
      wx.showModal({
        title: '提示',
        content:'购物车为空',
        showCancel:false
      })
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})