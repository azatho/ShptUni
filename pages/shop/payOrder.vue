<template>
    <view>
        <view class="text1">
            支付金额
        </view>
        <view class="text2" v-if="price!=0">
            &nbsp;&nbsp;￥{{$returnFloat(price)}}
        </view>
        <view class="line20"></view>
        <view class="scorePay-box" v-if="is_cash">
            <view class="left">
                <image src="../../static/golds.png" style="width: 44rpx;height: 44rpx;margin-right: 20rpx;" mode="">
                </image>
                <view class="text">
                    <view class="">余额支付</view>
                    <view class="">我的余额：{{$returnFloat(cash)}}</view>
                </view>
            </view>

            <view class="right">
                <image src="../../static/payChoice.png" mode="" style="width: 48rpx;height: 48rpx;"></image>
            </view>
        </view>
        <view class="line20"></view>
        <radio-group>
            <label style="display: flex;padding: 20rpx;justify-content: space-between;" v-for="(item, index) in items"
                :key="index">
                <view style="display: flex;">
                    <image :src="item.image" mode="" style="width: 44rpx;height: 44rpx;"></image>
                    <view style="margin-left: 20rpx;">{{item.name}}</view>
                </view>

                <!-- <view> -->
                    <radio :value="item.value" :disabled="selected" :checked="index === current" color="#FF6351" @click="radioChange(index)" />
                <!-- </view> -->

            </label>
        </radio-group>
        <view class="confirmPay" @click="confirmPay">
            确认支付
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                is_cash: true,
                is_weChat: true,
                is_ali: true,
                type: "0",
                cash: '0', //我的余额
                order_id: "", //订单号
                order_index: "", //订单ID
                price: "", //订单价钱
                payInfo: {}, //提交订单返回的结果
                cart_index: '', //购物车提交订单时cart_index
                items: [],
                current: 3,
                selected: true //能否选择支付方式
            }
        },
        methods: {
            // 确认支付（获取支付信息）
            init() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Order/toPay',
                    data: {
                        order_index: self.cart_index
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.price = res.data.data.total_price;
                        self.cash = res.data.data.cash

                        let num = self.cash - self.price;
                        if (num < 0) {
                            self.current = 0;
                            self.type = "1";
                            self.selected = false;
                        } else {
                            self.selected = true;
                        }
                        self.is_cash = res.data.data.is_yepay
                        self.is_weChat = res.data.data.is_wxpay
                        self.is_ali = res.data.data.is_alpay
                        if (self.is_weChat) {
                            let cell = {
                                value: '1',
                                name: '微信支付',
                                image: "../../static/weChatPay.png"
                            };
                            self.items.push(cell);
                        }
                        if (self.is_ali) {
                            let cell = {
                                value: '2',
                                name: '支付宝支付',
                                image: "../../static/zfb.png"
                            };
                            self.items.push(cell);
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 选择支付方式
            radioChange(e){
                if (this.selected == true) {
                    return
                }
              this.current=e
			  this.type=this.items[e].value
            },
            // 确认支付
            confirmPay() {
                let self = this;
                
                // uni.getProvider({
                //     service: 'payment',
                //     success: function (res) {
                //         console.log(res.provider)
                //         // if (~res.provider.indexOf('qq')) {
                //         //     uni.login({
                //         //         provider: 'qq',
                //         //         success: function (loginRes) {
                //         //             console.log(JSON.stringify(loginRes));
                //         //         }
                //         //     });
                //         // }
                //     }
                // });
                
                
                
                self.request({
                    url: 'ShptUapi/public/index.php/PayController/payOrder',
                    data: {
                        order_index: self.cart_index,
                        type: self.type
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        let provider = "wxpay"
                        if (self.type == "0") {
                            uni.redirectTo({
                                url: "successPay?order_total_price=" + self.price+"&order_index=" +self.cart_index
                            })
                        }  else {
                            let orderInfo = {
                                    "appid": res.data.data.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
                                    "noncestr": res.data.data.nonce_str, // 随机字符串
                                    "package": res.data.data.package, // 固定值
                                    "partnerid": res.data.data.partnerid, // 微信支付商户号
                                    "prepayid": res.data.data.prepay_id, // 统一下单订单号 
                                    "timestamp": res.data.data.timestamp, // 时间戳（单位：秒）
                                    "sign": res.data.data.app_sign // 签名，这里用的 MD5 签名
                                }
                            
                            if (self.type == "2") {
                                provider = "alipay"
                                orderInfo = res.data.data
                            }  
                            console.log(orderInfo)
                            uni.requestPayment({
                                "provider": provider,
                                "orderInfo": orderInfo,
                                success(res) {
                                    let success = res.channel.serviceReady
                                    if (success) {
                                        uni.redirectTo({
                                            url: "successPay?order_total_price=" + self.price+"&order_index=" +self.cart_index
                                        })
                                    }
                                },
                                fail(e) {
                                    console.log(e)
                                    uni.showToast({
                                        title: '支付失败',
                                        icon: 'none'
                                    })
                                }
                            })
                        } 
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
            this.cart_index = option.order_index;
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
