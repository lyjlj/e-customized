var e = getApp();
// pages/sharemoments/sharemoments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: null,
    sharelist: null,
    host: e.getRequestUrl,
    siteInfo: null, //e.globalData.siteInfo.SiteName,
    showreview: false,
    Index: 1,
    ShareId: null,
    placeholder: '评论...',
    IsReply: 0,
    ReplyUserId: 0,
    ReplyText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    var returnurl = "../sharemoments/sharemoments";
    wx.getSystemInfo({
      complete: (res) => {
        t.setData({
          screenHeight: res.screenHeight
        })
      }
    })
    e.getUserInfo(function (u) {
      e.getSiteInfo(function (s) {
        t.setData({
          siteInfo: s
        })
      })
      t.setData({
        UserInfo: u
      })
      t.loaddata();
    }, encodeURI(returnurl));
  },
  onShow: function () {
   
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var bar = this.getTabBar();
      var index = 0;
      for (var i = 0; i < bar.data.foot.length; i++) {
        if (bar.data.foot[i].url == '/pages/sharemoments/sharemoments') {
          index = i;
          break;
        }
      }
      bar.setData({
        selected: index,
        showTab: true
      })
    }
  },
  loaddata: function () {
    wx.showNavigationBarLoading();
    var t = this;
    var list = t.data.sharelist;
    e.getOpenId(function (o) {
      wx.request({
        url: e.getUrl('GetShareMements'),
        data: {
          openId: o,
          index: t.data.Index
        },
        success(res) {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          res.data.Data.forEach(function (i) {
            i.CreateDate = i.CreateDate.replace('T', ' ');
            i.showReview = false;
            if (i.ShareText.length > 80) {
              i.ShowAll = true;
              i.IsShow = false;
            }
          })
          var u = res.data.Data;
          if (list != null) {
            list.push.apply(list, u);
          } else {
            list = u
          }
          t.setData({
            sharelist: list
          })
        }
      })
    })

  },
  godetail: function (t) {
    var a = t.currentTarget.dataset.url;
    wx.navigateTo({
      url: a
    })
  },
  showdetails: function (detail) {
    var id = detail.currentTarget.dataset.id;
    var t = this;
    var list = t.data.sharelist;
    list.forEach(function (i) {
      if (i.ID == id) {
        i.IsShow = !i.IsShow
      }
    })
    t.setData({
      sharelist: list
    })
  },
  previewimg: function (detail) {
    var id = detail.currentTarget.dataset.id;
    var url = detail.currentTarget.dataset.url;

    var imglist = [];
    var t = this;
    t.data.sharelist.forEach(function (i) {
      if (i.ID == id) {
        i.MaterialList.forEach(function (m) {
          imglist.push(m.ImgUrl)
        })
      }
    })
    wx.previewImage({
      urls: imglist,
      current: url
    })
  },

  like: function (detail) {
    var id = detail.currentTarget.dataset.id;
    var t = this;
    var list = t.data.sharelist;

    e.getOpenId(function (o) {
      wx.request({
        url: e.getUrl("AddLike"),
        data: {
          openId: o,
          ShareId: id
        },
        success: function (res) {

          list.forEach(function (i) {
            if (i.ID == id) {
              i.LikeList = res.data.Data;
              i.GiveLike = i.GiveLike == 0 ? 1 : 0;
            }
          })
          t.setData({
            sharelist: list
          })
        }
      })
    })

  },
  review: function (params) {
   
    var t = this;
    var id = params.currentTarget.dataset.id;
    var userid = params.currentTarget.dataset.userid;
    var username = params.currentTarget.dataset.username;
    var reviewid = params.currentTarget.dataset.reviewid;

    const query = wx.createSelectorQuery().in(this);        
    query.select('#'+reviewid).boundingClientRect();
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      //console.log(res);
    })

    var list = t.data.sharelist;
    if (t.data.UserInfo.UserId == userid) {
      wx.showModal({
        title: '确定删除你的评论吗？',
        success(res) {
          if (res.confirm) {
            e.getOpenId(function (o) {
              wx.request({
                url: e.getUrl('DelMomentsReview'),
                data: {
                  openId: o,
                  ID: reviewid,
                  ShareId: id
                },
                success: function (r) {
                  list.forEach(function (i) {
                    if (i.ID == t.data.ShareId) {
                      i.ReviewList = r.data.Data;
                    }
                  })
                  t.setData({
                    sharelist: list
                  })
                }
              })
            })
          } else if (res.cancel) {
            return false;
          }
        }
      })
    } else {
      var bar = t.getTabBar();
      bar.setData({
        showTab: false
      })

      list.forEach(function (i) {
        if (i.ID == id) {
          i.showReview = true;
        } else
          i.showReview = false;
      })
      var pageY = params.changedTouches[0].pageY;
      wx.getSystemInfo({
        complete: (res) => {        
          var h = 100 / (750 / res.windowWidth)
          wx.pageScrollTo({
            scrollTop: pageY - (res.windowHeight - h),
            duration: 500,
            complete: (res) => {},
          })
        },
      })
      setTimeout(function () {
        t.setData({
          sharelist: list,
          ShareId: id,
          showreview: true,
          placeholder: userid != void 0 && username != void 0 ? '回复' + username +'：': '评论...',
          IsReply: userid != void 0 && username != void 0 ? 1 : 0,
          ReplyUserId: userid != void 0 && username != void 0 ? userid : 0
        })
      }, 500)

    }
  },
  hidereview: function (params) {
    this.showtabbar();
    this.setData({
      showreview: false
    })
  },
  submitreview: function (detail) {
    var text = detail.detail.value;
    if(text=='')return false;
    var t = this;
    var list = t.data.sharelist;

    e.getOpenId(function (o) {
      wx.request({
        url: e.getUrl('AddMomentsReview'),
        data: {
          openId: o,
          ShareId: t.data.ShareId,
          ReviewText: t.data.IsReply == 0 ? text : '',
          IsReply: t.data.IsReply,
          ReplyText: t.data.IsReply == 1 ? text : '',
          ReplyUserId: t.data.ReplyUserId
        },
        success: function (res) {
          list.forEach(function (i) {
            if (i.ID == t.data.ShareId) {
              i.ReviewList = res.data.Data;
            }
          })
          t.setData({
            sharelist: list
          })
        }
      })
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var t = this;
    t.setData({
      Index: 1,
      sharelist: null
    })
    t.loaddata();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var t = this;
    t.setData({
      Index: t.data.Index + 1
    })
    t.loaddata();
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showtabbar(){
    var bar = this.getTabBar();
    bar.setData({
      showTab: true
    })
  }

})