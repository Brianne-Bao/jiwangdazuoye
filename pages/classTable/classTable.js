// pages/classTable/classTable.js
Page({
    data: {
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