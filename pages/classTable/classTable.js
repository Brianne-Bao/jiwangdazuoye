// pages/classTable/classTable.js
let gb = getApp().globalData;
Page({
    
    data: {
        curr_week: gb.curr_week, //今天是开学第几周
        weekday: gb.weekday, //今天是星期几
        courses: [], //该学生的所有课程信息
        line_height: 50,//课程表每行的高度
    },

    getAllCourseId: function () {
        var username = gb.username;
        // if (username == "") { //未登录，跳转到登录页面
        //     wx.showToast({
        //         title: '请先登录',
        //         icon: 'none',
        //         duration: 2500,
        //         success: function () {
        //             setTimeout(function () {
        //                 wx.navigateTo({
        //                     url: '/pages/login/login',
        //                 })
        //             }, 1000);
        //         }
        //     })
        // }
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

    onShow: function (e) {
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