// app.js
App({
    globalData: {
        username: "111111",
        usertype: 0,
        departments: ['历史学院', '软件学院', '法学院', ],
        grades: ['2018', '2019', '2020', '2021'],
        cs_types: ['通修', '平台', '通识', '核心', '选修'],
        weekday: 0, //今天是星期几
        curr_week: 0, //今天是开学第几周
        term_week_num:17,//这学期有几周
        buildings: ['仙I', '仙II', '逸A', '逸B', '逸C', '基础实验楼甲区', '基础实验楼乙区', '基础实验楼丙区'],
        int_weekday: {
            "周一": 1,
            "周二": 2,
            "周三": 3,
            "周四": 4,
            "周五": 5,
        },
        cs_color: ['#FCB8AF',
            '#F8C77A',
            '#81D2FC',
            '#78fa78',
            '#f694fa'
        ],
        logo_color: ['#FA7666',
            '#F39C13',
            '#56c7ff',
            '#41f541',
            '#f151f7'
        ],
        logo_word: {
            "通修": '通',
            "平台": '平',
            "通识": '识',
            "核心": '核',
            "选修": '选'
        }

    },

    cntCurrWeek: function () {
        var termBeginData = new Date("2022-02-14"); //开学日期
        var today = new Date();
        var daysDiff = Math.ceil((today - termBeginData) / (1000 * 60 * 60 * 24));
        var weekDiff = Math.ceil(daysDiff / 7);
        this.globalData.weekday = today.getDay();
        this.globalData.curr_week = weekDiff;
    },

    onLaunch: function () {
        wx.cloud.init({
            env: "cloud-0gi7vbl8c67ed02f"
        });
        this.cntCurrWeek();
    }
})