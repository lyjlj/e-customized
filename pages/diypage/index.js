// pages/temppage/index.js
var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    var a = util;
    var n = decodeURIComponent(options.url);
    var topicId = n.split('TopicId=')[1];
    this.setData({
      pageUrl: app.getRequestUrl +'/Templates/topic/waptopic/topic_'+topicId+'.json',
      siteAll:app.globalData.siteAll
    });
    this.loadtarData();
    if(options.index){
      this.setData({
        selected:options.index
      })
    }
  },
  setTitle:function({detail:d})
  {
    wx.setNavigationBarTitle({
      title: d.title
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  gotoKeyWordPage: function (t) {
    var params = t.detail.param;
    wx.navigateTo({
      url: "../searchresult/searchresult?"+params
    });
  },
  loadtarData(){
    var that=this;
    wx.request({
      url: app.getUrl('GetTopMenus'),
      success(res){           
        var foot=[];
        res.data.data.forEach(function(v){
          if(v.Content.toLowerCase().indexOf('default')>-1)
             v.Content='/pages/home/home';
          if(v.Content.toLowerCase().indexOf('productsearch')>-1)
             v.Content='/pages/productcategory/productcategory';
          if(v.Content.toLowerCase().indexOf('shoppingcart')>-1)
             v.Content='/pages/shopcart/shopcart';
          if(v.Content.toLowerCase().indexOf('membercenter')>-1)
             v.Content='/pages/usehome/usehome';
          if(v.Content.toLowerCase().indexOf('productlist')>-1)
             v.Content='/pages/searchresult/searchresult';
          if(v.Content.toLowerCase().indexOf('sharemoments')>-1) 
            v.Content='/pages/sharemoments/sharemoments'  
          if(v.Content.toLowerCase().indexOf('diypage')>-1) 
            v.Content=v.Content   
          foot.push({
            url:v.Content,
            text:v.Name,
            color:v.Color,
            selectedColor:v.Color2,
            iconPath:app.getRequestUrl+v.ShopMenuPic,
            selectedIconPath:app.getRequestUrl+v.ShopMenuPic2
          })
        });
        that.setData({foot:foot})
      }
    })
  },
  switchTab(e) {
    const data = e.currentTarget.dataset
    const url = data.path;
    app.globalData.tabBarIndex = data.index;
    this.setData({
      selected: data.index
    })
    wx.switchTab({
      url: url,
      fail: function () {
        wx.navigateTo({
          url: url
        })
      }
    })
  }
})