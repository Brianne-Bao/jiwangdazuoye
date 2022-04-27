// pages/classSearch/classSearch.js
Page({
    data: {
        isSelect: [false, false, false], //三个下拉框有没有被选择
        departments: ['历史学院', '法学院'], //院系
        majors: {
            '历史学院': ['历史学类', '历史学', '考古学'],
            '法学院': ['法学类', '法学']
        }, //专业
        grades: ['2018', '2019', '2020', '2021'], //年级
        //当前输入/选中的
        cs_idName: "",
        tea_name: "",
        department: "",
        major: "",
        grade: "",
        //符合筛选条件的课程信息
        sx_courses: [],
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

    select_department: function () {
        this.setData({
            "isSelect[0]": !this.data.isSelect[0]
        })
    },
    get_department: function (e) {
        console.log(e);
        let value = e.currentTarget.dataset.department;
        this.setData({
            "department": value,
            "isSelect[0]": false,
        })
        console.log(this.data.majors['历史学院']);
    },

    select_major: function () {
        this.setData({
            "isSelect[1]": !this.data.isSelect[1]
        })
    },
    get_major: function (e) {
        let value = e.currentTarget.dataset.major;
        this.setData({
            "major": value,
            "isSelect[1]": false,
        })
    },

    select_grade: function () {
        this.setData({
            "isSelect[2]": !this.data.isSelect[2]
        })
    },
    get_grade: function (e) {
        let value = e.currentTarget.dataset.grade
        this.setData({
            "grade": value,
            "isSelect[2]": false,
        })
    },

    search: function () {
        console.log(this.data.cs_idName);
        var db = wx.cloud.database();
        const _ = db.command;
        db.collection('course')
            .where(_.or([
                    {cs_id: {$regex: '.*' + this.data.cs_idName}},
                    {cs_name: {$regex: '.*' + this.data.cs_idName}}
            ]))
            .where({
                // tea_name: {$regex: '.*' + this.data.tea_name,},  
                // major: {$regex: '.*' + this.data.major,},
                // grade: { $regex: '.*' + this.data.grade,},
            })
            .get().then(res => {
                console.log(res.data);
                this.setData({
                    "sx_courses": res.data
                })
            })

    }
})