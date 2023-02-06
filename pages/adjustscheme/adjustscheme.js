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
    //调整方案文字内容
    adjustInputValue:'',
    //调整方案图片
    adjustImg:'',
    //项目的id值
    id:'',
    //原customizationmark值
    offerObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("options",options)
    this.setData({
      id:options.id,
      offerObj:options.offerObj
    })
  },
  //调整方案提交
  confirmSubmit(){
    var that = this;
    console.log("offerObj",this.data.offerObj)
    wx.request({
      url:"https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_UpdateStatus",
      method:'post',
      data:{
        id:this.data.id,
        status:60,
        customizationmark:{
          ...(JSON.parse(this.data.offerObj)),
          adjustInputValue:that.data.adjustInputValue,
          adjustImg:that.data.adjustImg
        }
      },
      success:function(res){
        console.log('res',res)
        wx.navigateTo({
          url: '/subpages/needList/needList',
        })
      }
    })
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
  //修改方案内容
  handleInput(e){
    const adjustValue = e.detail.value
    console.log("vlaue",adjustValue)
    this.setData({
      adjustInputValue:adjustValue
    })
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
          console.log("上传图片后的值",a)
          o.setData({
            adjustImg:a.Data[0].ImageUrl
          })
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

