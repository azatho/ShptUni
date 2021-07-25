<template>
    <view class="main">

        <view class="content">

            <view class="btm" style="margin-top: 60rpx;">
                <view class="img">
                    <image src="../../../static/userIcon.png"></image>
                </view>
                <view class="ipt1">
                    <input type="number" value="" maxlength="11" v-model="phoneNum" @input="is_phone"
                        placeholder="请输入手机号" placeholder-style="color:#999999;font-size: 24rpx" />
                </view>

            </view>
            <view class="line">

            </view>
            <view class="btm" style="margin-top: 60rpx;">
                <view class="img">
                    <image src="../../../static/dun1.png" mode="aspectFill"></image>
                </view>
                <view class="ipt">
                    <input type="number" value="" maxlength="6" v-model="code" placeholder="请输入验证码"
                        placeholder-style="color:#999999;font-size: 24rpx" />
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
            <view class="btm" style="margin-top: 60rpx;" v-if="flag">
                <view class="img">
                    <image src="../../../static/userIcon.png"></image>
                </view>
                <view class="ipt1">
                    <input type="number" value="" maxlength="11" v-model="boss" placeholder="请输入推荐人手机号(必填)"
                        @input="change" placeholder-style="color:#999999;font-size: 24rpx" />
                </view>

            </view>
            <view class="line" v-if="flag">

            </view>
            <view class="sj" v-if="shang.name!=''">
                <image :src="$imgUrl(shang.photo)" class="img222"></image>
                <view class="text">
                    {{shang.name}}
                </view>
            </view>


        </view>
        <view class="btn" @click="login">
            <!-- <image src="../../static/login.png" mode=""></image> -->
            <view class="xbtn-blue">
                绑定
            </view>
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
                user_id: "",
                money: "",
                boss: "",
                shang: {
                    name: ''
                },
                flag: false,
                item: {},
                cid: ""
            };
        },
        onLoad(option) {
            const item = option.data;
            console.log(item)
            this.item = item
            // uni.$on("test", (data) => {
            //         console.log("接收事件test成功,data=", data);
            //       });
        },
        methods: {
            is_phone(e) {
                let self = this;
                if (self.phoneNum.length == 11) {
                    self.request({
                        url: 'ShptUapi/public/index.php/login/is_phone',
                        data: {
                            phone: self.phoneNum,
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.status == 100) {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        } else if (res.data.status == 202) {

                            self.flag = false;
                        } else {
                            //手机号未绑定微信并且需要填写上级推荐人~！
                            self.flag = true;
                        }
                    })

                }
            },
            change(e) {
                console.log(e)
                //推荐人信息
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
                            this.user_id = res.data.data.user_id
                            console.log(this.shang.name)
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    })
                } else {
                    this.shang.name = ""
                    this.shang.photo = ""
                    this.user_id = ""
                }
            },
            tosend() {
                this.request({
                    url: 'ShptUapi/public/index.php/login/verification_code',
                    data: {
                        phone: this.phoneNum,
                        verification_type:3
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
                if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.phoneNum)) {
                    uni.showToast({
                        title: '请输入正确的手机号码',
                        icon: 'none'
                    });
                    return;
                }
                if (this.flag == true) {
                    if (!/(^1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.boss)) {
                        uni.showToast({
                            title: '请输入正确的推荐人手机号码',
                            icon: 'none'
                        });
                        return;
                    }
                }

                let data = JSON.parse(this.item)
                data.phone = this.phoneNum
                data.verification = this.code
                data.referrer = this.user_id
                data.registration_id = this.cid
                console.log(data)
                this.request({
                    url: 'ShptUapi/public/index.php/login/binding',
                    data: data
                }).then(res => {
                    console.log(res)
                    if (res.data.status == 200) {

                        // uni.setStorageSync('token', res.result.token);
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
                        uni.reLaunch({
                            url: '../../index/index'
                        });

                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        });
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
                width: 100%;
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
        // width: 690rpx;
        // height: 90rpx;
        margin: 35rpx 30rpx 0;
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

        .xbtn-blue {
            margin: 140rpx 30rpx 0;
            text-align: center;
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
