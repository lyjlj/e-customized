var o = getApp();
Component({
  properties: {

  },
  data: {
    visible: true,
    userInfo: null,
    DefaultColor:"" ,
    Logo:"" ,
  },
  properties: {
    
  },
  pageLifetimes: {
    show: function () {
      var vs=o.globalData.userInfo&&o.globalData.userInfo.CellPhone;
      this.setData({
        DefaultColor:o.globalData.siteInfo.DefaultColor,
        Logo:o.globalData.siteInfo.Logo,
        userInfo:o.globalData.userInfo,
        visible:!vs
      })
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods: {
    getPhoneNumber:function(p) {
      var t = this;
      if (p.detail.errMsg == 'getPhoneNumber:ok') {
        wx.request({
          url: o.getUrl("GetPhoneNum"),
          data: {
            openId: o.globalData.openId,
            encryptedData: p.detail.encryptedData,
            session_key: o.globalData.session_key,
            iv: p.detail.iv
          },
          success: function (a) {
            if (0 == a.data.error_response.code) {
              var user = o.globalData.userInfo;
              user.CellPhone = a.data.error_response.phone;
              t.setData({
                visible: false
              })
            }
            else {
              wx.showToast({
                title: a.data.error_response.sub_msg,
              })
            }
          }
        });
      }
    },
  }
})