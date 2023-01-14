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
    typelist: [{
        id: 1,
        name: '戒指'
      },
      {
        id: 2,
        name: '耳饰'
      },
      {
        id: 3,
        name: '吊坠'
      },
      {
        id: 4,
        name: '手镯'
      },
      {
        id: 5,
        name: '手足链'
      },
      {
        id: 6,
        name: '项链'
      },
      {
        id: 7,
        name: '配饰'
      },
      {
        id: 8,
        name: '套链'
      },
      {
        id: 9,
        name: '其他'
      },
    ],
    type: {},
    resultData: []
  },
  onLoad: function (e) {
    var that = this;
    app.getSiteInfo(function (s) {
      var r = this
      app.getUserInfo(r, encodeURI('/pages/ImgSearch/ImgSearch'));
      that.setData({
        DefaultColor: s.DefaultColor,
      });
    })
  },

  bindPickerType: function (e) {
    var that = this;
    var index = e.detail.value;
    this.setData({
      type: that.data.typelist[index]
    })
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
  ChooseImg: function (type) {
    var n = this;
    a.getRequestUrl;
    n.data.SettleImage ? wx.previewImage({
        current: n.data.SettleImage,
        urls: [n.data.SettleImage]
      }) :

      wx.chooseImage({
        count: 1,
        sourceType: [type],
        success: function (e) {
          var a = e.tempFilePaths[0];
          n.setData({
            UserCredentials: a
          }), n.UploadImage(a);
        }
      });
  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            UserCredentials: "../../images/return-img_03.jpg",
            SettleImage: ""
          });
          if (res.tapIndex == 0) {
            that.ChooseImg('album')
          } else if (res.tapIndex == 1) {
            that.ChooseImg('camera')
          }
        }
      }
    })
  },
  previewImage: function (e) {
    var a = e.currentTarget.dataset.srcs;
    wx.previewImage({
      current: a,
      urls: [a]
    });
  },
  UploadImage: function (e) {
    var n = "",
      o = this;
    wx.showLoading({
      title: '上传中',
    })
    a.getOpenId(function (t) {
      wx.uploadFile({
        url: a.getUrl("UploadAppletImage"),
        filePath: e,
        name: "file",
        formData: {
          openId: t,
          path: 'ImgSearch'
        },
        success: function (e) {
          var a = JSON.parse(e.data);
          if ("OK" == a.Status) {
            n = a.Data[0].ImageUrl
          } else {
            if ("NOUser" == a.Message) {
              wx.navigateTo({
                url: "../login/login"
              })
            } else {
              wx.showModal({
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
            }
          }
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
          wx.hideLoading();
          n && o.setData({
            SettleImage: n
          });
        }
      });
    });
  },
  SaveStore: function () {
    var n = this;
    var productCodes = '';
    var type = n.data.type;
    if (!n.data.SettleImage || n.data.settleImage == '../../images/return-img_03.jpg') {
      e.showTip("请上传你需要找的款图", "tips");
      return;
    }
    if (Object.keys(type).length === 0) {
      wx.showToast({
        title: '选择品类',
        icon: 'loading',
        duration: 2000
      })
      return;
    }

    wx.request({
      url: 'https://ssl.zhuanyegou.com/soutu/api/searchImage',
      data: {
        category: n.data.type.name,
        companyId: a.customId,
        imgUrl: n.data.SettleImage
      },
      success(res) {
        wx.showLoading({
          title: '搜索中',
        })
        if (res.data.code == 0) {
          var resultList = res.data.result;
          n.setData({
            resultData: resultList
          })
          if (resultList) {
            resultList.map(m => {
              if (!productCodes) {
                productCodes = m.label
              } else {
                productCodes = productCodes + "," + m.label
              }
            })
            wx.navigateTo({
              url: '/pages/searchresult/searchresult?LikeProductCodes=' + productCodes,
            })
          } else {
            wx.showLoading({
              title: '找不到相似款',
              duration: 3000
            })
          }
        } else {
          wx.showLoading({
            title: '搜索失败',
            duration: 3000
          })
        }
      },
      complete() {
      }
    })
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