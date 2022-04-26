// app.js
App({
    globalData: {
        username: "",
        usertype: 0
    },
    onLaunch: function () {
        wx.cloud.init({})
    }
})