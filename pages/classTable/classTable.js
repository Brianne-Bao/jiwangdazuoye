// pages/classTable/classTable.js
Page({
    data: {
        courses:[],
        // [{
        //     "cs_id": "000000041",
        //     "cs_name": "中国近现代史纲要",
        //     "week_bg": 1,
        //     "week_end": 17,
        //     "day": [3],
        //     "oddEvenWeek": [0],
        //     "section": [[9, 10, 11]],
        //     "classroom": ["逸B-313"],
        //     "type": 0,
        //     "tea_id": ["0000001"]
        //   }]
        wlist: [{
                "xqj": 1,
                "skjc": 1,
                "skcd": 4,
                "kcm": "高等数学啊实打实大大说阿大声道亚特兰蒂斯号",
                "jsbh": "A301",
                "color": 0
            },
            {
                "xqj": 1,
                "skjc": 5,
                "skcd": 3,
                "kcm": "高等数学",
                "jsbh": "A-302",
                "color": 0
            },
            {
                "xqj": 2,
                "skjc": 1,
                "skcd": 3,
                "kcm": "高等数学啊实打实大大说阿大声道",
                "jsbh": "A303",
                "color": 1
            },
            {
                "xqj": 2,
                "skjc": 8,
                "skcd": 2,
                "kcm": "计算机应用技术",
                "jsbh": "A304",
                "color": 1
            },
            {
                "xqj": 3,
                "skjc": 3,
                "skcd": 2,
                "kcm": "高等数学",
                "jsbh": "A305",
                "color": 2
            },
            {
                "xqj": 3,
                "skjc": 8,
                "skcd": 2,
                "kcm": "高等数学",
                "jsbh": "A306",
                "color": 2
            },
            {
                "xqj": 3,
                "skjc": 5,
                "skcd": 2,
                "kcm": "高等数学",
                "jsbh": "A307",
                "color": 0
            },
            {
                "xqj": 4,
                "skjc": 2,
                "skcd": 3,
                "kcm": "高等数学",
                "jsbh": "A308",
                "color": 1
            },
            {
                "xqj": 4,
                "skjc": 8,
                "skcd": 2,
                "kcm": "高等数学",
                "jsbh": "A309",
                "color": 2
            },
            {
                "xqj": 5,
                "skjc": 1,
                "skcd": 2,
                "kcm": "高等数学",
                "jsbh": "A310",
                "color": 1
            },
            {
                "xqj": 6,
                "skjc": 3,
                "skcd": 2,
                "kcm": "高等数学",
                "jsbh": "A311",
                "color": 2
            },
            {
                "xqj": 7,
                "skjc": 5,
                "skcd": 3,
                "kcm": "高等数学",
                "jsbh": "",
                "color": 0
            },
        ]
    },

    getAllCourseId: function () {
        if (!wx.getStorageSync('currentUser')) { //未登录，跳转到登录页面
            wx.navigateTo({
                url: '/pages/login/login',
            })
        }
        wx.cloud.database().collection('student')
            .where({
                stu_id: wx.getStorageSync('currentUser')
            })
            .get({
                success: (res) => {
                    var all_course_id = res.data[0].cs_ids; //当前学生用户的所有课程号
                    console.log(all_course_id);
                    all_course_id.forEach(cs_id => {
                        this.getCourseData(cs_id);
                    });
                    wx.setStorageSync('courses', this.data.courses);
                }
            })
    },

    getCourseData: function (course_id) {
        wx.cloud.database().collection('course')
            .where({
                cs_id: course_id
            })
            .get({
                success: (res) => {
                    var cs_info = res.data[0];
                    if(!cs_info){
                        console.log("未找到该课程数据");
                    }
                    this.data.courses.push(cs_info);
                }
            })
    },

    onLoad: function (e) {
        this.getAllCourseId();
    },
    showCsInfo: function(){

    },
    lastWeek: function (e) {

    },
    nextWeek: function (e) {

    },

    allCourse: function (e) {
        wx.navigateTo({
            url: "/pages/allCourse/allCourse"
        })
    }

})