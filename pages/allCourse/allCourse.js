// pages/allCourse/allCourse.js
Page({

    data: {

    },

    onLoad: function (options) {
        wx.cloud.database().collection('student').get({
            success: (res) => {

            }
        })
    },


})