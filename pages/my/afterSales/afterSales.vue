<template>
	<!-- 申请售后 -->
	<view>
		<view class="box">
			<view class="imginfo">
				<image :src="$cdnUrl+info.sku_pic" mode=""></image>
			</view>
			<view class="textInfo">
				<text class="titleInfo">
					{{info.goods_name}}
				</text>
				<view class="numInfo">
					<text>{{info.sku_name}}</text>
					<text>x{{info.goods_count}}</text>
				</view>
				<text class="price">￥{{$returnFloat(info.goods_price)}}</text>
			</view>
		</view>

		<!-- //退款退货 -->
		<view class="returnList" v-if="info.goods_return_type!='0'" @click="goNextSales(0)">
			<view class="item">
				<view class="infomation">
					<view class="title">
						退款退货
					</view>
					<view class="content">
						已收到商品，需要退回收到的商品并退款
					</view>
				</view>
				<view class="go">
					<!-- > -->
                    <image src="../../../static/back.png" style="width: 16rpx;height: 32rpx;" mode=""></image>
				</view>
			</view>
		</view>
		<view class="returnList" v-if="info.goods_exchange_type!='0'"  @click="goNextSales(1)">
			<view class="item">
				<view class="infomation">
					<view class="title">
						换货
					</view>
					<view class="content">
						已收到的商品存在问题，需要换货
					</view>
				</view>
				<view class="go">
					<!-- > -->
                    <image src="../../../static/back.png" style="width: 16rpx;height: 32rpx;" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:"",//申请售后的商品信息
			}
		},
		onLoad(option) {
			if(option.info)this.info=JSON.parse(option.info)
		},
		onShow() {},
		onReachBottom() {
			// 下拉刷新
		},
		methods: {
			// 退款或退货，换货
			goNextSales(e){
				uni.navigateTo({
					url:'applyForRefund?type='+e+'&info='+JSON.stringify(this.info)
				})
			},
		},
	};
</script>
<style lang="scss">
	.box {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		border-bottom: 20rpx solid #F5F5F5;
		;

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
				height: 68rpx;
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
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FF3F3F;
			}
		}
	}

	.returnList {
		height: 150rpx;
		background-color: white;
		padding: 30rpx 0 0 25rpx;
		box-sizing: border-box;
		margin-bottom: 2rpx;

		.item {
			width: 100%;
			border-bottom: 1px solid #F5F5F5;
			display: flex;
			justify-content: space-between;

			.infomation {
				flex: 1;
				font-size: 26rpx;

				.title {
					font-family: PingFang SC;
					font-weight: 600;
					color: #333333;
				}

				.content {
					width: 100%;
					margin-top: 20rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}
			}

			.go {
				width: 100rpx;
				text-align: center;
				height: 120rpx;
				font-size: 40rpx;
				color: #CCCCCC;
				line-height: 120rpx;
			}
		}
	}
</style>
