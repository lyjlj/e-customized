var app=getApp();
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
    this.getMyPrize();
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

  },
  getMyPrize:function(){
    var that = this;
    var url = app.getRequestUrl + '/api/ActivitysHandler.ashx?action=GetCurrUserNoAcceptPrize&customId=' + app.customId;
    app.getOpenId(function (t) {
      wx.request({
        url: url,
        data: {
          ActivityId: that.data.id,
          openid: t
        },
        success: function (res) {
          that.setData({Records:res.data.Records,ShowTip:res.data.Records.length==0})
        }
      });
    })
  },
  ShowBarCode:function(e){
    var that=this;
    var recordid=e.currentTarget.dataset.recordid;
    var item=that.data.Records.find(o=>o.RecordId==recordid);
    this.setData({ImgCode:item.AwardBarCode});
    this.selectComponent("#showCode").showFrame();
  },
  closeCode:function(){
    this.selectComponent("#showCode").hideFrame();
    this.setData({ImgCode:''});
    this.getMyPrize();
  }
})