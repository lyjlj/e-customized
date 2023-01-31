// subpages/confirmScheme/confirmScheme.js
var app = getApp()
Page({

  /* 页面的初始数据 */
  data: {
    type: "",
    attachment: "",
    needStr: "",
    quantity: "",
    id:'',
    //报价信息
    offerObj:{}
  },

  /* 生命周期函数--监听页面加载 */
  onLoad(options) {
    console.log(options.type);
    console.log(options.attachment);
    console.log(options);
    const offerObj =JSON.parse(options.offerInfo)
    this.setData({
      type: options.type,
      attachment: options.attachment,
      needStr: options.needStr,
      quantity: options.quantity,
      id:options.id,
      offerObj
    })
    console.log("offerObj",this.data.id)
  },
  adjustscheme(){
    wx.navigateTo({
      url:"/pages/adjustscheme/adjustscheme?id=" + this.data.id
    })

  },
  //修改方案
  changeScheme(e){
    console.log("e的值",e)
    var that = this;
    app.getUserInfo(function(u){
      wx.request({
        url: "https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_UpdateStatus",
        method:'post',
        data:{
          id:that.data.id,
          status:e.currentTarget.dataset.status,
        },
        success:function(res){
          wx.navigateTo({
            url:"/subpages/needList/needList"
          })
        },
        complete:function(){

        }
      })
    })
    

  },
  //调整方案
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