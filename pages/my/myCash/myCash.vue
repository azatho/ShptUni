<template>
    <view id="lookBalance">
        <view class="lookTop">
            <view class="lookTopTime">
                <image src="../../../static/1.png" mode="" style="border-radius: 10rpx;"></image>
                <view class="lookitem">
                    <view class="lookitemBalance">
                        <text>
                            账户余额：
                        </text>
                    </view>
                    <view class="lookitemMonery">
                        <text>{{$returnFloat(balance)}}</text>
                        <view class="deposit">
                            <view class="depositTop" @click="gopage(0)">提现</view>
                            <view class="depositBottom" @click="gopage(1)">余额转赠</view>
                        </view>

                    </view>
                    <view class="depositLog">
                        <text>累计提现：{{$returnFloat(cumulative)}}</text>
                        <text>提现中：{{$returnFloat(in_cash)}}</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="lookBottom">
            <text class="bottom"> 余额记录</text>
            <view class="lookBottomTitle">
                <u-tabs :list="list" :is-scroll="false" active-color="#FD635E" :current="current" @change="change">
                </u-tabs>
            </view>
            <!-- v-for=" (item) in  arrisShow" -->
            <view class="item" v-if="arrisShow.length">
                <view class="itemList" v-for="(item,index) in  arrisShow" :key="index">
                    <view class="itemTitle">
                        <text class="moneryTitle">{{item.type_name}}</text>
                        <text class="monery">{{$returnFloat1(item.type_amount)}}</text>
                    </view>
                    <view class="itemTime">
                        <text>{{ $time(item.time,2) }}</text>
                        <text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==1">提现中</text>
                        <text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==2">提现成功</text>
                        <text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==3">已驳回</text>
                    </view>
                </view>
            </view>
            <view class="item" v-else style="text-align: center;margin-top: 111rpx;">
                <!-- <img src="../../../static/myCenter/datanull.png" alt="" style="width: 344rpx;height: 300rpx;"> -->
                <!-- <img :src="$imgUrl('CxtxUni/static/myCenter/datanull.png')" alt="" style="width: 344rpx;height: 300rpx;"> -->
                <image src="../../../static/datanull.png" style="width: 344rpx;height: 300rpx;"></image>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                total_page: 0,
                current: 0,
                page: 1,
                list: [{
                    name: "收入"
                }, {
                    name: "支出"
                }],
                balance: 0.00,
                in_cash: 0.00,
                cumulative: 0.00,
                turn_amount: 0,
                arrDjiesuan: [],
                arrShouru: [],
                arrZhichu: [],
                arrisShow: []
            }
        },
        computed: {

        },
        onShow() {
            this.page = 1
            this.arrisShow = [];
            this.getData({
                type: this.current + 1,
                page: this.page
            })
            this.balance_info()
        },
        async onReachBottom() {

            if (this.page >= this.total_page) {
                return
            }

            this.page = this.page + 1
            let data = {
                type: this.current + 1,
                page: this.page
            }
            console.log(data)

            this.getData(data)

        },
        onPullDownRefresh() {
            console.log('refresh');
        
            this.page = 1
            this.arrisShow = [];
            this.getData({
                type: this.current + 1,
                page: this.page
            })
            this.balance_info()
        },
        methods: {

            gopage(e) {
                if (e == 0) {
                    //余额status传1
                    uni.navigateTo({
                        url: 'cash?status=1'
                    })
                } else {
                    uni.navigateTo({
                        url: 'giveCash?turn_amount=' + this.turn_amount
                    })
                }

            },
            change(index) {
                this.current = index;
                this.arrisShow = [];
                this.page = 1
                this.getData({
                    type: this.current + 1,
                    page: "1"
                })
            },
            async getData(data) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/user/user_cash_change',
                    data: data
                }).then(res => {
                    console.log(res)
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        let result = res.data.data.list
                        self.total_page = res.data.data.total_page

                        self.arrisShow.length > 0 ? self.arrisShow = [...self.arrisShow, ...result] : self
                            .arrisShow = result
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })


            },
            async balance_info() {

                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/user/user_money',
                    data: {}
                }).then(res => {
                    console.log(res)
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        let data = res.data.data
                        self.balance = data.cash;
                        self.in_cash = data.total_in_cash;
                        self.cumulative = data.total_extract_cash;
                        self.turn_amount = data.turn_amount;
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    #lookBalance {

        // padding: 30rpx;
        .lookTop {
            padding: 30rpx;
            width: 100%;
            height: 355rpx;
            background: #F5F5F5;
            box-sizing: border-box;

            text {
                font-size: 24rpx;
                color: #FFFFFF;
                font-family: PingFang SC;
                font-weight: 400;
            }

            .lookTopTime {
                position: relative;
                width: 100%;
                height: 100%;

                image {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                }

                .lookitem {
                    position: absolute;
                    z-index: 1;
                    width: 100%;
                    height: 100%;

                    .lookitemBalance {
                        padding-top: 28rpx;
                        padding-left: 36rpx;
                        box-sizing: border-box;
                    }

                    .lookitemMonery {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0 27rpx;

                        text {
                            font-size: 77rpx;
                        }

                        .deposit {
                            .depositTop {

                                width: 135rpx;
                                height: 50rpx;
                                font-size: 26rpx;
                                border-radius: 30rpx;
                                background-color: #FFFFFF;
                                text-align: center;
                                color: #FD635E;
                                line-height: 50rpx;
                                font-family: Source Han Sans CN;
                            }

                            .depositBottom {
                                width: 135rpx;
                                text-align: center;
                                height: 50rpx;
                                font-size: 26rpx;
                                margin-top: 20rpx;
                                border-radius: 30rpx;
                                line-height: 50rpx;
                                border: 1px solid #FFFFFF;

                                color: #FFFFFF;
                                font-family: Source Han Sans CN;
                            }
                        }

                    }

                    .depositLog {
                        margin-top: 60rpx;
                        display: flex;

                        text {
                            flex: 1;
                            padding-left: 37rpx;
                        }
                    }
                }

            }
        }

        .lookBottom {
            padding: 30rpx;

            .bottom {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;

                &::before {
                    content: "| ";
                    vertical-align: baseline;
                    font-size: 15px;
                    font-family: PingFang SC;
                    font-weight: 600;
                    color: #FD635E;
                }
            }

            .lookBottomTitle {
                padding: 20rpx 40rpx 0;
                border-bottom: 1px solid RGBA(245, 245, 245, 1);
            }
        }

        .item {
            .itemList {
                padding: 20rpx 0;
                border-bottom: 1px solid RGBA(245, 245, 245, 1);

                .itemTitle {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 5rpx;

                    .moneryTitle {
                        font-size: 26rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #333333;
                    }

                    .monery {
                        font-size: 26rpx;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: #FD635E;
                    }

                }

                .itemTime {
                    font-size: 22rpx;
                    font-family: PingFang SC;
                    font-weight: 400;

                    color: #999999;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

    }
</style>
