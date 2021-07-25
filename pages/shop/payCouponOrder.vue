<template>
    <view>
        <view class="text1">
            支付金额
        </view>
        <view class="text2" >
            积分：{{$returnFloat(order_integral)}}
        </view>
        <view class="line20"></view>
        <view class="scorePay-box">
            <view class="left">
                <image src="../../static/exchangePayIcon.png" style="width: 44rpx;height: 44rpx;margin-right: 20rpx;"
                    mode="">
                </image>
                <view class="text">
                    <view class="">积分支付</view>
                    <view class="">我的积分：{{$returnFloat(integral)}}</view>
                </view>
            </view>

            <view class="right">
                <image src="../../static/payChoice.png" mode="" style="width: 38rpx;height: 38rpx;"></image>
            </view>
        </view>

        <view class="confirmPay" @click="confirmPay">
            确认支付
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                integral: '0', //我的积分
                // order_id: "", //订单号
                order_index: "", //订单ID
                order_integral: "0", //订单积分
            }
        },
        methods: {
            // 确认支付（获取支付信息）
            init() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/personal_v2',
                    data: {}
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.integral = res.data.data.userinfo.user_integral;

                        
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 确认支付
            confirmPay() {
                let self = this;

                self.request({
                    url: 'ShptUapi/public/index.php/PayController/integral_pay_v2',
                    data: {
                        order_index: self.order_index,
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {

                        uni.redirectTo({
                            url: "successPay?orderType=2&order_integral=" + self.order_integral + "&order_index=" + self.order_index
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
        onShow() {},
        onLoad(option) {
            this.order_index = option.order_index;
            this.order_integral = option.order_integral;
            console.log(option)
            this.init();
        }
    };
</script>

<style lang="scss" scoped>
    .text1 {
        padding-top: 67rpx;
        margin-bottom: 30rpx;
        font-size: 30rpx;
        text-align: center;
    }

    .text2 {
        font-size: 50rpx;
        font-weight: bold;
        color: #333333;
        text-align: center;
    }

    .text4 {
        width: 600rpx;
        height: 90rpx;
        background: #F5F5F5;
        border-radius: 4rpx;
        font-size: 26rpx;
        color: #666666;
        line-height: 90rpx;
        text-align: center;
        margin: 0 auto;
        margin-top: 39rpx;
        margin-bottom: 74rpx;
    }

    .confirmPay {
        position: fixed;
        bottom: 30rpx;
        left: 30rpx;
        width: 690rpx;
        height: 90rpx;
        background: #F6281B;
        border-radius: 45rpx;
        text-align: center;
        line-height: 90rpx;
        color: #FFFFFF;
        // margin: 0 auto;
        // position: absolute;
        // bottom: 40rpx;
        // left: 50%;
        // margin-left: -345rpx;
    }

    .line20 {
        width: 750rpx;
        height: 20rpx;
        background: #F5F5F5;
    }

    .scorePay-box {
        height: 100rpx;
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;

        .left {
            margin-left: 30rpx;
            font-size: 13px;
            color: #333333;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: start;
            -webkit-justify-content: flex-start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
        }

        .right {
            margin-right: 30rpx;
        }

    }
</style>
