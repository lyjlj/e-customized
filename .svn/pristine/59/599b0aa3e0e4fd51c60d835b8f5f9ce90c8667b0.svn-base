var app=getApp();
var visitval;
Component({
  properties: {
    source: {
      type: Number,
      value: 0
    },
    productid: {
      type: Number,
      value: 0
    },
    min: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal) {
        // 属性值变化时执行
      }
    },
    lastLeaf: {
      // 这个属性可以是 Number 、 String 、 Boolean 三种类型中的一种
      type: Number,
      optionalTypes: [String, Object],
      value: 0
    }
  },
  data:{
    top:10000,
    isshow:false
  },
  pageLifetimes:{
    show:function(){
      var o=this;
      app.getVisitInfo(o.data.productid,function(u){
        o.setData({
          VisitInfo:u
        })
        var banner=[];
        var i=0;
        app.getSiteInfo(function(s){
          if(s.AllSiteInfo.ShowvisitWindow){
            visitval = setInterval(() => {
              if(o.data.VisitInfo[i])
              {
                banner.push(o.data.VisitInfo[i])
                i++;
                o.setData({
                  banner:banner,
                  top:10000,
                  isshow:true
                })
              }else{
                i=0;
                banner=[];
                o.setData({
                  banner:[],
                  isshow:false
                })
                //clearInterval(visitval);
              }
            }, 5000);
          }
        })
       
      })
    },
    hide:function(){
      clearInterval(visitval)
    }
  }

})