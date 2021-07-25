<template>
    <view>


        <u-navbar title="充值" title-color="#000000">
            <view class="slot-wrap" @click="history">
                充值记录
            </view>
        </u-navbar>

        <view class="title">选择充值金额</view>

        <scroll-view scroll-y="true" class="money">
            <view :class="selected==index?'itemTitle':'itemTitleCustom'" @click="selTip(index)"
                v-for="(item,index) in  list" :key="index">
                <view>{{item.pay_money?$returnFloat(item.pay_money):""}} 元</view>
            </view>
        </scroll-view>
        <view style="width: 100%;height: 20rpx;background-color: #F5F5F5;"></view>

        <view class="title">支付方式</view>

        <radio-group @change="radioChange">
            <label style="display: flex;padding: 20rpx;justify-content: space-between;" v-for="(item, index) in items"
                :key="item.value">
                <view style="display: flex;">
                    <image :src="item.image" mode="" style="width: 44rpx;height: 44rpx;"></image>
                    <view style="margin-left: 20rpx;">{{item.name}}</view>
                </view>

                <view>
                    <radio :value="item.value" :checked="index === current" color="#F4483C" />
                </view>

            </label>
        </radio-group>

        <button class="button" @click="recharge()">立即充值</button>


    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 默认选中
                selected: 0,
                list: [],
                is_weChat: true,
                is_ali: true,
                items: [],
                current: 0,
                type: 1,
                rule_index: "",
                money: "0.00"
            }
        },
        onLoad() {
            let self = this;
            self.request({
                url: 'ShptUapi/public/index.php/user/recharge_set',
                data: {}
            }).then(res => {
                console.log(res)
                if (res.data.success) {
                    self.list = res.data.data
                    self.rule_index = self.list[0].rule_index
                    self.money = self.list[0].pay_money
                    console.log(self.rule_index)
                    
                    
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
            
            self.request({
                url:'ShptUapi/public/index.php/Order/payment',
                data:{}
            }).then(res => {
                if (res.data.success) {
                    self.is_weChat = res.data.data.wechat
                    self.is_ali = res.data.data.alipay
                    if (self.is_weChat) {
                        let cell = {
                            value: '1',
                            name: '微信支付',
                            image: "../../../static/weChatPay.png"
                        };
                        self.items.push(cell);
                    }
                    if (self.is_ali) {
                        let cell = {
                            value: '2',
                            name: '支付宝支付',
                            image: "../../../static/zfb.png"
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
        methods: {
            selTip(e) {
                // console.log(13)
                this.selected = e
                this.rule_index = this.list[e].rule_index
                this.money = this.list[e].pay_money
            },
            radioChange: function(evt) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].value === evt.detail.value) {
                        this.current = i;
                        this.type = evt.detail.value;
                        break;
                    }
                }
            },
            recharge() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/PayController/consumption_recharge',
                    data: {
                        type: self.type,
                        rule_index: self.rule_index
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {

                        let provider = "wxpay"
                        if (self.type == "2") {
                            provider = "alipay"
                        }
                        uni.requestPayment({
                            "provider": provider,
                            "orderInfo": {
                                "appid": res.data.data.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
                                "noncestr": res.data.data.nonce_str, // 随机字符串
                                "package": res.data.data.package, // 固定值
                                "partnerid": res.data.data.partnerid, // 微信支付商户号
                                "prepayid": res.data.data.prepay_id, // 统一下单订单号 
                                "timestamp": res.data.data.timestamp, // 时间戳（单位：秒）
                                "sign": res.data.data.app_sign // 签名，这里用的 MD5 签名
                            },
                            success(res) {
                                console.log(res)
                                let success = res.channel.serviceReady
                                if (success) {
                                    uni.redirectTo({
                                        url: "../myCash/withdrawalSuccess?isRecharge=1&money=" +
                                            self.$returnFloat(self.money)
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
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })



            },
            history() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: 'rechargeDetail'
                    })
                } else {
                    uni.showToast({
                        title: "请登录后操作",
                        icon: 'none'
                    })

                    setTimeout(() => {
                        uni.navigateTo({
                            url: '../../login/welcome/welcome'
                        })
                    }, 2500)
                }
            }
        }
    }
</script>

<style lang="scss">
    .slot-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 530rpx;
        width: 150rpx;
        color: #FC5957;
    }

    .title {
        padding-top: 20rpx;
        padding-left: 20rpx;
    }

    .money {
        padding: 10rpx;
        max-height: 400rpx;
        width: 100%;
        // background-color: #FF0000;
        display: flex;
        justify-content: space-between;


        .itemTitle {
            display: inline-block;
            height: 113rpx;
            line-height: 113rpx;
            color: #FFFFFF;
            width: 29.6%;
            text-align: center;
            background-color: #FC5957;
            margin: 10rpx;
            border-radius: 10rpx;
        }

        .itemTitleCustom {
            display: inline-block;
            height: 113rpx;
            line-height: 113rpx;
            color: #333333;
            width: 29.6%;
            text-align: center;
            background-color: #FFFFFF;
            margin: 10rpx;
            border: 1px solid #FC5957;
            border-radius: 10rpx;
        }
    }

    .button {
        /* width: 690rpx; */
        height: 90rpx;
        background: #FD635E;
        border-radius: 45rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 90rpx;
        text-align: center;
        position: fixed;
        bottom: 60rpx;
        left: 30rpx;
        right: 30rpx;
    }
</style>
