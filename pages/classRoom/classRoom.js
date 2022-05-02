// pages/classRoom/classRoom.js
const gd = getApp().globalData;
const db = wx.cloud.database();
Page({

    data: {
        template_info: {
            curr_week: gd.curr_week, //今天是开学第几周
            weekday: gd.weekday, //今天是星期几
            courses: [], //该教室的所有课程信息
            line_height: 30,
            col_width: 120,
            int_weekday: gd.int_weekday,
            cs_color: gd.cs_color,
            logo_color:gd.logo_color,
            logo_word: gd.logo_word
            
        },

        buildings: gd.buildings,
        build_index: 0

    },
    onLoad: function () {
        console.log(this.data.template_info.courses);
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

    async search(e) {
        var condi = e.detail.value;
        if (condi.building == "全部") condi.building = "";
        console.log("课程筛选的输入条件");
        console.log(condi);
        var res = await db.collection('classroom').where({
            building: condi.building,
            room: condi.classroom
        }).get();
        var all_course_id = res.data[0].cs_ids;
        var courses = [];
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
        console.log("该教室的全部课程信息");
        console.log(this.data.template_info.courses);
        this.onLoad();
    },

    lastWeek: function (e) {
        this.setData({
            "template_info.curr_week": this.data.template_info.curr_week - 1
        });
    },
    nextWeek: function (e) {
        this.setData({
            "template_info.curr_week": this.data.template_info.curr_week + 1
        });
    },

})