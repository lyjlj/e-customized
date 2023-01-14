// subpages/usercode/usercode.js
var o = getApp();
var app = o;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t=this;
    o.getUserInfo(function(u){     
      t.setData({
        userInfo:u
      })
      if(u.KH){
        wx.request({
            url: o.getUrl('GetCouponCodeImg'),
            data:{
              ClaimCode:u.KH,
              type:1
            },
            success(res){           
              t.setData({
                img1:res.data.data
              })
            }
          })
    } 
    if(u.CellPhone){
      wx.request({
          url: o.getUrl('GetCouponCodeImg'),
          data:{
            ClaimCode:u.CellPhone,
            type:0
          },
          success(res){         
            t.setData({
              img2:res.data.data
            })
          }
        })
  } 
    })
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