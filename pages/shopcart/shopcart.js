var t = getApp();
var app = t;
Page({
  data: {
    ShopCarts: null,
    bottom: 0,
    isEdite: !1,
    isEdite2: !1,
    isEdite3: !1,
    TotalPrice: 0,
    TotalWeight: 0,
    TotalQuantity: 0,
    TotalPrice2: 0,
    TotalWeight2: 0,
    TotalQuantity2: 0,
    TotalPrice3: 0,
    TotalWeight3: 0,
    TotalQuantity3: 0,
    EditeText: "编辑",
    EditeText2: "编辑",
    EditeText3: "编辑",
    selectAllStatus: !1,
    SelectskuId: [],
    SettlementText: "立即询价",
    selectAllStatus2: !1,
    SelectskuId2: [],
    SettlementText2: "立即询价",
    selectAllStatus3: !1,
    SelectskuId3: [],
    SettlementText3: "立即询价",
    isEmpty: !0,
    isEmpty2: !0,
    isEmpty3: !0,
    DefaultColor: "",
    currentTab: 0,
    navScrollLeft: 0,
    StockProducts: [],
    CustomProducts: [],
    CustomRings: [],
    windowHeight: 0,
  },
  onLoad: function (l) {
    var that = this;
    this.setData({
      DefaultColor: t.globalData.siteInfo.DefaultColor
    });
    this.initTab();
  },
  loadData: function (e) {
    wx.showLoading({
      title: "正在加载"
    });
    var a = parseFloat(0);
    t.getUserInfo(function (n) {
      wx.request({
        url: t.getUrl("getShoppingCartList"),
        data: {
          openId: t.globalData.openId
        },
        success: function (t) {
          if ("OK" == t.data.Status) {
            var n = t.data.Data,
              s = t.data.Data.SplitCarts[0].SplitList;
            var customList = t.data.Data.SplitCarts[1].SplitList;
            var customProductList = t.data.Data.SplitCarts[2].SplitList;
            // n.CartItemInfo.forEach(function(t, n, s) {
            //   e.data.SelectskuId.indexOf(t.SkuID) >= 0 && (t.selected = !0, a = parseFloat(a) + parseFloat(t.SubTotal));
            // });
            var splitCarts = [];
            if (s.length > 0) {
              splitCarts.push({
                SplitLine: n.SplitCarts[0].SplitLine,
                SplitItem: n.SplitCarts[0].SplitItem
              })
            }
            if (customProductList.length > 0)
              splitCarts.push({
                SplitLine: n.SplitCarts[2].SplitLine,
                SplitItem: n.SplitCarts[2].SplitItem
              })
            if (customList.length > 0)
              splitCarts.push({
                SplitLine: n.SplitCarts[1].SplitLine,
                SplitItem: n.SplitCarts[1].SplitItem
              })

            var o = null == s || s.length <= 0;
            var isEmpty2 = null == customList || customList.length <= 0;
            var currentTab = isEmpty2 ? 0 : e.data.currentTab;
            e.setData({
              isEmpty: o,
              isEmpty2: isEmpty2,
              ShopCarts: n,
              SplitCarts: splitCarts,
              TotalPrice: a.toFixed(2),
              currentTab: currentTab,
              StockProducts: s,
              CustomProducts: customProductList,
              CustomRings: customList
            });
          } else if ("NOUser" == t.data.Message) {
            wx.navigateTo({
              url: "../login/login"
            })
          };
        },
        complete: function () {
          e.setCartHeight();
          wx.hideLoading();
        }
      });
    }, "../shopcart/shopcart");
  },
  catchTouchMove: function (res) {
    return false
  },
  getSupplierCarts: function (t) {
    var e = this.data.StockProducts,
      a = null;
    return e.forEach(function (n, s, o) {
      n.SplitKey == t && (a = e[s], a.index = s);
    }), a;
  },
  getSupplierCarts3: function (t) {
    var e = this.data.CustomProducts,
      a = null;
    return e.forEach(function (n, s, o) {
      n.SplitKey == t && (a = e[s], a.index = s);
    }), a;
  },
  selectList: function (t) {
    var e = this,
      a = t.currentTarget.dataset.skuid,
      n = e.data.StockProducts,
      s = e.data.SelectskuId,
      o = !1,
      count = 0;
    n.forEach(function (t, e, s) {
      count = count + t.CartItemInfo.length;
      t.selected = true;
      t.CartItemInfo.forEach(function (t2, e, n) {
        if (t2.SkuID == a)
          o = !t2.selected, t2.selected = o, t.seleted = o;
        if (t.selected && !t2.selected)
          t.selected = false;
      });
    });
    var i = s.indexOf(a);
    o && i < 0 ? s.push(a) : s.splice(i, 1);
    var l = e.data.selectAllStatus;
    s.length <= 0 && (l = !1);
    s.length == count && (l = true);
    e.setData({
      StockProducts: n,
      SelectskuId: s,
      selectAllStatus: l
    }), e.GetTotal();
  },
  selectSplit: function (t) {
    var that = this;
    var splitkey = t.currentTarget.dataset.splitkey;
    var selectSkuId = that.data.SelectskuId;
    var t = this,
      count = 0,
      s = t.data.StockProducts;
    var isSelected = 0;
    var cartItems = s.find(f => f.SplitKey == splitkey);
    cartItems.selected = !cartItems.selected;
    cartItems.CartItemInfo.forEach(function (v, i, a) {
      v.selected = cartItems.selected;
      var i = selectSkuId.indexOf(v.SkuID);
      v.selected && i < 0 ? selectSkuId.push(v.SkuID) : selectSkuId.splice(i, 1);
    });
    s.forEach(function (v) {
      count += v.CartItemInfo.length
    });
    t.setData({
      StockProducts: s,
      SelectskuId: selectSkuId,
      selectAllStatus: count == selectSkuId.length
    }), t.GetTotal();
  },
  selectAll: function () {
    var t = this,
      e = [],
      a = !t.data.selectAllStatus,
      n = t.data.ShopCarts,
      s = t.data.StockProducts;
    s.forEach(function (t, o, i) {
      s[o].selected = a;
      (n = s[o]).CartItemInfo.forEach(function (t, n, s) {
        t.IsValid && t.HasEnoughStock && (t.selected = a, a && e.push(t.SkuID));
      });
    }), t.setData({
      StockProducts: s,
      selectAllStatus: a,
      SelectskuId: e
    }), t.GetTotal();
  },
  selectList2: function (t) {
    var that = this;
    var bindcode = t.currentTarget.dataset.bindcode;
    var t = this,
      e = [],
      count = 0,
      n = t.data.ShopCarts2,
      s = t.data.CustomRings;
    s.forEach(function (t, o, i) {
      count += t.CartItemInfo.length
      if (t.SplitKey == bindcode) {
        t.selected = !t.selected;
      }
      t.CartItemInfo.forEach(function (t2, n, s) {
        if (t.selected)
          e.push(t2.SkuID);
      });
    }), t.setData({
      CustomRings: s,
      SelectskuId2: e,
      selectAllStatus2: count == e.length
    }), t.GetTotal2();
  },
  selectAll2: function () {
    var t = this,
      e = [],
      a = !t.data.selectAllStatus2,
      s = t.data.CustomRings;
    s.forEach(function (t, o, i) {
      s[o].CartItemInfo.forEach(function (t, n, s) {
        t.IsValid && t.HasEnoughStock && e.push(t.SkuID);
      });
      t.selected = a
    });
    t.setData({
      CustomRings: s,
      selectAllStatus2: a,
      SelectskuId2: e
    });
    t.GetTotal2();
  },
  selectList3: function (t) {
    var e = this,
      a = t.currentTarget.dataset.skuid,
      n = e.data.CustomProducts,
      s = e.data.SelectskuId3,
      o = !1,
      count = 0
    n.forEach(function (t, e, s) {
      count = count + t.CartItemInfo.length;
      t.selected = true;
      t.CartItemInfo.forEach(function (t2, e, n) {
        if (t2.SkuID == a)
          o = !t2.selected, t2.selected = o, t.seleted = o;
        if (t.selected && !t2.selected)
          t.selected = false;
      });
    });
    var i = s.indexOf(a);
    o && i < 0 ? s.push(a) : s.splice(i, 1);
    var l = e.data.selectAllStatus;
    s.length <= 0 && (l = !1);
    s.length == count && (l = true);
    e.setData({
      CustomProducts: n,
      SelectskuId3: s,
      selectAllStatus3: l
    }), e.GetTotal3();
  },
  selectSplit3: function (t) {
    var that = this;
    var splitkey = t.currentTarget.dataset.splitkey;
    var selectSkuId = that.data.SelectskuId3;
    var t = this,
      count = 0,
      s = t.data.CustomProducts;
    var isSelected = 0;
    var cartItems = s.find(f => f.SplitKey == splitkey);
    cartItems.selected = !cartItems.selected;
    cartItems.CartItemInfo.forEach(function (v, i, a) {
      v.selected = cartItems.selected;
      var i = selectSkuId.indexOf(v.SkuID);
      v.selected && i < 0 ? selectSkuId.push(v.SkuID) : selectSkuId.splice(i, 1);
    });
    s.forEach(function (v) {
      count += v.CartItemInfo.length
    });
    t.setData({
      CustomProducts: s,
      SelectskuId3: selectSkuId,
      selectAllStatus3: count == selectSkuId.length
    }), t.GetTotal3();
  },
  selectAll3: function () {
    var t = this,
      e = [],
      a = !t.data.selectAllStatus3,
      s = t.data.CustomProducts;
    s.forEach(function (t, o, i) {
      s[o].selected = a;
      s[o].CartItemInfo.forEach(function (t, n, s) {
        t.IsValid && t.HasEnoughStock && (t.selected = a, a && e.push(t.SkuID));
      });
    }), t.setData({
      CustomProducts: s,
      selectAllStatus3: a,
      SelectskuId3: e
    }), t.GetTotal3();
  },
  GetTotal: function () {
    var t = parseFloat(0),
      totalWeight = parseFloat(0),
      totalQuantity = parseInt(0),
      e = this,
      a = e.data.ShopCarts,
      n = e.data.StockProducts;
    n.forEach(function (e, s, o) {
      (a = n[s]).CartItemInfo.forEach(function (e, a, n) {
        if (e.selected) {
          t = parseFloat(e.SubTotal) + parseFloat(t);
          totalWeight = parseFloat(e.Weight) * parseFloat(e.ShippQuantity) + parseFloat(totalWeight);
          totalQuantity = parseInt(e.ShippQuantity) + parseInt(totalQuantity);
        }
      });
    }), e.setData({
      TotalPrice: t.toFixed(2),
      TotalWeight: totalWeight.toFixed(2),
      TotalQuantity: totalQuantity
    });
  },
  GetTotal2: function () {
    var t = parseFloat(0),
      totalWeight = parseFloat(0),
      totalQuantity = parseInt(0),
      customRings = this.data.CustomRings,
      that = this;
    customRings.forEach(function (e, s, o) {
      if (e.selected) {
        e.CartItemInfo.forEach(function (e, a, n) {
          t = parseFloat(e.SubTotal) + parseFloat(t);
          totalWeight = parseFloat(e.Weight) * parseFloat(e.ShippQuantity) + parseFloat(totalWeight);
          totalQuantity = parseInt(e.ShippQuantity) + parseInt(totalQuantity);
        });
      }
    }), that.setData({
      TotalPrice2: t.toFixed(2),
      TotalWeight2: totalWeight.toFixed(2),
      TotalQuantity2: totalQuantity
    });
  },
  GetTotal3: function () {
    var t = parseFloat(0),
      totalWeight = parseFloat(0),
      totalQuantity = parseInt(0),
      e = this,
      a = e.data.ShopCarts,
      n = e.data.CustomProducts;
    n.forEach(function (e, s, o) {
      (a = n[s]).CartItemInfo.forEach(function (e, a, n) {
        if (e.selected) {
          t = parseFloat(e.SubTotal) + parseFloat(t);
          totalWeight = parseFloat(e.Weight) * parseFloat(e.ShippQuantity) + parseFloat(totalWeight);
          totalQuantity = parseInt(e.ShippQuantity) + parseInt(totalQuantity);
        }
      });
    }), e.setData({
      TotalPrice3: t.toFixed(2),
      TotalWeight3: totalWeight.toFixed(2),
      TotalQuantity3: totalQuantity
    });
  },
  SwitchEdite: function () {
    var t = this;
    "编辑" == t.data.EditeText ? t.setData({
      isEdite: !0,
      EditeText: "完成",
      SettlementText: "删除",
      DelskuId: ""
    }) : (t.setData({
      isEdite: !1,
      EditeText: "编辑",
      DelskuId: "",
      SettlementText: "立即询价",
      selectAllStatus: !0
    }), t.selectAll());
  },
  SwitchEdite2: function () {
    var t = this;
    "编辑" == t.data.EditeText2 ? t.setData({
      isEdite2: !0,
      EditeText2: "完成",
      SettlementText2: "删除",
      DelskuId2: ""
    }) : (t.setData({
      isEdite2: !1,
      EditeText2: "编辑",
      DelskuId2: "",
      SettlementText2: "立即询价",
    }), t.selectAll());
  },
  SwitchEdite3: function () {
    var t = this;
    "编辑" == t.data.EditeText3 ? t.setData({
      isEdite3: !0,
      EditeText3: "完成",
      SettlementText3: "删除",
      DelskuId3: ""
    }) : (t.setData({
      isEdite3: !1,
      EditeText3: "编辑",
      DelskuId3: "",
      SettlementText3: "立即询价",
      selectAllStatus3: !0
    }), t.selectAll3());
  },
  MuseNum: function (t) {
    var e = this,
      a = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.supplierid,
      s = e.getSupplierCarts(n),
      o = parseInt(s.CartItemInfo[a].Quantity);
    e.ChangeQuantiy(e, -1, s.CartItemInfo[a].SkuID, s.CartItemInfo[a].ProductRemark, function () {
      if (o - 1 > 0) {
        e.setData({
          ['StockProducts[' + s.index + '].CartItemInfo[' + a + '].Quantity']: o - 1
        })
      } else {
        var StockProducts = e.data.StockProducts;
        StockProducts[s.index].CartItemInfo.splice(a, 1);
        e.setData({
          StockProducts: StockProducts
        })
      }
    });
  },
  AddNum: function (t) {
    var e = this,
      a = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.supplierid,
      s = e.getSupplierCarts(n),
      o = parseInt(s.CartItemInfo[a].Quantity);
    s.CartItemInfo[a].Stock - o <= 0 ? wx.showModal({
      title: "提示",
      content: "超出库存",
      showCancel: !1
    }) : e.ChangeQuantiy(e, 1, s.CartItemInfo[a].SkuID, s.CartItemInfo[a].ProductRemark, function () {
      e.setData({
        ['StockProducts[' + s.index + '].CartItemInfo[' + a + '].Quantity']: o + 1
      })
    });
  },
  bindblurNum: function (t) {
    var e = this,
      a = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.supplierid,
      s = e.getSupplierCarts(n),
      o = parseInt(t.detail.value),
      i = s.CartItemInfo[a].Quantity,
      l = s.CartItemInfo[a].Stock;
    (isNaN(o) || o < 1) && (o = 1), o != i && (l - o <= 0 ? wx.showModal({
      title: "提示",
      content: "超出库存",
      showCancel: !1
    }) : e.ChangeQuantiy(e, o - i, s.CartItemInfo[a].SkuID, s.CartItemInfo[a].ProductRemark, function () {
      if (o <= 1) {
        var products = e.data.StockProducts;
        products[s.index].CartItemInfo.splice(a, 1);
        if (products[s.index].CartItemInfo.length == 0)
          products.splice(s.index, 1);
        e.setData({
          StockProducts: products
        })
      } else
        e.setData({
          ['StockProducts[' + s.index + '].CartItemInfo[' + a + '].Quantity']: o
        })
    }, s, a, i));
  },
  MuseNum3: function (t) {
    var e = this,
      a = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.supplierid,
      s = e.getSupplierCarts3(n),
      o = parseInt(s.CartItemInfo[a].Quantity);
    e.ChangeQuantiy(e, -1, s.CartItemInfo[a].SkuID, s.CartItemInfo[a].ProductRemark, function () {
      if (o <= 1) {
        var customproducts = e.data.CustomProducts;
        customproducts[s.index].CartItemInfo.splice(a, 1);
        if (customproducts[s.index].CartItemInfo.length == 0)
          customproducts.splice(s.index, 1);
        e.setData({
          CustomProducts: customproducts
        })
      } else {
        e.setData({
          ['CustomProducts[' + s.index + '].CartItemInfo[' + a + '].Quantity']: o - 1
        })
      }
    });
  },
  AddNum3: function (t) {
    var e = this,
      a = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.supplierid,
      s = e.getSupplierCarts3(n),
      o = parseInt(s.CartItemInfo[a].Quantity);
    s.CartItemInfo[a].Stock - o <= 0 ? wx.showModal({
      title: "提示",
      content: "超出库存",
      showCancel: !1
    }) : e.ChangeQuantiy(e, 1, s.CartItemInfo[a].SkuID, s.CartItemInfo[a].ProductRemark, function () {
      e.setData({
        ['CustomProducts[' + s.index + '].CartItemInfo[' + a + '].Quantity']: o + 1
      })
    });
  },
  bindblurNum3: function (t) {
    var e = this,
      a = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.supplierid,
      s = e.getSupplierCarts3(n),
      o = parseInt(t.detail.value),
      i = s.CartItemInfo[a].Quantity,
      l = s.CartItemInfo[a].Stock;
    (isNaN(o) || o < 1) && (o = 1), o != i && (l - o <= 0 ? wx.showModal({
      title: "提示",
      content: "超出库存",
      showCancel: !1
    }) : e.ChangeQuantiy(e, o - i, s.CartItemInfo[a].SkuID, s.CartItemInfo[a].ProductRemark, function () {
      e.setData({
        ['CustomProducts[' + s.index + '].CartItemInfo[' + a + '].Quantity']: o
      })
    }));
  },
  DelCarts: function (e) {
    var a = this,
      n = e.currentTarget.dataset.skuid,
      s = a.data.SelectskuId;
    "" != n && t.getOpenId(function (e) {
      wx.request({
        url: t.getUrl("delCartItem"),
        data: {
          openId: e,
          SkuIds: n
        },
        success: function (t) {
          if ("OK" == t.data.Status) {
            var e = s.indexOf(n);
            e >= 0 && s.splice(e, 1), a.setData({
              SelectskuId: s
            });
          } else "NOUser" == t.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: t.data.ErrorResponse.ErrorMsg,
            showCancel: !1,
            success: function (t) {}
          });
        },
        complete: function () {
          a.loadData(a);
        }
      });
    });
  },
  SettlementShopCart: function () {
    var e = this,
      a = e.data.SelectskuId.join(","),
      url = 'http://1086.daogoujingling.com/vshop/Topics.aspx?TopicId=3600';
    url = encodeURIComponent(url);
    e.data.ShopCarts, e.data.SelectskuId;
    if (e.data.isEdite) {
      if (a <= 0) return void wx.showModal({
        title: "提示",
        content: "请选择要删除的商品",
        showCancel: !1
      });
      t.getOpenId(function (n) {
        wx.request({
          url: t.getUrl("delCartItem"),
          data: {
            openId: n,
            SkuIds: a
          },
          success: function (t) {
            "OK" == t.data.Status ? e.setData({
              SelectskuId: [],
              selectAllStatus: !1
            }) : "NOUser" == t.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : wx.showModal({
              title: "提示",
              content: t.data.ErrorResponse.ErrorMsg,
              showCancel: !1,
              success: function (t) {}
            });
          },
          complete: function () {
            e.loadData(e);
          }
        });
      });
    } else {
      if (a <= 0) return void wx.showModal({
        title: "提示",
        content: "请选择要询价的商品",
        showCancel: !1
      });
      t.getOpenId(function (n) {
        wx.request({
          url: t.getUrl("CanSubmitOrder"),
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          data: {
            openId: n,
            skus: a
          },
          success: function (t) {
            "OK" == t.data.Status ? setTimeout(function () {
              wx.redirectTo({
                url: '/pages/diypage/index?url=' + url
              })
            }, 2000) : "NOUser" == t.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : (
              wx.showModal({
                title: "提示",
                content: t.data.Message,
                showCancel: !1,
                success(res) {
                  e.setData({
                    SelectskuId: [],
                    selectAllStatus: !1
                  })
                  e.loadData(e)
                }
              }));
          }
        });
      });
    }
  },
  SettlementShopCart2: function () {
    var e = this,
      a = e.data.SelectskuId2.join(",");
    if (e.data.isEdite2) {
      if (a <= 0) return void wx.showModal({
        title: "提示",
        content: "请选择要删除的商品",
        showCancel: !1
      });
      t.getOpenId(function (n) {
        wx.request({
          url: t.getUrl("delCartItem"),
          data: {
            openId: n,
            SkuIds: a
          },
          success: function (t) {
            if ("OK" == t.data.Status) {
              e.setData({
                SelectskuId2: [],
                selectAllStatus2: !1
              });
            } else if ("NOUser" == t.data.Message) {
              wx.navigateTo({
                url: "../login/login"
              })
            } else {
              wx.showModal({
                title: "提示",
                content: t.data.ErrorResponse.ErrorMsg,
                showCancel: !1,
                success: function (t) {}
              })
            };
          },
          complete: function () {
            e.loadData(e);
          }
        });
      });
    } else {
      if (a <= 0) return void wx.showModal({
        title: "提示",
        content: "请选择要询价的商品",
        showCancel: !1
      });
      t.getOpenId(function (n) {
        wx.request({
          url: t.getUrl("CanSubmitOrder"),
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          data: {
            openId: n,
            skus: a
          },
          success: function (t) {
            "OK" == t.data.Status ? wx.navigateTo({
              url: "../submitorder/submitorder?productsku=" + a
            }) : "NOUser" == t.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : (e.setData({
              SelectskuId2: [],
              selectAllStatus2: !1
            }), e.loadData(e));
          }
        });
      });
    }
  },
  SettlementShopCart3: function () {
    var e = this,
      a = e.data.SelectskuId3.join(",");
    if (e.data.isEdite3) {
      if (a <= 0) return void wx.showModal({
        title: "提示",
        content: "请选择要删除的商品",
        showCancel: !1
      });
      t.getOpenId(function (n) {
        wx.request({
          url: t.getUrl("delCartItem"),
          data: {
            openId: n,
            SkuIds: a
          },
          success: function (t) {
            if ("OK" == t.data.Status) {
              e.setData({
                SelectskuId3: [],
                selectAllStatus3: !1
              });
            } else if ("NOUser" == t.data.Message) {
              wx.navigateTo({
                url: "../login/login"
              })
            } else {
              wx.showModal({
                title: "提示",
                content: t.data.ErrorResponse.ErrorMsg,
                showCancel: !1,
                success: function (t) {}
              })
            };
          },
          complete: function () {
            e.loadData(e);
          }
        });
      });
    } else {
      if (a <= 0) return void wx.showModal({
        title: "提示",
        content: "请选择要询价的商品",
        showCancel: !1
      });
      t.getOpenId(function (n) {
        wx.request({
          url: t.getUrl("CanSubmitOrder"),
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          data: {
            openId: n,
            skus: a
          },
          success: function (t) {
            "OK" == t.data.Status ? wx.navigateTo({
              url: "../submitorder/submitorder?productsku=" + a
            }) : "NOUser" == t.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : (e.setData({
              SelectskuId2: [],
              selectAllStatus2: !1
            }), e.loadData(e));
          }
        });
      });
    }
  },
  ChangeQuantiy: function (e, a, n, remark, callback, item, index, quantity) {
    var that = this;
    wx.showLoading();
    t.getOpenId(function (s) {
      wx.request({
        url: t.getUrl("addToCart"),
        data: {
          openId: s,
          SkuID: n,
          Quantity: a,
          remark: remark
        },
        success: function (t) {
          wx.hideLoading();
          if ("OK" == t.data.Status) {
            if (callback) callback();
          } else if ("NOUser" == t.data.Message) {
            wx.navigateTo({
              url: "../login/login"
            })
          } else {
            wx.showModal({
              title: "提示",
              content: t.data.ErrorResponse.ErrorMsg,
              showCancel: !1,
              success: function (t) {
                if (item != undefined) {
                  e.setData({
                    ['StockProducts[' + item.index + '].CartItemInfo[' + index + '].Quantity']: quantity
                  })
                }

              }
            });

          }
        },
        complete: function () {}
      });
    });
  },
  goToProductDetail: function (t) {
    var e = this,
      a = t.currentTarget.dataset.productid;
    e.data.isEdite || wx.navigateTo({
      url: "../productdetail/productdetail?id=" + a
    });
  },
  onReady: function () {},
  onShow: function () {
    this.selectComponent("#liveWindow").initPlay();
    var that = this;
    this.setData({
      ShopCarts: null,
      isEdite: !1,
      TotalPrice: 0,
      EditeText: "编辑",
      selectAllStatus: !1,
      SelectskuId: [],
      SettlementText: "立即询价",
      isEmpty: !0,

      isEdite2: !1,
      TotalPrice2: 0,
      EditeText2: "编辑",
      selectAllStatus2: !1,
      SelectskuId2: [],
      SettlementText2: "立即询价",
      isEmpty2: !0
    }), this.loadData(this);

    this.initTab();

  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var that = this;
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  setTab(i) {
    var that = this;
    var cur = i;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  initTab() {
    //添加选中效果
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var bar = this.getTabBar();
      var index = 0;
      for (var i = 0; i < bar.data.foot.length; i++) {
        if (bar.data.foot[i].url == '/pages/shopcart/shopcart') {
          index = i;
          break;
        }
      }
      bar.setData({
        selected: index,
        showTab: true
      })
    }
  },
  setCartHeight: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        var screenHeight = res.screenHeight
        var bottom = res.safeArea.bottom
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        that.setData({
          windowHeight: height - 330,
          bottom: 120 + screenHeight - bottom
        });
      }
    });
  },
  bindRemark: function (e) {
    var that = this;
    var value = e.detail.value;
    var skuid = e.currentTarget.dataset.skuid;
    app.getOpenId(function (openid) {
      wx.request({
        url: app.getUrl('UpdateCartRemark'),
        data: {
          openId: openid,
          skuId: skuid,
          remark: value
        },
        success: function (res) {
          if (res.data.code != 0) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '更新失败'
            })
            value = '';
          }

          var sku = null;
          var StockProducts = that.data.StockProducts;
          StockProducts.forEach(function (f) {
            if (sku != null)
              return;
            f.CartItemInfo.forEach((function (s) {
              if (sku == null && skuid == s.SkuID)
                sku = s
            }));
          });
          if (sku != null) {
            sku.ProductRemark = value;
            that.setData({
              StockProducts: StockProducts
            })
          } else {
            var CustomProducts = that.data.CustomProducts;
            CustomProducts.forEach(function (f) {
              if (sku != null)
                return;
              f.CartItemInfo.forEach((function (s) {
                if (sku == null && skuid == s.SkuID)
                  sku = s
              }));
            });
            sku = that.findCustomSku(skuid);
            sku.ProductRemark = value;
            that.setData({
              CustomProducts: CustomProducts
            })
          }
        }
      })
    });

  },
  findStockSku: function (skuid) {
    var that = this;
    var sku = null;

  },
  findCustomSku: function (skuid) {
    var that = this;

    var sku = null;
    that.data.CustomProducts.forEach(function (f) {
      if (sku != null)
        return;
      f.CartItemInfo.forEach((function (s) {
        if (sku == null && skuid == s.SkuID)
          sku = s
      }));
    });
  }
});