var t = require("../../utils/config.js"),
    util = require("../../utils/util.js"),
    e = getApp();
var app = e;
var WxParse = require("../../pages/wxParse/wxParse.js");
var location = require("../../utils/qqmap-wx-jssdk.min.js");
// components/templeate/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pageUrl: {
            type: String,
            value: "",
            observer: 'pageUrlChange'
        },
        scrollTop: {
            type: Number,
            value: 0
        },
        isframe: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        pageIndex: 1,
        pageSize: 10,
        isDataEnd: !1,
        choiceProducts: [],
        refreshSuccess: !0,
        keyword: "",
        TopicUrl: "",
        VersionNumber: "",
        TopicData: null,
        CurrentProduct: null,
        CurrentSku: null,
        selectedSkuContent: null,
        isShowSkuSelectBox: !1,
        TotalNum: 0,
        DefaultColor: '',
        imgUrls: [],
        swiperHeight: 0,
        RequestUrl: e.getRequestUrl,
        ShopCart: {},
        windowWidth: 0,
        windowHeight: 1000,
        banner: []
    },
    /**
     * 组件所在页面的生命周期
     */
    lifetimes: {
        ready: function () {
            var that = this;
            wx.getSystemInfo({
                success: function (res) {
                    that.setData({
                        windowWidth: res.windowWidth,
                        windowHeight: res.windowHeight
                    });
                }
            });
        },
        moved: function () {
            //在组件实例被移动到节点树另一个位置时执行
        },
        resize: function () {},
        attached: function () {

        },
        detached: function () {
            //在组件实例被从页面节点树移除时执行
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPullDownRefresh: function () {

        },
        pageUrlChange: function (newVal, oldVal, changedPath) {
            // 页面被展示
            var t = this;
            t.setData({
                TopicUrl: t.properties.pageUrl,
            });
            // app.getSiteInfo(function (s) {
            //   t.setData({
            //     DefaultColor: s.DefaultColor
            //   })
            // });
            t.CheckVersionNumber(t);
        },
        initTabSwiper: function (tIndex, dIndex) {
            var that = this;
            var sitem = that.data.TopicData[tIndex];
            var topicid = sitem.content.dataset[dIndex].link.split('TopicId=')[1];
            var pageUrl = app.getRequestUrl + '/Templates/topic/waptopic/topic_' + topicid + '.json';
            if (!sitem.content.dataset[dIndex].pageUrl) {
                that.setData({
                    ['TopicData[' + tIndex + '].content.dataset[' + dIndex + '].pageUrl']: pageUrl
                })
            }
            if (!sitem.content.currentTab) {
                that.setData({
                    ['TopicData[' + tIndex + '].content.currentTab']: 0
                })
            }
            var id = '#s' + sitem.id + dIndex;
            setTimeout(() => {
                that.getViewHeight(id, function (rect) {
                    that.setData({
                        ['TopicData[' + tIndex + '].content.dataset[' + dIndex + '].height']: rect.height + 20
                    })
                });
            }, 1000);

            setTimeout(() => {
                that.getViewHeight(id, function (rect) {
                    that.setData({
                        ['TopicData[' + tIndex + '].content.dataset[' + dIndex + '].height']: rect.height + 20
                    })
                });
            }, 3000);
            setTimeout(() => {
                that.getViewHeight(id, function (rect) {
                    that.setData({
                        ['TopicData[' + tIndex + '].content.dataset[' + dIndex + '].height']: rect.height + 20
                    })
                });
            }, 5000);
        },
        ClickSwiper: function (t) {
            var that = this;
            var w, h;
            var id = t.currentTarget.dataset.id;
            var a = t.currentTarget.dataset.link,
                r = t.currentTarget.dataset.showtype,
                isplay = t.currentTarget.dataset.isplay;
            if (r == 28) {
                if (isplay) return false;
                var vId = id.split('-')[0];
                var index = id.split('-')[1];
                var topicData = that.data.TopicData;
                that.data.TopicData.forEach(function (d) {
                    if (d.content.dataset && d.content.dataset.length > 0) {
                        d.content.dataset.forEach(function (da) {
                            da.IsPay = false;
                        })
                    }
                })
                const query = wx.createSelectorQuery().in(this);
                query.select('#click' + vId).boundingClientRect();
                query.selectViewport().scrollOffset()
                query.exec(function (res) {
                    w = res[0].width;
                    h = res[0].height;
                    var data = that.data.TopicData.filter(v => v.id == vId)[0];
                    var dataSet = data.content.dataset[index];
                    dataSet.IsPay = true;
                    dataSet.Height = h;
                    dataSet.Width = w;
                    that.setData({
                        TopicData: topicData
                    });
                })
            } else if (r == 33) {
                var topicData = that.data.TopicData;
                var data = that.data.TopicData.filter(v => v.id == id)[0];
                var dataSet = data.content.dataset[0];
                dataSet.isshowwindows = true;
                that.setData({
                    TopicData: topicData
                });
            } else
                that.JumpUrlByType(r, a);
        },
        VideoFinal: function (e) {
            var that = this;
            var id = e.currentTarget.id;
            var vId = id.split('-')[0];
            var index = id.split('-')[1];
            var topicData = that.data.TopicData;
            var data = that.data.TopicData.filter(v => v.id == vId)[0];
            var dataSet = data.content.dataset[index];
            dataSet.IsPay = false;
            that.setData({
                TopicData: topicData
            });
        },
        getHomeData: function (t) {
            var a = this;
            "NOUser" != t.Message ? ("OK" == t.Status ? (a.getHomeProductData(a.data.pageIndex, !0),
                a.setData({
                    refreshSuccess: !0,
                    // imageList: t.Data.ImgList,
                    // countDownList: t.Data.CountDownList,
                    TopicUrl: t.Data.HomeTopicPath,
                    VersionNumber: t.Data.Vid,
                    DefaultColor: t.Data.SiteInfo.DefaultColor
                }), e.globalData.siteInfo = t.Data.SiteInfo, wx.setNavigationBarTitle({
                    title: e.globalData.siteInfo.SiteName
                }), wx.setNavigationBarColor({
                    frontColor: '#ffffff',
                    backgroundColor: '#' + e.globalData.siteInfo.DefaultColor,
                }), a.CheckVersionNumber(a)) : wx.showToast({
                title: "系统数据异常"
            }), wx.hideNavigationBarLoading()) : wx.navigateTo({
                url: "../login/login"
            });
        },
        getHomeProductData: function (a, r) {
            var o = this;
            void 0 == r && (r = !1), a < 1 && (a = 1), e.getOpenId(function (n) {
                var u = {
                    openId: n,
                    pageIndex: a,
                    pageSize: o.data.pageSize
                };
                wx.showLoading && wx.showLoading({
                    title: "首页数据加载中..."
                }), t.httpGet(e.getUrl(e.globalData.GetIndexProductData), u, function (t) {
                    if ("OK" == t.Status) {
                        var e = o.data.choiceProducts;
                        if (t.Data.ChoiceProducts.length > 0) {
                            for (var n in t.Data.ChoiceProducts) {
                                var u = t.Data.ChoiceProducts[n];
                                e.push(u);
                            }
                            var i = {
                                choiceProducts: e
                            };
                            (!t.Data.ChoiceProducts || t.Data.ChoiceProducts.length < o.data.pageSize) && (i.isDataEnd = !0),
                            r && (i.pageIndex = a + 1), o.setData(i);
                        }
                    }
                    wx.hideLoading();
                });
            });
        },
        CheckVersionNumber: function (t) {
            t.DownloadTopcis(t)
            // var e = wx.getStorageSync("versionnumber");
            // null == e || "" == e || "undefined" == e || parseInt(e) < parseInt(t.data.VersionNumber) ? (wx.setStorageSync("versionnumber", t.data.VersionNumber), 
            // t.DownloadTopcis(t)) : t.HomeTopicData(t);
        },
        DownloadTopcis: function (t) {
            var that = this;
            wx.request({
                url: t.data.TopicUrl,
                dataType: "json",
                success: function (t) {
                    console.log(t);
                    that.triggerEvent('setpagetitle', {
                        title: t.data.page.title
                    });
                    that.HomeTopicData(that, t.data.LModules)

                    that.GetShopCart();
                },
                complete: function () {
                    //t.HomeTopicData(t);
                }

            });
        },
        HomeTopicData: function (t, data) {
            wx.showNavigationBarLoading();
            var that = this;
            //   that.setData({
            //     TopicData: data
            //   });

            //数据处理
            for (var i = 0; i < data.length; i++) {
                if (data[i].type == 1)
                    WxParse.wxParse(data[i].id, 'html', data[i].content.fulltext, that, 0, i);
                if (data[i].type == 9 && data[i].content.showType == 1) {
                    data[i].content.dataset.forEach(function (p, pi) {
                        // p.pic = p.pic.replace('http', 'https')
                        if (p.pic.indexOf('http') < 0)
                            p.pic = that.data.RequestUrl + p.pic.substring(p.pic.indexOf('daogoujingling.com') + 18);
                        if (data[i].content.dataset.length > 1)
                            that.imgH(i, pi, p);
                    });
                }
                if (data[i].type == 9) {
                    data[i].content.dataset.forEach(function (p, pindex) {
                        if (p.linkType == 30) {
                            var mapInfo = p.link;
                            mapInfo.forEach(function (m) {
                                var ms = m.areaMapInfo.split(',');
                                m.top = ms[1] * 2;
                                m.left = ms[0] * 2;
                                m.width = ms[2] * 2 - m.left;
                                m.height = ms[3] * 2 - m.top;
                            });
                            p.mapInfo = mapInfo;
                        }

                        // 控制不需要给showType == 3 最后一张图片对象加高度 szh add  

                        if (data[i].content.showType == 3) {
                            if (data[i].content.dataset.length > 1) {
                                // console.log('i', i, )
                                // let pindex22 = pindex == data[i].content.dataset.length-1 ? -1 :pindex
                                let flag = pindex == data[i].content.dataset.length - 1 ? true : false
                                if (flag) {
                                    return
                                }
                                that.imgH(i, pindex, p);
                            }
                        } else {
                            if (data[i].content.dataset.length > 1) {
                                that.imgH(i, pindex, p);
                            }
                        }

                    });

                    if (data[i].content.showType == 3) {
                        data[i].content.dataset.forEach((item, index) => {
                            if (index == data[i].content.dataset.length - 1) {
                                data[i].content.dataset.splice(index, 1)
                                data[i].content.lastDataset = item
                            }
                        })
                    }

                    // 获取滑动轮播的数据
                    if (data[i].content.showType == 5) {
                        const banner = that.data.banner;
                        data[i].content.dataset.forEach(v => {
                            banner.push({
                                pic: v.pic,
                                link: v.link
                            })
                        })
                        console.log(banner);

                        that.setData({
                            banner
                        })
                    }
                }
                if (data[i].type == 7) {
                    var title = data[i].content.dataset[0].showtitle;
                    if (title.indexOf('$UAT-SCROLL#') > -1) {
                        data[i].content.dataset[0].showtitle = title.replace('$', '').replace('#', '').replace('#$', '').replace('UAT-SCROLL', '');
                        data[i].type = 50; //50更新为顶部广告的类型
                    }
                }

                if (data[i].type == 9 || data[i].type == 8) {
                    //放视频，去掉链接后缀
                    data[i].content.dataset.forEach(function (item) {
                        if (item.linkType == 28) {
                            item.link = item.link.split("?")[0];
                        }
                    })
                }

                if (data[i].type == 24) {
                    that.getArticles(data, i)
                }
                if (data[i].type == 5) {
                    data[i].content.goodslist = [];
                    that.GetProductList(data[i], i);
                }
                that.setData({
                    TopicData: data
                });
                if (data[i].type == 12) {
                    that.initTabSwiper(i, 0)
                }
            }

            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        },
        //图片滑动事件
        change: function (e) {

        },
        //获取图片的高度，把它设置成swiper的高度
        imgH: function (i, pi, e) {
            if (!e)
                return;
            var that = this
            wx.getImageInfo({ //获取图片长宽等信息
                src: e.pic,
                success: function (res) {
                    var imgw = res.width;
                    var imgh = res.height
                    var swiperH = 750 * imgh / imgw;
                    that.setData({
                        ['TopicData[' + i + '].content.dataset[' + pi + '].swiperH']: swiperH //设置高度
                    })
                    that.data.TopicData[i].content.dataset.forEach(function (v) {
                        if (v.swiperH > swiperH)
                            swiperH = v.swiperH;
                    });
                    that.setData({
                        ['TopicData[' + i + '].content.swiperH']: swiperH //设置高度
                    });
                }
            })
        },
        payVideo: function (e) {
            var v = e.detail.dataset;
            e.IsPay
        },
        GetShopCart: function () {
            var that = this,
                a = 0,
                topicdata = that.data.TopicData;
            app.getOpenId(function (o) {
                wx.request({
                    url: app.getUrl("getShoppingCartList"),
                    data: {
                        openId: o
                    },
                    success: function (t) {
                        if ("OK" == t.data.Status) {
                            var e = {};
                            t.data.Data.CartItemInfo.forEach(function (t, r, o) {
                                if (t.IsValid && e[t.ProductId] && e[t.ProductId] != 0) {
                                    e[t.ProductId] = parseInt(e[t.ProductId]) + parseInt(t.Quantity)
                                } else
                                    e[t.ProductId] = parseInt(t.Quantity);
                            });
                            that.setData({
                                ShopCart: e
                            })
                        }
                    },
                    complete: function () {}
                });
            });
        },
        catchAddCart: function (a) {
            var e = this;
            var productid = a.currentTarget.dataset.productid;
            if (!productid)
                productid = a.detail.productid;
            e.setData({
                CurProductId: productid
            });
            if (e.data.isframe)
                this.triggerEvent("catchAddCart", {
                    productid: productid
                });
            else
                this.selectComponent("#selectSku").initData();
        },
        setProductCartQuantity: function ({
            detail: param
        }) {
            var r = this,
                t = param.productid,
                a = param.quantity,
                e = param.opt,
                u = !1,
                n = r.data.ShopCart;
            if (!n[t]) n[t] = 0;
            switch (a = parseInt(a), e) {
                case "=":
                    n[t] = a;
                    break;

                case "+":
                    n[t] += a;
            }
            r.setData({
                ShopCart: n
            });
        },
        GetProductList: function (data, i) {
            var that = this;
            var sortBy = '';
            var sortOrder = '';

            app.getOpenId(function (o) {
                var param = {
                    openId: o,
                    pageIndex: 1,
                    pageSize: data.content.goodsize,
                    firstPriority: data.content.firstPriority,
                    secondPriority: data.content.secondPriority,
                    thirdPriority: data.content.thirdPriority,
                };
                if (data.content.datafrom == 2)
                    param.dflink = data.content.dflink
                else if (data.content.datafrom == 3) {
                    for (var obj in data.content.params) {
                        param[obj] = data.content.params[obj];
                    };
                }
                wx.request({
                    url: app.getUrl("GetProducts"),
                    data: param,
                    success: function (t) {
                        if ("OK" == t.data.Status) {
                            var products = t.data.Data;
                            var goodslist = [];
                            products.forEach(o => {
                                goodslist.push({
                                    item_id: o.ProductId,
                                    pic: o.Pic,
                                    price: o.SalePrice,
                                    title: o.ProductName,
                                    imgs: o.Imgs,
                                    code: o.ProductCode,
                                    WeightItems: o.WeightItems
                                })
                            });
                            var topicData = that.data.TopicData;
                            topicData[i].content.goodslist = goodslist;
                            that.setData({
                                ['TopicData[' + i + '].content.goodslist']: goodslist
                            });
                        }
                    },
                    complete: function () {}
                });
            });
        },
        JumpUrlByType: function (t, a) {
            var that = this;
            // 1: "选择商品",
            //   2: "分类导航",
            //     3: "商品分类",
            //       4: "品牌专题",
            //         5: "营销活动",
            //           6: "店铺主页",
            //             7: "会员主页",
            //               8: "购物车",
            //                 9: "全部商品",
            //                   10: "自定义链接",
            //                     11: "调查问卷",
            //                       12: "团购活动",
            //                         13: "限时抢购",
            //                           14: "自定义页面",
            //                             15: "积分商城",
            //                               16: "优惠券列表",
            //                                 17: "注册送券",
            //                                   18: "选择优惠券",
            //                                     19: "火拼团",
            //                                       20: "周边门店",
            //                                         21: "选择文章",
            //                                           22: "摇一摇",
            //                                             23: "电话",
            //                                               24: "品牌列表",
            //                                                 25: "文章列表",
            //                                                   26: "组合购",
            //                                                     27: "我要报名",
            //29: "自定义接口"
            if (t == 0)
                return;
            switch (t) {
                case 26:
                case 19:
                    0 == (a = a.toLowerCase()).indexOf("wx") && -1 == a.indexOf("/") ? wx.navigateToMiniProgram({
                        appId: a,
                        extarData: {},
                        envVersion: "develop",
                        success: function (t) {
                            console.log(t);
                        }
                    }) : (-1 == a.indexOf("http://") && -1 == a.indexOf("https://") && (a = e.getRequestUrl + a),
                        console.log(a));
                    break;
                case 1:
                    wx.navigateTo({
                        url: "../productdetail/productdetail?id=" + a.substring(a.indexOf('?productId=') + 11)
                    });
                    break;
                case 3:
                    // that.globalData.cid = a.substring(a.indexOf('?categoryId=') + 12);
                    wx.navigateTo({
                        url: "../searchresult/searchresult?cId=" + a.substring(a.indexOf('?categoryId=') + 12)
                    });
                    break;
                case 4:
                    wx.navigateTo({
                        url: "../searchresult/searchresult?brand=" + a.substring(a.indexOf('?BrandId=') + 9)
                    })
                    break;
                case 7:
                case 8:
                    wx.switchTab({
                        url: a
                    });
                    break;
                case 9:
                    wx.navigateTo({
                        url: "../searchresult/searchresult"
                    });
                    break;
                case 10:
                    a.indexOf('http') != -1 ? wx.navigateTo({
                        url: "../outurl/outurl?url=" + encodeURIComponent(a.replace('http://', 'https://'))
                    }) : wx.navigateTo({
                        url: a,
                        fail: function () {
                            wx.switchTab({
                                url: a,
                            })
                        }
                    });;
                    break;
                case 13:
                    wx.navigateTo({
                        url: '../countdown/countdown'
                    })
                    break;
                case 14:
                    // var pages = getCurrentPages(); //当前页面
                    // var beforePage = pages[pages.length - 2]; //前一页
                    // if (beforePage) {
                    //   wx.redirectTo({
                    //     url: "../diypage/index?url=" + encodeURIComponent(a)
                    //   })
                    // } else {
                    //   wx.navigateTo({
                    //     url: "../diypage/index?url=" + encodeURIComponent(a)
                    //   });
                    // }
                    wx.navigateTo({
                        url: "../diypage/index?url=" + encodeURIComponent(a)
                    });
                    break;
                case 28:
                    wx.makePhoneCall({
                        phoneNumber: a
                    });
                    break;
                case 29:
                    wx.navigateTo({
                        url: "../searchresult/searchresult?hideSearch=true&&dflink=" + encodeURIComponent(a)
                    });
                    break;
                case 30:
                    break;
                case 31:
                    var params = '';
                    var key = '';
                    if (a.indexOf('?') > -1) {
                        params = a.split('?')[1];
                        key = a.split('?')[0];
                    } else key = a;
                    that.triggerEvent(key, {
                        param: params
                    });
                    break;
                case 32:
                    var params = util.json2Form(a);
                    wx.navigateTo({
                        url: "../searchresult/searchresult?" + params
                    });
                    break;
                default:
                    wx.navigateTo({
                        url: a
                    });
            }
        },
        hideHomeDialog: function (e) {
            var that = this;
            var id = e.currentTarget.id;
            var vId = id.split('-')[0];
            var topicData = that.data.TopicData;
            var data = that.data.TopicData.filter(v => v.id == vId)[0];
            var dataSet = data.content.dataset[0];
            dataSet.isshowwindows = false;
            that.setData({
                TopicData: topicData
            });
        },
        previewImage(e) {
            var s = e.currentTarget.dataset.src;
            wx.previewImage({
                current: s[0],
                urls: s
            })
        },
        switchNav(event) {
            var that = this;
            var cur = event.currentTarget.dataset.current;
            var size = event.currentTarget.dataset.size;
            var index = event.currentTarget.dataset.tindex;
            if (this.data.currentTab == cur) {
                return;
            } else {
                this.setData({
                    ['TopicData[' + index + '].content.currentTab']: cur,
                    ['TopicData[' + index + '].content.switchNav']: true
                })
            }
        },
        switchTab(event) {
            var that = this;
            var cur = event.detail.current;
            var size = event.currentTarget.dataset.size;
            var index = event.currentTarget.dataset.tindex;
            var singleNavWidth = this.data.windowWidth / size;
            if (cur == undefined) {
                cur = event.currentTarget.dataset.current;
            }
            this.setData({
                ['TopicData[' + index + '].content.currentTab']: cur,
                ['TopicData[' + index + '].content.navScrollLeft']: (cur - 2) * singleNavWidth
            })
            that.initTabSwiper(index, cur);
        },
        getViewHeight: function (id, callback) {
            var that = this;
            wx.createSelectorQuery().in(this).select(id).boundingClientRect(function (rect) {
                if (typeof callback == "function")
                    callback(rect);
            }).exec()
        }
    }
})