var app = getApp();
Page({
  data: {
    liveData: [],
    livingData: [],
    loadMore: 1,
    size: 20,
    firstlive: null,
    loadOver:false
  },
  onLoad() {
    var that = this;
    app.getSiteInfo(function(t) {
      that.loadData(true);
    });

  },
  onShow() {
    this.selectComponent("#liveWindow").initPlay();
  },
  onReachBottom() {
    this.loadData(false);
  },
  onPullDownRefresh() {
    this.loadData(true);
  },
  loadData(refresh) {
    var that = this;
    if(!refresh&&that.data.loadOver)
      return;
    var appId = app.globalData.siteInfo.appId;
    wx.showLoading();
    if (refresh) {
      that.setData({
        loadMore: 1
      })
    }
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews?action=DGLiveRoomRecordList',
      data: {
        siteid: appId,
        loadMore: that.data.loadMore
      },
      success: function(res) {
        wx.hideLoading();
        if (!res.data.data || res.data.data.length == 0) {
          that.setData({
            liveData: []
          })
        } else {
          var list = res.data.data;
          var loadOver = list.length < that.data.size;
          that.setData({ loadOver: loadOver})
          list.forEach(p => {
            try {
              p.Products = p.PushProducts ? JSON.parse(p.PushProducts).reverse() : [];
              p.ViewCount= Math.random().toFixed(2)*200 + 300;
              p.CreateTime=p.CreateTime.substring(0,p.CreateTime.length-3)
            } catch (e) {
              p.Products = [];
            }
          });        
          if (refresh) {
            var fl = [];
            if (list[0].IsLooking) {
              fl.push(list[0]);
              list.splice(0, 1);
            }
            that.setData({
              liveData: list,
              firstlive: fl,
              loadMore:2
            });
          } else {
            var ld = that.data.liveData;
            list.forEach(o => ld.push(o));
            that.setData({
              liveData: ld,
              loadMore: that.data.loadMore + 1
            })
          }
        }
        wx.stopPullDownRefresh();
      }
    })
  },
  toLiveDetail(e) {
    var islooking = e.currentTarget.dataset.looking;
    var id = e.currentTarget.dataset.id;
    var prefix = e.currentTarget.dataset.prefix;
    if (islooking) {
      wx.navigateTo({
        url: '../live/live?id=' + id
      })
    } else {
      wx.navigateTo({
        url: '../LiveDetail/LiveDetail?prefix=' + prefix + '&id=' + id
      })
    }
  }
});