// components/dialog/dialog.js
Component({
  properties:{

  },
  data:{
    showqrcode:false
  },
  pageLifetimes:{
   
  },
  methods:{
    showqrcode:function(e){     
      var t=this;
      t.setData({
        showqrcode:true,
        url:e.url,
        name:e.name
      })
    },
    hideqrcode:function(){
      var t=this;
      t.setData({
        showqrcode:false
      })
    },
    saveimg:function(){
      var t=this;     
      wx.downloadFile({
        url: t.data.url,
        success(res){         
          if(res.statusCode==200)
          {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(succ){
                wx.showModal({
                  title: '提示',
                  content:'保存成功!',
                  showCancel:false
                })
              }
            })
          }
        }
      })
    }
  }
})