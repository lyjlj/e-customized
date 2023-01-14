var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productid: {
      type: String
    }
  },
  pageLifetimes:{
    show: function () {
      var that=this;
      that.setData({hideTip:app.globalData.hideLiveTip})
      this.setWindowHeight();
      if(app.liveRoomId)
      {
        
      }
      else
      {
        setTimeout(function(){
          that.loadData();
        },1000);
        that.closeLive();
      }
    },
    hide:function(){

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    playerUrl:'',
    windowHeight:0,
    showView:false,
    hideTip:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindPlay() {
      var that = this;
      that.ctx.play({
        success: res => {
        },
        fail: res => {
          wx.showModal({
            title: '提示',
            content: res.errMsg
          })
        }
      });
    },
    initPlay(){
      var that=this;
      if(!app.liveRoomId)
      {
        that.closeLive();
        return;
      }
      that.getRoomInfo();
    },
    getRoomInfo() {
      var that = this;
      if (that.data.playerUrl)
        return;
      that.setData({
        UserId: app.globalData.openId,
        hideTip: app.globalData.hideLiveTip
      })
      var params = {};
      params.action = 'GetLiveRoom';
      params.openId = app.globalData.openId;
      params.headImage = app.globalData.userInfo.picture;
      params.nickName = app.globalData.userInfo.realName;
      params.informationID = app.liveRoomId;
      wx.request({
        url: 'https://tool.daogoujingling.com/api/news/getnews',
        data: params,
        success: function (res) {
          var room = res.data.model;
          that.setData({ showView: true, playerUrl: 'rtmp://live.daogoujingling.com/daogoujingling/' + room.Id })
          that.ctx = wx.createLivePlayerContext('player');
          that.bindPlay();
        },
        fail: function (res) { }
      })
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
            x: clientWidth - clientWidth*0.35-10,
            y: clientHeight - clientHeight*0.35-170,
            x2: clientWidth - clientWidth * 0.25 - 15,
            y2: clientHeight - clientHeight * 0.25 - 10
          });
        }
      });
    },
    closeLive(){
      app.liveRoomId='';
      this.bindStop();
      this.setData({ showView: false, playerUrl:''})
    },
    closeLive2(){
      app.globalData.hideLiveTip=true;
      this.setData({ liveTip: null,hideTip:true });
    },
    bindStop() {
      if(!this.ctx)
        return;
      this.ctx.stop({
        success: res => {
          console.log('stop success')
        },
        fail: res => {
          console.log('stop fail')
        }
      });
      this.ctx = null;
    },
    toLiveRoom(){
      wx.redirectTo({
        url: '../live/live?id='+app.liveRoomId
      })
    },
    gotoLiveRecord(){
      wx.navigateTo({
        url: '../LiveRecord/LiveRecord'
      })
    },
    statechange(e) {
    },
    error(e) {
      console.error('live-player error:', e.detail.errMsg)
    },
    loadData() {
      var that = this;
      app.getSiteInfo(function(t){
        var appId = t.appId;
        wx.request({
          url: 'https://tool.daogoujingling.com/api/news/getnews?action=DGLiveRoomRecordList',
          data: {
            siteid: appId
          },
          success: function (res) {
            var livingProducts = [];
            if (!res.data.data || res.data.data.length == 0) {
              that.setData({
                liveData: [],
                liveTip:null
              })
            } else {
              var list = res.data.data;
              var locking=list.filter(function(p){
                return p.IsLooking;
              })
              list.forEach(p => {
                try {
                  p.Products = p.PushProducts ? JSON.parse(p.PushProducts).reverse() : [];
                  if (p.IsLooking)
                  {
                    if(!that.data.liveTip){
                      that.setData({ liveTip:p})
                    }
                    p.Products.forEach(function(v){
                      if(v.ProductId==that.data.productid)
                      {
                        app.liveRoomId=p.Id;
                        that.initPlay();
                        return;
                      }
                    });
                  }                           
                }
                catch (e) {
                  p.Products = [];
                }
              });
              if(locking.length<=0){
                  that.closeLive2();                
              }
            }
          }
        })
      });
    },
  }
})
