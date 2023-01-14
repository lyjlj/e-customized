// pages/Favorites/Favorites.js
var o = getApp();
var app = o;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    FavoritesList:[],
    undersub:[],
    Url:o.getRequestUrl,
    subs:[],
    allcategorys:[],
    CategoryId:0,
    CurrentProduct: null
  },

  loadallcategorys(){
    var that=this;
    app.getOpenId(function(o){
      wx.request({
        url: app.getUrl('GetMainCategorys'),
        success(res){         
          var d=res.data.data.filter(function(p){
            return p.Depth==1;
          })
          d.forEach(function(p){
            p.istitle=true;
            p.subs=res.data.data.filter(function(t){
              return t.ParentCategoryId==p.CategoryId;
            })
          })
          that.setData({
            subs:d,
            allcategorys:res.data.data
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getFavoriteData(!1);
    that.loadallcategorys();
  },

  bindsubcateclick(e){
    var that=this;
    var cateid=e.currentTarget.dataset.cateid;
    var paraentid=e.currentTarget.dataset.paraentid;

    var d=that.data.subs;
    d.forEach(function(e){
      if(e.CategoryId==paraentid){
        e.subs.forEach(function(f){
          if(f.CategoryId==cateid)
          {
            f.selected=true
          }else f.selected=false
        })       
      }else if(e.subs!=undefined&& e.subs.length>0){
        e.subs.forEach(function(f){
           f.selected=false
        }) 
      }
    })
    var p=that.data.allcategorys.filter(function(r){
      return r.ParentCategoryId==cateid;
    })
    that.setData({
      PageIndex: 1,
      CategoryId: cateid,
      subs:d,
      undersub:p
    });
    that.getFavoriteData(!1); 
  },
  bindundersub(e){
    var that=this;
    var cateid=e.currentTarget.dataset.cateid;
    var undersub=that.data.undersub;
    undersub.forEach(function(p){
      p.selected=p.CategoryId==cateid;
    })

    that.setData({
      PageIndex: 1,
      CategoryId: cateid,
      undersub:undersub
    });
    that.getFavoriteData(!1); 
  },
  bindcateclick(e){
    var that=this;
    var cateid=e.currentTarget.dataset.cateid;
    that.setData({
      PageIndex: 1,
      CategoryId: cateid
    });
    that.getFavoriteData(!1);
    var parentid=e.currentTarget.dataset.paraentid;
    var allcategorys=that.data.allcategorys;
    var d=allcategorys.filter(function(p){
      return p.ParentCategoryId==cateid;
    })
    var subs=that.data.subs;    
    subs.forEach(function(p){     
      if(p.CategoryId==cateid&&p.subs==undefined)
      {
        p.subs=d;
      }else if(p.CategoryId==cateid){
        p.subs=undefined;
      }
    })
    if(cateid==-1){
      subs.forEach(function(p){   
        if(p.subs&&p.subs.length>0){
          p.subs.forEach(function(f){
            f.selected=false;
          })
        }     
      })
      that.setData({
        subs:subs
      })
    }
    that.setData({
      subs:subs
    })
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
  catchAddCart: function(a) {
    var e = this;   
    var productid = a.currentTarget.dataset.productid;
    var curProduct = {
      ProductId: productid
    };
    e.setData({
      CurrentProduct: curProduct
    });
    e.showSkuDOM();
  },
  showSkuDOM: function() {
    this.selectComponent("#selectSku").initData();
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
    // this.getFavoriteData(!0);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取收藏数据
  getFavoriteData:function(e){
    var that=this;

    wx.showLoading();
    o.getOpenId(function(r) {
      wx.request({
        url: app.getUrl("GetFavorites"),
        data: {
          openId:r,
          CategoryId:that.data.CategoryId
        },
        success: function(t) {         
          if(t.data.code==0){
            var f = t.data.data;
            if (e) {
              var u = that.data.FavoritesList;
              u.push.apply(u, f), that.setData({
                FavoritesList: u,
              });
            } else that.setData({
              FavoritesList: f
            });
            wx.hideLoading();
          }else "NOUser" == t.data.Message || wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        }
      });
    })  
  },
  bindDetail: function (t) {
    var e = t.currentTarget.dataset.productid;
      var r =  '../productdetail/productdetail?id=' + e;
        wx.navigateTo({
          url: r
        });
  },
  delCollect:function(e){
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid;
    
    o.getOpenId(function(r) {
      wx.request({
        url: app.getUrl("AddFavorite"),
        data: {
          openId:r,
          productid:goodsid
        },
        success: function(e) {
          wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 3000
          })
          that.getFavoriteData(!1); 
        }
      });
    })
  },
})