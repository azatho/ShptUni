<!-- 余额转赠 -->
<template>
    <view style="height:100%">
        <view class="pages">
            <view style="padding: 0 30rpx;" class="bindCard">


                <view class="">
                    <view class="content" style="font-size: 30rpx;font-weight: 500;border-bottom: 0px solid rgba(245, 245, 245, 1);">转赠积分</view>
                    <view class="content">
                        <input type="number" value="" placeholder="请输入积分数量" v-model="getNum"  />
                    </view>
                </view>
            </view>

            <view
                style="display: flex;margin-top: 15rpx;padding: 30rpx ;font-size: 26rpx;font-family: PingFang SC;font-weight: 500;"
                class="bindCard">
                <view>转赠账户</view>
                <!-- <input style="margin-left: 30rpx; font-size: 26rpx;" type="number" value="" placeholder="请输入对方手机号"
                    v-model="getPhone" /> -->
                <input style="margin-left: 30rpx; font-size: 26rpx;width: 70%;" type="number" value="" maxlength="11"
                    v-model="phone" placeholder="请输入对方手机号 (必填)" @input="change"
                    placeholder-style="color:#999999;font-size: 26rpx;" />
            </view>

            <!-- 会员信息 -->
            <view class="vipInfor" v-if="show">
                <view class="vipHead">
                    会员信息：
                </view>
                <view class="vipItem">
                    <view class="vipImg">
                        <image :src=$cdnUrl+photo mode=""></image>
                    </view>
                    <view class="vipText">
                        <view class="">
                            {{name}}
                        </view>
                        <view class="">
                            {{phone}}
                        </view>
                    </view>
                </view>
            </view>
            <!-- <view class="none" v-else>
            </view> -->

            <view class="sureBind" @click="confirm">
                确认转赠
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				userNumber:0,//用户积分余额
                // enableEdit: true,
                show: false,
                getNum: "",
                phone: "",
                photo: "",
                name: "",
                user_id: "",
                items: [{
                        value: '1',
                        name: '账户余额'
                    },
                    {
                        value: '2',
                        name: '拼团本金'
                    },
                ],
                current: 0,
                type: "1",
                turn_amount: 0,
                // 默认选中金额
                selected: 0,
                money: "0.00",
                list: [],
            }
        },
        onLoad(e) {
            this.turn_amount = e.turn_amount
            let self = this;
            self.request({
                url: 'ShptUapi/public/index.php/UserConsumers/personal_v2',

            }).then(res => {
                if (res.data.success) {
                    self.userNumber=res.data.data.userinfo.user_integral
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
                this.getNum = this.list[e].pay_money
            },
            radioChange: function(evt) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].value === evt.detail.value) {
                        this.current = i;
                        this.type = evt.detail.value;
                        break;
                    }
                }

                if (this.current == 1) {
                    this.getNum = this.list[0].pay_money
                    // this.enableEdit = true
                } else {
                    this.getNum = ""
                    // this.enableEdit = false
                }
            },
            
            change() {
                let self = this;
                if (self.phone.length == 11) {
                    self.request({
                        url: 'ShptUapi/public/index.php/login/recommend',
                        data: {
                            phone: self.phone,
                        }
                    }).then(res => {
                        if (res.data.success) {
                            self.show = true
                            self.name = res.data.data.name
                            self.photo = res.data.data.photo
                            self.user_id = res.data.data.user_id
                            self.phone = res.data.data.phone
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    })
                }
            },
            confirm() {
                let self = this;
                if (self.getNum.length == 0) {
                    uni.showToast({
                        title: "请输入转账金额",
                        icon: 'none'
                    })
                    return
                }
                if (self.phone.length < 11) {
                    uni.showToast({
                        title: "请输入转赠账户信息",
                        icon: 'none'
                    })
                    return
                }
				if (self.userNumber/100 < self.getNum) {
				    uni.showToast({
				        title: "积分不足",
				        icon: 'none'
				    })
				    return
				}
                let getnum = self.getNum * 100
                
                self.request({
                    url: 'ShptUapi/public/index.php//user/integral_give',
                    data: {
                        give_integral: getnum ,
                        user_id: self.user_id
                    }
                }).then(res => {
                    if (res.data.success) {
                        uni.navigateTo({
                            url: "../myCash/withdrawalSuccess?giveCash=2"
                        })
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            }
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

        .money {
            padding: 10rpx;
            max-height: 400rpx;
            width: 100%;
            // background-color: #FF0000;
            display: flex;
            justify-content: space-between;


            .itemTitle {
                display: inline-block;
                height: 60rpx;
                line-height: 60rpx;
                color: #F6281B;
                width: 29.6%;
                text-align: center;
                background-color: #FEDFDD;
                margin: 10rpx;
                border-radius: 10rpx;
                font-size: 26rpx;
            }

            .itemTitleCustom {
                display: inline-block;
                height: 60rpx;
                line-height: 60rpx;
                color: #999999;
                width: 29.6%;
                text-align: center;
                background-color: #F0F0F0;
                margin: 10rpx;
                // border: 1px solid #FC5957;
                border-radius: 10rpx;
                font-size: 26rpx;
            }
        }
    }

    .content {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid rgba(245, 245, 245, 1);
        height: 45rpx;
        line-height: 45rpx;
        
        input {
            text-align: left;
            font-size: 30rpx;
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
        margin: 185rpx 30rpx 0 30rpx;
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


    //会员信息
    .vipInfor {
        padding: 10rpx 25rpx;

        .vipHead {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        .vipItem {
            margin-top: 10rpx;
            display: flex;

            .vipImg {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                overflow: hidden;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .vipText {
                padding-left: 15rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;
            }
        }
    }

    // .none {
    //     height: 80rpx;
    //     line-height: 80rpx;
    //     padding-left: 15rpx;
    //     color: #666666;
    // }

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
