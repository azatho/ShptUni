<template>
	<view id="lookBalance">
		<u-navbar title="拼团积分" title-color="#000000">
			<view class="slot-wrap">
				<!-- 充值记录 -->
				<image src="../../../static/help.png" style="width: 44rpx;height: 44rpx;" mode="" @click="showOpen=true"></image>
			</view>
		</u-navbar>


		<view class="lookTop">
			<view class="lookTopTime">
				<image src="../../../static/glodCoin_header.png" mode=""></image>
				<!-- <view style="background-color: #FD635E;"></view> -->
				<view class="lookitem" style="display: flex;justify-content: space-between;flex-direction: column">

					<view class="lookitemBalance">
						<text>
							积分余额：
						</text>
					</view>
					<view class="lookitemMonery">
						<text>{{$returnFloat(coupon)}}</text>
						<view style="width: 135rpx;height: 50rpx;text-align: center;line-height: 50rpx;background-color: #FFFFFF;border-radius: 25rpx;color: #FD635E;
;" @click="goGiveSCore">转赠</view>
					</view>
					<view class="depositLog">
						<view class="depositIn">收入：{{$returnFloat(income_coupon)}}</view>
						<view class="depositOut">支出：{{$returnFloat(expenditure_coupon)}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="lookBottom">
			<text class="bottom">拼团积分明细</text>
			<view class="lookBottomTitle">
				<u-tabs :list="list" :is-scroll="false" active-color="#FD635E" :current="current" font-size="26rpx"
					@change="change">
				</u-tabs>
			</view>
			<!-- v-for=" (item) in  arrisShow" -->
			<view class="item" v-if="arrisShow.length">
				<view class="itemList" v-for="(item,index) in  arrisShow" :key="index">
					<view class="itemTitle">
						<text class="moneryTitle">{{item.change_explain}}</text>
						<text class="monery">{{$returnFloat1(item.type_amount)}}</text>
					</view>
					<view class="itemTime">
						<text>{{ $time(item.time,2) }}</text>
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
		<!-- 消息推送弹窗 -->
		<u-mask style="display: flex;justify-content: center;" :show="showOpen" @click="showOpen = false">
			<view style="width: 500rpx;height: 550rpx;border-radius: 18rpx;background-color: #FFFFFF;position: relative;top: 400rpx;">
				<view style="text-align: center;padding-top: 20rpx;position: relative;">
					<view style="height: 80rpx;,line-height: 80rpx;">{{rulesInfo.agreement_title}}</view>
					<image @click="showOpen=false" src="../../../static/open.png"
						style="width: 28rpx;height: 28rpx;position: absolute;right: 30rpx;top: 30rpx;" mode=""></image>
				</view>
				<scroll-view style="height: 370rpx;padding: 30rpx;" scroll-y="true">
					<rich-text :nodes="rulesInfo.agreement_content"></rich-text>
				</scroll-view>
				<view style="font-weight: 400;;color: rgba(61, 86, 138, 1);line-height: 100rpx;width: 500rpx;position: absolute;bottom: 0rpx;left: 50%;transform: translateX(-50%);height: 100rpx;text-align: center;border-top: 1rpx solid #CCCCCC;">
					我已知晓
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showOpen: false,
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
				is_withdrawal: "",
				rulesInfo: {}, //规则说明
			}
		},
		computed: {

		},
		onPullDownRefresh() {
			this.arrisShow = [];
			this.page = 1;
			this.getData({
				type: this.current + 1,
				page: this.page,
				count: "20"
			})
		},
		onLoad() {
			uni.getSystemInfo({
				success: function(res) {}
			});
		},
		onShow() {
			this.getRules();
			this.arrisShow = [];
			this.page = 1;
			this.getData({
				type: 2,
				page: this.page,
				count: "20"
			})
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
			this.getData(data)
		},
		methods: {
			goGiveSCore(){
				uni.navigateTo({
					url:"scoreGive"
				})
			},
			// 获取拼团积分说明
			getRules() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/UserConsumers/getAgreement_v2',
					data: {
						type: 8
					}
				}).then(res => {
					if (res.data.success) {
						self.rulesInfo = res.data.data
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
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
				this.current=index
				this.page = 1
				this.arrisShow = [];
				let scoreType=1;
				index==1?scoreType=1:scoreType=2
				this.getData({
					type: scoreType,
					page: "1",
					count: "20"
				})
			},
			async getData(data) {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/user/integral_change_log',
					data: data
				}).then(res => {
					if (res.data.success) {
						let result = res.data.data.list
						self.coupon = res.data.data.user_integral
						self.income_coupon = res.data.data.user_income
						self.expenditure_coupon = res.data.data.user_expenditure
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
			// 提现规则
			rules() {
				uni.navigateTo({
					url: "goldCoinRules?type=8"
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
