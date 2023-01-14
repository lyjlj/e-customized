var app=getApp();
Page({
    data: {
        outurl: ""
    },
    onLoad: function(o) {
      var that=this;
      var returnUrl = "/pages/outurl/outurl?url=" + encodeURIComponent(o.url);
      if(o.CheckUser)
        app.getUserInfo(function(user){
            var flag=decodeURIComponent(o.url).indexOf('?')>-1?'&':'?';
            var n = decodeURIComponent(o.url) + flag+'IsWeChatApplet=true&customid=' + app.customId + '&userid='+user.UserId+'&openid=' + user.OpenId;
            that.setData({
            outurl: n 
            });
        }, returnUrl);
    },
    onShareAppMessage: function(o) {
        var n = this, t = o.webViewUrl;
        return {
            path: "/pages/outurl/outurl?url=" + encodeURIComponent(t),
            success: function(o) {
                n.setData({
                    outurl: t
                }), wx.showToast({
                    title: "转发成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(o) {}
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});