var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        openId: "",
        PageIndex: 1,
        PageSize: 10,
        subMemberList: null,
        isempty: !0,
        ExpandMemberInMonth: "",
        ExpandMemberAll: "",
        LowerUserSaleTotal: "",
        LowerUserSaleWeight:0
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {
        var e = this;
        e.setData({
            PageIndex: 1
        }), e.loadData(e, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var e = this;
        e.loadData(e, !1);
    },
    onReachBottom: function() {
        var e = this, a = e.data.PageIndex + 1;
        e.setData({
            PageIndex: a
        }), e.loadData(e, !0);
    },
    onShareAppMessage: function() {},
    loadData: function(t, n) {
        wx.showLoading({
            title: "加载中"
        }), a.getOpenId(function(o) {
            wx.request({
                url: a.getUrl("SubMembers"),
                data: {
                    openId: o,
                    pageIndex: t.data.PageIndex,
                    pageSize: t.data.PageSize
                },
                success: function(a) {
                    if (void 0 == a.data.error_response) {
                        var o = a.data.SubMember_get_response, r = o.SubMembers;
                        if (n) {
                            var s = t.data.subMemberList;
                            s.push.apply(s, r), t.setData({
                                subMemberList: s,
                                ExpandMemberInMonth: t.data.ExpandMemberInMonth,
                                ExpandMemberAll: t.data.ExpandMemberAll,
                                LowerUserSaleTotal: t.data.LowerUserSaleTotal,
                                LowerUserSaleWeight:t.data.LowerUserSaleWeight
                            });
                        } else {
                            r.Total;
                            t.setData({
                                subMemberList: r,
                                isEmpty: t.data.isempty,
                                ExpandMemberInMonth: o.ExpandMemberInMonth,
                                ExpandMemberAll: o.ExpandMemberAll,
                                LowerUserSaleTotal: o.LowerUserSaleTotal,
                                LowerUserSaleWeight:o.LowerUserSaleWeight
                            });
                        }
                    } else e.showTip(a.data.error_response.errMsg);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    delSubMember:function(d){
        var e=this;
        var userid=d.target.dataset.userid;     
        var content=d.detail.value?'确定开启该子帐号吗？':'确定停用该子帐号吗？';    
        
        wx.showModal({
            title: '提示',
            content: content,
            success (res) {
              if (res.confirm) {
               a.getOpenId(function(o){
                wx.request({
                  url: a.getUrl('DelSubUser'),
                  data:{
                      openId:o,
                      UserId:userid
                  },
                  success(res){
                    e.setData({
                        PageIndex: 1
                    }), e.loadData(e, !1);
                  }
                })
               })
              } else if (res.cancel) {              
                e.setData({
                    PageIndex: 1
                }), e.loadData(e, !1);
              }
            }
          })
    }
});