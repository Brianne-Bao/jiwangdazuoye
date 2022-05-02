// pages/classTable/classTable.js
var utils = require('../../utils/funcs.js');
let gd = getApp().globalData;
let db = wx.cloud.database();
Page({

    data: {


        template_info: {
            curr_week: gd.curr_week,
            weekday: gd.weekday, //今天是星期几
            line_height: 50, //课程表每行的高度
            col_width:130,
            courses: ["ams"], //该学生的所有课程信息
            int_weekday: {
                "周一": 1,
                "周二": 2,
                "周三": 3,
                "周四": 4,
                "周五": 5,
            },
            cs_color: ['#FCB8AF',
                '#F8C77A',
                '#81D2FC',
                '#78fa78',
                '#f694fa'
            ],
            logo_color: ['#FA7666',
                '#F39C13',
                '#56c7ff',
                '#41f541',
                '#f151f7'
            ],
            logo_word: {
                "通修": '通',
                "平台": '平',
                "通识": '识',
                "核心": '核',
                "选修": '选'
            }
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
        wx.showToast({
            title: '',
            icon: "loading"
        })
        var res = await db.collection('student')
            .where({
                stu_id: username
            })
            .get();
        console.log("res1");
        console.log(res.data[0]);
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
        wx.setStorageSync('courses', this.data.template_info.courses); //把当前用户的课程信息同步到缓存里
    },

    onShow: function (e) {
        this.getAllCourseId();
    },

    lastWeek: function (e) {
        console.log(this.data.template_info.courses);
        this.setData({
            "template_info.curr_week": this.data.template_info.curr_week - 1
        });
    },
    nextWeek: function (e) {
        this.setData({
            "template_info.curr_week": this.data.template_info.curr_week + 1
        });
    },

    allCourse: function (e) {
        wx.navigateTo({
            url: "/pages/allCourse/allCourse"
        })
    },

    showCsInfo: function () {

    },


})