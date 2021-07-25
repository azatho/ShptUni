<!-- 商品不存在页面 -->
<template>
	<view>
		<view class="none_img">
			<image v-if="supplier==1" src="../../../static/noShops.png" mode=""></image>
			<image v-else src="../../../static/noshop.png"></image>
		</view>
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<!-- 商品推荐 -->
		<view class="recommend">
			<view class="recommends">
				<view class="recommend_tit">
					<view class="line"></view>
					<view class="title">
						商品推荐
					</view>
					<view class="line1"></view>
				</view>
			</view>
			<view class="common_goods">
				<u-waterfall v-model="goodsList">
					<template v-slot:left="{leftList}">
						<view v-for="(item,i) in leftList" :key="i">
							<view class="common_con" @click="goShop(item.goods_index)">
								<view class="">
									<image :src="cdnUrl + item.goods_icon" mode=""></image>
									<view class="name">
										{{item.goods_name}}
									</view>
									<view class="discount">
										<view class="" v-for="(items,k) in item.coupon" :key="k">
											<view :class="items.is_have==0?'coupon':'coupon1'">
												<text>{{items.deduct_cash/100}}元</text><text
													style="margin-left:10rpx">{{items.is_have==0?'领取':'已领取'}}</text>
											</view>
										</view>
									</view>
									<view class="price">
										￥{{item.goods_cost/100?item.goods_cost/100:'暂无'}}<text
											v-if="item.goods_cost!=item.goods_price">{{item.goods_price/100?item.goods_price/100:'暂无'}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view v-for="(item,i) in rightList" :key="i" style="padding-left: 30rpx;">
							<view class="common_con" @click="goShop(item.goods_index)">
								<view class="">
									<image :src="cdnUrl + item.goods_icon" mode=""></image>
									<view class="name">
										{{item.goods_name}}
									</view>
									<view class="discount">
										<view class="" v-for="(items,k) in item.coupon" :key="k">
											<view :class="items.is_have==0?'coupon':'coupon1'">
												<text>{{items.deduct_cash/100}}元</text><text
													style="margin-left:10rpx">{{items.is_have==0?'领取':'已领取'}}</text>
											</view>
										</view>
									</view>
									<view class="price">
										￥{{item.goods_cost/100?item.goods_cost/100:'暂无'}}<text
											v-if="item.goods_cost!=item.goods_price">{{item.goods_price/100?item.goods_price/100:'暂无'}}</text>
									</view>
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				supplier:"",//是否
				cdnUrl: '',
				page: '1', //优选好物第几页
				goodsList: [], //优选好物列表
				leftList:[],//瀑布流左数据
				rightList:[],//瀑布流右数据
				count: '10',
				pageCount:'1',//总页数
			}
		},
		methods: {
			init() {
				let self = this
				self.request({
					url: 'ShptUapi/public/index.php/index/recommend_shop',
					data: {
						page: self.page,
						count: self.count,
					}
				}).then(res => {
					if (res.data.success) {
						self.pageCount=res.data.data.total_page
						for (var i = 0; i < res.data.data.list.length; i++) {
							self.goodsList.push(res.data.data.list[i])
						}
					}
				})
			},
			goShop(e) {
				console.log(e);
				uni.navigateTo({
					url:'../../shop/goodsDeatil?id='+e
				})
			},
		},
		onLoad(option) {
			if(option.supplier)this.supplier=option.supplier
			this.cdnUrl = this.$cdnUrl
		},
		onReachBottom() {
			if (this.page < this.pageCount) {
				this.page++
				this.init()
			}
		},
		onShow() {
			let self = this
			self.init()
		}
	}
</script>

<style lang="scss">
	.none_img {
		text-align: center;

		image {
			width: 224rpx;
			height: 215rpx;
			margin: 50rpx 0;
		}
	}
		.common_goods {
			padding: 20rpx 5rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.common_con {
				width: 330rpx;
				background: rgba(255, 255, 255, 1);
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				overflow: hidden;
				position: relative;

				image {
					width: 330rpx;
					height: 330rpx;
					border-radius: 10rpx 10rpx 0 0;
				}

				.name {
					padding: 0 10rpx;
					margin: 10rpx 0;
					// height: 70rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.discount {
					padding: 0 10rpx;
					display: flex;

					.coupon {
						width: 130rpx;
						// height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: url(../../../static/quan.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fff;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}

					.coupon1 {
						width: 130rpx;
						// height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: url(../../../static/quan1.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #fd4950;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
				}

				.price {
					margin: 20rpx 16rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					// margin-left: 16rpx;

					text {
						margin-left: 20rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						text-decoration: line-through
					}
				}

				.shop {
					width: 310rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #F63B42;
					display: flex;
					align-items: center;
					padding: 10rpx;

					.img {
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 10rpx;
						}
					}

					.right_shop {
						width: 260rpx;

						.title {
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #fff;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.tip {
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #CFCFCF;
						}
					}
				}
			}
		}
	.recommend {
		padding: 30rpx 24rpx 0;

		.recommends {
			.recommend_tit {
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 20rpx 0 30rpx;

				.line {
					width: 100rpx;
					height: 2rpx;
					background: rgba(153, 153, 153, 1);
					position: absolute;
					left: 190rpx;
				}

				.line1 {
					width: 100rpx;
					height: 2rpx;
					background: rgba(153, 153, 153, 1);
					position: absolute;
					right: 190rpx;
				}

				.title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					margin: 0 20rpx;
					position: relative;
				}
			}
		}

		.common_goods {
			padding: 20rpx 5rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.common_con {
				width: 330rpx;
				background: rgba(255, 255, 255, 1);
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				overflow: hidden;
				position: relative;

				image {
					width: 330rpx;
					height: 330rpx;
					border-radius: 10rpx 10rpx 0 0;
				}

				.name {
					padding: 0 10rpx;
					margin: 10rpx 0;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.discount {
					padding: 0 10rpx;
					display: flex;

					.coupon {
						width: 130rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: url(../../../static/coupon.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FF3F3F;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
				}

				.price {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					margin-left: 16rpx;

					text {
						margin-left: 20rpx;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(153, 153, 153, 1);
						text-decoration: line-through
					}
				}

				.shop {
					width: 310rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #F63B42;
					display: flex;
					align-items: center;
					padding: 10rpx;

					.img {
						image {
							width: 50rpx;
							height: 50rpx;
							margin-right: 10rpx;
						}
					}

					.right_shop {
						width: 260rpx;

						.title {
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #fff;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.tip {
							font-size: 16rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #CFCFCF;

						}
					}
				}
			}
		}

	}
</style>
