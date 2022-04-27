// app.js
App({
    globalData: {
        username: "",
        usertype: 0,
        departments:['历史学院','法学院','软件学院']
    },
    onLaunch: function () {
        wx.cloud.init({})
    }
})