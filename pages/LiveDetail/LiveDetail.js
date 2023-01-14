var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videolist: [],
    videoIndex: 1,
    videosrc: '',
    windowHeight:1100,
    liveRoomId:'',
    prefix:'',
    shareUrl:''
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.showLoading();
    var prefix = options.prefix;
    var url = "/pages/LiveDetail/LiveDetail?id=" + options.id + '&prefix=' + prefix;
    that.setData({ liveRoomId: options.id, prefix: prefix,shareUrl:url})
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews?action=DGLiveVideoUrls&prefix=' + prefix,
      success: function(res) {
        that.setData({
          videolist: res.data.data,
          endPoint:res.data.data.length>0? res.data.data[0].EndPoint:''
        })
        wx.hideLoading()
        that.loadVideoUrl(res.data.data.length>0?res.data.data[0].Key:'');
      },
      fail: function(res) {
        console.log("fail")
        wx.hideLoading()
      }
    });
    app.getSiteInfo(function (s) {
      that.setData({ DefaultColor: s.DefaultColor });
      app.getUserInfo(that.getRoomInfo);
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({})


  },
  loadVideoUrl:function(objectKey){
    var that=this;
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews?action=VideoUrl&objectKey=' + objectKey+'&endPoint='+that.data.endPoint,
      success: function(res) {      
        wx.hideLoading();     
        that.setData({
          videosrc: res.data.data
        })
      },
      fail: function(res) {
        console.log("fail")
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setWindowHeight();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function(res) {
    
  },
  setWindowHeight() {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        that.setData({
          windowHeight: height
        });
      }
    });
  },
  //获取直播间信息
  getRoomInfo() {
    var that = this;
    that.setData({
      UserId: app.globalData.openId
    })
    var params = {};
    params.action = 'GetLiveRoom';
    params.openId = app.globalData.openId;
    params.headImage = app.globalData.userInfo.picture;
    params.nickName = app.globalData.userInfo.realName;
    params.informationID = that.data.liveRoomId;
    params.form="LiveDetail";
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {
        var room = res.data.model;
        var productlist = JSON.parse(room.Products).reverse();
        var curProduct = productlist ? productlist[0] : null;
        that.setCurrProduct(curProduct);
        that.setData({
          liveRoomInfo: room,
          productData: productlist
        });
      },
      fail: function (res) { }
    })
  },
  setCurrProduct(p) {
    var that = this;
    that.setData({ CurProduct: p });
  },
  bindShowProduct() {
    this.selectComponent("#produtsFrame").showFrame();
  },
  toProductDetail(e) {
    var productid = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '../productdetail/productdetail?id=' + productid,
    })
  },
  toSelectSku(e) {
    var productid = e.currentTarget.dataset.productid;
    this.setData({ CurProductId: productid });
    this.selectComponent("#selectSku").initData();
  },
  closeCurrProduct() {
    this.setData({ CurProduct: null });
  },
  handleLike(){
    this.setData({ clickLike: !this.data.clickLike });
  },
  onShareAppMessage: function (res) {
    var that = this;
    var roomInfo = that.data.liveRoomInfo;
    var i = that.data.url;
    return {
      title: roomInfo.Title,
      path: i,
      imageUrl: roomInfo.Image,
      success: function (e) {
        t.showTip("分享成功", "success");
      },
      fail: function (e) {
        t.showTip("分享失败", "error");
      }
    };
  },
  showShare() {
    this.selectComponent("#shareFrame").showFrame();
  },
  hideShare() {
    this.selectComponent("#shareFrame").hideFrame();
  },
  goBack(){
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - 2]; //前一页
    if (beforePage) {
      wx.navigateBack({
        success: function () {
          beforePage.onLoad(); // 执行前一个页面的onLoad方法
        },
        fail: function () {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }
      });
    } else {
      wx.navigateTo({
        url: '/pages/home/home',
        fail: function () {
          wx.switchTab({
            url: '/pages/home/home'
          })
        }
      })
    }
  },
  moreinfo(){
    this.selectComponent("#moreinfo").showFrame();
  },
  showmoreVideo(e){
    var that=this;
    var url=e.currentTarget.dataset.url;
    var index=e.currentTarget.dataset.index;
    var endpoint=e.currentTarget.dataset.endpoint;
    this.setData({
      videoIndex:index,
      endPoint:endPoint
    })
    wx.showLoading();
    that.loadVideoUrl(url);
    
  }
})