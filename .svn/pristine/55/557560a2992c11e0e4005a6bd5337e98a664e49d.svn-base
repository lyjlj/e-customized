var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Points:[],
    // windowHeight:1100,
    windowHeight:wx.getSystemInfoSync().windowHeight,
    tagTab:0,
    tagScrollLeft:0,
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.getUserInfo(function (n) {}, "/pages/GalleryDetail/GalleryDetail"),
    that.setData({
      userInfo:app.userInfo
    })
    wx.hideShareMenu();
    this.GetGalleryPoint(options.point),
    // this.GetGalleryPoint("90,91"),
    this.getSysInfo();
    // if(options.point)
    //  {
    //    var p=[JSON.parse(options.point)];
    //    this.setData({Points:p});
    //    this.getIamgeInfo(0);
    //  }
    // if(options.id)
    
  },
  getSysInfo:function(){
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        that.setData({
          windowHeight: height,
          windowWidth:clientWidth
        });
      }
    });
  },
  GetGalleryPoint:function(id){
    var that = this;
    wx.request({
      url: app.getUrl("GetGalleryItemInfo"),
      data: {GalleryItemIds:id},
      success: function(t) {
        if (0 == t.data.code) {
          var r = t.data.data;
          r=r.map(item=>{
            item.Points=JSON.parse(item.Points);
            return item;
          })
          that.setData({
            Points: r
          }),
          that.getIamgeInfo(0);
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
      complete: function() {
       
      }
    });
  },
  backList:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  getIamgeInfo:function(index){
    var that=this;
    if (!that.data.Points)
       return;
    wx.showLoading();
    wx.getImageInfo({
      src: that.data.Points[index].Image+'?x-oss-process=image/resize,w_750',
      success: function(ires) {
        var w=750;
        var h=(750*ires.height)/ires.width;
        if(h>that.data.windowHeight)
        {
          h=that.data.windowHeight;
          w=(ires.width*h)/ires.height
        }
        var point=that.data.Points[index];
        point.imageWidth=w;
        point.imageHeight=h;
        var rate2=w/750;
        var pointsobj=point.Points;
        pointsobj.forEach(o=>{
          o.movex = o.movex * o.rate * rate2;
          o.movey = o.movey * o.rate * rate2;
        });
        point.Points=pointsobj
        that.setData({
          ['Points[' + index + ']']:point
      },()=>{
        wx.hideLoading();   
      })
      }
    })
  },
  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / that.data.Points.length;
    //tab选项居中                            
    this.setData({
      tagScrollLeft: (cur - 2) * singleNavWidth
    })
    if(!that.data.Points[cur].imageWidth)
      that.getIamgeInfo(cur);
    if (this.data.tagTab == cur) {
      return false;
    } else {
      this.setData({
        tagTab: cur
      })
    }
  },
  switchTab(event) {
    var that=this;
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / that.data.Points.length;
    this.setData({
      tagTab: cur,
      tagScrollLeft: (cur - 2) * singleNavWidth
    });
    if(!that.data.Points[cur].imageWidth)
      that.getIamgeInfo(cur);
  },
  selectSku:function(event){
    var that=this;
    var pid = event.currentTarget.dataset.pid;
    that.setData({ProductId:pid});
    this.selectComponent("#selectSku").initData();
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
  godetail(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var ind=e.currentTarget.dataset.ind;
    var points=that.data.Points;
    console.log(points);
    points[ind].Points.forEach(item=>{
      if(item.index==index){
        item.showExAttr=!item.showExAttr
      }
    })
    that.setData({
      Points:points
    })
  },
  edit(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/Gallery/Gallery?id='+id,
    })

  }
})