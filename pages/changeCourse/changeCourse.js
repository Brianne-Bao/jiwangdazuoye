// pages/changeCourse/changeCourse.js
let gd = getApp().globalData;
let db = wx.cloud.database();
var utils = require('../../utils/funcs.js');


Page({

    data: {
        op: 0, //0,1,2,3：未选择，新增课程，删除课程，修改课程

        template_info: { //write_cs_info模板需要用到的信息
            time_loc: [{
                "time_index": [0, 0],
                "section_bg": 0,
                "section_end": 0,
                "classroom": "",
                "building_index": 0,
            }],
            departments: gd.departments,
            grades: gd.grades,
            types: gd.cs_types,

            time_array: [
                ['周一', '周二', '周三', '周四', '周五'],
                ['每周', '单周', '双周', ],
            ],
            buildings: gd.buildings,

            dep_index: 0,
            grade_index: 0,
            type_index: 0,
            sx_teachers: [],
            teachers: []
        },
        sx_courses: [], //符合筛选条件的课程信息
    },


    //0.操作按钮部分
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

    // 1.增加课程部分
    // 1.1 时间地点 
    add_cs_time: function (e) {
        let i = e.currentTarget.dataset.index;
        let time_loc = this.data.template_info.time_loc;
        time_loc.push({
            "day": 0,
            "oddEvenWeek": 0,
            "section_bg": 0,
            "section_end": 0,
            "classroom": "",
            "time_index": [0, 0],
            "building_index": 0,
        });
        this.setData({
            "template_info.time_loc": time_loc
        });
    },
    del_cs_time: function (e) {
        let i = e.currentTarget.dataset.index;
        console.log(i);
        let time_loc = this.data.template_info.time_loc;
        time_loc.splice(i, 1);
        console.log(time_loc);
        this.setData({
            "template_info.time_loc": time_loc
        });
    },
    time_change: function (e) {
        const i = e.currentTarget.dataset.index;
        let time_loc = this.data.template_info.time_loc;
        time_loc[i].time_index = e.detail.value;
        this.setData({
            "template_info.time_loc": time_loc,
        });
    },
    input_section_bg: function (e) {
        let i = e.currentTarget.dataset.index;
        console.log(i);
        let time_loc = this.data.template_info.time_loc;
        time_loc[i].section_bg = e.detail.value;
        this.setData({
            "template_info.time_loc": time_loc
        });
    },
    input_section_end: function (e) {
        let i = e.currentTarget.dataset.index;
        let time_loc = this.data.template_info.time_loc;
        time_loc[i].section_end = e.detail.value;
        this.setData({
            "template_info.time_loc": time_loc
        });
    },
    build_change: function (e) {
        let i = e.currentTarget.dataset.index;
        let time_loc = this.data.template_info.time_loc;
        time_loc[i].building_index = e.detail.value;
        this.setData({
            "template_info.time_loc": time_loc,
        });
    },
    input_classroom: function (e) {
        let i = e.currentTarget.dataset.index;
        let time_loc = this.data.template_info.time_loc;
        time_loc[i].classroom = e.detail.value;
        this.setData({
            "template_info.time_loc": time_loc
        });
    },
    //1.2 院系、年级、类型三个picker
    dep_change: function (e) {
        this.setData({
            "template_info.dep_index": e.detail.value
        });
    },
    grade_change: function (e) {
        this.setData({
            "template_info.grade_index": e.detail.value
        });
    },
    type_change: function (e) {
        this.setData({
            "template_info.type_index": e.detail.value
        });
    },
    //1.3 教师搜索框
    search_tea: function (e) {
        var tea_idName = e.detail.value;
        const _ = db.command;
        db.collection("teacher").where(
                _.or([{
                        tea_id: {
                            $regex: '.*' + tea_idName
                        }
                    },
                    {
                        tea_name: {
                            $regex: '.*' + tea_idName
                        }
                    }
                ]))
            .get().then(res => {
                this.setData({
                    "template_info.sx_teachers": res.data
                })
            });

    },
    choose_tea: function (e) {
        const i = e.currentTarget.dataset.index;
        var teachers = this.data.template_info.teachers,
            sx_teachers = this.data.template_info.sx_teachers;
        teachers.push(sx_teachers[i]);
        this.setData({
            "template_info.teachers": teachers,
            "template_info.sx_teachers": []
        });
    },
    //1.4 数据提交
    check_valid: function (add_data) {
        var check_items = ['cs_id', 'cs_name', 'week_bg', 'week_end', 'department', 'grade', 'cs_type'],
            toast_strs = ['课程号', '课程名称', '起止周数', '起止周数', '所属院系', '上课年级', '课程类型'];
        for (let i = 0; i < check_items.length; i++) {
            if (add_data[check_items[i]] == "") {
                wx.showToast({
                    title: toast_strs[i] + '不能为空',
                    icon: 'error',
                    duration: 2000
                })
                return false;
            }
        }
        check_items = ['section', 'classroom'];
        toast_strs = ['节数', '教室'];
        const time_loc = add_data["time_loc"];
        for (let i = 0; i < time_loc.length; i++) {
            for (let j = 0; j < check_items.length; j++)
                if (time_loc[i][check_items[j]] == "") {
                    wx.showToast({
                        title: toast_strs[i] + '不能为空',
                        icon: 'error',
                        duration: 2000
                    })
                    return false;
                }
        }
        return true;
    },
    add_course_db: function (add_data) {
        db.collection('course').add({
            data: add_data,
            success: function (res) {
                console.log(res);
                wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: console.error,
            complete: console.log
        });
    },
    add_classroom_db: function (add_data) {
        const _ = db.command;
        add_data.time_loc.forEach(ele => {
            var classroom_record = db.collection('classroom').where({
                building: ele.building,
                room: ele.classroom
            }).get();
            if (classroom_record.length == 0) { //该教室不存在记录
                db.collection('classroom').add({
                    data: {
                        building: ele.building,
                        room: ele.classroom,
                        cs_ids: add_data.cs_id
                    }
                })
            } else {
                db.collection('classroom').doc(classroom_record[0]._id).update({
                    data: {
                        cs_ids: _.push(add_data.cs_id)
                    }
                })
            }
        })
    },
    add_teacher_db: function (add_data) {

    },
    formSubmit: function (e) {
        console.log(e.detail.value);
        console.log(this.data.template_info.time_loc);
        let add_data = e.detail.value;
        var time_loc = this.data.template_info.time_loc;
        const time_array = this.data.template_info.time_array;
        const buildings = gd.buildings;
        time_loc.forEach(ele => {
            ele["day"] = time_array[0][ele.time_index[0]];
            ele["oddEvenWeek"] = time_array[1][ele.time_index[1]];
            ele["building"] = buildings[ele.building_index];
            delete ele.time_index;
            delete ele.building_index;
        });
        add_data["time_loc"] = time_loc;
        add_data["teachers"] = this.data.teachers;
        console.log(add_data);
        // 检查数据是否合法，并在数据库中增加数据
        if (!this.check_valid(add_data))
            return;
        this.add_course_db(add_data);
        this.add_classroom_db(add_data);
        this.add_teacher_db(add_data);
    },

    // 2. 删除课程部分
    show_del_cs: function (e) {
        utils.getCsByCs_idname(e.detail.value)
            .get().then(res => {
                this.setData({
                    "sx_courses": res.data
                })
            })
    },
    choose_cs: function (e) {

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
                    this.del_cs();
                }
            }
        })
    },



})