var t = getApp();
var app = t;
const {
  $Toast
} = require('../../dist/base/index');
Page({
  data: {
    ProductList: null,
    SortBy: "",
    SortOrder: "desc",
    KeyWord: "",
    CategoryId: "",
    PageIndex: 1,
    PageSize: 20,
    Num: 0,
    SortClass: "",
    CurrentProduct: null,
    CurrentSku: null,
    selectedSkuContent: null,
    isShowSkuSelectBox: !1,
    index: 0,
    TotalNum: 0,
    ShowCartIcon: !0,
    DefaultColor: '',
    maskHidden: false,
    filters: [],
    posterTitle: "邀你一起共享美好生活",
    ShowPosterModel: false,
    TitleActions: [
      {
        name: '确认并生成海报',
      }
    ],
    ParentProductId:0,
    dflink: ''
  },
  onLoad: function(p) {
    var that=this;
    app.getSiteInfo(function(s) {
      that.setData({
        dflink: p.dflink,
        ParentProductId: p.pid,
        DefaultColor: s.DefaultColor,
        SecondColor: s.SecondColor,
        PageIndex: 1
      });
      that.loadData(that, !1);
      app.getUserInfo(null, encodeURI('../searchdetails/searchdetails?pid='+p.pid));
    });
  },
  onReady: function() {},
  onShow: function() {
    this.GetShopCart();
  },
  onHide: function() {},
  onUnload: function() {},
  onSearch: function(t) {
    var a = this;
    a.setData({
      PageIndex: 1
    }), a.loadData(a, !1);
  },
  onReachBottom: function() {
    var t = this,
      a = t.data.PageIndex + 1;
    t.setData({
      PageIndex: a
    }), t.loadData(t, !0);
  },
  bindKeyWordInput: function(t) {
    this.setData({
      KeyWord: t.detail.value
    });
  },
  onConfirmSearch: function(t) {
    var a = this,
      e = t.detail.value;
    a.setData({
      KeyWord: e,
      PageIndex: 1
    }), a.loadData(a, !1);
  },
  bindBlurInput: function(t) {
    wx.hideKeyboard();
  },
  gotoKeyWordPage: function(t) {
    wx.navigateTo({
      url: "../search/search"
    });
  },
  onSortClick: function(t) {
    var a = this,
      e = t.target.dataset.sortby,
      r = t.currentTarget.dataset.num,
      u = "asc",
      n = "shengxu";
    a.data.SortOrder == u && (u = "desc", n = "jiangxu"), a.setData({
      PageIndex: 1,
      SortBy: e,
      SortOrder: u,
      Num: r,
      SortClass: n
    }), a.loadData(a, !1);
  },
  goToProductDetail: function(t) {
    var a = t.currentTarget.dataset.productid,
      e = t.currentTarget.dataset.activeid,
      r = "../productdetail/productdetail?id=" + a;
    1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + e),
      wx.navigateTo({
        url: r
      });
  },
  loadData: function(a, e) {
    var that = this;
    wx.showLoading(), t.getOpenId(function(r) {
      var data = {
        openId: r,
        dflink: a.data.dflink,
        keyword: a.data.KeyWord,
        cId: a.data.CategoryId,
        pageIndex: a.data.PageIndex,
        pageSize: a.data.PageSize,
        sortBy: a.data.SortBy,
        sortOrder: a.data.SortOrder,
        parentProductId:a.data.ParentProductId
      };
      var filter = that.data.filter;
      for (var obj in filter) {
        if (filter[obj])
          data[obj] = filter[obj];
      };

      wx.request({
        url: t.getUrl("GetProducts"),
        data: data,
        success: function(t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            console.log(r);
            if (r.length == 0) {
              $Toast({
                content: '所以商品已经加载完'
              });
            }
            if (e) {
              var u = a.data.ProductList;
              u.push.apply(u, r), a.setData({
                ProductList: u
              });
            } else a.setData({
              ProductList: r
            });
          } else "NOUser" == t.data.Message || wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {
          wx.hideLoading();
        }
      });
    });
  },
  GetShopCart: function() {
    var a = this,
      e = 0;
    t.getOpenId(function(r) {
      wx.request({
        url: t.getUrl("getShoppingCartList"),
        data: {
          openId: r
        },
        success: function(t) {
          "OK" == t.data.Status ? e = t.data.Data.RecordCount: "NOUser" == t.data.Message || wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {
          wx.hideLoading(), a.setData({
            TotalNum: e
          });
        }
      });
    });
  },
  findProductById: function(t) {
    return this.data.ProductList.find(function(a) {
      return a.ProductId == t;
    });
  },
  setProductCartQuantity: function(t, a, e) {
    var r = this,
      u = !1,
      n = r.data.ProductList,
      d = n.find(function(a) {
        return a.ProductId == t;
      });
    if (d) {
      switch (a = parseInt(a), e) {
        case "=":
          d.CartQuantity = a;
          break;

        case "+":
          d.CartQuantity += a;
      }
      d.CartQuantity < 0 && (d.CartQuantity = 0), u = !0;
    }
    if (u) {
      var o = {
        ProductList: n
      };
      r.setData(o);
    }
  },
  setSkuCartQuantity: function(t, a, e) {
    var r = this,
      u = !1,
      n = r.data.CurrentProduct;
    if (n && n.Skus) {
      var d = n.Skus.find(function(a) {
          return a.SkuId == t;
        }),
        o = r.data.CurrentSku;
      if (d) {
        switch (a = parseInt(a), e) {
          case "=":
            d.CartQuantity = a;
            break;

          case "+":
            d.CartQuantity += a;
        }
        d.CartQuantity < 0 && (d.CartQuantity = 0), o && o.SkuId == d.SkuId && (o.CartQuantity = d.CartQuantity),
          u = !0;
      }
    }
    if (u) {
      var i = {
        CurrentProduct: n,
        CurrentSku: o
      };
      r.setData(i);
    }
  },
  catchAddCart: function(a) {
    var e = this,
      r = a.currentTarget;
    if (1 != r.dataset.activetype) {
      var u = r.dataset.productid,
        n = r.dataset.operator,
        d = parseInt(n + "1"),
        o = r.dataset.opensku,
        i = e.findProductById(u);
      if (!i.HasSKU || i.HasSKU && "false" == o) {
        var s = r.dataset.sku;
        e.addToCart(u, s, d);
      } else wx.showLoading({
        title: "商品信息加载中..."
      }), t.getOpenId(function(a) {
        wx.request({
          url: t.getUrl("GetProductSkus"),
          data: {
            ProductId: u,
            openId: a
          },
          success: function(t) {
            if (wx.hideLoading(), "OK" == t.data.Status) {
              var a = t.data.Data,
                r = a.DefaultSku,
                u = [];
              null != a && a.SkuItems.forEach(function(t, a, e) {
                t.AttributeValue.reverse(), t.AttributeValue[0].UseAttributeImage = "selected";
                var r = new Object();
                r.ValueId = t.AttributeValue[0].ValueId, r.Value = t.AttributeValue[0].Value, r.attributeid = t.AttributeId,
                  u.push(r);
              }), e.setData({
                CurrentProduct: a,
                CurrentSku: r,
                selectedskuList: u,
                selectedSku: r.SkuId
              }), e.showSkuDOM();
            }
          },
          complete: function() {}
        });
      });
    } else wx.navigateTo({
      url: "../countdowndetail/countdowndetail?id=" + r.dataset.activeid
    });
  },
  onSkuClick: function(t) {
    var a = this,
      e = t.target.dataset.indexcount,
      r = t.target.id,
      u = t.target.dataset.skuvalue,
      n = t.target.dataset.attributeid;
    if (0 != t.target.dataset.enablevalue) {
      var d = new Object();
      d.ValueId = r, d.Value = u, d.attributeid = n;
      var o = this.data.selectedskuList;
      o[e] = d;
      var i = "",
        s = this.data.CurrentProduct,
        c = this.data.CurrentProduct.SkuItems;
      s.SkuItems.length == o.length && !0;
      for (var l = s.ProductId, f = 0; f < o.length; f++) {
        var g = o[f];
        void 0 != g && (i += "" == i ? g.Value : "," + g.Value, l += "_" + g.ValueId);
      }
      for (var h = 0; h < s.SkuItems[e].AttributeValue.length; h++) s.SkuItems[e].AttributeValue[h].ValueId == r ? s.SkuItems[e].AttributeValue[h].UseAttributeImage = "selected" : s.SkuItems[e].AttributeValue[h].UseAttributeImage = "False";
      var S = null;
      this.data.CurrentProduct.Skus.forEach(function(t, e, r) {
        for (var u = !0, n = 0; n < o.length; n++) - 1 == t.SkuId.indexOf("_" + o[n].ValueId) && (u = !1);
        if (u && c.length == o.length) return S = t, l = t.SkuId, void(a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
      });
      var I = a.data.CurrentProduct.Skus;
      this.data.CurrentProduct.SkuItems.forEach(function(t, a) {
        if (t.AttributeId != n) {
          for (var e = [], r = 0; r < o.length; r++) void 0 != o[r] && t.AttributeId != o[r].attributeid && e.push(o[r]);
          t.AttributeValue.forEach(function(t, a) {
            for (var r = 0, u = 0; u < I.length; u++) {
              for (var n = e.length, d = 0, o = I[u].SkuId, i = 0; i < e.length; i++) o.indexOf("_" + e[i].ValueId) >= 0 && d++;
              o.indexOf("_" + t.ValueId) >= 0 && n == d && (r = 1);
            }
            t.Enable = r;
          });
        }
      }), this.setData({
        selectedskuList: o,
        selectedSku: l,
        selectedSkuContent: i,
        SkuItemList: c,
        CurrentProduct: s,
        CurrentSku: S
      });
    }
  },
  addToCart: function(a, e, r) {
    var u = this;
    !e || e.lenght < 1 ? wx.showModal({
      title: "提示",
      content: "请选择规格",
      showCancel: !1
    }) : t.getOpenId(function(n) {
      wx.request({
        url: t.getUrl("addToCart"),
        data: {
          openId: n,
          SkuID: e,
          Quantity: r
        },
        success: function(t) {
          if ("OK" == t.data.Status) {
            u.setProductCartQuantity(a, r, "+"), u.setSkuCartQuantity(e, r, "+");
            var n = parseInt(u.data.TotalNum);
            u.setData({
              TotalNum: n + parseInt(r)
            });
            u.hideSkuDOM();
            wx.showToast({
              title: r > 0 ? '加购物车成功' : '更新成功'
            })
          } else "NOUser" == t.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: t.data.ErrorResponse.ErrorMsg,
            showCancel: !1,
            success: function(t) {}
          });
        }
      });
    });
  },

  hideSkuDOM: function() {
    this.selectComponent('#skuFrame').hideFrame();
    this.setData({
      isShowSkuSelectBox: !1,
      ShowCartIcon: !0
    });
  },
  showSkuDOM: function() {
    this.selectComponent('#skuFrame').showFrame();
    this.setData({
      isShowSkuSelectBox: !0,
      ShowCartIcon: !1
    });
  },
  previewImage: function(e) {
    var current = e.currentTarget.dataset.current;
    var urls = e.currentTarget.dataset.urls;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function(a) {
    var o = this;
    var i = "/pages/productdetail/productdetail?id=" + o.data.CurProduct.ProductId;
    // app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId)
    var shareObj = {
      title: o.data.CurProduct.ProductName,
      path: i,
      imageUrl: o.data.CurProduct.Imgs[0],
      success: function(e) {
        t.showTip("分享成功", "success");
      },
      fail: function(e) {
        t.showTip("分享失败", "error");
      }
    };
    return shareObj;
  },
  popup(e) {
    var p = e.currentTarget.dataset.product;
    this.setData({
      CurProduct: p
    })
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
    var path = that.data.CurProduct.Imgs[0];
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
      if (that.data.CurProduct.SalePrice>0)
        context.fillText("￥" + that.data.CurProduct.SalePrice, 98, 865);
      else
        context.fillText("标准金重:"+that.data.CurProduct.WeightItems,98,865);
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
      if (false&&that.data.Promotes.FullAmountReduceList.length > 0) {
        hasPromote++;
        context.setFontSize(28);
        context.setFillStyle('#F50707');
        context.fillText("*" + that.data.Promotes.FullAmountReduceList[0].ActivityName, 98, 915);
        context.stroke();
        promoteText = that.data.Promotes.FullAmountReduceList[0].ActivityName + '空格'
      }
      if (false&&that.data.Promotes.FullAmountSentFreightList.length > 0) {
        hasPromote++;
        context.setFontSize(28);
        context.setFillStyle('#F50707');
        context.fillText("*" + that.data.Promotes.FullAmountSentFreightList[0].ActivityName, 98 + promoteText.length * 20, 915);
        context.stroke();
        promoteText = promoteText + that.data.Promotes.FullAmountSentFreightList[0].ActivityName + '空格'
      }

      if (false&&that.data.Promotes.FullAmountSentGiftList.length > 0) {
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
      context.fillText(that.data.CurProduct.ProductName, 98, h);
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
    this.setData({ ShowPosterModel: true });
  },
  posterTitleChange: function (event) {
    var v = event.detail.value;
    if (v.length > 13)
      v = v.substring(0, 13);
    this.setData({ posterTitle: v })
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
      url: app.getUrl("GetWxCode"),
      data: {
        scene: that.data.ProductId + '&' + app.globalData.userInfo.UserId,
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
  gotoProduct: function(e) {
    wx.navigateTo({
      url: '../productdetail/productdetail?id=' + e.currentTarget.dataset.productid,
    })
  },
  selectFilterValue: function(e) {
    var that = this;
    var valueid = e.currentTarget.dataset.valueid;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var ischeck = e.currentTarget.dataset.ischeck;
    var filters = that.data.filters;
    if (filters[fidx][aidx].ParamName == 'cId') {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (a.ParamName == 'cId') {
          v.IsCheck = false;
        }
      })));
    }
    filters[fidx][aidx].AttributeValues.forEach(o => o.ValueId == valueid ? o.IsCheck = !ischeck : o.IsCheck = false);

    var data = {};
    if (filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (o.length > 1 && v.IsCheck) {
          if (data[a.ParamName] == undefined)
            data[a.ParamName] = '';
          data[a.ParamName] += a.AttributeId + '_' + v.ValueId + ',';
        } else if (v.IsCheck) {
          data[a.ParamName] = v.ValueId;
        }
      })));
    }
    that.setData({
      filters: filters,
      filter: data
    });
    that.GetFilterType();
  },
  GetFilterType: function (filterParam) {
    var that = this;
    var data = {};
    var filters = that.data.filters;
    if (that.data.filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (o.length > 1 && v.IsCheck) {
          if (data[a.ParamName] == undefined)
            data[a.ParamName] = '';
          data[a.ParamName] += v.ValueId + '-';
        } else if (v.IsCheck) {
          data[a.ParamName] = v.ValueId;
        }
      })));
    };
    for (var obj in filterParam) {
      if (filterParam[obj])
        data[obj] = filterParam[obj];
    };
    wx.request({
      url: app.getUrl("GetFilterType"),
      data: data,
      success: function(a) {
        if (0 == a.data.code) {
          var e = a.data.data;
          that.setData({
            filters: e,
          });
          if(!filterParam)
            that.submitFilter();
        }
      }
    });
  },
  bindShowFilter: function() {
    this.setData({
      showfilter: !this.data.showfilter
    });
  },
  resetFilter: function() {
    this.setData({
      filters: []
    });
    this.GetFilterType();
  },
  submitFilter: function() {
    var that = this;
    var data = {};
    var filters = that.data.filters;
    if (that.data.filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (o.length > 1 && v.IsCheck) {
          if (data[a.ParamName] == undefined)
            data[a.ParamName] = '';
          data[a.ParamName] += v.ValueId + '-';
        } else if (v.IsCheck) {
          data[a.ParamName] = v.ValueId;
        }
      })));
    }
    that.setData({
      PageIndex: 1,
      CategoryId:data['cId']
    });
    that.loadData(that, !1);
  },
  showMoreAttribute:function(e){
    var that=this;
    var productid = e.currentTarget.dataset.productid;
    var products=that.data.ProductList;
    products.forEach(function(o){
      if(o.ProductId==productid)
      {
        o.ShowAttributes = !o.ShowAttributes;
      }
    });
    that.setData({ProductList:products});
  },
  customProduct:function(e){
    var that=this;
    var productid = e.currentTarget.dataset.productid;
    that.setData({ ParentProductId: productid, PageIndex:1});
    that.GetFilterType({ productLine: 3 });
    that.loadData(that, !1);
    that.setData({ ParentProductId: 0 });
  }
});