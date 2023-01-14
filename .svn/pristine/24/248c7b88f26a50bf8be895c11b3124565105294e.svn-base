var t = require("../../utils/config.js"),
  e = getApp();
var app = e;
var WxParse = require("../wxParse/wxParse.js");
var location = require("../../utils/qqmap-wx-jssdk.min.js");
Page({
  data: {
    pageIndex: 1,
    pageSize: 10,
    isDataEnd: !1,
    choiceProducts: [],
    refreshSuccess: !0,
    keyword: "",
    TopicUrl: "",
    VersionNumber: "",
    TopicData: null,
    RequestUrl: e.getRequestUrl,
    CurrentProduct: null,
    MsgCount: e.globalData.MsgCount,
    CurrentSku: null,
    selectedSkuContent: null,
    isShowSkuSelectBox: !1,
    TotalNum: 0,
    DefaultColor: '',
    imgUrls: [],
    swiperHeight: 0,
    showOnlineServer: false,
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '我的主页', //导航栏 中间的标题
    },
    GoldPrices: [],
    username:null  
  },
  onShow: function () {
    this.selectComponent("#liveWindow").initPlay();
    wx.getSystemInfo({
      success: (result) => {
        if(result.environment&&result.environment=='wxwork')///如果在企业微信打开记录一下企业微信的用户ID
        {
          wx.qy.login({
            success: function(res) {
              wx.request({
                url: e.getRequestUrl+'api/QYWeiXinAPI.ashx?action=GetUserId&CustomId='+e.customId+'&js_code='+res.code,
                success(acc){
                  if (res.code) {
                    wx.qy.getEnterpriseUserInfo ({
                      success: function(user) {
                        wx.request({
                          url: e.getRequestUrl+'api/QYWeiXinAPI.ashx?action=GetUserInfo&CustomId='+e.customId,
                          data:{
                            encryptedData:user.encryptedData,
                            iv:user.iv,
                            session_key:acc.data.data.session_key
                          },
                          success(user2){
                            e.setqyuserinfo(user2.data.data);                            
                          }
                        })
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              }) 
            }
          });
        }    
      },
    })
  
  

    var d = {
      typeTitle: '',
      typePic: '',
      linkType: '',
      dataset: [{
        linkType: 0,
        link: "",
        title: "",
        showtitle: "",
        pic: ""
      }]
    };
    this.initTab();
  },
  initTab(){
    //添加选中效果
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
      var bar=this.getTabBar();    
      var index=0;
      for(var i=0;i<bar.data.foot.length;i++)
      {
        if(bar.data.foot[i].url=='/pages/home/home')
          {
            index=i;break;
          }
      }
      bar.setData({
        selected: index,
        showTab:true
      })
    }
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  hidepup() {
    this.selectComponent('#bottomFrame').hideFrame();
  },
  showGoldPrice: function () {   
    var that = this;
    this.selectComponent('#bottomFrame').showFrame();
    wx.request({
      url: e.getUrl("GetTodayPrice"),
      success: function (t) {
        if (t.data.code == 0) {
          that.setData({
            GoldPrices: t.data.data
          })
        }
      }
    });
  },
  onPullDownRefresh: function () {
    var that = this;
    // var topicUrl = that.data.TopicUrl + '?' + new Date().getTime();
    // that.setData({
    //   TopicUrl: topicUrl
    // });
    e.getOpenId(function (a) {
      var r = {
        openId: a
      };
      t.httpGet(e.getUrl(e.globalData.getIndexData), r, that.getHomeData);
    });
  },

  onLoad: function (a) {
    var r, o, n = this;

    e.observe(e.globalData, 'MsgCount', n.setMsgCount);
    e.observe(e.globalData, 'ShowBottomFrame', n.hideTab);
    
    if (a&&a.ReferralUserId) {
      app.setRefferUserId(a.ReferralUserId);
      //app.getUserInfo();
    }
      
    if (a&&a.scene) {
      app.setRefferUserId(a.scene);
    }
    e.getOpenId(function (a) {
      var r = {
        openId: a
      };
      wx.showNavigationBarLoading(); t.httpGet(e.getUrl(e.globalData.getIndexData), r, n.getHomeData);

      n.initTab();
    });

  },
  hideTab: function (v, v2) {
    
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
  setMsgCount: function (name) {
    this.setData({
      MsgCount: name
    })
  },
  ClickSwiper: function (t) {
    var a = t.currentTarget.dataset.link,
      r = t.currentTarget.dataset.showtype;
    e.JumpUrlByType(r, a);
  },
  onShareAppMessage: function () {
    var t = "/pages/home/home?ReferralUserId=" + e.globalData.userInfo.UserId;
    return e.globalData.userInfo && e.globalData.userInfo.IsReferral && (t += "&ReferralUserId=" + e.globalData.userInfo.UserId),
      uat.showTip(e.globalData.userInfo.IsReferral), uat.showTip("pathurl" + t), {
        title: e.globalData.ReferralInfo.ShopName,
        path: t,
        success: function (t) {
          uat.showTip("分享成功", "success");
        },
        fail: function (t) {
          uat.showTip("分享失败", "error");
        }
      };
  },
  getHomeData: function (t) {
    var a = this;
    "NOUser" != t.Message ? ("OK" == t.Status ? (a.getHomeProductData(a.data.pageIndex, !0),
      a.setData({
        refreshSuccess: !0,
        imageList: t.Data.ImgList,
        // countDownList: t.Data.CountDownList,
        TopicUrl: t.Data.HomeTopicPath+ '?' + new Date().getTime(),
        VersionNumber: t.Data.Vid,
        DefaultColor: t.Data.SiteInfo.DefaultColor,
        showOnlineServer: t.Data.SiteInfo.AppPushAppKey != '' && t.Data.SiteInfo.AppPushAppKey != undefined
      }), e.globalData.siteInfo = t.Data.SiteInfo, wx.setNavigationBarTitle({
        title:e.globalData.JewelleryStore?e.globalData.JewelleryStore.StoreName: e.globalData.siteInfo.SiteName
      }), wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#' + e.globalData.siteInfo.DefaultColor,
      }), a.CheckVersionNumber(a)) : wx.showToast({
      title: "系统数据异常"
    }), wx.hideNavigationBarLoading(),wx.stopPullDownRefresh()) : wx.navigateTo({
      url: "../login/login"
    });
  },
  getHomeProductData: function (a, r) {
    return;
    var o = this;
    void 0 == r && (r = !1), a < 1 && (a = 1), e.getOpenId(function (n) {
      var u = {
        openId: n,
        pageIndex: a,
        pageSize: o.data.pageSize
      };
      wx.showLoading && wx.showLoading({
        title: "首页数据加载中..."
      }), t.httpGet(e.getUrl(e.globalData.GetIndexProductData), u, function (t) {
        if ("OK" == t.Status) {
          var e = o.data.choiceProducts;
          if (t.Data.ChoiceProducts.length > 0) {
            for (var n in t.Data.ChoiceProducts) {
              var u = t.Data.ChoiceProducts[n];
              e.push(u);
            }
            var i = {
              choiceProducts: e
            };
            (!t.Data.ChoiceProducts || t.Data.ChoiceProducts.length < o.data.pageSize) && (i.isDataEnd = !0),
            r && (i.pageIndex = a + 1), o.setData(i);
          }
        }
        wx.hideLoading();
      });
    });
  },
  CheckVersionNumber: function (t) {
    // t.DownloadTopcis(t)
    // var e = wx.getStorageSync("versionnumber");
    // null == e || "" == e || "undefined" == e || parseInt(e) < parseInt(t.data.VersionNumber) ? (wx.setStorageSync("versionnumber", t.data.VersionNumber), 
    // t.DownloadTopcis(t)) : t.HomeTopicData(t);
  },


  bindSearchInput: function (t) {
    var e = t.detail.value;
    e.length > 0 && this.setData({
      keyword: e
    });
  },
  bindConfirmSearchInput: function (t) {
    var e = t.detail.value;
    e.length > 0 && (wx.setStorage({
      key: "keyword",
      data: e
    }), wx.switchTab({
      url: "../searchresult/searchresult",
      success: function (t) {
        wx.hideKeyboard();
      }
    }));
  },
  bindBlurInput: function (t) {
    wx.hideKeyboard();
  },
  bindSearchAction: function (t) {
    var e = this.data.keyword;
    e.length > 0 && (wx.setStorage({
      key: "keyword",
      data: e
    }), wx.switchTab({
      url: "../searchresult/searchresult",
      success: function (t) {
        wx.hideKeyboard();
      }
    }));
  },
  gotoKeyWordPage: function (t) {
    var params = t.detail.param;
    wx.navigateTo({
      url: "../searchresult/searchresult?"+params
    });
  },
  findProductById: function (t) {
    return this.data.choiceProducts.find(function (e) {
      return e.ProductId == t;
    });
  },
  setProductCartQuantity: function (t, e, a) {
    var r = this,
      o = !1,
      n = r.data.choiceProducts,
      u = n.find(function (e) {
        return e.ProductId == t;
      });
    if (u) {
      switch (e = parseInt(e), a) {
        case "=":
          u.CartQuantity = e;
          break;

        case "+":
          u.CartQuantity += e;
      }
      u.CartQuantity < 0 && (u.CartQuantity = 0), o = !0;
    }
    if (o) {
      var i = {
        choiceProducts: n
      };
      r.setData(i);
    }
  },
  setSkuCartQuantity: function (t, e, a) {
    var r = this,
      o = !1,
      n = r.data.CurrentProduct;
    if (n && n.Skus) {
      var u = n.Skus.find(function (e) {
          return e.SkuId == t;
        }),
        i = r.data.CurrentSku;
      if (u) {
        switch (e = parseInt(e), a) {
          case "=":
            u.CartQuantity = e;
            break;

          case "+":
            u.CartQuantity += e;
        }
        u.CartQuantity < 0 && (u.CartQuantity = 0), i && i.SkuId == u.SkuId && (i.CartQuantity = u.CartQuantity),
          o = !0;
      }
    }
    if (o) {
      var s = {
        CurrentProduct: n,
        CurrentSku: i
      };
      r.setData(s);
    }
  },
  //图片滑动事件
  change: function (e) {
    var that = this;
    var index = e.detail.current;
    var imgUrls = that.data.imgUrls;
    that.imgH(imgUrls[index]);
  },
  //获取图片的高度，把它设置成swiper的高度
  imgH: function (e) {
    var that = this
    if (e.swiperH) {
      that.setData({
        swiperHeight: e.swiperH //设置高度
      })
      return;
    }
    wx.getImageInfo({ //获取图片长宽等信息
      src: e.pic,
      success: function (res) {
        var imgw = res.width;
        var imgh = res.height
        var swiperH = 750 * imgh / imgw
        e.swiperH = swiperH
        that.setData({
          swiperHeight: swiperH //设置高度
        })
      }
    })
  },
  catchAddCart: function (t) {
    var a = this,
      r = t.currentTarget,
      o = r.dataset.productid,
      n = r.dataset.activeid;
    if (1 != r.dataset.activetype) {
      var u = r.dataset.operator,
        i = parseInt(u + "1"),
        s = r.dataset.opensku,
        c = a.findProductById(o);
      if (!c.HasSKU || c.HasSKU && "false" == s) {
        var d = r.dataset.sku;
        a.addToCart(o, d, i);
      } else wx.showLoading && wx.showLoading({
        title: "商品规格数据加载..."
      }), e.getOpenId(function (t) {
        wx.request({
          url: e.getUrl("GetProductSkus"),
          data: {
            ProductId: o,
            openId: t
          },
          success: function (t) {
            if (wx.hideLoading(), "OK" == t.data.Status) {
              var e = t.data.Data,
                r = e.DefaultSku,
                o = [];
              null != e && e.SkuItems.forEach(function (t, e, a) {
                t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                var r = new Object();
                r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, o.push(r);
              }), a.setData({
                CurrentProduct: e,
                CurrentSku: r,
                selectedskuList: o,
                selectedSku: r.SkuId
              }), a.showSkuDOM();
            }
          },
          complete: function () {}
        });
      });
    } else wx.navigateTo({
      url: "../countdowndetail/countdowndetail?id=" + n
    });
  },
  onSkuClick: function (t) {
    var e = this,
      a = t.target.dataset.indexcount,
      r = t.target.id,
      o = t.target.dataset.skuvalue,
      n = new Object();
    n.ValueId = r, n.Value = o;
    var u = this.data.selectedskuList;
    u[a] = n;
    var i = "",
      s = this.data.CurrentProduct,
      c = this.data.CurrentProduct.SkuItems;
    s.SkuItems.length, u.length;
    for (var d = s.ProductId, l = 0; l < u.length; l++) {
      var h = u[l];
      void 0 != h && (i += "" == i ? h.Value : "," + h.Value, d += "_" + h.ValueId);
    }
    for (var f = 0; f < s.SkuItems[a].AttributeValue.length; f++) s.SkuItems[a].AttributeValue[f].ValueId == r ? s.SkuItems[a].AttributeValue[f].UseAttributeImage = "selected" : s.SkuItems[a].AttributeValue[f].UseAttributeImage = "False";
    var g = null;
    this.data.CurrentProduct.Skus.forEach(function (t, a, r) {
      for (var o = !0, n = 0; n < u.length; n++) void 0 != u[n] && -1 != t.SkuId.indexOf("_" + u[n].ValueId) || (o = !1);
      if (o && c.length == u.length) return g = t, d = t.SkuId, void(e.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
    }), this.setData({
      selectedskuList: u,
      selectedSku: d,
      selectedSkuContent: i,
      SkuItemList: c,
      CurrentProduct: s,
      CurrentSku: g
    });
  },
  addToCart: function (t, a, r) {
    var o = this;
    !a || a.lenght < 1 ? wx.showModal({
      title: "提示",
      content: "请选择规格",
      showCancel: !1
    }) : e.getOpenId(function (n) {
      wx.request({
        url: e.getUrl("addToCart"),
        data: {
          openId: n,
          SkuID: a,
          Quantity: r
        },
        success: function (e) {
          "OK" == e.data.Status ? (o.setProductCartQuantity(t, r, "+"), o.setSkuCartQuantity(a, r, "+")) : "NOUser" == e.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: e.data.ErrorResponse.ErrorMsg,
            showCancel: !1,
            success: function (t) {}
          });
        },
        complete: function () {
          var t = parseInt(o.data.TotalNum);
          o.setData({
            TotalNum: t + parseInt(r)
          });
        }
      });
    });
  },
  hideSkuDOM: function () {
    this.setData({
      isShowSkuSelectBox: !1
    });
  },
  showSkuDOM: function () {
    this.setData({
      isShowSkuSelectBox: !0
    });
  },
  bindCountDownTap: function (t) {
    var e = t.currentTarget.dataset.countdownid;
    wx.navigateTo({
      url: "../countdowndetail/countdowndetail?id=" + e
    });
  },
  bindGoodsTap: function (t) {
    var e = t.currentTarget.dataset.productid,
      a = t.currentTarget.dataset.activeid,
      r = "../productdetail/productdetail?id=" + e;
    1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + a),
      wx.navigateTo({
        url: r
      });
  },
  onReachBottom: function () {
    var t = this;
    if (1 == t.data.refreshSuccess) {
      var e = t.data.pageIndex;

    }
  },
  showonlineserver: function (t) {
    wx.navigateTo({
      url: '/components/OnlineServiceNew/OnlineServiceNew?username=在线客服',
    })
  },

  hideonlineserver: function () {
    this.selectComponent("#onlineserver").hideFrame();
  }

});