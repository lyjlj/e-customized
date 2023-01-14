import {
  promisify
} from './promisify'

const wxGetImageInfo = promisify(wx.getImageInfo)
// 图标路径
const [localtionIconUrl, timeIconUrl, assemblyPointIconUrl] = ['/img/icons/localtion.png', '/img/icons/time.png', '/img/icons/assembly-point .png']
// 是否是大屏幕
const isLargeScreen = wx.getSystemInfoSync().windowHeight > 516
// canvas 宽、高、内边距
const [cvsW, cvsH, cvsPL, cvsPT, cvsPB] = [300, 516, 16, 22, 70]
// 封面图片宽高
const [coverImgW, coverImgH, qrImgH, qrImgW] = [300, isLargeScreen ? 180 : 150, 90, 90]
// 字体内边距、字体大小、字体颜色
const [fontPL, fontPT, fontSize18, fontSize14, colorBlack, colorGray, colorRed] = [55, 45, 18, 14, '#141414', '#666', 'red']
// 字体分割显示缩略
function helpFontSplit(str, lineNum = 1) {
  const maxChar = 12
  const len = str.length
  let res
  if (len <= maxChar) { // 小于一行
    res = [str]
  } else if (len <= maxChar * lineNum) { // 小于指定行数
    res = [str.slice(0, maxChar), str.slice(maxChar, 37)]
  } else { //大于指定行数
    let temp = []
    for (let i = 0; i < lineNum; i++) {
      if (i === lineNum - 1) {
        temp.push(str.slice(maxChar * i, (i + 1) * maxChar - 3) + '...')
      } else {
        temp.push(str.slice(maxChar * i, (i + 1) * maxChar))
      }
    }
    res = temp
  }
  return lineNum > 1 ? res : [res][0]
}
// 日期格式化
function helpFormatDate(dateArr) {
  if (!Array.isArray(dateArr)) {
    return
  }
  return dateArr.map(item => {
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    let startArr = item.activity_start.split('-')
    let endArr = item.activity_end.split('-')
    let start = new Date(startArr.join('/'))
    let end = new Date(endArr.join('/'))
    return startArr.splice(1, 2).join('.') + week[start.getDay()] + '~' + endArr.splice(1, 2).join('.') + week[end.getDay()]
  })
}
// canvas转换成图片
export class Canvas2Image {
  constructor(param, qrUrl) {
    this.param = param
    this.qrUrl = qrUrl
    this.isSingle = param.price_date.length == '1'
  }


  getImg(callback) {
    const qrUrl = this.qrUrl
    const coverUrl = this.param.thumb_img
    Promise.all([ // url是服务器地址
      // icon - 1
      wxGetImageInfo({
        src: url + localtionIconUrl
      }),
      // icon - 2
      wxGetImageInfo({
        src: url + timeIconUrl
      }),
      // icon - 3
      wxGetImageInfo({
        src: url + assemblyPointIconUrl
      }),
      // 封面图
      wxGetImageInfo({
        src: coverUrl
      }),
      // 小程序码图
      wxGetImageInfo({
        src: url + qrUrl
      })
    ]).then(res => {
      callback && callback(res)
    })
  }

  render(canvasId, callback) {
    this.getImg(res => {
      console.log('---图片就绪---')
      console.log(res)
      // 图片路径
      const [{
        path: localtionIconPath
      }, {
        path: timeIconPath
      }, {
        path: assemblyPointIconPath
      }, {
        path: coverImgPath
      }, {
        path: qrImgPath
      }] = res
      const {
        activity_name: title,
        resort: resort,
        price_list: prices,
        price_date: times
      } = this.param
      const ctx = wx.createCanvasContext(canvasId)
      console.log('---绘图开始---')
      this.drawCover(ctx, coverImgPath)
      this.drawIcon(ctx, localtionIconPath, timeIconPath, assemblyPointIconPath)
      this.drawTitle(ctx, helpFontSplit(title, 2))
      this.drawLocaltion(ctx, resort)
      this.drawTime(ctx, helpFormatDate(times))
      this.drawResort(ctx, resort)
      this.drawQrImage(ctx, qrImgPath)
      this.drawPrices(ctx, prices)
      ctx.draw(false, function() {
        console.log('---canvas绘图完成---')
        callback && callback()
      })
    })
  }
  // 绘制封面
  drawCover(ctx, coverImgPath) {
    ctx.drawImage(coverImgPath, 0, 0, coverImgW, coverImgH)
  }
  // 绘制图标
  drawIcon(ctx, localtionIconPath, timeIconPath, assemblyPointIconPath) {
    ctx.drawImage(localtionIconPath, fontPL - 20, coverImgH + fontPT * 2.28, 15, 15)
    ctx.drawImage(timeIconPath, fontPL - 20, coverImgH + fontPT * 2.88, 15, 15)
    if (this.isSingle) {
      ctx.drawImage(assemblyPointIconPath, fontPL - 20, coverImgH + fontPT * 3.54, 15, 15)
    } else {
      ctx.drawImage(assemblyPointIconPath, fontPL - 20, coverImgH + fontPT * 4.45, 15, 15)
    }
  }
  // 绘制标题
  drawTitle(ctx, title) {
    ctx.setTextAlign('left') // 文字居中
    ctx.setFillStyle(colorBlack) // 文字颜色
    ctx.setFontSize(fontSize18) // 文字字号：18px
    ctx.fillText(title[0], fontPL - 20, coverImgH + fontPT)
    title[1] && ctx.fillText(title[1], fontPL - 20, coverImgH + fontPT * 1.6)
  }
  // 绘制地点
  drawLocaltion(ctx, adress) {
    // 活动时间、地点
    ctx.setFillStyle(colorGray) // 文字颜色
    ctx.setFontSize(fontSize14) // 文字字号：14px
    ctx.fillText('集合地点: ' + helpFontSplit(adress), fontPL, coverImgH + fontPT * 2.55)
  }
  // 绘制班期
  drawTime(ctx, times) {
    ctx.fillText('活动时间 :  ' + times[0], fontPL, coverImgH + fontPT * 3.15)
    if (!this.isSingle) {
      times[1] && ctx.fillText(times[1], fontPL + 70, coverImgH + fontPT * 3.6)
      times[2] && ctx.fillText(times[2], fontPL + 70, coverImgH + fontPT * 4)
    }
  }
  // 绘制集合地点
  drawResort(ctx, resort) {
    if (this.isSingle) {
      ctx.fillText('集合地点: ' + helpFontSplit(resort), fontPL, coverImgH + fontPT * 3.8)
    } else {
      ctx.fillText('集合地点: ' + helpFontSplit(resort), fontPL, coverImgH + fontPT * 4.7)
    }
  }
  // 绘制小程序二维码
  drawQrImage(ctx, qrImgPath) {
    if (isLargeScreen) {
      ctx.drawImage(qrImgPath, cvsW - qrImgW - cvsPL - 16, cvsH - qrImgH - cvsPB + 50, qrImgW, qrImgH)
    } else {
      ctx.drawImage(qrImgPath, cvsW - qrImgW - cvsPL + 10, cvsH - qrImgH - cvsPB + 10, qrImgW - 10, qrImgH - 10)
    }
  }
  // 绘制价格
  drawPrices(ctx, prices) {
    const priceLabel = ['', '成人价: ', '儿童价: ', '老人价: ']
    const baseNum = 5.3
    const increment = 0.6
    if (Array.isArray(prices)) {
      prices.forEach((item, index) => {
        ctx.setFillStyle(colorGray)
        ctx.fillText(priceLabel[item.type], fontPL - 20, coverImgH + fontPT * (baseNum + index * increment))
        ctx.setFillStyle(colorRed)
        ctx.fillText('￥' + item.price, fontPL + 35, coverImgH + fontPT * (baseNum + index * increment))
      })
    }
    ctx.stroke()
  }
}
// 保存至本地
export function saveCanvasImage2Local(canvasId, callback) {
  console.log('---准备保存到本地---')
  const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
  const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
  wxCanvasToTempFilePath({
    canvasId: canvasId
  }, this).then(res => {
    console.log('---保存到本地就绪---')
    callback && callback()
    return wxSaveImageToPhotosAlbum({
      filePath: res.tempFilePath
    })
  }).then(res => {
    wx.showModal({
      ...{
        title: '',
        content: '这是一个模态弹窗',
        cancelText: '取消',
        cancelColor: '#505050',
        confirmText: '确定',
        confirmColor: '#ff4558',
        showCancel: true,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      },
      ...config
    })
    // wx.showToast({
    //     title: '已保存到相册'
    // })
  })
}