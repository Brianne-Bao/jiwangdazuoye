// app.js
App({
    globalData: {
        username: "",
        usertype: 0,
        departments: ['历史学院', '法学院', '软件学院'],
        grades: ['2018', '2019', '2020', '2021'],
        cs_types: ['通修', '平台', '通识', '核心', '选修'],
        weekday: 0, //今天是星期几
        curr_week: 0, //今天是开学第几周
    },

    cntCurrWeek: function () {
        var termBeginData = new Date("2022-02-14"); //开学日期
        var today = new Date();
        var daysDiff = Math.ceil((today - termBeginData) / (1000 * 60 * 60 * 24));
        var weekDiff = Math.ceil(daysDiff / 7);
        this.globalData.weekday=today.getDay();
        this.globalData.curr_week = weekDiff;
    },

    onLaunch: function () {
        wx.cloud.init({});
        this.cntCurrWeek();
    }
})