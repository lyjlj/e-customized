var e = require("../../utils/config.js"), t = getApp();

Page({
    data: {
        CouponName: "",
        Price: 0,
        LimitText: "",
        CanUseProducts: "",
        CouponsDate: "",
        CouponId: "",
        coupimg: t.getRequestUrl + "/Templates/xcxshop/images/coupdetail-back.jpg",
        coupimgLine: t.getRequestUrl + "/Templates/xcxshop/images/coup-line.jpg"
    },
    onLoad: function(o) {
        var a = this, n = o.CouponId;     
        var scene=o.scene;
        if(scene){
            var length=scene.substring(scene.length-1,scene.length);
            var couponId=scene.substring(0,length);            
            a.setData({
                CouponId:couponId,
                claimCode:scene
            })
        }else
        {
            a.setData({
                CouponId: n
            });
        }      
        t.getOpenId(function(o) {
            var s = {
                openId: o,
                couponId: a.data.CouponId
            };
            e.httpGet(t.getUrl(t.globalData.loadCouponDetails), s, a.getCouponsData);
        });
    },
    getCouponsData: function(e) {
        var t = this;
        if ("NOUser" == e.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == e.Status) {
            var o = e.Data, a = o.StartTime.substring(0, 10).replace("-", "."), n = o.ClosingTime.substring(0, 10).replace("-", "."), s = "";
            s = o.CanUseProducts && o.CanUseProducts > 0 ? "部分商品可用" : "全场通用";
            var i = "";
            i = o.OrderUseLimit > 0 ? "订单满" + o.OrderUseLimit.toFixed(2) + "元可用" : "订单金额无限制", 
            t.setData({
                CouponName: o.CouponName,
                Price: o.Price,
                LimitText: i,
                CanUseProducts: s,
                CouponsDate: a + "~" + n,
                CouponId: o.CouponId
            });
        } else wx.showModal({
            title: "提示",
            content: result.data.Message,
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    CouponUseGive:function(){
        var that=this;
        t.getOpenId(function(o){
            wx.request({
                url: t.getUrl("CouponUseGive"),
                data: {
                    openId: o,
                    couponId: e,
                    claimCode:that.data.claimCode
                },
                success: function(e) {
                    wx.showModal({
                        title: "提示",
                        content: e.data.msg,
                        showCancel: !1
                    }) 
                }
            });
        })
    },
    GetCoupon: function() {
        var e = this.data.CouponId;
        var that=this;
        "" == e || parseInt(e) <= 0 ? wx.showModal({
            title: "提示",
            content: "领取的优惠券不存在",
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        }) : t.getOpenId(function(o) {
            wx.request({
                url: t.getUrl("UserGetCoupon"),
                data: {
                    openId: o,
                    couponId: e,
                    type:that.data.type
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1
                    }) : "NO" == e.data.Status && ("NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : (that.setData({
                        backShow: "none",
                        couponShow: "none"
                    }), wx.showToast({
                        title: e.data.Message,
                        image: "../../images/warning.png"
                    })));
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});