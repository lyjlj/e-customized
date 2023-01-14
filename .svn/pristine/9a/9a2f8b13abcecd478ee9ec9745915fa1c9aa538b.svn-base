var app = getApp(),e=getApp();

Page({
    data: {
        ExpressCompanyName: "",
        ShipOrderNumber: "",
        ShipTo: "",
        CellPhone: "",
        Address: "",
        LogisticsData: null
    },
    onLoad: function(a) {
        var o = this, s = a.orderid;
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("GetLogistic"),
                data: {
                    openId: a,
                    orderId: s
                },
                success: function(e) {
                    var s1=JSON.parse(e.data.Data.LogisticsData);                    
                    var LogisticsData;
                    var openshowapi=app.globalData.siteInfo.AllSiteInfo.OpenShowApi;//是否开启showapi
                    if(openshowapi){
                        LogisticsData=s1.apiResultData;//通用接口
                    }else{
                         s1=JSON.parse(s1.apiResultData);
                        LogisticsData=s1.msgData.routeResps[0].routes.reverse();//顺丰快递接口
                    }
                    if ("OK" == e.data.Status) {
                        var a = e.data.Data, s = JSON.parse(a.LogisticsData);
                        o.setData({
                            ExpressCompanyName: a.ExpressCompanyName,
                            ShipOrderNumber: a.ShipOrderNumber,
                            ShipTo: a.ShipTo,
                            CellPhone: a.CellPhone,
                            Address: a.Address,
                            LogisticsData: LogisticsData
                        });
                    } else "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});