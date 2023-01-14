var t = require("../../utils/config.js"),
  e = getApp(),
  a = require("../wxParse/wxParse.js")
var app = e;
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
    }],
    ProductLine: '',
    ProductCode: '',
    HasSelectAllSku: true,
    selectedRing: '',
    selectedStore: '',
    selectTip: '',
    uniqueCode: '',
    cut: "",
    color: "",
    clar: ""
  },
  onPullDownRefresh: function () {
    var t = this;
    t.loadData(t);
  },
  onLoad: function (t) {
    var that = this;
    var selectedRing = '',
      selectedStore = '';
    if (t && t.selectedRing)
      selectedRing = t.selectedRing;
    if (t && t.selectedStore)
      selectedStore = t.selectedStore;
    that.setData({
      selectedRing: selectedRing,
      selectedStore: selectedStore
    });
    e.setWatcher(this);
    let scene = decodeURIComponent(t.scene);
    e.getSiteInfo(function (s) {
      t.ReferralUserId && e.setRefferUserId(t.ReferralUserId);
      var a = t.id;
      if (scene && scene.split('&').length == 2) {
        a = scene.split("&")[0];
        that.data.referralId = scene.split('&')[1];
      }
      e.globalData.userInfo && e.globalData.userInfo.IsReferral ? that.data.referralId = !0 : that.data.referralId = !1;
      var MemberGrades = app.globalData.siteInfo.MemberGrades;
      var Discount = MemberGrades[MemberGrades.length - 1].Discount / 100;

      that.setData({
        ProductId: a,
        referralId: that.data.referralId,
        DefaultColor: s.DefaultColor,
        SecondColor: s.SecondColor,
        Discount: Discount
      });
      that.loadData(that);

      var returnUrl = "../ProductCustomDetail/ProductCustomDetail?id=" + that.data.ProductId;
      e.getUserInfo(null, encodeURI(returnUrl));
    });

  },
  onShareAppMessage: function (a) {
    var o = this;
    var i = "/pages/ProductCustomDetail/ProductCustomDetail?id=" + o.data.ProductId;
    return e.globalData.userInfo && e.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId), {
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
      AttributeStatus: ""
    }) : this.setData({
      DetailStatus: "",
      AttributeStatus: "active"
    });
  },
  loadData: function (t) {
    var that = this;
    wx.showNavigationBarLoading(), e.getOpenId(function (a) {
      wx.request({
        url: e.getUrl("GetProductDetail"),
        data: {
          openId: a,
          productId: t.data.ProductId
        },
        success: function (e) {
          if ("OK" == e.data.Status) {
            var a = e.data.Data;
            if (1 == a.ActiveType) return void wx.redirectTo({
              url: "../countdowndetail/countdowndetail?id=" + a.ActiveId
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
              r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, r.attributeid = t.AttributeId,
                u.push(r), (sc += "" == sc ? r.value : "," + r.value);
            }), o = r.SkuId;
            var selectTip = '';
            that.weihandle(a.DefaultSku.Weight);
            var cut = "",
              color = "",
              clar = "";
            a.ExtendAttribute.map(item => {
              if (item.ExtAttrName == "切工") {
                cut = item.ExtAttrValue
              }
              if (item.ExtAttrName == "颜色") {
                color = item.ExtAttrValue
              }
              if (item.ExtAttrName == "净度") {
                clar = item.ExtAttrValue
              }
            })
            if (t.data.selectedRing && a.ProductLine == 2)
              selectTip = '完成定制'

            ;
            else if (t.data.selectedStore && a.ProductLine == 1)
              selectTip = '完成定制';
            else if (a.ProductLine == 1)
              selectTip = '去定制';
            else
              selectTip = '去定制';
            t.setData({
              ProductId: a.ProductId,
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
              MemberPrice: a.MaxSalePrice == a.MinSalePrice ? (a.MinSalePrice * that.data.Discount).toFixed(2) : (a.MinSalePrice * that.data.Discount).toFixed(2) + "～" + (a.MaxSalePrice * that.data.Discount).toFixed(2),
              skuImg: a.ThumbnailUrl60,
              skuPrice: a.MinSalePrice,
              skuStock: a.Stock,
              selectedSku: o,
              selectedSkuContent: "",
              ReviewCount: a.ReviewCount,
              buyAmount: 1,
              TempMetaDescription: a.MetaDescription,
              SelectSpecifications: "已选:" + sc,
              SupplierId: a.SupplierId,
              SupplierName: a.SupplierName,
              ExtendAttribute: a.ExtendAttribute,
              ReferralMoney: a.ReferralMoney,
              ProductLine: a.ProductLine,
              ProductCode: a.ProductCode,
              HasSelectAllSku: true,
              selectTip: selectTip,
              selectedskuList: u,
              selectedSkuContent: sc,
              cut: cut,
              color: color,
              clar: clar
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
          wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }
      });

      wx.request({
        url: e.getUrl("GetProductSkus"),
        data: {
          ProductId: t.data.ProductId,
          openId: a
        },
        success: function (t) {
          wx.hideLoading();
          if ("OK" == t.data.Status) {
            var a = t.data.Data,
              r = a.DefaultSku,
              u = [];
            null != a && a.SkuItems.forEach(function (t, a, e) {
              t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
              var r = new Object();
              r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, r.attributeid = t.AttributeId, r.attributename = t.AttributeName,
                u.push(r);
            });
            var hasUnique = a.Skus.find(o => o.UniqueItemCount > 0) != null;           
            that.setData({
              CurrentProduct: a,
              CurrentSku: r,
              selectedskuList: u,
              selectedSku: r.SkuId,
              HasSku: a.HasSku,
              HasUnique: hasUnique,
              SkuValueIds: r.SkuId,
              Attrs: a.Attrs,
              selectcontents: u
            });
            that.loadUniueItem();
          } else
            wx.showModal({
              title: '提示',
              content: t.data.Message
            })
        },
        complete: function () {}
      });
    });
  },
  onReady: function () {},
  onShow: function () {

  },
  onHide: function () {},
  onUnload: function () {},
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
  addShopCart: function (t) {
    if (this.data.ProductLine == 2) {
      this.addSku();
      return;
    }
    this.setData({
      backShow: "",
      SkuShow: "",
      isbuy: !1
    });
  },
  selectUnique: function (e) {
    var that = this;
    var uniqueCode = e.currentTarget.dataset.uniquecode;
    var uniqueItems = that.data.UniqueItems;
    uniqueItems.forEach(o => o.Select = false);
    var item = uniqueItems.find(o => o.UniqueProductCode == uniqueCode);
    if (item.Quantity > 0)
      return;
    item.Select = true;
    var conent = that.data.selectedSkuContent + ';' + item.UniqueContent
    that.setData({
      UniqueItems: uniqueItems,
      uniqueCode: uniqueCode,
      uniqueItem: item
    });
  },
  clickback: function (t) {
    this.setData({
      backShow: "none",
      SkuShow: "none",
      couponShow: "none",
      promoteShow: "none"
    });
  },
  addSku: function (t) {
    var that = this;
    if (!this.data.HasUnique && !this.data.CurrentSku) {
      wx.showModal({
        title: "提示",
        content: "请选择规格",
        showCancel: !1
      });
      return;
    }
    if (this.data.HasUnique && !this.data.uniqueItem) {
      wx.showModal({
        title: "提示",
        content: "请选择单件",
        showCancel: !1
      });
      return;
    }
    var n = '';
    if (this.data.HasUnique)
      n = that.data.uniqueItem.SkuId + '|' + that.data.uniqueCode;
    else
      n = that.data.CurrentSku.SkuId;
    that.gotoCustom(n);
  },
  gotoCustom: function (n) {
    var that = this;
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一页
    var selectedRing = that.data.selectedRing;
    var selectedStore = that.data.selectedStore;
    var xk = 0;
    if (that.data.ProductLine == 1) {
      selectedRing = n;
    } else
      selectedStore = n;
    if (beforePage) {
      // beforePage.setData({
      //   selectedRing: selectedRing,
      //   selectedStore: selectedStore
      // });
      var attr = that.data.selectedskuList.find(o => o.attributename = '镶口');
      var xk = 0;
      if (attr && parseInt(attr.Value.replace('分')) > 0)
        xk = parseInt(attr.Value.replace('分'));
      let MinWeight = xk * 0.01,
        MaxWeight = xk * 0.01 + 0.09;
      //  beforePage.setData({
      //   MinWeight: xk*0.01,
      //   MaxWeight: xk*0.01+0.09,
      //   PageIndex2:1,
      //   ProductList2:[]
      //  })
      // wx.navigateBack({
      //   success: function () {
      //     beforePage.onLoad(); // 执行前一个页面的onLoad方法
      //   }
      // });
      wx.navigateTo({
        url: '/pages/ProductCustom/ProductCustom?selectedRing=' + selectedRing + '&selectedStore=' + selectedStore + '&MinWeight=' + MinWeight + '&MaxWeight=' + MaxWeight + '&PageIndex2=1'
      })
    } else {
      wx.navigateTo({
        url: '/pages/ProductCustom/ProductCustom?selectedRing=' + selectedRing + '&selectedStore=' + selectedStore
      })
    }
  },
  catchAddCart: function () {
    this.loadUniueItem();
    this.selectComponent('#uniqueFrame').showFrame();
  },
  loadUniueItem: function () {
    var that = this;
    var skuid = that.data.SkuValueIds;
    var productid = that.data.ProductId;
    var uniqueItem = null;
    app.getOpenId(function (a) {
      wx.request({
        url: app.getUrl("GetProductUniqueItems"),
        data: {
          skuid: skuid,
          producid: productid,
          openId: a
        },
        success: function (t) {
          if (wx.hideLoading(), 0 == t.data.code) {
            var items = t.data.data;
            items.forEach(o => {
              o.ContentItems = o.UniqueContent.split('|');
              o.citems = [];
              o.ContentItems.forEach(d => {
                var si = d.split(':');
                if (si.length == 2)
                  o.citems.push({
                    name: si[0],
                    value: si[1]
                  });
              });
            });
            var code = '';
            for (var i = 0; i < items.length; i++) {
              if (items[i].Quantity == 0) {
                uniqueItem = items[i];
                uniqueItem.Select = true;
                code = uniqueItem.UniqueProductCode;
                break;
              }
            }
            that.setData({
              UniqueItems: items,
              uniqueCode: code,
              uniqueItem: uniqueItem
            });
          }
        },
        complete: function () {}
      });
    });
  },
  onSkuClick: function (t) {
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
        s.SkuItems[e].AttributeValue[h].UseAttributeImage = "selected";
        d.attributename = s.SkuItems[e].AttributeName;
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
    this.data.CurrentProduct.Skus.forEach(function (t, e, r) {
      for (var u = 1, n = 0; n < selectlist.length; n++) {
        var id = selectlist[n].ValueId;
        if (t.SkuId.indexOf(selectlist[n].ValueId) <= 0)
          u = !1;
      }
      if (u && c.length == selectlist.length)
        return S = t, l = t.SkuId, void(a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
    });
    var skus = a.data.CurrentProduct.Skus;
    this.data.CurrentProduct.SkuItems.forEach(function (t, a) {
      if (t.AttributeId != n) {
        for (var e = [], r = 0; r < selectlist.length; r++)
          void 0 != selectlist[r] && t.AttributeId != selectlist[r].attributeid && e.push(selectlist[r]);
        t.AttributeValue.forEach(function (t, a) {
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
    selectlist.forEach(function (v, vi) {
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
    this.setData({
      selectedskuList: selectlist,
      selectedSku: l,
      selectedSkuContent: i,
      SkuItemList: c,
      CurrentProduct: s,
      CurrentSku: S,
      SkuValueIds: skuValues,
      selectcontents: selectlist
    });
    this.loadUniueItem();
  },
  popup() {
    this.selectComponent('#bottomFrame').showFrame();
  },
  hidepup() {
    this.selectComponent('#bottomFrame').hideFrame();
  },
  onSkuHide() {
    this.selectComponent('#SkuFrame').hideFrame();
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
    wx.request({
      url: e.getUrl("GetWxCode"),
      data: {
        scene: that.data.ProductId + '&' + e.globalData.userInfo.UserId,
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

  },
  hideMask: function () {
    var that = this;
    that.setData({
      maskHidden: false
    })
  },
  //计算钻重位置：参数钻重
  weihandle: function (a) {
    var size_top = 0,
      size_left = 0;
    if (a >= 0.3 && a < 0.5) {
      size_top = 340;
      size_left = 8 + (a - 0.3) * 1800;
    }
    if (a >= 0.5 && a <= 0.7) {
      size_top = 340;
      size_left = 360 + (a - 0.5) * 900;
    }
    if (a >= 0.7 && a < 0.9) {
      size_top = 340;
      size_left = 360 + 180;
    }
    if (a >= 0.9 && a < 1) {
      size_top = 650;
      size_left = 8 + (a - 0.9) * 180;
    }
    if (a >= 1 && a <= 2) {
      size_top = 650;
      size_left = 180 + (a - 1) * 180;
    }
    if (a > 2) {
      size_top = 650;
      size_left = 550;
    }
    this.setData({
      size_top: size_top,
      size_left: size_left
    })
  },
  goGia(e) {
    var num = e.currentTarget.dataset.num
    wx.navigateTo({
      url: '/pages/GiaReport/GiaReport?reportnum=' + num,
    })
  }
});