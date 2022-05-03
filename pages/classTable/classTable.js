// pages/classTable/classTable.js
var utils = require('../../utils/funcs.js');
var cs_table = require('../../utils/cs_table/cs_table.js')
let gd = getApp().globalData;
let db = wx.cloud.database();
Page({

    data: {


        template_info: {
            curr_week: gd.curr_week,
            weekday: gd.weekday, //今天是星期几
            courses: [], //该学生的所有课程信息
            int_weekday: gd.int_weekday,
            cs_color: gd.cs_color,
            logo_color: gd.logo_color,
            logo_word: gd.logo_word,
            showCsInfo: false,
            course: [], //点击的某个课程信息
        }

    },

    async getAllCourseId() {
        var username = gd.username;
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
        var courses = [];
        var res = await db.collection('student')
            .where({
                stu_id: username
            })
            .get();
        var all_course_id = res.data[0].cs_ids; //当前学生用户的所有课程号


        for (let i = 0; i < all_course_id.length; i++) {
            res = await db.collection('course')
                .where({
                    cs_id: all_course_id[i]
                }).get();
            if (res.data.length != 0) {
                courses.push(res.data[0]);
            }
        };
        this.setData({
            "template_info.courses": courses
        });
        console.log("当前用户的全部课程信息");
        console.log(this.data.template_info.courses);

    },

    onShow: function (e) {
        this.getAllCourseId();
    },
    onLoad: function (e) {
        wx.showToast({
            title: '',
            icon: "loading"
        })
    },

    lastWeek: function () {
        const t = this.data.template_info.curr_week;
    if (t > 1) {
        this.setData({
            "template_info.curr_week": t - 1
        });
    }
    },
    nextWeek: function () {
        const t = this.data.template_info.curr_week;
        if (t < gd.term_week_num) {
            this.setData({
                "template_info.curr_week": t + 1
            });
        }
    },

    allCourse: function (e) {
        var courses = JSON.stringify(this.data.template_info.courses);
        wx.navigateTo({
            url: '/pages/allCourse/allCourse?courses=' + courses
        }) //把courses数据也传过去
    },

    clickShowCsInfo: function (e) {
        this.setData({
            "template_info.course": [e.currentTarget.dataset.course],
            "template_info.showCsInfo": true
        });
    },
    closeModal: function (e) {
        this.setData({
            "template_info.showCsInfo": false
        })
    },

})