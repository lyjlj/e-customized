var e = getApp();
var app = e;
Page({
  data: {
    disabled: !0,
    userName: "",
    password: "",
    ReferralUserId: "",
    DefaultColor: "",
    Logo: "",
    SiteName: '',
    returnUrl: '',
    showReg:false,
    ShowGrant:false,
    ShowQuickLogin:false,
    ShowCellPhone:false,
    ShowLogin:false
  },
  onLoad: function(ev) {    
    var that = this;
    app.getOpenId(function(o){
      wx.request({
        url: app.getUrl('CheckOpenId'),
        data:{
          openId:o
        },
        success(res){
          if("NOUser" == res.data.Message)
          {
            app.globalData.userInfo=null
          }
          app.getSiteInfo(function(v) {
            if(!app.globalData.userInfo&&v.QuickLogin&&v.AllSiteInfo.RegisterByPhone)
            {
              that.setData({ShowCellPhone:true});
            }else if(!app.globalData.userInfo&&v.QuickLogin)
            {
              that.setData({ShowQuickLogin:true});
            }
            else if(!app.globalData.userInfo&&!v.QuickLogin)
            {
              that.setData({ShowLogin:true});
            }
            else if(app.globalData.userInfo&&!app.globalData.userInfo.CellPhone&&app.globalData.siteInfo.IsCheckPhone)
            {
              that.setData({ShowCellPhone:true});
            }
            else if(app.globalData.userInfo&&app.globalData.userInfo.Grant=='Granted'){        
              that.setData({
                ShowGrant:true,
                Grant:app.globalData.userInfo.Grant
              });
            }
            var title=v.QuickLogin ? '微信授权' : '账号登录';
            if(ev.NeedGrant)
               title='业务员授权';
            wx.setNavigationBarTitle({
              title: title
            });
            that.setData({
              DefaultColor: v.DefaultColor,
              Logo: v.Logo,
              NeedGrant:ev.NeedGrant,
              SiteName: v.SiteName,
              IsQuickLogin: v.QuickLogin,
              returnUrl: (!ev.returnUrl||ev.returnUrl == 'undefined') ? '../home/home' : decodeURIComponent(ev.returnUrl),
              userName: wx.getStorageSync("login-account"),
              password: wx.getStorageSync("login-password"),
              isRememberPass: wx.getStorageSync("isRememberPass"),
              showReg:app.getRefferUserId()
            });
            that.CheckNewLoginWeiXin();
          });
        }
      })
    })
   
  },
  //验证是否新的微信登录
  CheckNewLoginWeiXin:function()
  {
    var that = this;
    var s = that.data.userName,
      t = that.data.password,
      r = that.data.isRememberPass;     
      if(r&&s&&t){
        e.getOpenId(function(o){
          wx.request({
            url: e.getUrl('CheckNewFacilityByUserName'),
            data:{
              openId:o,
              userName:s,
              password:t
            },
            success(res){
              if(res.data.code==0){
                if(res.data.data){
                  that.loginbyUser({});
                }
              }             
            }
          })
        })
      }
   
  },
  onReady: function() {},
  onShow: function() {
    var that=this;
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            headimg: res.userInfo.avatarUrl
          })
        },
      })
  },
  onHide: function() {},
  onUnload: function() {},
  bindUserNameInput: function(e) {
    this.setData({
      userName: e.detail.value
    });
  },
  bindPwdInput: function(e) {
    this.setData({
      password: e.detail.value
    }), this.data.userName.length > 0 && this.data.password.length > 0 ? this.setData({
      disabled: !1
    }) : this.setData({
      disabled: !0
    });
  },
  grantLogin:function(){
    var that=this;
    if(that.data.Grant=='SendGrant')
      return;
    app.getOpenId(function(v) {
      wx.request({
        url: e.getUrl("GrantLogin"),
        data: {
          openId: v
        },
        success: function(a) {
          wx.showModal({
            content:'已通知业务员授权，请耐心等待，为了您能获取授权通知请务必关注消息信息',
            success:function(res){
              app.globalData.userInfo.Grant='SendGrant';
              that.setData({Grant:'SendGrant'});
              if(res.confirm)
               wx.previewImage({
                 urls: ['https://www.daogoujingling.com/Templates/xcxshop/images/xxxs.png'],
               })
               else{
                 wx.switchTab({
                   url: '../home/home'
                 })
               }
            },
            cancelText:'我已关注',
            confirmText:'查看'
          })
        }
      });
    });
    
  },
  getPhoneNumber: function (p) {
    var t = this;
    if (p.detail.errMsg == 'getPhoneNumber:ok') {
      e.getOpenId(function(o){
        wx.request({
          url: app.getUrl("GetPhoneNum"),
          data: {
            openid: o,
            unionid:e.globalData.unionid,
            encryptedData: p.detail.encryptedData,
            session_key: app.globalData.session_key,
            iv: p.detail.iv
          },
          success: function (a) {           
              app.globalData.userInfo=null;                     
              wx.redirectTo({
                url: t.data.returnUrl,
                fail: function() {
                  wx.switchTab({
                    url: t.data.returnUrl,
                  })
                }
              });          
            }
        });
      })
     
    }
  },
  loginbyUser: function(a) {
    var that = this;
    var pic = that.data.headimg;
    var s = this.data.userName,
      t = this.data.password; 

      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        lang:'zh_CN',
        success: (res) => {         
          if (res.errMsg == 'getUserProfile:ok') {
            var u=res.userInfo;            
            e.getOpenId(function(v) {
              wx.request({
                url: e.getUrl("LoginByUserName"),
                data: {
                  openId: v,
                  userName: s,
                  password: t,
                  nickName: u.nickName,
                  unionId: e.globalData.unionid?e.globalData.unionid:'',         
                  ReferralUserId:e.getRefferUserId(),
                  headImage:u.avatarUrl,
                  Address:u.country+'.'+u.province+'.'+u.city
                },
                success: function(a) {
                  if ("OK" == a.data.Status && u.avatarUrl){
                    a.data.Data.picture = u.avatarUrl
                  }
                  "OK" == a.data.Status ? (e.setUserInfo(a.data.Data), that.handlePass(),
                    wx.navigateBack({
                      delta: 1,
                      fail:function(){
                        wx.switchTab({
                          url: '../home/home',
                        })
                      } 
                    })) : wx.showModal({
                    title: '提示',
                    content: a.data.Message
                  });
                }
              });
            });     
          }
        }
      })

  },
  bindRegister:function(){
    wx.redirectTo({
      url: '../register/register',
    })
  },
  quickLogin: function(u) {
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      lang:'zh_CN',
      success: (res) => {
        if (res.errMsg == 'getUserProfile:ok') {
          var a = res;
          var u=res.userInfo;
          var s = e.getRefferUserId();
          wx.request({
            url: e.getUrl("QuickLogin"),
            data: {
              openId: e.globalData.openId,
              nickName: a.userInfo.nickName,
              unionId:e.globalData.unionid?e.globalData.unionid:'',
              headImage: a.userInfo.avatarUrl,
              encryptedData: a.encryptedData,              
              session_key: e.globalData.session_key,
              iv: a.iv,
              ReferralUserId: s,
              Address:u.country+'.'+u.province+'.'+u.city
            },
            success: function(a) {
              void 0 == a.data.error_response ? a.data.Data.IsBindUser ? (e.setUserInfo(a.data.Data),
                wx.redirectTo({
                  url: that.data.returnUrl,
                  fail: function() {
                    wx.switchTab({
                      url: that.data.returnUrl,
                    })
                  }
                })) : wx.redirectTo({
                url: "../relationlogin/relationlogin"
              }) : uat.showTip(a.data.error_response.sub_msg);
            }
          });
        }
      }
    })
  
  },
  cancelLogin: function() {
    wx.switchTab({
      url: '../home/home',
    })
  },
  handlePass(){
    wx.removeStorageSync("login-account");
    wx.removeStorageSync("login-password");
    wx.removeStorageSync("isRememberPass");
    if(this.data.isRememberPass)
    {
      wx.setStorageSync("login-account", this.data.userName);
      wx.setStorageSync("login-password", this.data.password);
      wx.setStorageSync("isRememberPass", this.data.isRememberPass);
    }
  },
  rememberPass: function() {
    this.setData({
      isRememberPass: !this.data.isRememberPass
    })
  }
});