import tool from '../../utils/tool.js'

var t = getApp();
var app = t;
const {
  $Toast
} = require('../../dist/base/index');
Page({
  data: {
    ProductList: null,
    allcategorys: [],
    catetext: '分类',
    taglist: [],
    showcate: false,
    scrollleft: 0,
    wxCode: '',
    categorys: [],
    posterheight: 1750,
    subs: [],
    leftsubs: [],
    SortBy: "",
    selectindex: 0,
    SortOrder: "desc",
    KeyWord: "",
    CategoryId: "",
    PageIndex: 1,
    PageSize: 20,
    Num: 0,
    openShare: false,
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
    ShowUniqueFrame: false,
    TitleActions: [{
      name: '确认并生成海报',
    }],
    ParentProductId: 0,
    dflink: '',
    brand: 0,
    cssIndex: 1,
    sharebtn: t.getRequestUrl + "/Templates/xcxshop/images/share.png",
    noproduct: t.getRequestUrl + "/Templates/xcxshop/images/null_search.png",
    selectproducts: [],
    shareid: '',
    selectShow: false,
    Tagindex: 0
  },
  onLoad: function (p) {
      console.log(p);
    var that = this;
    var cid = p.cId;
    that.setData({
      CategoryId: cid
    })
    var a = '';
    if (p.keyword)
      a = p.keyword;
    if (p.isAll)
      a = '';
    var shareid = '';
    if (p.scene && p.scene != undefined) {
      p.scene.indexOf('_') > -1 ? shareid = p.scene.split('_')[0] : '';
      p.scene.indexOf('_') > -1 ? app.setRefferUserId(p.scene.split('_')[1]) : '';
    }

    void 0 == a && (a = "");
    var e = p.cId;
    void 0 == e ? e = "" : a = "";
    var r = this;
    app.getSiteInfo(function (s) {
      var data = r.data;
      for (var obj in p) {
        data[obj] = p[obj];
      };
      r.setData(data);
      r.setData({
        pageIndex: 1,
        shareid: shareid,
        DefaultColor: s.DefaultColor,
        SecondColor: s.SecondColor,
        siteInfo: s,
        siteAll: app.globalData.siteAll
      })
      r.GetFilterType(p);
      r.loadData(p, !1);
      r.loadallcategorys();
      r.loadTaglist();
      app.getUserInfo(r, encodeURI('../searchresult/searchresult?cId=' + e));
    });
  },
  onReady: function () {},
  onShow: function () {
    this.selectComponent("#liveWindow").initPlay();
    this.GetShopCart();
  },
  onHide: function () {},
  onUnload: function () {},
  onSearch: function (t) {
    var a = this;
    a.setData({
      PageIndex: 1
    }), a.loadData({}, !1);
  },
  onReachBottom: function () {
    var t = this,
      a = t.data.PageIndex + 1;
    t.setData({
      PageIndex: a
    }), t.loadData({}, !0);
  },
  bindKeyWordInput: function (t) {
    this.setData({
      KeyWord: t.detail.value
    });
  },
  onConfirmSearch: function (t) {
    var a = this,
      e = t.detail.value;
    a.setData({
      KeyWord: e,
      PageIndex: 1
    }), a.loadData({}, !1);
  },
  bindBlurInput: function (t) {
    wx.hideKeyboard();
  },
  gotoKeyWordPage: function (t) {
    wx.navigateTo({
      url: "../search/search"
    });
  },
  onSortClick: function (t) {
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
    }), a.loadData({}, !1);
  },
  goToProductDetail: function (t) {
    var a = t.currentTarget.dataset.productid,
      e = t.currentTarget.dataset.activeid,
      r = "../productdetail/productdetail?id=" + a;
    1 == t.currentTarget.dataset.activetype && (r = "../countdowndetail/countdowndetail?id=" + e),
      wx.navigateTo({
        url: r
      });
  },

  loadTaglist() {
    var that = this;
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('GetProductTags'),
        data: {
          openId: o
        },
        success(res) {
          that.setData({
            taglist: res.data.data.Data
          })
        }
      })
    })

  },
  loadData: function (a, e) {
    var that = this;
    if (!e)
      that.setData({
        showCompleted: false,
        ProductList: null
      });
    if (that.data.showCompleted)
      return;
    wx.showNavigationBarLoading();
    t.getOpenId(function (r) {
      var data = {
        openId: r,
        keyword: that.data.KeyWord,
        cId: that.data.CategoryId,
        brand: that.data.brand,
        pageIndex: that.data.PageIndex,
        pageSize: that.data.PageSize,
        sortBy: that.data.SortBy,
        sortOrder: that.data.SortOrder,
        parentProductId: that.data.ParentProductId,
        dflink: that.data.dflink,
        TagIds: that.data.TagIds,
        ShareId: that.data.shareid
      };
      var filter = that.data.filter;
      for (var obj in filter) {
        data[obj] = filter[obj];
      };
      for (var param in a)
        data[param] = a[param];
      wx.request({
        url: t.getUrl("GetProducts"),
        data: data,
        success: function (t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            r = r.map(a => {
              a.WeightItems = a.WeightItems.replaceAll(".00", "");
              var items = a.WeightItems.split(",");
              if (items[0] == items[items.length - 1]) {
                return a
              } else {
                a.WeightItems = items[0] + "-" + items[items.length - 1];
                return a
              }
            })
            var showCompleted = false;
            if (r.length < that.data.PageSize)
              showCompleted = true;
            that.setData({
              showCompleted: showCompleted
            })
            if (e) {
              var u = that.data.ProductList;

              u.push.apply(u, r), that.setData({
                ProductList: u,
              });
            } else that.setData({
              ProductList: r
            });
            wx.hideNavigationBarLoading();
          } else "NOUser" == t.data.Message || wx.showModal({
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
        complete: function () {}
      });
    });
  },
  GetShopCart: function () {
    var a = this,
      e = 0;
    t.getOpenId(function (r) {
      wx.request({
        url: t.getUrl("getShoppingCartList"),
        data: {
          openId: r
        },
        success: function (t) {
          "OK" == t.data.Status ? e = t.data.Data.RecordCount : "NOUser" == t.data.Message || wx.showModal({
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
          a.setData({
            TotalNum: e
          });
        }
      });
    });
  },
  findProductById: function (t) {
    return this.data.ProductList.find(function (a) {
      return a.ProductId == t;
    });
  },
  setProductCartQuantity: function ({
    detail: param
  }) {
    var r = this,
      t = param.productid,
      a = param.quantity,
      e = param.opt,
      u = !1,
      n = r.data.ProductList,
      d = n.find(function (a) {
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
    var total = r.data.TotalNum += a;
    if (u) {
      var o = {
        ProductList: n,
        TotalNum: total
      };
      r.setData(o);
    }

  },
  catchAddCart: function (a) {
    var e = this;
    var productid = a.currentTarget.dataset.productid;
    var curProduct = {
      ProductId: productid
    };
    e.setData({
      CurrentProduct: curProduct
    });
    e.showSkuDOM();
  },
  showSkuDOM: function () {
    this.selectComponent("#selectSku").initData();
  },
  previewImage: function (e) {
    var current = e.currentTarget.dataset.current;
    var urls = e.currentTarget.dataset.urls;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  onShareAppMessage: function (a) {
    var o = this;
    var i = "/pages/productdetail/productdetail?id=" + o.data.CurProduct.ProductId;
    // app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + e.globalData.userInfo.UserId)
    var shareObj = {
      title: o.data.CurProduct.ProductName,
      path: i,
      imageUrl: o.data.CurProduct.Imgs[0],
      success: function (e) {
        t.showTip("分享成功", "success");
      },
      fail: function (e) {
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
  loadallcategorys() {
    var that = this;
    var cid = that.data.CategoryId;
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('GetMainCategorys'),
        success(res) {
          var leftsub;
          if (cid == 0 || cid == undefined) {
            leftsub = res.data.data.filter(function (p) {
              return p.Depth == 1;
            })
          } else {
            leftsub = res.data.data.filter(function (p) {
              return p.CategoryId == cid;
            })
          }
          leftsub.forEach(function (p) {
            var subs = res.data.data.filter(function (o) {
              return o.ParentCategoryId == p.CategoryId;
            })
            p.subs = subs;
          })
          var cateinfo = res.data.data.filter(function (p) {
            return p.CategoryId == cid;
          })
          var subs = res.data.data.filter(function (p) {
            return p.ParentCategoryId == cid;
          })
          that.setData({
            leftsubs: leftsub,
            categorys: cateinfo,
            subs: subs,
            allcategorys: res.data.data
          })
        }
      })
    })
  },
  showcatagory() {
    var t = this;
    this.setData({
      showcate: !t.data.showcate
    })
  },
  hideshowcate() {
    this.setData({
      showcate: false
    })
  },
  loadproduct() {
    var t = this;
    t.loadData({}, false);
    t.hidecategory();
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

    // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
    ctx.clip()
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var p = that.data.selectproducts;
    var path0 = p[0].Pic;
    var wxCode = that.data.wxCode;
    const promise3 = new Promise(function (resolve, reject) {
      var imglist = [];
      p.forEach(function (ph, i) {
        wx.getImageInfo({
          src: ph.Pic,
          success: function (res) {
            res.ProductCode = ph.ProductCode;
            res.ProductName = ph.ProductName;
            imglist.push(res);
          }
        })
      })
      resolve(imglist);
    });
    try {
      var headimg = app.globalData.userInfo.picture;
      var posterBj = app.getRequestUrl + '/Utility/pics/whte_back.png';
      var whiteBg = app.getRequestUrl + '/Utility/pics/whitebg.png';
      var bgline = app.getRequestUrl + '/Utility/pics/back_line.png';

      Promise.all([that.getImg(path0), that.getImg(wxCode), that.getImg(posterBj), that.getImg(headimg), that.getImg(whiteBg), promise3, that.getImg(bgline)]).then(res => {
        var context = wx.createCanvasContext('mycanvas');
        let grd = context.createLinearGradient(0, 0, 750, that.data.posterheight)
        grd.addColorStop(0, '#' + app.globalData.siteInfo.SecondColor)
        grd.addColorStop(1, '#' + app.globalData.siteInfo.DefaultColor)
        context.setFillStyle(grd)
        context.setFillStyle(grd)
        context.fillRect(0, 0, 750, that.data.posterheight);
        // //绘制背景         
        context.drawImage(res[2].path, 44, 54, 670, 642 + p.length * 250);

        //设置边框为白色
        context.setStrokeStyle('white');
        //绘制头像
        context.setFillStyle("#fff")
        context.save() //保存当前的绘图上下文。
        context.beginPath() //开始创建一个路径
        context.arc(160, 160, 60, 0, 2 * Math.PI, false) //画出圆   
        context.clip() //裁剪
        context.drawImage(res[3].path, 98, 100, 120, 120);
        context.restore() //恢复之前保存的绘图上下文 

        //绘制名称
        context.setFontSize(37);
        context.setFillStyle('#333333');
        context.fillText(app.globalData.userInfo.realName, 260, 150);
        context.stroke();
        context.setFontSize(25);
        context.setFillStyle('#999999');
        context.fillText("邀你一起共享美好生活", 260, 210);
        context.stroke();

        var lenres = p.length;
        if (lenres > 0) {
          var h = 300,
            h1 = 340,
            h3 = 380;
          setTimeout(function () {
            for (var i = 0; i < lenres; i++) {
              //绘制名称
              context.setFontSize(32);
              context.setFillStyle('#333');
              console.log(res[5][i])
              context.fillText(res[5][i].ProductName.substring(0, 11), 320, h + 250 * i);
              context.fillText(res[5][i].ProductName.substring(11, 22), 320, h1 + 250 * i);

              //商品描述
              context.setFontSize(25);
              context.setFillStyle('#999999');
              // context.fillText(p[i].ProductCode, 320, h3 + 250 * i);
              context.fillText(res[5][i].ProductCode, 320, h3 + 250 * i);
              //商品图片              
              // context.drawImage(p[i].Pic, 98, 250 + 250 * i, 200, 200);
              context.drawImage(res[5][i].path, 98, 250 + 250 * i, 200, 200);

            }

            //推广信息
            context.setFontSize(40);
            context.setFillStyle('#F50707');
            context.setTextAlign('left');
            var storeinfo = "我发现了好货，大家快来围观吧";
            context.fillText(that.data.StoreId > 0 ? that.data.StoreName : '我发现了好货，大家快来围观吧', 98, 360 + lenres * 250);
            context.stroke();
            context.drawImage(res[6].path, 44, 420 + lenres * 250, 670, 50);

            //绘制code码
            context.setFontSize(37);
            context.setFillStyle('#' + that.data.DefaultColor);
            context.setTextAlign('left');
            context.fillText(app.globalData.siteInfo.SiteName, 300, 570 + lenres * 250);
            context.stroke();
            context.drawImage(res[1].path, 98, 500 + lenres * 250, 170, 170);

            context.setFontSize(27);
            context.setFillStyle('#999999');
            context.setTextAlign('left');
            context.fillText("扫描或长按小程序码", 300, 630 + lenres * 250);
            context.stroke();
            context.draw();

            //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'mycanvas',
                success: function (res) {
                  var p = that.data.ProductList;
                  p.forEach(function (a) {
                    a.Selected = false;
                  })
                  that.setData({
                    ProductList: p,
                    selectproducts: []
                  })
                  wx.hideToast();
                  var tempFilePath = res.tempFilePath;
                  that.setData({
                    imagePath: tempFilePath,
                    canvasHidden: true
                  });
                },
                fail: function (res) {}
              });
            }, 1000);
          }, 2000)
        }
      })

    } catch (err) {
      console.log(err, '生成海报出错了');
    }
  },
  //点击保存到相册
  baocun: function () {
    var that = this;
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
  formSubmit: function (shareid) {
    var that = this;
    wx.showToast({
      title: '正在生成...',
      icon: 'loading',
      duration: 10000
    });

    that.setData({
      maskHidden: true,
      posterheight: 750 + 250 * that.data.selectproducts.length,
    });
    wx.request({
      url: app.getUrl("GetWxCode"),
      data: {
        scene: shareid + '_' + app.globalData.userInfo.UserId,
        page: 'pages/searchresult/searchresult'
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
      }
    });

  },
  hideMask: function () {
    var that = this;
    that.setData({
      maskHidden: false
    })
  },
  gotoProduct: function (e) {
    wx.navigateTo({
      url: '../productdetail/productdetail?id=' + e.currentTarget.dataset.productid,
    })
  },
  selectFilterValue: tool.throttle(function (e) {
    var that = this;
    var valueid = e[0].currentTarget.dataset.valueid;
    var fidx = e[0].currentTarget.dataset.fidx;
    var aidx = e[0].currentTarget.dataset.aidx;
    var ischeck = e[0].currentTarget.dataset.ischeck;
    var filters = that.data.filters;
    if (filters[fidx][aidx].ParamName == 'cId' && filters[fidx][aidx].AttributeName == '大类') {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function (v) {
        if (a.ParamName == 'cId') {
          v.IsCheck = false;
        }
      })));
    }
    filters[fidx][aidx].AttributeValues.forEach(o => o.ValueId == valueid ? o.IsCheck = !ischeck : o.IsCheck = false);

    var data = {};
    if (filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function (v) {
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
    that.GetFilterType()
  },600),
  bindExtendInput: function (e) {
    var that = this;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var value = e.detail.value;
    var valueindex = e.currentTarget.dataset.valueindex;
    var filters = that.data.filters;
    if (parseFloat(value).toString() != 'NAN')
      filters[fidx][aidx].AttributeValues[valueindex].ValueId = value;
    var data = {};
    if (filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function (v) {
        if (v.IsCheck) {
          if (data[a.ParamName] == undefined)
            data[a.ParamName] = '';
          data[a.ParamName] += a.AttributeId + '_' + v.ValueId + ',';
        }
      })));
    }
    that.setData({
      filters: filters,
      filter: data
    });

  },
  bindmoreitem: function (e) {
    var that = this;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var filters = that.data.filters;
    filters[fidx][aidx].ShowAll = !filters[fidx][aidx].ShowAll;
    that.setData({
      filters: filters
    });
  },
  GetFilterType: function (filterParam) {
    var that = this;
    var data = {
      openId: app.globalData.openId
    };
    var filters = that.data.filters;
    if (that.data.filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function (v) {
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
      success: function (a) {
        if (0 == a.data.code) {
          var e = a.data.data;
          that.setData({
            filters: e,
          });
        }
      }
    });
  },
  bindShowFilter: function () {
    var t = this;
    this.setData({
      showfilter: !this.data.showfilter
    });
  },
  bindConfirmFilter: function () {
    var t = this;
    this.setData({
      showfilter: false
    });
    this.submitFilter();
  },
  resetFilter: function () {
    this.setData({
      filters: []
    });
    this.GetFilterType();
  },
  submitFilter: function () {
    var that = this;
    var data = {};
    var filters = that.data.filters;
    if (that.data.filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function (v) {
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
      CategoryId: data['cId']
    });
    that.loadData({}, !1);
  },
  showMoreAttribute: function (e) {
    var that = this;
    var productid = e.currentTarget.dataset.productid;
    var products = that.data.ProductList;
    products.forEach(function (o) {
      if (o.ProductId == productid) {
        o.ShowAttributes = !o.ShowAttributes;
      }
    });
    that.setData({
      ProductList: products
    });
  },
  customProduct: function (e) {
    var productid = e.currentTarget.dataset.productid;
    var count = e.currentTarget.dataset.count;
    var customProductId = e.currentTarget.dataset.customproductid;
    if (count <= 1) {
      wx.navigateTo({
        url: '../productdetail/productdetail?id=' + customProductId,
      })
    } else {
      wx.navigateTo({
        url: '../searchdetails/searchdetails?pid=' + productid,
      })
    }

  },
  // 收藏商品
  AddFavorite: function (e) {
    var that = this;
    var productid = e.currentTarget.dataset.productid;
    var productList = that.data.ProductList;
    var isfa = e.currentTarget.dataset.isfa;
    t.getOpenId(function (r) {
      wx.request({
        url: app.getUrl("AddFavorite"),
        data: {
          openId: r,
          productid: productid
        },
        success: function (e) {
          productList = productList.map(a => {
            if (a.ProductId == productid) {
              a.IsFavorite = !a.IsFavorite;
            }
            return a;
          });

          that.setData({
            ProductList: productList
          })
          if (isfa) {
            wx.showToast({
              title: '取消收藏',
              icon: 'success',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 2000
            })
          }

        }
      });
    })
  },
  selcate(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var cateid = e.currentTarget.dataset.cateid;
    var leftsubs = that.data.leftsubs;
    var path = e.currentTarget.dataset.path;
    var cid = app.globalData.cid;
    that.setData({
      CategoryId: cateid,
      PageIndex: 1
    })

    leftsubs.forEach(function (p) {
      if (p.subs && p.subs.length > 0) {
        p.subs.forEach(function (o) {
          if (o.CategoryId == cateid || path.indexOf('|' + o.CategoryId + '|') > -1) {
            o.selected = true;
          } else
            o.selected = false;
        })
      }
    })
    that.loadData({}, !1);

    var allcategorys = that.data.allcategorys;
    var d = allcategorys.filter(function (p) {
      return p.ParentCategoryId == cateid;
    })
    var categroys = that.data.categorys;
    var removeindex = -1;
    categroys.forEach(function (p, index) {
      if (p.CategoryId == cateid) {
        p.isselected = true;
        removeindex = index
      } else {
        p.isselected = false;
      }
    })
    if (removeindex > -1) {
      categroys.splice(removeindex + 1, 10);
    }
    var catetext = '';
    categroys.forEach(function (p) {
      catetext += p.Name + ','
    })

    this.setData({
      selectindex: index,
      subs: d,
      categorys: categroys,
      catetext: catetext,
      showcate: true,
      scrollleft: 1000,
      leftsubs: leftsubs
    })
  },
  selsubs(e) {
    var that = this;
    var cateid = e.currentTarget.dataset.cateid;
    var parentid = e.currentTarget.dataset.parentid;
    var path = e.currentTarget.dataset.path;
    var selesub = e.currentTarget.dataset.selesub;
    var leftsubs = that.data.leftsubs;
    if (selesub == true) {
      that.setData({
        CategoryId: parentid,
        PageIndex: 1
      })
    } else {
      that.setData({
        CategoryId: cateid,
        PageIndex: 1
      })
    }
    that.loadData({}, false);
    var allcategorys = that.data.allcategorys;
    var d = allcategorys.filter(function (p) {
      return p.ParentCategoryId == cateid;
    })
    var info = allcategorys.filter(function (p) {
      return p.CategoryId == cateid;
    })[0]
    var f = that.data.categorys;
    info.isselected = true;
    var remoindex = -1
    f.forEach(function (p, index) {
      p.isselected = false;
      if (p.Depth == info.Depth) {
        remoindex = index
      }
      if (p.CategoryId == parentid) {
        p.selectcate = cateid;
      }
    })
    if (remoindex > -1) {
      f[remoindex] = info;
      f.splice(remoindex + 1, 10)
    } else f.push(info);
    leftsubs.forEach(function (p) {
      if (p.subs && p.subs.length > 0) {
        p.subs.forEach(function (o) {
          if (path.indexOf('|' + o.CategoryId + '|') > -1 || o.CategoryId == cateid) {
            o.selected = true;
          } else
            o.selected = false;
        })
      }
    })
    var catetext = '';
    f.forEach(function (p) {
      catetext += p.Name + ','
    })
    that.setData({
      subs: d,
      categorys: f,
      catetext: catetext,
      scrollleft: 1000,
      showcate: true,
      leftsubs: leftsubs
    })
    setTimeout(function () {
      that.setData({
        scrollleft: 10000
      })
    }, 500)
  },
  bindsubcateclick(e) {
    var that = this;
    var cateid = e.currentTarget.dataset.cateid;
    var paraentid = e.currentTarget.dataset.paraentid;
    var d = that.data.leftsubs;
    d.forEach(function (e) {
      if (e.CategoryId == paraentid) {
        e.subs.forEach(function (f) {
          if (f.CategoryId == cateid) {
            f.selected = true
          } else f.selected = false
        })
      } else if (e.subs && e.subs.length > 0) {
        e.subs.forEach(function (f) {
          f.selected = false;
        })
      }
    })
    that.setData({
      PageIndex: 1,
      CategoryId: cateid,
      leftsubs: d,
      categorys: [],

    });
    that.loadData({}, !1);
    var allcategorys = that.data.allcategorys;
    var d = allcategorys.filter(function (p) {
      return p.ParentCategoryId == cateid;
    })
    var info = allcategorys.filter(function (p) {
      return p.CategoryId == cateid;
    })[0]
    var infoparent = allcategorys.filter(function (p) {
      return p.CategoryId == paraentid;
    })[0]
    var f = that.data.categorys;
    if (f.length > 2) {
      f[1] = infoparent;
    } else
      f.push(infoparent);
    info.isselected = true;
    var remoindex = -1
    f.forEach(function (p, index) {
      p.isselected = false;
      if (p.Depth == info.Depth) {
        remoindex = index
      }
      if (p.CategoryId == paraentid) {
        p.selectcate = cateid;
      }
    })
    if (remoindex > -1) {
      f[remoindex] = info;
      f.splice(remoindex + 1, 10)
    } else f.push(info);

    var catetext = '';
    f.forEach(function (p) {
      catetext += p.Name + ','
    })
    that.setData({
      subs: d,
      categorys: f,
      catetext: catetext,
      scrollleft: 1000,
      showcate: true
    })

  },
  bindtagclick(e) {
    var that = this;
    var tagid = e.currentTarget.dataset.tagid;
    var taglist = that.data.taglist;
    taglist.forEach(function (p) {
      p.isselected = p.TagID == tagid
    })
    that.setData({
      TagIds: tagid + '_',
      taglist: taglist,
      PageIndex: 1
    })
    that.loadData({}, !1);
  },
  bindcateclick(e) {
    var that = this;
    var cateid = e.currentTarget.dataset.cateid;
    that.setData({
      PageIndex: 1,
      CategoryId: cateid
    });
    that.loadData({}, !1);
    var parentid = e.currentTarget.dataset.paraentid;
    var allcategorys = that.data.allcategorys;
    var d = allcategorys.filter(function (p) {
      return p.ParentCategoryId == cateid;
    })
    d.forEach(function (p) {
      p.selected = false;
    })
    var subs = that.data.leftsubs;
    subs.forEach(function (p) {
      if (p.CategoryId == cateid && (p.subs == undefined || p.subs.length == 0)) {
        p.subs = d;
      } else if (p.CategoryId == cateid) {
        p.subs = undefined;
      }
    })
    if (cateid == -1) {
      subs.forEach(function (p) {
        if (p.subs && p.subs.length > 0) {
          p.subs.forEach(function (f) {
            f.selected = false;
          })
        }
      })
      var subs_1 = allcategorys.filter(function (p) {
        return p.Depth == 1;
      })
      that.setData({
        categorys: [],
        subs: subs_1
      })
    }
    that.setData({
      leftsubs: subs
    })
  },
  // 切换显示方式
  changeCss: function () {
    var that = this;
    if (that.data.cssIndex == 1) {
      that.setData({
        cssIndex: 2
      })
    } else if (that.data.cssIndex == 2) {
      that.setData({
        cssIndex: 3
      })
    } else {
      that.setData({
        cssIndex: 1
      })
    }
  },
  openShare: function () {
    this.setData({
      openShare: !this.data.openShare
    })
    var that = this;
    if (that.data.selectproducts.length > 0) {
      var ids = '';
      that.data.selectproducts.forEach(function (p) {
        ids += p.ProductId + ',';
      })
      t.getOpenId(function (o) {
        wx.request({
          url: t.getUrl('AddShareInfo'),
          data: {
            openId: o,
            ids: ids
          },
          success(res) {
            if (res.data.code == 0) {
              that.formSubmit(res.data.data);
            } else {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false
              })
            }
          }
        })
      })
    }
  },
  manyShare: function (e) {
    var productid = e.currentTarget.dataset.productid;
    var t = this;
    var p = t.data.ProductList;
    var selectproducts = [];
    p.forEach(function (a) {
      if (a.ProductId == productid) {
        a.Selected = !a.Selected;
      }
      if (a.Selected) {
        selectproducts.push(a);
      }
    })
    t.setData({
      ProductList: p,
      selectproducts: selectproducts
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    this.setData({
      Tagindex: Index,
      selectShow: !this.data.selectShow
    });
  }
});