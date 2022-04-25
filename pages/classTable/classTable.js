// pages/classTable/classTable.js
Page({
    data: {
        curr_week: 7, //今天是开学第几周
        weekday: 3, //今天是星期几
        courses: wx.getStorageSync('courses') //该学生的所有课程信息
    },

    getAllCourseId: function () {
        if (!wx.getStorageSync('currentUser')) { //未登录，跳转到登录页面
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
        wx.cloud.database().collection('student')
            .where({
                stu_id: wx.getStorageSync('currentUser')
            })
            .get({
                success: (res) => {
                    var all_course_id = res.data[0].cs_ids; //当前学生用户的所有课程号
                    console.log(all_course_id);
                    all_course_id.forEach(cs_id => {
                        this.getCourseData(cs_id);
                    });
                    wx.setStorageSync('courses', this.data.courses);
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
            "weekday":today.getDay(),
            "curr_week":weekDiff
        });
    },

    onLoad: function (e) {
        this.cntCurrWeek();
        this.getAllCourseId();
    },

    lastWeek: function (e) {
        this.setData({"curr_week":this.data.curr_week-1}); 
    },
    nextWeek: function (e) {
        this.setData({"curr_week":this.data.curr_week+1});
    },

    showCsInfo: function () {

    },
    allCourse: function (e) {
        wx.navigateTo({
            url: "/pages/allCourse/allCourse"
        })
    }

})