// subpages//membergrade/membergrade.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    siteInfo:null,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.getSiteInfo(function(s){
      that.setData({
        siteInfo:s
      })
    })
    app.getUserInfo(function(u){
      that.setData({
        userInfo:u
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  updateUser:function(a){
    var that=this;
    var points=a.currentTarget.dataset.points; 
    var gradeid=a.currentTarget.dataset.gradeid;     
    var name=a.currentTarget.dataset.name;    
    var userinfo=that.data.userInfo;
   
    wx.showModal({
      title: '提示',
      content: '确定使用'+points+'积分升级吗？',
      success (res) {
        if (res.confirm) {
          app.getOpenId(function(o){
            wx.request({
              url: app.getUrl('ChangeMemberGrade'),
              data:{
                openId:o,
                GradeId:gradeid
              },
              success(res){
                wx.showModal({
                  title: '提示',
                  content:res.data.Message,
                  showCancel:false,
                  success(result){
                    if(res.data.Status=='OK')
                    {
                      userinfo.gradeId=gradeid;
                      userinfo.points=userinfo.points-points;
                      userinfo.gradeName=name;
                      that.setData({
                        userInfo:userinfo
                      })
                      app.globalData.userInfo=userinfo;
                      return false;
                    }
                  }
                })
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
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