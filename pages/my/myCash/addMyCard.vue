<template>
    <view style="height:100%">
        <view class="pages">
            <view style="padding: 0 30rpx;" class="bindCard">
                <view class="content">
                    <view class="">请选择开户行</view>
                    <view class="">
                        <u-select v-model="bankListShow" :list="bankList" value-name="id" label-name="bank_name"
                            @confirm="sureButton"></u-select>
                        <input type="text" placeholder="请选择 >" v-model="bankListLabel" @click="openList"
                            disabled="none">
                    </view>
                </view>
                <view class="content">
                    <view class="">开户人姓名</view>
                    <view class="">
                        <input type="text" value="" placeholder="请输入开户人姓名" v-model="getName" />
                    </view>
                </view>
                <view class="content">
                    <view class="">银行卡账号</view>
                    <view class="">
                        <input type="number" value="" placeholder="请输入银行卡账号" v-model="getNum" />
                    </view>
                </view>
                <view class="content">
                    <view class="">确认银行卡账号</view>
                    <view class="">
                        <input type="number" value="" placeholder="请再次输入银行卡账号" v-model="getNum1" />
                    </view>
                </view>
            </view>
            <view class="sureBind" @click="confirm">
                立即绑定
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                bankList: {},
                bankListShow: false,
                bankListValue: "",
                getName: "",
                getNum: "",
                getNum1: "",
                bankListLabel: "",
                cash: "",
                status:""
            }
        },
        onLoad(e) {
            this.cash = e.cash
            this.status = e.status
            let self = this;
            self.request({
                url: 'ShptUapi/public/index.php/Bank/bank_list',
                data: {}
            }).then(res => {
                if (res.data.success) {
                    console.log(res.data.data)
                    this.bankList = res.data.data
                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })

        },
        methods: {
            sureButton(e) {
                this.bankListLabel = e[0].label
                this.bankListValue = e[0].value
            },
            openList() {
                console.log(111)
                this.bankListShow = true
            },
            confirm() {
                if (this.bankListLabel == "") {
                    uni.showToast({
                        title: "请选择开户行",
                        icon: "none"
                    })
                } else if (this.getName == "") {
                    uni.showToast({
                        title: "请输入开户人姓名",
                        icon: "none"
                    })
                } else if (this.getNum == "") {
                    uni.showToast({
                        title: "请输入银行卡账号",
                        icon: "none"
                    })
                } else if (this.getNum1 == "") {
                    uni.showToast({
                        title: "请输入确认银行卡账号",
                        icon: "none"
                    })
                } else if (this.getNum != this.getNum1) {
                    uni.showToast({
                        title: "两次银行卡账号输入不一致,请确认",
                        icon: "none"
                    })
                } else {

                    let self = this;
                    self.request({
                        url: 'ShptUapi/public/index.php/UserBind/bind_bank',
                        data: {
                            bank_id: this.bankListValue,
                            card_bank: this.bankListLabel,
                            card_holder: this.getName,
                            card_number: this.getNum,
                            card_number_true: this.getNum1
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.success) {
                            uni.redirectTo({
                                url: "withdrawal?cash=" + this.cash + '&bank=1' + '&status=' + this.status
                            })
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    })
                }

            },
        }
    }
</script>

<style>
    page {
        background-color: #F5F5F5;
    }
</style>
<style lang="scss">
    page {
        height: 100%;
    }

    .pages {
        background-color: #f5f5f5;
    }

    .pages1 {
        width: 100%;
        height: 100%;
        background-color: #333333;
        padding-top: 30rpx;
        box-sizing: border-box;
    }

    .bindCard {
        background-color: #fff;
    }

    .content {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);

        input {
            text-align: right;
        }

        image {
            width: 17rpx;
            height: 32rpx;
            vertical-align: middle;
            margin-left: 20rpx;
        }
    }

    .sureBind {
        width: 690rpx;
        height: 90rpx;
        background: linear-gradient(-47deg, #FD635E, #FD635E);
        border-radius: 20rpx;
        margin: 285rpx 30rpx 0 30rpx;
        line-height: 90rpx;
        text-align: center;
        color: #fff;
        font-size: 30rpx;
    }

    .chooseModel {
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 22;

        .showModel {
            width: 100%;
            height: 700rpx;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 111111;
            background-color: #fff;
            border-radius: 10rpx 0 0 10rpx;

            picker-view {
                width: 100%;
                height: 600rpx;
            }

            .item {
                line-height: 34px;
                text-align: center;
            }

            .btns {
                display: flex;

                view {
                    width: 50%;
                    height: 100rpx;
                    line-height: 100rpx;
                    text-align: center;
                }
            }

            .sure {
                border-right: 1rpx solid #f5f5f5;
            }
        }
    }

    .cardMsg {
        width: 690rpx;
        height: 204rpx;
        background: #FFFFFF;
        border-radius: 15rpx;
        margin: 0 30rpx;
        display: flex;
        padding-top: 38rpx;
        box-sizing: border-box;

        image {
            width: 66rpx;
            height: 66rpx;
            margin: 0 20rpx 0 80rpx;
        }

        .card_name {
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        .card_type {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999;
            margin: 5rpx 0 10rpx;
        }

        .card_num {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }
    }

    .link {
        text-align: center;
        margin-top: 100rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF !important;
        border: none !important;
    }
</style>
