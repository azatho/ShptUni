<!-- 余额转赠 -->
<template>
    <view style="height:100%">
        <view class="pages">
            <view style="padding: 0 30rpx;" class="bindCard">

                <view class="content">
                    <view>选择转赠到账类型</view>
                    <view>
                        <radio-group @change="radioChange" style="display: flex;">
                            <label style="display: flex;margin-right: 20rpx;" v-for="(item, index) in items"
                                :key="item.value">
                                <view style="height: 45rpx;line-height: 45rpx;">
                                    <radio :value="item.value" :checked="index === current" color="#F4483C" style="transform:scale(0.7)" />
                                </view>
                                <view style="height: 45rpx;line-height: 50rpx;">{{item.name}}</view>
                            </label>
                        </radio-group>
                    </view>
                </view>

                <view class="" v-if="current==0">
                    <view class="content" style="font-size: 30rpx;font-weight: 500;border-bottom: 0px solid rgba(245, 245, 245, 1);">转赠金额</view>
                    <view class="content">
                        <input type="number" value="" placeholder="请输入转账金额" v-model="getNum"  />
                    </view>
                </view>

                <view style="display: flex;flex-direction: column;" v-else>
                    <view style="font-size: 30rpx;margin-top: 20rpx;margin-bottom: 20rpx;width: 189px;font-family: PingFang SC;font-weight: 500;color: #333333;">
                        请选择转赠金额：
                    </view>
                    
                    <scroll-view scroll-y="true" class="money">
                        <view :class="selected==index?'itemTitle':'itemTitleCustom'" @click="selTip(index)"
                            v-for="(item,index) in  list" :key="index">
                            <view style="position: relative;">
                                <view class="">
                                    {{item.pay_money?$returnFloat(item.pay_money):""}} 元
                                </view>
                                <image src="../../../static/selected.png"
                                    style="width: 44rpx;height: 44rpx;bottom: 0rpx;right: 0rpx;position: absolute;" mode="" v-if="selected==index">
                                </image>
                            </view>
                        </view>
                    </scroll-view>
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
                url: 'ShptUapi/public/index.php/user/recharge_set',
                data: {
                    type:"1"
                }
            }).then(res => {
                console.log(res)
                if (res.data.success) {
                    self.list = res.data.data
                    // self.rule_index = self.list[0].rule_index
                    // self.getNum = self.list[0].pay_money
                    console.log(self.rule_index)
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
                // 13623809237
                // if (self.type == 2) {
                //     console.log(self.turn_amount,self.getNum)
                //     if (self.turn_amount < self.getNum) {
                //         uni.showToast({
                //             title: "拼团本金限制转赠金额最大为" + self.$returnFloat(self.turn_amount) + '元',
                //             icon: 'none'
                //         })
                //         return
                //     }
                // }
                let getNum1=self.getNum;
                if (self.type==1) {
                    // 余额需要元转分
                   getNum1 = self.getNum * 100
                }
                
                self.request({
                    url: 'ShptUapi/public/index.php/UserExtract/cash_transfer',
                    data: {
                        money: getNum1 ,
                        type: self.type,
                        user_id: self.user_id
                    }
                }).then(res => {
                    if (res.data.success) {
                        uni.navigateTo({
                            url: "withdrawalSuccess?giveCash=1"
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
