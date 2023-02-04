var t = require("../../utils/config.js"),
  e = getApp(),
  app = e,
  a = require("../wxParse/wxParse.js")

Page({
  data: {
    ProductId: 0,
    ProductName: "",
    MetaDescription: "",
    TempMetaDescription: "",
    ShortDescription: "",
    ShowSaleCounts: "",
    Weight: "",
    MarketPrice: "",
    IsfreeShipping: "",
    MaxSalePrice: "",
    MinSalePrice: "",
    ProductImgs: "",
    SkuItemList: "",
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
    selectedskuList: [],
    CustomProductIds: [],
    isbuy: !0,
    ReviewCount: 0,
    imgurl: e.getRequestUrl + "/templates/master/default/UploadImage/advertimg/20160623171012_4817.jpg",
    sharebtn: e.getRequestUrl + "/Templates/xcxshop/images/share.png",
    host: e.getRequestUrl,
    SelectSpecifications: "",
    SupplierId: 0,
    SupplierName: "平台",
    DetailStatus: "",
    AttributeStatus: "active",
    ExtendAttribute: [],
    ExtensionId: 0,
    ReferralMoney: 0,
    PackageList: [],
    TagList: [],
    referralId: "",
    DefaultColor: "",
    SecondColor: "",
    maskHidden: false,
    wxCode: "",
    posterTitle: "邀你一起共享美好生活",
    ShowPosterModel: false,
    TitleActions: [{
      name: '确认并生成海报',
    }],
    uploadtype: '',
    uploadtypes: ['戒指', '耳饰', '吊坠', '手镯', '手足链', '项链', '配饰', '套链', '其他'],
    IsScan: false,
    remark: {
      "text": '',
      "img": '',
      "weight": ''
    },
    EnquiryNum: 0,
    weightNumber: "",
    weightWords: "我有更好的选择",
    Quantity: 1,
    formDataNormal: {},
    UserInfo: {},
    showSpecification: true,
    isUnfold: 'icon-fangxiang-you'
  },
  onPullDownRefresh: function () {
    var t = this;
    t.loadData(t);
  },
  onLoad: function (t) {
    var that = this;
    e.setWatcher(this);
    let scene = decodeURIComponent(t.scene);
    e.getSiteInfo(function (s) {
      t.ReferralUserId && e.setRefferUserId(t.ReferralUserId);
      var a = t.id;
      console.log(a);
      if (scene && scene.split('&').length == 2) {
        a = scene.split("&")[0];
        that.data.referralId = scene.split('&')[1];
        e.setRefferUserId(scene.split('&')[1]);
      }
      e.globalData.userInfo && e.globalData.userInfo.IsReferral ? that.data.referralId = !0 : that.data.referralId = !1;
      that.setData({
        ProductId: a,
        referralId: that.data.referralId,
        DefaultColor: s.DefaultColor,
        SecondColor: s.SecondColor,
        siteInfo: s,
        userInfo: e.globalData.userInfo,
        IsScan: scene && scene != 'undefined'
      });
      that.loadData(that);

      var returnUrl = "../productdetail/productdetail?id=" + that.data.ProductId;
      e.getUserInfo(null, encodeURI(returnUrl));
    });

  },
  onShareAppMessage: function (a) {
    var o = this;
    var i = "/pages/productdetail/productdetail?id=" + o.data.ProductId;
    return e.globalData.userInfo && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId), {
      title: o.data.ProductName,
      path: i,
      success: function (e) {
        t.showTip("分享成功", "success");
      },
      fail: function (e) {
        t.showTip("分享失败", "error");
      }
    };
  },
  onReachBottom: function () {
    var t = this;
    if (null == this.data.metaDescription || "" == this.data.metaDescription) {
      var e = this.data.TempMetaDescription;
      null != e && void 0 != e && a.wxParse("metaDescription", "html", e, t);
    }
  },

  onTabClick: function (t) {
    0 == t.currentTarget.dataset.status ? this.setData({
      DetailStatus: "active",
      AttributeStatus: "",
      PackingStatus: ""
    }) : 1 == t.currentTarget.dataset.status ? this.setData({
      DetailStatus: "",
      AttributeStatus: "active",
      PackingStatus: ''
    }) : this.setData({
      DetailStatus: "",
      AttributeStatus: "",
      PackingStatus: 'active'
    })
  },
  loadData: function (t) {
    wx.showLoading({});
    wx.showNavigationBarLoading(),
      e.getUserInfo(function (n) {
        t.setData({
          UserInfo: n
        })
      }),
      e.getOpenId(function (a) {
        wx.request({
          url: e.getUrl("GetProductDetail"),
          data: {
            openId: a,
            productId: t.data.ProductId,
            ReferralUserId: e.getRefferUserId(),
            Remark: t.data.IsScan ? '扫码进入商品详情' : ''
          },
          success: function (e) {
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
              a.SkuItemList.forEach(function (t, e) {
                t.AttributeValue.forEach(function (t, e) {
                  t.Enable = 1;
                });
              });
              var r = a.DefaultSku,
                u = [],
                sc = "";
              null != a && a.SkuItemList.forEach(function (t, a, e) {
                t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                var r = new Object();
                r.valueid = t.AttributeValue[0].ValueId, r.value = t.AttributeValue[0].Value, r.attributeid = t.AttributeId,
                  u.push(r), (sc += "" == sc ? r.value : "," + r.value);
              }), o = r.SkuId;
              a.ExtendAttribute.length == 0 ? t.setData({
                DetailStatus: "active",
                AttributeStatus: "",
                PackingStatus: ""
              }) : '';

              t.setData({
                ProductId: a.ProductId,
                ProductName: a.ProductName,
                ShortDescription: a.ShortDescription,
                ShowSaleCounts: a.ShowSaleCounts,
                Weight: r.Weight,
                SalePrice: r.SalePrice,
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
                HasUniqueItem: a.HasUniqueItem,
                skuStock: a.Stock,
                selectedSku: o,
                ReviewCount: a.ReviewCount,
                buyAmount: 1,
                TempMetaDescription: a.MetaDescription.replace(/\<img/gi, '<img style="max-width:100%;height:auto"'),
                SelectSpecifications: "已选:" + sc,
                SupplierId: a.SupplierId,
                SupplierName: a.SupplierName,
                ExtendAttribute: a.ExtendAttribute,
                ReferralMoney: a.ReferralMoney,
                PackageList: a.PackageList,
                TagList: a.TagList,
                selectedskuList: u,
                selectedSkuContent: sc,
                IsFavorite: a.IsFavorite,
                ProductCode: a.ProductCode,
                CustomProductIds: a.CustomProductIds,
                CurrentSku: r,
              });
            } else "NOUser" == e.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : wx.showModal({
              title: "提示",
              content: e.data.Message,
              showCancel: !1,
              success: function (t) {
                t.confirm && wx.navigateBack({
                  delta: 1
                });
              }
            });
          },
          complete: function () {
            wx.hideLoading(), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
          }
        });
      });
  },
  onReady: function () {},
  onShow: function () {
    this.selectComponent("#liveWindow").initPlay();
    this.GetShopCart();
  },
  onHide: function () {},
  onUnload: function () {
    var t = this;
    e.getOpenId(function (o) {
      wx.request({
        url: e.getUrl('UpdateVisitStaytime'),
        data: {
          productId: t.data.ProductId,
          openId: o
        },
        success(res) {}
      })
    })
  },
  watch: {
    'couponShow': function (newValue) {
      var that = this;
      if (!newValue)
        that.selectComponent('#couponFrame').showFrame();
      else
        that.selectComponent('#couponFrame').hideFrame();
    },
    'promoteShow': function (newValue) {
      if (!newValue)
        this.selectComponent('#promoteFrame').showFrame();
      else
        this.selectComponent('#promoteFrame').hideFrame();
    },
    'SkuShow': function (newValue) {
      if (!newValue)
        this.selectComponent('#SkuFrame').showFrame();
      else
        this.selectComponent('#SkuFrame').hideFrame();
    }
  },
  getCoupon: function (t) {
    var a = t.currentTarget.id;
    e.getOpenId(function (t) {
      wx.request({
        url: e.getUrl("UserGetCoupon"),
        data: {
          openId: t,
          couponId: a
        },
        success: function (t) {
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
  ToPackDetail: function (detail) {
    var id = detail.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../packdetail/packdetail?id=' + id
    })
  },
  clickCouponList: function (t) {
    var e = this;
    void 0 != e.data.Coupons && null != e.data.Coupons && "" != e.data.Coupons && e.data.Coupons.length > 0 ? this.setData({
      backShow: "",
      couponShow: ""
    }) : wx.showToast({
      title: "暂时没有可以领取的优惠券",
      icon: "loading"
    });
  },
  clickPromoteList: function (t) {
    var e = this.data.Promotes;
    e && e.ActivityCount && e.ActivityCount > 0 ? this.setData({
      backShow: "",
      promoteShow: ""
    }) : wx.showToast({
      title: "暂时没有进行中的满额优惠活动",
      icon: "loading"
    });
  },
  clickSku: function (t) {
    this.setData({
      backShow: "",
      SkuShow: "",
      isbuy: !0
    });
  },
  addShopCart: function (t) {
    // this.setData({
    //   backShow: "",
    //   SkuShow: "",
    //   isbuy: !1
    // });
    this.selectComponent("#selectSku").initData();
  },
  clickback: function (t) {
    this.setData({
      backShow: "none",
      SkuShow: "none",
      couponShow: "none",
      promoteShow: "none"
    });
  },
  onCouponHide: function (t) {
    this.setData({
      backShow: "none",
      couponShow: "none"
    });
  },
  onPromoteHide: function (t) {
    this.setData({
      backShow: "none",
      promoteShow: "none"
    });
  },
  onSkuHide: function (t) {
    this.setData({
      backShow: "none",
      SkuShow: "none"
    });
  },
  reduceAmount: function (t) {
    var e = this.data.buyAmount;
    (e -= 1) <= 0 || this.setData({
      buyAmount: e
    });
  },
  addAmount: function (t) {
    var e = this.data.buyAmount;
    (e += 1) > this.data.skuStock || this.setData({
      buyAmount: e
    });
  },
  changeAmount: function (t) {
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
  commitBuy: function (t) {
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
  addSku: function (t) {
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
          e.getOpenId(function (t) {
            wx.request({
              url: e.getUrl("addToCart"),
              data: {
                openId: t,
                SkuID: n,
                Quantity: s
              },
              success: function (t) {
                "OK" == t.data.Status ? wx.showModal({
                  title: "提示",
                  content: "加入购物车成功",
                  showCancel: !1,
                  success: function (t) {
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
                  success: function (t) {}
                });
              },
              complete: function () {}
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
  // onSkuClick: function (t) {
  //   console.log(111);
  //   var e = this,
  //     a = t.target.dataset.indexcount,
  //     o = t.target.id,
  //     i = t.target.dataset.skuvalue,
  //     s = t.target.dataset.attributeid;
  //     console.log(a,o,i,s);
  //     console.log(t.target.dataset.enablevalue);
  //   if (0 != t.target.dataset.enablevalue) {
  //     var n = new Object();
  //     n.valueid = o, n.value = i, n.attributeid = s;
  //     var u = this.data.selectedskuList;
  //     u[a] = n;
  //     var r = "",
  //       c = this.data.SkuItemList;
  //     c.length == u.length && !0;
  //     for (var l = this.data.ProductId, d = 0; d < u.length; d++) {
  //       var h = u[d];
  //       void 0 != h && (r += "" == r ? h.value : "," + h.value);
  //     }
  //     var S = null;
  //     console.log(c.length + "-" + u.length), e.data.Skus.forEach(function (t, e, a) {
  //       for (var o = !0, i = 0; i < u.length; i++) void 0 != u[i] && -1 != t.SkuId.indexOf("_" + u[i].valueid) || (o = !1);
  //       if (o && c.length == u.length) return S = t, void(l = t.SkuId);
  //     });
  //     c[a];
  //     for (var f = 0; f < c[a].AttributeValue.length; f++) c[a].AttributeValue[f].ValueId == o ? c[a].AttributeValue[f].UseAttributeImage = "selected" : c[a].AttributeValue[f].UseAttributeImage = "False";
  //     var g = "选择规格";
  //     "" != r && (g = "已选：" + r);
  //     var p = e.data.Skus;
  //     this.data.SkuItemList.forEach(function (t, e) {
  //       if (t.AttributeId != s) {
  //         for (var a = [], o = 0; o < u.length; o++) void 0 != u[o] && t.AttributeId != u[o].attributeid && a.push(u[o]);
  //         t.AttributeValue.forEach(function (t, e) {
  //           for (var o = 0, i = 0; i < p.length; i++) {
  //             for (var s = a.length, n = 0, u = p[i].SkuId, r = 0; r < a.length; r++) u.indexOf("_" + a[r].valueid) >= 0 && n++;
  //             u.indexOf("_" + t.ValueId) >= 0 && s == n && (o = 1);
  //           }
  //           t.Enable = o;
  //         });
  //       }
  //     }), console.log(u), this.setData({
  //       selectedskuList: u,
  //       selectedSku: l,
  //       selectedSkuContent: r,
  //       SkuItemList: c,
  //       SelectSpecifications: g
  //     }), null != S && (this.setData({
  //       skuPrice: S.SalePrice,
  //       skuStock: S.Stock
  //     }), "" != S.ThumbnailUrl40 && null != S.ThumbnailUrl40 && this.setData({
  //       skuImg: S.ThumbnailUrl40
  //     }));
  //   }
  // },
  popup() {
    this.selectComponent('#bottomFrame').showFrame();
  },
  hidepup() {
    this.selectComponent('#bottomFrame').hideFrame();
  },
  getImg: function (path) {
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: path,
        success: function (res) {
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
  createNewImg: function () {
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
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath,
              canvasHidden: true
            });
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 200);
    })
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  showPosterModel: function () {
    this.hidepup();
    this.setData({
      ShowPosterModel: true
    });
  },
  posterTitleChange: function (event) {
    var v = event.detail.value;
    if (v.length > 13)
      v = v.substring(0, 13);
    this.setData({
      posterTitle: v
    })
  },
  //点击生成
  formSubmit: function () {
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
    e.getOpenId(function (o) {
      wx.request({
        url: e.getUrl("GetWxCode"),
        data: {
          scene: that.data.ProductId + '&' + e.globalData.userInfo.UserId,
          openId: o,
          remark: '用户生成商品海报'
          // page: 'pages/productdetail/productdetail'
        },
        success: function (e) {
          that.setData({
            wxCode: e.data.url
          })
          that.createNewImg();
          that.setData({
            maskHidden: true,
          });
          return;
          setTimeout(function () {
            that.createNewImg();
            that.setData({
              maskHidden: true,
            });
          }, 1000)
        }
      });
    })


  },
  hideMask: function () {
    var that = this;
    that.setData({
      maskHidden: false
    })
  },
  preview: function (t) {
    var that = this;
    var e = t.target.dataset.src;
    wx.previewImage({
      urls: that.data.ProductImgs,
      current: e
    })
  },
  copyAttr: function () {
    var that = this;
    var content = '';
    that.data.ExtendAttribute.forEach(function (o) {
      content += o.ExtAttrName + ':' + o.ExtAttrValue + '\n';
    });
    wx.setClipboardData({
      data: content,
      success: function () {} 
    })
  },
  // 收藏商品
  AddFavorite: function (e) {
    var that = this;
    var productid = e.currentTarget.dataset.productid;
    var isfa = e.currentTarget.dataset.isfa;
    getApp().getOpenId(function (r) {
      wx.request({
        url: getApp().getUrl("AddFavorite"),
        data: {
          openId: r,
          productid: productid
        },
        success: function (e) {
          that.setData({
            IsFavorite: !isfa
          })
          if (isfa) {
            wx.showToast({
              title: '取消收藏',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 2000
            })
          }
        }
      });
    })
  },
  chooseimage: function () {
    var that = this;

    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            UserCredentials: "../../images/return-img_03.jpg",
            SettleImage: ""
          });
          if (res.tapIndex == 0) {
            that.ChooseImg('album')
          } else if (res.tapIndex == 1) {
            that.ChooseImg('camera')
          }
        }
      }
    })
  },
  ChooseImg: function (type) {
    var n = this;
    e.getRequestUrl;
    n.data.SettleImage ? wx.previewImage({
        current: n.data.SettleImage,
        urls: [n.data.SettleImage]
      }) :

      wx.chooseImage({
        count: 1,
        sourceType: [type],
        success: function (e) {
          var a = e.tempFilePaths[0];
          n.setData({
            UserCredentials: a
          }), n.UploadImage(a);
        }
      });
  },
  UploadImage: function (e) {
    var n = "",
      o = this;
    var type = o.data.uploadtype;
    wx.showLoading({
      title: '运算中',
    })
    getApp().getOpenId(function (t) {
      wx.uploadFile({
        url: getApp().getUrl("UploadAppletImage"),
        filePath: e,
        name: "file",
        formData: {
          openId: t,
          path: 'ImgSearch'
        },
        success: function (e) {
          var a = JSON.parse(e.data);
          if ("OK" == a.Status) {
            console.log('上传成功')
            // 图片地址
            n = a.Data[0].ImageUrl
          } else {
            if ("NOUser" == a.Message) {
              wx.navigateTo({
                url: "../login/login"
              })
            } else {
              wx.showModal({
                title: "提示",
                confirmColor: "#ff5722",
                content: a.ErrorResponse.ErrorMsg,
                showCancel: !1,
                success: function (e) {
                  e.confirm && wx.navigateBack({
                    delta: 1
                  });
                }
              });
            }
          }
          "OK" == a.Status ? n = a.Data[0].ImageUrl : "NOUser" == a.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            confirmColor: "#ff5722",
            content: a.ErrorResponse.ErrorMsg,
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function (e) {
          wx.hideLoading();
          var a = JSON.parse(e.data);
          if ("OK" == a.Status) {
            // 图片地址
            var img = a.Data[0].ImageUrl
            o.data.ExtendAttribute.forEach(function (o) {
              if (o.ExtAttrName == '二级分类') {
                type = o.ExtAttrValue
              }
            });
            if (!type) {
              o.toggle();
              o.setData({
                learnImg: img
              })
            } else {
              o.addImgSearch(type, getApp().customId, img, o.data.ProductCode);
            }
          }
        }
      });
    });
  },
  addImgSearch: function (category, companyid, imgurl, productcode) {
    category ? category : '其他';
    wx.request({
      url: 'https://ssl.zhuanyegou.com/soutu/api/addImage',
      data: {
        category: category,
        companyId: companyid,
        imgUrl: imgurl,
        productCode: productcode
      },
      success(r) {
        wx.showToast({
          title: '学习完成',
          icon: 'success',
          duration: 3000
        })
      },
      fail() {
        wx.showToast({
          title: '服务器失联',
          icon: 'loading',
          duration: 3000
        })
      }
    })
  },

  // 点击按钮
  toggle() {
    this.setData({
      mongolia_show: 'mongolia_show',
    })
    setTimeout(() => {
      this.setData({
        translateY: 'translateY'
      })
    }, 1)
  },
  // 点击蒙层,隐藏picker
  mongolia() {
    this.setData({
      mongolia_show: '',
      translateY: ''
    })
  },
  selectType: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    that.mongolia();
    that.addImgSearch(type, getApp().customId, that.data.learnImg, that.data.ProductCode);
  },
  customProduct: function (e) {
    var that = this;
    if (that.data.CustomProductIds.length <= 1) {
      wx.navigateTo({
        url: '../productdetail/productdetail?id=' + that.data.CustomProductIds[0],
      })
    } else {
      wx.navigateTo({
        url: '../searchdetails/searchdetails?pid=' + that.data.ProductId,
      })
    }
  },
  onSkuClick: function (t) {
    // debugger;
    var a = this,
      e = t.target.dataset.indexcount,
      r = t.target.id,
      u = t.target.dataset.skuvalue,
      n = t.target.dataset.attributeid,
      img = t.target.dataset.imageurl;
    if (0 == t.target.dataset.enablevalue)
      return;
    var d = new Object();
    d.valueId = r, d.value = u, d.attributeid = n;
    console.log(d);
    var selectlist = this.data.selectedskuList;
    var i = "",
      s = this.data.SkuItemList,
      c = this.data.SkuItemList;
    for (var h = 0; h < s[e].AttributeValue.length; h++) {
      if (s[e].AttributeValue[h].ValueId == r && s[e].AttributeValue[h].UseAttributeImage != 'selected') {
        s[e].AttributeValue[h].UseAttributeImage = "selected"
        if (s[1].AttributeValue[h].UseAttributeImage == "selected") {
          a.setData({
            ['remark.weight']: false,
          })
        }
        selectlist[e] = d;
      } else if (s[e].AttributeValue[h].ValueId == r) {
        s[e].AttributeValue[h].UseAttributeImage = "False";
        selectlist[e] = {
          valueId: '',
          value: '',
          attributeid: ''
        };
      } else
        s[e].AttributeValue[h].UseAttributeImage = "False";
    }
    var S = null,
      l = '';
    this.data.Skus.forEach(function (t, e, r) {
      for (var u = 1, n = 0; n < selectlist.length; n++) {
        var id = selectlist[n].ValueId;
        if (t.SkuId.indexOf(selectlist[n].Valueid) <= 0)
          u = !1;
      }
      if (u && c.length == selectlist.length)
        console.log(222);
      return S = t, l = t.SkuId, void(a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
    });
    var skus = a.data.Skus;
    this.data.SkuItemList.forEach(function (t, a) {
      if (t.AttributeId != n) {
        for (var e = [], r = 0; r < selectlist.length; r++)
          void 0 != selectlist[r] && t.AttributeId != selectlist[r].attributeid && e.push(selectlist[r]);
        t.AttributeValue.forEach(function (t, a) {
          for (var r = 0, u = 0; u < skus.length; u++) {
            for (var n = e.length, d = 0, skuid = skus[u].SkuId, i = 0; i < e.length; i++)
              skuid.indexOf("_" + e[i].ValueId) >= 0 && d++;
            skuid.indexOf("_" + t.ValueId) >= 0 && n == d && (r = 1);
          }
          // t.Enable = r;
        });
      }
    });
    var skuValues = s.ProductId;
    selectlist.forEach(function (v, vi) {
      var enableValue = a.data.SkuItemList[vi].AttributeValue.find(f => f.ValueId == v.ValueId);
      if (enableValue && enableValue.Enable == 0)
        v = {
          valueId: '',
          value: '',
          attributeid: ''
        };
      if (v.ValueId)
        skuValues += skuValues ? '_' + v.ValueId : v.ValueId;
    });
    this.setData({
      selectedskuList: selectlist,
      selectedSku: l,
      selectedSkuContent: i,
      SkuItemList: c,
      CurrentProduct: s,
      CurrentSku: S,
      SkuValueIds: skuValues
    });
  },
  clearRemarkText() {
    var that = this;
    that.setData({
      ['remark.text']: ''
    })
  },
  clearRemarkImg() {
    var that = this;
    that.setData({
      ['remark.img']: ''
    })
  },
  inputText(e) {
    this.setData({
      ['remark.text']: e.detail.value
    })
  },
  addToCart: function () {
    var u = this,
      skuItem = u.data.SkuItemList,
      // 判断是否选了所有的规格
      select = skuItem.every((v, i) => {
        console.log(skuItem[i]);
        if (skuItem[1].AttributeValue[0].UseAttributeImage === "False") {
          if (skuItem[0].AttributeValue[0].UseAttributeImage === "selected" && skuItem[2].AttributeValue[0].UseAttributeImage === "selected" && u.data.remark.weight) {
            return true
          }
        } else if (skuItem[i].AttributeValue[0].UseAttributeImage === "selected") {
          return true
        }
      });

    if (!select) {
      wx.showToast({
        title: '请选择商品的规格',
        icon: "none"
      })
    } else {
      app.getOpenId(function (n) {
        var quantity = u.data.Quantity
        wx.request({
          url: app.getUrl("addToCart"),
          data: {
            openId: n,
            SkuID: u.data.CurrentSku.SkuId,
            Quantity: quantity,
            Remark: JSON.stringify(u.data.remark)
          },
          success: function (t) {
            if ("OK" == t.data.Status) {
              var CurrentSku = u.data.CurrentSku;
              CurrentSku.CartQuantity = CurrentSku.CartQuantity + quantity;
              u.setData({
                changeCartnum: 0,
                CurrentSku: CurrentSku
              });
              u.triggerEvent('CartQuantity', {
                quantity: quantity,
                productid: u.data.ProductId,
                opt: '+'
              })

              wx.showToast({
                title: '加入询价单成功'
              });
              u.GetShopCart();
            } else "NOUser" == t.data.Message ? wx.navigateTo({
              url: "../login/login"
            }) : wx.showModal({
              title: "提示",
              content: t.data.ErrorResponse.ErrorMsg,
              showCancel: !1,
              success: function (t) {}
            });
          }
        });
      });
    }
  },
  SettlementShopCart: function () {
    var e = this,
      skuItem = e.data.SkuItemList,
      // 判断是否选了所有的规格
      select = skuItem.every((v, i) => {
        console.log(skuItem[i]);
        if (skuItem[1].AttributeValue[0].UseAttributeImage === "False") {
          if (skuItem[0].AttributeValue[0].UseAttributeImage === "selected" && skuItem[2].AttributeValue[0].UseAttributeImage === "selected" && u.data.remark.weight) {
            return true
          }
        } else if (skuItem[i].AttributeValue[0].UseAttributeImage === "selected") {
          return true
        }
      });

    if (!select) {
      wx.showToast({
        title: '请选择商品的规格',
        icon: "none"
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "是否确认提交询价？",
        showCancel: true,
        confirmColor: '#83242a',
        success(res) {
          if (res.confirm) {
            wx.showLoading({
              title: "正在提交"
            })
            var itemObj = {},
              specification = {},
              type = '标准定制';

            e.data.selectedskuList.forEach(v => {
              // 存储商品规格信息
              if (v.attributeid === "10148") {
                specification.HollowSolid = v.value
              } else if (v.attributeid === "10147") {
                specification.GoldWeight = v.value
              } else if (v.attributeid === "10142") {
                specification.Percentage = v.value
              }
            })

            // 存储商品详细信息
            itemObj.attachment = e.data.remark.img ? e.data.remark.img : e.data.skuImg
            itemObj.brandId = ''
            itemObj.materialName = e.data.CurrentSku.MaterialCode
            itemObj.needStr = e.data.remark.text ? e.data.remark.text : e.data.ProductName
            itemObj.quantity = e.data.Quantity
            itemObj.weightWords = e.data.weightWords
            itemObj.specification = specification
            itemObj.productCode = e.data.ProductCode

            e.setData({
              formDataNormal: itemObj
            })
            console.log(e.data.formDataNormal);

            app.getOpenId(function (n) {
              wx.request({
                url: 'https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_Insert',
                method: 'POST',
                data: {
                  type: type,
                  details: JSON.stringify(e.data.formDataNormal),
                  userid: e.data.UserInfo.UserId,
                  customId: app.customId,
                  operationtype:0
                },
                success: function (t) {
                  console.log(t);
                  wx.hideLoading()
                  if (t.statusCode == "200") {
                    var url = 'http://1086.daogoujingling.com/vshop/Topics.aspx?TopicId=3600';
                    url = encodeURIComponent(url);
                    setTimeout(function () {
                      wx.redirectTo({
                        url: '/pages/diypage/index?url=' + url
                      })
                    }, 0)
                  } else if ("NOUser" == t.data.Message) {
                    wx.navigateTo({
                      url: "../login/login"
                    })
                  } else {
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
                    })
                  }
                }
              });
            });
            setTimeout(() => {
              wx.hideLoading()
            }, 5000);
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    }
  },
  GetShopCart: function () {
    var a = this,
      t = 0;
    e.getOpenId(function (r) {
      wx.request({
        url: e.getUrl("getShoppingCartList"),
        data: {
          openId: r
        },
        success: function (e) {
          "OK" == e.data.Status ? t = e.data.Data.RecordCount : "NOUser" == e.data.Message || wx.showModal({
            title: "提示",
            content: e.data.Message,
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function () {
          a.setData({
            EnquiryNum: t
          });
        }
      });
    });
  },
  // 上传图片开始
  DeleteImg: function (e) {
    var a = this;
    wx.showModal({
      title: '提示',
      content: '确认删除图片？',
      success(res) {
        if (res.confirm) {
          a.setData({
            UserCredentials: "../../images/return-img_03.jpg",
            SettleImage: "",
            ['remark.img']: ""
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // ChooseImg: function (type) {
  //   var n = this;
  //   a.getRequestUrl;
  //   wx.chooseImage({
  //     count: 1,
  //     sourceType: [type],
  //     success: function (e) {
  //       var a = e.tempFilePaths[0];
  //       n.setData({
  //         UserCredentials: a
  //       })
  //       n.UploadImage(a);
  //     }
  //   });
  // },
  previewImage: function (e) {
    var a = e.currentTarget.dataset.srcs;
    wx.previewImage({
      current: a,
      urls: [a]
    });
  },
  UploadImage: function (e) {
    var n = "",
      o = this;
    wx.showLoading({
      title: '上传中',
    })
    app.getOpenId(function (t) {
      wx.uploadFile({
        url: app.getUrl("UploadAppletImage"),
        filePath: e,
        name: "file",
        formData: {
          openId: t,
          path: 'ImgSearch'
        },
        success: function (e) {
          var a = JSON.parse(e.data);
          if ("OK" == a.Status) {
            n = a.Data[0].ImageUrl
          } else {
            if ("NOUser" == a.Message) {
              wx.navigateTo({
                url: "../login/login"
              })
            } else {

            }
          }
          "OK" == a.Status ? n = a.Data[0].ImageUrl : "NOUser" == a.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            confirmColor: "#ff5722",
            content: a.ErrorResponse.ErrorMsg,
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function () {
          wx.hideLoading();
          n && o.setData({
            SettleImage: n,
            ['remark.img']: n
          });
        }
      });
    });
  },
  // 上传图片结束
  remarkInput(e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      ['remark.text']: value
    })
  },
  inputNumber(e) {
    var that = this;
    var value = e.detail.value;
    if (value == 0 || value < 0) {
      value = 1
    }
    that.setData({
      Quantity: value
    })
  },
  //点击我显示底部弹出框
  selectWeight: function () {
    this.shwoSelect();
    if (this.data.weightWords != "我有更好的选择") {
      this.setData({
        weightNumber: this.data.weightWords
      })
    }
  },

  //显示对话框
  shwoSelect: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 100)
  },
  //隐藏对话框
  hideSelect: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })

    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)

    this.setData({
      weightNumber: ""
    })
  },
  customblur: function (e) {
    var value = e.detail.value
    if (value <= 0) {
      wx.showToast({
        title: '克重的自定义不能小于1',
        icon: "none"
      })
      this.setData({
        weightNumber: 1
      })
    }
  },
  custominput: function (e) {
    this.setData({
      weightNumber: e.detail.value
    })
  },
  closeCustom: function () {
    this.hideSelect()
  },
  confirmCustom: function () {
    var that = this;
    console.log(that.data.weightNumber);
    if (that.data.weightNumber == '') {
      wx.showToast({
        title: '请输入克重的自定义规格',
        icon: "none"
      })
    } else {
      that.setData({
        weightWords: that.data.weightNumber,
        ['SkuItemList[1].AttributeValue[0].UseAttributeImage']: "False",
        ['remark.weight']: "skuactive",
      })

      that.hideSelect()
    }
  },
  bindSpecification() {
    var that = this;
    that.setData({
      showSpecification: !that.data.showSpecification
    })
    if (!that.data.showSpecification) {
      that.setData({
        isUnfold: 'icon-fangxiang-zuo'
      })
    } else {
      that.setData({
        isUnfold: 'icon-fangxiang-you'
      })
    }
  }
});