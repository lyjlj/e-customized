// pages/Gallery/Gallery.js
var app=getApp();
var urlpath=app.getRequestUrl+'/Templates/xcxshop/images/gallery/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:0,
    foot:[
      {text:'图片',iconPath:urlpath+'gallerytp.png',selectedIconPath:urlpath+'gallerytp2.png'},
      {text:'名称',iconPath:urlpath+'gallerysx.png',selectedIconPath:urlpath+'gallerysx2.png'},
      {text:'标签',iconPath:urlpath+'gallerybq.png',selectedIconPath:urlpath+'gallerybq2.png'}],
    DefaultColor:'',
    imageUrl:'',
    SysHeight:1100,
    SysWidth:750,
    windowHeight:900,
    imageHeight:900,
    imageWidth:750,
    tagTab: 0,
    tagScrollLeft: 0,
    ProductList:[],
    Packages:[],
    Gallerys:[],
    showImage:true,
    showAttribute:false,
    showTag:false,
    curpoint:{},
    changepoint:{},
    points:[],
    movepoints:[],
    SizeRate:2,
    GalleryName:'',
    openEx:'',
    filters: [],
    HasPhoto:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.getSiteInfo(function(t){
      that.setData({
        DefaultColor:t.DefaultColor
      });
      that.setCartHeight();
      that.GetProducts({},false);
      that.GetGallerys();
      that.GetFilterType();
    })
    if(options.id){
      that.editPoint(options.id);
    }
  },
  uploadImage:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function(ires) {
            var w=750;
            var h=900;
            h=(750*ires.height)/ires.width
            if(h>that.data.windowHeight)
            {
              h=that.data.windowHeight;
              w=(ires.width*h)/ires.height
            }
            h=(750*ires.height)/ires.width
            if(h>that.data.windowHeight)
            {
              h=that.data.windowHeight;
              w=(ires.width*h)/ires.height
            }
            console.log(res.tempFilePaths[0]);
            that.setData({
              imageUrl:res.tempFilePaths[0],
              imageWidth:w,
              imageHeight:h,
              HasPhoto:true
            })
          }
        })
      }
    })
  },
  backList:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  setCartHeight: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        that.setData({
          windowHeight: height - 110,
          windowWidth: res.windowWidth,
          SysHeight:height,
          SysWidth:clientWidth,
          SysHeightRpx:height,
          SizeRate:changeHeight
        });
      }
    });
  },
  switchNav(event) {
    var that = this;
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      tagScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.tagTab == cur) {
      return false;
    } else {
      this.setData({
        tagTab: cur
      })
    }
  },
  switchTab(event) {
    var that=this;
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      tagTab: cur,
      tagScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  showTab:function(){
    if(this.data.showTag)
      this.setData({showImage:true,showTag:false,showAttribute:false});
    else
      this.setData({showImage:false,showTag:true,showAttribute:false});
  },
  onConfirmSearch:function(event){
    var key= this.data.keyword;
    this.GetProducts({keyword:key},false)
  },
  onInputKeyword:function(event){
    var key=event.detail.value;
    this.setData({keyword:key});

  },
  onInputGalleryName:function(event){
    var name=event.detail.value;
    this.setData({GalleryName:name});

  },
  GetProducts: function(param, loadmore) {
    var that = this;
    if (!loadmore)
      that.setData({
        showCompleted: false,
        ProductList:null
      });
    if (that.data.showCompleted)
      return;
    wx.showLoading();
    app.getOpenId(function(r) {
      var data= {
        openId: r,
        pageIndex: 1,
        pageSize: 50,
        moreAttrs:true
        
      };
      var filter = that.data.filter;
      for(var p in param){
        data[p] = param[p];
      }
      for (var obj in filter) {
        data[obj] = filter[obj];
      };
      wx.request({
        url: app.getUrl("GetProducts"),
        data: data,
        success: function(t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            var showCompleted = false;
            if (r.length <that.data.PageSize)
              showCompleted = true;
            that.setData({ showCompleted: showCompleted})
            if (loadmore) {
              var u = that.data.ProductList;
              u.push.apply(u, r), that.setData({
                ProductList: u,
              });
            } else that.setData({
              ProductList: r
            });
            wx.hideLoading();
          } else "NOUser" == t.data.Message || wx.showModal({
            title: "提示",
            content: t.data.Message,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {}
      });
    });
  },
  GetPackages: function(keyword, loadmore) {
    var that = this;
    wx.showLoading();
    app.getOpenId(function(r) {
      var data= {
        openId: r,
        keyword: keyword,
        pageIndex: 1,
        pageSize: 50
      };
      wx.request({
        url: app.getUrl("GetPackagingList"),
        data: data,
        success: function(t) {
          if ("OK" == t.data.Status) {
            var r = t.data.Data;
            that.setData({
              Packages: r
            });
            wx.hideLoading();
          } 
        },
        complete: function() {}
      });
    });
  },
  GetGallerys: function() {
    var that = this;
    app.getOpenId(function(r) {
      var data= {
        openId: r
      };
      wx.request({
        url: app.getUrl("GetGallerys"),
        data: data,
        success: function(t) {
          if (0 == t.data.code) {
            var r = t.data.data;
            that.setData({
              Gallerys: r
            });
          } else wx.showModal({
            title: "提示",
            content: t.data.msg,
            showCancel: !1,
            success: function(t) {
              t.confirm && wx.navigateBack({
                delta: 1
              });
            }
          });
        },
        complete: function() {}
      });
    });
  },
  // scanCode:function(){
  //   var that=this;
  //   wx.scanCode({
  //     success (res) {
  //       that.GetProducts(res.result,false);
  //     }
  //   })
  // },
  scanCode:function(){
    var that=this;
    wx.scanCode({
      onlyFromCamera: true,
      success(r){
        wx.request({
          url: 'https://www.daogoujingling.com/api/wechatapplet.ashx?action=GetJsonDataFromProc&proName=GetCounterProductByScan&customid='+app.customId+'&CounterDescID='+r.result,
          success(re){
            var data=re.data;
            if(data.code==0){
              var procodes=data.data[0].ProductIDs;
              that.GetProducts({LikeProductCodes:procodes},false);
            }else{
              wx.showToast({
                title: data.msg,
                icon: 'loading',
                duration: 3000
              })
              
            }
          }
        })
      }
    })
  },
  bindtap:function(event){
     var index = event.currentTarget.dataset.index;
     this.setData({selected:index})

  },
  clickImage:function(event){
    var that=this;
    that.showTab();
    var rate = (750/that.data.imageWidth)*that.data.SizeRate
    var point={
      reverse:false,
      rate: rate,
      movex:event.detail.x-10-(750-that.data.imageWidth)/(2*that.data.SizeRate),
      movey:event.detail.y-20-(that.data.windowHeight-that.data.imageHeight)/(2*that.data.SizeRate),
      w:0
    };
    that.setData({curpoint:point})
  },
  choseProduct:function(event){
    var that=this;
    var name = event.currentTarget.dataset.name;
    var productid = event.currentTarget.dataset.id;
    var index=event.currentTarget.dataset.index;
    var productList = that.data.ProductList;
    
    var points=this.data.points;
    var curpoint=this.data.curpoint;
    curpoint.name=name;
    curpoint.pid=productid;
    curpoint.ExtAttr=productList[index].showExt;
    points.push(curpoint);
    this.setData({points:points,movepoints:points})
    this.showTab();
  },
  changePoint:function(event){
    if(!event.detail.source)
      return;
    var that=this;
    var index = event.currentTarget.dataset.index;
    var point=that.data.points[index];
    point.movex=event.detail.x,
    point.movey=event.detail.y,
    point.index=index;
    that.setData({['points[' + index + ']']:point});
  },
  inputPoint:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    var name=e.detail.value;
    
    that.setData({
      ['points[' + index + '].name']:name
      
    });
  },
  removePoint:function(event){
    var index = event.currentTarget.dataset.index;
    var points=this.data.points;
    var point=this.data.points[index];
    points.splice(index,1);
    this.setData({points:points,movepoints:points});
  },
  pointReverse:function(event){
    // var that=this;
    // var index = event.currentTarget.dataset.index;
    // var id='#point'+index;
    // var points=this.data.points;
    // this.setData({points:points,movepoints:points});
    // var point=this.data.points[index];
    // point.reverse=!point.reverse;
    // wx.createSelectorQuery().select(id).boundingClientRect(function (rect) {
    //   if(point.reverse)
    //    point.movex-=rect.width;
    //   else
    //    point.movex+=rect.width;
    //   that.setData({['movepoints[' + index + ']']:point,['points[' + index + ']']:point});
    // }).exec();
    // console.log(point);
  },
  selectGallery:function(event){
    var that=this;
    var galleryId = event.currentTarget.dataset.galleryid;
    that.setData({GalleryId:galleryId,selected:2})
  },
  saveGallery:function(event){
    var that=this;
    if(!that.data.GalleryName){
      wx.showToast({
        title: '请输入名称',
        icon:'loading'
      })
      return;
    }
    if(!that.data.imageUrl){
      wx.showToast({
        title: '请选择图片',
        icon:'loading'
      })
      return;
    }
    var data={
      GalleryName:that.data.GalleryName,
      points:JSON.stringify(that.data.points)
    }
    if(that.data.GalleryItemId){
      data.GalleryItemId=that.data.GalleryItemId
    }
    wx.showLoading({
      title: '正在保存...',
      mask: true,
    })
    if(that.data.HasPhoto){
    
      wx.uploadFile({
        url: app.getUrl("SaveGallery")+"&HasPhoto=true",
        filePath: that.data.imageUrl,
        name: 'file',
        formData: data,
        timeout:60000,
        success: (resp) => {
          var res=JSON.parse(resp.data);
          wx.hideLoading();
          wx.showModal({
            title:'提示',
            content:res.msg,
            showCancel:false,
            success:function(r){
              if(res.code==0&&r.confirm)
                that.setData({GalleryId:0,points:[],movepoints:[],imageUrl:'',selected:0,GalleryName:''});
            }
          });
        }
      });
    }else{
      wx.request({
        url: app.getUrl("SaveGallery"),
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: data,
        success: (resp) => {
          var res=resp.data;
          wx.hideLoading();
          wx.showModal({
            title:'提示',
            content:res.msg,
            showCancel:false,
            success:function(r){
              if(res.code==0&&r.confirm)
                that.setData({GalleryId:0,points:[],movepoints:[],imageUrl:'',selected:0,GalleryName:''});
            }
          });
        }
      })
    }
    
    
  },
  onShow: function (event) {
    
  },
  openEx:function(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    if(index!=that.data.openEx){
      that.setData({
        openEx:index
      })
    }else{
      that.setData({
        openEx:999
      })
    }
    
  },
  fxcheckbox: function (e) {
    var index=e.currentTarget.dataset.index;
    var value=e.detail.value;
    this.setData({
      ['ProductList['+index+'].showExt']: value
    })
  },
  GetFilterType: function(filterParam) {
    var that = this;
    var data = {};
    var filters = that.data.filters;
    if (that.data.filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (o.length > 1 && v.IsCheck) {
          if (data[a.ParamName] == undefined)
            data[a.ParamName] = '';
          data[a.ParamName] += v.ValueId + '-';
        } else if (v.IsCheck) {
          data[a.ParamName] = v.ValueId;
        }
      })));
    };
    for (var obj in filterParam) {
      if (filterParam[obj])
        data[obj] = filterParam[obj];
    };
    wx.request({
      url: app.getUrl("GetFilterType"),
      data: data,
      success: function(a) {
        if (0 == a.data.code) {
          var e = a.data.data;
          that.setData({
            filters: e,
          });
        }
      }
    });
  },
  selectFilterValue: function(e) {
    var that = this;
    var valueid = e.currentTarget.dataset.valueid;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var ischeck = e.currentTarget.dataset.ischeck;
    var filters = that.data.filters;
    if (filters[fidx][aidx].ParamName == 'cId' && filters[fidx][aidx].AttributeName == '一级分类') {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (a.ParamName == 'cId') {
          v.IsCheck = false;
        }
      })));
    }
    filters[fidx][aidx].AttributeValues.forEach(o => o.ValueId == valueid ? o.IsCheck = !ischeck : o.IsCheck = false);

    var data = {};
    if (filters.length > 0) {
      filters.forEach(o => o.forEach(a => a.AttributeValues.forEach(function(v) {
        if (o.length > 1 && v.IsCheck) {
          if (data[a.ParamName] == undefined)
            data[a.ParamName] = '';
          data[a.ParamName] += a.AttributeId + '_' + v.ValueId + ',';
        } else if (v.IsCheck) {
          data[a.ParamName] = v.ValueId;
        }
      })));
    }
    console.log(data);
    that.setData({
      filters: filters,
      filter: data
    });
    that.GetFilterType();
  },
  bindShowFilter: function() {
    this.setData({
      showfilter: !this.data.showfilter
    });
  },
 
  bindmoreitem: function(e) {
    var that = this;
    var fidx = e.currentTarget.dataset.fidx;
    var aidx = e.currentTarget.dataset.aidx;
    var filters = that.data.filters;
    filters[fidx][aidx].ShowAll = !filters[fidx][aidx].ShowAll;
    that.setData({
      filters: filters
    });
  },
  bindConfirmFilter: function() {
    this.setData({
      showfilter: false
    });
    var filter=this.data.filter;
    var param="";
    for (var obj in filter) {
        if (param){
            param =param+"&"+obj+"="+ filter[obj];
        }else{
            param =obj+"="+filter[obj];
        }
    };
    this.GetProducts({},false);
    this.setData({
      tagTab: 0
    })
  },
  bindShowFilter: function() {
    this.setData({
      showfilter: !this.data.showfilter
    });
  },
  editPoint(id){
    var that=this;
    wx.request({
      url: app.getUrl("GetGalleryItemInfo"),
      data: {GalleryItemIds:id},
      success: function(t) {
        if (0 == t.data.code) {
          var r=t.data.data[0];
          wx.getImageInfo({
            src: r.Image,
            success(imgre){
              var w=750;
              var h=900;
              h=(750*imgre.height)/imgre.width
              if(h>that.data.windowHeight)
              {
                h=that.data.windowHeight;
                w=(imgre.width*h)/imgre.height
              }
              h=(750*imgre.height)/imgre.width
              if(h>that.data.windowHeight)
              {
                h=that.data.windowHeight;
                w=(imgre.width*h)/imgre.height
              }
             
              that.setData(
                {GalleryId:0,
                  points:JSON.parse(r.Points),
                  movepoints:JSON.parse(r.Points),
                  imageUrl:imgre.path,
                  selected:0,
                  GalleryName:r.GalleryName,
                  GalleryItemId:r.GalleryItemId,
                  imageWidth:w,
                imageHeight:h
                }
              )
            }
          })
        } else wx.showModal({
          title: "提示",
          content: t.data.msg,
          showCancel: !1,
          
        });
      },
      complete: function() {
       
      }
    });
  }
})