<!-- 换货详情 -->
<template>
    <view>
        <!-- 步骤条 -->
        <view
            style="background-color: #FFFFFF;width: 100%;height: 142rpx;display: flex;align-items: center;justify-content: center;">
            <view style="text-align: center;">
                <image src="../../../static/step1.png" mode="" class="stepImg"></image>
                <view>审核中</view>
            </view>
            <view style="width: 60rpx;height: 1rpx;border: 1rpx solid #F5F5F5;margin-bottom: 40rpx;"></view>
            <view style="text-align: center;">
                <image src="../../../static/step3.png" v-if="info.barter_status==1" mode="" class="stepImg"></image>
                <image src="../../../static/step2.png" v-if="info.barter_status==2" mode="" class="stepImg"></image>
                <image src="../../../static/step1.png" v-if="info.barter_status>2" mode="" class="stepImg"></image>
                <view>{{info.barter_status==2?"审核拒绝":'审核通过'}}</view>
            </view>
            <view style="width: 60rpx;height: 1rpx;border: 1rpx solid #F5F5F5;margin-bottom: 40rpx;"></view>
            <view style="text-align: center;">
                <image src="../../../static/step1.png" v-if="info.barter_status>4" mode="" class="stepImg"></image>
                <image src="../../../static/step3.png" v-else mode="" class="stepImg"></image>
                <view>收货</view>
            </view>
            <view style="width: 60rpx;height: 1rpx;border: 1rpx solid #F5F5F5;margin-bottom: 40rpx;"></view>
            <view style="text-align: center;">
                <image src="../../../static/step1.png" v-if="info.barter_status>6" mode="" class="stepImg"></image>
                <image src="../../../static/step3.png" v-else mode="" class="stepImg"></image>
                <view>换新</view>
            </view>
            <view style="width: 60rpx;height: 1rpx;border: 1rpx solid #F5F5F5;margin-bottom: 40rpx;"></view>
            <view style="text-align: center;">
                <image src="../../../static/step1.png" v-if="info.barter_status==7" mode="" class="stepImg"></image>
                <image src="../../../static/step3.png" v-else mode="" class="stepImg"></image>
                <view>完成</view>
            </view>
        </view>

        <!-- 售后内容 -->
        <view style="margin-top: 20rpx;">
            <view class="ItemList">
                <!-- 信息编号 -->
                <view class="titleserial">
                    <view class="serial">
                        售后编号 : {{info.barter_order}}
                    </view>
                    <view :class="info.text=='审核拒绝'?'error':'success'  ">
                        {{info.text=="待审核"?"审核中":info.text}}
                    </view>
                </view>
                <view class="box">
                    <view class="imginfo">
                        <image :src="$cdnUrl+info.image" mode=""></image>
                    </view>
                    <view class="textInfo" style="display: flex;justify-content: space-between;flex-direction: column;">
                        <text class="titleInfo">
                            {{info.goods_name}}
                        </text>
                        <view class="numInfo">
                            <!-- <text>{{info.goods_intro}}</text> -->
                            <text>x {{info.barter_goods_count}}</text>
                        </view>
                        <view style="display: flex;justify-content: space-between;">
                            <text class="price">￥{{$returnFloat(info.barter_total_price)}}</text>
                            <view style="font-size: 26rpx;margin-top: 5rpx;padding: 0 28rpx;
				border-radius: 28rpx;
				border: 1px solid #05B882;
				height: 54rpx;
				line-height: 50rpx;
				color: #05B882;
				box-sizing: border-box;" v-if="info.step==2" @click="nextSales">
                                重新提交
                            </view>
                        </view>

                    </view>
                </view>
                <view
                    style="padding-left: 30rpx;color: #D60D0D;margin-top: 15rpx;margin-bottom: 15rpx;margin-right: 30rpx;"
                    v-if="info.step==2">拒绝原因 : {{info.barter_refuse}}</view>
            </view>
        </view>
        <!-- 审核通过填写的信息 -->
        <view v-if="info.barter_status==3">
            <view style="margin-top: 20rpx;">
                <view class="logistics" @click="showLogistice=true">
                    <view style="font-size: 26rpx;">选择快递公司</view>
                    <view style="display: flex;font-size: 26rpx;">
                        <view>{{logisticsName}}</view>
                        <view>
                            <image src="../../../static/back1.png"
                                style="width: 16rpx;height: 30rpx;margin-top: 35rpx;margin-left: 15rpx;" mode="">
                        </view>
                    </view>
                    <u-picker v-model="showLogistice" mode="selector" :default-selector="[0]" :range="logisticsList"
                        range-key="express_name" @confirm="sureReason"></u-picker>
                </view>
                <view class="logistics">
                    <view>快递单号</view>
                    <input style="text-align: right;font-size: 26rpx;" type="text" v-model="logisticsOrderNum"
                        placeholder="请输入快递单号" />
                </view>
            </view>
            <!-- 收货人信息 -->
            <view style="margin-top: 20rpx;background-color: #FFFFFF;padding: 0 30rpx;height: 240rpx;">
                <view
                    style="height: 80rpx;line-height: 80rpx;font-family: FZLanTingHei-EB-GBK;font-weight: bold;color: #222222;font-size: 26rpx;">
                    收货人信息</view>
                <view
                    style="display: flex;justify-content: space-between;height: 80rpx;line-height: 80rpx;font-size: 26rpx;">
                    <view>{{info.fanhuo_name}}</view>
                    <view>{{info.fanhuo_phone}}</view>
                </view>
                <view style="font-size: 26rpx;">
                    {{info.fanhuo_address}}
                </view>
            </view>
            <!-- 提交按钮 -->
            <view>
                <view class="bottom_btn" @click="submit">提交</view>
            </view>
        </view>
        <!--商家待收货  -->
        <view style="background-color: #FFFFFF;" v-if="info.barter_status>4">
            <view class="step3">
                <view>快递公司</view>
                <view>{{info.merchant_express_company}}</view>
            </view>
            <view class="step3">
                <view>快递单号</view>
                <view>{{info.merchant_express_number}}</view>
            </view>
            <view class="step3">
                <view>提交时间</view>
                <view>{{$time(info.times,1)}}</view>
            </view>
            <view class="step3">
                <view>申请时间</view>
                <view>{{$time(info.barter_time,1)}}</view>
            </view>
        </view>
        <!--底部确认栏-->
        <view class="bottom-btn" v-if="info.barter_status==8">
            <view class="btn1" @click="receivingGood">确认收货</view>
            <view class="btn2" @click="viewLogistic">查看物流</view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                logisticsOrderNum: '', //输入的快递单号
                logisticsName: "", //所选中的物流名称
                logisticsId: '', //所选中的物流ID
                showLogistice: false, //是否显示物理列表弹窗
                logisticsList: [], //物流列表
                index: "", //售后id
                type: "", //售后类型
                numList: [{
                        name: "审核中"
                    },
                    {
                        name: "审核通过"
                    },
                    {
                        name: "收货"
                    },
                    {
                        name: "换新"
                    },
                    {
                        name: "完成"
                    },
                ], //进度条
                info: {
                    barter_status: 1,
                }, //售后详情信息
            }
        },
        onLoad(option) {
            this.index = option.id;
            this.init();
            this.getlogisticsList();
        },
        methods: {
            // 再次提交
            nextSales() {
                this.info.goods_price = this.info.barter_goods_price
                this.info.goods_count = this.info.barter_goods_count
                this.info.order_goods_index = this.info.parent_id
                uni.redirectTo({
                    url: 'applyForRefund?type=1&info=' + JSON.stringify(this.info)
                })
            },
            // 确认收货
            receivingGood() {
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/Service/serviceConfirm',
                    data: {
                        barter_index: self.info.barter_index
                    },
                }).then(res => {
                    if (res.data.success) {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        self.init()
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 查看物流
            viewLogistic() {
                uni.navigateTo({
                    url: '../order/logisticsInfo?order_index=' + this.info.barter_index
                })
            },
            // 提交
            submit() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Service/setExpress',
                    data: {
                        service_order_index: self.info.barter_index,
                        express_com: self.logisticsName,
                        express_num: self.logisticsOrderNum,
                        type: "1",
                    }
                }).then(res => {
                    if (res.data.success) {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        self.init()
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 选择的物理公司信息
            sureReason(e) {
                this.logisticsName = this.logisticsList[e[0]].express_name
            },
            // 获取物流列表
            getlogisticsList() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Service/expressList',
                    data: {}
                }).then(res => {
                    if (res.data.success) {
                        self.logisticsList = res.data.data
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 获取售后详情
            init() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Service/barterOrderInfo',
                    data: {
                        service_order_index: self.index
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.info = res.data.data
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

<style>
    page {
        background-color: #F5F5F5;
    }
</style>
<style scoped lang="scss">
    .bottom-btn {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        position: fixed;
        background-color: #FFFFFF;
        bottom: 0;

        .btn1 {
            margin-right: 30rpx;
            margin-left: 30rpx;
            width: 155rpx;
            height: 50rpx;
            background: #05B882;
            line-height: 50rpx;
            text-align: center;
            border-radius: 25rpx;
            color: #FFFFFF;
        }

        .btn2 {
            width: 155rpx;
            height: 50rpx;
            text-align: center;
            line-height: 50rpx;
            border: 1rpx solid #05B882;
            border-radius: 25rpx;
            color: #05B882;
        }
    }

    .step3 {
        font-size: 26rpx;
        padding: 0 30rpx;
        height: 100rpx;
        line-height: 100rpx;
        color: #666666;
        display: flex;
        justify-content: space-between;
    }

    .bottom_btn {
        position: fixed;
        bottom: 30rpx;
        left: 80rpx;
        width: 590rpx;
        height: 90rpx;
        background-color: #05B882;
        border-radius: 45rpx;
        text-align: center;
        line-height: 90rpx;
        font-size: 36rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
    }

    .logistics {
        font-size: 26rpx;
        background-color: #FFFFFF;
        display: flex;
        padding: 0 30rpx;
        height: 100rpx;
        line-height: 100rpx;
        justify-content: space-between;
        align-items: center;
    }

    .stepImg {
        width: 30rpx;
        height: 30rpx;
    }

    .ItemList {
        background-color: #FFFFFF;
        border-bottom: 20rpx solid #F5F5F5;

        .titleserial {
            display: flex;
            justify-content: space-between;
            padding: 30rpx 30rpx 0;

            .serial {
                font-size: 26rpx;
                font-family: Hiragino Sans GB;
                font-weight: 600;
                color: #222222;
            }

            .error {
                font-size: 26rpx;
                color: #EF1D22;
            }

            .success {
                font-size: 26rpx;
                color: #05B882;
            }

        }

        .box {
            width: 100%;
            box-sizing: border-box;
            padding: 30rpx;
            display: flex;
            border-bottom: 1px solid #F5F5F5;

            .imginfo {
                width: 160rpx;
                height: 160rpx;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .textInfo {
                flex: 1;
                box-sizing: border-box;
                padding-left: 20rpx;

                .titleInfo {
                    font-size: 26rpx;
                    font-family: Source Han Sans CN;
                    font-weight: 600;
                    color: #333333;
                    overflow: hidden;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                }

                .numInfo {
                    margin: 10rpx 0 6rpx;
                    display: flex;
                    justify-content: space-between;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #999999;
                }

                .price {
                    font-size: 36rpx;
                    font-family: Rubik;
                    font-weight: 600;
                    color: #222222;
                }
            }
        }


        .information {
            height: 80rpx;
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            padding: 0 20rpx;
            box-sizing: border-box;

            .detaiBtn {
                padding: 0 28rpx;
                border-radius: 28rpx;
                border: 1px solid #05B882;
                height: 54rpx;
                line-height: 50rpx;
                color: #05B882;
                box-sizing: border-box;
            }
        }
    }
</style>
