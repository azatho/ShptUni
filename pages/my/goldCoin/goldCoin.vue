<template>
    <view id="lookBalance">

        <u-navbar title="我的金币" title-color="#000000">
            <view class="slot-wrap" @click="rules">
                <!-- 充值记录 -->
                <image src="../../../static/help.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
            </view>
        </u-navbar>


        <view class="lookTop">
            <view class="lookTopTime">
                <image src="../../../static/glodCoin_header.png" mode=""></image>
                <!-- <view style="background-color: #FD635E;"></view> -->
                <view class="lookitem" style="display: flex;justify-content: space-between;flex-direction: column">

                    <view class="lookitemBalance">
                        <text>
                            金币余额：
                        </text>
                    </view>
                    <view class="lookitemMonery">
                        <text>{{$returnFloat(coupon)}}</text>
                    </view>
                    <view class="depositLog">
                        <view class="depositIn">收入：{{$returnFloat(income_coupon)}}</view>
                        <view class="depositOut">支出：{{$returnFloat(expenditure_coupon)}}</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="lookBottom">
            <text class="bottom">金币明细</text>
            <view class="lookBottomTitle">
                <u-tabs :list="list" :is-scroll="false" active-color="#FD635E" :current="current" font-size="26rpx" @change="change">
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
                        <text>{{ $time(item.add_time,2) }}</text>
                        <!-- <text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==1">提现中</text>
                                                <text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==2">提现成功</text>
                                                <text v-if="(item.type==11||item.type==12||item.type==13)&&item.status==3">已驳回</text> -->
                    </view>
                </view>
            </view>
            <view class="item" v-else style="text-align: center;margin-top: 111rpx;">
                <image src="../../../static/datanull.png" style="width: 344rpx;height: 300rpx;"></image>
                <!-- <img :src="cdnUrl+'XianxiangUapi/static/datanull.png'" alt="" style="width: 344rpx;height: 300rpx;"> -->
                <!-- <img :src="$imgUrl('CxtxUni/static/myCenter/datanull.png')" alt="" style="width: 344rpx;height: 300rpx;"> -->
            </view>
        </view>


        <!-- <view>
            <uni-popup ref="popup" type="center">
                <view class="dialog">
                    <view class="dia-t">
                        金币规则
                    </view>
                    <view class="dia-c">
                        <web-view :src="src"></web-view>
                    </view>
                    <view class="dia-f" @tap="close">
                        我知道了
                    </view>
                </view>
            </uni-popup>
        </view> -->
    </view>
</template>

<script>
    // import myCashApi from '../../../api/my/my.js'
    export default {
        data() {
            return {
                src: "",
                cdnUrl: "",
                current: 0,
                page: 1,
                list: [{
                    name: "收入"
                }, {
                    name: "支出"
                }],
                coupon: 0.00,
                income_coupon: 0.00,
                expenditure_coupon: 0.00,
                arrDjiesuan: [],
                arrShouru: [],
                arrZhichu: [],
                arrisShow: [],
                is_withdrawal: ""
            }
        },
        computed: {

        },
        onNavigationBarButtonTap() {
            console.log("点击了自定义按钮");
            // this.$refs.popup.open()
            uni.navigateTo({
                url: "goldCoinRules?type=5"
            })
        },
        onPullDownRefresh() {
            console.log('refresh');
            this.arrisShow = [];
            this.page = 1;
            this.getData({
                type: this.current + 1,
                page: this.page,
                count: "20"
            })
            this.balance_info()
        },
        onLoad() {

            uni.getSystemInfo({
                success: function(res) {
                    console.log(res.statusBarHeight);
                }
            });
        },
        onShow() {
            this.arrisShow = [];
            this.page = 1;
            this.getData({
                type: this.current + 1,
                page: this.page,
                count: "20"
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
        methods: {

            // 关闭弹层
            close() {
                this.$refs.popup.close()
            },
            gopage(e) {
                if (this.is_withdrawal == '1') {
                    uni.showToast({
                        title: '您已被禁止提现，有疑问请联系平台',
                        icon: 'none',
                        duration: 2000
                    })
                } else {
                    if (e == 0) {
                        uni.navigateTo({
                            url: '../myCash/cash?status=2'
                        })
                    } else {

                    }

                }

            },
            change(index) {
                this.current = index;
                this.page = 1
                this.arrisShow = [];
                this.getData({
                    type: this.current + 1,
                    page: "1",
                    count: "20"
                })
            },
            async getData(data) {
                let self = this;
                console.log(data)
                self.request({
                    url: 'ShptUapi/public/index.php/user/user_integral_change',
                    data: data
                }).then(res => {
                    console.log(res)
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
                    if (res.data.success) {
                        console.log(res)
                        let data = res.data.data

                        self.coupon = data.coupon;
                        self.income_coupon = data.income_coupon;
                        self.expenditure_coupon = data.expenditure_coupon;
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })

            },
            // 提现规则
            rules() {
                uni.navigateTo({
                    url: "goldCoinRules?type=5"
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #lookBalance {

        .slot-wrap {
            display: flex;
            align-items: center;
            flex: 1;
            padding-left: 600rpx;
            width: 150rpx;
            color: #FC5957;
        }


        // padding: 30rpx;
        .lookTop {
            // padding: 30rpx;
            width: 100%;
            height: 300rpx;
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

                    border-radius: 15rpx;



                    .flexd {
                        position: fixed;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 88rpx;
                        // background: #ffffff;
                        box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.16);
                        line-height: 88rpx;
                        padding: 0 30rpx;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        font-family: PingFang SC;
                        z-index: 111111;
                    }

                    .flexd .left {

                        width: 50rpx;
                        height: 88rpx;
                    }

                    .flexd .center {

                        font-size: 36rpx;
                        font-weight: bold;
                        color: #FFFFFF;
                    }

                    .flexd .right {
                        width: 44rpx;
                        height: 44rpx;
                    }

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

                        .depositAll {

                            // width: 135rpx;
                            // display: flex;
                            // justify-content: space-between;
                            .deposit {
                                width: 135rpx;
                                height: 50rpx;
                                font-size: 26rpx;
                                // padding: 13rpx 42rpx;
                                border-radius: 30rpx;
                                background-color: #FFFFFF;
                                text-align: center;
                                color: #FD635E;
                                line-height: 50rpx;
                                // border-radius: 25rpx;
                                font-family: Source Han Sans CN;
                            }

                            .deposit1 {
                                width: 135rpx;
                                text-align: center;
                                height: 50rpx;
                                font-size: 26rpx;
                                ;
                                margin-top: 20rpx;
                                border-radius: 30rpx;
                                line-height: 50rpx;
                                border: 1px solid #FFFFFF;
                                border-radius: 25px;

                                color: #FFFFFF;
                                font-family: Source Han Sans CN;
                            }
                        }

                    }

                    .depositLog {
                        margin-bottom: 0rpx;
                        display: flex;

                        text {
                            flex: 1;
                            padding-left: 37rpx;
                        }

                        .depositIn {
                            width: 50%;
                            height: 80rpx;
                            line-height: 80rpx;
                            padding-left: 30rpx;
                            border: 1px solid #FFFFFF;
                            border-left: none;
                            border-right: none;
                            border-bottom: none;
                            color: #FFFFFF;
                            font-size: 26rpx;
                        }

                        .depositOut {
                            width: 50%;
                            height: 80rpx;
                            line-height: 80rpx;
                            padding-left: 30rpx;
                            border: 1px solid #FFFFFF;
                            color: #FFFFFF;
                            border-right: none;
                            border-bottom: none;
                            font-size: 26rpx;
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

        .dialog {
            width: 500rpx;
            height: 300rpx;
            background: #FFFFFF;
            border-radius: 10rpx;
            overflow: hidden;
            position: relative;

            .dia-t {

                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #333333;
                margin: 30rpx auto;
                text-align: center;

            }

            .dia-c {

                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;
                margin: 0 28rpx;


            }

            .dia-f {
                width: 100%;
                height: 90rpx;
                position: absolute;
                left: 0;
                bottom: 0;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #FD635E;
                text-align: center;
                line-height: 90rpx;
                margin-top: 25rpx;
                border-top: 2rpx solid #f5f5f5;

            }

        }
    }
</style>
