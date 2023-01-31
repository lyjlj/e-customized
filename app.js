function t(t, a, i) {
  if (Number.isNaN(t)) return 0;
  if (a.length <= 0) return parseFloat(t);
  for (var s = 0, d = a.length, l = t; s < d;) {
    var u;
    if (u = a[s], !Number.isNaN(u)) switch (i) {
      case "add":
        l = e(l, u);
        break;

      case "subtract":
        l = o(l, u);
        break;

      case "multiply":
        l = r(l, u);
        break;

      case "divide":
        l = n(l, u);
    }
    s++;
  }
  return l;
}

function e(t, e) {
  var o, r, n;
  try {
    o = t.toString().split(".")[1].length;
  } catch (t) {
    o = 0;
  }
  try {
    r = e.toString().split(".")[1].length;
  } catch (t) {
    r = 0;
  }
  return n = Math.pow(10, Math.max(o, r)), (t.toMul(n) + e.toMul(n)).toDiv(n).toFixed(n);
}

function o(t, e) {
  var o, r, n, a;
  try {
    o = t.toString().split(".")[1].length;
  } catch (t) {
    o = 0;
  }
  try {
    r = e.toString().split(".")[1].length;
  } catch (t) {
    r = 0;
  }
  return n = Math.pow(10, Math.max(o, r)), a = o >= r ? o : r, (t.toMul(n) - e.toMul(n)).toDiv(n).toFixed(a);
}

function r(t, e) {
  var o = 0,
    r = t.toString(),
    n = e.toString();
  try {
    o += r.split(".")[1].length;
  } catch (t) {}
  try {
    o += n.split(".")[1].length;
  } catch (t) {}
  return Number(r.replace(".", "")) * Number(n.replace(".", "")) / Math.pow(10, o);
}

function n(t, e) {
  var o, r, n = 0,
    a = 0;
  try {
    n = t.toString().split(".")[1].length;
  } catch (t) {}
  try {
    a = e.toString().split(".")[1].length;
  } catch (t) {}
  return o = Number(t.toString().replace(".", "")), r = Number(e.toString().replace(".", "")),
    o / r * Math.pow(10, a - n);
}
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  },
  Number.prototype.toFixed = function (t) {
    e = this + "";
    if (t || (t = 0), -1 == e.indexOf(".") && (e += "."), e += new Array(t + 1).join("0"),
      new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(e)) {
      var e = "0" + RegExp.$2,
        o = RegExp.$1,
        r = RegExp.$3.length;
      return r == t + 2 && (e = (r = e.match(/\d/g)).join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")),
        e = e.substr(1), (o + e).replace(/\.$/, "");
    }
    return this + "";
  }, String.prototype.toAdd = function () {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "add");
  }, Number.prototype.toAdd = function () {
    return t(this, arguments, "add");
  }, String.prototype.toSub = function () {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "subtract");
  }, Number.prototype.toSub = function () {
    return t(this, arguments, "subtract");
  }, String.prototype.toMul = function () {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "multiply");
  }, Number.prototype.toMul = function () {
    return t(this, arguments, "multiply");
  }, String.prototype.toDiv = function () {
    var e = parseFloat(this);
    return isNaN(e) && (e = 0), t(e, arguments, "divide");
  }, Number.prototype.toDiv = function () {
    return t(this, arguments, "divide");
  }, App({
    onLaunch: function (options) {
      var that = this;
      let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
      if (extConfig.customid)
        that.customId = extConfig.customid;
      if (options.query.ReferralUserId)
        that.setRefferUserId(options.query.ReferralUserId);
    },
    onShow: function (options) {
      if (options.query.q) {
        var str = decodeURIComponent(options.query.q);
        if (str.indexOf("miniprogram/order/") > 0) {
          var index = str.lastIndexOf("/");
          this.orderid = str.substring(index + 1, str.length);
        }
      }
    },
    getVisitInfo: function (id, t) {
      var e = this;
      var proName = 'GetNotifyInfo';
      if (id > 0) {
        proName = 'GetNotifyInfoByProduct';
      }
      e.globalData.VisitInfo = null;
      e.globalData.VisitInfo ? ("function" == typeof t && t(e.globalData.VisitInfo),
        wx.hideNavigationBarLoading()) : (wx.showNavigationBarLoading(),
        wx.request({
          url: e.getUrl("GetJsonDataFromProc"),
          data: {
            proName: proName,
            productid: id
          },
          success: function (o) {
            0 == o.data.code ? (e.globalData.VisitInfo = o.data.data, "function" == typeof t && t(e.globalData.VisitInfo)) : e.globalData.VisitInfo = null;
          },
          complete: function () {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
          }
        }));
    },
    getSiteInfo: function (t) {
      var e = this;
      e.globalData.siteInfo ? ("function" == typeof t && t(e.globalData.siteInfo),
        wx.hideNavigationBarLoading()) : (wx.showNavigationBarLoading(),
        e.getOpenId(function (o) {
          wx.request({
            url: e.getUrl("GetIndexData"),
            data: {
              openId: o
            },
            success: function (o) {
              "OK" == o.data.Status ? (e.globalData.siteInfo = o.data.Data.SiteInfo, "function" == typeof t && t(e.globalData.siteInfo)) : e.globalData.siteInfo = null;
              e.getSiteAll();
            },
            complete: function () {
              wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();

            }
          });
        }));
    },
    /*获取当前页带参数的url*/
    getCurrentUrl: function () {
      var pages = getCurrentPages() //获取加载的页面
      var currentPage = pages[pages.length - 1] //获取当前页面的对象
      var url = currentPage.route //当前页面url
      var options = currentPage.options //如果要获取url中所带的参数可以查看options
      //拼接url的参数
      var urlWithArgs = '/' + url + '?'
      for (var key in options) {
        var value = options[key];
        urlWithArgs += key + '=' + value + '&'
      }
      urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
      return urlWithArgs
    },
    getUserInfo: function (t, returnUrl) {

      var e = this;
      this.getSiteInfo(function () {
        returnUrl = encodeURIComponent(returnUrl);
        if (e.globalData.userInfo && e.globalData.userInfo.Grant == 'Granted' && (e.globalData.userInfo.CellPhone || !e.globalData.siteInfo.IsCheckPhone)) {
          ("function" == typeof t && t(e.globalData.userInfo),
            wx.hideNavigationBarLoading())
        } else {
          e.globalData.isReloadUser = "0", wx.showNavigationBarLoading();
          if (e.globalData.siteInfo.QuickLogin) {
            e.getOpenId(function (o) {
              wx.request({
                url: e.getUrl("LoginByOpenId"),
                data: {
                  openId: o,
                  unionid: e.globalData.unionid ? e.globalData.unionid : '',
                  ReferralUserId: e.getRefferUserId(),
                  qyopenid: e.globalData.qyUserInfo ? e.globalData.qyUserInfo.userid : ''
                },
                success: function (o) {
                  if ("OK" == o.data.Status) {
                    e.setRefferUserId("");
                    e.globalData.userInfo = o.data.Data;
                    if (e.globalData.userInfo && !e.globalData.userInfo.CellPhone && e.globalData.siteInfo.IsCheckPhone) {
                      wx.redirectTo({
                        url: "../login/login?NeedGrant=true&returnUrl=" + returnUrl
                      });
                    }
                    if (e.globalData.userInfo && e.globalData.userInfo.Grant != 'Granted') {
                      wx.redirectTo({
                        url: "../login/login?NeedGrant=true&returnUrl=" + returnUrl
                      });
                    }
                    "function" == typeof t && t(e.globalData.userInfo);
                  } else {
                    wx.redirectTo({
                      url: "../login/login?returnUrl=" + returnUrl
                    });
                  }
                },
                complete: function () {
                  wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                }
              });
            });
          } else {
            wx.redirectTo({
              url: "../login/login?returnUrl=" + returnUrl
            });
          }
        }
      })
    },
    setRefferUserId: function (t) {
      var e = this;
      if (t) {
        wx.request({
          url: e.getUrl('GetJewelleryStore'),
          data: {
            UserId: t
          },
          success(res) {
            if (res.data.code == 0) {
              e.globalData.JewelleryStore = res.data.data;
            }
          }
        })
        wx.setStorageSync("ReferralUserId", t);
      }
    },
    getRefferUserId: function (t) {
      return wx.getStorageSync("ReferralUserId");
    },

    bindStore: function (storeid) {
      var e = this;
      if (storeid && storeid > 0) {
        e.getOpenId(function (o) {
          wx.request({
            url: e.getUrl('BindUserStore'),
            data: {
              openId: o,
              StoreId: storeid,
              type: 1 //关注门店
            },
            success(res) {

            }
          })
        })

      }
    },
    ExitLoginout: function () {
      var e = this;
      e.globalData.userInfo = null;
      e.getOpenId(function (n) {
        wx.request({
          url: e.getUrl("logout"),
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
    getOpenId: function (t) {
      var e = this;
      //void 0 == undefined void:无类型，可以指向任何类型的数据
      "" != e.globalData.openId && void 0 != e.globalData.openId ? "function" == typeof t && t(e.globalData.openId) : wx.login({
        success: function (o) {
          o.code ? wx.request({
            url: e.getUrl("GetOpenId"),
            data: {
              js_code: o.code
            },
            success: function (o) {
              void 0 != o.data && void 0 != o.data.openid && (e.globalData.openId = o.data.openid, e.globalData.unionid = o.data.unionid, e.globalData.session_key = o.data.session_key,
                "function" == typeof t && t(e.globalData.openId));
            }
          }) : console.log("获取用户登录态失败！" + o.errMsg);
        }
      });
    },
    getWxUserInfo: function (t) {
      var e = this;
      e.globalData.wxUserInfo ? "function" == typeof t && t(e.globalData.wxUserInfo) : wx.login({
        success: function (o) {
          if (o.code) {
            var r = o.code;
            wx.getUserInfo({
              success: function (o) {
                wx.request({
                  url: e.getUrl("GetOpenId"),
                  data: {
                    appid: e.globalData.appId,
                    secret: e.globalData.secret,
                    js_code: r
                  },
                  success: function (r) {
                    if (void 0 != r.data && void 0 != r.data.openid) {
                      var n = {
                        openId: r.data.openid,
                        nikeName: o.userInfo.nickName,
                        unionId: "",
                        headImage: o.userInfo.avatarUrl,
                        encryptedData: o.encryptedData,
                        session_key: r.data.session_key,
                        iv: o.iv
                      };
                      e.globalData.wxUserInfo = n, "function" == typeof t && t(e.globalData.wxUserInfo);
                    }
                  }
                });
              }
            });
          } else console.log("获取用户登录态失败！" + o.errMsg);
        }
      });
    },
    setUserInfo: function (t) {
      this.globalData.userInfo = t;
    },
    setqyuserinfo: function (t) {
      this.globalData.qyUserInfo = t;
    },
    getqyuserinfo: function () {
      return this.globalData.qyUserInfo;
    },
    getSiteAll: function () {
      var that = this;
      var site = {};
      var sitedata = [];
      wx.request({
        url: 'https://www.daogoujingling.com/api/wechatapplet.ashx?action=GetJsonDataFromProc&proName=GetSiteSettings&CustomId=' + that.customId,
        success(r) {
          sitedata = r.data.data;
          sitedata.forEach(item => {
            site[item.key] = item.value
          })
          that.globalData.siteAll = site
        }
      })
    }, 
    getNewUserInfo: function (phone, f) {
      var that = this;
      wx.request({
        url: that.getUrl('GetUserInfo'),
        data: {
          phone: phone
        },
        success(r) {
          "function" == typeof f ? f(r.data) : '';
        }
      })

    },
    orderPay: function (t, e, o) {
      var r = this;
      var returnUrl = encodeURIComponent('pages/orderdetails/orderdetails?orderid=' + t);
      var orderid = t;
      r.getOpenId(function (n) {
        if (r.globalData.siteInfo.OpenUPPay) //是否开启易生支付
        {
          wx.request({
            url: r.getUrl("GetPayParam"),
            data: {
              openId: n,
              orderId: orderid
            },
            success: function (t) {
              if ("OK" == t.data.Status) {
                var r = t.data.Data;
                var path = 'pages/UnionPay/unionpay?&returnUrl=' + returnUrl + '&version=release&orderId=' + t.data.Data.orderId;
                wx.navigateToMiniProgram({
                  appId: 'wx76c7cfc59ef26c91', // 要跳转的小程序的appid
                  path: path, // 跳转的目标页面 
                  extarData: {},
                  envVersion: 'release',
                  success(res) {

                  },
                  fail() {
                    wx.redirectTo({
                      url: '/pages/orderdetails/orderdetails?orderid=' + orderid
                    })
                  }
                })

              } else wx.showModal({
                title: "提示",
                content: t.data.Message,
                showCancel: !1,
                success: function (t) {
                  o || t.confirm && wx.redirectTo({
                    url: "../orderlist/orderlist?status=" + e
                  });
                }
              });
            }
          });
        } else { //小程序原生支付
          wx.request({
            url: r.getUrl("GetPaymentRequest"),
            data: {
              openId: n,
              orderId: orderid
            },
            success(res) {
              if (res.data.code == 0) {
                wx.requestPayment({
                  timeStamp: res.data.data.timeStamp,
                  nonceStr: res.data.data.nonceStr,
                  package: res.data.data.package,
                  signType: 'MD5',
                  paySign: res.data.data.paySign,
                  success: function (t) {
                    if (t.errMsg == 'requestPayment:ok') {
                      wx.showModal({
                        title: "提示",
                        content: "支付成功！",
                        showCancel: !1,
                        success: function (t) {
                          t.confirm && wx.redirectTo({
                            url: "../orderlist/orderlist?status=" + e
                          });
                        }
                      });
                    } else {
                      wx.showModal({
                        title: "提示",
                        content: "支付失败！",
                        showCancel: !1,
                        success: function (t) {
                          o || t.confirm && wx.redirectTo({
                            url: "../orderlist/orderlist?status=" + e
                          });
                        }
                      });
                    }

                  },
                  fail: function (t) {
                    wx.showModal({
                      title: "提示",
                      content: "支付失败！",
                      showCancel: !1,
                      success: function (t) {
                        o || t.confirm && wx.redirectTo({
                          url: "../orderlist/orderlist?status=" + e
                        });
                      }
                    });
                  }
                });
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.data.msg,
                  showCancel: false,
                  success(res) {
                    wx.redirectTo({
                      url: "../orderlist/orderlist?status=" + e
                    })
                  }
                })
              }

            }
          })
        }
      });
    },
    getRequestUrl: "https://www.daogoujingling.com/",
    getUrl: function (t) {
      //return "http://localhost:8888/API/WeChatApplet.ashx?customId=" + this.customId + "&action=" + t;
      return "https://www.daogoujingling.com/API/WeChatApplet.ashx?customId=" + this.customId + "&action=" + t;
    },
    customId: 1086,
    globalData: {
      cid: 0,
      userInfo: null,
      siteInfo: null,
      unionid: null,
      ReferralInfo: null,
      ReferralSettingInfo: null,
      openId: "",
      qyUserInfo: null,
      session_key: "",
      wxUserInfo: null,
      JewelleryStore: null,
      isReloadUser: "0",
      DefaultColor: "",
      SecondColor: "",
      Logo: "",
      QQMapKey: "7UPBZ-XO7WU-5HBVI-BCTF7-5N2CS-5YFIB",
      loginByOpenId: "LoginByOpenId",
      loginByUserName: "LoginByUserName",
      quickLogin: "QuickLogin",
      getIndexData: "GetIndexData",
      GetIndexProductData: "GetIndexProductData",
      getProducts: "GetProducts",
      getProductDetail: "GetProductDetail",
      getCountDownProductDetail: "GetCountDownProductDetail",
      userGetCoupon: "UserGetCoupon",
      loadCoupon: "LoadCoupon",
      LoadSiteCoupon: "LoadSiteCoupon",
      getUserShippingAddress: "GetUserShippingAddress",
      addShippingAddress: "AddShippingAddress",
      updateShippingAddress: "UpdateShippingAddress",
      setDefaultShippingAddress: "SetDefaultShippingAddress",
      GetShippingAddressById: "GetShippingAddressById",
      delShippingAddress: "DelShippingAddress",
      AddWXChooseAddress: "AddWXChooseAddress",
      orderList: "OrderList",
      closeOrder: "CloseOrder",
      finishOrder: "FinishOrder",
      getLogistic: "GetLogistic",
      getPayParam: "GetPayParam",
      getShoppingCart: "GetShoppingCart",
      sumbitOrder: "SumbitOrder",
      getRegionsOfProvinceCity: "GetRegionsOfProvinceCity",
      getRegions: "GetRegions",
      GetRegionByLatLng: "GetRegionByLatLng",
      getAllCategories: "GetAllCategories",
      loadOrderProduct: "GetOrderProduct",
      loadReview: "LoadReview",
      loadCouponDetails: "GetCouponDetail",
      getAfterSalePreCheck: "AfterSalePreCheck",
      MsgCount: 0,
      VisitInfo: null,
    },
    /**
     * 设置监听器
     */
    setWatcher: function (page) {
      let data = page.data;
      let watch = page.watch;
      Object.keys(watch).forEach(v => {
        let key = v.split('.'); // 将watch中的属性以'.'切分成数组
        let nowData = data; // 将data赋值给nowData
        for (let i = 0; i < key.length - 1; i++) { // 遍历key数组的元素，除了最后一个！
          nowData = nowData[key[i]]; // 将nowData指向它的key属性对象
        }
        let lastKey = key[key.length - 1];
        // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
        let watchFun = watch[v].handler || watch[v]; // 兼容带handler和不带handler的两种写法
        let deep = watch[v].deep; // 若未设置deep,则为undefine
        this.observe(nowData, lastKey, watchFun, deep, page); // 监听nowData对象的lastKey
      })
    },
    /**
     * 监听属性 并执行监听函数
     */
    observe: function (obj, key, watchFun, deep, page) {
      var val = obj[key];
      // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
      if (deep && val != null && typeof val === 'object') {
        Object.keys(val).forEach(childKey => { // 遍历val对象下的每一个key
          this.observe(val, childKey, watchFun, deep, page); // 递归调用监听函数
        })
      }
      var that = this;
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set: function (value) {
          // 用page对象调用,改变函数内this指向,以便this.data访问data内的属性值
          watchFun.call(page, value, val); // value是新值，val是旧值
          val = value;
          if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。
            that.observe(obj, key, watchFun, deep, page);
          }
        },
        get: function () {
          return val;
        }
      })
    }
  }), Number.prototype.toFixed = function (t) {
    e = this + "";
    if (t || (t = 0), -1 == e.indexOf(".") && (e += "."), e += new Array(t + 1).join("0"),
      new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (t + 1) + "})?)\\d*$").test(e)) {
      var e = "0" + RegExp.$2,
        o = RegExp.$1,
        r = RegExp.$3.length;
      return r == t + 2 && (e = (r = e.match(/\d/g)).join("").replace(new RegExp("(\\d+)(\\d{" + t + "})\\d$"), "$1.$2")),
        e = e.substr(1), (o + e).replace(/\.$/, "");
    }
    return this + "";
  };