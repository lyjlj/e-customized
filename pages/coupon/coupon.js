var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        isEmpty: !0,
        pageIndex: 0,
        couponType: 1,
        couponsList: [],
        refreshSuccess: !0,
        counpimg: a.getRequestUrl + "/Templates/xcxshop/images/counp-background.jpg",
        use_counpimg: a.getRequestUrl + "/Templates/xcxshop/images/use_counp.png",
        over_counpimg: a.getRequestUrl + "/Templates/xcxshop/images/over_counp.png",
        nullCounp: a.getRequestUrl + "/Templates/xcxshop/images/coupon_null.png",
        showqrcode:false
    },
    onLoad: function(o) {
        var t = this;
        a.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), e.httpGet(a.getUrl(a.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    getCouponsData: function(e) {
        var a = this;
        if ("NOUser" == e.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == e.Status) {
            var o = a.data.couponsList;
            if (e.Data.length > 0) {
                for (var t = 0; t < e.Data.length; t++) {
                    var n = (i = e.Data[t]).StartTime.substring(0, 10).replace(/\-/g, "."), p = i.ClosingTime.substring(0, 10).replace(/\-/g, "."), s = "";
                    s = i.CanUseProducts && i.CanUseProducts.length > 0 ? "部分商品可用" : "全场通用";
                    var g = "";
                    g = i.OrderUseLimit > 0 ? "订单满" + i.OrderUseLimit.toFixed(2) + "元可用" : "订单金额无限制";
                    var i = {
                        couponsDate: n + "~" + p,
                        couponsPrice: i.Price,
                        couponsName: i.CouponName,
                        couponsCanUseProductse: s,
                        LimitText: g,
                        couponsId: i.CouponId,
                        UserId:i.UserId,
                        ClaimCode:i.ClaimCode,
                        Remark:i.Remark
                    };
                    o.push(i);
                }
                a.setData({
                    pageIndex: a.data.pageIndex + 1,
                    couponsList: o
                });
            }
            a.setData({
                refreshSuccess: !0,
                isEmpty:a.data.couponsList.length==0
            }), wx.hideNavigationBarLoading();
        } else a.setData({
            isEmpty: a.data.couponsList.length==0
        }), wx.hideNavigationBarLoading();
    },
    bingNoUseTap: function(o) {
        var t = this;
        t.setData({
            pageIndex: 0,
            couponType: 1,
            couponsList: []
        }), a.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), e.httpGet(a.getUrl(a.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    binghasUseTap: function(o) {
        var t = this;
        t.setData({
            pageIndex: 0,
            couponType: 2,
            couponsList: []
        }), a.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), e.httpGet(a.getUrl(a.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    bingExpiredTap: function(o) {
        var t = this;
        t.setData({
            pageIndex: 0,
            couponType: 3,
            couponsList: []
        }), a.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), e.httpGet(a.getUrl(a.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    onReachBottom: function() {
        var o = this;
        if (1 == o.data.refreshSuccess) {
            var t = o.data.pageIndex + 1;
            a.getOpenId(function(n) {
                var p = {
                    openId: n,
                    pageIndex: t,
                    pageSize: 10,
                    couponType: o.data.couponType
                };
                wx.showNavigationBarLoading(), o.setData({
                    refreshSuccess: !1
                }), e.httpGet(a.getUrl(a.globalData.loadCoupon), p, o.getCouponsData);
            });
        }
    },
    
    giveQrcode:function(e){
        var t=this;
        var claimcode= e.currentTarget.dataset.claimcode;
        var coupon= t.data.couponsList.filter(function(p){
            return p.ClaimCode==claimcode;
        })
        if(coupon.length>0){
           a.getOpenId(function(o){
            wx.request({
                url: a.getUrl('CreateCouponUseGive'),
                data:{
                  ClaimCode:coupon[0].ClaimCode,
                  openId:o
                },
                success(res){
                 console.log(res);
                 wx.request({
                    url: a.getUrl("GetWxCode"),
                    data: {
                      scene:  (coupon[0].couponsId+'')+(coupon[0].UserId+'')+(coupon[0].couponsId+'').length+'',
                      openId:o,
                      page: 'pages/coupondetail/coupondetail'
                    },
                    success: function (e) {
                        t.setData({
                            couponqrcode:e.data.url,
                            showqrcode:true
                        })

                    }
                  });
                }
              })
           })
        }
    },
    showQrcode:function(e){
        var t=this;
        var claimcode= e.currentTarget.dataset.claimcode;
        var coupon= t.data.couponsList.filter(function(p){
            return p.ClaimCode==claimcode;
        })
        if(coupon.length>0){
           
            wx.request({
                url: a.getUrl('GetCouponCodeImg'),
                data:{
                  ClaimCode:(coupon[0].couponsId+'')+(coupon[0].UserId+'')+(coupon[0].couponsId+'').length+''
                },
                success(res){
                  t.setData({
                      couponqrcode:'data:image/png;base64,'+res.data.data,
                      showqrcode:true
                  })
                }
              })
        }
     
       
    },
    saveImage: function (e) {
        let url = e.currentTarget.dataset.url;
        wx.showModal({
            title:'提示',
          content:'确定保存图片吗？',
          success(res){
              if(res.confirm){
                wx.downloadFile({
                    url: url,
                    success(res){
                        if(res.statusCode === 200){                
                          wx.saveImageToPhotosAlbum({
                              filePath: res.tempFilePath,
                              success(res) {
                              },
                              fail(res) {                       
                              }
                          })
                        }
                    }
                  })
              }
          }
        }) 

    },
    hideqrcode:function(){
        var t=this;
        t.setData({
          showqrcode:false
        })
      }
});