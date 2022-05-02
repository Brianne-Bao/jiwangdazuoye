// pages/allCourse/allCourse.js
Page({

    data: {
        courses: []
    },

    onLoad: function (e) {
        console.log("e.courses");
        var courses = JSON.parse(e.courses);
        this.setData({
            courses
        })
         console.log(this.data.courses);
    }

})