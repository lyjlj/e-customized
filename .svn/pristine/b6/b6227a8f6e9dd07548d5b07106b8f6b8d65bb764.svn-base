var t = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        addressData: [],
        DefaultColor:"",
    },
    onLoad: function(t) {
        this.setData({
          DefaultColor: a.globalData.siteInfo.DefaultColor
        })
        this.initData();
    },
    initData: function() {
        var e = this;
        a.getOpenId(function(i) {
            var s = {
                openId: i
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getUserShippingAddress), s, e.getUserShippingAddressData);
        });
    },
    getUserShippingAddressData: function(t) {
        var a = this;
        "NOUser" == t.Message ? wx.navigateTo({
            url: "../login/login"
        }) : "OK" == t.Status ? (a.setData({
            addressData: t.Data
        }), wx.hideNavigationBarLoading()) : "NO" == t.Status ? (a.setData({
            addressData: []
        }), wx.hideNavigationBarLoading()) : wx.hideNavigationBarLoading();
    },
    getAddressResultData: function(e) {
        var i = this;
        "NOUser" == e.Message ? wx.navigateTo({
            url: "../login/login"
        }) : "OK" == e.Status ? a.getOpenId(function(e) {
            var s = {
                openId: e
            };
            wx.hideNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getUserShippingAddress), s, i.getUserShippingAddressData);
        }) : wx.hideNavigationBarLoading();
    },
    bindRadioAddressChange: function(e) {
        var i = this, s = e.currentTarget.dataset.shippingid;
        a.getOpenId(function(e) {
            var d = {
                openId: e,
                shippingId: s
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.setDefaultShippingAddress), d, i.getAddressResultData);
        });
    },
    bindDeleteAddressTap: function(e) {
        var i = this, s = e.currentTarget.dataset.shippingid;
        wx.showModal({
            title: "确定删除该地址吗？",
            success: function(e) {
                e.confirm && a.getOpenId(function(e) {
                    var d = {
                        openId: e,
                        shippingId: s
                    };
                    wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.delShippingAddress), d, i.getAddressResultData);
                });
            }
        });
    },
    bindEditAddressTap: function(t) {
        var a = t.currentTarget.dataset.shippingid, e = t.currentTarget.dataset.RegionId;
        wx.navigateTo({
            url: "../editaddress/editaddress?extra=&RegionId=" + e + "&shippingid=" + a + "&title=编辑收货地址"
        });
    },
    gotoAddAddress: function() {
        wx.navigateTo({
            url: "../editaddress/editaddress?title=新增收货地址"
        });
    },
    bindAddAddressTap: function(e) {
        var i = this;
        wx.showModal({
            title: "提示",
            content: "是否使用微信收货地址",
            cancelText: "否",
            confirmText: "是",
            success: function(e) {
                e.confirm ? wx.chooseAddress({
                    success: function(e) {
                        e && a.getOpenId(function(s) {
                            var d = {
                                openId: s,
                                shipTo: e.userName,
                                address: e.detailInfo,
                                cellphone: e.telNumber,
                                city: e.cityName,
                                county: e.countyName
                            };
                            t.httpPost(a.getUrl(a.globalData.AddWXChooseAddress), d, function() {
                                i.initData();
                            });
                        });
                    }
                }) : e.cancel && i.gotoAddAddress();
            }
        });
    }
});