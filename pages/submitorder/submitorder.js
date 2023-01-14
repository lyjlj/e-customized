function e(e, t, a) {
  return t in e ? Object.defineProperty(e, t, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = a, e;
}

var t = require("../../utils/config.js"),
  a = getApp(),
  app=getApp(),
  i = null,
  n = new Array(),
  o = new Array(),
  s = new Array(),
  r = new Array(),
  d = 0,
  c = 0,
  u = 0,
  l = 0,
  p = [],
  h = [];

Page({
  data: {
    OrderInfo: null,
    ProductSku: "",
    currentPage: "page1",
    BuyAmount: 0,
    FromPage: "",
    CountdownId: "",
    ShipAddressId: "",
    ShippingAddressInfo: {},
    ProductInfo: null,
    ProductAmount: 0,
    OrderFreight: 0,
    DefaultCouponCode: "",
    DefaultCouponPrice: 0,
    CouponList: null,
    PickerArray: [],
    FullDiscount: 0,
    FullFreeFreight: !1,
    SelectedCouponIndex: 0,
    PointTotal:0,
    MaxUsePoint: 0,
    MaxPointDiscount: 0,
    MyPoints: 0,
    ShoppingDeduction: 0,
    CanPointUseWithCoupon: !1,
    PointDeductionRate: 0,
    DeductionPoints: 0,
    MaxShoppingDeductionPrice:1000,
    PointsDiscount: 0,
    Remark: "",
    couponShow: "none",
    backShow: "none",
    pointDiscountShow: !1,
    OrderTotalPrice: 0,
    getRequestUrl:a.getRequestUrl,
    icon_right: a.getRequestUrl + "/Templates/xcxshop/images/arrow_right.png",
    Suppliers: null,
    InvoiceCheck: a.getRequestUrl + "/Templates/xcxshop/images/checkbox.png",
    InvoiceChecked: a.getRequestUrl + "/Templates/xcxshop/images/checked.png",
    taxBg: a.getRequestUrl + "/Templates/xcxshop/images/tax-bg.png",
    ShippType: 3,
    NeedInvoice: "",
    InvoiceId: 0,
    InvoiceType: 0,
    IsOpenInvoice: !1,
    TaxRate: 0,
    InvoiceEnty: null,
    isEnable: !1,
    SupplierId: 0,
    FullRegionName: "请填写所在地区",
    provinceName: [],
    provinceCode: [],
    provinceSelIndex: "",
    cityName: [],
    cityCode: [],
    citySelIndex: "",
    districtName: [],
    districtCode: [],
    districtSelIndex: "",
    streetName: [],
    streetCode: [],
    streetSelIndex: "",
    showMessage: !1,
    messageContent: "",
    showDistpicker: !1,
    isCss: !0,
    DefaultColor: "",
    submitInfo: {},
    orderId: "",
    OrderFileds: {},
    pickMyself: false,
    Gifts:[],
    chooseStoreInfo:null
  },
  onLoad: function (e) {   
    var orderid = e.orderid;
    this.setData({
      DefaultColor: a.globalData.siteInfo.DefaultColor,
      orderid: orderid,
      IsShopToC:a.globalData.siteInfo.IsShopToC,
      IsOpenPickeupInStore:a.globalData.siteInfo.AllSiteInfo.IsOpenPickeupInStore,
      OnlyPickUpInStore:a.globalData.siteInfo.AllSiteInfo.OnlyPickUpInStore
      //pickMyself:a.globalData.siteInfo.AllSiteInfo.OnlyPickUpInStore
    });
    this.setAreaData(), this.setAreaData();
    var t = this;
    // i = e.productsku,
    // n = e.buyamount,
    // o = e.frompage,
    // s = e.countdownid,
    // r = e.shipaddressid;
    var submitInfo = e;

    t.setData({
      submitInfo: submitInfo,
      isOnLoad: 1
    });
    a.getOpenId(function (e) {
     
      wx.request({
        url: a.getUrl("GetShoppingCart"),
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: {
          openId: e,
          productSku: submitInfo.productsku,
          fromPage: submitInfo.frompage,
          countDownId: submitInfo.countdownid,
          buyAmount: submitInfo.buyamount,
          shipAddressId: submitInfo.shipaddressid,
          orderid: orderid
        },
        success: function (e) {
          if ("OK" == e.data.Status) {
            wx.hideLoading();
            for (var a = e.data.Data, d = [], c = 2, u = 0; u < a.CouponList.length; u++)
              d[u] = a.CouponList[u].CouponName + " " + a.CouponList[u].Price;
            for (var l = 0; l < a.Suppliers.length; l++)
              0 == a.Suppliers[l].SupplierId && (c = a.Suppliers[l].SupplierId);
            // var p = null;
            // null == (p = a.EnableTax ? t.FindInvoiceByType(0, a.InvoiceList) : a.EnableE_Invoice ? t.FindInvoiceByType(2, a.InvoiceList) : t.FindInvoiceByType(4, a.InvoiceList)) && (p = {
            //   BankAccount: "",
            //   Id: 0,
            //   InvoiceTaxpayerNumber: "",
            //   InvoiceTitle: "个人",
            //   InvoiceType: 0,
            //   OpenBank: ""
            // });
            var h = a.TaxRate;
            4 == p.InvoiceType && (h = a.VATTaxRate);
            var v = t.GetInvoiceTypeName(p.InvoiceType);
            t.LoadInvoice(a.InvoiceList), t.setData({
              OrderInfo: a,
              ProductSku: submitInfo.productsku,
              BuyAmount: submitInfo.buyamount,
              FromPage: submitInfo.frompage,
              CountdownId: submitInfo.countdownid,
              ShipAddressId: submitInfo.shipaddressid,
              ShippingAddressInfo: a.DefaultShippingAddress,
              ProductInfo: a.ProductItems,
              ProductAmount: a.ProductAmount,
              OrderFreight: a.OrderFreight,
              DefaultCouponCode: a.DefaultCouponCode,
              DefaultCouponPrice: parseFloat(a.DefaultCouponPrice),
              CouponList: a.CouponList,
              FullDiscount: a.FullDiscount,
              FullFreeFreight: a.FullFreeFreight,
              MaxUsePoint: a.MaxUsePoint,
              MaxPointDiscount: a.MaxPointDiscount,
              MaxShoppingDeductionPrice:a.MaxShoppingDeductionPrice,
              ShoppingDeduction: a.ShoppingDeduction,
              CanPointUseWithCoupon: a.CanPointUseWithCoupon,
              PointDeductionRate: a.PointDeductionRate,
              MyPoints: a.MyPoints,
              PickerArray: d,
              Suppliers: a.Suppliers,
              Gifts:a.Gifts,
              PointTotal:a.TotalNeedPoint,
              SupplierId: c,
              InvoiceId: p.Id,
              InvoiceEnty: p,
              InvoiceType: p.InvoiceType,
              InvoiceTypeName: v,
              InvoiceTitleName: p.InvoiceTitle,
              InvoiceRate: h,
              FullRegionPath: p.ReceiveRegionName,
              SubmitFileds: a.SubmitFileds,              
              chooseStoreInfo:submitInfo.storeinfo? JSON.parse(submitInfo.storeinfo):null,
              pickMyself:app.globalData.siteInfo.AllSiteInfo.OnlyPickUpInStore&&a.ProductItems.length==0?true: (submitInfo.pickMyself?submitInfo.pickMyself:false)
            }), t.CalcMaxUsePoints(), t.CalcOrderTotalPrice();
          } else "NOUser" == e.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: e.data.Message,
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        }
      });
    });
  },
  onShow: function () {
    var o = this.data.orderId;
    if (o) {
      wx.redirectTo({
        url: '../orderdetails/orderdetails?orderid=' + o
      });
    }
  },
  FindInvoiceByType: function (e, t) {
    for (var a = null, i = 0; i < t.length; i++) t[i].InvoiceType == e && null == a && (a = t[i]);
    return a;
  },
  GetInvoiceTypeName: function (e) {
    return 0 == e || 1 == e ? "普通发票" : 2 == e || 3 == e ? "电子发票" : "增值税发票";
  },
  LoadInvoice: function (e) {
    return;
    for (var t = "", a = "", i = 0; i < e.length; i++) 1 != e[i].InvoiceType && 3 != e[i].InvoiceType && 4 != e[i].InvoiceType || t.length <= 0 && (t = e[i].InvoiceTitle,
      a = e[i].InvoiceTaxpayerNumber);
    this.setData({
      InvoiceTitle: t,
      InvoiceTaxpayerNumber: a
    });
  },
  onReady: function () {},
  onHide: function () {},
  onUnload: function () {},
  gotoAddress: function () {
    wx.navigateTo({
      url: "../choiceaddress/choiceaddress?productsku=" + this.data.ProductSku + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&shipaddressid=" + this.data.ShipAddressId
    });
  },
  toPayProgram: function () {

  },
  addAddresstap: function () {
    var e = this;
    wx.showModal({
      title: "提示",
      content: "是否使用微信收货地址",
      cancelText: "否",
      confirmText: "是",
      success: function (i) {
        i.confirm ? wx.chooseAddress({
          success: function (i) {
            i && a.getOpenId(function (n) {
              var o = {
                openId: n,
                shipTo: i.userName,
                address: i.detailInfo,
                cellphone: i.telNumber,
                city: i.cityName,
                county: i.countyName
              };
              t.httpPost(a.getUrl(a.globalData.AddWXChooseAddress), o, function (i) {
                "OK" == i.Status ? t.httpPost(a.getUrl("GetShippingAddressById"), {
                  openId: n,
                  shippingId: i.Message
                }, function (t) {
                  e.setData({
                    ShippingAddressInfo: t.Data.ShippingAddressInfo
                  });
                }) : wx.showToast({
                  title: i.Message,
                  icon: "success"
                });
              });
            });
          }
        }) : i.cancel && e.gotoAddress();
      }
    });
  },
  clickCouponList: function (e) {
    var t = this;
    void 0 != t.data.CouponList && null != t.data.CouponList && t.data.CouponList.length > 0 ? this.setData({
      couponShow: "",
      backShow: ""
    }) : wx.showToast({
      title: "暂时没有可以领取的优惠券",
      icon: "loading"
    });
  },
  getCouponBaseId: function (e) {
    for (var t = this, a = 0; a < t.data.CouponList.length; a++)
      if (this.data.CouponList[a].CouponId == e) return a;
    return -1;
  },
  ChangeValue: function (e) {
    var t = e.currentTarget.dataset.key,
      a = e.detail.value,
      i = this.data.InvoiceEnty;
    i[t] = a, this.setData({
      InvoiceEnty: i
    });
  },
  SaveInvoice: function (e) {
    var t = this,
      i = t.data.OrderInfo,
      n = this.data.InvoiceType,
      o = this.data.InvoiceEnty;
    4 == n && (o.ReceiveRegionName = t.data.FullRegionPath, o.ReceiveRegionId = t.data.regionId);
    var s = JSON.stringify(o);
    t.CheckSaveInvoice(n, o) && a.getOpenId(function (e) {
      wx.request({
        url: a.getUrl("UpdateUserInvoice"),
        data: {
          openId: e,
          Data: s
        },
        success: function (e) {
          if ("OK" == e.data.Status) {
            var a = e.data.List;
            i.InvoiceList = a;
            var o = i.TaxRate;
            4 == n && (o = i.VATTaxRate);
            var s = t.GetInvoiceTypeName(n);
            t.setData({
              InvoiceTypeName: s,
              InvoiceTitleName: a[0].InvoiceTitle,
              InvoiceRate: o,
              InvoiceId: a[0].Id,
              InvoiceEnty: a[0],
              InvoiceType: a[0].InvoiceType,
              OrderInfo: i,
              currentPage: "page1"
            });
          } else "NOUser" == e.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: e.data.error_response.sub_msg,
            showCancel: !1,
            success: function (e) {}
          });
        },
        complete: function () {
          t.CalcOrderTotalPrice();
        }
      });
    });
  },
  CheckSaveInvoice: function (e, a) {
    if (1 == e || 3 == e || 4 == e) {
      if (!t.trim(a.InvoiceTitle)) return t.showTip("请输入单位名称"), !1;
      if (!a.InvoiceTaxpayerNumber || !t.trim(a.InvoiceTaxpayerNumber)) return t.showTip("请输入单位税号"), !1;
    }
    if (2 == e || 3 == e) {
      if (!t.trim(a.ReceivePhone)) return t.showTip("请输入收票人手机"), !1;
      if (!t.checkPhone(a.ReceivePhone)) return t.showTip("请输入正确的收票人手机格式"), !1;
      if (!t.trim(a.ReceiveEmail)) return t.showTip("请输入收票人邮箱"), !1;
      if (!t.checkEmail(a.ReceiveEmail)) return t.showTip("请输入正确的收票人邮箱格式"), !1;
    }
    if (4 == e) {
      if (!t.trim(a.RegisterAddress)) return t.showTip("请输入单位注册地址"), !1;
      if (!t.trim(a.RegisterTel)) return t.showTip("请输入单位注册电话"), !1;
      if (!t.trim(a.OpenBank)) return t.showTip("请输入开户银行"), !1;
      if (!t.trim(a.BankAccount)) return t.showTip("请输入银行账户"), !1;
      if (!t.trim(a.ReceiveName)) return t.showTip("请输入收票人姓名"), !1;
      if (!t.trim(a.ReceivePhone)) return t.showTip("请输入收票人手机"), !1;
      if (!t.trim(a.ReceiveRegionName)) return t.showTip("请输入收票人地区"), !1;
      if (!t.trim(a.ReceiveAddress)) return t.showTip("请输入详细地址"), !1;
    }
    return !0;
  },
  setCoupon: function (e) {
    var t = this,
      a = (e.currentTarget.id, e.currentTarget.dataset.num);
    if (a >= 0) {
      var i = t.data.CouponList[a];
      t.setData({
        DefaultCouponCode: i.ClaimCode,
        DefaultCouponPrice: parseFloat(i.Price),
        SelectedCouponIndex: a,
        couponShow: "none",
        backShow: "none"
      });
    }
    t.data.CanPointUseWithCoupon || t.setData({
      DeductionPoints: 0,
      PointsDiscount: 0,
      pointDiscountShow: !1,
      checboxswitch: !1
    }), t.CalcMaxUsePoints(), t.CalcOrderTotalPrice();
  },
  onCouponHide: function (e) {
    this.setData({
      backShow: "none",
      couponShow: "none"
    });
  },
  cancelCoupon: function (e) {
    var t = this;
    t.setData({
      DefaultCouponCode: "",
      DefaultCouponPrice: 0,
      SelectedCouponIndex: -1,
      couponShow: "none",
      backShow: "none"
    }), t.CalcMaxUsePoints(), t.CalcOrderTotalPrice();
  },
  ChangeInvoiceType: function (e) {
    var t = this.data.InvoiceType,
      a = e.currentTarget.dataset.name;
    this.ChangeInvoiceInfo(t, a);
  },
  ChangeInvoiceInfo: function (e, t) {
    var a = 1 == e || 3 == e || 4 == e,
      i = 0;
    "普通发票" == t ? (i = 0, a && (i = 1)) : "电子发票" == t ? (i = 2, a && (i = 3)) : i = "增值税发票" == t ? 4 : "个人" == t ? 1 == e ? 0 : 3 == e ? 2 : e : 0 == e ? 1 : 2 == e ? 3 : e;
    var n = this.FindInVoiceById(i);
    this.setData({
      InvoiceType: i,
      InvoiceEnty: n,
      InvoiceTitle: n.InvoiceTitle,
      FullRegionPath: n.ReceiveRegionName,
      InvoiceTaxpayerNumber: n.InvoiceTaxpayerNumber
    });
  },
  bindPickerChange: function (e) {
    var t = this,
      a = e.detail.value,
      i = t.data.CouponList[a];
    t.setData({
      DefaultCouponCode: i.ClaimCode,
      DefaultCouponPrice: parseFloat(i.Price),
      SelectedCouponIndex: a
    });
  },
  bindRemarkInput: function (e) {
    this.setData({
      Remark: e.detail.value
    });
  },
  bindFiledInput: function (e) {
    var that = this;
    var filed = e.currentTarget.dataset.filed;
    var items = e.currentTarget.dataset.items;
    var ischeckbox = e.currentTarget.dataset.checkbox;
    var value = e.detail.value;
    if (ischeckbox) {
      var checkitem = ''
      value.forEach(function (v) {
        checkitem += v + ','
      });
      value = checkitem.substring(0, checkitem.length - 1);
    }
    if (items)
      that.data.OrderFileds[filed] = items.split(',')[value];
    else
      that.data.OrderFileds[filed] = value;
    this.setData({
      OrderFileds: that.data.OrderFileds
    });
    //console.log(that.data.OrderFileds);
  },
  ChkUsePoint: function (e) {
    var t = this;
    e.detail.value ? (t.data.OrderInfo.CanPointUseWithCoupon || t.setData({
      DefaultCouponCode: "",
      DefaultCouponPrice: 0,
      SelectedCouponIndex: -1,
      couponShow: "none",
      backShow: "none",
      MaxUsePoint: t.data.OrderInfo.MaxUsePoint,
      MaxPointDiscount: t.data.OrderInfo.MaxPointDiscount.toFixed(2)
    }), t.setData({
      DeductionPoints: t.data.MaxUsePoint,
      PointsDiscount: parseFloat(t.data.MaxPointDiscount),
      pointDiscountShow: !0
    })) : t.setData({
      DeductionPoints: 0,
      PointsDiscount: 0,
      pointDiscountShow: !1
    }), t.CalcMaxUsePoints(), t.CalcOrderTotalPrice();
  },
  OpenUseInvoice: function (e) {
    var t = !this.data.IsOpenInvoice;
    this.setData({
      IsOpenInvoice: t
    }), this.CalcOrderTotalPrice();
  },
  ChooseInvoice: function (e) {
    var t = this,
      a = 0;
    "普通发票" == t.data.InvoiceTypeName ? a = "个人" == t.data.InvoiceTitleName ? 0 : 1 : "电子发票" == t.data.InvoiceTypeName ? a = "个人" == t.data.InvoiceTitleName ? 2 : 3 : "增值税发票" == t.data.InvoiceTypeName && (a = 4),
      this.ChangeInvoiceInfo(a, t.data.InvoiceTypeName), this.setData({
        currentPage: "page2"
      });
  },
  CancelInvoice: function () {
    this.setData({
      currentPage: "page1"
    });
  },
  FindInVoiceById: function (e, t) {
    for (var a = null, i = this, n = 0; n < i.data.OrderInfo.InvoiceList.length; n++)
      if (i.data.OrderInfo.InvoiceList[n].Id == t || i.data.OrderInfo.InvoiceList[n].InvoiceType == e) {
        a = i.data.OrderInfo.InvoiceList[n];
        break;
      }
    return null == a && (a = {
      Id: 0,
      InvoiceType: e,
      InvoiceTitle: 0 == e || 2 == e ? "个人" : "",
      InvoiceTaxpayerNumber: "",
      OpenBank: "",
      BankAccount: "",
      ReceiveAddress: "",
      ReceiveEmail: "",
      ReceiveName: "",
      ReceivePhone: "",
      ReceiveRegionId: 0,
      ReceiveRegionName: "",
      RegisterAddress: "",
      RegisterTel: ""
    }), a;
  },
  UsePointNumber: function (e) {
    var a = this,
      i = parseInt(e.detail.value);
      var maxPrice2Point=a.data.MaxShoppingDeductionPrice*a.data.ShoppingDeduction;
    if (isNaN(i)) t.showTip("格式不正确", "tips");
    else {
      i > a.data.MaxUsePoint && (i = a.data.MaxUsePoint);
      console.log(maxPrice2Point,a.data.MaxShoppingDeductionPrice,a.data.ShoppingDeduction);
      i>maxPrice2Point&&(i=maxPrice2Point);
      var n = i;
      n > a.data.MaxUsePoint && (n = a.data.MaxUsePoint), n > a.data.MyPoints && (n = a.data.MyPoints);
      var o = (n / a.data.ShoppingDeduction).toFixed(2);
      o = parseFloat(o), a.setData({
        DeductionPoints: n,
        PointsDiscount: o
      }), a.CalcMaxUsePoints(), a.CalcOrderTotalPrice();
    }
  },
  bindFullAddressTap: function (e) {
    d = 0, c = 0, u = 0, this.setAreaData(), this.setData({
      showDistpicker: !0
    });
  },
  CalcMaxUsePoints: function () {
    var e = this,
      t = e.data.ProductAmount - e.data.FullDiscount;
    "False" == e.data.OrderInfo.IsFreightFree && parseFloat(e.data.OrderInfo.OrderFreight),
      (t = t.toSub(e.data.DefaultCouponPrice)) < 0 && (t = 0);
    var a = parseInt(e.data.PointDeductionRate * (1e3 * t) * e.data.ShoppingDeduction / 100 / 1e3);
    a > e.data.MyPoints && (a = e.data.MyPoints);
    var maxPrice2Point=e.data.MaxShoppingDeductionPrice*e.data.ShoppingDeduction;
    a>maxPrice2Point?(a=maxPrice2Point):'';
    var i = a / e.data.ShoppingDeduction,
      n = e.data.DeductionPoints;
    n > a && (n = a);
    var o = e.data.PointsDiscount;
    o > i && (o = i), e.setData({
      MaxPointDiscount: i.toFixed(2),
      MaxUsePoint: a,
      PointsDiscount: o,
      DeductionPoints: n
    });
  },
  CalcOrderTotalPrice: function () {
    var e = this,
      t = e.data.ProductAmount - e.data.FullDiscount;
    (t = (t = t.toSub(e.data.DefaultCouponPrice)).toSub(e.data.PointsDiscount)) < 0 && (t = 0);
    var a = 0;
    "False" == e.data.OrderInfo.IsFreightFree && (a = parseFloat(e.data.OrderInfo.OrderFreight));
    var i = 0;
    e.data.IsOpenInvoice && (i = e.data.InvoiceRate);
    var n = (t * (100 * i) / 1e4).toFixed(2);
    t = t.toAdd(e.data.OrderFreight).toAdd(parseFloat(n)), t = parseFloat(t).toFixed(2),
      e.setData({
        OrderTotalPrice: t,
        TaxRate: n,
        OrderFreight: a
      });
  },
  setProvinceCityData: function (e, t, a, n, o) {
    var s = this;
    null != e && (i = e);
    var r = i,
      d = [],
      c = [];
    for (var u in r) {
      var l = r[u].name,
        p = r[u].id;
      d.push(l), c.push(p);
    }
    s.setData({
      provinceName: d,
      provinceCode: c
    });
    var h = i[t].city,
      v = [],
      I = [];
    for (var u in h) {
      var l = h[u].name,
        p = h[u].id;
      1, v.push(l), I.push(p);
    }
    s.setData({
      cityName: v,
      cityCode: I
    });
    var f = h[a].area,
      g = [],
      m = [];
    if (null != f && f.length > 0) {
      for (var u in f) {
        var l = f[u].name,
          p = f[u].id;
        g.push(l), m.push(p);
      }
      s.setData({
        districtName: g,
        districtCode: m
      });
    } else s.setData({
      districtName: [],
      districtCode: []
    });
  },
  getItemIndex: function (e, t) {
    for (var a = e.length; a--;)
      if (e[a] === t) return a;
    return -1;
  },
  setAreaDataShow: function (e, t, a, i) {
    var r = this;
    if (null != e) p = e, n.push(t), o.push(e);
    else {
      var d = r.getItemIndex(n, t);
      p = d >= 0 ? o[d] : [];
    }
    var u = [],
      l = [];
    if (p && p.length > 0) {
      for (var h in p) {
        var v = h.id,
          I = h.name;
        u.push(v), l.push(I);
      }
      r.setData({
        districtName: u,
        districtCode: l
      });
    } else r.setData({
      districtName: [],
      districtCode: []
    });
    this.ArrayContains(s, a) ? r.setStreetData(null, c, a, i) : r.getRegions(c, 4, a, i);
  },
  setStreetData: function (e, t, a, i) {
    var n = this;
    if (null != e) s.push(regionId), r.push(e), h = e;
    else {
      var o = n.getItemIndex(s, t);
      h = o >= 0 ? r[o] : [];
    }
  },
  setAreaData: function (e, t, n, o) {
    var s = this,
      e = e || 0,
      t = t || 0,
      o = (n = n || 0) || 0;
    void 0 == i || null == i ? wx.request({
      url: a.getUrl("GetRegionsOfProvinceCity"),
      async: !1,
      success: function (a) {
        "OK" == a.data.Status && s.setProvinceCityData(a.data.province, e, t, n, o);
      },
      error: function (e) {}
    }) : s.setProvinceCityData(null, e, t, n, o);
  },
  changeArea: function (e) {
    var t = this;
    d = e.detail.value[0], c = e.detail.value[1], u = e.detail.value.length > 2 ? e.detail.value[2] : 0,
      l = 0, console.log("省:" + d + "市:" + c + "区:" + u), t.setAreaData(d, c, u, l);
  },
  showDistpicker: function () {
    this.setData({
      showDistpicker: !0
    });
  },
  distpickerCancel: function () {
    var e = this,
      t = e.data.InvoiceEnty.ReceiveRegionName;
    this.setData({
      showDistpicker: !1,
      fullAddress: t,
      FullRegionName: t,
      FullRegionPath: t,
      regionId: e.data.InvoiceEnty.ReceiveRegionId
    });
  },
  distpickerSure: function () {
    var e, t = this.data.provinceName[d] + " " + this.data.cityName[c] + " " + this.data.districtName[u];
    this.data.streetCode.length > 0 ? e = this.data.streetCode[l] : this.data.districtCode.length > 0 ? e = this.data.districtCode[u] : this.data.cityCode.length > 0 && (e = this.data.cityCode[c]);
    var a = this.data.isCss;
    "请填写所在地区" == this.data.FullRegionName && (a = !1), this.setData({
      fullAddress: t,
      FullRegionName: t,
      FullRegionPath: t,
      regionId: e,
      selCityName: this.data.cityName[c] ? this.data.cityName[c] : "",
      isCss: a,
      detailAddress: "",
      building: "",
      showDistpicker: !1
    });
  },

  checkOrderFileds:function(){
    var t=this;
    var n=t.data.OrderFileds,d=t.data.SubmitFileds,s=t.data.Suppliers;
    var error=0;
    d.forEach(function(k){
      k.Fileds.forEach(function(p){
        if(p.FillType=='product'&&p.NeedFill==1){
          var list=s[0].ProductItems.filter(function(u){
            return u.MaterialName==p.SplitKeyValue;
          })
          list.forEach(function(i){
            if(n.productfileds&&n.productfileds.length>0)
            {
              var j=n.productfileds.filter(function(h){
                return h.id==i.ProductId&&h[p.SubmitFiled]&&h[p.SubmitFiled]!='';
              })              
            j.length==0?error++:'';
            }else error++;          
          })
  
        }else if(p.FillType=='order'&&p.NeedFill==1){
           n[p.SubmitFiled]&&n[p.SubmitFiled]!=null?'': error++;
        }
      })
     
    })    
    return error==0;    
  },
  submitOrder: function (t) {
    var i = this;
    // if (void 0 == i.data.FromPage && (i.data.FromPage = ""), (i.data.FromPage && i.data.BuyAmount <= 0 || "" == i.data.ProductSku || void 0 == i.data.ProductSku) && wx.showModal({
    //     title: "提示",
    //     content: "参数错误",
    //     showCancel: !1,
    //     success: function (e) {
    //       e.confirm && wx.switchTab({
    //         url: "../home/home"
    //       });
    //     }
    //   })) {

    // }

    //判断自提和收货地址
    var shippingId = 0;
    if (!i.data.pickMyself) {
      if (null == i.data.ShippingAddressInfo || void 0 == i.data.ShippingAddressInfo) {
        return this.setData({
          isEnable: !1
        }), void wx.showModal({
          title: "提示",
          content: "请选择收货地址",
          showCancel: !1
        });
      } else {
        shippingId = i.data.ShippingAddressInfo.ShippingId
      }
    }
    if (i.data.pickMyself) {
      if (null == i.data.chooseStoreInfo || void 0 == i.data.chooseStoreInfo) {
        return this.setData({
          isEnable: !1
        }), void wx.showModal({
          title: "提示",
          content: "请选择自提门店",
          showCancel: !1
        });
      }
    }
      //检测是否输入必填字段
      if(!i.checkOrderFileds()){
        wx.showToast({
          title: '请填写必填字段!',
          icon:'none'
        })
        return false;
      }
   
    i.data.InvoiceEnty && i.data.InvoiceEnty.Id, i.data.IsOpenInvoice && "增值税发票" == i.data.InvoiceTypeName && i.data.InvoiceId <= 0 ? wx.showModal({
      title: "提示",
      content: "请完善发票信息",
      showCancel: !1
    }) : (this.setData({
      isEnable: !0
    }), a.getOpenId(function (n) {
      var o;
      wx.request({
        url: a.getUrl("SubmitOrder"),
        data: (o = {
            openId: n,
            fromPage: i.data.FromPage,
            shippingId: shippingId,
            couponCode: i.data.DefaultCouponCode,
            countDownId: i.data.CountdownId,
            buyAmount: i.data.BuyAmount,
            productSku: i.data.ProductSku,
            remark: i.data.Remark,
            deductionPoints: i.data.DeductionPoints,
            formId: t.detail.formId,
            NeedInvoice: i.data.IsOpenInvoice,
            InvoiceId: i.data.InvoiceId,
            OrderFileds: JSON.stringify(i.data.OrderFileds),
            IsTakeSelf: i.data.pickMyself,
            chooseStoreId:i.data.chooseStoreInfo?i.data.chooseStoreInfo.StoreId:0,
            orderid: i.data.orderid
          }, e(o, "fromPage", i.data.FromPage), e(o, "shippingType", i.data.ShippType), e(o, "shiptoDate", i.data.SendTime),
          o),
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: "post",
        success: function (e) {
          if ("OK" == e.data.Status)
          {
            a.globalData.userInfo.points=a.globalData.userInfo.points-i.data.PointTotal;
            if (e.data.OrderTotal > 0&&i.data.IsShopToC) {
              var t = e.data.OrderId;
              i.setData({
                orderId: t
              });
              a.orderPay(t, 0, !1);
            } else wx.redirectTo({
              url: "../orderlist/orderlist"
            });
          }    
          else wx.showModal({
            title: "提示",
            content: e.data.Message,
            showCancel: !1
          });
        },
        complete: function () {
          i.setData({
            isEnable: !0
          });
        }
      });
    }));
  },
  pickchange: function (e) {
    this.setData({
      pickMyself: e.detail.value
    })
  },
  gotoStoreList:function(){
    var skuid=this.data.ProductSku;
    wx.navigateTo({
      url: '/subpages/choosestore/choosestore?productsku='+skuid,
    })
  }
});