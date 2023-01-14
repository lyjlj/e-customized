var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputdata:{},
    userinfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.scene&&options.scene>0){
      app.setRefferUserId(options.scene);
    }    
    var that=this;
    app.getSiteInfo(function(s){
      that.setData({DefaultColor:s.DefaultColor})
    });
    if(!app.getRefferUserId())
      wx.navigateBack();
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

  },
  goLogin:function(){
    wx.redirectTo({
      url: '../login/login',
    })
  },
  getPhoneNumber: function(p) {
    var t=this;
    if (p.detail.errMsg =='getPhoneNumber:ok')
    {
      wx.request({
        url: app.getUrl("GetPhoneNum"),
        data: {
          openId: app.globalData.openId,
          encryptedData: p.detail.encryptedData,
          session_key: app.globalData.session_key,
          iv: p.detail.iv
        },
        success: function (a) {
          if(0 == a.data.error_response.code)
          {
            var data = t.data.inputdata;
            t.data.inputdata.CellPhone= a.data.error_response.phone;
            t.setData({ inputdata: data });
          } 
        }
      });
    }
  },
  bindValue:function(e){
    var that=this;
    var data=that.data.inputdata;
    var value=e.detail.value;
    var key=e.target.dataset.key;
    data[key]=value;
    this.setData({
      inputdata: data
    })
  },
  bindSaveInfo:function(){
    var that=this;
    var data=that.data.inputdata;
    if(!data.UserName)
    {
      wx.showModal({
        showCancel:false,
        content:'账号不能为空'
      })
      return;
    }
    if(!data.RealName)
    {
      wx.showModal({
        showCancel:false,
        content:'名称不能为空'
      })
      return;
    }
    if(!data.CellPhone)
    {
      wx.showModal({
        showCancel:false,
        content:'手机号码不能为空'
      })
      return;
    }
    if(!data.PassWord)
    {
      wx.showModal({
        showCancel:false,
        content:'密码不能为空'
      })
      return;
    }
    if(!data.PassWord2)
    {
      wx.showModal({
        showCancel:false,
        content:'确认密码不能为空'
      })
      return;
    }
    if(data.PassWord!=data.PassWord2)
    {
      wx.showModal({
        showCancel:false,
        content:'密码与确认密码不一样，请重新输入'
      })
      return;
    }
    data.openId=app.globalData.openId;
    data.ReferralUserId=app.getRefferUserId();
    wx.request({
      url: app.getUrl("RegisterUser"),
      data: data,
      success: function (a) {
        if(a.data.code!=1)
        {
          wx.showModal({
            showCancel:false,
            content:'注册成功',
            success(res){
              app.globalData.userInfo = a.data.Data;
              wx.switchTab({
                url: '../usehome/usehome',
              });
            }
          })
        } 
        else { 
          wx.showModal({
            showCancel:false,
            content:a.data.msg
          })
        } 
      }
    });
  }
})