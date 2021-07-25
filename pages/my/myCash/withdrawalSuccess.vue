<!-- 领取成功页面 -->
<template>
    <view>
        
        <u-navbar title-color="#000000" back-icon-color="#4B4957" :title="title"  :customBack="back"></u-navbar>
        
        <view class="one">
            <image src="../../../static/success.png"></image>
            <view>{{msg}}</view>
        </view>
        <view class="check" @click="examine()">{{btnTitle}}</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                money: '',
                cdnUrl: '',
                msg: '提现申请提交成功',
                title: '提交成功',
                btnTitle:"返回我的余额"
            }
        },
        onLoad(e) {
            if (e.giveCash == 1) {
                this.msg = '转赠申请提交成功'
                this.title = '转赠成功'
            } else if (e.giveCash==2) {
				this.msg = '转赠申请提交成功'
                this.title = '转赠成功'
				this.btnTitle="返回我的积分"
            }
			
			else if (e.isRecharge==1) {
                this.msg = '支付金额：' + e.money + '元'
                
                this.title = '充值成功'
                this.btnTitle = "确定"
            }
        },
        methods: {
            // 转跳到门店页面
            examine() {
                uni.navigateBack({
                    delta: 2
                    // url: 'myCash'
                })
            },
            
            back () {
                console.log(1111111)
                uni.navigateBack({
                    delta: 2
                    // url: 'myCash'
                })
            }
        }
    }
</script>

<style>
     .status_bar {
          height: var(--status-bar-height);
          width: 100%;
      }
    .flexd {
        position: fixed;
        left: 0;
        top: 0;
        width: 749rpx;
        height: 88rpx;
        background: #ffffff;
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
        width: 17rpx;
        height: 32rpx;
    }

    .flexd .center {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
    }

    .one {
        text-align: center;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #343434;
        padding-top: 150rpx;
    }

    .one image {
        width: 146rpx;
        height: 185rpx;
        padding-bottom: 50rpx;
    }

    .check {
        width: 690rpx;
        height: 90rpx;
        background-color: #FF6351;
        border-radius: 45rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        margin: 50rpx 30rpx;
    }
</style>
