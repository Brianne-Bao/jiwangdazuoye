// pages/classTable/classTable.js
Page({
    data: {
        test: [1, 2, 3, 4],
        courses:wx.getStorageSync('courses')
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

    onLoad: function (e) {
        this.getAllCourseId();
    },
    showCsInfo: function () {

    },
    lastWeek: function (e) {},
    nextWeek: function (e) {

    },

    allCourse: function (e) {
        wx.navigateTo({
            url: "/pages/allCourse/allCourse"
        })
    }

})