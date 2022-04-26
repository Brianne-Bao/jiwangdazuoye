// pages/classTable/classTable.js
Page({

    data: {
        curr_week: 7, //今天是开学第几周
        weekday: 3, //今天是星期几
        courses: [] //该学生的所有课程信息
    },

    getAllCourseId: function () {
        var app = getApp();
        var username = app.globalData.username;
        console.log(username);
        if (username == "") { //未登录，跳转到登录页面
            wx.showToast({
                title: '请先登录',
                icon: 'none',
                duration: 2500,
                success: function () {
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '/pages/login/login',
                        })
                    }, 1000);
                }
            })
        }
        wx.cloud.database().collection('student')
            .where({
                stu_id: username
            })
            .get({
                success: (res) => {
                    var all_course_id = res.data[0].cs_ids; //当前学生用户的所有课程号
                    console.log(all_course_id);
                    all_course_id.forEach(cs_id => {
                        this.getCourseData(cs_id);
                    });
                    wx.setStorageSync('courses', this.data.courses); //把当前用户的课程信息同步到缓存里
                }
            })
    },

    getCourseData: function (course_id) {
        wx.cloud.database().collection('course')
            .where({
                cs_id: course_id
            })
            .get({
                success: (res) => {
                    var cs_info = res.data[0];
                    if (!cs_info) {
                        console.log("未找到该课程数据");
                    }
                    this.data.courses.push(cs_info);
                }
            })
    },

    cntCurrWeek: function () {
        var termBeginData = new Date("2022-02-14"); //开学日期
        var today = new Date();
        var daysDiff = Math.ceil((today - termBeginData) / (1000 * 60 * 60 * 24));
        var weekDiff = Math.ceil(daysDiff / 7);
        this.setData({
            "weekday": today.getDay(),
            "curr_week": weekDiff
        });
    },

    onLoad: function (e) {
        this.cntCurrWeek();
        this.getAllCourseId();
    },

    lastWeek: function (e) {
        this.setData({
            "curr_week": this.data.curr_week - 1
        });
    },
    nextWeek: function (e) {
        this.setData({
            "curr_week": this.data.curr_week + 1
        });
    },

    showCsInfo: function () {

    },
    allCourse: function (e) {
        wx.navigateTo({
            url: "/pages/allCourse/allCourse"
        })
    }

})