// pages/userprofile/userprofile.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    swiperh: 0,
    requesturl:app.getRequestUrl,
    canedit:0,
    viplist: [{
        src: '/Utility/pics/jfk.png',
        gradeId: 1131,
        id: '486'
      },
      {
        src: '/Utility/pics/jink.png',
        gradeId: 1132,
        id: '484'
      },
      {
        src: '/Utility/pics/zsk.png',
        gradeId: 1133,
        id: '485'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var that = this;   
    wx.getSystemInfo({
      success: (result) => {       
        var swiperh = result.screenWidth*(9/16)
        that.setData({
          swiperh: swiperh,
          canedit:options.canedit
        })
      },
    })
    app.getSiteInfo(function(site){
     
      that.setData({
        siteinfo:site
      })
    })
    app.getUserInfo(function (t) {
      that.setData({
        userinfo: t
      })
    })
  },

  showvip: function (e) {
    var id = e.currentTarget.dataset.id;
    var url = encodeURIComponent('TopicId=' + id);
    wx.navigateTo({
      url: '../diypage/index?url=' + url,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindValue:function(e){
    var that=this;
    var data=that.data.userinfo;
    var value=e.detail.value;
    var key=e.target.dataset.key;
    if(key==undefined){
      key=e.currentTarget.dataset.key;
      value=e.currentTarget.dataset.sex;     
      data[key]=value;
    }
    data[key]=value;
   
    this.setData({
      userinfo: data
    })
  },
  savemember:function(){
    var t=this;
    wx.request({
      url: app.getUrl('UpdateInformationMember'),
      data:{
        gender:t.data.userinfo.Gender,
        RealName:t.data.userinfo.realName,
        WeddingDate:t.data.userinfo.WeddingDate,
        birthday:t.data.userinfo.BirthDate,
        phone:t.data.userinfo.CellPhone,
        openId:t.data.userinfo.OpenId
      },
      success(res){    
        if(res.data.Status=='OK')
        {
          wx.showToast({
            title: res.data.Msg,
          })
        }else{
          wx.showModal({
            showCancel:false,
            title:'提示',
            content:res.data.Msg
          })
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

  getPhoneNumber: function (p) {
    var t = this;
    if (p.detail.errMsg == 'getPhoneNumber:ok') {
      wx.request({
        url: app.getUrl("GetPhoneNum"),
        data: {
          openId: app.globalData.openId,
          encryptedData: p.detail.encryptedData,
          session_key: app.globalData.session_key,
          iv: p.detail.iv
        },
        success: function (a) {
          if (0 == a.data.error_response.code) {
            var user = app.globalData.userInfo;
            user.CellPhone = a.data.error_response.phone;
            t.setData({
              userinfo: user,              
            });
          } else {
            uat.showTip(a.data.error_response.sub_msg)
          }
        }
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})