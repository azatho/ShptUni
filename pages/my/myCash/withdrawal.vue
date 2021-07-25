<!-- 提现页面 -->
<template>
    <view class="">
        <view class="cardMsg">
            <view class="card_img" style="display: flex;justify-content: center;align-items: center;">
                <image :src="$imgUrl(cardMsg.logo)" mode="" style="border-radius: 34rpx;width: 68rpx;height: 68rpx;"
                    v-if="statusStyle==3"></image>
                <image src="../../../static/weChatPay.png" v-else-if="statusStyle==1" mode=""
                    style="border-radius: 34rpx;width: 68rpx;height: 68rpx;"></image>
                <image src="../../../static/zfb.png" v-else mode=""
                    style="border-radius: 34rpx;width: 68rpx;height: 68rpx;"></image>
            </view>
            <view>
                <!-- 银行卡信息 -->
                <view class="card_msg" v-if="statusStyle==3">
                    <view class="card_num">
                        {{handleNum(cardMsg.card_number)}}
                    </view>
                    <view class="card_name">
                        {{cardMsg.card_holder}}
                    </view>
                </view>
                <!-- 微信信息 -->
                <view class="card_msg" v-else-if="statusStyle==1">
                    <view class="card_num">{{cardMsg.wechat_name}}</view>
                </view>
                <!-- 支付宝信息 -->
                <view class="card_msg" v-else>
                    <view class="card_num">
                        {{handlePhone(cardMsg.alipay_number)}}
                    </view>
                    <view class="card_name">
                        {{cardMsg.real_name}}
                    </view>
                </view>
            </view>
            <view class="card_choose" v-if="statusStyle!=1" @click="goChangeBankCard">
                <image src="../../../static/right_white.png" mode="" style="height: 27rpx;width: 15rpx;color: #ffffff;">
                </image>
            </view>
        </view>
        <view class="money">
            <view class="word">
                提现金额
            </view>
            <view class="ipt">
                <view class="money_mark">
                    ￥
                </view>
                <input type="number" placeholder="请输入提现金额" v-model="withdrawalMoney"
                    :class="withdrawalMoney!=''?'current':''" />
                <!-- <view class="" class="del_money" @click="delMoney">
                </view> -->
            </view>
            <view class="left_monry">
                可提现余额：{{$returnFloat(cash)}}
                <view class="all_money" @click="getAll">
                    全部提现
                </view>
            </view>
        </view>
        <view class="rule" v-if="ruleList.length > 0">
            <view>
                提现规则：
            </view>
            <view>
                <view v-for="(item,index) in ruleList" :key="index" style="margin-bottom: 20rpxs;">
                    {{item}}
                </view>
            </view>

        </view>
        <view class="sure" @click="confirm">
            确定提现
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                cdnUrl: '',
                cash: '',
                show: false,
                cardMsg: {},
                txcash: 0,
                show_style: '',
                token: "",
                withdrawalMoney: "",
                ruleList: [],

                statusStyle: "",
                //1用户余额 2拼团本金
                status: "1",
            };
        },
        methods: {
            goChangeBankCard() {
                console.log(this.statusStyle)
                if (this.statusStyle == 3) {
                    // 更换银行卡
                    uni.navigateTo({
                        url: "changeBankCard"
                    })
                } else {
                    // 更换支付宝
                    uni.navigateTo({
                        url: "addALIMsg?cash=" + this.cash
                    })
                }

            },
            confirm() {

                let self = this;
                
                console.log(self.withdrawalMoney * 100,
                        self.statusStyle,
                        self.status)
                
                self.request({
                    url: 'ShptUapi/public/index.php/UserExtract/apply_extract',
                    data: {
                        money: self.withdrawalMoney * 100,
                        type: self.statusStyle,
                        status: self.status
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        uni.navigateTo({
                            url: "withdrawalSuccess"
                        })
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })

            },
            // 点击全部提现将可提现余额值给Input框
            getAll() {
                this.withdrawalMoney = this.cash / 100
            },
            handleNum(p) {
                if (p) {
                    return p.substring(0, 4) + ' **** **** ' + p.substring(p.length - 4);
                }
            },
            handlePhone(phone) {
                if (phone) {
                   return phone.replace(/^(\d{3})\d{4}(\d+)/,'$1****$2');
                }
            }
        },
        onLoad(options) {
            console.log(options)

            this.cash = options.cash
            this.status = options.status
            console.log(this.status)
            if (options.weixin) {
                this.statusStyle = 1
            } else if (options.ali) {
                this.statusStyle = 2
            } else if (options.bank) {
                this.statusStyle = 3
            }

            let self = this;
            self.request({
                url: 'ShptUapi/public/index.php/user/user_money',
                data: {}
            }).then(res => {
                console.log(res)
                if (res.data.success) {
                    
                    self.cardMsg = res.data.data
                    console.log(self.cardMsg)
                    if (self.status == 1) {
                        self.ruleList = res.data.data.setting
                    } else {
                        self.ruleList = res.data.data.setting2
                    }
                    
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
        }
    };
</script>

<style>
    page {
        background-color: #f8f8f8;
    }

    .cardMsg {
        background: #555555;
        border-radius: 30rpx 30rpx 0rpx 0rpx;
        margin: 102rpx 54rpx 0;
        display: flex;
        align-items: center;
        padding: 45rpx;
    }

    .card_img {
        width: 78rpx;
        height: 78rpx;
        background-color: #FFFFFF;
        border-radius: 39rpx;
        text-align: center;
        /* line-height: 78rpx; */
    }

    /* .card_img image {
        width: 78rpx;
        height: 78rpx;
    } */

    .card_msg {
        width: 430rpx;
        padding-left: 20rpx;
        color: #fff;

    }

    .card_num {
        font-size: 26rpx;
    }

    .card_name {
        font-size: 24rpx;
        margin-top: 10rpx;
    }

    .card_choose {
        width: 40rpx;
        height: 40rpx;
    }

    .card_choose image {
        width: 40rpx;
        height: 40rpx;
    }

    .money {
        width: 100%;
        padding: 30rpx 30rpx 0 30rpx;
        height: 285rpx;
        background: #FFFFFF;
        box-shadow: 0px 5rpx 7rpx 0px rgba(0, 0, 0, 0.15);
        box-sizing: border-box;
    }

    .word {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .ipt {
        position: relative;
        padding: 0 80rpx 0 40rpx;
        margin-top: 40rpx;
        border-bottom: 1rpx solid #DFDFDF;
    }

    .money_mark {
        position: absolute;
        bottom: 10rpx;
        left: 0;
        font-size: 36rpx;
        font-family: HiraginoSansGB;
        font-weight: bold;
        color: #212121;
    }

    .ipt input {
        /* border-bottom: 1rpx solid #DFDFDF; */
        height: 80rpx;
        line-height: 80rpx;
    }

    .ipt .current {
        color: #333;
        font-size: 64rpx;
        font-weight: bold;
    }

    .del_money {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 80rpx;
        height: 80rpx;
    }

    .del_money image {
        width: 30rpx;
        height: 30rpx;
        margin: 25rpx;
    }

    .left_monry {
        height: 90rpx;
        line-height: 90rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        position: relative;
    }

    .all_money {
        position: absolute;
        top: 0;
        right: 0;
        height: 90rpx;
        line-height: 90rpx;
        padding-left: 40rpx;
        color: #FC4950;
        font-size: 24rpx;
    }

    .rule {
        /* width: 180rpx; */
        padding: 30rpx;
        display: flex;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
    }

    .rule_right {
        flex: 1;
        line-height: 40rpx;
    }

    .sure {
        width: 690rpx;
        height: 90rpx;
        background-color: #FD635E;
        border-radius: 45rpx;
        margin: 50rpx 30rpx 0;
        line-height: 90rpx;
        text-align: center;
        color: #fff;
        font-size: 30rpx;
    }
</style>
