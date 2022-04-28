function getCsByCs_idname(cs_idName) {
    var db = wx.cloud.database();
    const _ = db.command;
    return db.collection('course')
        .where(_.or([{
                cs_id: {
                    $regex: '.*' + cs_idName
                }
            },
            {
                cs_name: {
                    $regex: '.*' + cs_idName
                }
            }
        ]));

}
module.exports = {
    getCsByCs_idname: getCsByCs_idname
}