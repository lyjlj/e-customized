function swipeDirection(x1, x2, y1, y2) {
  return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
}
var app=getApp();
Component({
  properties: {

  },
  data: {
    flag: false,
    wrapAnimate: 'wrapAnimate',
    bgOpacity: 0,
    frameAnimate: 'frameAnimate',
    //touch start position
    tStart: {
      pageX: 0,
      pageY: 0
    },
    //限制滑动距离
    limitMove: 20,
    limitClose: 80,
    //element move position
    position: {
      pageX: 0,
      pageY: 0
    },
    zindex:100
  },
  properties: {
    frameTitle: {
      type: String,
      value: '标题',
    },
    zindex:{
      type: String,
      value:'100'
    },
    animation:{
      type:String,
      value:'true'
    },
    bgOpacity:{
      type:String,
      value:''
    }
  },

  methods: {
    showFrame() {
      this.setData({ flag: true, wrapAnimate: 'wrapAnimate', frameAnimate: 'frameAnimate', closeframeAnimate:null });
      this.setData({
        'position': {
          pageX: 0,
          pageY: 0
        }
      });
      app.globalData.ShowBottomFrame=true;
    },
    hideFrame() {
      const that = this;
      that.setData({ wrapAnimate: 'wrapAnimateOut', frameAnimate: 'frameAnimateOut' });
      setTimeout(() => {
        that.setData({ flag: false })
      }, 400);
      this.triggerEvent("hideevent");
      app.globalData.ShowBottomFrame=false;

    },
    hideFrame2(x){
      const that = this;
      var frameAnimation = wx.createAnimation({
        duration: 100,
        timingFunction: 'linear'
      });
      frameAnimation.opacity(1).translateX(x).step();
      frameAnimation.opacity(0).translateX(0).step();
      this.setData({
        closeframeAnimate: frameAnimation.export(),
        wrapAnimate: 'wrapAnimateOut'
      })
      setTimeout(() => {
        that.setData({ flag: false });
        app.globalData.ShowBottomFrame=false;
      }, 90);
    },
    catchNone() {
      //阻止冒泡
      return;
    },
    _showEvent() {
      this.triggerEvent("showEvent");
    },
    _hideEvent() {
      this.triggerEvent("hideEvent");
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
      if(this.data.animation!='true')
         return;
      const data = this.data;
      const start = data.tStart;
      const spacing = {
        pageX: touches.pageX - start.pageX,
        pageY: touches.pageY - start.pageY
      }
      if (data.limitClose < Math.abs(spacing.pageX)) {
        this.hideFrame2(Math.abs(spacing.pageX));
      }
    },
    handlerTouchmove(event) {
      if(this.data.animation!='true')
         return;
      const start = this.data.tStart;
      const touches = event.touches ? event.touches[0] : {};
      if (touches) {
        const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
        if (direction === 'Right') {
          const spacing = {
            pageX: touches.pageX - start.pageX,
            pageY: touches.pageY - start.pageY
          }
          if (Math.abs(spacing.pageX) >= this.data.limitMove && direction === "Right") {
            spacing.pageX = spacing.pageX;
          } else {
            spacing.pageX = 0;
          }
          this.setData({
            'position': spacing
          })
        }
      }
    },
    handlerTouchend(event) {
      if(this.data.animation!='true')
         return;
      const start = this.data.tStart;
      const touches = event.changedTouches ? event.changedTouches[0] : {};
      if (touches) {
        const direction = swipeDirection(start.pageX, touches.pageX, start.pageY, touches.pageY);
        if (direction === "Right")
           this.swipper(touches);
        const spacing = {
          pageX: touches.pageX - start.pageX,
          pageY: touches.pageY - start.pageY
        }
        if (Math.abs(spacing.pageX) >= this.data.limitClose && direction === "Right") {
          //spacing.pageX = spacing.pageX < 0 ? - this.data.limitMove : this.data.limitMove;
        } else {
          spacing.pageX = 0;
        }
        this.setData({
          'position': spacing
        })
      }
    }
  }
})