var app = getApp();

let userName = "";
let userGender = "";
let userRegion = "";
let userPeople = "";
let userPoliticalOutlook = "";

let userID = "";
let userClass = "";
let userRoomNumber = "";

let userPhone = "";
let userWeChat = "";
let userQQ = "";

let userFirstIntention = "";
let userSecondIntention = "";
let userAdjust = "";

let userAward = "";
let userIntroduction = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userGenderArray:["男","女"],
    genderIndex: 0,

    userPoliticalOutlook:["中共党员","预备党员","共青团员","群众","其它"],
    politicalOutlookIndex:0,

    userClass: ["计算机II类2001班", "计算机II类2002班", "计算机II类2003班", "计算机II类2004班", "计算机II类2005班",
                "计算机II类2006班", "计算机II类2007班", "计算机II类2008班", "计算机II类2009班", "计算机II类2010班",
                "计算机II类2011班", "计算机II类2012班", "计算机II类2013班", "计算机II类2014班", "计算机II类2015班",
    ],
    userClassIndex: 0,

    userFirstIntention: ["组织部", "办公室", "新媒体中心", "活动中心", "权益中心", "社团中心"],
    userFirstIntentionIndex: 0,
    userSecondIntention: ["组织部", "办公室", "新媒体中心", "活动中心", "权益中心", "社团中心"],
    userSecondIntentionIndex: 0,

    userAdjustArray: ["是", "否"],
    adjustIndex: 0,
    
    getUserRegion: ["北京市", "北京市", "东城区"],
  },


  /**
   * 选择用户性别
   */
  bindUserGenderChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      genderIndex: e.detail.value
    })
  },
  /**
   * 选择所在地区
   */
  bindUserRegionChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      getUserRegion: e.detail.value,
    })
  },
  /**
   * 选择**面貌
   */
  bindUserPoliticalOutlook: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      politicalOutlookIndex: e.detail.value
    })
  },
  /**
   * 选择班级
   */
  bindUserClass: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userClassIndex: e.detail.value
    })
  },
  /**
   * 选择第一志愿
   */
  bindUserFirstIntention: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userFirstIntentionIndex: e.detail.value
    })
  },
  /**
   * 选择第二志愿
   */
  bindUserSecondIntention: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      userSecondIntentionIndex: e.detail.value
    })
  },
  /**
   * 选择是否调剂
   */
  bindUserAdjust: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      adjustIndex: e.detail.value
    })
  },
  /**
   * 提交保存
   */
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail.value.userName)

    userName = e.detail.value.userName;
    userGender = e.detail.value.userGender;
    userRegion = e.detail.value.userRegion;
    userPeople = e.detail.value.userPeople;
    userPoliticalOutlook = e.detail.value.userPoliticalOutlook;

    userID = e.detail.value.userID;
    userClass = e.detail.value.userClass;
    userRoomNumber = e.detail.value.userRoomNumber;

    userPhone = e.detail.value.userPhone;
    userWeChat = e.detail.value.userWeChat;
    userQQ = e.detail.value.userQQ;

    userFirstIntention = e.detail.value.userFirstIntention;
    userSecondIntention = e.detail.value.userSecondIntention;
    userAdjust = e.detail.value.userAdjust;

    userAward = e.detail.value.userAward;
    userIntroduction = e.detail.value.userIntroduction;

    /**
     * 判断用户是否提交为空列表
     */
    if (userName == "" || userPeople == "" || userID == "" || userRoomNumber == "" || userPhone == "" || userQQ == "" || userAward == "" || userIntroduction == "") {
      console.log(userName,userPeople,userID,userRoomNumber,userPhone,userQQ,userAward,userIntroduction)
      wx.showToast({
        title: '请输入完整信息！',
        icon: 'none',
        duration: 2000
      });
    } else {
      this.signUpUserInfo();

      wx.showToast({
        title: '正在提交',
        icon: 'loading',
        duration: 1000,
        success: res => {
          wx.showModal({
            title: '报名成功',
            content: '期待你的加入！',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  delta: 1,
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        },
        fail: err => {
          console.log('保存失败', err);
        },
      })
    }
  },

  /**
   * 将个人信息保存到数据库
   */
  signUpUserInfo: function () {
    // 连接数据库环境
    const db = wx.cloud.database();
    // 选择classesDB数据库
    db.collection('classedDB').add({
      data: {
        userName : userName,
        userGender : userGender,
        userRegion : userRegion[0]+userRegion[1]+userRegion[2],
        userPeople : userPeople,
        userPoliticalOutlook : userPoliticalOutlook,

        userID : userID,
        userClass : userClass,
        userRoomNumber : userRoomNumber,

        userPhone : userPhone,
        userWeChat : userWeChat,
        userQQ : userQQ,

        userFirstIntention : userFirstIntention,
        userSecondIntention : userSecondIntention,
        userAdjust : userAdjust,

        userAward : userAward,
        userIntroduction : userIntroduction,

      },
      // 成功返回
      success: res => {
        console.log('添加成功', res._id);
      },
      fail: err => {
        console.log('添加失败', err);
      },
      complete: res => {
        console.log('添加完成', res)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
