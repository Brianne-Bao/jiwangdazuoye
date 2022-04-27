// pages/changeCourse/changeCourse.js
let gd = getApp().globalData;
let db = wx.cloud.database();
Page({

    data: {
        op: 0, //0,1,2,3：未选择，新增课程，删除课程，修改课程
        departments: gd.departments,
        grades: gd.grades,
        types: gd.cs_types,
        department: "",
        grade: "",
        type: "",
        dep_index: 0,
        grade_index: 0,
        type_index: 0,
    },

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

    onShow: function () {},

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

    add_cs_time: function () {

    },
    show_del_cs: function (e) {
        var input = e.detail.value;
        const _ = db.command;
        var del_record = db.collection("course")
            .where(_.or([{
                    cs_id: input
                },
                {
                    cs_name: input
                }
            ]));
        console.log(del_record);
        del_record
            .get().then(res => {
                console.log(res.data);
                this.setData({
                    "sx_courses": res.data
                })
            })
    },
    del_cs: function (e) {

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