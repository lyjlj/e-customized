var app = getApp();
Page({
  data: {
    circleList: 24, //圆点
    awardList: [], //奖品数组
    indexSelect: 0, //被选中的奖品index
    isRunning: false, //是否正在抽奖,
    id: 0,
    index: 0,
    hostUrl:'',
    windowHeight:0,
    second:0,
    userInfo:null
  },
  onLoad: function (option) {
    var that = this;
    that.setData({
      id: option.id,
      hostUrl:app.getRequestUrl,
      posterurl:app.getRequestUrl+'/Templates/xcxshop/images/poster'+parseInt(Math.random() * 10)+'.png'
    })
    wx.getSystemInfo({
      success (res) {
        that.setData({windowHeight:res.windowHeight})
      }
    })
    app.getSiteInfo(function () {
      app.getUserInfo(function (u) {
        that.setData({userInfo:u})
        that.getActivty();
      }, '../luckdraw/luckdraw?id=' + that.data.id)
      var ptimer=setInterval(function(r){
        if(that.data.second<=0)
        {
          clearInterval(ptimer)
          ptimer = null;
        }
        that.setData({
          second:that.data.second-1
        })
      },1000)
    });
  },
  goback:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  getActivty: function () {
    var that = this;
    var url = app.getRequestUrl + 'api/ActivitysHandler.ashx?action=GetActivityInfo&customId=' + app.customId;
    wx.request({
      url: url,
      data: {
        ActivityId: that.data.id
      },
      success: function (res) {
        var data = res.data.Result;
        var list = data.AwardList;
        var awardList = [];
        var obj = new Object();
        obj.AwardName = "只差一点";
        obj.AwardId=0;
        obj.AwardPic=app.getRequestUrl +'/Templates/xcxshop/images/xxcy.png'
        switch (list.length) {
          case 1:
            awardList = [obj, list[0], list[0], list[0], obj, list[0], list[0], list[0]];
            break;
          case 2:
            awardList = [obj, list[0], list[1], list[0], obj, list[1], list[0], list[1]];
            break;
          case 3:
            awardList = [obj, list[2], list[1], list[0], obj, list[2], list[1], list[0]];
            break;
          case 4:
            awardList = [obj, list[2], list[3], list[0], obj, list[2], list[3], list[1]];
            break;
          case 5:
            awardList = [obj, list[4], list[1], list[0], obj, list[4], list[3], list[2]];
            break;
          case 6:
            awardList = [obj, list[5], list[4], list[3], obj, list[2], list[1], list[0]];
            break;
          default:
            break;
        }
        that.setData({
          awardList: awardList,
          Activity:data
        })
      }
    })
  },
  //获取随机数
  getRandom: function (u) {
    let rnd = Math.random() > 0.5 ? "2" : "1";
    u = u || 3;
    for (var i = 0; i < u; i++) {
      rnd += Math.floor(Math.random() * 10);
    }
    return Number(rnd);
  },
  //开始抽奖
  startDrawing: function () {
    var that = this;
    if (this.data.isRunning) return
    this.setData({
      isRunning: true
    })
    that.ActivityDraw();
  },
  ActivityDraw: function () {
    var that = this;
    var url = app.getRequestUrl + '/api/ActivitysHandler.ashx?action=ActivityDraw&customId=' + app.customId;
    app.getOpenId(function (t) {
      wx.request({
        url: url,
        data: {
          ActivityId: that.data.id,
          openid: t
        },
        success: function (res) {
          if (res.data.Code == '1005'||res.data.Code=='1004') {
            var AwardId=res.data.AwardId;
            var index=that.data.awardList.findIndex(o=>o.AwardId==AwardId);
            that.setData({
              index: index
            });

            let indexSelect = 0;
            let i = 0;
            let randomNum = that.getRandom(3);
            let timer = setInterval(() => {
              ++indexSelect;
              //这里用y=30*x+150函数做的处理.可根据自己的需求改变转盘速度
              indexSelect = indexSelect % 8;
              that.setData({
                indexSelect: indexSelect
              })
              i += 40;
              if (i > randomNum) {
                //去除循环
                clearInterval(timer)
                timer = null;
                that.setData({indexSelect:that.data.index})
                //获奖提示
                if(that.data.index==0)
                {
                  wx.showModal({
                    title: '非常遗憾',
                    content: '只差一点就可以获得奖品',
                    confirmColor: '#5677FC',
                    showCancel: false,
                    success: (res) => {
                      if (res.confirm) {
                        that.setData({
                          isRunning: false
                        })
                      }
                    }
                  })
                  return;
                }
                wx.showModal({
                  title: '恭喜您',
                  content: `获得了奖品【${that.data.awardList[that.data.index].AwardName}】`,
                  confirmColor: '#5677FC',
                  showCancel: false, //去掉取消按钮
                  success: (res) => {
                    if (res.confirm) {
                      that.setData({
                        isRunning: false
                      });
                      wx.redirectTo({
                        url: '../MyPrize/MyPrize',
                      })
                    }
                  }
                })
              }
            }, (70 + i))
          } 
          else{
            wx.showModal({
              title: '提示',
              content: res.data.Msg,
              confirmColor: '#5677FC',
              showCancel: false, //去掉取消按钮
              success: (res) => {
                if (res.confirm) {
                  this.setData({
                    isRunning: false
                  })
                }
              }
            })
          }
        }
      });
    })
  },
  getPhoneNumber: function (p) {
    var t = this;
    if (p.detail.errMsg == 'getPhoneNumber:ok') {
      wx.request({
        url: app.getUrl("GetPhoneNum"),
        data: {
          openId: app.globalData.openId,
          encryptedData: p.detail.encryptedData,
          session_key: app.globalData.session_key,
          iv: p.detail.iv
        },
        success: function (a) {
          if (0 == a.data.error_response.code) {
            var user = app.globalData.userInfo;
            user.CellPhone = a.data.error_response.phone;
            t.setData({
              userInfo: user
            });
          } else {
            uat.showTip(a.data.error_response.sub_msg)
          }
        }
      });
    }
  }
})