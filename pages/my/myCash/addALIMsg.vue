<template>
    <view style="height:100%">
        <view class="pages">
            <view style="padding: 0 30rpx;" class="bindCard">

                <view class="content">
                    <view class="">支付宝账号</view>
                    <view class="">
                        <input type="text" value="" placeholder="请输入支付宝账号" v-model="getNum" />
                    </view>
                </view>

                <view class="content">
                    <view class="">真实姓名</view>
                    <view class="">
                        <input type="text" value="" placeholder="请输入真实姓名" v-model="getName" />
                    </view>
                </view>

            </view>
            <view class="sureBind" @click="confirm">
                绑定
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                getName: "",
                getNum: "",
                cash: "",
                status:""
            }
        },
        onLoad(e) {
            this.cash = e.cash
            this.status = e.status
        },
        methods: {
            confirm() {
                if (this.getNum == "") {
                    uni.showToast({
                        title: "请输入提现账号",
                        icon: "none"
                    })
                } else if (this.getName == "") {
                    uni.showToast({
                        title: "请输入真实姓名",
                        icon: "none"
                    })
                } else {
                    let self = this;
                    self.request({
                        url: 'ShptUapi/public/index.php/UserBind/bind_alipay',
                        data: {
                            phone: self.getNum,
                            real_name: self.getName
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.success) {
                            uni.redirectTo({

                                url: "withdrawal?cash=" + self.cash + '&ali=1' + '&status=' + this.status
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
