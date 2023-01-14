var t = require("../../utils/config.js"),
  e = getApp(),
  a = require("../wxParse/wxParse.js")

Page({
  data: {
    ProductId: 0,
    PackagingId: 0,
    showSelectsku:true,
    PackStock:0,
    ProductName: "",
    MetaDescription: "",
    TempMetaDescription: "",
    ShortDescription: "",
    ShowSaleCounts: "",
    PackInfo: null,
    PackQuantity: 1,
    Weight: "",
    MarketPrice: "",
    IsfreeShipping: "",
    MaxSalePrice: "",
    MinSalePrice: "",
    ProductImgs: "",
    SkuItemList: "",
    CurrentProduct: "",
    Skus: "",
    Freight: "",
    Coupons: "",
    Promotes: null,
    ShowPromotesText: "",
    IsUnSale: "",
    IsOnSale: !1,
    ActiveType: "",
    ActiveText: "",
    ShowPrice: "",
    backShow: "none",
    SkuShow: "none",
    couponShow: "none",
    promoteShow: "none",
    skuImg: "",
    skuPrice: 0,
    skuStock: 0,
    selectedSku: "",
    selectedSkuContent: "",
    buyAmount: 1,
    PackProducts: null,
    selectedskuList: [],
    isbuy: !0,
    ReviewCount: 0,
    imgurl: e.getRequestUrl + "/templates/master/default/UploadImage/advertimg/20160623171012_4817.jpg",
    sharebtn: e.getRequestUrl + "/Templates/xcxshop/images/share.png",
    SelectSpecifications: "",
    SupplierId: 0,
    SupplierName: "平台",
    DetailStatus: "active",
    AttributeStatus: "",
    ExtendAttribute: [],
    ExtensionId: 0,
    ReferralMoney: 0,
    referralId: "",
    DefaultColor: "",
    SecondColor: "",
    maskHidden: false,
    wxCode: "",
    posterTitle: "邀你一起共享美好生活",
    ShowPosterModel: false,
    TitleActions: [{
      name: '确认并生成海报',
    }]
  },
  onPullDownRefresh: function() {
    var t = this;
    t.loadData(t);
  },
  onLoad: function(t) {
    var that = this;
    e.setWatcher(this);
    let scene = decodeURIComponent(t.scene);
    e.getSiteInfo(function(s) {
      t.ReferralUserId && e.setRefferUserId(t.ReferralUserId);
      var a = t.id;
      if (scene && scene.split('&').length == 2) {
        a = scene.split("&")[0];
        that.data.referralId = scene.split('&')[1];
      }
      e.globalData.userInfo && e.globalData.userInfo.IsReferral ? that.data.referralId = !0 : that.data.referralId = !1;
      that.setData({
        ProductId: a,
        PackagingId: a,
        referralId: that.data.referralId,
        DefaultColor: s.DefaultColor,
        SecondColor: s.SecondColor
      });
      that.loadData(that);

      var returnUrl = "../productdetail/productdetail?id=" + that.data.ProductId;
      e.getUserInfo(null, encodeURI(returnUrl));
    });

  },
  onShareAppMessage: function(a) {
    var o = this;
    var i = "/pages/productdetail/productdetail?id=" + o.data.ProductId;
    return e.globalData.userInfo && e.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId), {
      title: o.data.ProductName,
      path: i,
      success: function(e) {
        t.showTip("分享成功", "success");
      },
      fail: function(e) {
        t.showTip("分享失败", "error");
      }
    };
  },
  onReachBottom: function() {
  
  },
  onTabClick: function(t) {
    0 == t.currentTarget.dataset.status ? this.setData({
      DetailStatus: "active",
      AttributeStatus: ""
    }) : this.setData({
      DetailStatus: "",
      AttributeStatus: "active"
    });
  },
   formatRichText(html){
    if(!html)
    return '';
    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
        return match;
    });
    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
        return match;
    });
    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin-top:0;margin-bottom:0;"');
    return newContent;
},
  loadData: function(t) {
    var that=this;
    wx.showNavigationBarLoading(), e.getOpenId(function(a) {
      wx.request({
        url: e.getUrl("GetPackagingInfo"),
        data: {
          openId: a,
          PackagingId: t.data.ProductId
        },
        success: function(e) {
          if ("OK" == e.data.Status) {
            var a = e.data.Data;
            t.setData({
              PackInfo: a.Info,
              PackProducts: a.List
            });
            t.loadProductInfo(a.List[0].ProductId)
          } else "NOUser" == e.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: e.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {
          wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }
      });
    });
  },
  ChangeProduct: function(e) {
    var t = this;
    var index = e.currentTarget.dataset.index;
    if (index > 2) {
      t.setData({
        scrollLeft: 50 * index
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
    var p = e.currentTarget.dataset.productid;
    this.loadProductInfo(p);
  },
  loadProductInfo: function(id) {
    var t = this;
    var products = t.data.PackProducts;
    products.forEach(function(e) {
      if (e.ProductId == id)
        e.IsSelect = 1
      else e.IsSelect = 0;
    })
    e.getOpenId(function(a) {
      wx.request({
        url: e.getUrl("GetProductDetail"),
        data: {
          openId: a,
          productId: id
        },
        success: function(e) {
          if ("OK" == e.data.Status) {
            var a = e.data.Data;
            if (1 == a.ActiveType) return void wx.redirectTo({
              url: "../countdowndetail/countdowndetail?id=" + a.ActiveId
            });
            if (1 == a.ProductLine || 2 == a.ProductLine) return void wx.redirectTo({
              url: "../ProductCustomDetail/ProductCustomDetail?id=" + a.ProductId
            });
            var o = "";
            0 == a.SkuItemList.length && (o = a.Skus[0].SkuId);
            var i = "";
            if (a.Promotes && a.Promotes.ActivityCount && a.Promotes.ActivityCount > 0)
              for (var s in a.Promotes) {
                var n = a.Promotes[s];
                if (n instanceof Array)
                  for (var u in n) {
                    var r = n[u];
                    r && r.ActivityName && r.ActivityName.length > 0 && (i.length > 0 && (i += ","),
                      i += r.ActivityName);
                  }
              }
            a.SkuItemList.forEach(function(t, e) {
              t.AttributeValue.forEach(function(t, e) {
                t.Enable = 1;
              });
            });
            var r = a.DefaultSku,
              u = [],
              sc = "";
            null != a && a.SkuItemList.forEach(function(t, a, e) {
              t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
              var r = new Object();
              r.valueid = t.AttributeValue[0].ValueId, r.value = t.AttributeValue[0].Value, r.attributeid = t.AttributeId,
                u.push(r), (sc += "" == sc ? r.value : "," + r.value);
            }), o = r.SkuId;
            t.setData({
              ProductId: a.ProductId,
              PackProducts: products,
              ProductName: a.ProductName,
              ShortDescription: a.ShortDescription,
              ShowSaleCounts: a.ShowSaleCounts,
              Weight: a.Weight,
              MarketPrice: a.MarketPrice,
              IsfreeShipping: a.IsfreeShipping,
              MaxSalePrice: a.MaxSalePrice,
              MinSalePrice: a.MinSalePrice,
              ProductImgs: a.ProductImgs,
              SkuItemList: a.SkuItemList,
              Skus: a.Skus,
              Freight: a.Freight,
              Coupons: a.Coupons,
              Promotes: a.Promotes,
              ShowPromotesText: i,
              IsUnSale: a.IsUnSale,
              IsOnSale: a.IsOnSale,
              ActiveType: a.ActiveType,
              ActiveText: a.ActiveType > 0 ? "暂时无法购买" : "立即购买",
              ShowPrice: a.MaxSalePrice == a.MinSalePrice ? a.MinSalePrice : a.MinSalePrice + "～" + a.MaxSalePrice,
              skuImg: a.ThumbnailUrl60,
              skuPrice: a.MinSalePrice,
              skuStock: a.Stock,
              selectedSku: o,
              ReviewCount: a.ReviewCount,
              buyAmount: 1,
              TempMetaDescription: t.formatRichText(a.MetaDescription),
              SelectSpecifications: "已选:" + sc,
              SupplierId: a.SupplierId,
              SupplierName: a.SupplierName,
              ExtendAttribute: a.ExtendAttribute,
              ReferralMoney: a.ReferralMoney,
              selectedskuList: u,
              selectedSkuContent: sc
            });
            t.showSku();
          } else "NOUser" == e.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: e.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {
          wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }
      });
    })
  },
  onReady: function() {},
  onShow: function() {
    this.selectComponent("#liveWindow").initPlay();
  },
  onHide: function() {},
  onUnload: function() {},
  watch: {
    'couponShow': function(newValue) {
      var that = this;
      if (!newValue)
        that.selectComponent('#couponFrame').showFrame();
      else
        that.selectComponent('#couponFrame').hideFrame();
    },
    'promoteShow': function(newValue) {
      if (!newValue)
        this.selectComponent('#promoteFrame').showFrame();
      else
        this.selectComponent('#promoteFrame').hideFrame();
    },
    'SkuShow': function(newValue) {
      if (!newValue)
        this.selectComponent('#SkuFrame').showFrame();
      else
        this.selectComponent('#SkuFrame').hideFrame();
    }
  },
  getCoupon: function(t) {
    var a = t.currentTarget.id;
    e.getOpenId(function(t) {
      wx.request({
        url: e.getUrl("UserGetCoupon"),
        data: {
          openId: t,
          couponId: a
        },
        success: function(t) {
          "OK" == t.data.Status ? wx.showToast({
            title: t.data.Message,
            image: "../../images/succes.png"
          }) : "NOUser" == t.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showToast({
            title: t.data.Message,
            image: "../../images/warning.png"
          });
        }
      });
    });
  },
  clickCouponList: function(t) {
    var e = this;
    void 0 != e.data.Coupons && null != e.data.Coupons && "" != e.data.Coupons && e.data.Coupons.length > 0 ? this.setData({
      backShow: "",
      couponShow: ""
    }) : wx.showToast({
      title: "暂时没有可以领取的优惠券",
      icon: "loading"
    });
  },
  clickPromoteList: function(t) {
    var e = this.data.Promotes;
    e && e.ActivityCount && e.ActivityCount > 0 ? this.setData({
      backShow: "",
      promoteShow: ""
    }) : wx.showToast({
      title: "暂时没有进行中的满额优惠活动",
      icon: "loading"
    });
  },
  clickSku: function(t) {
    this.setData({
      backShow: "",
      SkuShow: "",
      isbuy: !0
    });
  },
  addShopCart: function(t) {
    // this.setData({
    //   backShow: "",
    //   SkuShow: "",
    //   isbuy: !1
    // });
    this.selectComponent("#selectSku").initData();
  },
  clickback: function(t) {
    this.setData({
      backShow: "none",
      SkuShow: "none",
      couponShow: "none",
      promoteShow: "none"
    });
  },
  onCouponHide: function(t) {
    this.setData({
      backShow: "none",
      couponShow: "none"
    });
  },
  onPromoteHide: function(t) {
    this.setData({
      backShow: "none",
      promoteShow: "none"
    });
  },
  onSkuHide: function(t) {
    this.setData({
      backShow: "none",
      SkuShow: "none"
    });
  },
  reduceAmount: function(t) {
    var e = this.data.buyAmount;
    (e -= 1) <= 0 || this.setData({
      buyAmount: e
    });
  },
  addAmount: function(t) {
    var e = this.data.buyAmount;
    (e += 1) > this.data.skuStock || this.setData({
      buyAmount: e
    });
  },
  changeAmount: function(t) {
    var e = parseInt(t.detail.value),
      a = this.data.skuStock;
    isNaN(e) || e > a || e <= 0 ? wx.showModal({
      title: "提示",
      content: "请输入正确的数量,不能大于库存或者小于等于0",
      showCancel: !1
    }) : this.setData({
      buyAmount: e
    });
  },
  commitBuy: function(t) {
    if (!(this.data.ActiveType > 0)) {
      for (var e = !0, a = 0; a < this.data.selectedskuList.length; a++)
        if (void 0 == this.data.selectedskuList[a] || "" == this.data.selectedskuList[a] || null == this.data.selectedskuList[a]) {
          e = !1;
          break;
        }
      if (this.data.selectedskuList.length == this.data.SkuItemList.length && e)
        if (this.data.buyAmount <= 0) wx.showModal({
          title: "提示",
          content: "请输入要购买的数量",
          showCancel: !1
        });
        else {
          var o = this.data.buyAmount,
            i = this.data.selectedSku;
          wx.navigateTo({
            url: "../submitorder/submitorder?productsku=" + i + "&buyamount=" + o + "&frompage=signbuy"
          });
        }
      else wx.showModal({
        title: "提示",
        content: "请选择规格",
        showCancel: !1
      });
    }
  },
  addSku: function(t) {
    if (!(this.data.ActiveType > 0)) {
      for (var a = this, o = !0, i = 0; i < this.data.selectedskuList.length; i++)
        if (void 0 == this.data.selectedskuList[i] || "" == this.data.selectedskuList[i] || null == this.data.selectedskuList[i]) {
          o = !1;
          break;
        }
      if (this.data.selectedskuList.length == this.data.SkuItemList.length && o)
        if (this.data.buyAmount <= 0) wx.showModal({
          title: "提示",
          content: "请输入要购买的数量",
          showCancel: !1
        });
        else {
          var s = this.data.buyAmount,
            n = this.data.selectedSku;
          e.getOpenId(function(t) {
            wx.request({
              url: e.getUrl("addToCart"),
              data: {
                openId: t,
                SkuID: n,
                Quantity: s
              },
              success: function(t) {
                "OK" == t.data.Status ? wx.showModal({
                  title: "提示",
                  content: "加入购物车成功",
                  showCancel: !1,
                  success: function(t) {
                    t.confirm && a.setData({
                      backShow: "none",
                      SkuShow: "none"
                    });
                  }
                }) : "NOUser" == t.data.Message ? wx.navigateTo({
                  url: "../login/login"
                }) : wx.showModal({
                  title: "提示",
                  content: t.data.ErrorResponse.ErrorMsg,
                  showCancel: !1,
                  success: function(t) {}
                });
              },
              complete: function() {}
            });
          });
        }
      else wx.showModal({
        title: "提示",
        content: "请选择规格",
        showCancel: !1
      });
    }
  },
  showSku: function() {
    var t = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    e.getOpenId(function(o) {
      wx.request({
        url: e.getUrl('GetProductSkus'),
        data: {
          ProductId: t.data.ProductId,
          openId: o
        },
        success: function(res) {        
          if ("OK" == res.data.Status) {
            var b = res.data.Data.SkuItems.length>0;
            t.setData({
              CurrentProduct: res.data.Data,
              showSelectsku:b
            });
            var selectSku = t.data.PackProducts.find(function(e) {
              return e.ProductId == t.data.ProductId;
            })
            var attrs = selectSku.SkuId.split('_'); //t.data.CurrentProduct.DefaultSku.SkuId.split('_');
            var selectedskuList = [];
            var CurrentProduct = t.data.CurrentProduct;
            attrs.forEach(function(i, e) {
              if (e == 0) return false;
              else {
                CurrentProduct.SkuItems.forEach(function(b, f) {
                  b.AttributeValue.forEach(function(c, d) {
                    if (c.ValueId == i) {
                      c.UseAttributeImage = "selected";
                      selectedskuList.push({
                        ValueId: c.ValueId,
                        Value: c.Value,
                        attributeid: b.AttributeId
                      })
                    }
                  })
                })
              }
            })
            t.setData({
              CurrentProduct: CurrentProduct,
              selectedskuList: selectedskuList
            })
            wx.hideLoading();
          }
        }
      })
    })
  },
  onSkuClick: function(t) {
    var a = this,
      e = t.target.dataset.indexcount,
      r = t.target.id,
      u = t.target.dataset.skuvalue,
      n = t.target.dataset.attributeid;
    if (0 == t.target.dataset.enablevalue)
      return;
    var d = new Object();
    d.ValueId = r, d.Value = u, d.attributeid = n;
    var selectlist = this.data.selectedskuList;

    var i = "",
      s = this.data.CurrentProduct,
      c = this.data.CurrentProduct.SkuItems;
    for (var h = 0; h < s.SkuItems[e].AttributeValue.length; h++) {
      if (s.SkuItems[e].AttributeValue[h].ValueId == r && s.SkuItems[e].AttributeValue[h].UseAttributeImage != 'selected') {
        s.SkuItems[e].AttributeValue[h].UseAttributeImage = "selected"
        selectlist[e] = d;
      } else if (s.SkuItems[e].AttributeValue[h].ValueId == r) {
        s.SkuItems[e].AttributeValue[h].UseAttributeImage = "False";
        selectlist[e] = {
          ValueId: '',
          Value: '',
          attributeid: ''
        };
      } else
        s.SkuItems[e].AttributeValue[h].UseAttributeImage = "False";
    }
    var S = null,
      l = '';
    this.data.CurrentProduct.Skus.forEach(function(t, e, r) {
      for (var u = 1, n = 0; n < selectlist.length; n++) {
        var id = selectlist[n].ValueId;
        if (t.SkuId.indexOf(selectlist[n].ValueId) <= 0)
          u = !1;
      }
      if (u && c.length == selectlist.length)
        return S = t, l = t.SkuId, void(a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
    });
    var skus = a.data.CurrentProduct.Skus;
    this.data.CurrentProduct.SkuItems.forEach(function(t, a) {
      if (t.AttributeId != n) {
        for (var e = [], r = 0; r < selectlist.length; r++)
          void 0 != selectlist[r] && t.AttributeId != selectlist[r].attributeid && e.push(selectlist[r]);
        t.AttributeValue.forEach(function(t, a) {
          for (var r = 0, u = 0; u < skus.length; u++) {
            for (var n = e.length, d = 0, skuid = skus[u].SkuId, i = 0; i < e.length; i++)
              skuid.indexOf("_" + e[i].ValueId) >= 0 && d++;
            skuid.indexOf("_" + t.ValueId) >= 0 && n == d && (r = 1);
          }
          t.Enable = r;
        });
      }
    });
    var skuValues = s.ProductId;
    selectlist.forEach(function(v, vi) {
      var enableValue = a.data.CurrentProduct.SkuItems[vi].AttributeValue.find(f => f.ValueId == v.ValueId);
      if (enableValue && enableValue.Enable == 0)
        v = {
          ValueId: '',
          Value: '',
          attributeid: ''
        };
      if (v.ValueId)
        skuValues += skuValues ? '_' + v.ValueId : v.ValueId;
    });

    //已选规格
    var selectstr = "已选：";
    var skuid = a.data.ProductId;
    s.SkuItems.forEach(function(i, p) {
      i.AttributeValue.forEach(function(t, m) {
        if (t.UseAttributeImage == 'selected') {
          selectstr += t.Value + ','
          skuid += '_' + t.ValueId
        }
      })
    })

    //写入套系商品已选规格
    if (l != "") {
      var list = a.data.PackProducts;
      list.forEach(function(i, t) {
        if (i.ProductId == a.data.ProductId) {
          i.SkuId = l
        }
      })
      a.setData({
        PackProducts: list
      })
    }
    this.setData({
      selectedskuList: selectlist,
      selectedSku: l,
      selectedSkuContent: i,
      SkuItemList: c,
      CurrentProduct: s,
      CurrentSku: S,
      SkuValueIds: skuValues,
      SelectSpecifications: selectstr
    });
  },
  popup() {
    this.selectComponent('#bottomFrame').showFrame();
  },
  hidepup() {
    this.selectComponent('#bottomFrame').hideFrame();
  },

  showPack() {
    var t=this;
    var Skuids='';
    t.data.PackProducts.forEach(function(i,n){
Skuids+= "'"+ String(i.SkuId)+'\','
    })
    e.getOpenId(function(o){
      wx.request({
        url: e.getUrl('GetMaxPackQuantity'),
        data:{
          openId:o,
          PackagingId:t.data.PackagingId,
          Skuids:Skuids
        },
        success:function(res){
          t.setData({
            PackStock:res.data.Data
          })
        }
      })
    })
    this.selectComponent('#packingFrame').showFrame();
  },
  hidePack() {
    this.selectComponent('#packingFrame').hideFrame();
  },
  addPacking:function(){
    var Skuids = '',that=this;
    that.data.PackProducts.forEach(function (i, n) {
      Skuids +=   String(i.SkuId) + ','
    })
    if (that.data.PackQuantity > that.data.PackStock) {
      wx.showModal({
        title: '提示',
        content: '库存不足！',
      })
      return false;
    }

    e.getOpenId(function (n) {
      wx.request({
        url: e.getUrl('DeletePackShoppingCart'),
      data:{
        openId:n,
        PackagingId: that.data.PackagingId
      },
      success:function(){
        wx.request({
          url: e.getUrl("addToCart"),
          data: {
            openId: n,
            SkuID: Skuids.substr(0, Skuids.length - 1),
            Quantity: that.data.PackQuantity
          },
          success: function (t) {
            if ("OK" == t.data.Status) {
              wx.showToast({
                title: '加入购物车成功',
              });
              that.hidePack();
            } else "NOUser" == t.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : wx.showModal({
              title: "提示",
              content: t.data.ErrorResponse.ErrorMsg,
              showCancel: !1,
              success: function (t) { }
            });
          }
        });
      }
      })
      
    });

  },
  inputPackQuantity:function(e){
    console.log(e.detail)
    var t=this;
    if (e.detail.value > t.data.PackStock) {
      wx.showToast({
        title: '最大购物套数为' + t.data.PackStock,
        icon: 'none',
        duration: 500
      })    
      t.setData({
        PackQuantity: Number(t.data.PackStock)
      })
    }else{
    t.setData({
      PackQuantity: e.detail.value
    })
    }
  },
  plusPackQuantity: function() {
    var t = this;
    if (t.data.PackQuantity <= 1) return false;
    else
      t.setData({
        PackQuantity: t.data.PackQuantity - 1
      })
  },
  addPackQuantity: function() {
    var t = this;
    if(t.data.PackQuantity>=t.data.PackStock){
      wx.showToast({
        title: '最大购物套数为'+t.data.PackStock,
        icon:'none',
        duration:500
      })
      return false;
    }
    t.setData({
      PackQuantity: t.data.PackQuantity + 1
    })
  },
  getImg: function(path) {
    return new Promise(function(resolve, reject) {
      wx.getImageInfo({
        src: path,
        success: function(res) {
          resolve(res);
        }
      })
    })
  },
  /**
   * 
   * @param {CanvasContext} ctx canvas上下文
   * @param {number} x 圆角矩形选区的左上角 x坐标
   * @param {number} y 圆角矩形选区的左上角 y坐标
   * @param {number} w 圆角矩形选区的宽度
   * @param {number} h 圆角矩形选区的高度
   * @param {number} r 圆角的半径
   */
  //画圆角边框
  roundRect(ctx, x, y, w, h, r, fillColor, strokeColor) {
    // 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
    // 开始绘制
    ctx.beginPath()

    // 绘制左上角圆弧 Math.PI = 180度
    // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // 绘制border-top
    // 移动起点位置 x终点、y终点
    ctx.moveTo(x + r, y)
    // 画一条线 x终点、y终点
    ctx.lineTo(x + w - r, y)
    // ctx.lineTo(x + w, y + r)

    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // 绘制border-right
    ctx.lineTo(x + w, y + h - r)
    // ctx.lineTo(x + w - r, y + h)

    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // 绘制border-bottom
    ctx.lineTo(x + r, y + h)
    // ctx.lineTo(x, y + h - r)

    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // 绘制border-left
    ctx.lineTo(x, y + r)
    // ctx.lineTo(x + r, y)

    if (fillColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.setFillStyle(fillColor)
      // 对绘画区域填充
      ctx.fill()
    }

    if (strokeColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.setStrokeStyle(strokeColor)
      // 画出当前路径的边框
      ctx.stroke()
    }
    // 关闭一个路径
    // ctx.closePath()

    // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
    ctx.clip()
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function() {
    var that = this;
    var app = e;
    var path = that.data.ProductImgs[0];
    var wxCode = that.data.wxCode;
    var headimg = app.globalData.userInfo.picture;
    var posterBj = app.getRequestUrl + '/Utility/pics/posterBack.png';
    var whiteBg = app.getRequestUrl + '/Utility/pics/whitebg.png';
    Promise.all([that.getImg(path), that.getImg(wxCode), that.getImg(posterBj), that.getImg(headimg), that.getImg(whiteBg)]).then(res => {
      var context = wx.createCanvasContext('mycanvas');

      let grd = context.createLinearGradient(0, 0, 750, 1334)
      grd.addColorStop(0, '#' + app.globalData.siteInfo.SecondColor)
      grd.addColorStop(1, '#' + app.globalData.siteInfo.DefaultColor)
      context.setFillStyle(grd)
      context.setFillStyle(grd)
      context.fillRect(0, 0, 750, 1334)


      // context.setFillStyle('#fff')
      // context.fillRect(0, 750, 750, 750)


      context.drawImage(res[4].path, 90, 240, 578, 578);
      //绘制主图
      var mImgHeight = res[0].height;
      var mImgWidth = res[0].width
      var w = (mImgWidth * 578) / mImgHeight;
      var leftMargin = 90 + (578 - w) / 2;
      context.drawImage(res[0].path, leftMargin, 240, w, 578);
      //绘制背景
      context.drawImage(res[2].path, 44, 54, 670, 1226);

      //绘制头像

      context.save() //保存当前的绘图上下文。
      context.beginPath() //开始创建一个路径
      context.arc(158, 160, 60, 0, 2 * Math.PI, false) //画出圆
      context.clip() //裁剪
      context.drawImage(res[3].path, 98, 100, 120, 120);
      context.restore() //恢复之前保存的绘图上下文

      //绘制名称
      context.setFontSize(37);
      context.setFillStyle('#333333');
      context.fillText(app.globalData.userInfo.realName, 260, 150);
      context.stroke();

      context.setFontSize(32);
      context.setFillStyle('#999999');
      context.fillText(that.data.posterTitle, 260, 210);
      context.stroke();



      //绘制价格
      context.setFontSize(40);
      context.setFillStyle('#F50707');
      context.setTextAlign('left');
      context.fillText("￥" + that.data.ShowPrice, 98, 865);
      context.stroke();

      if (that.data.MarketPrice && false) {
        context.setFontSize(35);
        context.setFillStyle('#bdbdbd');
        context.setTextAlign('left');
        context.fillText("￥" + that.data.MarketPrice, 268, 865);
        context.stroke();

        context.setLineWidth(3);
        context.moveTo(268, 850)
        context.lineTo(400, 855)
        context.setStrokeStyle('#bdbdbd');
        context.stroke();
      }

      var hasPromote = 0;
      var promoteText = '';
      //活动描述
      if (that.data.Promotes.FullAmountReduceList.length > 0) {
        hasPromote++;
        context.setFontSize(28);
        context.setFillStyle('#F50707');
        context.fillText("*" + that.data.Promotes.FullAmountReduceList[0].ActivityName, 98, 915);
        context.stroke();
        promoteText = that.data.Promotes.FullAmountReduceList[0].ActivityName + '空格'
      }
      if (that.data.Promotes.FullAmountSentFreightList.length > 0) {
        hasPromote++;
        context.setFontSize(28);
        context.setFillStyle('#F50707');
        context.fillText("*" + that.data.Promotes.FullAmountSentFreightList[0].ActivityName, 98 + promoteText.length * 20, 915);
        context.stroke();
        promoteText = promoteText + that.data.Promotes.FullAmountSentFreightList[0].ActivityName + '空格'
      }

      if (that.data.Promotes.FullAmountSentGiftList.length > 0) {
        hasPromote++;
        var h = hasPromote == 3 ? 955 : 915;
        var w = hasPromote == 3 ? 98 : (98 + promoteText.length * 20)
        context.setFontSize(28);
        context.setFillStyle('#F50707');
        context.fillText("*" + that.data.Promotes.FullAmountSentGiftList[0].ActivityName, w, h);
        context.stroke();
      }

      //商品描述
      var h = hasPromote > 0 ? (hasPromote == 3 ? 1005 : 970) : 935;
      context.setFontSize(32);
      context.setFillStyle('#333333');
      context.fillText(that.data.ProductName, 98, h);
      context.stroke();


      //绘制code码
      context.drawImage(res[1].path, 98, 1060, 170, 170);
      context.setFontSize(37);
      context.setFillStyle('#' + that.data.DefaultColor);
      context.setTextAlign('left');
      context.fillText(app.globalData.siteInfo.SiteName, 300, 1140);
      context.stroke();
      context.drawImage(res[1].path, 98, 1060, 170, 170);
      context.setFontSize(27);
      context.setFillStyle('#999999');
      context.setTextAlign('left');
      context.fillText("扫描或长按小程序码", 300, 1210);
      context.stroke();

      // that.roundRect(context, 500, 100, 200, 200, 20, '#000', '#000');
      context.draw();


      wx.hideToast()
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(function() {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function(res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath,
              canvasHidden: true
            });
          },
          fail: function(res) {
            console.log(res);
          }
        });
      }, 200);
    })
  },
  //点击保存到相册
  baocun: function() {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function(res) {
            console.log(11111)
          }
        })
      }
    })
  },
  showPosterModel: function() {
    this.hidepup();
    this.setData({
      ShowPosterModel: true
    });
  },
  posterTitleChange: function(event) {
    var v = event.detail.value;
    if (v.length > 13)
      v = v.substring(0, 13);
    this.setData({
      posterTitle: v
    })
  },
  //点击生成
  formSubmit: function() {
    var that = this;
    that.hidepup();
    that.setData({
      maskHidden: false,
      ShowPosterModel: false
    });
    wx.showToast({
      title: '正在生成...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: e.getUrl("GetWxCode"),
      data: {
        scene: that.data.ProductId + '&' + e.globalData.userInfo.UserId,
        // page: 'pages/productdetail/productdetail'
      },
      success: function(e) {
        that.setData({
          wxCode: e.data.url
        })
        that.createNewImg();
        that.setData({
          maskHidden: true,
        });
        return;
        setTimeout(function() {
          that.createNewImg();
          that.setData({
            maskHidden: true,
          });
        }, 1000)
      }
    });

  },
  hideMask: function() {
    var that = this;
    that.setData({
      maskHidden: false
    })
  },
});