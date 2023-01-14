// pages/PointMall/PointMall.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    list: [],
    type: 0,
    RequestUrl: app.getRequestUrl,
    PageSize: 10,
    PageIndex: 1,
    totalCount: 0,
    siteinfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '自动登录中...',
    })
    app.getUserInfo(function (t) {
      that.setData({
        userinfo: t
      })
      that.loaddata();
    })
    app.getSiteInfo(function(s){
      that.setData({
        siteinfo:s
      })
    })

  },
  onShow:function(){
    var that = this;
    app.getUserInfo(function (t) {
      that.setData({
        userinfo: t
      })
    })
  },
  selectpanel(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
      list: [],
      PageIndex:1
    })
    this.loaddata();
  },

  loaddata() {
    var that = this;
    wx.showLoading();
    wx.request({
      url: app.getUrl('GetPointMall'),
      data: {
        GiftType: that.data.type,
        PageSize: that.data.PageSize,
        CurrentPage: that.data.PageIndex,
        obtainWay: 2
      },
      success(res) {
        var d = that.data.list;
        if (that.data.PageIndex > 1) {
          d.push.apply(d, res.data.data);
        } else
          d = res.data.data;
          d.forEach(function(p){
            if(p.ClosingTime)
            p.ClosingTime=p.ClosingTime.replace('T00:00:00','').replace('T23:59:59','')
            if(p.StartTime)
            p.StartTime=p.StartTime.replace('T00:00:00','').replace('T23:59:59','')
            p.showbuy=true;
          })
        that.setData({
          list: d,
          totalCount: res.data.totalCount
        })
        wx.hideLoading();
      }
    })
  },
  giftcart:function(){
    wx.navigateTo({
      url: '/subpages/giftshopcart/giftshopcart',
    })
  },
  pointbuy:function(e){
    var needpoint = e.currentTarget.dataset.needpoint;
    var couponid = e.currentTarget.dataset.couponid;
    var that=this;
    var l=that.data.list;
    l.forEach(function(p){
      p.CouponId==couponid?p.showbuy=false:''
    })
    that.setData({
      list:l
    })
    app.getOpenId(function(o){
      wx.request({
        url:app.getUrl('PointChangeCoupon'),
        data:{
          openId:o,
          couponId:couponid,
          needPoints:needpoint
        },
        success(res){        
          if(res.data.code==0)
          wx.showModal({
            title: '恭喜',
            content:'兑换成功！',
            showCancel:false,
            success(){             
              l.forEach(function(p){
                p.CouponId==couponid?p.showbuy=true:''
              })
              that.setData({
                list:l
              })
            }
          })
          else   wx.showModal({
            title: '提示',
            content:res.data.msg,
            showCancel:false,
            success(res){             
              l.forEach(function(p){
                p.CouponId==couponid?p.showbuy=true:''
              })
              that.setData({
                list:l
              })
            }
          })
        }
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {   
    var that = this;
    that.setData({
      PageIndex: that.data.PageIndex + 1
    })
    if (that.data.totalCount > that.data.list.length)
      that.loaddata();
  },
  PointInfo:function(e){  
    var id=e.currentTarget.dataset.id;
   
    wx.navigateTo({
      url: '../PointInfo/PointInfo?id='+id
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})