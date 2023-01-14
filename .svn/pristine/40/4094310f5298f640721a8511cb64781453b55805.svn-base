var t = require("../../utils/config.js"),
  app = getApp();

Page({
  data: {
    AddressList: null,
    AddressCount: 0,
    StoreId: 0,
    pageIndex: 1,
    pageSize: 10,
    inputtext:'',
    productsku:''
  },
  onLoad: function (t) {
    var d = this;   
    d.setData({
      productsku:t.productsku
    })
    d.getStores();
  },
  getStores() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      altitude: false, //高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.GetStoreListNew(latitude,longitude);
      },
      //定位失败回调
      fail: function (o) {
        that.GetStoreListNew(23.08464,114.38257);
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function (res) {
        //隐藏定位中信息进度

      }

    })

  },
  GetStoreListNew:function(latitude,longitude){
    var that=this;
    wx.request({
      url: app.getUrl('GetStoreListNew'),
      data: {
        pageIndex: that.data.pageIndex,
        pageSize: that.data.pageSize,
        fromLatLng: latitude + ',' + longitude, // '23.08464,114.38257',
        Key: that.data.inputtext,
        IsAboveSelf:1
      },
      success(data) {
        var t = data.data.data.Models;
        t.forEach(function (p) {
          p.OpenEndTime = p.OpenEndTime.split('T')[1];
          p.OpenStartTime = p.OpenStartTime.split('T')[1];
          p.ProductList=[];
        })
        var d = that.data.AddressList;
        if (that.data.pageIndex > 1) {
          d.push.apply(d, data.data.data.Models);
        } else
          d = data.data.data.Models;          
        that.setData({
          AddressList: d,
          AddressCount: data.data.data.Total
        })
        wx.hideLoading();
      }
    })
  },

onReachBottom:function(){
  var that = this;
  that.setData({
    pageIndex: that.data.pageIndex + 1
  })
  if (that.data.AddressCount > that.data.AddressList.length)
    that.getStores();
},
inputtext:function(e){
  this.setData({
    inputtext:e.detail.value
  })
},

bindRegionChange(e) {
  wx.showLoading({
    title: '加载中...'
  });
  var that = this;
  that.setData({
    pageIndex:1
  })
  that.getStores();
},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onAddressCheck: function (t) {
    var that=this;
    var d = t.detail.value;  
    var info=that.data.AddressList.filter(function(p){
      return p.StoreId==d;
    })
    if(info.length>0){
      this.data.IsCheck = 1, wx.redirectTo({
        url: "/pages/submitorder/submitorder?pickMyself=true&storeinfo=" +JSON.stringify(info[0])+'&productsku='+that.data.productsku
      });

    }


  }
});