var e = require("../../utils/config.js"),
    o = getApp();

Page({
    data: {},
    onLoad: function (e) {
        e.ReferralUserId && o.setRefferUserId(e.ReferralUserId), this.setData({
            RefferImg: o.globalData.ReferralInfo.ReferralPosterUrl,
            QrCodeUrl: o.globalData.ReferralInfo.QrCodeWidth,
            Qwidth: o.globalData.ReferralInfo.QrCodeWidth,
            DefaultColor: o.globalData.siteInfo.DefaultColor
        });
    },
    onReady: function () {},
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function (a) {
        var r;
        o.globalData.siteInfo.QuickLogin?(r='/pages/home/home?scene='+o.globalData.userInfo.UserId):(r = "/pages/register/register?scene=" + o.globalData.userInfo.UserId);
        return o.globalData.userInfo && o.globalData.userInfo.IsReferral, {
            title: o.globalData.ReferralInfo.NickName,
            path: r,
            success: function (o) {
                e.showTip("分享成功", "success");
            },
            fail: function (o) {
                e.showTip("分享失败", "error");
            }
        };
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

    }
});