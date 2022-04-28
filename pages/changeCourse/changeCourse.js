// pages/changeCourse/changeCourse.js
let gd = getApp().globalData;
let db = wx.cloud.database();
var utils = require('../../utils/funcs.js');


Page({

    data: {
        op: 0, //0,1,2,3：未选择，新增课程，删除课程，修改课程
        template_info: { //write_cs_info模板需要用到的信息
            cs_id: "",
            cs_name: "",
            week_bg: 0,
            week_end: 0,
            day: [],
            oddEvenWeek: [],
            section: [],
            classroom: [],
            tea_id: "",
            department: "",
            grade: "",
            type: "",
            departments: gd.departments,
            grades: gd.grades,
            types: gd.cs_types,

            dep_index: 0,
            grade_index: 0,
            type_index: 0,
        },
        sx_courses: [], //符合筛选条件的课程信息
    },
    //操作按钮部分
    choose_add_cs: function () {
        this.setData({
            "op": 1
        });
    },
    choose_del_cs: function () {
        this.setData({
            "op": 2
        });
        console.log('选择“删除课程”');
    },
    choose_change_cs: function () {
        this.setData({
            "op": 3
        })
    },

    // 增加课程部分
    input_cs_id: function (e) {
        this.setData({
            "cs_id": e.detail.value
        });
    },
    input_cs_name: function (e) {
        this.setData({
            "cs_name": e.detail.value
        });
    },
    input_week_bg: function (e) {
        this.setData({
            "week_bg": e.detail.value
        });
    },
    input_week_bg: function (e) {
        this.setData({
            "week_end": e.detail.value
        });
    },

    add_cs_time: function () {

    },

    dep_change: function (e) {
        this.setData({
            "dep_index": e.detail.value
        });
    },
    grade_change: function (e) {
        this.setData({
            "grade_index": e.detail.value
        });
    },
    type_change: function (e) {
        this.setData({
            "type_index": e.detail.value
        });
    },


    // 删除课程部分
    show_del_cs: function (e) {
        utils.getCsByCs_idname(e.detail.value)
            .get().then(res => {
                this.setData({
                    "sx_courses": res.data
                })
            })
    },

    del_cs: function (e) {
        db.collection("course").
        utils.getCsByCs_idname(e.detail.value)
            .remove({
                success: function (res) {
                    console.log(res.data)
                }
            })
    },

    shanchu: function () {
        wx.showModal({
            title: '提示',
            content: '确定删除该课程？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定');
                    this.del_cs();
                }
            }
        })
    },



})