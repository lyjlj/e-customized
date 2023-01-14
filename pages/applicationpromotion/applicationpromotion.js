var e = getApp(), t = require("../wxParse/wxParse.js"), o = require("../../utils/config.js");

Page({
    data: {
        isCheck: !1,
        isTip: !0,
        Introduction: null,
        checked: ""
    },
    onLoad: function(o) {
        var n = this;
        o.source && "agreen" == o.source ? n.setData({
            isCheck: !0,
            checked: e.getRequestUrl + "/Templates/xcxshop/images/promotion_checked.png"
        }) : n.setData({
            isCheck: !1
        });
        var a = e.globalData.siteInfo.ReferralIntroduction;
        n.setData({
            conditionMeony: e.globalData.siteInfo.ApplyReferralNeedAmount,
            OpenRecruitmentAgreement: e.globalData.siteInfo.OpenRecruitmentAgreement
        }), t.wxParse("Introduction", "html", a, n);
    },
    onReady: function() {},
    ApplicationReqeust: function() {
        var t = this;
        e.globalData.siteInfo.ApplyReferralCondition && e.globalData.userInfo.Expenditure < t.data.conditionMeony && (t.setData({
            isTip: !1
        }), !t.data.isTip) ? o.showModal("提示", "需要累计消费金额达到" + t.data.conditionMeony + "元才可申请哦") : wx.redirectTo({
            url: "../requestpromotionset/requestpromotionset"
        });
    },
    btnChange: function(t) {
        var o = this.data.isCheck;
        o ? this.setData({
            checked: ""
        }) : this.setData({
            checked: e.getRequestUrl + "/Templates/xcxshop/images/promotion_checked.png"
        }), this.setData({
            isCheck: !o
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});