Page({

  /* 页面的初始数据 */
  data: {
    detailList: {}
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    console.log(options);
    var that = this;
    that.setData({
      detailList: options
    })
  },
  adjustProject(data){
    wx.navigateTo({
      url: '/pages/adjustscheme/adjustscheme',
    })
  },
  //收货倒计时
  timeDown(endTime){
		//获取时间差
		let now = new Date().getTime()/1000 
		let totalSeconds = parseInt((endTime - now));
		//天数
		var days = Math.floor(totalSeconds / (60 * 60 * 24));
		//取模（余数）
		var modulo = totalSeconds % (60 * 60 * 24);
		//小时数
		var hours = Math.floor(modulo / (60 * 60));
		modulo = modulo % (60 * 60);
		//分钟
		var minutes = Math.floor(modulo / 60);
		//秒
		var seconds = modulo % 60;
		//输出还剩多少时间
		return `${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`
	},
  /* 生命周期函数--监听页面初次渲染完成 */
  onReady() {

  },

  /* 生命周期函数--监听页面显示 */
  onShow() {

  },

  /* 生命周期函数--监听页面隐藏 */
  onHide() {

  },

  /* 生命周期函数--监听页面卸载 */
  onUnload() {

  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {},

  /* 页面上拉触底事件的处理函数 */
  onReachBottom() {},

  /* 用户点击右上角分享 */
  onShareAppMessage() {}
})