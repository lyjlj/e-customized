var o = getApp();
var app = o;
Page({
  data: {
    OpenReferral: "",
    userInfo: {},
    bgImg: "",
    DefaultColor: "",
    version: '',
    MsgCount: 0,
    showServer: false,
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    host: app.getRequestUrl,
    statusObj: {
      50: '待处理',
      51: '待确认',
      52: '已确认',
      53: '签订合同',
      54: '生产中',
      55: '待发货',
      56: '待收货',
      57: '已完成',
    },
    statusSum: {
      50: 0,
      51: 0,
      52: 0,
      53: 0,
      54: 0,
      55: 0,
      56: 0,
      57: 0
    },
    pageSize: 100
  },
  onLoad: function (n) {
    var that = this;
    app.observe(app.globalData, 'MsgCount', function (name) {
      that.setData({
        MsgCount: name
      })
    });
    app.observe(app.globalData, 'ShowBottomFrame', function (v) {
      that.hideTab(v);
    })
    wx.getExtConfig({
      success(res) {
        that.setData({
          version: res.extConfig.version
        })
      }
    });
    if (n && n.scene)
      app.setRefferUserId(n.scene);

  },
  hideTab: function (v) {
    var bar = this.getTabBar();
    if (v) {
      bar.setData({
        showTab: false
      })
    } else {
      bar.setData({
        showTab: true
      })
    }
  },
  onShow: function () {
    //添加选中效果
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var bar = this.getTabBar();
      var index = 0;
      for (var i = 0; i < bar.data.foot.length; i++) {
        if (bar.data.foot[i].url == '/pages/usehome/usehome') {
          index = i;
          break;
        }
      }
      bar.setData({
        selected: index,
      })
    }
    var o = this;
    o.loadData(o);
  },
  onPullDownRefresh: function () {
    var n = this;
    o.globalData.userInfo = null, n.loadData(n);
  },
  loadData: function (n) {
    var n = this;
    var returnUrl = o.getCurrentUrl()
    o.globalData.isReloadUser = "1", o.getUserInfo(function (t) {
      n.setData({
        userInfo: t
      })
      o.getSiteInfo(function () {
        n.setData({
          OpenReferral: o.globalData.siteInfo.OpenReferral,
          bgImg: o.globalData.siteInfo.MemberBgImg,
          DefaultColor: o.globalData.siteInfo.DefaultColor,
          MembershipRights: o.globalData.siteInfo.AllSiteInfo.MembershipRights,
          IsQuickLogin: o.globalData.siteInfo.QuickLogin
        });
      });
      //获取动态图标
      n.getmoreicon();
    }, returnUrl);

    app.getUserInfo(function (r) {
      wx.request({
        url: 'https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_GetList',
        method: "POST",
        data: {
          userid: r.UserId,
          current: 1,
          pageSize: n.data.pageSize,
          customId: app.customId
        },
        success: function (t) {
          if (t.data.code == 0) {
            var datalist = t.data.data,
              allObj = {
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0
              };
            datalist.forEach(item => {

              // 处理商品状态的数值
              switch (item.status) {
                case 50:
                  allObj[50] += 1;
                  break;
                case 51:
                  allObj[51] += 1;
                  break;
                case 52:
                  allObj[52] += 1;
                  break;
                case 53:
                  allObj[53] += 1;
                  break;
                case 54:
                  allObj[54] += 1;
                  break;
                case 55:
                  allObj[55] += 1;
                  break;
                case 56:
                  allObj[56] += 1;
                  break;
                case 57:
                  allObj[57] += 1;
                  break;
              }
            })
            n.setData({
              needData: datalist,
              TotalNum: t.data.total,
              statusSum: allObj
            })
          } else "NOUser" == t.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function (t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function () {

        }
      });
    });
  },
  bindStatue: function (o) {
    var n = o.currentTarget.dataset.key;
    wx.navigateTo({
      url: "../orderlist/orderlist?status=" + n
    });
  },
  bindApply: function (o) {
    wx.navigateTo({
      url: "../applylist/applylist"
    });
  },
  bindMyAddressTap: function (o) {
    wx.navigateTo({
      url: "../address/address"
    });
  },
  bindMyCouponsTap: function (o) {
    wx.navigateTo({
      url: "../InquiryList/InquiryList"
    });
  },
  bindMsg: function () {
    var path = 'pages/home/home?apptype=' + o.globalData.siteInfo.appId + '&version=release&apptypeid=' + o.globalData.openId;
    wx.navigateToMiniProgram({
      appId: 'wx4ce96e8dee361538', // 要跳转的小程序的appid
      path: path, // 跳转的目标页面 
      extarData: {},
      envVersion: 'release', //develop,release
      success(res) {

      }
    })
  },
  bindPointTap: function (o) {
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapshop/Point?showType=ShowList")
    });
  },
  bindGiftTap: function (o) {
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapshop/MyPrize")
    });
  },
  bindMyQuestion: function (o) {
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapshop/selectstore")
    });
  },
  bindBookTap: function () {
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapShop/activity")
    });
  },
  UserProfile: function () {
    wx.navigateTo({
      url: "/subpages/userprofile/userprofile?canedit=1"
    });
  },
  bindOutlineOrders: function () {
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapShop/OutLineOrders")
    });
  },

  bindMyAccount: function () {
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapShop/MyAccountSummary")
    });
  },
  bindProductUpdate: function () {
    wx.navigateTo({
      url: "../UpdateProduct/index"
    });
  },
  updategrade: function () {
    wx.navigateTo({
      url: "/subpages/membergrade/membergrade"
    });
  },
  bindPointMall: function () {
    wx.navigateTo({
      url: '/subpages/PointMall/PointMall',
    })
  },
  showonlineserver: function (t) {
    var e = t.currentTarget.dataset.name;
    var id = t.currentTarget.dataset.id;
    this.setData({
      username: e,
      showServer: true
    })
    var servername = 'Server_' + id + '->Applet_' + this.data.userInfo.UserId;
    wx.navigateTo({
      url: '/components/OnlineServiceNew/OnlineServiceNew?username=' + e + '&id=' + id + '&name=' + servername,
    })
    //this.selectComponent("#onlineserver").showFrame(id,servername);
  },
  bindVipTap: function () {
    var t = this;
    if (t.data.MembershipRights) {
      wx.navigateTo({
        url: '/pages/diypage/index?url=' + encodeURIComponent(t.data.MembershipRights),
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '暂无开放',
      })
    }
  },
  ExitLoginout: function () {
    o.globalData.userInfo = null;
    o.getOpenId(function (n) {
      wx.request({
        url: o.getUrl("logout"),
        data: {
          openId: n
        },
        success: function (o) {
          wx.redirectTo({
            url: "../login/login?returnUrl=" + encodeURIComponent('../usehome/usehome')
          });
        }
      });
    });
  },
  bindTelPhone: function (o) {
    var n = o.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: n
    });
  },
  getPhoneNumber: function (p) {
    var t = this;
    if (p.detail.errMsg == 'getPhoneNumber:ok') {
      wx.request({
        url: o.getUrl("GetPhoneNum"),
        data: {
          UserId: o.globalData.userInfo.UserId,
          encryptedData: p.detail.encryptedData,
          session_key: o.globalData.session_key,
          iv: p.detail.iv
        },
        success: function (a) {
          if (0 == a.data.error_response.code) {
            var user = o.globalData.userInfo;
            user.CellPhone = a.data.error_response.phone;
            t.setData({
              userInfo: user
            });
          } else {
            uat.showTip(a.data.error_response.sub_msg)
          }
        }
      });
    }
  },
  bindExtension: function (n) {
    0 != o.globalData.userInfo.ReferralStatus && 2 != o.globalData.userInfo.ReferralStatus ? wx.navigateTo({
      url: "../applicationResult/applicationResult"
    }) : wx.navigateTo({
      url: "../applicationpromotion/applicationpromotion"
    });
  },
  bindDistribution: function (o) {
    wx.navigateTo({
      url: "../Distribution/Distribution"
    });
  },
  popup() {
    this.selectComponent('#exitLoginFrame').showFrame();
  },
  hidepup() {
    this.selectComponent('#exitLoginFrame').hideFrame();
  },
  showqrcode() {
    var that = this;
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl("GetWxCode"),
        data: {
          scene: app.globalData.userInfo.UserId,
          openId: o,
          remark: '',
          page: 'pages/usehome/usehome'
        },
        success: function (e) {
          that.selectComponent('#dialog').showqrcode({
            url: e.data.url,
            name: '我的邀请码'
          });
        }
      });
    })

  },
  getuserinfo(u) {
    return;
  },
  bindConfirmCode() {
    var that = this;
    wx.scanCode({
      success: (res) => {
        var code = res.result;
        if (code.split(':').length == 2 && code.split(':')[0] == 'Award') {
          that.confirmAward(code.split(':')[1]);
        }
      },
    })
  },
  confirmAward(code) {
    var that = this;
    wx.showModal({
      content: '是否确认核销',
      success: function (c) {
        if (!c.confirm)
          return;
        var url = app.getRequestUrl + '/api/ActivitysHandler.ashx?action=ConfirmAwardCode&customId=' + app.customId;
        app.getOpenId(function (t) {
          wx.request({
            url: url,
            data: {
              Code: code,
              openid: t
            },
            success: function (res) {
              wx.showModal({
                content: res.data.msg,
                showCancel: false
              })
            }
          });
        })
      }
    })

  },
  bindFavorites: function () {
    wx.navigateTo({
      url: '../Favorites/Favorites',
    })
  },
  bindStoreList: function () {
    wx.navigateTo({
      url: '/subpages/storeList/storeList',
    })
  },
  showBarcode: function (e) {
    var t = this;

    wx.navigateTo({
      url: '/subpages/usercode/usercode',
    })
    return false;
    if (t.data.userInfo.CellPhone) {
      wx.request({
        url: app.getUrl('GetCouponCodeImg'),
        data: {
          ClaimCode: t.data.userInfo.CellPhone,
          type: 1
        },
        success(res) {
          t.selectComponent("#dialog").showqrcode({
            url: res.data.data,
            name: t.data.userInfo.CellPhone
          });

        }
      })
    }

  },
  getwxcode() {
    var that = this;
    wx.request({
      url: app.getUrl("GetWxCode"),
      data: {
        scene: 'ReferralUserId_' + app.globalData.userInfo.UserId,
        page: 'pages/home/home'
      },
      success: function (e) {
        that.setData({
          wxCode: e.data.url
        })
      }
    });
  },
  showMask: function () {
    this.getwxcode();
    this.setData({
      show: true
    })
  },
  closeMask: function () {
    this.setData({
      show: false
    })
  },
  getmoreicon() {
    var that = this;
    o.getUserInfo(function (t) {
      wx.request({
        url: 'https://www.daogoujingling.com/api/wechatapplet.ashx?action=J2S&Function=GetMenus&typeid=1&customid=' + o.customId + '&userid=' + t.UserId,
        success(re) {
          if (re.data.code == 0) {
            that.setData({
              moreIcon: re.data.data
            })
          }
        }
      })
    })
  },
  showWebMenu(e) {
    var that = this;
    var link = e.currentTarget.dataset.link;
    var user = that.data.userInfo;
    link = link + "&userid=" + user.UserId;
    wx.navigateTo({
      url: '/pages/webview/webview?url=' + encodeURIComponent(link),
    })
  },
  bindOnlineServer: function () {
    wx.navigateTo({
      url: '/components/OnlineServiceNew/OnlineServiceNew?username=在线客服',
    })
  },
  bindMessage: function () {
    wx.navigateTo({
      url: '../ServiceMessage/ServiceMessage',
    })
  },
  bindGuidelines: function () {
    var url = 'http://1086.daogoujingling.com/vshop/Topics.aspx?TopicId=3669';
    url = encodeURIComponent(url);
    wx.redirectTo({
      url: '/pages/diypage/index?url=' + url
    })
  },
  bindShare: function () {
    var that = this,
      realName = that.data.userInfo.realName,
      picture = that.data.userInfo.picture,
      UserId = that.data.userInfo.UserId;
    wx.navigateTo({
      url: '../../subpages/shareApplet/shareApplet?realName=' + realName + '&picture=' + picture + '&UserId=' + UserId,
    })
  },
  bindProject: function (e) {
    var status = e.currentTarget.dataset.status,
      index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../subpages/needList/needList?status=' + status + '&index=' + index,
    })
  }
});