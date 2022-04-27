// pages/changeCourse/changeCourse.js
Page({

    data: {
        op: 0 ,//0,1,2,3：未选择，新增课程，删除课程，修改课程
        departments:getApp().globalData.departments,
        department:"",
        dep_index : 0,


    },

    choose_add_cs: function () {
        this.setData({
            "op": 1
        });
    },
    choose_del_cs: function () {
        this.setData({
            "op": 2
        });
    },
    choose_change_cs: function () {
        this.setData({
            "op": 3
        })
    },

    onShow:function(){
        this.setData({"op":0});
    },

    dep_change:function(e){
        this.setData({
            "dep_index": e.detail.value
          });
    },


    

})