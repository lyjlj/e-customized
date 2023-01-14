var t = getApp();
var app = t;
Page({
  data: {
    ProductList: null,
    ProductTotal: 0,
    ProductList2: null,
    ProductTotal2: 0,
    SortBy: "",
    SortOrder: "asc",
    KeyWord: "",
    CategoryId: "",
    PageIndex: 1,
    PageSize: 10,
    Num: 0,
    SortClass: "",
    CurrentProduct: null,
    CurrentSku: null,
    SortBy2: "",
    SortOrder2: "asc",
    KeyWord2: "",
    CategoryId2: "",
    PageIndex2: 1,
    PageSize2: 30,
    Num2: 0,
    SortClass2: "",
    CurrentProduct2: null,
    CurrentSku2: null,
    selectedSkuContent: null,
    isShowSkuSelectBox: !1,
    index: 0,
    TotalNum: 0,
    ShowCartIcon: !0,
    filter: null,
    filters: [],
    ShowAllFilters: false,
    ShowAllFilters2: false,
    filter2: null,
    filters2: [],
    currentTab: 0,
    navScrollLeft: 0,
    selectedRing: '',
    selectedStore: '',
    MinSalePrice: '',
    MaxSalePrice: '',
    MinWeight: '',
    MaxWeight: '',
    MinSalePrice2: '',
    MaxSalePrice2: '',
    Remark: '',
    selectprice: [
      '0-3000', '3001-6000', '6001-10000', '10001-15000', '15001-20000', '20001-30000', '30001-50000', '50001-80000', '80001以上'
    ],
    selectweight:['0.30-0.39','0.40-0.49','0.50-0.59','0.60-0.69','0.70-0.79','0.80-0.99','1.00-1.45','1.50-1.99','2.00-9.99','10.00以上'],
    openprice:true,
    openweight:true,
    selectTab:-1
  },
  selectTab:function(){
    var t=this;
    var tab=t.data.selectTab;
    if(tab==0){
      t.setTab(0);
    }else if(tab==1){
        t.setTab(1);
        t.loadData2(t, !1);
  }
  },
  onLoad: function (t) {
    var r = this;
    r.setData(t);
    if (t && t.selectedRing) {
      r.setData({
        selectedRing: t.selectedRing
      })
    }
    if (t && t.index && t.index <= 2)
      r.setTab(t.index);
    if (t && t.selectedStore) {
      r.setData({
        selectedStore: t.selectedStore
      })
    }
    if (r.data.selectedRing && r.data.selectedStore)
    {
      r.setTab(2);
      r.setData({
        selectTab:-1
      })
    }
    
    else if (r.data.selectedRing && !r.data.selectedStore) {
      r.setData({
        selectTab:1
      })
      r.setTab(2);
      // r.setTab(1);
      // r.loadData2(r, !1);
    } else if (r.data.selectedStore && !r.data.selectedRing)
    {
      r.setData({
        selectTab:0
      })
      r.setTab(2);
      //r.setTab(0);

    }
     

    app.getSiteInfo(function (s) {
      r.setData({
        DefaultColor: s.DefaultColor,
        SecondColor: s.SecondColor
      });
      if (!r.data.ProductList) {
        r.loadData(r, !1);
        r.GetFilterType();
      }
      app.getUserInfo();
    });
  },
  onReady: function () {},
  onShow: function () {
    var MemberGrades=app.globalData.siteInfo.MemberGrades;
    var Discount=MemberGrades[MemberGrades.length-1].Discount/100;
    this.setData({
      Discount:Discount
    })
     var that=this; 
     wx.getSystemInfo({
       success (res) {         
         var screenHeight = res.screenHeight
         var bottom = res.safeArea.bottom        
         that.setData({
           SystemBottom:screenHeight-bottom
         })
       }
     })
  },
  onHide: function () {},
  onUnload: function () {},
  onSearch: function (t) {
    var a = this;
    a.setData({
      PageIndex: 1
    }), a.loadData(a, !1);
  },
  onReachBottom: function () {
    var t = this,
      a = t.data.PageIndex + 1;
    t.setData({
      PageIndex: a
    }), t.loadData(t, !0);
  },
  onReachBottom2: function () {
    var t = this,
      a = t.data.PageIndex2 + 1;
    t.setData({
      PageIndex2: a
    }), t.loadData2(t, !0);
  },
  bindKeyWordInput: function (t) {
    this.setData({
      KeyWord: t.detail.value
    });
  },
  bindKeyWordInput2: function (t) {
    this.setData({
      KeyWord2: t.detail.value
    });
  },
  bindMinSalePriceInput: function (t) {
    this.setData({
      MinSalePrice: t.detail.value
    });
  },
  bindMaxSalePriceInput: function (t) {
    this.setData({
      MaxSalePrice: t.detail.value
    });
  },
  bindMinSalePriceInput2: function (t) {
    this.setData({
      MinSalePrice2: t.detail.value
    });
  },
  bindMaxSalePriceInput2: function (t) {
    this.setData({
      MaxSalePrice2: t.detail.value
    });
  },
  bindMinWeightInput: function (t) {
    this.setData({
      MinWeight: t.detail.value
    });
  },
  bindMaxWeightInput: function (t) {
    this.setData({
      MaxWeight: t.detail.value
    });
  },
  onConfirmSearch: function (t) {
    var a = this,
      e = t.detail.value;
    a.setData({
      KeyWord: e,
      PageIndex: 1
    }), a.loadData(a, !1);
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
    }), a.loadData(a, !1);
  },
  onSortClick2: function (t) {
    var a = this,
      e = t.target.dataset.sortby,
      r = t.currentTarget.dataset.num,
      u = "asc",
      n = "shengxu";
    a.data.SortOrder2 == u && (u = "desc", n = "jiangxu"), a.setData({
      PageIndex2: 1,
      SortBy2: e,
      SortOrder2: u,
      Num2: r,
      SortClass2: n
    }), a.loadData2(a, !1);
  },
  goToProductDetail: function (t) {
    var that = this;
    var a = t.currentTarget.dataset.productid,
      r = "../ProductCustomDetail/ProductCustomDetail?id=" + a + "&selectedRing=" + that.data.selectedRing + "&selectedStore=" + that.data.selectedStore;
    wx.navigateTo({
      url: r
    });
  },
  loadData: function (a, e) {
    wx.showLoading(), t.getOpenId(function (r) {
      var data = {
        openId: r,
        productLine: 1,
        keyword: a.data.KeyWord,
        cId: a.data.CategoryId,
        pageIndex: a.data.PageIndex,
        pageSize: a.data.PageSize,
        sortBy: a.data.SortBy,
        sortOrder: a.data.SortOrder,
        minSalePrice: a.data.MinSalePrice,
        maxSalePrice: a.data.MaxSalePrice
      };
      var filter = a.data.filter;
      for (var obj in filter) {
        if (filter[obj])
          data[obj] = filter[obj];
      };
      wx.request({
        url: t.getUrl("GetProducts"),
        data: data,
        success: function (t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            if (e) {
              var u = a.data.ProductList;
              u.push.apply(u, r), a.setData({
                ProductList: u,
                ProductTotal: t.data.Count
              });
            } else a.setData({
              ProductList: r,
              ProductTotal: t.data.Count
            });
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
        complete: function () {
          wx.hideLoading();
        }
      });
    });
  },
  loadData2: function (a, e) {
    wx.showLoading(), t.getOpenId(function (r) {
      var data = {
        openId: r,
        productLine: 2,
        keyword: a.data.KeyWord2,
        cId: a.data.CategoryId2,
        pageIndex: a.data.PageIndex2,
        pageSize: a.data.PageSize2,
        sortBy: a.data.SortBy2,
        sortOrder: a.data.SortOrder2,
        minSalePrice: a.data.MinSalePrice2,
        maxSalePrice: a.data.MaxSalePrice2,
        minWeight: a.data.MinWeight,
        maxWeight: a.data.MaxWeight
      };

      var filter = a.data.filter2;
      for (var obj in filter) {
        if (filter[obj])
          data[obj] = filter[obj];
      };
      wx.request({
        url: t.getUrl("GetCustomProducts"),
        data: data,
        success: function (t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            if (e) {
              var u = a.data.ProductList2;
              u.push.apply(u, r), a.setData({
                ProductList2: u,
                ProductTotal2: t.data.Count
              });
            } else a.setData({
              ProductList2: r,
              ProductTotal2: t.data.Count
            });
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
        complete: function () {
          wx.hideLoading();
        }
      });
    });
  },

  findProductById: function (t) {
    return this.data.ProductList.find(function (a) {
      return a.ProductId == t;
    });
  },
  setProductCartQuantity: function (t, a, e) {
    var r = this,
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
    if (u) {
      var o = {
        ProductList: n
      };
      r.setData(o);
    }
  },
  setSkuCartQuantity: function (t, a, e) {
    var r = this,
      u = !1,
      n = r.data.CurrentProduct;
    if (n && n.Skus) {
      var d = n.Skus.find(function (a) {
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
  catchAddCart: function (a) {
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
      }), t.getOpenId(function (a) {
        wx.request({
          url: t.getUrl("GetProductSkus"),
          data: {
            ProductId: u,
            openId: a
          },
          success: function (t) {
            if (wx.hideLoading(), "OK" == t.data.Status) {
              var a = t.data.Data,
                r = a.DefaultSku,
                u = [];
              null != a && a.SkuItems.forEach(function (t, a, e) {
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
          complete: function () {}
        });
      });
    } else wx.navigateTo({
      url: "../countdowndetail/countdowndetail?id=" + r.dataset.activeid
    });
  },
  onSkuClick: function (t) {
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
      this.data.CurrentProduct.Skus.forEach(function (t, e, r) {
        for (var u = !0, n = 0; n < o.length; n++) - 1 == t.SkuId.indexOf("_" + o[n].ValueId) && (u = !1);
        if (u && c.length == o.length) return S = t, l = t.SkuId, void(a.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
      });
      var I = a.data.CurrentProduct.Skus;
      this.data.CurrentProduct.SkuItems.forEach(function (t, a) {
        if (t.AttributeId != n) {
          for (var e = [], r = 0; r < o.length; r++) void 0 != o[r] && t.AttributeId != o[r].attributeid && e.push(o[r]);
          t.AttributeValue.forEach(function (t, a) {
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
  addToCart: function (a, e, r) {
    var u = this;
    !e || e.lenght < 1 ? wx.showModal({
      title: "提示",
      content: "请选择规格",
      showCancel: !1
    }) : t.getOpenId(function (n) {
      wx.request({
        url: t.getUrl("addToCart"),
        data: {
          openId: n,
          SkuID: e,
          Quantity: r
        },
        success: function (t) {
          if ("OK" == t.data.Status) {
            u.setProductCartQuantity(a, r, "+"), u.setSkuCartQuantity(e, r, "+");
            var n = parseInt(u.data.TotalNum);
            u.setData({
              TotalNum: n + parseInt(r)
            });
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
  },
  hideSkuDOM: function () {
    this.setData({
      isShowSkuSelectBox: !1,
      ShowCartIcon: !0
    });
  },
  showSkuDOM: function () {
    this.setData({
      isShowSkuSelectBox: !0,
      ShowCartIcon: !1
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
  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    that.setTab(cur);
    if (cur == 0 && that.data.filters.length == 0) {
      that.GetFilterType();
      that.loadData(that, !1);
    }
    if (cur == 1 && that.data.filters2.length == 0) {
      that.GetFilterType2();
      that.loadData2(that, !1);
    }
    if (cur == 2) {
      that.LoadCartInfo();
    }
  },

  switchTab(event) {
    var that = this;
    var cur = event.detail.current;
    that.setTab(cur);
    if (cur == 0 && that.data.filters.length == 0) {
      that.GetFilterType();
      that.loadData(that, !1);
    }
    if (cur == 1 && that.data.filters2.length == 0) {
      that.GetFilterType2();
      that.loadData2(that, !1);
    }
    if (cur == 2) {
      that.LoadCartInfo();
    }
  },
  GetFilterType: function (filterParam) {
    var that = this;
    wx.request({
      url: app.getUrl("GetFilterAttributes"),
      data: {
        productline: 1
      },
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
  resetFilter: function () {
    this.setData({
      MinSalePrice: '',
      MaxSalePrice: '',
      KeyWord: ''
    });
    this.GetFilterType();
  },
  GetFilterType2: function (filterParam) {
    var that = this;
    wx.request({
      url: app.getUrl("GetFilterAttributes"),
      data: {
        productline: 2
      },
      success: function (a) {
        if (0 == a.data.code) {
          var e = a.data.data;
          that.setData({
            filters2: e,
          });
        }
      }
    });
  },
  resetFilter2: function () {
    this.setData({
      MinSalePrice2: '',
      MaxSalePrice2: '',
      KeyWord2: '',
      MinWeight: '',
      MaxWeight: ''
    });
    this.GetFilterType2();
  },
  selectFilterValue: function (e) {
    var that = this;
    var valueid = e.currentTarget.dataset.valueid;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var ischeck = e.currentTarget.dataset.ischeck;
    var filters = that.data.filters;
    filters[fidx][aidx].AttributeValues.forEach(function (v) {
      if (v.ValueId == valueid) v.IsCheck = !ischeck
    });
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
  },
  selectFilterValue2: function (e) {
    var that = this;
    var valueid = e.currentTarget.dataset.valueid;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var ischeck = e.currentTarget.dataset.ischeck;
    var filters = that.data.filters2;
    filters[fidx][aidx].AttributeValues.forEach(function (v) {
      if (v.ValueId == valueid) v.IsCheck = !ischeck
    });

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
      filters2: filters,
      filter2: data
    });
  },
  bindShowAllFilters: function () {
    this.setData({
      ShowAllFilters: !this.data.ShowAllFilters
    });
  },
  bindShowAllFilters2: function () {
    this.setData({
      ShowAllFilters2: !this.data.ShowAllFilters2
    });
  },
  confimFilter: function () {
    this.setData({
      PageIndex: 1
    });
    this.loadData(this, !1);
  },
  confimFilter2: function () {
    this.setData({
      PageIndex2: 1
    });
    this.loadData2(this, !1);
  },
  LoadCartInfo: function () {
    var that = this;
    var skuid = that.data.selectedRing + (that.data.selectedRing&& that.data.selectedStore? ',':'') + that.data.selectedStore;
    t.getOpenId(function (r) {
      wx.request({
        url: app.getUrl("GetSkuDetail"),
        data: {
          openid: r,
          skuid: skuid
        },
        success: function (e) {
          if ("OK" == e.data.Status) {
            var a = e.data.Data;
            that.setData({
              CartInfo: a
            })
          } else {
            that.setData({
              CartInfo: {}
            })
          }
        }
      });
    });
  },
  bindAddCart: function () {
    var that = this;
    var skuid =that.data.selectedRing + (that.data.selectedRing&& that.data.selectedStore? ',':'') + that.data.selectedStore;
    t.getOpenId(function (r) {
      wx.request({
        url: app.getUrl("addToCart"),
        data: {
          openid: r,
          skuid: skuid,
          remark: that.data.Remark,
          IsCustom: true
        },
        success: function (e) {
          if ("OK" == e.data.Status) {
            that.setData({
              selectedRing: '',
              selectedStore: '',
              Remark: ''
            });
            app.ShopCartIndex = 1;
            wx.switchTab({
              url: '../shopcart/shopcart',
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '',
            })
          }
        }
      });
    });
  },
  bindResetCustom: function (e) {
    var productline = e.currentTarget.dataset.productline;
    if (productline == 1) {
      this.setTab(0);
    } else if (productline == 2) {
      this.setTab(1);
      this.loadData2(this, !1);
    }
  },
  bindRemark: function (t) {
    this.setData({
      Remark: t.detail.value
    });
  },
  // 1.查询菜单栏距离文档顶部的距离menuTop
  initClientRect: function () {
    var that = this;
    var query = wx.createSelectorQuery()
    query.select('#affix').boundingClientRect()
    query.exec(function (res) {
      that.setData({
        menuFixed: res[0].top < 60
      })
    })
  },
  // 2.监听页面滚动距离scrollTop
  storeScroll: function (scroll) {
    var that = this;
    that.initClientRect();
  },
  openprice(){
    var open=this.data.openprice
    if(open){
      this.setData({
        openprice:false
      })
    }else{
      this.setData({
        openprice:true
      })
    }
  },
  selectprice(e){
    var that=this;
    var value=e.currentTarget.dataset.value;
    if(value.indexOf('-')!=-1){
      that.setData({
        MinSalePrice2:value.split('-')[0],
        MaxSalePrice2:value.split('-')[1]
      })
    }else{
      that.setData({
        MinSalePrice2:value.split('以上')[0],
        MaxSalePrice2:''
      })
    }
  },
  openweight(){
    var open=this.data.openweight
    if(open){
      this.setData({
        openweight:false
      })
    }else{
      this.setData({
        openweight:true
      })
    }
  },
  selectweight(e){
    var that=this;
    var value=e.currentTarget.dataset.value;
    if(value.indexOf('-')!=-1){
      that.setData({
        MinWeight:value.split('-')[0],
        MaxWeight:value.split('-')[1]
      })
    }else{
      that.setData({
        MinWeight:value.split('以上')[0],
        MaxWeight:''
      })
    }
  }
});