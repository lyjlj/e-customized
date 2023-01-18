// pages/adjustscheme/adjustscheme.js
var t = require("../../utils/config.js"),
  e = getApp(),
  app = e,
  a = require("../wxParse/wxParse.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  //选择要提交的图片
  chooseImage(){
    var that = this;
    wx.showActionSheet({
      itemList:['从相册中选择','拍照'],
      itemColor:'#cccccc',
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
  ChooseImg: function (type) {
    var n = this;
    e.getRequestUrl;
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
  DeleteImg: function (e) {
    var a = this;
    wx.showModal({
      title: '提示',
      content: '确认删除图片？',
      success(res) {
        if (res.confirm) {
          a.setData({
            UserCredentials: "../../images/return-img_03.jpg",
            SettleImage: "",
            ['remark.img']: ""
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //放大图片
  previewImage(e){
    var enlarge = e.currentTarget.dataset.remarkImage
    wx.previewImage({
      current: enlarge,
      urls: [enlarge]
    });
  },
  //
  handleInput(e){
    const adjustValue = e.detail.value
    console.log("vlaue",adjustValue)
  },
  // UploadImage: function (e) {
  //   var n = "",
  //     o = this;
  //   var type = o.data.uploadtype;
  //   wx.showLoading({
  //     title: '运算中',
  //   })
  //   getApp().getOpenId(function (t) {
  //     wx.uploadFile({
  //       url: getApp().getUrl("UploadAppletImage"),
  //       filePath: e,
  //       name: "file",
  //       formData: {
  //         openId: t,
  //         path: 'ImgSearch'
  //       },
  //       success: function (e) {
  //         var a = JSON.parse(e.data);
  //         if ("OK" == a.Status) {
  //           console.log('上传成功')
  //           // 图片地址
  //           n = a.Data[0].ImageUrl
  //         } else {
  //           if ("NOUser" == a.Message) {
  //             wx.navigateTo({
  //               url: "../login/login"
  //             })
  //           } else {
  //             wx.showModal({
  //               title: "提示",
  //               confirmColor: "#ff5722",
  //               content: a.ErrorResponse.ErrorMsg,
  //               showCancel: !1,
  //               success: function (e) {
  //                 e.confirm && wx.navigateBack({
  //                   delta: 1
  //                 });
  //               }
  //             });
  //           }
  //         }
  //         "OK" == a.Status ? n = a.Data[0].ImageUrl : "NOUser" == a.Message ? wx.navigateTo({
  //           url: "../login/login"
  //         }) : wx.showModal({
  //           title: "提示",
  //           confirmColor: "#ff5722",
  //           content: a.ErrorResponse.ErrorMsg,
  //           showCancel: !1,
  //           success: function (e) {
  //             e.confirm && wx.navigateBack({
  //               delta: 1
  //             });
  //           }
  //         });
  //       },
  //       complete: function (e) {
  //         wx.hideLoading();
  //         var a = JSON.parse(e.data);
  //         if ("OK" == a.Status) {
  //           // 图片地址
  //           var img = a.Data[0].ImageUrl
  //           o.data.ExtendAttribute.forEach(function (o) {
  //             if (o.ExtAttrName == '二级分类') {
  //               type = o.ExtAttrValue
  //             }
  //           });
  //           if (!type) {
  //             o.toggle();
  //             o.setData({
  //               learnImg: img
  //             })
  //           } else {
  //             o.addImgSearch(type, getApp().customId, img, o.data.ProductCode);
  //           }
  //         }
  //       }
  //     });
  //   });
  // },
  // addImgSearch: function (category, companyid, imgurl, productcode) {
  //   category ? category : '其他';
  //   wx.request({
  //     url: 'https://ssl.zhuanyegou.com/soutu/api/addImage',
  //     data: {
  //       category: category,
  //       companyId: companyid,
  //       imgUrl: imgurl,
  //       productCode: productcode
  //     },
  //     success(r) {
  //       wx.showToast({
  //         title: '学习完成',
  //         icon: 'success',
  //         duration: 3000
  //       })
  //     },
  //     fail() {
  //       wx.showToast({
  //         title: '服务器失联',
  //         icon: 'loading',
  //         duration: 3000
  //       })
  //     }
  //   })
  // },
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
    app.getOpenId(function (t) {
      wx.uploadFile({
        url: app.getUrl("UploadAppletImage"),
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
            SettleImage: n,
            ['remark.img']: n
          });
        }
      });
    });
  },
})