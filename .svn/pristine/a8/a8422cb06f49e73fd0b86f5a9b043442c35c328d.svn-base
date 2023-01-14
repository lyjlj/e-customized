require("../../utils/config.js");

var e = getApp();

Page({
    data: {
        ResultImg: [ "../../images/waring_03.png", "../../images/wait_03.png","../../images/success.png" ],
        ResultMessage: "",
        ResultStatue: "",
        ResultIcon: "",
        ReferralInfo: ""
    },
    onLoad: function(t) {
        var n = this, a = "", o = "您提交的申请正在审核中……";
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                },
                success: function(e) {
                    var t = e.data.referral_get_response;
                    if(1 == t.ReferralStatus)
                     a = n.data.ResultImg[1];
                    else if(2== t.ReferralStatus)
                     a=n.data.ResultImg[2];
                    else if(3 == t.ReferralStatus)
                    { 
                        a = n.data.ResultImg[0];
                        o = t.RefusalReason;
                    } 

                    n.setData({
                        ResultStatueText: t.ReferralStatusText,
                        ResultMessage: t.RefusalReason,
                        ResultIcon: a,
                        ResultStatue: t.ReferralStatus
                    });
                }
            });
        });
    },
    ApplicationReqeust: function() {
        wx.redirectTo({
            url: "../applicationpromotion/applicationpromotion"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    ReturnUp: function() {
        wx.switchTab({
            url: "../usehome/usehome"
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});