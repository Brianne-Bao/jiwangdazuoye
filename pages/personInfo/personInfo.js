// pages/personInfo/personInfo.js
const app = getApp()
Page({
  data: {
    username: app.globalData.username,
  },

  login: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  logout: function () {
    app.globalData.username = '';
  },

  onShow:function(){
    this.setData({
      "username":app.globalData.username,
    })
  }



})