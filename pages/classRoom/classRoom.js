// pages/classRoom/classRoom.js
const gd = getApp().globalData;
const db = wx.cloud.database();
Page({

    data: {
        curr_week: gd.curr_week, //今天是开学第几周
        weekday: gd.weekday, //今天是星期几
        courses: [], //该教室的所有课程信息
        buildings: gd.buildings,
        build_index: 0

    },
    onLoad: function () {
        var buildings = this.data.buildings;
        buildings.unshift("全部");
        this.setData({
            buildings,
        })
    },
    build_change: function (e) {
        this.setData({
            build_index: e.detail.value
        })
    },
    search: function (e) {
        var condi = e.detail.value;
        if (condi.building == "全部") condi.building = "";
        console.log("课程筛选的输入条件");
        console.log(condi);
        db.collection('classroom').where({
            building: condi.building,
            room: condi.classroom
        }).get().then(res => {
            console.log(res.data[0]);
            this.setData({
                "courses": res.data[0].cs_ids
            })
        })
    }

})