<!-- 介绍注册登录下载页面 -->
<template>
    <view>
        <view :class="showCode==0 ? 'box' :'box2'">
            <!-- <view class="img1">
                <image src="../../static/zcwz.png"></image>
            </view> -->
            <!-- <view class="img2">
                <image src="../../static/zcr.png"></image>
            </view> -->
            <view class="img3">
                <!-- <image src="../../../static/zcs.png"></image> -->
            </view>
            <view class="img4" v-if="showCode==0">
                <view class="kuang">
                    <view class="one">
                        <input type="number" maxlength="11" placeholder="请输入手机号" v-model="value1" />
                        <image src="../../../static/zc1.png" class="img1"></image>
                    </view>
                    <view class="one">
                        <input type="number" maxlength="6" placeholder="请输入验证码" v-model="value2" />
                        <image src="../../../static/zc2.png" class="img2"></image>
                        <view class="txt" v-if="showtext" @click="yanzheng">获取验证码</view>
                        <view class="txt" v-if="!showtext">{{second}}s重新发送</view>
                    </view>
                    <view class="one">
                        <input type="number" maxlength="11" placeholder="请输入邀请人手机号" disabled v-model="value3" />
                        <image src="../../../static/zc3.png" class="img3"></image>
                    </view>
                    <view class="phone">
                        <image :src="photo"></image>
                        <text>{{name}}</text>
                    </view>

                    <view class="xieyi" @click="goagree">
                        <!-- <image src="../../static/yxz.png" v-if="agree"></image> -->
                        <!-- <image src="../../static/zcwxz.png" v-else></image> -->
                        <text>我已阅读并同意</text>
                        <text style="color:#F6281B;">《注册协议》</text>
                    </view>
                    <view class="next" @click="present(1)">注册
                    </view>
                   <view class="next1" @click="toDownload">下载APP
                    </view>
                </view>
            </view>
            <view class="img5" v-else>
                <view class="kuang">
                    <view class="one publicCode">
                        <!-- <image src="../../static/publicCode.png" class=""></image> -->
                    </view>
                    <view class="one publicCode2">
                        <!-- <image :src="cdnUrl+downImg" class=""></image> -->
                    </view>
                    <view class="one">
                        <text class="publicCode3">长按识别二维码关注微信公众号</text>
                    </view>
                    <view class="one">
                        <text class="publicCode4" @click="downApp()">前往下载APP>></text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                referrer: false, //推荐人信息是否显示
                agree: true, //是否选中已阅读
                value1: '', //手机号
                value2: '', //验证码
                value3: '', //邀请人手机号
                second: 60, //倒计时秒数
                showtext: true,
                photo: '',
                name: '',
                cdnUrl: '',
                showCode: 0, //是否注册成功回显二维码
                device: "",
                user_id: '',
                android: '',
                ios: '',
                downImg: '',
                downUrl: '',
                downloadUrl: "",
                //定时器id
                theID: ""
            }
        },
        // onLoad(options) {
        //     //获取用户设备信息
        //     // if(options.device){
        //     // 	this.device=options.device
        //     // }
        //     if (options.user_id) {
        //         this.user_id = 1
        //         this.getrePhone(this.user_id)
        //     }
        //     var u = navigator.userAgent,
        //         app = navigator.appVersion;
        //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        //     var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        //     var phoneType = "";
        //     if (isAndroid) {
        //         phoneType = "android"
        //     }

        //     if (isiOS) {
        //         phoneType = "ios"
        //     }
        //     downLoadApi.downLoad({
        //         type: phoneType
        //     }).then(res => {
        //         this.downloadUrl = res.data.new_url
        //     })

        // },
        toDownload() {
            window.location.href = this.$downLoadUrl
        },
        // onShow() {
        //     var u = navigator.userAgent;
        //     this.android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        //     this.ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        //     if (this.android) {
        //         let name = 'android'
        //         this.versionLink(name)
        //     } else if (this.ios) {
        //         let name = 'ios'
        //         this.versionLink(name)
        //     }
        //     this.aboutWe();
        //     this.cdnUrl = this.$cdnUrl
        //     let userId = window.location.href.split('=')[1];

        //     // if(userId){
        //     // 	this.getrePhone(userId);
        //     // }else{
        //     // 	uni.showLoading({
        //     // 	    title: '加载中'
        //     // 	});
        //     // }
        // },
        methods: {
            // 验证码
            getSum() {
                this.getcode()
            },
            // 倒计时
            getcode() {

                this.showtext = false
                var interval = setInterval(() => {
                    let times = --this.second
                    this.second = times < 10 ? '0' + times : times //小于10秒补0
                }, 1000)
                this.theID = interval
                setTimeout(() => {
                    clearInterval(interval)
                    this.second = 60
                    this.showtext = true
                }, 60000)
            },
            // 获取验证码
            yanzheng() {
                let self = this
                if (self.value1 == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入手机号'
                    })
                } else  if (!/^1[3456789]\d{9}$/.test(this.value1)) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入正确的手机号'
                    })
                } else {
                    getCodeAPI.getCode({
                        phone: self.value1,
                        verify_type: 1,
                    }).then(res => {
                        console.log(res)
                        this.getcode() //倒计时
                        if (res.code == 200) {
                            uni.showToast({
                                icon: 'none',
                                title: res.msg
                            })

                        } else {
                            this.showtext = true
                            this.second = 60
                            clearInterval(this.theID)
                            uni.showToast({
                                icon: 'none',
                                title: res.data.msg
                            })
                        }
                    }, rej => {
                        console.log(rej);
                    })
                }

            },
            // 邀请人手机号
            getrePhone(user_id) {
                let self = this

                inviterApi.inviter({
                        user_id: user_id
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.photo = this.$imgUrl(res.data.photo)

                            this.name = res.data.name
                            this.value3 = res.data.phone
                            this.user_id = res.data.user_id
                            // this.referrer = true
                        }
                        if (res.code != 200) {
                            this.value3 = ""
                            this.photo = ""
                            this.name = ""
                            // this.referrer = false
                        }
                    })


            },
            // 是否同意
            goagree() {
                if (this.agree == true) {
                    this.agree = false
                } else {
                    this.agree = true
                }
            },
            // 注册按钮
            present(type) {
                let self = this
                if (self.value1 == self.value3) {
                    uni.showToast({
                        icon: 'none',
                        title: '邀请人不能为自己'
                    })
                    return
                }
                if (!/^1[3456789]\d{9}$/.test(this.value1)) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入正确的手机号'
                    })
                    return;
                }
                if (this.value2 == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入验证码'
                    })
                    return;
                }
                if (!/^1[3456789]\d{9}$/.test(this.value3)) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入正确的邀请人手机号'
                    })
                    return;
                }
                if (self.agree != true) {
                    uni.showToast({
                        icon: 'none',
                        title: '请先同意注册协议'
                    })
                    return
                }
                registeApi.registe({
                    phone: self.value1,
                    verification: self.value2,
                    referrer: self.user_id,
                    // device:self.device,
                    // user_id:self.user_id,
                }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        uni.showToast({
                            icon: 'none',
                            title: res.msg
                        })
                        //单独注册
                        if (type == 1) {
                            self.showCode = 1;

                        }

                        // else{
                        // 	// //注册并下载
                        // 	// self.downApp();
                        // 	setTimeout(()=>{
                        // 		if(this.downloadUrl){
                        // 			window.location.href = this.downloadUrl;
                        // 		}
                        // 		if(this.downloadUrl==""){
                        // 			uni.showToast({
                        // 				title:"未获取到下载地址，请刷新页面后重试",
                        // 				icon:"none"
                        // 			})
                        // 		}
                        // 	},2000)

                        // }



                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.msg
                        })
                    }
                }, rej => {
                    console.log(rej);
                })

                //  else if (self.agree != true) {
                // 	uni.showToast({
                // 		icon: 'none',
                // 		title: '请勾选同意'
                // 	})
                // } else {
                // 	self.request({
                // 		url: 'tpapi/public/index.php/login/register',
                // 		data: {
                // 			phone: self.value1,
                // 			verification: self.value2,
                // 			referrer: '',
                // 			verify_device: ''
                // 		}
                // 	}).then(res => {
                // 		if (res.data.success) {
                // 			uni.showToast({
                // 				title: res.data.msg
                // 			})
                // 			// 注册后显示的页面
                // 			uni.switchTab({
                // 				url: './my'
                // 			})
                // 		} else {
                // 			uni.showToast({
                // 				icon: 'none',
                // 				title: res.data.msg
                // 			})
                // 		}
                // 	}, rej => {
                // 		console.log(rej);
                // 	})
                // }
            },
            //安卓手机还是ios打开回显二维码
            versionLink(type) {
                let self = this
                versionLinkApi.versionLink({
                    type: type
                }).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.downUrl = res.data.new_url

                    } else {

                    }
                }, rej => {
                    console.log(rej);
                })
            },
            //关于我们二维码
            aboutWe() {
                let self = this
                aboutWeApi.aboutWe({}).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.downImg = res.data.wx_code_url
                    } else {

                    }
                }, rej => {
                    console.log(rej);
                })
            },
            //下载app
            downApp() {
                if (this.downloadUrl) {
                    window.location.href = this.downloadUrl;
                }
                if (this.downloadUrl == "") {
                    uni.showToast({
                        title: "未获取到下载地址，请刷新页面后重试",
                        icon: "none"
                    })
                }

            }
        }
    }
</script>

<style>
    page image {
        width: 100%;
        height: 100%;
    }

    .box {
        width: 100%;
        height: 2100rpx;
        /* background-image: url(../../static/zcbj.png); */
        background-size: cover;
        position: relative;
    }

    .box .img1 {
        width: 617rpx;
        height: 82rpx;
        position: absolute;
        left: 50%;
        top: 110rpx;
        transform: translateX(-50%);
    }

    .box .img2 {
        width: 576rpx;
        height: 406rpx;
        position: absolute;
        left: 50%;
        top: 320rpx;
        transform: translateX(-50%);
        z-index: 111;
    }

    .box .img3 {
        width: 734rpx;
        height: 664rpx;
        position: absolute;
        left: 50%;
        top: 530rpx;
        transform: translateX(-50%);
        z-index: 11;
    }

    .box .img4 {
        width: 733rpx;
        height: 929rpx;
        position: absolute;
        left: 50%;
        top: 1135rpx;
        transform: translateX(-50%);
        /* background-image: url(../../static/zcx.png); */
        background-size: cover;
    }

    .box .img5 {
        width: 733rpx;
        height: 733rpx;
        position: absolute;
        left: 50%;
        top: 1135rpx;
        transform: translateX(-50%);
        /* background-image: url(../../static/zcx.png); */
        background-size: cover;
    }


    .box2 {
        width: 100%;
        height: 1913rpx;
        /* background-image: url(../../static/zcbj.png); */
        background-size: cover;
        position: relative;
    }

    .box2 .img1 {
        width: 617rpx;
        height: 82rpx;
        position: absolute;
        left: 50%;
        top: 110rpx;
        transform: translateX(-50%);
    }

    .box2 .img2 {
        width: 576rpx;
        height: 406rpx;
        position: absolute;
        left: 50%;
        top: 320rpx;
        transform: translateX(-50%);
        z-index: 111;
    }

    .box2 .img3 {
        width: 734rpx;
        height: 664rpx;
        position: absolute;
        left: 50%;
        top: 530rpx;
        transform: translateX(-50%);
        z-index: 11;
    }

    .box2 .img4 {
        width: 733rpx;
        height: 929rpx;
        position: absolute;
        left: 50%;
        top: 1135rpx;
        transform: translateX(-50%);
        /* background-image: url(../../static/zcx.png); */
        background-size: cover;
    }

    .box2 .img5 {
        width: 733rpx;
        height: 733rpx;
        position: absolute;
        left: 50%;
        top: 1135rpx;
        transform: translateX(-50%);
        /* background-image: url(../../static/zcx.png); */
        background-size: cover;
    }

    .kuang {
        margin-top: 76rpx;
    }

    .kuang .one {
        position: relative;
        margin: 50rpx 121rpx 0;
    }

    .kuang image {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    .kuang .one .img1 {
        width: 34rpx;
        height: 44rpx;
    }

    .kuang .one .img2 {
        width: 36rpx;
        height: 38rpx;
    }

    .kuang .one .img3 {
        width: 44rpx;
        height: 40rpx;
    }

    .kuang .one input {
        width: 500rpx;
        height: 90rpx;
        line-height: 90rpx;
        background: #FFFFFF;
        border: 1rpx solid #CCCCCC;
        border-radius: 45rpx;
        padding-left: 100rpx;
        box-sizing: border-box;
    }

    .kuang .one image {
        position: absolute;
        left: 50rpx;
        top: 24rpx;
    }

    .kuang .one .txt {
        position: absolute;
        right: 30rpx;
        top: 30rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FD635E;
    }

    .kuang .phone {
        width: 500rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        margin-left: 120rpx;
        margin-top: 20rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FD635E;
    }

    .kuang .phone image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
    }

    .xieyi {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        text-align: center;
        margin-bottom: 20rpx;
        margin-top: 20rpx;
    }

    .xieyi image {
        width: 32rpx;
        height: 32rpx;
        vertical-align: middle;
        margin-right: 10rpx;
    }

    .next {
        width: 500rpx;
        height: 90rpx;
        background: #FC5957;
        border-radius: 45rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 36rpx;
        font-family: AlibabaPuHuiTiR;
        font-weight: 400;
        color: #FFFFFF;
        margin-left: 120rpx;
    }

    .next1 {
        width: 500rpx;
        height: 90rpx;
        background: #FFFFFF;
        border: 1px solid #FC5957;
        border-radius: 45rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 36rpx;
        font-family: AlibabaPuHuiTiR;
        font-weight: 400;
        color: #FC5957;
        margin-left: 120rpx;
        margin-top: 30rpx;
    }

    .img5 .publicCode {
        top: 30px;
        width: 328rpx;
        height: 39rpx;
        left: 25%;
        position: relative;
        transform: translateX(-50%);
        z-index: 11;
    }

    .img5 .publicCode2 {
        top: 56px;
        width: 250rpx;
        height: 250rpx;
        left: 25%;
        position: relative;
        transform: translateX(-50%);
        z-index: 11;
    }

    .img5 .publicCode3 {
        top: 60px;
        width: 250rpx;
        height: 250rpx;
        left: 10%;
        position: relative;
        transform: translateX(-50%);
        z-index: 11;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FC5957;
    }

    .img5 .publicCode4 {
        top: 95px;
        left: 25%;
        position: relative;
        transform: translateX(-50%);
        z-index: 11;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }
</style>
