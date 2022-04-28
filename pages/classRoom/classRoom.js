// pages/classRoom/classRoom.js
let gb = getApp().globalData;
Page({

    data: {
        curr_week: gb.curr_week, //今天是开学第几周
        weekday: gb.weekday, //今天是星期几
        courses: [] //该教室的所有课程信息
    },

})