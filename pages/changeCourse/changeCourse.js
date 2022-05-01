// pages/changeCourse/changeCourse.js
let gd = getApp().globalData;
let db = wx.cloud.database();
var utils = require('../../utils/funcs.js');


Page({

    data: {
        op: 0, //0,1,2,3：未选择，新增课程，删除课程，修改课程

        template_info: { //write_cs_info模板和show_cs_info模板需要用到的信息
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
            sx_teachers: [], //筛选出的teacher
            teachers: [], //选中的teacher

            cs_id_value: "",
            cs_name_value: "",
            week_bg: 0,
            week_end: 0,
            show_edit_ui: false,
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
            "time_index": [0, 0],
            "section_bg": 0,
            "section_end": 0,
            "classroom": "",
            "building_index": 0,
        });
        this.setData({
            "template_info.time_loc": time_loc
        });
    },
    del_cs_time: function (e) {
        let i = e.currentTarget.dataset.index;
        let time_loc = this.data.template_info.time_loc;
        time_loc.splice(i, 1);
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
        db.collection("teacher").aggregate()
            .match(
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
            .project({
                _id: 0,
                tea_id: 1,
                tea_name: 1
            })
            .end()
            .then(res => {
                console.log(res.list);
                this.setData({
                    "template_info.sx_teachers": res.list
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
        //为空检查
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
        //课程号重复检查
        db.collection('course').where({
            cs_id: add_data.cs_id
        }).get().then(res => {
            if (res.data.length != 0) {
                wx.showToast({
                    title: '该课程号已存在',
                    icon: 'error',
                    duration: 2000
                })
            }
            return false;
        })
        //数据格式检查
        var week_bg = add_data.week_bg,
            week_end = add_data.week_end;
        if (isNaN(week_bg) || isNaN(week_end) || week_bg < 1 || week_bg > 17 || week_end < 1 || week_end > 17) {
            wx.showToast({
                title: '起止周数请输入1-17的数字',
                icon: 'none',
                duration: 2000
            })
            return false;
        }
        time_loc.forEach(ele => {
            var sec_bg = ele.section_bg,
                sec_end = ele.section_end;
            if (isNaN(sec_bg) || isNaN(sec_end) || sec_bg < 1 || sec_bg > 12 || sec_end < 1 || sec_end > 12) {
                wx.showToast({
                    title: '课程节数请输入1-12的数字',
                    icon: 'none',
                    duration: 2000
                })
                return false;
            }
        })
        return true;
    },
    add_course_db: function (add_data) {
        console.log("调用add_course_db");
        db.collection('course').add({
            data: add_data,
            success: function (res) {
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
        console.log("调用add_classroom_db");
        const _ = db.command;
        add_data.time_loc.forEach(ele => {
            db.collection('classroom').where({
                building: ele.building,
                room: ele.classroom
            }).get().then(res => {
                console.log("查到的教室数据");
                console.log(res.data);
                //如果该教室不在表中，为其增加记录
                if (res.data.length == 0) {
                    db.collection('classroom').add({
                        data: {
                            building: ele.building,
                            room: ele.classroom,
                            cs_ids: [add_data.cs_id]
                        }
                    })
                }
                //如果该教室已经在表中，把该课程id加入该教室的cs_ids中
                else {
                    db.collection('classroom').doc(res.data[0]._id).update({
                        data: {
                            cs_ids: _.push(add_data.cs_id)
                        }
                    })
                }
            });

        })
    },
    add_teacher_db: function (add_data) {
        console.log("调用add_teacher_db");
        const _ = db.command;
        //把该课程id加入该教师的cs_ids中
        db.collection('teacher').where({
            "tea_id": add_data.teacher
        }).get().then(res => {
            db.collection('teacher').doc(res.data[0]._id).update({
                data: {
                    cs_ids: _.push(add_data.cs_id)
                }
            })
        });
    },
    formSubmit: function (e) {
        //console.log(e.detail.value);
        //console.log(this.data.template_info.time_loc);
        console.log("调用formSubmit");
        console.log("对数据进行修整");
        let add_data = e.detail.value;
        var time_loc = JSON.parse(JSON.stringify(this.data.template_info.time_loc)); //要用深拷贝
        const time_array = this.data.template_info.time_array;
        const buildings = gd.buildings;
        time_loc.forEach(ele => {
            ele["section_bg"] = Number(ele["section_bg"]);
            ele["section_end"] = Number(ele["section_end"]);
            ele["day"] = time_array[0][ele.time_index[0]];
            ele["oddEvenWeek"] = time_array[1][ele.time_index[1]];
            ele["building"] = buildings[ele.building_index];
            delete ele.time_index;
            delete ele.building_index;
        });
        add_data["time_loc"] = time_loc;
        add_data["teachers"] = this.data.template_info.teachers;
        add_data["week_bg"] = Number(add_data["week_bg"]);
        add_data["week_end"] = Number(add_data["week_end"]);
        console.log("修整完的数据");
        console.log(add_data);

        // 检查数据是否合法，并在数据库中增加数据
        if (!this.check_valid(add_data))
            return;
        this.add_course_db(add_data);
        this.add_classroom_db(add_data);
        this.add_teacher_db(add_data);
    },

    // 2. 删除课程部分
    show_sx_cs: function (e) {
        console.log("调用show_del_cs");
        utils.getCsByCs_idname(e.detail.value)
            .get().then(res => {
                this.setData({
                    "sx_courses": res.data
                })
            });
        console.log("筛选出的课程数据");
        console.log(this.data.sx_courses);
    },
    checkboxChange: function (e) {
        console.log("复选框的值");
        console.log(e.detail.value);
        const values = e.detail.value;
        var sx_courses = this.data.sx_courses;
        sx_courses.forEach(ele => {
            ele.checked = false;
            for (let j = 0; j < values.length; j++)
                if (values[j] == ele.cs_id) {
                    ele.checked = true;
                    break;
                }
        })
        this.setData({
            sx_courses
        });
        console.log(this.data.sx_courses);
    },

    shanchu: function () {
        var sx_courses = this.data.sx_courses;
        wx.showModal({
            title: '提示',
            content: '确定删除这些课程？',
            success(res) {
                if (res.confirm) {
                    sx_courses.forEach(ele => {
                        if (ele.checked == true) {
                            utils.getCsByCs_idname(ele.cs_id)
                                .remove({
                                    success: function (res) {
                                        console.log("被删除的课程信息");
                                        console.log(res);
                                    }
                                })
                        }
                    })
                }
            }
        })
    },

    //3.编辑课程部分
    back:function(){
        this.setData({
            "show_edit_ui": false
        });
    },
    edit_cs: function (e) {
        var temp_info = this.data.template_info;
        const index = e.currentTarget.dataset.index;
        var edit_cs = this.data.sx_courses[index];
        this.setData({
            "show_edit_ui": true,
            "template_info.cs_id_value": edit_cs.cs_id,
            "template_info.cs_name_value": edit_cs.cs_name,
            "template_info.week_bg": edit_cs.week_bg,
            "template_info.week_end": edit_cs.week_end,
            "template_info.teachers":edit_cs.teachers
        });

        var time_loc = [];
        edit_cs.time_loc.forEach(ele => {
            var item={};
            for (let j = 0; j < temp_info.time_array[0].length; j++){
                if (temp_info.time_array[0][j] == ele.day) {
                    item.time_index=[j];
                    break;
                }
            }
            for (let j = 0; j < temp_info.time_array[1].length; j++){
                if (temp_info.time_array[1][j] == ele.oddEvenWeek) {
                    item.time_index.push(j);
                    break;
                }
            }    
            item.section_bg = ele.section_bg;
            item.section_end = ele.section_end;
            for (let j = 0; j < temp_info.buildings.length; j++){
                if (temp_info.buildings[j] == ele.building) {
                    item.building_index = j;
                    break;
                }
            }  
            item.classroom = ele.classroom;

            time_loc.push(item);
        })
        this.setData({
            "template_info.time_loc": time_loc
        });

        for (let i = 0; i < temp_info.departments.length; i++) {
            if (temp_info.departments[i] == edit_cs.department) {
                this.setData({
                    "template_info.dep_index": i
                });
                break;
            }
        }
        for (let i = 0; i < temp_info.grades.length; i++) {
            if (temp_info.grades[i] == edit_cs.grade) {
                this.setData({
                    "template_info.grade_index": i
                });
                break;
            }
        }
        for (let i = 0; i < temp_info.types.length; i++) {
            if (temp_info.types[i] == edit_cs.type) {
                this.setData({
                    "template_info.type_index": i
                });
                break;
            }
        }

    },
    

})