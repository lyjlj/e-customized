var t = getApp();
var app = t;
Page({
    data: {
        KeyWord: "",
        KeyWordList: null,
        GoToUrl: "../searchresult/searchresult",
        filters: [],
        DefaultColor:""
    },
    onLoad: function(e) {
        var t = this, o = "../searchresult/searchresult", r = wx.getStorageSync("keyWordList");
        r ? (r.reverse(), t.setData({
            KeyWordList: r,
            GoToUrl: o
        })) : t.setData({
            GoToUrl: o
        });
        app.getSiteInfo(function(s) {
            t.setData({
              DefaultColor: s.DefaultColor,
              SecondColor: s.SecondColor
            });
        });
        t.GetFilterType();
    },
    gotoHome: function(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    onInputKeyword: function(e) {
        var t = e.detail.value;
        this.setData({
            KeyWord: t
        });
    },
    onConfirmSearch: function(e) {
        var t = e.detail.value;
        this.gotoSearch(t), this.setData({
            KeyWord: t
        });
    },
    onHistoryKeyWordClick: function(e) {
        var t = e.currentTarget.dataset.keyword;
        this.gotoSearch(t);
    },
    removeKeyWord: function(e) {
        var t = e.currentTarget.dataset.keyword, o = wx.getStorageSync("keyWordList");
        o && (o.reverse(), this.removeByValue(o, t), wx.setStorageSync("keyWordList", o), 
        this.setData({
            KeyWordList: o
        }));
    },
    ClearKeyWord: function(e) {
        wx.showModal({
            title: "提示",
            content: "确认要清空所有历史记录吗！",
            success: function(e) {
                e.confirm && (wx.removeStorageSync("keyWordList"), wx.redirectTo({
                    url: "../search/search"
                }));
            }
        });
    },
    removeByValue: function(e, t) {
        for (var o = 0; o < e.length; o++) if (e[o] == t) {
            e.splice(o, 1);
            break;
        }
    },
    btngotoSearch: function() {
        this.gotoSearch(this.data.KeyWord);
    },
    gotoSearch: function(e) {
        var t = this;
        if (e.length > 0) {
            wx.setStorage({
                key: "keyword",
                data: e
            });
            var o = [], r = wx.getStorageSync("keyWordList");
            r && (o = r), -1 == o.join(",").indexOf(e) && o.push(e);
            var a = t.data.GoToUrl + "?keyword=" + e;
            t.data.GoToUrl.indexOf("searchresult") > -1 ? (wx.setStorageSync("keyWordList", o), 
            wx.redirectTo({
                url: a
            })) : wx.switchTab({
                url: a,
                success: function(e) {
                    wx.hideKeyboard();
                }
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    GetFilterType: function(filterParam) {
      var that = this;
      var data = {openId:app.globalData.openId};
      var filter = that.data.filter;
      for (var obj in filter) {
        if (filter[obj])
          data[obj] = filter[obj];
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
      if (filters[fidx][aidx].ParamName == 'cId') {
        data['cId']=valueid;
      }
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
        console.log(param);
        wx.navigateTo({
          url: '../searchresult/searchresult?'+param,
        })
      },
});