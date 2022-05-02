// pages/classSearch/classSearch.js
const gd = getApp().globalData;
const db = wx.cloud.database();
var utils = require('../../utils/funcs.js');

Page({
    data: {

        departments: JSON.parse(JSON.stringify(gd.departments)), //专业
        grades: gd.grades, //年级

        department_index: 0,
        grade_index: 0,
        //符合筛选条件的课程信息
        sx_courses: [],
    },
    onLoad: function () {
        var departments = this.data.departments,
            grades = this.data.grades;
        departments.unshift("请选择课程所属院系");
        grades.unshift("请选择年级");
        this.setData({
            departments,
            grades
        })
    },
    get_cs_idName: function (e) {
        this.setData({
            "cs_idName": e.detail.value
        })
    },
    get_tea_name: function (e) {
        this.setData({
            "tea_idName": e.detail.value
        })
    },

    department_change: function (e) {
        this.setData({
            "department_index": e.detail.value
        });
    },
    grade_change: function (e) {
        this.setData({
            "grade_index": e.detail.value
        });
    },

    search: function (e) {
        var condi = e.detail.value;
        if (condi.department == "请选择课程所属院系") condi.department = "";
        if (condi.grade == "请选择年级") condi.grade = "";
        console.log("课程筛选的输入条件");
        console.log(condi);
        const _ = db.command
        utils.getCsByCs_idname(condi.cs_idName)
            .where({
                teachers: _.elemMatch({
                    tea_name: condi.tea_name
                }),
                department: {
                    $regex: '.*' + condi.department
                },
                grade: {
                    $regex: '.*' + condi.grade
                },
            })
            .get().then(res => {
                console.log(res.data);
                this.setData({
                    "sx_courses": res.data
                })
            })

    }
})