<!-- 系统通知页面 -->
<template>
    <view v-if="render">

        <u-navbar title="系统通知" title-color="#000000">
            <view class="slot-wrap" @click="empty" v-if="msgList.length > 0">
                清空
            </view>
        </u-navbar>

        <view v-if="msgList.length!=0">
            <!-- <view class="empty" @click="empty">
                <image src="../../../static/del2.png"></image>清空
            </view> -->
            <view class="msg_list">
                <block v-for="(item,i) in msgList" :key="i">
                    <view class="msg">
                        <view class="tit">{{item.status_name}}
                            <view class="time">
                                {{item.message_time?$time(item.message_time,1):''}}
                            </view>
                        </view>
                        <view class="con" @click="goDetail(item)">
                            <view class="right">
                                <view class="right_msg">
                                    {{item.message_text}}
                                </view>

                                <view class="num">
                                    立即查看>>
                                </view>

                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view class="none" v-else>
            <image src="../../../static/datanull.png" style="width: 344rpx;height: 300rpx; margin-top: 60%;" mode="">
            </image>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                cdnUrl: '',
                page: 1,
                render: true,
                pageCount: 0,
                msgList: [],
                message_type: '', //消息类型
                count: 20
            }
        },
        // 上拉加载
        onReachBottom() {

            if (this.page < this.pageCount) {
                this.page++
                this.init()
            }
        },
        methods: {
            init() {
                if (uni.getStorageSync('token')) {
                    let self = this;
                    self.request({
                        url: 'ShptUapi/public/index.php/Message/systemList',
                        data: {
                            page: self.page,
                            count: self.count
                        },
                    }).then(res => {
                        uni.stopPullDownRefresh();
                        console.log(res)
                        if (res.data.success) {
                            self.pageCount = res.data.data.total_page
                            let result = res.data.data.list
                            self.msgList.length > 0 ? self.msgList = [...self.msgList, ...result] : self
                                .msgList = result

                            self.render = true
                        }
                    }, rej => {
                        console.log(rej);
                    })
                }
            },
            empty() {
                console.log(123)
                let self = this;
                uni.showModal({
                    content: '是否清空系统通知？',
                    success: function(res) {
                        if (res.confirm) {
                            self.request({
                                url: 'ShptUapi/public/index.php/Message/delMessage',
                                data: {
                                    type: 1
                                }
                            }).then(res => {
                                if (res.data.success) {
                                    self.msgList = [];
                                }
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            })
                        }
                        
                    }
                })
            },
            goDetail(item) {

                if (item.status == 1) {
                    // #1 "恭喜您升级成为团队长"
                    uni.navigateTo({
                        url: '../myTeam/myTeam'
                    })
                } else if (item.status == 2) {
                    // 2  "恭喜您参与的拼团已中奖",跳订单详情
                    uni.navigateTo({
                        url: '../order/groupOrder?id=1'
                    })
                } else if (item.status == 3) {
                    // 3 "很遗憾！您参与的拼团未中奖~",跳订单详情
                    uni.navigateTo({
                        url: '../order/groupOrder?id=2'
                    })
                } else if (item.status == 4 || item.status == 5) {
                    // 4 "恭喜您余额提现申请审核通过
                    uni.navigateTo({
                        url: '../myCash/cash?status=1'
                    })
                } else if (item.status == 6 || item.status == 7) {
                    // 6 "恭喜您拼团本金提现申请审核通过
                    uni.navigateTo({
                        url: '../myCash/cash?status=2'
                    })
                }
            }
        },
        onPullDownRefresh() {
            console.log('refresh');
            this.msgList = []
            this.page = 1
            this.init();
        },
        onShow() {
            this.cdnUrl = this.$cdnUrl
            this.msgList = []
            this.page = 1
            this.init()
        },
    }
</script>

<style lang="scss" scoped>
    page {
        background-color: #f5f5f5;
        position: absolute;
    }

    .slot-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        padding-left: 560rpx;
        width: 150rpx;
        color: #FC5957;
    }

    .none {
        text-align: center;
        margin: 80rpx;
    }

    .empty {
        width: 150rpx;
        border-radius: 30rpx;
        background-color: #fff;
        height: 50rpx;
        line-height: 50rpx;
        text-align: center;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #40A4E0;
        position: absolute;
        top: 20rpx;
        right: 30rpx;

        image {
            width: 36rpx;
            height: 36rpx;
            vertical-align: middle;
            margin-right: 15rpx;
        }
    }

    .msg {
        margin: 15rpx 30rpx;
        background-color: #FFFFFF;
        padding: 20rpx;
        border-radius: 10rpx;
        box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);

        .tit {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            display: flex;
            justify-content: space-between;

            .time {
                color: #999;
            }
        }

        .con {

            margin-top: 20rpx;
            // height: 150rpx;
            padding: 0 30rpx;
            background-color: #F8F8F8;
            display: flex;

            .img {
                margin-right: 20rpx;

                image {
                    width: 160rpx;
                    height: 100%;
                }
            }

            .right {
                padding-top: 20rpx;
                display: flex;
                flex-direction: column;
                width: 100%;

                .right_msg {
                    // width:   100%;
                    // height: 130rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    line-height: 36rpx;

                }

                .num {

                    margin-bottom: 10rpx;
                    height: 40rpx;
                    line-height: 40rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    text-align: right;

                }
            }
        }
    }
</style>
