// custom-tab-bar/index.js
var app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  lifetimes:{
    attached: function () {    
      var that=this;
      wx.getSystemInfo({
        success (res) {         
          var screenHeight = res.screenHeight
          var bottom = res.safeArea.bottom         
          that.setData({
            navHeight:120+screenHeight-bottom
          })
        }
      })
      if(this.data.foot.length>0)
        return;       
        wx.request({
          url: app.getUrl('GetTopMenus'),
          success(res){           
            var foot=[];
            res.data.data.forEach(function(v){
              if(v.Content.toLowerCase().indexOf('default')>-1)
                 v.Content='/pages/home/home';
              if(v.Content.toLowerCase().indexOf('productsearch')>-1)
                 v.Content='/pages/productcategory/productcategory';
              if(v.Content.toLowerCase().indexOf('shoppingcart')>-1)
                 v.Content='/pages/shopcart/shopcart';
              if(v.Content.toLowerCase().indexOf('membercenter')>-1)
                 v.Content='/pages/usehome/usehome';
              if(v.Content.toLowerCase().indexOf('productlist')>-1)
                 v.Content='/pages/searchresult/searchresult';
              if(v.Content.toLowerCase().indexOf('sharemoments')>-1) 
                v.Content='/pages/sharemoments/sharemoments' 
              foot.push({
                url:v.Content,
                text:v.Name,
                color:v.Color,
                selectedColor:v.Color2,
                iconPath:app.getRequestUrl+v.ShopMenuPic,
                selectedIconPath:app.getRequestUrl+v.ShopMenuPic2
              })
            });
            that.setData({foot:foot})
          }
        })
    },
    hide:function(){

    }
   
  },
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    showTab:true,
    foot:[],
    navHeight:160
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path;
      app.globalData.tabBarIndex=data.index;
      this.setData({selected:data.index})
      wx.switchTab({ url:url,fail:function(){
        wx.navigateTo({
          url: url
        })
      } })
    }
  }
})



