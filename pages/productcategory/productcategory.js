function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}
var a, e = getApp();
Page((a = {
        data: {
            Css: {
                LHeight: 0,
                FirstIndex: 0,
                SecondIndex: 0,
                SortIndex: 1
            },
            CategoryList: [],
            CurrentCategory: null,
            ProductList: null,
            CurrentProduct: null,
            CurrentSku: null,
            Cid: 0,
            SortBy: "",
            SortOrder: "asc",
            KeyWord: "",
            PageIndex: 1,
            PageSize: 10,
            Num: 0,
            SortClass: "",
            isShow: !0,
            isShowSkuSelectBox: !1,
            selectedskuList: [],
            buyAmount: 1,
            selectedSku: "",
            SkuItemList: null,
            MarginTop: 0,
            TempMarginTop: 0,
            StartScrollTop: 0,
            IsDown: !0,
            IsPagePost: !1,
            DefaultColor: '',
            CategoryStyle:1
        },
        onLoad: function (t) {
            this.setData({
                DefaultColor: e.globalData.siteInfo.DefaultColor               
            });
            t.ReferralUserId && e.setRefferUserId(t.ReferralUserId);
            var a = t.cid;
            parseInt(a) > 0 && this.setData({
                Cid: a,
                IsPagePost: !0,
            });
        },
        onPullDownRefresh: function () {
            this.loadCategory(this);
        },
        SwitchSubCategory: function () {
            this.setData({
                IsDown: !0
            });
        },
        
        selectCategory: function () {
            var app = e;
            var that = this;
            if (app.globalData.cid == 0)
                return;
            var currentCategory = that.data.CategoryList.filter(function (c, index) {
                c.index = index;
                return c.cid == app.globalData.cid;
            })[0];
            if (currentCategory == null)
                return;
            var css = that.data.Css;
            css.FirstIndex = currentCategory.index;
            that.setData({
                Css: css,
                CurrentCategory: currentCategory,
                Cid: currentCategory.cid
            });
            app.globalData.cid = 0;
        },
        loadCategory: function (t) {
            var app = e;
            wx.showLoading();
            e.getOpenId(function (a) {
                wx.request({
                    url: e.getUrl("GetAllCategories"),
                    data: {},
                    success: function (a) {
                        if ("OK" == a.data.Status) {
                            wx.hideLoading();
                            var e = a.data.Data;
                            t.setData({
                                CategoryList: e,
                                CurrentCategory: e[0],
                                Cid: e[0].cid
                            }), t.selectCategory(), t.loadData(t, !1)
                        } else "NOUser" == a.data.Message || wx.showModal({
                            title: "提示",
                            content: a.data.Message,
                            showCancel: !1,
                            success: function (t) {
                                t.confirm && wx.navigateBack({
                                    delta: 1
                                });
                            }
                        });
                    },
                    complete: function () {
                        t.SetSubCategoryHeight();
                    }
                });
            });
        },
        gotoProduct: function (t) {
            var cid = t.currentTarget.dataset.cid;
            wx.navigateTo({
                url: '/pages/searchresult/searchresult?cId=' + cid,
            })
        },
      
        allProduct: function () {
            wx.navigateTo({
                url: '../searchresult/searchresult?isAll=true',
            })
        },
        
        findProductById: function (t) {
            return this.data.ProductList.find(function (a) {
                return a.ProductId == t;
            });
        }
    }, t(a, "bindSearchInput", function (t) {
        var a = t.detail.value;
        a.length > 0 && this.setData({
            keyword: a
        });
    }), t(a, "bindConfirmSearchInput", function (t) {
        var a = t.detail.value;
        a.length > 0 && (wx.setStorage({
            key: "keyword",
            data: a
        }), wx.switchTab({
            url: "../searchresult/searchresult",
            success: function (t) {
                wx.hideKeyboard();
            }
        }));
    }), t(a, "gotoKeyWordPage", function (t) {
        wx.navigateTo({
            url: "../search/search"
        });
    }), t(a, "bindBlurInput", function (t) {
        wx.hideKeyboard();
    }), t(a, "loadData", function (t, a) {
        
    }), t(a, "SetSubCategoryHeight", function () {
        var t = this.data.CurrentCategory.subs,
            a = parseInt(t.length) + 1,
            e = a / 3;
        a % 3 > 0 && (e = parseInt(e) + 1);
        var n = 0;
        e > 1 && (n = 90 * (e - 1)), this.setData({
            MarginTop: n,
            TempMarginTop: n,
            IsDown: !0
        });
    }), t(a, "onSkuHide", function (t) {
        this.setData({
            isShow: !0,
            CurrentSku: null,
            CurrentProduct: null,
            selectedSku: "",
            buyAmount: 1
        });
    }), t(a, "ChooseCategory", function (t) {
        var a = this,
            e = t.currentTarget.dataset.cid,
            n = t.currentTarget.dataset.grade,
            u = t.currentTarget.dataset.index,
            r = a.data.Css;
        "1" == n ? a.data.CategoryList.find(function (t, n) {
            if (r.FirstIndex = u, r.SecondIndex = 0, t.cid == e) return a.setData({
                CurrentCategory: t,
                Css: r,
                Cid: e,
                PageIndex: 1
            }), void a.SetSubCategoryHeight();
        }) : (r.SecondIndex = u, a.setData({
            Css: r,
            Cid: e,
            PageIndex: 1
        })), a.loadData(a, !1);
    }), t(a, "SortClick", function (t) {
        var a = this,
            e = t.currentTarget.dataset.sortby,
            n = t.currentTarget.dataset.index,
            u = a.data.Css;
        u.SortIndex = n;
        var r = "asc",
            s = "shengxu";
        a.data.SortOrder == r && (r = "desc", s = "jiangxu"), a.setData({
            PageIndex: 1,
            SortBy: e,
            SortOrder: r,
            SortClass: s,
            Css: u
        }), a.loadData(a, !1);
    }), t(a, "ChooseProduct", function (t) {
        var a = t.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + a
        });
    }), t(a, "onReady", function () {}), t(a, "onShow", function () {
        this.selectComponent("#liveWindow").initPlay();
        this.IsPagePost;
        if (this.data.CategoryList.length > 0) {
            this.selectCategory(), this.loadData(this, !1);
        } else
            this.loadCategory(this);

        //添加选中效果
    if (typeof this.getTabBar === 'function' &&this.getTabBar()) {
        var bar=this.getTabBar();
        var index=0;
        for(var i=0;i<bar.data.foot.length;i++)
        {
          if(bar.data.foot[i].url=='/pages/productcategory/productcategory')
             {
               index=i;break;
            }
        }
        bar.setData({
          selected: index,
          showTab:true
        })
      }
    }), t(a, "onHide", function () {}), t(a, "onUnload", function () {}), t(a, "onPullDownRefresh", function () {}),
    t(a, "onReachBottom", function () {
        var t = this.data.PageIndex;
        t = parseInt(t) + 1, this.setData({
            PageIndex: t
        }), this.loadData(this, !0);
    }), t(a, "onShareAppMessage", function () {
        var t = this,
            a = "/pages/productcategory/productcategory";
        return e.globalData.userInfo && e.globalData.userInfo.IsReferral && (a += "&ReferralUserId=" + e.globalData.userInfo.UserId), {
            title: '',
            path: a,
            success: function (t) {
                uat.showTip("分享成功", "success");
            },
            fail: function (t) {
                uat.showTip("分享失败", "error");
            }
        };
    }), a));