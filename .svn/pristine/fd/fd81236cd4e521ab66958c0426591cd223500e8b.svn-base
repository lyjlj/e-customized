var e = require("../../utils/config.js"),
  a = getApp();
var app = a;

Page({
  data: {
    SettleImage: "",
    ShopName: "",
    Email: "",
    Phone: "",
    ImageCode: "",
    PhoneCode: "",
    DefaultColor: "",
    UserCredentials: "../../images/return-img_03.jpg",
    remark: '',
    orderId: '',
    settleAction: '',
    settles:[]
  },
  onLoad: function (e) {
    var that=this;
    app.getSiteInfo(function(s){that.setData({
      DefaultColor: s.DefaultColor,
      orderId: e.id
    });
    that.loadSettles();}
    )
  },
  loadSettles: function () {
    var that = this;
    app.getOpenId(function (r) {
      wx.request({
        url: app.getUrl("GetOrderSettles"),
        data: {
          openId: r,
          orderId: that.data.orderId
        },
        success: function (t) {
          if (0 == t.data.code) {
            that.setData({
              settleActionText:t.data.data.settleActionText,
              settleAction: t.data.data.settleAction,
              settles: t.data.data.settles
            })
          } else {
            wx.showModal({
              title: "提示",
              content: t.data.ms,
              showCancel: !1,
              success: function (t) {
                t.confirm && wx.navigateBack({
                  delta: 1
                });
              }
            })
          };
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    });
  },
  DeleteImg: function () {
    var a = this;
    e.showCancelModal("删除", "确定要删除图片吗", function () {
      a.setData({
        UserCredentials: "../../images/return-img_03.jpg",
        SettleImage: ""
      });
    });
  },
  ChooseImg: function (e) {
    var n = this;
    a.getRequestUrl;
    n.data.SettleImage ? wx.previewImage({
      current: n.data.SettleImage,
      urls: [n.data.SettleImage]
    }) : wx.chooseImage({
      count: 1,
      success: function (e) {
        var a = e.tempFilePaths[0];
        n.setData({
          UserCredentials: a
        }), n.UploadImage(a);
      }
    });
  },
  previewImage:function(e){
    var a = e.currentTarget.dataset.srcs;
    wx.previewImage({
      current: a,
      urls: [a]
    });
  },
  UploadImage: function (e) {
    var n = "",
      o = this;
    a.getOpenId(function (t) {
      wx.uploadFile({
        url: a.getUrl("UploadAppletImage"),
        filePath: e,
        name: "file",
        formData: {
          openId: t,
          path: 'ordersettle'
        },
        success: function (e) {
          var a = JSON.parse(e.data);
          "OK" == a.Status ? n = a.Data[0].ImageUrl : "NOUser" == a.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            confirmColor: "#ff5722",
            content: a.ErrorResponse.ErrorMsg,
            showCancel: !1,
            success: function (e) {
              e.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function () {
          n && o.setData({
            SettleImage: n
          });
        }
      });
    });
  },
  SaveStore: function () {
    var n = this;
    if (!n.data.SettleImage || n.data.settleImage == '../../images/return-img_03.jpg') {
      e.showTip("结算单图片不能为空", "tips");
      return;
    }
    a.getOpenId(function (o) {
      wx.request({
        url: a.getUrl("UpdateOrderSettle"),
        data: {
          openId: o,
          remark: n.data.remark,
          settleImage: n.data.SettleImage,
          orderId: n.data.orderId,
          settleAction: n.data.settleAction
        },
        success: function (a) {
          if (a.data.code != 0) {
            e.showTip(a.data.msg, "tips");
            return;
          }
          wx.showModal({
            title: "提示",
            content: a.data.msg,
            showCancel: !1,
            success: function (e) {
              wx.navigateBack();
            }
          });
        },
        complete: function () {}
      });
    });
  },
  InputValue: function (e) {
    var a = e.currentTarget.dataset.key;
    this.data[a] = e.detail.value;
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
});