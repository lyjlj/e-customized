// subpages/confirmScheme/confirmScheme.js
Page({

  /* 页面的初始数据 */
  data: {
    type: "",
    attachment: "",
    needStr: "",
    quantity: ""
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    console.log(options.type);
    console.log(options.attachment);
    console.log(options);
    this.setData({
      type: options.type,
      attachment: options.attachment,
      needStr: options.needStr,
      quantity: options.quantity
    })
  },
  adjustscheme(){
    wx.navigateTo({
      url:"/pages/adjustscheme/adjustscheme"
    })
  },

  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {},

  /* 生命周期函数--监听页面显示 */
  onShow() {},

  /* 生命周期函数--监听页面隐藏 */
  onHide() {},

  /* 生命周期函数--监听页面卸载 */
  onUnload() {},

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {},

  /* 页面上拉触底事件的处理函数 */
  onReachBottom() {},

  /* 用户点击右上角分享 */
  onShareAppMessage() {},

  onlineServices: function () {
    wx.navigateTo({
      url: '/components/OnlineServiceNew/OnlineServiceNew?username=在线客服',
    })
  }
})