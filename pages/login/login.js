// pages/login/login.js
const app = getApp()

Page({

    data: {
        username: '',
        password: ''
    },

    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },

    // 获取输入账号 
    usernameInput: function (e) {
        this.setData({
            username: e.detail.value
        })
    },
    // 获取输入密码 
    passwordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    // 登录处理
    login: function () {
        if (this.data.username.length == 0) {
            wx.showToast({
                title: '账号不能为空',
                icon: 'none',
                duration: 2000
            })
        } else if (this.data.password.length == 0) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none',
                duration: 2000
            })
        } else {
            wx.cloud.database().collection('login')
                .get({
                    success: (res) => {
    
                        let admin = res.data;
                        var inputUserName = this.data.username;
                        var inputPassword = this.data.password;
                        var flag = false;
                        for (let i = 0; i < admin.length; i++) { //遍历数据库对象集合
                            if (inputUserName == admin[i].username) { //账户已存在
                                flag = true;
                                if (inputPassword !== admin[i].password) { 
                                    wx.showToast({ 
                                        title: '密码错误！！',
                                        icon: 'error',
                                        duration: 2500
                                    });
                                    break;
                                } 
                                else {
                                    wx.showToast({ 
                                        title: '登陆成功！！',
                                        icon: 'success',
                                        duration: 2500
                                    })
                                    wx.setStorageSync('currentUser', inputUserName);
                                    wx.navigateTo({
                                        url: '/pages/index/index',
                                    })
                                    break;
                                }
                            }
                        }
                        console.log(flag);
                        if (flag == false) {
                            wx.showToast({
                                title: '该用户不存在',
                                icon: 'error',
                                duration: 2500
                            })
                        }
                    }
                })
        }
    }

})