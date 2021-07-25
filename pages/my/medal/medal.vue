<!-- 鸿运页面 -->
<template>
    <view>

        <u-navbar title="鸿运勋章奖励" back-icon-color="#ffffff" :border-bottom="false" title-color="#ffffff"
            :background="{backgroundColor:'#333333'}">
            <view class="slot-wrap" @click="rules">
                <image src="../../../static/rullrespon.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
            </view>
        </u-navbar>


        <view class="header">
            <view class="header_title">
                <view class="headerCustom">
                    <image src="../../../static/medal/medal_star.png" mode="" style="width: 100rpx;height: 100rpx;">
                    </image>

                    <view class="title">
                        <view class="top">
                            鸿运勋章
                        </view>
                        <view class="bottom">
                            抢中次数需满{{need_num}}次
                        </view>
                    </view>
                </view>
                <view class="content">
                    您已抢中{{already_num}}次，还差{{difference_num}}次可获得鸿运勋章及奖励
                </view>
            </view>

            <view class="all_money" @click="getHistory">
                <view class="left">
                    累计奖励收入
                </view>
                <view class="right">
                    <view class="money">
                        {{$returnFloat(zhang_money)}}
                        <image src="../../../static/back1.png"
                            style="width: 13rpx;height: 26rpx;vertical-align: -3rpx;margin-left: 10rpx; margin-right: 30rpx;" mode="">
                        </image>
                    </view>

                </view>
            </view>
        </view>

        <!-- 分割线-->
        <view style="width: 100%;height: 20rpx;background-color: #F5F5F5;"> </view>
        <!-- tabbar -->
        <u-tabs :list="list" :is-scroll="false" active-color="#FD635E" :current="current" @change="change"> </u-tabs>

        <view class="bgi" v-if="showArrayData.length==0">
            <image src="../../../static/datanull.png"
                style=" width: 344rpx;height: 298rpx;margin-top: 50rpx ;position: absolute;left: 50%;margin-left: -172rpx;">
            </image>
        </view>

        <view class="" v-else>
            <!-- 我的成就 -->
            <view class="" v-if="current==0" v-for="(item,index) in showArrayData" :key="index">
                <view class="item">
                    <view class="line_one">
                        <view class="number_medal">{{item.total_num}}颗鸿运勋章</view>
                        <view class="time">{{$time(item.add_time)}}</view>
                    </view>
                    <view class="lineTwo">
                        <view class="left_item">
                            <image src="../../../static/medal/medal_star.png"
                                style="width: 44rpx;height: 44rpx;margin-left: 30rpx;margin-top: 30rpx;" mode="">
                            </image>
                            <view
                                style="margin-left: 15rpx;color: #999999;font-size: 34rpx;font-weight: 400;height: 99rpx;line-height: 99rpx;">
                                x1
                            </view>
                            <image src="../../../static/medal/packet.png"
                                style="width: 44rpx;height: 44rpx;margin-left: 100rpx;margin-top: 30rpx;" mode="">
                            </image>
                            <view
                                style="margin-left: 15rpx;color: #999999;font-size: 34rpx;font-weight: 400;height: 99rpx;line-height: 99rpx;">
                                x1
                            </view>
                        </view>

                        <view class="button_custom" v-if="item.is_get==0" @click="getMoney(index)">
                            立即领取
                        </view>
                        <view v-else class="button_selected">
                            已领取
                        </view>
                    </view>
                </view>
            </view>

            <!-- 抢中记录 -->

            <view class="" v-if="current == 1" v-for="(item,i) in showArrayData" :key="i">
                <view class="cell" @click="getGroupDetail()">
                    <view class="item_bg">
                        <view class="left">
                            <image :src="$imgUrl(item.goods_icon)" style="width: 160rpx;height: 160rpx;" mode="">
                            </image>
                            <view class="msg">
                                <view class="title">
                                    {{item.goods_name}}
                                </view>
                                <view class="time">
                                    {{item.pay_time?$time(item.pay_time,2):''}}
                                </view>
                            </view>
                        </view>
                        <image src="../../../static/back.png" style="width: 13rpx;height: 26rpx; margin-top: 67rpx;"
                            mode=""></image>
                    </view>
                </view>
            </view>
        </view>


        <!-- <view v-if="reward_price>0"> -->
            <u-mask :show="show_reward_price" @click="show_reward_price=false" style="display: flex;justify-content: center;align-items: center;">
					<view class="dialog">
					    <view class="dia-a">
					        +{{$returnFloat(reward_price)}}元
					    </view>
					
					    <!-- 领取按钮 -->
					    <view class="dia-f"  @click="goGetMoney"></view>
					    
					    <!-- 关闭按钮 -->
					    <view class="dia-c"></view>
					
					</view>
            </u-mask>
            <uni-popup v-model="reward_price"  mode="center">
                <view class="dialog">
                    <view class="dia-t">
                        +{{$returnFloat(reward_price)}}元
                    </view>

                    <!-- 领取按钮 -->
                    <view class="dia-f" @tap="goGetMoney"></view>
                    
                    <!-- 关闭按钮 -->
                    <view class="dia-c" @tap="close"></view>

                </view>
            </uni-popup>
        <!-- </view> -->


    </view>
</template>

<script>
    export default {
        data() {
            return {
				show_reward_price:false,
                "need_num": "0", //抢中次数需满几次
                "already_num": "0", //已中次数
                "zhang_money": "0", //累计奖励
                "difference_num": "0", //还差几次
                "reward_price": 0, //奖励金额（分）
                "zhang_index": "0", //当前勋章信息ID
                "showArrayData": [], //展示列表
                "page": "1",
                "count": "20",
                "total_page": "0", //总页数
                current: 0,
                list: [{
                    name: "我的成就"
                }, {
                    name: "抢中记录"
                }],
            }
        },
        onLoad() {
            this.getMedal();
            this.getAchievement({
                page: 1,
                count: this.count
            });
        },
        onShow() {

        },
        async onReachBottom() {
            if (this.page >= this.total_page) {
                return
            }
            this.page = this.page + 1
            if (this.current == 0) {
                this.getAchievement({
                    page: this.page,
                    count: this.count
                });
            } else {
                this.getHistoryList({
                    page: this.page,
                    count: this.count
                });
            }
        },
        methods: {
            //勋章信息
            getMedal() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserMoney/medal_info',
                    data: {}
                }).then(res => {
                    if (res.data.success) {
                        self.need_num = res.data.data.need_num
                        self.already_num = res.data.data.already_num
                        self.zhang_money = res.data.data.zhang_money
                        self.difference_num = res.data.data.difference_num
                        self.reward_price = res.data.data.reward_price
                        self.zhang_index = res.data.data.zhang_index
						console.log(self.reward_price)
                        if (self.reward_price > 0) {
							self.show_reward_price=true
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            //我的成就
            getAchievement(data) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserMoney/my_achievement',
                    data: data
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        let result = res.data.data.list
                        self.total_page = res.data.data.total_page
                        self.showArrayData.length > 0 ? self.showArrayData = [...self.showArrayData, ...
                            result
                        ] : self.showArrayData = result
                        console.log(self.showArrayData)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 抢中记录
            getHistoryList() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserMoney/my_recording',
                    data: {}
                }).then(res => {

                    if (res.data.success) {
                        let result = res.data.data.list
                        self.total_page = res.data.data.total_page
                        self.showArrayData.length > 0 ? self.showArrayData = [...self.showArrayData, ...
                            result
                        ] : self.showArrayData = result
                        console.log(self.showArrayData)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 累计收入
            getHistory() {
                uni.navigateTo({
                    url: '../groupPrincipal/rechargeDetail?status=4'
                })
            },
            // tabbar切换
            change(index) {
                this.current = index;
                this.showArrayData = [];
                this.page = 1
                if (index == 0) {
                    this.getAchievement({
                        page: this.page,
                        count: this.count
                    });
                } else {
                    this.getHistoryList({
                        page: this.page,
                        count: this.count
                    });

                }

            },
            // item中点立即领取
            getMoney(index) {
                this.reward_price = this.showArrayData[index].reward_price
                this.zhang_index = this.showArrayData[index].zhang_index
                this.show_reward_price=true
            },
            // 弹窗点立即领取
            goGetMoney() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserMoney/receive_reward',
                    data: {
                        zhang_index: self.zhang_index
                    }
                }).then(res => {
                    if (res.data.success) {
						self.show_reward_price=false
                        this.getMedal();
                        this.page = 1;
                        this.showArrayData = [];
                        self.getAchievement({
                            page: this.page,
                            count: this.count
                        });
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                })

            },


            rules() {
                uni.navigateTo({
                    url:'../goldCoin/goldCoinRules?type=6'
                })
            },
            // 跳转拼团订单已抢中列表
            getGroupDetail() {
                uni.navigateTo({
                    url:'../order/groupOrder?id=1'
                })
            }

        }
    }
</script>

<style lang="scss">
    .slot-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 600rpx;
        width: 36rpx;
        // color: #FC5957;
    }

    .bgi {
        width: 344rpx;
        height: 298rpx;
        margin-top: 200rpx;
        // text-align:center;
        position: absolute;
        left: 50%;
        margin-left: -172rpx;


    }

    // 上半部分
    .header {
        width: 100%;
        height: 400rpx;
        background: #FFFFFF;
        overflow: hidden;
        position: relative;
        background-image: url(../../../static/medal/header_black.png);
        background-size: 100% 250rpx;
        background-repeat: no-repeat;

        .header_title {
            margin: 60rpx 30rpx 30rpx 30rpx;
            width: auto;
            height: 240rpx;
            overflow: hidden;
            position: relative;
            background-image: url(../../../static/medal/medal_header.png);
            background-size: 100% 240rpx;
            background-repeat: no-repeat;

            .headerCustom {
                width: 100%;
                height: 160rpx;
                display: flex;
                flex-direction: row;
                padding: 30rpx;

                .title {
                    display: flex;
                    flex-direction: column;
                    padding-left: 10rpx;
                    padding-top: 10rpx;


                    .top {
                        font-size: 28rpx;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: #C92A2A;
                    }

                    .bottom {
                        font-size: 24rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #C92A2A;
                    }
                }
            }

            .content {
                width: auto;
                margin-left: 30rpx;
                margin-right: 30rpx;
                margin-top: -30rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #C92A2A;
            }
        }

        .all_money {
            width: 100%;
            padding: 0 30rpx;
            display: flex;
            justify-content: space-between;

            .left {
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                // line-height: 66px;
            }

            .right {
                margin-right: 30rpx;
                display: flex;
                flex-direction: row;
            }
        }
    }

    //成就
    .item {
        margin: 10rpx 30rpx;
        // padding: 10rpx 30rpx;
        width: auto;
        height: 174rpx;
        box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);
        border-radius: 10rpx;

        .line_one {

            width: 100%;
            height: 75rpx;
            line-height: 75rpx;
            // background-color: #007AFF;
            display: flex;
            justify-content: space-between;
            background-image: url(../../../static/medal/title_packet.png);
            background-size: 200rpx 45rpx;
            background-position-y: 15rpx;
            background-repeat: no-repeat;
            border-bottom: 1rpx solid #F5F5F5;

            .number_medal {
                margin-left: 10rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FFFFFF;

            }

            .time {
                margin-right: 25rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;

            }
        }

        .lineTwo {
            display: flex;
            justify-content: space-between;

            .left_item {

                display: flex;
                flex-direction: row;

            }

            .button_custom {
                width: 148rpx;
                height: 48rpx;
                border-radius: 24rpx;
                color: #ef6363;

                background-color: #FFFFFF;
                border: 1rpx solid #ef6363;

                text-align: center;
                margin-top: 30rpx;
                margin-right: 30rpx;

                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 48rpx;
            }

            .button_selected {
                width: 148rpx;
                height: 48rpx;
                border-radius: 24rpx;
                color: #999999;

                background-color: #FFFFFF;
                border: 1rpx solid #999999;

                text-align: center;
                margin-top: 30rpx;
                margin-right: 30rpx;

                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                line-height: 48rpx;
            }
        }
    }

    //抢中记录
    .cell {
        margin: 10rpx 30rpx;
        width: auto;
        height: 160rpx;
        box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);
        border-radius: 10rpx;
        padding: 20rpx;

        .item_bg {
            display: flex;
            justify-content: space-between;
            background-color: #F8F8F8;
            height: 160rpx;
            padding-right: 15rpx;

            .left {
                display: flex;
                flex-direction: row;

                .msg {
                    display: flex;
                    flex-direction: column;
                    margin-left: 20rpx;
                    // text-align: center;

                    .title {
                        margin-top: 40rpx;
                        height: 39rpx;
                        font-size: 26rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #333333;
                        line-height: 39rpx;

                        // border: 1px solid #f70505;
                        // padding: 8px;
                        width: 400rpx;

                        overflow: hidden;

                        text-overflow: ellipsis; //文本溢出显示省略号

                        white-space: nowrap; //文本不会换行


                    }

                    .time {
                        margin-top: 20rpx;
                        height: 19rpx;
                        font-size: 24rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #999999;
                        line-height: 36rpx;
                    }
                }
            }
        }
    }


    // 弹窗
    .dialog {
		width: 555rpx;
		height: 850rpx;
		background-image: url(../../../static/medal/medal_pupopBg.png);
        background-size: 555rpx 690rpx;
        background-repeat: no-repeat;
		.dia-a{
			padding-left: 20rpx;
			margin-top: 440rpx;
			text-align: center;
			font-size:60rpx ;
			font-weight: bold;color: #EB493A;
		}
		
		        .dia-f {
		            margin-top: 133rpx;
		            margin-left: 80rpx;
		            margin-right: 80rpx;
		            height: 85rpx;
		
		            background-image: url(../../../static/medal/medal_getMoney.png);
		            background-size: 100% 85rpx;
		            background-repeat: no-repeat;
		        }
		
		        .dia-c {
		            margin-top: 50rpx;
		            // margin-bottom: 0;
		            margin-left: 240rpx;
		            margin-right: 240rpx;
		            height: 73rpx;
		
		            // width: 73rpx;
		
		            background-image: url(../../../static/icon-chahao.png);
		            background-size: 100% 73rpx;
		            background-repeat: no-repeat;
		        }
    }
</style>
