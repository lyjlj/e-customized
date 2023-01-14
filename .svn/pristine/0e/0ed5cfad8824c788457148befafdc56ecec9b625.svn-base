//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    articles:[],
    currentTab: 0,
    navScrollLeft: 0
  },
  //事件处理函数
  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    this.loadCategorys();
  },
  loadCategorys:function()
  {
    var that=this;
    wx.request({
      url: app.getUrl("GetAritcleCategorys"),
      data: {

      },
      success: function (a) {
        var o=a.data;
        that.setData({
          articles:o.data
        })
       
        that.locadArticles(o.data[0].CategoryId)
       
      },
      complete: function () { }
    });
  },
  locadArticles:function(cId){
    var that = this;
    var cItem=that.data.articles.filter(o=>o.CategoryId==cId)[0];
    if(cItem.Articles)
       return;
    var ar=[];
    for(var i=0;i<10;i++)
    {
      ar.push({
        Key:i,
        Value:i
      })
    }
    wx.request({
      url: app.getUrl("GetArticles"),
      data: {
        cId:cId,
        data: ar
      },
      success: function (a) {
        cItem.Articles = a.data.data;
        that.setData({
          articles: that.data.articles
        })
        
      },
      complete: function () { }
    });
  },
  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeftScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
    this.locadArticles(that.data.articles[cur].CategoryId);
  },
  switchTab(event) {
    var that=this;
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
    console.log(that.data.articles[cur])
    this.locadArticles(that.data.articles[cur].CategoryId);
  }
})