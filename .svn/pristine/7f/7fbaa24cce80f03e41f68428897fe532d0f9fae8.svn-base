// components/banner/banner.js


const duration = 300;
// 当手指滑动超过多少距离之后切换下一项
const exchangeOffset = 0

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        banner: {
            type: Array,
            value: []
        },
        style: {
            type: String,
            value: ""
        },
        // height : String ,
        width: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        current: 0,
        height: 0,
        boxShadow: "box-shadow:0px 0px 10px rgba(30,30,30,0.5)",
        banner: ["https://img0.baidu.com/it/u=2986628216,432429310&fm=253&fmt=auto&app=138&f=JPEG?w=680&h=491", "https://img0.baidu.com/it/u=983453083,1194935131&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=337",
            "https://img2.baidu.com/it/u=1371200421,252153325&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281", "https://img0.baidu.com/it/u=253735155,713417210&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800", "https://img1.baidu.com/it/u=3958253983,3391523968&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
        ],
        // banner:["","",""],
        total: 3,
        space: 3,
        verticalSpace: 5,
        radius: 10,
        touchStartPosition: 0,
        deltaX: 0,
        animationData: {},
        otherAnimationData: {},
        translateX: "translateX(0px)",
        eventType: 'tap', // 当前触发的事件类型,默认为点击事件
    },

    /**
     * 组件的方法列表
     */
    methods: {
        touchstart(e) {
            if (e.touches.length == 1) {

                const touch = e.touches[0];
                this.setData({
                    touchStartPosition: touch.pageX,
                    deltaX: 0,
                    translateX: "translateX(0px)",
                    animationData: {}
                })
            } else {

            }
        },
        touchmove(e) {
            this.setData({
                eventType: e.type
            })
            if (e.touches.length == 1) {
                const touch = e.touches[0];
                const tranX = touch.pageX - this.data.touchStartPosition;

                this.setData({
                    translateX: `translateX(${tranX}px)`,
                    deltaX: tranX
                })
            } else {

            }
        },
        clickImg() {
            this.triggerEvent('imgClick', {}, {
                img: "hellow"
            })
        },
        touchend(e) {
            // 判断是否触发了滑动事件
            if (this.data.eventType == 'touchmove') {
                const {
                    touchStartPosition,
                    deltaX
                } = this.data;
                const offsetLeft = deltaX;

                if (offsetLeft > -exchangeOffset) {
                    this.reset();
                } else {
                    this.toNext(e);
                }

                // 默认为点击事件
                this.setData({
                    eventType: 'tap'
                })
            } else {
                const index = e.currentTarget.dataset.index;
                const link = e.currentTarget.dataset.link;
                console.log(link);
                // 点击跳转自定义链接
                wx.navigateTo({
                    url: link,
                })
            }



        },
        toNext(e) {

            const ani = wx.createAnimation({
                duration: duration,
                timingFunction: 'ease'
            })
            const rate = 1 - ((this.data.banner.length) / 10)
            // 先将图片向左移动到屏幕以外
            ani.translateX(-400).step();
            // 修改层级成为最底层
            // 修改高度成为最小的
            const {
                height,
                banner,
                space,
                verticalSpace
            } = this.data;
            // 再向右移动到最后方（像是插入）
            ani.translateX(0 + "px").step();
            // ani.translateX(0).step();


            // const otherAni = wx.createAnimation({
            //   duration : duration,
            //   timingFunction : 'ease'
            // })
            // otherAni.height().step();
            // otherAni.left(0).top(0).step()

            this.setData({
                animationData: ani.export()
            })
            /**
             * 动画结束之后：
             * 1、队列中后续的对象通通往前面挪
             * 2、修复游标的指向
             * 3、最后面插入新对象
             * 4、z-index修改
             */
            var that = this;
            setTimeout(() => {
                const {
                    current,
                    banner
                } = this.data;;
                const newCurrent = (current + 1) % banner.length;
                that.setData({
                    touchStartPosition: 0,
                    deltaX: 0,
                    translateX: "translateX(0px)",
                    animationData: null,
                    current: newCurrent,
                    banner: [...that.data.banner]
                })

            }, duration);
        },
        animationEnd() {
            // this.setData({animationData:{}})
        },
        onReset() {
            this.setData({
                current: 0
            })
        },
        loadImg(e) {
            const dataH = this.data.height;
            if (dataH > 0) {
                return;
            }
            const {
                width,
                height
            } = e.detail;
            const query = wx.createSelectorQuery().in(this);
            var that = this;
            query.select("#banner_" + this.data.current).boundingClientRect(function (rect) {
                const containerWidth = rect.width;
                const ch = containerWidth * height / width;

                that.setData({
                    height: ch + "px"
                })
            }).exec();
        },
        reset() {

            let animationD = wx.createAnimation({
                delay: 0,
                timingFunction: "ease",
            })
            animationD.translate('0px', '0px').step()
            //
            //,translateX:"translateX(0px)",touchStartPosition:0,deltaX:0
            this.setData({
                animationData: animationD.export()
            })
            var that = this;
            setTimeout(() => {
                const {
                    current,
                    banner
                } = that.data;;
                const newCurrent = current
                that.setData({
                    touchStartPosition: 0,
                    deltaX: 0,
                    translateX: "translateX(0px)",
                    animationData: null,
                    current: newCurrent
                })

            }, duration);


        }
    }
})