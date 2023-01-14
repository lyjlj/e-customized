var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Gallerys:[],
    Points:[],
    PageIndex:1,
    isComplete:false
  },
  onPullDownRefresh: function () {
    var index=1;
    this.setData({PageIndex:index,isComplete:false});
    this.GetGalleryPoint();
  },
  onReachBottom:function(){
    var index=this.data.PageIndex+1;
    this.setData({PageIndex:index});
    this.GetGalleryPoint();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetGalleryPoint();
  },
  goGalleryDetail:function(event){
    var point = event.currentTarget.dataset.point;
    wx.navigateTo({
      // url: '../GalleryDetail/GalleryDetail?point='+JSON.stringify(point),
      url: '../GalleryDetail/GalleryDetail?point='+point,
    })
  },
  GetGallerys: function() {
    var that = this;
    app.getOpenId(function(r) {
      var data= {
        openId: r
      };
      wx.request({
        url: app.getUrl("GetGallerys"),
        data: data,
        success: function(t) {
          if (0 == t.data.code) {
            var r = t.data.data;
            that.setData({
              Gallerys: r
            });
          } else wx.showModal({
            title: "提示",
            content: t.data.msg,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {}
      });
    });
  },
  GetGalleryPoint:function(id){
    var that = this;
    if(this.data.isComplete)
       return;
    wx.showLoading();
    wx.request({
      url: app.getUrl("GetGalleryPoints"),
      data: {pageIndex:that.data.PageIndex},
      success: function(t) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (0 == t.data.code) {
          var r = t.data.data;
          if(r.length==0)
             that.setData({isComplete:true})
          r.forEach(o=>o.Points=JSON.parse(o.Points));
          if(that.data.PageIndex>1)
          {
            var points=that.data.Points;
            points.push.apply(points, r);
            that.setData({Points:points})
          }
          else{
            that.setData({
              Points: r
            });
          }
        } else wx.showModal({
          title: "提示",
          content: t.data.msg,
          showCancel: !1,
          success: function(t) {
            t.confirm && wx.navigateBack({
              delta: 1
            });
          }
        });
      },
      complete: function() {}
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  editGallery(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/Gallery/Gallery?id='+id,
    })
  },
  deleteGallery(e){
    var that=this;
    var id=e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认删除!',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: app.getUrl("DeleteGalleryItem"),
            data:{
              GalleryItemIds:id
            },
            success(r){
              if(r.data.code==0){
                that.GetGalleryPoint();
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  }
})