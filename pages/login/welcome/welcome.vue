<template>
    <view class="main">
        <view class="content">
            <view class="top">
                欢迎使用
            </view>
            <view class="btm">
                <view class="img">
                    <image src="../../../static/userIcon.png" mode="aspectFill"></image>
                </view>
                <view class="ipt">
                    <input maxlength='11' type="number" v-model="phoneNum" placeholder="请输入手机号"
                        placeholder-style="color:#999999;font-size: 30rpx" />
                </view>
            </view>
            <view class="line">
            </view>
        </view>
        <view class="xbtn-blue btn" @click="login">
            下一步
        </view>
        <view class="dl">
            <span></span>
            <view class="font-26" style="color: #999999; ">微信快捷登录</view>
            <span></span>
        </view>
        <view class="dl2">
            <image src="../../../static/wxdl.png" style="width: 100rpx;height: 100rpx;" @click="appLogin"></image>
        </view>

        <view style="display: flex;justify-content: center;width: 100%;">
            <!-- <view class="font"></view> -->
            <view class="qr" style="position: fixed;bottom:70rpx;">
                <img :src="$cdnUrl + aboutsUs.small_logo" alt="">
            </view>
            <view class="smallfont" style="position: fixed;bottom: 30rpx;">{{aboutsUs.copyright}}</view>
        </view>
    </view>
</template>

<script>
    // let weixinAuthService
    import Vue from "vue";
    export default {
        data() {
            return {
                phoneNum: "",
                time: 0,
                issend: false,
                merchant_id: "",
                money: "",
                token: "",
                userPhone: "",
                aboutsUs: {}, //公司信息
                code: "",
                openid: '',
                session_key: '',
                unionid: '',
                userInfo: {},
                sex: "",
                cid:""
            };
        },
        onLoad() {
            this.cid = uni.getStorageSync('cid')
            // if (!this.cid) {
            //     uni.showLoading();
            //     setTimeout(function() {
            //         uni.hideLoading();
            //     }, 2000);
            // }
            console.log(uni.getStorageSync('cid'))
            this.request({
                url: 'ShptUapi/public/index.php/UserConsumers/aboutWe',
                data: {}
            }).then(res => {
                console.log(res.data.data)
                if (res.data.success) {
                    this.aboutsUs = res.data.data
                } else {

                }
            })


            // plus.oauth.getServices((services) => {
            //     console.log(services)
            //     weixinAuthService = services.find((service) => {
            //         console.log(services)
            //         return service.id === 'weixin'
            //     })
            //     // if (weixinAuthService) {
            //     //     this.hasWeixinAuth = true
            //     // }
            // });
            // var aweixin = null;
            // // 当前环境支持的所有授权登录对象
            // var auths = {};
            // plus.oauth.getServices(function(services) {
            //     for (var i in services) {
            //         auths[service.id] = service;
            //     }
            //     aweixin = auths['weixin'];
            //     console.log(services)
            // }, function(e) {
            //     plus.nativeUI.alert("获取登录授权服务列表失败：" + JSON.stringify(e));
            // });


            //获取客户端ID
            // getClientId() {
            //获取客户端ID和版本号
            var device = '';
            // #ifdef APP-PLUS
            // 苹果系统
            plus.device.getInfo({
                success: function(e) {
                    device = e.uuid;
                    // uni.setStorage('device', device);
                    uni.setStorage({
                        key: 'device',
                        data: device,
                        success: function() {
                            console.log('success', device);
                        }
                    });

                },
                fail: function(e) {
                    console.log(e);
                }
            });
            // 安卓系统
            plus.device.getAAID({
                success: function(e) {
                    device = e.aaid;
                    console.log(device);
                    // uni.setStorage('device', device);
                    uni.setStorage({
                        key: 'device',
                        data: device,
                        success: function() {
                            console.log('success', device);
                        }
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            });
            //老版本、安卓模拟器
            if (device == '') {
                device = plus.device.uuid;
                // uni.setStorage('device', device);
                uni.setStorage({
                    key: 'device',
                    data: device,
                    success: function() {
                        console.log('success', device);
                    }
                });
            }
            // #endif

            console.log(device);
            return device;
            // }

        },

        methods: {
            // getService() {
            //     console.log(11112111)

            //     this.getWeixinCode().then((code) => {
            //         // return uniCloud.callFunction({
            //         //     name: 'use-common',
            //         //     data: {
            //         //         action: 'loginByWeixin',
            //         //         params: {
            //         //             code,
            //         //         }
            //         //     }
            //         // })
            //     }).then((res) => {
            //         uni.showModal({
            //             showCancel: false,
            //             content: JSON.stringify(res.result)
            //         })
            //         // this.code2SessionWeixin();
            //         console.log(res)
            //         if (res.result.code === 0) {
            //         	uni.setStorageSync('uni_id_token', res.result.token)
            //         	uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
            //             this.bindWeixin();
            //         }
            //     }).catch((e) => {
            //         console.error(e)
            //         uni.showModal({
            //             showCancel: false,
            //             content: '微信登录失败，请稍后再试'
            //         })
            //     })
            // },
            // getWeixinCode() {
            //     console.log(111111)
            //     return new Promise((resolve, reject) => {
            //         // #ifdef APP-PLUS
            //         weixinAuthService.authorize(function(res) {
            //             resolve(res.code)
            //         }, function(err) {
            //             console.log(err)
            //             reject(new Error('微信登录失败'))
            //         });
            //         // #endif
            //         // #ifdef MP-WEIXIN
            //         uni.login({
            //             provider: 'weixin',
            //             success(res) {
            //                 resolve(res.code)
            //             },
            //             fail(err) {
            //                 reject(new Error('微信登录失败'))
            //             }
            //         })
            //         // #endif
            //     })
            // },
            // code2SessionWeixin() {
            // 	this.getWeixinCode().then((code) => {
            // 		return uniCloud.callFunction({
            // 			name: 'use-common',
            // 			data: {
            // 				action: 'code2SessionWeixin',
            // 				params: {
            // 					code,
            // 				}
            // 			}
            // 		})
            // 	}).then((res) => {
            // 		uni.showModal({
            // 			showCancel: false,
            // 			content: JSON.stringify(res.result)
            // 		})
            // 	}).catch((e) => {
            // 		console.error(e)
            // 		uni.showModal({
            // 			showCancel: false,
            // 			content: '微信登录失败，请稍后再试'
            // 		})
            // 	})
            // },
            // bindWeixin() {
            // 	this.getWeixinCode().then((code) => {
            // 		return uniCloud.callFunction({
            // 			name: 'uni-id-test',
            // 			data: {
            // 				action: 'bindWeixin',
            // 				params: {
            // 					code: code,
            // 				}
            // 			}
            // 		})
            // 	}).then((res) => {
            // 		uni.showModal({
            // 			showCancel: false,
            // 			content: JSON.stringify(res.result)
            // 		})
            // 	}).catch(() => {
            // 		uni.showModal({
            // 			showCancel: false,
            // 			content: '微信绑定失败，请稍后再试'
            // 		})
            // 	})
            // },
            // // 微信快捷登录
            // getUserInfo() {
            //     uni.login({
            //         provider: 'weixin',
            //         success: function(loginRes) {
            //             console.log(loginRes.authResult);
            //             // 获取用户信息
            //             uni.getUserInfo({
            //                 provider: 'weixin',
            //                 success: function(infoRes) {
            //                     console.log('用户昵称为：' + infoRes.userInfo.nickName);
            //                 }
            //             });
            //         }
            //     });
            // },
            login() {
                if (this.phoneNum.length == 0) {
                    uni.showToast({
                        title: "请输入手机号",
                        icon: 'none'
                    })
                    return;
                } else if (this.phoneNum.length != 11 && this.phoneNum.length > 0) {
                    uni.showToast({
                        title: "请输入正确的手机号",
                        icon: 'none'
                    })

                    return;
                } else if (this.phoneNum.length == 11) {
                    var reg = /^1[3456789]\d{9}$/;
                    if (!reg.test(this.phoneNum)) {
                        uni.showToast({
                            title: "请输入正确的手机号",
                            icon: 'none'
                        })
                    } else {
                        this.request({
                            url: 'ShptUapi/public/index.php/login/login',
                            data: {
                                phone: this.phoneNum
                            }
                        }).then(res => {


                            console.log(res.data.status)
                            if (res.data.status == 100) {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            } else if (res.data.status == 200) {
                                //去登陆
                                console.log(11)
                                uni.navigateTo({
                                    url: "../login?phoneNum=" + this.phoneNum
                                })
                            } else if (res.data.status == 300) {
                                //去注册
                                uni.navigateTo({
                                    url: "../register/register?phoneNum=" + this.phoneNum
                                })
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            }



                        });
                    }
                }
            },



            appLogin: function() {
                let self = this;

                uni.getProvider({
                    service: 'oauth',
                    success: function(res) {
                        console.log(res.provider);
                        //支持微信、qq和微博等
                        if (~res.provider.indexOf('weixin')) {
                            uni.login({
                                provider: 'weixin',
                                success: function(loginRes) {
                                    console.log('-------获取openid(unionid)-----');
                                    console.log(JSON.stringify(loginRes));
                                    // 获取用户信息
                                    uni.getUserInfo({
                                        provider: 'weixin',
                                        success: function(infoRes) {
                                            console.log('-------获取微信用户所有-----');
                                            console.log(JSON.stringify(infoRes.userInfo));

                                            let data = infoRes.userInfo
                                            // let da = data.parseJSON()
                                            data.device = self.$device()
                                            data.registration_id = self.cid

                                            console.log(data)
                                            self.request({
                                                url: 'ShptUapi/public/index.php/login/login_wechat',
                                                data: data
                                            }).then(res => {
                                                console.log(res)
                                                uni.showToast({
                                                    title: res.data.msg,
                                                    icon: 'none'
                                                })
                                                if (res.data.status == 200) {
                                                    uni.setStorage({
                                                        key: 'token',
                                                        data: res.data.data.token,
                                                        success: function() {
                                                            console.log('success',res.data.data.token);
                                                            // console.log(this.$token())
                                                        }
                                                    });

                                                    // uni.reLaunch({
                                                    //     url: '../index/index'
                                                    // });
                                                    uni.switchTab({
                                                        url:'../../index/index'
                                                    })
                                                } else if (res.data.status == 300 ||res.data.status ==350) {
                                                    uni.navigateTo({
                                                        url: '../WX_bind/wx_bind?data=' +JSON.stringify(res.data.data)
                                                    })
                                                    // Vue.prototype.$uniReLaunch("/pages/login/WX_bind/wx_bind");
                                                    //         uni.$emit("test", {
                                                    //           test: "成功",
                                                    //         });
                                                    // self.$router.push({
                                                    //           path: "/pages/login/WX_bind/wx_bind",
                                                    //           name: "Result",
                                                    //           query: res.data.data,
                                                    //           params: res.data.data
                                                    //         });
                                                }
                                            })
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            },
        }

    }
</script>
<style>
    page {
        background: #FFFFFF
    }
</style>
<style lang="scss" scoped>
    .dl {
        display: flex;
        justify-content: center;
        margin-bottom: 30rpx;
        margin-top: 117rpx;
        align-items: center;

        span {
            width: 60rpx;
            height: 1px;
            background: #CCCCCC;
        }

        .font-26 {
            margin-left: 20rpx;
            margin-right: 20rpx;
        }
    }

    .dl2 {
        display: flex;
        justify-content: center;
    }

    .font {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
    }

    .qr>img {
        border-radius: 10rpx;
        width: 80rpx;
        height: 80rpx;
    }

    .smallfont {
        font-size: 18rpx;
        font-family: Microsoft YaHei;
        font-weight: 400;
    }

    .content {
        margin: 0 50rpx;
        font-family: PingFang SC;
        padding-top: 57rpx;

        .top {

            font-size: 56rpx;

            font-weight: bold;
            color: #222222;
            line-height: 66rpx;

        }

        .btm {
            display: flex;
            align-items: center;
            margin-top: 258rpx;


            .img {
                width: 38rpx;
                height: 46rpx;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .ipt {
                margin-left: 40rpx;
                width: 500rpx;

            }

            .box {

                width: 165rpx;
                height: 60rpx;
                background: #E9EBEC;
                border-radius: 30rpx;
                text-align: center;
                line-height: 60rpx;
                margin-left: 190rpx;

            }
        }

        .line {
            margin-top: 16rpx;
            width: 650rpx;
            height: 1rpx;
            border-bottom: 1rpx solid #E0E0E0;
        }

        .ishidden {
            visibility: hidden
        }
    }

    .btn {
        width: 690rpx;
        height: 90rpx;
        line-height: 90rpx;
        background-color: #FD635E;
        border-radius: 45rpx;
        color: #FFFFFF;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .xbtn-blue {
        margin: 140rpx 30rpx 0;
        text-align: center;
    }

    .txt {
        width: 300rpx;
        margin: 187rpx auto 0;
        height: 30rpx;
        display: flex;
        align-items: center;
        color: #999999;

        .theline {
            width: 30rpx;
            height: 1rpx;
            background-color: #CCCCCC;
        }

    }

    .zfblogo {
        width: 100rpx;
        height: 100rpx;
        margin: 30rpx auto 0;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .xxylogo {
        position: fixed;
        bottom: 60rpx;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 80rpx;
        height: 80rpx;
        background: #EEEEEE;
        border-radius: 10rpx;

        image {
            width: 100%;
            height: 100%;

        }
    }

    .logotxt {
        position: fixed;
        bottom: 20rpx;
        left: 50%;
        transform: translate(-50%, -50%);
        // width: 500rpx;
        font-size: 18rpx;
        color: #999999;
    }
</style>
