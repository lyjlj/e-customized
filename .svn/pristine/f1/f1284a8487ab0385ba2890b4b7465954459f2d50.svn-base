function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}
Page({
  data: {
    //touch start position
    tStart: {
      pageX: 0,
      pageY: 0
    },
    //限制滑动距离
    limitMove: 30,
    //element move position
    position: {
      pageX: 0,
      pageY: 0
    }
  },
  onLoad(){
    // wx.requestSubscribeMessage({
    //   tmplIds: ['Fnl0fWQmDV75wUzbjpbhP-FOp2FJhDj0dmrRm2_3eY0','Aw3pBLppyfsJ7N_Qz3wCtVOepAHmIuiz4ekEH4O3rf0'],
    //   success(res) { 
    //   }
    // });
    
  },
  handlerTouchstart(event) {
    const touches = event.touches ? event.touches[0] : {};
    const tStart = this.data.tStart;
    if (touches) {
      for (let i in tStart) {
        if (touches[i]) {
          tStart[i] = touches[i];
        }
      }
    }
  },
  swipper(touches) {
    const data = this.data;
    const start = data.tStart;
    const spacing = {
      pageX: touches.pageX - start.pageX,
      pageY: touches.pageY - start.pageY
    }
    if (data.limitMove < Math.abs(spacing.pageX)) {
      spacing.pageX = -data.limitMove;
      this.selectComponent('#bottomFrame').hideFrame();
      return;
    }
  },
  handlerTouchmove(event) {
    const start = this.data.tStart;
    const touches = event.touches ? event.touches[0] : {};
    if (touches) {
      const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
      if (direction === 'Down') {
        this.swipper(touches);
      }
    }
  },
  handlerTouchend(event) {
    const start = this.data.tStart;
    const touches = event.changedTouches ? event.changedTouches[0] : {};
    if (touches) {
      const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
      const spacing = {
        pageX: touches.pageX - start.pageX,
        pageY: touches.pageY - start.pageY
      }
      if (Math.abs(spacing.pageX) >= 40 && direction === "Left") {
        spacing.pageX = spacing.pageX < 0 ? - this.data.limitMove : this.data.limitMove;
      } else {
        spacing.pageX = 0;
      }
      this.setData({
        'position': spacing
      })
    }
  },
  getGrant:function(){
    this.selectComponent('#bottomFrame').showFrame();
    return;
    wx.requestSubscribeMessage({
      tmplIds: ['oOcwkYhLJmXtSr8WrWBNRySlQ97bcpQ9OJfXstOR3Lc'],
      success(res) {
        debugger;
      },
      fail(f){
        var msg=JSON.stringify(f);
        wx.showModal({
          title: '错误提示',
          content: msg
        })
        debugger;
      }
    })
  },
  toggleRight1() {
    this.setData({
      showRight1: !this.data.showRight1
    });
  },
  longTap(){
    wx.showModal({
      title: '提示',
      content: '长按事件'
    })
  },
  dbTap(){
    wx.showModal({
      title: '提示',
      content: '双击事件'
    })
  },
  multipleTap(){
    wx.showModal({
      title: '提示',
      content: '单击事件',
    })
  }
});
