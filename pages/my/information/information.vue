<!-- 消息中心页面 -->
<template>
    <view>
        <!-- 系统消息 -->
        <view style="width: 100%; height: 100%; background-color: #F5F5F5;">
            <view class="hang" @click="xitong">
                <view class="left">
                    <view class="img">
                        <image src="../../../static/xx1.png"></image>
                        <view class="imgdw" v-if="xitongs.system_num>0">
                            <image src="../../../static/xx5.png"></image>
                            <view class="txt5">{{xitongs.system_num}}</view>
                        </view>
                    </view>
                    <view class="txt">
                        <view>系统通知</view>
                        <view class="txt1">{{xitongs.system_text?xitongs.system_text:'暂无消息通知'}}</view>
                    </view>
                </view>
                <view class="right">{{xitongs.system_time?$time(xitongs.system_time,0):''}}</view>
            </view>
            <!-- 物流信息 -->
            <view class="hang" @click="dingdan">
                <view class="left">
                    <view class="img">
                        <image src="../../../static/xx3.png"></image>
                        <view class="imgdw" v-if="dingdans.logistics_num >0">
                            <image src="../../../static/xx5.png"></image>
                            <view class="txt5">{{dingdans.logistics_num}}</view>
                        </view>
                    </view>
                    <view class="txt">
                        <view>物流信息</view>
                        <view class="txt1">{{dingdans.message_text?dingdans.message_text:'暂无物流信息'}}</view>
                    </view>
                </view>
                <view class="right">{{dingdans.message_time?$time(dingdans.message_time,0):''}}</view>
            </view>

        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {

                page: 0,
                pageCount: 0,
                dingdans: {}, //订单

                xitongs: {}, //系统
            }
        },
        methods: {
            init() {


                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Message/index',
                    data: {},
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.xitongs = res.data.data.system //系统
                        self.dingdans = res.data.data.logistics //订单

                    }
                }, rej => {
                    console.log(rej);
                })

            },
            // 转跳到系统通知页面
            xitong() {
                uni.navigateTo({
                    url: 'messages'
                })
            },
            // 转跳到订单消息页面
            dingdan() {
                uni.navigateTo({
                    url: 'massage'
                })
            },

        },
        // 上拉加载(小程序自带函数)
        onReachBottom() {
            if (this.page < this.pageCount - 1) {
                this.page++
                this.init()
            }
        },
        onShow() {
            // this.apply_rank = this.$rank()
            this.init()
        },
        onLoad(options) {

        }
    }
</script>

<style>
    page {
        background-color: #F5F5F5;
    }

    .hang {
        border-top: 1rpx solid #F5F5F5;
        background-color: #FFFFFF;
        padding: 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
    }

    .hang image {
        width: 100%;
        height: 100%;
    }

    .hang .left {
        display: flex;
    }

    .hang .left .img {
        width: 64rpx;
        height: 64rpx;
        margin-right: 20rpx;
        position: relative;
    }

    .left .img .imgdw {
        position: absolute;
        right: -6rpx;
        top: -10rpx;
        width: 28rpx;
        height: 28rpx;
    }

    .img .imgdw image {
        width: 28rpx;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .img .imgdw .txt5 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 15rpx;
        font-family: PingFang SC;
        font-weight: bold;
        text-align: center;
        color: #F8F6F9;
    }

    .hang .left .txt {
        flex: 1;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
    }

    .left .txt .txt1 {
        width: 461rpx;
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 10rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .hang .right {
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
    }
</style>
