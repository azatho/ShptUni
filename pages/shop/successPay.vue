<template>
    <view class="">
        
        <view class="img">
            <image src="../../static/sure.png" mode=""></image>
        </view>
        <block>
            <view class="success" v-if='order_total_price!=0'>
                支付金额： <text>￥{{order_total_price?$returnFloat(order_total_price):''}} 元</text>
            </view>
            
            <view class="success" >
                支付金额： <text>{{order_integral?$returnFloat(order_integral):''}} 积分</text>
            </view>
            
            <view class="look" @click="goHome">
                返回首页
            </view>
            <view class="goHome" @click="look">
                查看订单
            </view>
        </block>
        
    </view>
</template>

<script>
    export default {
        data() {
            return {
                order_total_price: '0', //订单总价
                goods_index:'',//订单id
                order_type:'',//0是普通订单  1是拼团订单 2积分订单
                order_integral:'0'//订单总积分
            }
        },
        methods: {
            goBack() {
                uni.redirectTo({
                    url: '/pages/pointsMall/index'
                })
            },
            //查看订单
            look() {
				console.log(this.order_type)
                if (this.order_type == 1) {
                    uni.navigateTo({
                        url:'../my/order/groupOrderDatail?id=' + this.goods_index + "&order_status=1"
                    })
                } else if (this.order_type == 2) {
                    uni.navigateTo({
                        url:'../my/order/scoreOrderDetail?id=' + this.goods_index
                    })
                } else {
                    uni.navigateTo({
                        url:'../my/order/orderDetails?id=' + this.goods_index
                    })
                }
            },
            //去首页
            goHome() {
                
                uni.switchTab({
                    url:'/pages/index/index'
                })
                
            },
        },
        onLoad(option) {
            if (option.order_total_price!='' && option.order_total_price!=undefined) {
                this.order_total_price = option.order_total_price;
            }
            // this.order_total_price = option.order_total_price
            this.goods_index = option.order_index
            this.order_type = option.orderType
            
            if (option.order_integral!='' && option.order_integral!=undefined) {
                this.order_integral = option.order_integral;
            }
        }
    }
</script>

<style lang="scss">
    .img {
        text-align: center;

        image {
            width: 146rpx;
            height: 186rpx;
            margin: 150rpx 0 50rpx;
        }
    }

    .success {
        text-align: center;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999;

        text {
            color: #333;
        }
    }

    .look {
        margin: 100rpx 30rpx 0;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        background: #FC4950;
        border-radius: 45px;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }

    .goHome {
        margin: 50rpx 30rpx;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        border-radius: 45px;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FC4950;
        border: 1px solid #FC4950;
    }
</style>
