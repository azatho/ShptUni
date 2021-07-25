<!-- 物流信息页面 -->
<template>
    <view v-if="render">
        <u-navbar title="物流信息" title-color="#000000">

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
                        <view class="tit">
                            <view class="" style="flex:1">
                                {{item.message_text?item.message_text:''}}
                            </view>
                            <view class="time">
                                {{item.message_time?$time(item.message_time,0):""}}
                            </view>
                        </view>
                        <view class="con" @click="goDetail()">
                            <view class="img">
                                <image :src="cdnUrl+item.info.goods_icon" mode=""></image>
                            </view>
                            <view class="right">
                                <view class="right_msg">
                                    {{item.info.goods_name}}
                                </view>
                                <view class="right_msg" style="color: #999999; margin-top: 20rpx;font-size: 24rpx;">
                                    订单编号：{{item.info.order_id}}
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
    import {formatdate} from '@/until/common.js'
    export default {
        data() {
            return {
                cdnUrl: '',
                page: 1,
                count: 20,
                render: true,
                pageCount: 0,
                msgList: [],
                message_type: '', //消息类型
            }
        },
        methods: {
            init() {
                if (uni.getStorageSync('token')) {
                    let self = this;
                    self.request({
                        url: 'ShptUapi/public/index.php/Message/logistics',
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
            // 转跳到对应的订单
            goDetail(e) {

                uni.navigateTo({
                    url: '../common/orderDetail?index=' + e
                })
            },
            empty() {
                let self = this;
                uni.showModal({
                    content: '是否清空物流信息？',
                    success: function(res) {
                        if (res.confirm) {
                            self.request({
                                url: 'ShptUapi/public/index.php/Message/delMessage',
                                data: {
                                    type: 3
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
            // 上拉加载(小程序自带函数)
            onReachBottom() {
                if (this.page < this.pageCount - 1) {
                    this.page++
                    this.init()
                }
            },
            onPullDownRefresh() {
                console.log('refresh');
                this.msgList = []
                this.page = 0
                this.init();
            },
            onShow() {
                this.cdnUrl = this.$cdnUrl
                this.msgList = []
                this.page = 0
                this.init()
            },
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
        background-color: #fff;
        padding: 20rpx;
        border-radius: 10rpx;

        .tit {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            display: flex;
            justify-content: space-between;

            .time {
                color: #999;
                margin-left: 20rpx;
            }
        }

        .con {
            margin-top: 30rpx;
            height: 160rpx;
            padding-right: 30rpx;
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
                padding-top: 40rpx;

                .right_msg {
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    // line-height: 40rpx;
                }

                .num {
                    margin-top: 20rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                }
            }
        }
    }
</style>
