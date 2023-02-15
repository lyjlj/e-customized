// subpages/needSubmit/needSubmit.js
var e = require("../../utils/config.js");
var a = getApp();
console.log("a的值",a)
var app = a;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: 0,
    formData: {
      variety: "",
      specification:{
        Percentage:'',
        GoldWeight:''
      },
      quantity:'',
      projBody:''
    },
    formDataQuick: {
      needStr: '',
      attachment: [],
      brandId: '',
      specification:{
        Percentage:'',
        GoldWeight:''
      },
      quantity:'',
      

    },
    Percentage:[{
      name: "黄金",
      selected: false
      },
      {
      name: "白银",
      selected: false
      },
      {
      name: "铜",
      selected: false
      }
    ],
    UserCredentials: "../../images/return-img_03.jpg",
    UserCredentials1: "../../images/return-img_03.jpg",
    varietyList: [
      "奖杯",
      "纪念币",
      "金牌"
    ],
    projBody: [{
        name: "企业",
        selected: false
      },
      {
        name: "个人",
        selected: false
      },
      {
        name: "团队",
        selected: false
      },
      {
        name: "银行",
        selected: false
      },
    ],
    uses: [{
        name: "周年庆",
        selected: false
      },
      {
        name: "礼品",
        selected: false
      },
      {
        name: "其他",
        selected: false
      }
    ],
    materials: [{
        name: "黄金",
        selected: false
      },
      {
        name: "白银",
        selected: false
      },
      {
        name: "铜",
        selected: false
      },
      {
        name: "其他",
        selected: false
      }
    ],
    weights: [{
        name: "50",
        selected: false
      },
      {
        name: "100",
        selected: false
      },
      {
        name: "200",
        selected: false
      },
      {
        name: "其他",
        selected: false
      }
    ],
    packs: [{
        name: "常规包装",
        selected: false
      },
      {
        name: "其他",
        selected: false
      }
    ],
    showMore: false,
    //提交的材质
    // specification:{
    //   Percentage:''
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    // 获取详细需求的定制品类
    a.getOpenId(function (t) {
      wx.request({
        url: app.getUrl("GetFilterType"),
        data: t,
        success: function (a) {
          if (0 == a.data.code) {
            var e = a.data.data;
            e[4][0].AttributeValues.map((v, i) => that.data.varietyList[i] = v.ValueStr)
            that.setData({
              varietyList: that.data.varietyList,
            });
          }
        }
      });
    })

    console.log(that.data.varietyList);

    a.getUserInfo(function (t) {
      that.setData({
        ['formData.brandId']: options.brandid,
        ['formDataQuick.brandId']: options.brandid,
        UserInfo: t,
        brandInfo: {}
      })
    }, a.getCurrentUrl());
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  changeTab(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      tab: index
    })
  },
  // 上传图片开始
  DeleteImg: function (e) {
    var a = this;
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除图片？',
      success(res) {
        if (res.confirm) {
          if (type == 'logo') {
            a.setData({
              UserCredentials: "../../images/return-img_03.jpg",
              SettleImage: "",
              ['formData.companyLogo']: ""
            });
          } else if (type == 'refer') {
            a.setData({
              UserCredentials1: "../../images/return-img_03.jpg",
              ['formData.refer']: ""
            });
          } else if (type == 'quickneed') {
            var needatts = a.data.formDataQuick.attachment;
            needatts.splice(index, 1);
            a.setData({
              ['formDataQuick.attachment']: needatts
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },
  ChooseImg: function (type, param) {
    var n = this;
    a.getRequestUrl;
    wx.chooseImage({
      count: 1,
      sourceType: [type],
      success: function (e) {
        var a = e.tempFilePaths[0];
        if (param == "logo") {
          n.setData({
            UserCredentials: a
          })
        } else {
          n.setData({
            UserCredentials1: a
          })
        }
        n.UploadImage(a, param);
      }
    });
  },
  chooseimage: function (e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function (res) {
        console.log(res);
        if (!res.cancel) {
          if (type == "logo") {
            that.setData({
              UserCredentials: "../../images/return-img_03.jpg",
              SettleImage: ""
            });
          } else {
            that.setData({
              UserCredentials1: "../../images/return-img_03.jpg",
            });
          }
          if (res.tapIndex == 0) {
            that.ChooseImg('album', type)
          } else if (res.tapIndex == 1) {
            that.ChooseImg('camera', type)
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
  UploadImage: function (e, type) {
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
          if (type == 'logo') {
            n && o.setData({
              SettleImage: n,
              ['formData.companyLogo']: n
            });
          } else if (type == 'refer') {
            n && o.setData({
              ['formData.refer']: n
            });
          } else if (type == 'quickneed') {
            var needatts = o.data.formDataQuick.attachment
            needatts.push(n);
            n && o.setData({
              ['formDataQuick.attachment']: needatts
            });
          }
        }
      });
    });
  },
  // 上传图片结束
  bindPickerChange(e) {
    var that = this;
    var datalist = that.data.varietyList;
    console.log(e.detail.value);
    var name = datalist[e.detail.value]
    that.setData({
      ['formData.variety']: name
    })
  },
  inputdata(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value;
    that.setData({
      ['formData.' + type]: value
    })
    console.log(that.data.formData);
  },
  //详细定制数量
  inputDetailNumber(e){
    console.log("详细数量的值",e)
    var that = this;
    // var type = e.currentTarget.dataset.type;
    that.setData({
      ["formData.quantity"] : e.detail.value
    })
  },
  //选择材质
  selectProject(e){
    var that = this;
    var name = e.currentTarget.dataset.name;
    var param = e.currentTarget.dataset.param;
    var proj = {};
    if(param == 'Percentage'){
      proj = that.data.Percentage
    }
    console.log("proj的值",proj)
    proj.forEach(item => {
      if(item.name ==name){
        that.setData({
          ['formDataQuick.specification.' + param] :name
        })
        item.selected = true
        
      }else{
        item.selected = false
      }
      // that.setData({
      //   ['formDataQuick.specification.' + param]:name
      // })
      that.setData({
        [param]: proj
      })
    })
    
    
    console.log(123,that.data.formDataQuick);
  },
  selectProj(e) {
    var that = this;
    var name = e.currentTarget.dataset.name;
    var param = e.currentTarget.dataset.param;
    var proj = {};
    if (param == 'projBody') {
      proj = that.data.projBody;
    } else if (param == 'uses') {
      proj = that.data.uses
    } else if (param == 'materials') {
      proj = that.data.materials
    } else if (param == "weights") {
      proj = that.data.weights
    } else if (param == 'packs') {
      proj = that.data.packs
    }
    proj.forEach(item => {
      if (item.name == name) {
        that.setData({
          ['formData.' + param]: name
        })
        item.selected = true
      } else {
        item.selected = false
      }
    })
    that.setData({
      [param]: proj
    })

    console.log(that.data.formData);
  },
  showMore() {
    this.setData({
      showMore: true
    })
  },
  closeshowMore() {
    this.setData({
      showMore: false
    })
  },
  quickInput(e) {
    var value = e.detail.value;
    this.setData({
      ["formDataQuick.needStr"]: value
    })
  },
  //输入材质
  inputMaterial(e){
    console.log("e的值",e)
    var that = this
    that.setData({
      ["formDataQuick.specification.Percentage"] :e.detail.value
    })
  },
  inputGram(e){
    var that =this
    that.setData({
      ["formDataQuick.specification.GoldWeight"]: e.detail.value
    })
  },
  inputNumber(e){
    var that = this
    that.setData({
      ["formDataQuick.quantity"]:e.detail.value
    })
    console.log("FORMdATA",that.data.formDataQuick)
  },
  //详细定制克重
  inputGramDetail(e){
    var that = this;
    that.setData({
      ['formData.specification.GoldWeight'] : e.detail.value
    })
    console.log("detail的值",that.data.formData.specification)
  },
  //详细定制材质
  selectProjectDetail(e){
    var that = this;
    var name = e.currentTarget.dataset.name;
    var param = e.currentTarget.dataset.param;
    var proj = {};
    if(param == 'Percentage'){
      proj = that.data.Percentage
    }
    proj.forEach(item => {
      if(item.name ==name){
        that.setData({
          ['formData.specification.' + param] :name
        })
        item.selected = true
      }else{
        item.selected = false
      }
      that.setData({
        [param]: proj
      })
    })
  },
  submitData() {
    var that = this;
    var tab = that.data.tab;
    var type = '';
    if (tab == 0) {
      var formData = that.data.formDataQuick;
      type = '快速定制'

    } else if (tab == 1) {
      var formData = that.data.formData;
      type = '详细定制'

    }
    var user = that.data.UserInfo;

    if (tab == 0 && that.data.formDataQuick.needStr == '') {
      wx.showToast({
        title: '亲,是否忘填需求内容啦？',
        icon: "none"
      })
    }else if(tab===0 && that.data.formDataQuick.specification.Percentage == '' ){
      wx.showToast({
        title:"请选择材质",
        icon:'none'
      })
    }else if (tab==0 && that.data.formDataQuick.specification.GoldWeight == '') {
      wx.showToast({
        title:'请填写克重',
        icon:'none'
      })
    }else if (tab ==0 && that.data.formDataQuick.quantity == ''){
      wx.showToast({
        title:'请填写数量',
        icon:none
      })
    }else if (tab == 1 && that.data.formData.variety == '') {
      wx.showToast({
        title: '请选中品类',
        icon: "none"
      })
    }else if (tab == 1 && that.data.formData.projBody==''){
      wx.showToast({
        title:"请选择项目主体",
        icon:'none'
      })
    }else if(tab == 1 && that.data.formData.specification.Percentage == ''){
      wx.showToast({
        title:"请选择材质",
        icon:'none'
      })
    }
    else if(tab == 1 && that.data.formData.quantity==''){
      wx.showToast({
        title:'请填写数量',
        icon:"none"
      })
    }
    else if(tab == 1 && that.data.formData.specification.GoldWeight == ''){
      wx.showToast({
        title:'请填写克重',
        icon: 'none'
      })
    }else {
      wx.request({
        url: 'https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_Insert',
        method: "POST",
        data: {
          type: type,
          details: JSON.stringify(formData),
          userid: user.UserId,
          customId: app.customId
        },
        success(r) {
          wx.showToast({
            title: '提交成功!',
            icon: 'success',
            duration: 2000
          })
          var url = 'http://1086.daogoujingling.com/vshop/Topics.aspx?TopicId=3600';
          url = encodeURIComponent(url);
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/diypage/index?url=' + url
            })
          }, 2000)
        }
      })
    }

  }

})