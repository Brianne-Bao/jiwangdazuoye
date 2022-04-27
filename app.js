// app.js
App({
    globalData: {
        username: "",
        usertype: 0,
        departments:['历史学院','法学院','软件学院'],
        grades:['2018','2019','2020','2021'],
        cs_types:['通修','平台','通识','核心','选修']
    },
    onLaunch: function () {
        wx.cloud.init({})
    }
})
