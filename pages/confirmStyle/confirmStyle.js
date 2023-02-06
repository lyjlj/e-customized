Page({

  /* 页面的初始数据 */
  data: {
    //项目号
    id:'',
    //项目详情
    uploadStyle:''

  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    console.log("options的值",JSON.parse(options.uploadStyle));
    var that = this;
    that.setData({
      id: options.id,
      uploadStyle:JSON.parse(options.uploadStyle)
    })
    console.log("data值",that.data.id)
  },
  //确认样式
  confirmStyle(e){
    const url = "https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_UpdateStatus"
    const params = {
      id:e.currentTarget.dataset.id,
      status:54,
      customizationmark:this.data.uploadStyle
    }
    wx.request({
      url,
      method:'post',
      data:params,
      success:function(res){
        wx.navigateTo({
          url:"/subpages/needList/needList"
        })
      }
    })
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