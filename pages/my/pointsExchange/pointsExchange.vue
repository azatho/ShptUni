<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar title="兑换专区" :title-bold="true">
			<view slot="right" style="margin-right: 30rpx;font-size: 24rpx;" @click="goExchange">兑换记录</view>
		</u-navbar>
		<!-- 查看兑换订单 -->
		<view class="title1" @click="goScoreOrder">
			<view>查看兑换订单</view>
			<view>>></view>
		</view>
		<!-- 兑换商品列表 -->
		<view class="concent" v-for="(item,index) in shopList" :key="index" @click="goScoreShop(item)">
			<view class="left">
				<image  :src="$cdnUrl+item.goods_icon"></image>
			</view>
			<view class="right">
				<view class="title">
					<text class="icon">积分</text>
					<view class="titletext">{{item.goods_name}}</view>
				</view>
				<view class="info">{{item.goods_intro}}</view>
				<view class="bottom">
					<view class="scoretext">{{item.hot_integral/100}}积分</view>
					<view class="button">立即兑换</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1, //当前页数
				shopList: [], //积分商品,
				pageIndex: 1, //
			}
		},
		onShow() {
			this.page=1;
			this.pageIndex=1;
			this.shopList=[];
			this.getShopInfo()
		},
		onReachBottom(){
			if(this.page<this.pageIndex){
				this.page++
				this.getShopInfo()
			}
		},
		methods: {
			// 跳转至积分商品详情页面
			goScoreShop(e){
				uni.navigateTo({
					url:"../../shop/couponGoodsDetail?id="+e.goods_index
				})
			},
			// 跳转至积分兑换订单
			goScoreOrder(){
				uni.navigateTo({
					url:"../order/scoreOrder"
				})
			},
			// 跳转至兑换记录页面
			goExchange(){
				uni.navigateTo({
					url:"exchangeList"
				})
			},
			// 获取积分兑换商品
			getShopInfo(){
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/index/recommend_shop_v2',
					data: {
						page: self.page,
						count: 20,
					}
				}).then(res => {
					if (res.data.success) {
						self.shopList.length > 0 ? [...self.shopList, ...res.data.data.list] : self.shopList = res.data
							.data.list
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

<style scoped lang="scss">
	.title1 {
		display: flex;
		background-color: #F56565;
		justify-content: space-between;
		color: #FFFFFF;
		line-height: 70rpx;
		padding: 0 30rpx;
		height: 70rpx;
	}

	.concent {
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #CCCCCC;
		display: flex;

		.left {
			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				border: 1rpx solid #EEEEEE;
			}
		}

		.right {
			padding-left: 20rpx;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.title {
				display: flex;
				align-content: center;
				.icon {
					text-align: center;
					padding: 8rpx;
					background-color: #F56565;
					color: #FFFFFF;
					border-radius: 5rpx;
					font-size: 24rpx;
				}
				.titletext{
					padding-left: 10rpx;
					width: 400rpx;
					overflow: hidden; //多出部分隐藏
					white-space: nowrap; //一行显示
					text-overflow: ellipsis; //是否显示省略号
				}
			}

			.info {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				width: 500rpx;
				margin-bottom: 40rpx;
				overflow: hidden; //多出部分隐藏
				white-space: nowrap; //一行显示
				text-overflow: ellipsis; //是否显示省略号

			}

			.bottom {
				display: flex;
				justify-content: space-between;

				.scoretext {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FF3F3F;
				}

				.button {
					width: 150rpx;
					height: 60rpx;
					border-radius: 30rpx;
					background-color: #000000;
					color: #FFFFFF;
					text-align: center;
					line-height: 60rpx;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
