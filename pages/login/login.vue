<template>
    <view class="main">

        <view class="content">
            <view class="top">
                欢迎登录
            </view>
            <view class="mid" :class="{ishidden:!issend}">
                验证码已发送到{{phoneNum |handleNum}}
                <view>请查收短信验证码</view>
            </view>
            <view class="btm">
                <view class="img">
                    <image src="../../static/dun1.png" mode="aspectFill"></image>
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
        </view>
        <view class="btn" @click="login">
            <!-- <image src="../../static/login.png" mode=""></image> -->
            <!-- <view class="xbtn-blue"> -->
            登录
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
                cid:''
            };
        },
        onLoad(e) {
            if (e) {
                console.log(e.phoneNum);
                this.phoneNum = e.phoneNum;
                
                this.cid = uni.getStorageSync("cid");
            }
            this.tosend();
        },
        methods: {
            tosend() {
                this.request({
                    url: 'ShptUapi/public/index.php/login/verification_code',
                    data: {
                        phone: this.phoneNum,
                        verification_type: "2"
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
            },
            login() {
                let self = this;
                if (self.code == "") {
                    uni.showToast({
                        title: "请输入验证码",
                        icon: "none"
                    })
                } else {
                    console.log(self.$device())
                    console.log(self.cid)
                    self.request({
                        url: 'ShptUapi/public/index.php/login/do_login',
                        data: {
                            phone: self.phoneNum,
                            verification: self.code,
                            device: self.$device(),
                            registration_id: self.cid
                            
                        }
                    }).then(res => {
                        console.log(res)
                        if (!res.data.success) {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        } else {
                            
                            
                            if (res.data.status == 200) {
                                console.log(res.data.data.token)
                                // uni.setStorage('token', res.data.data.token);
                                
                                uni.setStorage({
                                    key: 'token',
                                    data:  res.data.data.token,
                                    success: function() {
                                        console.log('success', res.data.data.token);
                                        // console.log(this.$token())
                                    }
                                });
                                uni.setStorage({
                                    key: 'phone',
                                    data:  self.phoneNum,
                                    success: function() {
                                        console.log('success', self.phoneNum);
                                        // console.log(this.$token())
                                    }
                                });
                                
                                uni.reLaunch({
                                    url: '../index/index'
                                });
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                })
                            }
                        }

                    });


                }

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
            margin-top: 159rpx;


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
        margin: 140rpx 30rpx 0;


        width: 690rpx;
        height: 90rpx;
        background-color: #FD635E;
        color: #FFFFFF;
        text-align: center;
        line-height: 90rpx;
        font-size: 36rpx;
        border-radius: 45rpx;

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
