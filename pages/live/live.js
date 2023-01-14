const app = getApp();
var e = app;
var timer11; // 计时器
var timerlike;
var glowx;
Page({
  data: {
    focus: false,
    inputValue: '',
    showProduct: false,
    productData: [],
    comments: [],
    Adinfo:null,
    CurCoupon:null,
    showCoupon:false,
    AdvText:'',
    roomId: '',
    playerUrl: '',
    liveRoomInfo: null,
    UserNameColor: ['#ffd88e', '#cdf3f9', '#b69fff', '#fff'],
    userInfo: {},
    likes: [],
    showOnlineServer:false,
    likeindex: 0,
    userHeadImages: [],
    UserId: '',
    animationData: {},
    likeCount: 0,
    likeCountFormat: '',
    curProduct: null,
    livetips: [],
    host: app.getRequestUrl,
    url: 'https://tool.daogoujingling.com/api/news/getnews',
    maskHidden: false,
    i: 0,
    receivesendcode: '8FB88D34-BF02-4723-A991-4CF2655490C5',
    autoScroll:false
  },
  onLoad(options) {
    var that = this;
    var id = '';
    if (options.id) {
      id = options.id.toLowerCase();
    } else if (options.scene) {
      id = options.scene.toLowerCase();
    } else if (app.liveRoomId)
      id = app.liveRoomId;
      wx.showModal({
        title: '提示',
        content: e.globalData.siteAll,
        success: function (res) {
         
        }
      });
      
    that.setData({
      roomId: id,
      siteAll:e.globalData.siteAll

    });
    app.liveRoomId = id;
    var that = this;
    that.setWindowHeight();
    wx.onNetworkStatusChange(function (res) {
      if (res.isConnected) {
        that.SocketHandle();
      }
    })
    // setInterval(function(){
    //   if(glowx.readyState==2||glowx.readyState==3&&that.data.liveRoomInfo.IsLooking)
    //   {
    //       //自动重连
    //       glowx= wx.connectSocket({
    //         url: 'wss://tool.daogoujingling.com/api/news/GetWebSocketApi?user=' + that.data.UserId + '&id=' + that.data.liveRoomInfo.Id
    //       })
    //   }     
    // },1000)
  },
  onShow() {
    var that = this;
    if (!that.data.roomId) {
      wx.showModal({
        title: '提示',
        content: '当前直播无法播放，即将前往直播列表',
        success: function (res) {
          if (res.confirm) {
            that.handleExit(true);
          } else
            that.handleExit();
        }
      });
      return;
    }
    //获取直播间信息
    app.getSiteInfo(function (s) {
      that.setData({
        DefaultColor: s.DefaultColor,
        showOnlineServer: s.AppPushAppKey != '' && s.AppPushAppKey != undefined,
        LiveNotice:s.LiveNotices
      });
      app.getUserInfo(that.getRoomInfo, '../live/live?id=' + that.data.roomId);
    });

    app.liveRoomId = that.data.roomId;
    that.setWindowHeight();
  },
  onReady(res) {},
  GetLivingRedEnvelope(SendCode) {
    var that = this;
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('GetLivingRedEnvelope'),
        data: {
          RoomId: that.data.roomId,
          SendCode: SendCode || '',
          openId: o
        },
        success(res) {
          if (res.data.code == 0) {
            that.setData({
              RedEnvelope: res.data.data.SendRecord,
              showredEnvelope: !res.data.data.UserGetRecord ? 'get' : '',
              getting: res.data.data.UserGetRecord?'finish':'',
              getuserlist:res.data.data.GetRecordList
            })
          }
        }
      })
    })

  },
  godetail:function(){
    wx.navigateTo({
      url: "../outurl/outurl?CheckUser=true&url=" + encodeURIComponent(app.getRequestUrl + "wapShop/MyAccountSummary")     
    });
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
          windowHeight: height,
          safeArea:res.safeArea
        });
      }
    });
  },
  statechange(e) {
    var that = this;
    if (e.detail.code == '-2301') {
      // that.LiveComment('网络断连，且经多次重连抢救无效，更多重试请自行重启播放');
      that.setData({
        playerUrl: ''
      });
      wx.showLoading({
        title: '网络断连，重新连接...',
      })
      setTimeout(function () {
        that.getRoomInfo();
        wx.hideLoading();
        // that.LiveComment('抢救无效，尝试刷新直播间');
      }, 1000);
    }
    return;
    if (e.detail.code == '2001')
      that.LiveComment('已经连接服务器');
    else if (e.detail.code == '2002')
      that.LiveComment('已经连接 RTMP 服务器,开始拉流');
    else if (e.detail.code == '-2302')
      that.LiveComment('获取加速拉流地址失败');
    else if (e.detail.code == '2101')
      that.LiveComment('当前视频帧解码失败');
    else if (e.detail.code == '2103')
      that.LiveComment('网络断连, 已启动自动重连');
    else if (e.detail.code == '2104')
      that.LiveComment('网络来包不稳：可能是下行带宽不足，或由于主播端出流不均匀');
    else if (e.detail.code == '2105')
      that.LiveComment('当前视频播放出现卡顿');
    else if (e.detail.code == '2106')
      that.LiveComment('硬解启动失败，采用软解');
    else if (e.detail.code == '2107')
      that.LiveComment('当前视频帧不连续，可能丢帧');
    else if (e.detail.code == '3001')
      that.LiveComment('RTMP -DNS解析失败');
    else if (e.detail.code == '3002')
      that.LiveComment('RTMP服务器连接失败');
    else if (e.detail.code == '3003')
      that.LiveComment('RTMP服务器握手失败');
    else if (e.detail.code == '3005')
      that.LiveComment('RTMP 读/写失败');
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },

  //sock连接、处理
  SocketHandle() {
    var that = this;
    //关闭连接
    wx.closeSocket();
    //建立连接
    glowx= wx.connectSocket({
      url: 'wss://tool.daogoujingling.com/api/news/GetWebSocketApi?user=' + that.data.UserId + '&id=' + that.data.liveRoomInfo.Id
    })
    //连接成功
    wx.onSocketOpen(function () {
      that.intoLive();
    })
    //socket已经关闭
    wx.onSocketClose(function (res) {     
      if (res.code == '1006') {
        //自动重连
        wx.connectSocket({
          url: 'wss://tool.daogoujingling.com/api/news/GetWebSocketApi?user=' + that.data.UserId + '&id=' + that.data.liveRoomInfo.Id
        })
      }
    })

    //接收数据
    wx.onSocketMessage(function (data) {
      var objData = null;
      try {
        objData = JSON.parse(data.data);
      } catch (e) {
        objData = data.data;
      }
      that.handleMessage(objData);
    })

    //连接失败
    wx.onSocketError(function (error) {
      return;
      wx.showModal({
        title: '提示',
        content: '通讯链接失败，是否重连',
        success: function (res) {
          if (res.confirm) {
            wx.connectSocket({
              url: 'ws://admin.daogoujingling.com/api/news/GetWebSocketApi?user=' + that.data.UserId + '&id=' + that.data.roomId
            })
          }
        }
      })
    })
  },
  //获取直播间信息
  getRoomInfo() {
    var that = this;
    that.setData({
      UserId: app.globalData.openId,
      userInfo: app.globalData.userInfo
    })
    var params = {};
    params.action = 'GetLiveRoom';
    params.openId = app.globalData.openId;
    params.headImage = app.globalData.userInfo.picture;
    params.nickName = app.globalData.userInfo.realName;
    params.informationID = that.data.roomId;
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {
         // return false;
        var room = res.data.model;
        if (!room.IsLooking) {
          app.liveRoomId = '';
          wx.showModal({
            title: '提示',
            content: '直播已结束，即将前往直播列表',
            success: function (res) {
              if (res.confirm) {
                that.handleExit(true);
              } else
                that.handleExit();
            }
          });
          return;
        }
        if (room.MemberTagIds) {
          var tagids = room.MemberTagIds.split(',');
          var userTagIds = app.globalData.userInfo.TagIds.split(',');
          var flag = false;
          for (var i = 0; i < tagids.length; i++) {
            if (!tagids[i])
              continue;
            if (flag)
              break;
            if (userTagIds.indexOf(tagids[i]) >= 0)
              flag = true;
          }
          if (!flag) {
            app.liveRoomId = '';
            wx.showModal({
              title: '提示',
              content: '该直播暂不对外开放',
              success: function (res) {
                if (res.confirm) {
                  that.handleExit(true);
                } else
                  that.handleExit();
              }
            });
            return;
          }
        }
        var productlist = JSON.parse(room.Products).reverse();
        var curProduct = productlist ? productlist[0] : null;

        var adv = JSON.parse(room.Advertisements).reverse();
        var curadv = adv ? adv[0] : null;

        var Coupons = JSON.parse(room.Coupons).reverse();
        var curcoupon = Coupons ? Coupons[0] : null;
        that.setCurrProduct(curProduct);
        that.setData({
          liveRoomInfo: room,
          Adinfo:curadv,
          showCoupon:curadv!=null,
          CurCoupon:curcoupon,
          productData: productlist,
          likeCount: room.LikeCounts,
          likeCountFormat: that.dataFormat(room.LikeCounts),
          playerUrl: 'rtmp://live.daogoujingling.com/daogoujingling/' + room.Id,
        });
        that.ctx = null;
        that.ctx = wx.createLivePlayerContext('player');
        that.bindPlay();
        that.SocketHandle();
        that.GetLivingRedEnvelope();
      },
      fail: function (res) {}
    })
  },
  //进入直播间
  intoLive() {
    var that = this;
    var params = {};
    var c = {};
    c.UserId = that.data.UserId;
    // c.UserName = app.globalData.userInfo.nickName;
    c.Comment = app.globalData.userInfo.realName + "进入直播间";
    c.Type = "Live_Into";
    c.UserHeadImage = app.globalData.userInfo.headImage;
    c.informationID = that.data.liveRoomInfo.Id;
    params.content = JSON.stringify(c);
    params.action = "PushLiveMessage";
    params.informationID = that.data.liveRoomInfo.Id;
    params.type = 'Live_Into'
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {},
      fail: function (res) {}
    })
  },
  LiveComment(msg) {
    var that = this;
    var params = {};
    var c = {};
    c.UserId = that.data.UserId;
    c.Comment = app.globalData.userInfo.realName + msg;
    c.Type = "Live_Comment";
    c.UserHeadImage = app.globalData.userInfo.headImage;
    c.informationID = that.data.liveRoomInfo.Id;
    params.content = JSON.stringify(c);
    params.action = "PushLiveMessage";
    params.informationID = that.data.liveRoomInfo.Id;
    params.type = 'Live_Comment'
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {},
      fail: function (res) {}
    })
  },
  //点赞
  handleLike() {
    var that = this;
    that.setData({
      clickLike: true
    });
    setTimeout(function () {
      that.setData({
        clickLike: false
      })
    }, 200)
    var params = {};
    var c = {};
    c.UserId = that.data.UserId;
    c.UserName = app.globalData.userInfo.realName;
    c.Type = "LIKE";
    c.liveComment = app.globalData.userInfo.realName + '点赞';
    c.likeCount = that.data.likeCount + 1;
    c.date = new Date().getTime();
    c.informationID = that.data.liveRoomInfo.Id;
    c.UserHeadImage = app.globalData.userInfo.picture;
    c.informationID = that.data.liveRoomInfo.Id;
    params.content = JSON.stringify(c);
    params.action = "PushLiveMessage";
    params.informationID = that.data.liveRoomInfo.Id;
    params.type = 'LIKE'

    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {
        that.setWindowHeight();
      },
      fail: function (res) {}
    })

  },
  bindConfirm() {
    this.sendMessage();
  },
  closered(a) {
    var action = a.currentTarget.dataset.action;
    this.setData({
      showredEnvelope: action
    })
  },
  closecoupon(a) {   
    this.setData({
      showCoupon: false
    })
  },
  getcoupon(){
    var that=this;
    that.setData({
        showCoupon: true
    })
  },
  startGet() {
    var that = this;
    that.setData({
      getting: 'getting'
    })
    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('GetLiveRedEnvelope'),
        data: {
          openId: o,
          SendCode: that.data.RedEnvelope.SendCode
        },
        success(res) {
          setTimeout(function (params) {
            that.setData({
              getting: 'finish',
              gettext: res.data.msg,
              getuserlist: res.data.data
            })
          }, 1000)

        }
      })
    })
  },
  bindinput(e) {
    var t = e.detail.value;
    this.setData({
      inputValue: t
    });
  },
  bindblur() {
    var that = this;
    setTimeout(function () {
      that.setData({
        focus: false
      });
    }, 200);
  },
  //发送评论
  sendMessage() {
    var that = this;
    var i = that.data.i;
    that.setData({
      i: i + 1
    })
    var msg = this.data.inputValue;
    if (!msg)
      return;
    var params = {};
    var c = {};
    c.UserId = that.data.UserId;
    c.UserName = app.globalData.userInfo.realName;
    c.Comment = msg;
    c.Type = "Live_Comment";
    c.UserHeadImage = '123';
    c.informationID = that.data.liveRoomInfo.Id;
    params.content = JSON.stringify(c);
    params.action = "PushLiveMessage";
    params.informationID = that.data.liveRoomInfo.Id;
    params.type = 'Live_Comment';
    //console.warn('更新前------------------------------'+that.data.inputValue)
    that.setData({
      inputValue: ''
    });
    //console.warn('更新后------------------------------'+that.data.inputValue)  
    // that.setData({
    //   focus: false
    // });
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {},
      fail: function (res) {}
    })

    // setTimeout(function () { that.setWindowHeight(); }, 400);
  },
  inputtext(d) {
    var val = d.detail.value;
    var keys = d.currentTarget.dataset.keys;
    this.setData({
      [keys]: val
    })
  },
  // true:数值型的，false：非数值型
  myIsNaN(value) {
    return typeof value === 'number' && !isNaN(value);
  },
  //发送红包
  SendRedEnvelope(a) {
    var that = this;
    if (!that.data.totalcount)
      return false;
    if (!that.data.price)
      return false;
    if (that.data.price > that.data.userInfo.Balance) {
      wx.showModal({
        title: '提示',
        content: '余额不足',
        showCancel: false
      })
      return false;
    }

    app.getOpenId(function (o) {
      wx.request({
        url: app.getUrl('SendLiveRedEnvelope'),
        data: {
          openId: o,
          TotalCount: that.data.totalcount,
          Price: that.data.price,
          SendDesc: that.data.SendDesc || '恭喜发财，大吉大利！',
          RoomId: that.data.roomId
        },
        success(res) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          that.setData({
            showredEnvelope: '',
            price: '0.00',
            totalcount: '',
            SendDesc: ''
          })
          if (res.data.code == 0) {
            var leaveBalance = that.data.userInfo.Balance - that.data.price;
            that.data.userInfo.Balance = leaveBalance;
            app.globalData.userInfo.Balance = leaveBalance;
            that.pushSendRedEnvelope(res.data.data);
          }

        }
      })
    })

  },
  pushSendRedEnvelope(sendcode) {
    var that = this;
    var params = {};
    var c = {};
    c.tip = '发红包';
    c.informationID = that.data.liveRoomInfo.Id;
    c.Type = 'Live_RedEnvelope';
    c.sendcode = sendcode;
    params.content = JSON.stringify(c);
    params.action = "PushLiveMessage";
    params.informationID = that.data.liveRoomInfo.Id;
    params.type = 'Live_RedEnvelope';
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {},
      fail: function (res) {}
    })
  },
  pushTip(msg) {
    var that = this;
    if (!msg)
      return;
    var params = {};
    var c = {};
    c.tip = msg;
    c.informationID = that.data.liveRoomInfo.Id;
    c.Type = 'Live_Tip'
    params.content = JSON.stringify(c);
    params.action = "PushLiveMessage";
    params.informationID = that.data.liveRoomInfo.Id;
    wx.request({
      url: 'https://tool.daogoujingling.com/api/news/getnews',
      data: params,
      success: function (res) {},
      fail: function (res) {}
    })
    that.setData({
      inputValue: '',
      focus: false
    });
    setTimeout(function () {
      that.setWindowHeight();
    }, 400);
  },
  rotate: function () {

  },
  //处理消息
  handleMessage: function (evt) {
    var that = this;  
    //console.log(evt);
    var comments = that.data.comments;
    if (evt == "LeaveLive") {
      app.liveRoomId = '';
      wx.showModal({
        title: '提示',
        content: '主播已经离开直播间，是否前往直播列表查看',
        success: function (res) {
          if (res.confirm) {
            that.handleExit(true);
          } else
            that.handleExit(false);
        }
      })
      return;
    }
    if (evt.Type == "LIKE") {
      var that = this;
      var index = that.data.likeindex;
      var likes = that.data.likes;
      var likeicons = that.data.likes;

      likeicons.push({
        headImage: evt.UserHeadImage,
        liveComment: evt.liveComment,
        dt: evt.date
      });
      var likecount = evt.likeCount == 1 ? that.data.likeCount + 1 : evt.likeCount;
      that.setData({
        likes: likeicons,
        likeCount: likecount,
        likeCountFormat: that.dataFormat(likecount)
      });
      if (likeicons.length > 100)
        that.setData({
          likes: []
        })
    } else if (evt.Type == "REWARD") {
      return;
      ShowReward();
    } else if (evt.Type == "LeaveLive") {
      alert(JSON.stringify(evt))
      location.href = "/error/NoLiving";
    } else if (evt.Type == "Live_Comment"||evt.Type =='Live_Into') {      
      comments.push({
        UserName: evt.UserName,
        Comment: evt.Comment,
        UserId: evt.UserId,
        Type:evt.Type
      })
      
      if(evt.Comment.indexOf('进入直播间')>-1)
      {
        var liveRoom = that.data.liveRoomInfo;
        liveRoom.PopularityCount = liveRoom.PopularityCount+1;
        that.setData({
          liveRoomInfo: liveRoom,
        })
      }

    }else if(evt.Type=='Advertisement'){
        that.setData({
            Adinfo:evt
        })    }    
    else if (evt.Type == "PRODUCT") {
      //商品列表
      var productData = that.data.productData;
      var exist = productData.filter(function (p) {
        return p.ProductId == evt.ProductId;
      });
      if (exist == 0)
        productData.splice(0, 0, evt);
      that.setData({
        productData: productData
      });
      that.setCurrProduct(evt);
      //商品悬浮框
    } else if (evt.Type == "COUPON") {
        that.setData({
            CurCoupon:evt,
            showCoupon:true
        })
    } else if (evt.Type == "Live_Tip") {
      var tips = that.data.livetips;
      tips.push({
        tip: evt.tip
      });
      that.setData({
        livetips: tips
      });
    } else if (evt.Type == 'Live_RedEnvelope') {
      if (evt.sendcode) {
        that.GetLivingRedEnvelope(evt.sendcode);
      }
    } else {
      comments.push({
        UserName: evt.UserName,
        Comment: evt.Comment,
        UserId: evt.UserId,
        Type:evt.Type
      })
    }
    var top30list=comments;
    if(comments.length>50){
      top30list=comments.splice(comments.length-50,50);
    }
    that.setData({
      comments:top30list,
      scrollTop: top30list.length * 100
    });
  },
  onShareAppMessage: function (res) {
    var that = this;
    that.pushTip(app.globalData.userInfo.realName + '分享了直播');
    var roomInfo = that.data.liveRoomInfo;
    var i = "/pages/live/live?id=" + that.data.liveRoomInfo.Id;
    return {
      title: roomInfo.Title,
      path: i,
      imageUrl: roomInfo.Image,
      success: function (e) {
        wx.showModal({
          title: '提示',
          content: '分享成功'
        });
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '分享失败'
        });
      }
    };
  },
  StrCut2Arr: function (str, n) {
    var arr = [];
    var len = Math.ceil(str.length / n);
    for (var i = 0; i < len; i++) {
      if (str.length >= n) {
        var strCut = str.substring(0, n);
        arr.push(strCut);
        str = str.substring(n);
      } else {
        str = str;
        arr.push(str);
      }
    }
    return arr;
  },
  bindPlay() {
    var that = this;
    that.ctx.play({
      success: res => {},
      fail: res => {
        return;
        wx.showModal({
          title: '提示',
          content: res.errMsg
        })
      }
    });
  },
  bindExit(e) {
    this.handleExit(true);
  },
  handleExit(record) {
    //关闭连接
    wx.closeSocket();
    if (record) {
      wx.redirectTo({
        url: '/pages/LiveRecord/LiveRecord'
      })
      return;
    }
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
  bindButtonTap: function () {
    this.setData({
      focus: true,
      inputValue: ''
    });
  },
  bindShowProduct() {
    this.selectComponent("#produtsFrame").showFrame();
  },
  bindShowImage(event) {
    // console.log(event.currentTarget.dataset.info);
    // //图片预览
    // wx.previewImage({
    //   current: event.currentTarget.dataset.info, // 当前显示图片的http链接
    //   urls: [event.currentTarget.dataset.info] // 需要预览的图片http链接列表
    // })
  },
  bindHideProduct() {
    this.setData({
      showProduct: false
    })
  },
  toProductDetail(e) {
    var productid = e.currentTarget.dataset.productid;
    var packagingid = e.currentTarget.dataset.packagingid;
    if (packagingid > 0) return void wx.navigateTo({
      url: "../packdetail/packdetail?id=" + this.data.CurProduct.PackagingId
    });
    wx.navigateTo({
      url: '../productdetail/productdetail?id=' + productid,
    })
  },
  ToShopCart() {
    wx.switchTab({
      url: '/pages/shopcart/shopcart',
    })
  },
  toSelectSku(e) {
    if (this.data.CurProduct.CountDownId > 0) return void wx.navigateTo({
      url: "../countdowndetail/countdowndetail?id=" + this.data.CurProduct.CountDownId
    });
    if (this.data.CurProduct.PackagingId > 0) return void wx.navigateTo({
      url: "../packdetail/packdetail?id=" + this.data.CurProduct.PackagingId
    });
    var productid = e.currentTarget.dataset.productid;
    this.setData({
      CurProductId: productid
    });
    this.selectComponent("#selectSku").initData();
  },
  setCurrProduct(p) {
    var that = this;
    // if (that.data.CurProduct&&p.ProductId==that.data.CurProduct.ProductId)
    //   clearTimeout(that.data.productTimer);
    that.setData({
      CurProduct: p
    });
    // var productTimer=setTimeout(function(){
    //   that.setData({ CurProduct: null });
    // },12000);
    // that.setData({ productTimer: productTimer});
  },
  closeCurrProduct() {
    this.setData({
      CurProduct: null
    });
  },
  addShopTip({
    detail: p
  }) {
    var that = this;
    var quantity = p.quantity;
    var productid = p.productid;
    if (quantity <= 0)
      return;
    var product = that.data.productData.find(o => o.ProductId = productid);
    if (!product)
      return;
    var name = app.globalData.userInfo.realName;
    var productName = product.ProductName ? product.ProductName : '';
    that.pushTip(name + '加' + productName + '到购物车');
  },
  showShare() {
    this.selectComponent("#shareFrame").showFrame();
  },
  hideShare() {
    this.selectComponent("#shareFrame").hideFrame();
  },
  dataFormat(d) {
    if (d >= 10000)
      return (d * 0.0001).toFixed(1) + 'w';
    else if (d >= 1000)
      return (d * 0.001).toFixed(1) + 'k';
    else
      return d;
  },
  moreinfo() {
    this.selectComponent("#moreinfo").showFrame();
  },
  getImg: function (path) {
    path = path.replace('http:', 'https:');
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: path,
        success: function (res) {
          resolve(res);
        }
      })
    })
  },
  /**
   * 
   * @param {CanvasContext} ctx canvas上下文
   * @param {number} x 圆角矩形选区的左上角 x坐标
   * @param {number} y 圆角矩形选区的左上角 y坐标
   * @param {number} w 圆角矩形选区的宽度
   * @param {number} h 圆角矩形选区的高度
   * @param {number} r 圆角的半径
   */
  //画圆角边框
  roundRect(ctx, x, y, w, h, r, fillColor, strokeColor) {
    // 画圆角 ctx、x起点、y起点、w宽度、y高度、r圆角半径、fillColor填充颜色、strokeColor边框颜色
    // 开始绘制
    ctx.beginPath()

    // 绘制左上角圆弧 Math.PI = 180度
    // 圆心x起点、圆心y起点、半径、以3点钟方向顺时针旋转后确认的起始弧度、以3点钟方向顺时针旋转后确认的终止弧度
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // 绘制border-top
    // 移动起点位置 x终点、y终点
    ctx.moveTo(x + r, y)
    // 画一条线 x终点、y终点
    ctx.lineTo(x + w - r, y)
    // ctx.lineTo(x + w, y + r)

    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // 绘制border-right
    ctx.lineTo(x + w, y + h - r)
    // ctx.lineTo(x + w - r, y + h)

    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // 绘制border-bottom
    ctx.lineTo(x + r, y + h)
    // ctx.lineTo(x, y + h - r)

    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // 绘制border-left
    ctx.lineTo(x, y + r)
    // ctx.lineTo(x + r, y)

    if (fillColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.setFillStyle(fillColor)
      // 对绘画区域填充
      ctx.fill()
    }

    if (strokeColor) {
      // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
      ctx.setStrokeStyle(strokeColor)
      // 画出当前路径的边框
      ctx.stroke()
    }
    // 关闭一个路径
    // ctx.closePath()

    // 剪切，剪切之后的绘画绘制剪切区域内进行，需要save与restore
    ctx.clip()
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    var app = e;
    var path = that.data.liveRoomInfo.Image;
    var wxCode = that.data.wxCode;
    var posterBj = app.getRequestUrl + '/Utility/pics/liveposterbg.png';
    Promise.all([that.getImg(path), that.getImg(wxCode), that.getImg(posterBj)]).then(res => {
      var context = wx.createCanvasContext('mycanvas');

      let grd = context.createLinearGradient(0, 0, 750, 1334)
      //绘制背景
      context.drawImage(res[2].path, 0, 0, 750, 1334);

      //绘制名称
      var desc = that.data.liveRoomInfo.Title;
      for (var i = 0; i < 3; i++) {
        context.setFontSize(37);
        context.setFillStyle('#fff');
        var lineStr = desc.substring(i * 13, i * 13 + 13);
        if (i == 2 && desc.length > (i * 13 + 13))
          lineStr = desc.substring(i * 13, i * 13 + 10) + '...';
        context.fillText(lineStr, 150, 400 + (i * 50));
        context.stroke();
      }
      var a = res[0].height * 535 / res[0].width;
      if (res[0].height * 535 / res[0].width > 480)
        context.drawImage(res[0].path, 108, 520, 535, 480);
      else
        context.drawImage(res[0].path, 108, 520, 535, res[0].height * 535 / res[0].width);







      //绘制code码
      context.drawImage(res[1].path, 298, 1030, 170, 170);
      context.setFontSize(27);
      context.setFillStyle('#999999');
      context.setTextAlign('left');
      context.fillText("扫描或长按小程序码", 250, 1240);
      context.stroke();

      // that.roundRect(context, 500, 100, 200, 200, 20, '#000', '#000');
      context.draw();


      wx.hideToast()
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            that.setData({
              imagePath: tempFilePath,
              canvasHidden: true
            });
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 200);
    })
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
            }
          },
          fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  showPosterModel: function () {
    this.hidepup();
    this.setData({
      ShowPosterModel: true
    });
  },
  posterTitleChange: function (event) {
    var v = event.detail.value;
    if (v.length > 13)
      v = v.substring(0, 13);
    this.setData({
      posterTitle: v
    })
  },
  //点击生成
  formSubmit: function () {
    var that = this;
    that.hidepup();
    that.setData({
      maskHidden: false,
      ShowPosterModel: false
    });
    wx.showToast({
      title: '正在生成...',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: e.getUrl("GetWxCode"),
      data: {
        scene: that.data.liveRoomInfo.Id.replace('-', '').replace('-', '').replace('-', ''),
        page: 'pages/live/live'
      },
      success: function (e) {
        that.setData({
          wxCode: e.data.url
        })
        that.createNewImg();
        that.setData({
          maskHidden: true,
        });
        return;
        setTimeout(function () {
          that.createNewImg();
          that.setData({
            maskHidden: true,
          });
        }, 1000)
      }
    });

  },
  hideMask: function () {
    var that = this;
    that.setData({
      maskHidden: false
    })
  },
  preview: function (t) {
    var that = this;
    var e = t.target.dataset.src;
    wx.previewImage({
      urls: that.data.ProductImgs,
      current: e
    })
  },
  popup() {
    this.selectComponent('#shareFrame').showFrame();
  },
  hidepup() {
    this.selectComponent('#shareFrame').hideFrame();
  },
  getcouponinfo(g){
   
    var couponid=g.currentTarget.dataset.couponid;
    var t = this;
    app.getOpenId(function(e) {
        wx.request({
            url: app.getUrl("UserGetCoupon"),
            data: {
                openId: e,
                couponId: couponid
            },
            success: function(e) {
                "OK" == e.data.Status ? wx.showToast({
                    title: e.data.Message,
                    image: "../../images/succes.png"
                }) : "NOUser" == e.data.Message ? wx.navigateTo({
                    url: "../login/login"
                }) : (t.setCanReceive(n, !1), wx.showToast({
                    title: e.data.Message,
                    image: "../../images/warning.png"
                }));
            }
        });
    });
  },
  showonlineserver: function (t) {   
    wx.navigateTo({
      url: '/components/OnlineServiceNew/OnlineServiceNew?username=在线客服',
    })
  },
  scrolling(){
    var that=this;
    console.log("开始滚动");
    that.setData({
      autoScroll:true
    })
  },
  autoScrolling(){
    var that=this;
    console.log("恢复滚动");
    that.setData({
      autoScroll:false
    })
  }
})