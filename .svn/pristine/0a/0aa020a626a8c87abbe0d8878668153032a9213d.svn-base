var t = require("../../utils/config.js");
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
    var that=this;
    app.getSiteInfo(function(s){
      that.setData({DefaultColor:s.DefaultColor})
    });
    app.getUserInfo(function(info){
      that.setData({userinfo:info})
    },'../UserInfo/UserInfo')
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
            var user = app.globalData.userInfo;
            user.CellPhone = a.data.error_response.phone;
            t.setData({ userinfo: user });
          } 
          else { uat.showTip(a.data.error_response.sub_msg) } 
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
    if(data.Phone&&!t.checkPhone(data.Phone))
    {
      wx.showModal({
        showCancel:false,
        content:'手机号格式不正确，请重新输入！'
      })
      return;
    }
    data.openId=app.globalData.openId;
    data.ReferralUserId=that.data.userinfo.UserId;
    wx.request({
      url: app.getUrl("AddSubUser"),
      data: data,
      success: function (a) {
        if(0 == a.data.code)
        {
          wx.showModal({
            showCancel:false,
            content:a.data.msg,
            success(res){
              wx.navigateBack();
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