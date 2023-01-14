// pages/PointInfo/PointInfo.js
var e = getApp();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    RequestUrl: app.getRequestUrl,
    bottom: 5,
    MetaDescription: "",
    TempMetaDescription: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.GetPointInfo(options.id);
    wx.getSystemInfo({
      success: (result) => {
        var bottom = result.screenHeight - result.safeArea.height - result.safeArea.top;
        that.setData({
          bottom: bottom+5
        })
      },
    })
  },
  GetPointInfo:function(id){
    var that=this;
    wx.showLoading({
      title: '正在加载...',
    })
    wx.request({
      url: app.getUrl('GetPointInfo'),
      data:{
        GiftId:id
      },
      success(res){
        wx.hideLoading();
        that.setData({
          info:res.data.data,
          richtext:that.formatRichText(res.data.data.LongDescription)
        })

      }
    })
  },
   formatRichText: function(html){
     if(!html)
     return '';
    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
},
  submit: function () {
    //return false;
    var t=this;
    app.getOpenId(function(o){
      wx.request({
        url: app.getUrl('ExChangeGifts'),
        data:{
          openId:o,
          giftId:t.data.info.GiftId
        },
        success(res){
          if(res.data.Status=="OK")
          {
            wx.showModal({
              title:'提示',
              content:'成功添加到兑换列表,马上去下单?',
              success(res){
                if(res.confirm){
                  wx.navigateTo({
                    url: '/subpages/giftshopcart/giftshopcart',
                  })
                }else{
                  wx.navigateBack({
                    delta: 0,
                  })
                }
              }
            })
          }else
          {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        }
      })
    })
  },
  giftcart:function(){
    wx.navigateTo({
      url: '/subpages/giftshopcart/giftshopcart',
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
    var t=this;
    return {
      title: t.data.info.Name,
      path: '/subpages/PointInfo/PointInfo?id='+t.data.info.GiftId
    }
  }
})