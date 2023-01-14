var app = getApp();
Component({
  properties: {
    productid: {
      type: String
    }
  },
  data: {
    DefaultColor: "",
    HasSku: false,
    CurrentProduct: {},
    CurrentSku: {},
    selectedskuList: [],
    selectedSku: '',
    showImage:'',
    HasUnique: false,
    SkuValueIds: '',
    AddCartNum:1,
    changeCartnum:0,
    showAttrs:true,
    TotalNum:0
  },
  pageLifetimes: {
    show: function() {
      
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  methods: {
    loadSkuItem: function() {
      var that = this;
      var productid = that.data.productid;
      wx.showLoading({
        title: "商品信息加载中..."
      });
      app.getOpenId(function(a) {
        wx.request({
          url: app.getUrl("GetProductSkus"),
          data: {
            ProductId: productid,
            openId: a
          },
          success: function(t) {
            wx.hideLoading();
            if ("OK" == t.data.Status) {
              var a = t.data.Data,
                r = a.DefaultSku,
                u = [];


             null != a && a.SkuItems.forEach(function (t, a, e) {
                var skuarr = r.SkuId.split('_');
                t.AttributeValue.forEach(function (p) {
                  var g = skuarr.filter(function (i) {
                    return i == p.ValueId;
                  })
                  if (r.SkuId.indexOf('_' + p.ValueId) > -1 && g.length > 0) {
                    p.UseAttributeImage = "selected";
                    var f = new Object();
                    f.ValueId = p.ValueId, f.Value = p.Value, f.attributeid = t.AttributeId,
                      u.push(f);
                  }
                })
              });

              //默认不包含的属性值灰掉
              var selectlist = u;
              var skus = a.Skus;
              a.SkuItems.forEach(function (t, a) {
                for (var e = [], r = 0; r < selectlist.length; r++)
                  void 0 != selectlist[r] && t.AttributeId != selectlist[r].attributeid && e.push(selectlist[r]);
                t.AttributeValue.forEach(function (t, a) {
                  for (var r = 0, u = 0; u < skus.length; u++) {
                    for (var n = e.length, d = 0, skuid = skus[u].SkuId, i = 0; i < e.length; i++)
                      skuid.indexOf("_" + e[i].ValueId) >= 0 && d++;
                    var s = skuid.split('_');
                    var h = s.filter(function (p) {
                      return p == t.ValueId;
                    })
                    skuid.indexOf("_" + t.ValueId) >= 0 && n == d && h.length > 0 && (r = 1);
                  }
                  t.Enable = r;
                });
              });

              var hasUnique = a.Skus.find(o => o.UniqueItemCount > 0) != null;
              that.setData({
                CurrentProduct: a,
                CurrentSku: r,
                selectedskuList: u,
                selectedSku: r.SkuId,
                HasSku: a.HasSku,
                HasUnique: hasUnique,
                SkuValueIds:r.SkuId,
                Attrs:a.Attrs,
                showImage:a.ImageUrl
              });
              that.showSkuDOM();
            }
            else
              wx.showModal({
                title: '提示',
                content: t.data.Message
              })
          },
          complete: function() {}
        });
      });
    },
    initData: function() {
      var that=this;
      app.getSiteInfo(function(){
        that.setData({
          DefaultColor: app.globalData.siteInfo.DefaultColor,
          AddCartNum:app.globalData.siteInfo.AddCartNum,
          TotalNum:app.globalData.siteInfo.AddCartNum,
          siteInfo:app.globalData.siteInfo
        });
        that.loadSkuItem();
      });
      
    },
    addToCart: function() {
      var u = this;
      app.getOpenId(function(n) {
        var quantity=u.data.TotalNum;
        wx.request({
          url: app.getUrl("addToCart"),
          data: {
            openId: n,
            SkuID: u.data.CurrentSku.SkuId,
            Quantity: quantity,
            Remark:u.data.CurrentSku.ProductRemark
          },
          success: function(t) {
            if ("OK" == t.data.Status) {
              var CurrentSku=u.data.CurrentSku;
              CurrentSku.CartQuantity=CurrentSku.CartQuantity+quantity;
              u.setData({changeCartnum:0,CurrentSku:CurrentSku});
              u.triggerEvent('CartQuantity', {
                quantity: quantity,
                productid: u.data.CurrentProduct.ProductId,
                opt: '+'
              })
              if(u.data.siteInfo.AllSiteInfo.ShowBuyButton){
                wx.navigateTo({
                  url: "../submitorder/submitorder?productsku=" + u.data.CurrentSku.SkuId+'&buyamount=1&frompage=signbuy'
                })
              }else{
                wx.showToast({
                  title: quantity > 0 ? '加购物车成功' : '更新成功',
                });
              }
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
    catchAddCart: function(a) {
      var e = this,
        r = a.currentTarget;
      if (!e.data.HasUnique && !e.data.CurrentSku)
        return;
      if (e.data.HasUnique > 0) {
        e.showUniqueDOM();
        return;
      }

      if(e.data.CurrentSku.Stock<5)
        e.data.AddCartNum=1;
      var u = r.dataset.productid,
        n = r.dataset.operator,
        d = parseInt(n + e.data.AddCartNum),
        o = r.dataset.opensku;       
      if (!e.HasSKU || e.HasSKU && "false" == o) {
        var s = r.dataset.sku;
        var m = parseInt(e.data.TotalNum);
        if(m>0||d>0)
        {
          e.setData({
            TotalNum: m + parseInt(d)<=0?1:m + parseInt(d),
            changeCartnum:d
          });         
          e.setSkuCartQuantity(s, d, "+");
        }
           
      }
    },
    changeAmount:function(a){
      var that = this, cartc = a.currentTarget.dataset.cartc;
      var value = parseInt(a.detail.value);
      var q=value-cartc;
      var n = parseInt(that.data.TotalNum);
              that.setData({
                TotalNum: n + parseInt(q),
                changeCartnum:q
              });
              that.setSkuCartQuantity(that.data.CurrentSku.SkuId, q, "+");
    },
    setUniqueCartQuantity: function({
      detail: param
    }) {
      var that = this;
      var e = param.quantity;
      var currentProduct = that.data.CurrentProduct;
      var sku = currentProduct.Skus.find(o => o.SkuId == param.skuid);
      if (e < 0) {
        sku.CartQuantity -= 1;
      } else {
        sku.CartQuantity += 1;
      }
      var curSku = null;
      if (that.data.CurrentSku)
        curSku=that.data.CurrentSku.SkuId == sku.SkuId ? sku : that.data.CurrentSku;
      that.setData({
        CurrentSku: curSku,
        CurrentProduct: currentProduct,
      });
      that.triggerEvent('CartQuantity', {
        quantity: e,
        productid: currentProduct.ProductId,
        opt: '+'
      })
    },
    setSkuCartQuantity: function(t, a, e) {
      return false;
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
    onSkuClick: function(t) {
      var a = this,
        e = t.target.dataset.indexcount,
        r = t.target.id,
        u = t.target.dataset.skuvalue,
        n = t.target.dataset.attributeid,
        img=t.target.dataset.imageurl;
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
      selectlist.forEach(function (v,vi) {
        var enableValue = a.data.CurrentProduct.SkuItems[vi].AttributeValue.find(f=>f.ValueId==v.ValueId);
        if (enableValue&&enableValue.Enable==0)
          v = {
            ValueId: '',
            Value: '',
            attributeid: ''
          };
        if (v.ValueId)
          skuValues += skuValues ? '_' + v.ValueId : v.ValueId;
      });
      //根据SKUID取对应的商品属性     
        wx.request({
          url: app.getUrl("GetProductAttribute"),
          data:{
            skuid:S?S.SkuId:'',
            productid:a.data.productid,
          },
          success(res){
            a.setData({
              Attrs:res.data.data
            })
          }
        })    
      if(img){
        this.setData({
          showImage:img
        })
      }
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
    hideUniqueDOM: function() {
      this.selectComponent('#uniqueFrame').hideFrame();
    },
    showUniqueDOM: function() {
      this.selectComponent('#selectUnique').initData();
      this.selectComponent('#uniqueFrame').showFrame();
    },
    hideSkuDomAndInit: function() {
      this.selectComponent("#showFrame").hideFrame();
      this.hideSkuDOM();
    },
    hideSkuDOM: function() {
      var that = this;
      that.setData({
        HasSku: false,
        CurrentProduct: {},
        CurrentSku: {},
        selectedskuList: [],
        selectedSku: ''
      });
    },
    showSkuDOM: function() {
      this.selectComponent('#showFrame').showFrame();
    },
    showAttr:function(){
      this.setData({showAttrs:!this.data.showAttrs})
    },
    bindRemark:function(e){
      var value=e.detail.value;
      var sku=this.data.CurrentSku;
      sku.ProductRemark=value;
      this.setData({CurrentSku:sku})
    },
    goProductDetail:function(event){
       var id=event.target.dataset.id;
       wx.navigateTo({
         url: '../productdetail/productdetail?id='+id
       })
    },
  }
})