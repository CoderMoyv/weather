const APIKEY = "8f4741418fb7419c9d472c8c8c87fc75"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },
  /**
   * 获取定位
   */
  getLocation() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        that.setData({
          location: res.longitude + "," + res.latitude
        })
        that.getWeather()
        that.getCityByLoaction()
      }, fail(err) {
        wx.showModal({
          title: '获取定位信息失败',
          content: '为了给您提供准确的天气预报服务,请在设置中授权【位置信息】',
          success(mRes) {
            if (mRes.confirm) {
              wx.openSetting({
                success: function (data) {
                  if (data.authSetting["scope.userLocation"] === true) {
                    wx.showToast({
                      title: '授权成功',
                      icon: 'success',
                      duration: 1000
                    })
                    that.getWeather()
                    that.getCityByLoaction()
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'none',
                      duration: 1000
                    })
                    that.setData({
                      location: "116.41,39.92"
                    })
                    that.getWeather()
                    that.getCityByLoaction()
                  }
                },fail(err){
                  console.log(err)
                  wx.showToast({
                    title: '唤起设置页失败，请手动打开',
                    icon: 'none',
                    duration: 1000
                  })
                  that.setData({
                    location: "116.41,39.92"
                  })
                  that.getWeather()
                  that.getCityByLoaction()
                }
              })
            } else if (mRes.cancel) {
              that.setData({
                location: "116.41,39.92"
              })
              that.getWeather()
              that.getCityByLoaction()
            }
          }
        })
      }
    })
  },
  /**
   * 根据坐标获取城市信息
   */
  getCityByLoaction() {
    var that = this
    wx.request({
      url: 'https://geoapi.qweather.com/v2/city/lookup?key=' + APIKEY + "&location=" + that.data.location,
      success(result) {
        var res = result.data
        if (res.code == "200") {
          var data = res.location[0]
          that.setData({
            City: data.adm2,
            County: data.name
          })
        } else {
          wx.showToast({
            title: '获取城市信息失败',
            icon: 'error'
          })
        }

      }
    })
  },
  /**
   * 获取天气
   */
  getWeather() {
    var that = this
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now?key=' + APIKEY + "&location=" + that.data.location,
      success(result) {
        var res = result.data
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})