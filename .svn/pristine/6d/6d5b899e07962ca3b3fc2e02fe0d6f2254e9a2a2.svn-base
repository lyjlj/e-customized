var t = getApp();

Page({
    data: {
        isEmpty: !0,
        Status: 0,
        current:0,
        scrollLeft:0,
        OrderList: null,
        AllActive: "active",
        WaitPayActive: "",
        WaitSendActive: "",
        WaitReceiveActive: "",
        WaitReviewActive: "",
        PageIndex: 1,
        PageSize: 100,
        orderCount:[0,34,1,35,2,3,5],
        nullOrder: t.getRequestUrl + "/Templates/xcxshop/images/nullOrder.png",
        DefaultColor:"",
    },
    onLoad: function(l) {
      console.log(l);
      var that=this;
       t.getUserInfo();
      t.getSiteInfo(function () {
        var e = l.status;
        "" != l.status && void 0 != l.status || (e = 0), that.setData({
          Status: e,
          scrollLeft:e*150,
          DefaultColor: t.globalData.siteInfo.DefaultColor
        });
       });
        
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.setData({
            PageIndex: 1,
            OrderList: []
        }), t.loadData(t.data.Status, t, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this, e = t.data.PageIndex + 1;
        t.setData({
            PageIndex: e
        }), t.loadData(t.data.Status, t, !0);
    },
    closeOrder: function(e) {
        var a = this, i = e.target.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
            success: function(e) {
                e.confirm && t.getOpenId(function(e) {
                    wx.request({
                        url: t.getUrl("CloseOrder"),
                        data: {
                            openId: e,
                            orderId: i
                        },
                        success: function(t) {
                            "OK" == t.data.Status ? wx.showModal({
                                title: "提示",
                                content: t.data.Message,
                                showCancel: !1,
                                success: function(t) {
                                    t.confirm && wx.navigateTo({
                                        url: "../orderlist/orderlist?status=" + a.data.Status
                                    });
                                }
                            }) : "NOUser" == t.data.Message ? wx.navigateTo({
                                url: "../login/login"
                            }) : wx.showModal({
                                title: "提示",
                                content: t.data.Message,
                                showCancel: !1
                            });
                        }
                    });
                });
            }
        });
    },
    orderPay: function(e) {
        var a = this, i = e.currentTarget.dataset.orderid;
        t.orderPay(i, a.data.Status, !0);
    },
    orderFinish: function(e) {
        var a = this, i = e.currentTarget.dataset.orderid;
        wx.redirectTo({
          url: '/pages/confirmsign/confirmsign?orderid='+i
        })
        return false;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl("FinishOrder"),
                data: {
                    openId: e,
                    orderId: i
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showModal({
                        title: "提示",
                        content: "订单已完成！",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=" + a.data.Status
                            });
                        }
                    }) : "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.Message,
                        showCancel: !1
                    });
                }
            });
        });
    },
    toproduct: function(t) {
        wx.switchTab({
            url: "../productcategory/productcategory"
        });
    },
    onTabClick: function(t) {
        var e = this, a = t.currentTarget.dataset.status;      
        var index=0;
        e.data.orderCount.forEach(function(p,i){
            if(p==a){
                index=i;
            }
        })
        e.setData({
            PageIndex: 1,
            Status:a,
            current:index
        }), e.loadData(a, e, !1);
    },
    showLogistics: function(e) {
        var a = e.currentTarget.dataset.orderid;
        e.currentTarget.dataset.isshowdadalogistics ? wx.navigateTo({
            url: "../outurl/outurl?url=" + encodeURIComponent(t.getRequestUrl + "/AppDepot/OrderLogistics?orderid=" + a)
        }) : wx.navigateTo({
            url: "../logistics/logistics?orderid=" + a
        });
    },
    showReview: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../comment/comment?id=" + e
        });
    },
    goToOrderDetail: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderdetails/orderdetails?orderid=" + e
        });
    },
    RefundOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.money;
        wx.navigateTo({
            url: "../ApplyRefund/ApplyRefund?orderid=" + e + "&&m=" + a
        });
    },
    ReturnsOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.skuId, i = t.currentTarget.dataset.skuname, r = t.currentTarget.dataset.num, n = t.currentTarget.dataset.money;
        wx.navigateTo({
            url: "../ApplyReturns/ApplyReturns?orderid=" + e + "&&skuId=" + a + "&&pro=" + i + "&&num=" + r + "&&m=" + n
        });
    },
    swiperchange(d){       
        var that=this;
        var status=that.data.orderCount[d.detail.current];
        that.setData({
            Status:status,
            pageIndex:1,
            scrollLeft:d.detail.current*150
        })
        that.loadData(status,that,false);
    },
    loadData: function(e, a, i) {
        wx.showLoading({
            title: "加载中"
        }), this.pageActive(e, a), t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl("OrderList"),
                data: {
                    openId: r,
                    status: e,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                      console.log(t);
                        var r = t.data.Data;
                        if (i) {
                            var n = a.data.OrderList;
                            n.push.apply(n, r), a.setData({
                                OrderList: n
                            });
                        } else {
                            var s = r.length > 0;
                            a.setData({
                                Status: e,
                                OrderList: r,
                                isEmpty: s
                            });
                        }
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
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
    pageActive: function(t, e) {
       
    },
    copyOrder:function(t){
      var order = t.currentTarget.dataset.order;
      var skuids='';
      order.LineItems.forEach(function(v){
        skuids += skuids ? (',' + v.Id):v.Id
      });
      this.addToCart(skuids);
    //   wx.navigateTo({
    //     url: "../submitorder/submitorder?productsku=" + skuids + "&buyamount=1&frompage=signbuy"
    //   });
    },

    
    addToCart: function(skuids) {
        var u = this;
        t.getOpenId(function(n) {        
          var quantity=1;
          wx.request({
            url: t.getUrl("addToCart"),
            data: {
              openId: n,
              SkuID: skuids,
              Quantity: quantity,
              Remark:'再次加购'
            },
            success: function(t) {
              if ("OK" == t.data.Status) {               
                wx.showModal({
                  title: '已添加到购物车！',
                  showCancel:false,
                  success(){
                    wx.switchTab({
                        url: '../shopcart/shopcart',
                      })
                  }
                });               
              
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
    confirmSettle:function(t){
        var order = t.currentTarget.dataset.order;
        wx.navigateTo({
          url: "../SettleDetail/SettleDetail?id=" + order.OrderId
        });
      },
      LoadMore:function(t){
        var orderid = t.currentTarget.dataset.orderid;
        var that=this;      
        var o=that.data.OrderList;
        o.forEach(function(p){
            if(p.OrderId==orderid)
            {
                p.LoadMore=!p.LoadMore;
            }
        })      
        that.setData({
            OrderList:o
        })
      }
});