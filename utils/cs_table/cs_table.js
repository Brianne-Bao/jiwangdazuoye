function lastWeek () {
    const t = this.data.template_info.curr_week;
    if (t > 1) {
        this.setData({
            "template_info.curr_week": t - 1
        });
    }
}
function nextWeek () {
    const t = this.data.template_info.curr_week;
    if (t < gd.term_week_num) {
        this.setData({
            "template_info.curr_week": t + 1
        });
    }
}

function allCourse(e) {
    var courses = JSON.stringify(this.data.template_info.courses);
    wx.navigateTo({
        url: '/pages/allCourse/allCourse?courses=' + courses
    }) //把courses数据也传过去
}

function clickShowCsInfo (e) {
    this.setData({
        "template_info.course": [e.currentTarget.dataset.course],
        "template_info.showCsInfo": true
    });
}
function closeModal (e) {
    this.setData({
        "template_info.showCsInfo": false
    })
}
module.weports={
    lastWeek:lastWeek,
    nextWeek:nextWeek,
    clickShowCsInfo:clickShowCsInfo,
    closeModal:closeModal
}