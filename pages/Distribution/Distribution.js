var e = getApp();

Page({
    data: {
        openId: "",
        headerbg: e.getRequestUrl + "/Templates/xcxshop/images/feixiao_header.png",
        DistributionInfo: "",
        userInfo:null
    },
    onLoad: function(t) {
        var that=this;
        e.getUserInfo(function(u){
          that.setData({ userInfo:u})
       });
       that.getmoreicon();
    },
    onShow:function(){
        this.GetReferral();
    },
    GetReferral(){
        var n = this;
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl("GetReferralInfo"),
                data: {
                    openId: t
                },
                success: function(t) {
                    e.globalData.ReferralInfo = t.data.referral_get_response, n.GetCheckData();
                }
            });
        });
    },
    RefferStore: function() {
        wx.navigateTo({
            url: "../RefferStore/RefferStore"
        });
    },
    bindstoreinfo: function() {
        wx.navigateTo({
            url: "../storeInfo/storeInfo"
        });
    },
    GetCheckData: function() {
        this.setData({
            DistributionInfo: e.globalData.ReferralInfo
        });
    },
    bindyongjin: function(e) {
        wx.navigateTo({
            url: "../Splittin/Splittin"
        });
    },
    bindxiaji: function(e) {
        wx.navigateTo({
            url: "../SubMembers/SubMembers"
        });
    },
    bindordersettle:function(e){
        wx.navigateTo({
            url: "../OrderSettle/OrderSettle"
        });
    },
    bindaddSub:function(){
        wx.navigateTo({
            url: "../AddSubMember/AddSubMember"
        });
    },
    getmoreicon(){
        var that=this;
        var user=e.globalData.userInfo;
        wx.request({
          url: 'https://www.daogoujingling.com/api/wechatapplet.ashx?action=J2S&Function=GetMenus&typeid=2&customid='+e.customId+'&userid='+user.UserId,
          success(re){
            if(re.data.code==0){
              that.setData({
                moreIcon:re.data.data
              })
            }
          }
        })
      },
      showWebMenu(e){
          var that=this;
        var link=e.currentTarget.dataset.link;
        var user=that.data.userInfo;
        link=link+"&userid="+user.UserId;
        wx.navigateTo({
          url: '/pages/webview/webview?url='+encodeURIComponent(link),
        })
      }
});