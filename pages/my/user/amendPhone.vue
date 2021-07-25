<!-- 修改手机号 -->
<template>
    <view>
        <view class="tac">
            <view>当前绑定手机号</view>
            <view style="font-size: 42rpx; margin-top: 40rpx;">{{phone}}</view>
        </view>
        <view class="hang">
            <view class="left">+86<image src="../../../static/up_choose.png"
                    style="width: 14rpx; height: 9rpx; margin-left: 10rpx;"></image>
            </view>
            <view class="line"></view>
            <view class="right">
                <input maxlength='11' type="number" placeholder="请输入新手机号" :value="value1" @input="getPhone" />
            </view>
        </view>
        <view class="hang">
            <view class="left">
                <image src="../../../static/yanzheng2.png" style="margin-left: 30rpx; margin-right: 60rpx;"></image>
            </view>
            <view class="line"></view>
            <view class="right">
                <input type="number" placeholder="请输入验证码" :value="value2" @input="getSum" />
                <view class="yanzheng" v-if="showtext==true" @click="yanzheng">获取验证码</view>
                <view class="yanzheng" v-else>{{second}}s重新发送</view>
            </view>
        </view>
        <view class="btn" @click="getbound()">确认更改手机号</view>
        <view class="text">修改手机号后，绑定的手机号已更换</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                value1: '', //新手机号
                value2: '', //验证码
                second: 60, //倒计时秒数
                showtext: true,
                phone: '', //原手机号
            }
        },
        methods: {
            // 绑定手机号
            getPhone(e) {
                this.value1 = e.detail.value
            },
            // 验证码
            getSum(e) {
                this.value2 = e.detail.value
            },
            // 倒计时
            getcode() {
                this.showtext = false
                var interval = setInterval(() => {
                    let times = --this.second
                    this.second = times < 10 ? '0' + times : times //小于10秒补0
                }, 1000)
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

                } else {
                    if (self.$token()) {
                        var reg = /^1[3456789]\d{9}$/;
                        if (!reg.test(self.value1)) {
                            uni.showToast({
                                title: "请输入正确的手机号",
                                icon: 'none'
                            })
                            return;
                        }

                        self.request({
                            url: 'ShptUapi/public/index.php/login/verification_code',
                            data: {
                                phone: self.value1,
                                verification_type: 4
                            }
                        }).then(res => {

                            if (res.data.success) {

                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                                self.getcode() //倒计时
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            }
                        }, rej => {
                            console.log(rej);
                        })
                    }
                }
            },
            // 绑定
            getbound() {
                let self = this
                if (uni.getStorageSync('token')) {
                    if (self.value1 == '') {

                        uni.showToast({
                            title: '请输入手机号',
                            icon: 'none'
                        })
                    } else if (self.value2 == '') {

                        uni.showToast({
                            title: '请输入验证码',
                            icon: 'none'
                        })
                    } else {
                        console.log(self.$device())
                        console.log(self.$token())
                        console.log(self.value1)
                        console.log(self.value2)
                        self.request({
                            url: 'ShptUapi/public/index.php/user/user_phone_save',
                            data: {
                                device: self.$device(),
                                phone: self.value1,
                                verification: self.value2
                            }
                        }).then(res => {
                            console.log(res)
                            if (res.data.success) {
                                
                                uni.setStorage({
                                    key: 'phone',
                                    data:  self.value1,
                                    success: function() {
                                        console.log('success phone', self.value1);
                                        // console.log(this.$token())
                                    }
                                });
                                
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                                setTimeout(() => {
                                    uni.navigateBack({
                                        delta: 1,
                                    })
                                }, 200)
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            }
                        }, rej => {
                            console.log(rej);
                        })
                    }
                }
            },
        },
        onLoad(options) {
            this.phone = options.phone
            // this.phone='12312312312'
            var reg = /^(\d{3})\d{4}(\d{4})$/
            if (this.phone) {
                this.phone = this.phone.replace(reg, '$1****$2') //刚进来报错是因为phone没有值
            }
            // console.log(this.phone);
        }
    }
</script>

<style>
    page {
        background-color: #F5F5F5;
    }

    .tac {
        text-align: center;
        margin-top: 150rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
    }

    .hang {
        width: 640rpx;
        height: 100rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        line-height: 100rpx;
        text-align: center;
        display: flex;
        margin: 55rpx;
        padding: 0 20rpx 0 30rpx;
        box-sizing: border-box;
        position: relative;
    }

    .hang .left {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FD635E;
    }

    .hang .left image {
        width: 36rpx;
        height: 36rpx;
        vertical-align: middle;
        margin-right: 40rpx;
    }

    .hang input {
        width: 400rpx;
        height: 100rpx;
        padding-top: 30rpx;
        padding-bottom: 30rpx;
        background: #FFFFFF;
        text-align: left;
        padding-left: 30rpx;
        box-sizing: border-box;
    }

    .hang .line {
        width: 2rpx;
        height: 60rpx;
        background: #F5F5F5;
        margin-top: 20rpx;
    }

    .right .yanzheng {
        width: 162rpx;
        height: 42rpx;
        background: #FFFFFF;
        border: 1rpx solid #ED5736;
        border-radius: 21rpx;
        text-align: center;
        line-height: 42rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FD635E;
        position: absolute;
        right: 10rpx;
        top: 50%;
        transform: translateY(-50%);
    }

    .btn {
        width: 640rpx;
        height: 90rpx;
        background: #FD635E;
        border-radius: 45rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 36rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        margin: 200rpx 55rpx 30rpx;
    }

    .text {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        text-align: center;
    }
</style>
