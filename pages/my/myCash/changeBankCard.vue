<template>
	<view>
		<view>
			<view class="header">
				<view class="card_img" style="display: flex;padding: 30rpx 0 0 80rpx;align-items: center;">
					<image :src="$imgUrl(cardMsg.logo)" mode="" style="border-radius: 50%;width: 66rpx;height: 64rpx;"></image>
					<view class="card_name" style="margin-left: 30rpx;">
						{{cardMsg.card_bank}}
					</view>
				</view>
				<view class="card_msg">
					<view class="card_num" style="margin-left: 178rpx;">
						{{cardMsg.card_number}}
					</view>
				</view>
			</view>
			<view class="font">
				更换银行卡请联系客服
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				cardMsg:""
			}
		},
		onLoad(){
            let self = this;
            self.request({
                url:'ShptUapi/public/index.php/user/user_money',
                data:{}
            }).then(res => {
                if (res.data.success) {
                    self.cardMsg=res.data.data
                 } else {
                    uni.showToast({
                         title: res.data.msg,
                         icon: 'none'
                     })
                 }
            })
		},
		methods: {
			handleNum(p) {
				if (p) {
					return p.substring(0, 4) + ' **** **** ' + p.substring(p.length - 4);
				}
			}
		}
	}
</script>

<style>
	page{
		background-color:#555555;
		padding: 30rpx;
	}
</style>
<style scoped>
	.card_num{
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.font{
		text-align: center;
		margin-top: 80rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	.header{
		width: 690rpx;
		height: 180rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
	}

</style>
