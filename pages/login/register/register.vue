<template>
    <view class="main">

        <view class="content">
            <view class="top">
                欢迎注册
            </view>
            <view class="mid">
                验证码已发送到{{phoneNum |handleNum}}
                <view>请查收短信验证码</view>
            </view>
            <view class="btm" style="margin-top: 159rpx;">
                <view class="img">
                    <image src="../../../static/dun1.png" mode="aspectFill"></image>
                </view>
                <view class="ipt">
                    <input type="number" value="" maxlength="6" v-model="code" placeholder="请输入验证码"
                        placeholder-style="color:#999999;font-size: 30rpx" />
                </view>
                <view class="box">

                    <view class="second" v-if="!issend" @click="tosend" style="font-size: 24rpx;color: #222222">
                        发送验证码
                    </view>
                    <view class="send" v-if="issend">
                        {{time}}s
                    </view>
                </view>
            </view>
            <view class="line">

            </view>
            <view class="btm" style="margin-top: 60rpx;">
                <view class="img">
                    <image src="../../../static/userIcon.png"></image>
                </view>
                <view class="ipt1" style="width: 100%;">
                    <input type="number" value="" maxlength="11" v-model="boss" placeholder="请输入推荐人手机号 (必填)"
                        @input="change" placeholder-style="color:#999999;font-size: 30rpx" />
                </view>

            </view>
            <view class="line">

            </view>
            <view class="sj" v-if="shang.name">
                <image :src="$cdnUrl+shang.photo" class="img222"></image>
                <view class="text">
                    {{shang.name}}
                </view>
            </view>
            <view style="display: flex;align-items: center;margin-top: 30rpx;">
                <!-- <image :src="flag?'../../static/register/xz.png':'../../static/register/wxz.png'" mode="" style="width:32rpx;height:32rpx;" @click="agree"></image> -->
                <image v-if="!flag" src="../../../static/un_select.png" mode="" style="width:32rpx;height:32rpx;"
                    @click="agree">
                </image>
                <image v-if="flag" src="../../../static/select.png" mode="" style="width:32rpx;height:32rpx;"
                    @click="agree">
                </image>
                <text
                    style="margin-left:12rpx;font-size: 26rpx;font-family: PingFang SC; font-weight: 400;color: #999999;"
                    @click="agree">我已阅读并同意</text>
                <text style="color: #3E4E60;font-size: 26rpx;font-family: PingFang SC; font-weight: 400;"
                    @click="go">《注册协议》</text>
            </view>
        </view>
        <view class="btn" @click="login">
            <!-- <image src="../../static/login.png" mode=""></image> -->
            <!-- <view class="xbtn-blue"> -->
            注册
            <!-- </view> -->
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                //手机号
                phoneNum: "",
                time: 60,
                issend: false,
                code: "",
                merchant_id: "",
                money: "",
                boss: "",
                boss_user_id: "",
                shang: {},
                flag: false,
                cid: false,
            };
        },
        onLoad(e) {
            if (e) {
                this.phoneNum = e.phoneNum
            }
            this.tosend();

            this.cid = uni.getStorageSync('cid')
        },
        methods: {
            go() {
                console.log(1111111111111)
                uni.navigateTo({
                    url: "registrationAgreement"
                })
            },
            agree() {
                this.flag = !this.flag;
            },
            change() {

                if (this.boss.length == 11) {
                    this.request({
                        url: 'ShptUapi/public/index.php/login/recommend',
                        data: {
                            phone: this.boss,
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.status == 200) {

                            this.shang.name = res.data.data.name
                            this.shang.photo = res.data.data.photo
                            this.boss_user_id = res.data.data.user_id
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    })

                } else {
                    this.shang.name = ''
                    this.shang.photo = ''
                    this.boss_user_id = ''
                }
            },
            tosend() {
                this.request({
                    url: 'ShptUapi/public/index.php/login/verification_code',
                    data: {
                        phone: this.phoneNum,
                        verification_type: "1"
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.status == 200) {
                        this.issend = true
                        var start = setInterval(() => {
                            this.time--
                            if (this.time <= 0) {
                                clearInterval(start)
                                this.issend = false
                                this.time = 60
                            }
                        }, 1000)
                    } else if (res.data.status != 200) {
                        uni.showToast({
                            title: res.data.msg,
                            duration: 1500,
                            icon: "none"
                        });
                        // setTimeout(() => {
                        // 	this.delaynav();
                        // }, 1500)
                    }
                })
                //在成功的回调里   把issend改成true

            },
            login() {
                if (this.code == "") {
                    uni.showToast({
                        title: "请输入验证码",
                        icon: "none"
                    })
                    return
                }
                if (!this.boss) {
                    uni.showToast({
                        title: '请输入推荐人手机号',
                        icon: 'none'
                    })
                    return
                }
                if (!this.flag) {
                    uni.showToast({
                        title: '您还未同意用户协议',
                        icon: 'none'
                    })
                    return
                }

                this.request({
                    url: 'ShptUapi/public/index.php/login/register',
                    data: {
                        phone: this.phoneNum,
                        verification: this.code,
                        referrer: this.boss_user_id,
                        device: this.$device(),
                        registration_id: this.cid
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.status == 200) {

                        // uni.setStorageSync('token', res.data.data.token);
                        uni.setStorage({
                            key: 'token',
                            data: res.data.data.token,
                            success: function() {
                                console.log('success', res.data.data.token);
                            }
                        });
                        uni.setStorage({
                            key: 'phone',
                            data: this.phoneNum,
                            success: function() {
                                console.log('success', this.phoneNum);
                                // console.log(this.$token())
                            }
                        });
                        // uni.reLaunch({
                        //     url: '../../index/index'
                        // });
                        uni.switchTab({
                            url: '../../index/index'
                        })
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })


            },
        },
        filters: {
            handleNum(p) {
                if (p) {
                    return p.substring(0, 3) + '****' + p.substring(p.length - 4);
                }
            }
        }

    }
</script>
<style>
    page {
        background: #FFFFFF
    }
</style>
<style lang="scss" scoped>
    .sj {
        height: 100rpx;
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .img222 {
            width: 100rpx;
            height: 100rpx;
            margin-right: 20rpx;
            border-radius: 50%;
        }

        .text {

            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;

        }
    }

    .content {
        margin: 0 50rpx;
        font-family: PingFang SC;
        padding-top: 56rpx;

        .top {

            font-size: 56rpx;

            font-weight: bold;
            color: #222222;
            line-height: 66rpx;

        }

        .mid {
            margin-top: 100rpx;
            width: 325rpx;
            height: 64rpx;
            font-size: 24rpx;
            text-align: left;
            color: #999999;

        }

        .btm {
            display: flex;
            align-items: center;



            .img {
                width: 32rpx;
                height: 42rpx;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .ipt {
                margin-left: 40rpx;
                width: 300rpx;

            }

            .ipt1 {
                margin-left: 40rpx;
            }

            .box {

                width: 165rpx;
                height: 60rpx;
                background: #E9EBEC;
                border-radius: 30rpx;
                text-align: center;
                line-height: 60rpx;
                margin-left: 90rpx;

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
        margin: 140rpx 30rpx 0;

        width: 690rpx;
        height: 90rpx;
        background-color: #FD635E;
        color: #FFFFFF;
        text-align: center;
        line-height: 90rpx;
        font-size: 36rpx;
        border-radius: 10rpx;

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

        transform: translateX(-50%);

        font-size: 18rpx;
        color: #999999;
    }
</style>
