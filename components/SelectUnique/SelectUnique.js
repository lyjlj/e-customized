var app = getApp();
Component({
  properties: {
    skuid: {
      type: String
    },
    productid: {
      type: String
    }
  },
  data: {
    DefaultColor: "",
    UniqueItems: []
  },
  pageLifetimes: {
    show: function() {},
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  methods: {
    loadUniueItem: function() {
      var that = this;
      var skuid = that.data.skuid;
      var productid = that.data.productid;
      app.getOpenId(function(a) {
        wx.request({
          url: app.getUrl("GetProductUniqueItems"),
          data: {
            skuid: skuid,
            producid: productid,
            openId: a
          },
          success: function(t) {
            if (wx.hideLoading(), 0 == t.data.code) {
              var items = t.data.data.filter(function (p) {
                  return p.ItemStock>0;
              });
              items.forEach(o => {
                o.ContentItems = o.UniqueContent.split('|');
                o.citems=[];
                o.ContentItems.forEach(d => {
                  var si = d.split(':');
                  if (si.length == 2)
                    o.citems.push({
                      name: si[0],
                      value: si[1]
                    });
                });
              });
              that.setData({
                UniqueItems: items
              });
            }
          },
          complete: function() {}
        });
      });
    },
    initData: function() {
      this.setData({
        DefaultColor: app.globalData.siteInfo.DefaultColor,
        UniqueItems:[]
      });
      this.loadUniueItem();
    },
    addcart: function(e) {
      var that = this;
      var uniqueCode = e.currentTarget.dataset.uniquecode;
      var uniqueItems = that.data.UniqueItems;
      var item = uniqueItems.find(o => o.UniqueProductCode == uniqueCode);
      var skuid = item.SkuId;
      var quantity = item.Quantity > 0 ? -1 : 1;
      item.Quantity = quantity;
      app.getOpenId(function(n) {
        wx.request({
          url: app.getUrl("addToCart"),
          data: {
            openId: n,
            SkuID: skuid,
            uniqueCode: uniqueCode,
            quantity: quantity
          },
          success: function(t) {
            if ("OK" == t.data.Status) {
              that.setData({
                UniqueItems: uniqueItems
              })
              that.triggerEvent('callbackfun', {
                quantity: quantity,
                uniqueCode: uniqueCode,
                skuid: skuid
              })
              wx.showToast({
                title: quantity > 0 ? '加购物车成功' : '移出购物车成功'
              })
            } else wx.showModal({
              title: "提示",
              content: t.data.ErrorResponse.ErrorMsg,
              showCancel: !1,
              success: function(t) {}
            });
          }
        });
      });
    },
  }
})