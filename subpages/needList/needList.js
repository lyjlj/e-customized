// subpages/needList/needList.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DefaultColor: "83242a",
    Status: '',
    orderCount: [0, 50, 51, 52, 53, 54, 55, 56, 57,58,59],
    TotalNum: '0',
    pageSize: 100,
    current: 1,
    statusObj: {
      50: '待处理',
      51: '待确认',
      52: '已确认',
      53: '签订合同',
      // 54: '生产中',
      54:'模具制作中',
      55: '待发货',
      56: '待收货',
      57: '已完成',
      58: '确认样式',
      // 59: '模具制作中'
      59: '已取消',
      60: '方案调整中'
    },
    statusSum: {
      50: 0,
      51: 0,
      52: 0,
      53: 0,
      54: 0,
      55: 0,
      56: 0,
      57: 0,
      58: 0,
      59: 0,
      60: 0
    },
    isEmpty: false,
    statusAll: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    that.setData({
      Status: options.status,
      scrollLeft: options.index * 150,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var t = this;
    console.log(app.customId);
    t.loadData(t.data.Status, t, !1);

    // 获取所有状态的订单数量
    t.getNeedListStatus()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /* 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh() {

  },

  /* 页面上拉触底事件的处理函数 */
  onReachBottom() {
    var that = this,
      pages = 0;

    //  只有当前数据达到页码上限才加载下一页
    if (that.data.needData.length == that.data.pageSize) {
      pages = that.data.current + 1;

      that.setData({
        current: pages
      }), that.loadData(that.data.Status, that, !0);
    } else {
      pages = that.data.current;

      that.setData({
        current: pages
      })
    }
  },
  //确认样式
  checkStyle(e){
    console.log("确认样式",e)
    const url = "https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_UpdateStatus"
    const params = {
      id:e.currentTarget.dataset.id,
      status:54
    }
    wx.request({
      url,
      method:'post',
      data:params,
      success:function(res){
        wx.navigateTo({
          url:"/subpages/needList/needList"
        })
      }
    })
   

  },
  //确认收货
  checkReceipt(e){
    const url ="https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_UpdateStatus"
    const params = {
      id:e.currentTarget.dataset.id,
      status:57
    }
    wx.request({
      url,
      method:'post',
      data:params,
      success:function(res){
        wx.navigateTo({
          url:"/subpages/needList/needList"
        })
      }
    })
  },
  /* 用户点击右上角分享 */
  onShareAppMessage() {

  },
  //查看方案
  checkScheme(e) {
    var that = this;
    console.log(that.data.needData);
    console.log("e的值",e)
    var needList = that.data.needData,
      res = needList.filter((v, i) => v.id == e.currentTarget.id),
      type = res[0].type,
      attachment = res[0].details.attachment,
      quantity = res[0].details.quantity,
      needStr = res[0].details.needStr,
      desc = res[0].customizationmark ? res[0].customizationmark.desc : '',
      // url = res[0].customizationmark ? res[0].customizationmark.img[0].url : '',
      url = res[0].customizationmark ? res[0].customizationmark.adjustImg : '',
      n = desc ? desc : needStr,
      u = url ? url : attachment,
      offerInfo = res[0].customizationmark ? res[0].customizationmark :''
    console.log("res的值",JSON.stringify(offerInfo))
    wx.navigateTo({
      url: '/subpages/confirmScheme/confirmScheme?type=' + type + '&id=' + e.currentTarget.id + '&offerInfo='+JSON.stringify(offerInfo)  + '&needStr=' + n + '&quantity=' + quantity + '&attachment=' + u,
    })
  },
  onTabClick: function (t) {
    var e = this,
      a = t.currentTarget.dataset.status;
    var index = 0;
    e.data.orderCount.forEach(function (p, i) {
      if (p == a) {
        index = i;
      }
    });
    e.setData({
      PageIndex: 1,
      Status: a,
    });
    e.loadData(a, e, !1)
  },
  loadData: function (e, a, i) {
    console.log(app.globalData);
    wx.showLoading({
      title: "加载中"
    }), app.getUserInfo(function (r) {
      wx.request({
        url: 'https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_GetList',
        method: "POST",
        data: {
          userid: r.UserId,
          current: a.data.current,
          pageSize: a.data.pageSize,
          customId: app.customId,
          status: e
        },
        success: function (t) {
          if (t.data.code == 0) {
            var datalist = t.data.data;
            console.log(datalist);

            datalist.forEach(item => {
              // 处理JSON数据
              item.details = JSON.parse(item.details)
              item.customizationmark = JSON.parse(item.customizationmark);
              // 处理时间格式
              item.createtime = item.createtime.split('T').join(' ')
            })

            if (i) {
              let needData = a.data.needData;
              needData.push.apply(needData, datalist)
              a.setData({
                needData
              })
            } else {
              a.setData({
                Status: parseInt(e),
                needData: datalist
              })
            }
          } else "NOUser" == t.data.Message ? wx.navigateTo({
            url: "../login/login"
          }) : wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function (t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function () {
          wx.hideLoading();
        }
      });
    });
  },
  getNeedListStatus() {
    var that = this;
    app.getUserInfo(function (u) {
      wx.request({
        url: 'https://spapi.zhuanyegou.com/api/values?action=EnterpriseCustomization_GetList',
        method: "POST",
        data: {
          userid: u.UserId,
          current: 1,
          pageSize: that.data.pageSize,
          customId: app.customId
        },
        success(r) {
          if (r.data.code == 0) {
            var datalist = r.data.data,
              all = 0,
              allObj = {
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
              };

            datalist.forEach(item => {
              // 处理商品状态的数值
              switch (item.status) {
                case 50:
                  allObj[50] += 1;
                  break;
                case 51:
                  allObj[51] += 1;
                  break;
                case 52:
                  allObj[52] += 1;
                  break;
                case 53:
                  allObj[53] += 1;
                  break;
                case 54:
                  allObj[54] += 1;
                  break;
                case 55:
                  allObj[55] += 1;
                  break;
                case 56:
                  allObj[56] += 1;
                  break;
                case 57:
                  allObj[57] += 1;
                  break;
                case 58:
                  allObj[58] += 1;
                  break;
                case 59:
                  allObj[59] += 1;
                  break;
                case 60:
                  allObj[60] += 1;
                  break;
              }
            })
            var arr = Object.values(allObj),
              all = 0;
            arr.forEach(v => all += v)
            that.setData({
              TotalNum: that.data.total,
              statusSum: allObj,
              statusAll: all
            })
          }
        }
      })
    }, app.getCurrentUrl())
  },

  ToDetail(e) {
    var that = this,
      id = e.currentTarget.dataset.id,
      type = '',
      desc = '',
      needStr = '',
      quantity = '',
      attachment = '';
    
    that.data.needData.forEach(v => {
      if (id === v.id) {
        if (v.type == '标准定制') {
          type = v.type
          desc = v.customizationmark != null ? v.customizationmark.desc : v.details.needStr
          needStr = v.details.needStr
          quantity = v.details.quantity
          attachment = v.details.attachment
        } else if (v.type == '详细定制') {
          type = v.type
          desc = v.customizationmark != null ? v.customizationmark.desc : v.details.variety
          needStr = v.details.variety
          quantity = v.details.count
          attachment = v.details.companyLogo
        } else if (v.type == '快速定制') {
          type = v.type
          desc = v.details.needStr
          needStr = v.details.needStr
          quantity = 1
          attachment = v.details.attachment
        }
      }
    })
    wx.navigateTo({
      url: '/pages/demandDetail/demandDetail?type=' + type + '&desc=' + desc + '&needStr=' + needStr + '&quantity=' + quantity +
      '&id=' + e.currentTarget.dataset.id +
      '&attachment=' + attachment 
    })
  }
})