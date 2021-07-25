<!-- 商城主页  tabbar页 -->
<template>
	<view class="main-box">
		<view style="position: fixed;width: 100%;z-index:2;background-color: #FFFFFF;">
			<view style="display: flex;text-align: center;">
				<view class="head_nav" @click="selcurrent(0)"><span :class="current==0?'select_head':''">商品分类</span></view>
				<view class="head_nav" @click='selcurrent(1)'><span :class="current==1?'select_head':''">推荐店铺</span></view>
			</view>
		</view>
		<view class="classify" v-if="current == '0'" style="padding-top: 80rpx;">
			<block>
				<view class="classify_left" v-if="menuList.length != 0">
					<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
						<view v-for="(item, i) in menuList" :key="i" @click.stop="getCurrent(item.class_id,i)  ">
							<view style="font-size: 26rpx;" class="" :class="sort == item.class_id ? 'style' : 'style1'">
								{{item.name}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="classify_right" v-if="good_list.length != 0">
					<scroll-view scroll-y="true" bindscroll="scroll" style="height: 100%;">
						<view style="display: flex;width: 490rpx;flex-wrap:wrap;text-align: center;">
							<view v-for="(item, i) in good_list" :key="i" style="width: 163rpx;text-align: center;margin-bottom: 30rpx;">
								<view class="con" @click="goodsSearch(item.class_id)">
									<view class="img">
										<image :src="$cdnUrl + item.img" mode=""></image>
										<view class="name" style="font-size: 26rpx;">
											{{item.name}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view style="margin: 30px auto;color:#C0C0C0" v-if="isimgShow">
					<image src="../../static/zwsj1.png" style="width:520rpx;height:400rpx;" mode=""></image>
				</view>
			</block>
		</view>
		<view v-if="current == '1'" style="padding-top: 70rpx;padding-bottom: 80rpx;">
			<view class="shops" v-if="store_list.length!=0">
				<view v-for="(item,i) in store_list" :key="i" style="border: 1rpx solid #F5F5F5;padding: 20rpx;margin-bottom: 30rpx;">
					<view class="con_detail" @click="goShopHome(item.supplier_id)">
						<image :src="$cdnUrl+item.supplier_icon" mode="" style="width: 100rpx;height: 100rpx;border-radius: 10px;"></image>
						<view class="right">
							<view class="title">
								{{item.supplier_name}}
							</view>
							<view class="middle" style="margin-top: 20rpx;">
								<view class="dis">
									{{$returnPeople(item.supplier_collect)}}人收藏
								</view>
							</view>
						</view>
						<view style="width: 100rpx;height: 42rpx;line-height: 42rpx;background: linear-gradient(180deg, #FF6351, #FF672D);border-radius: 21rpx;text-align: center;color: #FFFFFF;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;">进店</view>
					</view>
					<view style="display:flex;background-color: #F9F9F9;border-radius: 10rpx;">
						<view v-for="(items,index) in item.goods" :key="index" style="margin:20rpx  0  0 20rpx;" @click="goGoodsDetail(items.goods_index)">
							<image :src="$cdnUrl+items.goods_icon" mode="scaleToFill" style="width: 140rpx;height: 140rpx;border: 1rpx solid #F5F5F5;border-radius: 10px;"></image>
							<view style="width: 140rpx;">
								<view class="shopName">{{items.goods_name}}</view>
								<view class="shopPrice">￥{{$returnFloat(items.goods_cost)}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="noshop" v-else style="text-align: center;margin-top: 250rpx;">
				<image src="/static/nodata.png" mode="" style="width: 480rpx;height: 360rpx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: '0',
				menuList: [], //左边导航列表
				good_list: [], //二级分类
				sort: '0', //左边导航索引
				store_list: [], //推荐店铺数据
				isimgShow: false,
			}
		},
		onLoad(option) {
			// this.init();
			// this.recommended_stores();
		},
        onShow() {
            this.init();
            this.recommended_stores();
        },
		methods: {
			// 
			goGoodsDetail(e){
				uni.navigateTo({
					url:'../shop/goodsDeatil?id='+e
				})
			},
			// 跳转至店铺主页
			goShopHome(e){
				uni.navigateTo({
					url:"../shop/ShopHomepage?id="+e
				})
			},
			// 跳转至商品详情页面
			goodsSearch(index){
				uni.navigateTo({
					url: '/pages/index/searchList2?class_id=' + index
				})
			},
			// 切换选中的标题栏
			selcurrent(e) {
				this.current = e
			},
			// 推荐店铺
			recommended_stores() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/index/getStoreLists',
					data: {
						page: 1,
						count: 20,
					}
				}).then(res => {
					if (res.data.success) {
						self.store_list = res.data.data.list
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			// 商品分类
			init() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/index/type_list',
					data: {}
				}).then(res => {
					if (res.data.success) {
						self.menuList = res.data.data
						let theid = self.menuList[0].class_id
						self.getCurrent(theid, 0)
					}
				});
			},
			//菜品的切换
			getCurrent(e, f) {
				this.currentIndex = f
				this.innerIndex = -1
				this.innerSort = -1
				this.sort = e;
				let self = this;
				self.request({
					url: "ShptUapi/public/index.php/index/getClassList",
					data: {
						class_id: e,
						page: 1,
						count: 20,
					}
				}).then(res => {
					if (res.data.success) {
						self.good_list = res.data.data
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
		},
	}
</script>


<style lang="scss">
	page {
		height: 100%;

	}

	.main-box {
		height: 100%;
	}
	.shopPrice{
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FF3F3F;
		text-align: center;
		padding-right: 10rpx;
	}
	.shopName{
		word-break:break-all;
		display:-webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient:vertical;
		overflow:hidden;
		margin-left: 10rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
	}
	.head_nav {
		width: 50%;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #999999;
	}

	.select_head::after {
		content: '';
		width: 15%;
		height: 1px;
		display: block;
		// padding-top: 10upx;
		margin: 0 auto;
		border-bottom: 2px solid #333333;
	}

	.select_head {
		color: #333333;
	}

	.classify {
		height: 100%;
		flex: 1;
		display: flex;
		overflow-y: auto;

		.classify_left {
			width: 200rpx;
			height: 100%;
			background-color: #f5f5f5;

			.style {
				height: 90rpx !important;
				line-height: 90rpx;
				height: 90rpx;
				text-align: center;
				font-size: 26rpx;
				// color: #FF862B;
				font-weight: bold;
				background-color: #fff;
				border-left: 4rpx solid #FF862B;
			}

			.style1 {
				height: 90rpx !important;
				line-height: 90rpx;
				text-align: center;
				font-size: 26rpx;
				color: #7a7a7a;
			}

			.innerstyle {
				height: 90rpx !important;
				line-height: 90rpx;
				height: 90rpx;
				text-align: center;
				font-size: 26rpx;
				color: #FF862B;
				font-weight: bold;
				background-color: #fff;

			}

			.innerstyle1 {
				height: 90rpx !important;
				line-height: 90rpx;
				text-align: center;
				font-size: 26rpx;
				color: #7a7a7a;
				background-color: #FFFFFF;

			}
		}

		.classify_right {
			flex: 1;
			padding: 0 30rpx;
			box-sizing: border-box;

			.con {
				display: flex;
				margin-bottom: 40rpx;
				position: relative;
				height: 135rpx;
				text-align: center;
				justify-content: center;
				.img {
					width: 120rpx;
					height: 120rpx;
					// margin-right: 27rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					position: relative;
					flex: 1;
					border-bottom: 1px solid #f5f5f5;

					.total_price {
						color: #FF3F3F;
						font-size: 24rpx;
						margin-top: 10rpx;
						display: flex;
						justify-content: space-between;
					}

					.btn {
						line-height: 40rpx;
						background: #F6281B;
						width: 100rpx;
						height: 40rpx;
						border-radius: 20rpx;
						color: #FFFFFF;
						text-align: center;
						font-size: 24rpx;
					}

					.name {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #222222;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}

					.rule {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.price {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #ff3f3f;
						margin-top: 10rpx;
					}

					.price1 {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999;
						text-decoration: line-through;
						margin: 4rpx 0 15rpx 0;
					}
				}

				.addShop {
					position: absolute;
					bottom: 9rpx;
					right: 30rpx;
					display: flex;
					align-items: center;

					.num {
						height: 38rpx;
						line-height: 38rpx;
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin: 0 20rpx;
					}

					.desc {
						width: 38rpx;
						height: 38rpx;

						image {
							width: 38rpx;
							height: 38rpx;
						}
					}

					.choose {
						width: 90rpx;
						height: 40rpx;
						text-align: center;
						line-height: 40rpx;
						border-radius: 20rpx;
						background: #f6281b;
						color: #fff;
						font-size: 22rpx;
						position: relative;

						.number {
							position: absolute;
							right: -20rpx;
							top: -15rpx;
							width: 32rpx;
							height: 32rpx;
							line-height: 32rpx;
							text-align: center;
							border-radius: 50%;
							background-color: rgba(51, 51, 51, 0.8);
							color: #fff;
						}
					}
				}
			}
		}
	}

	.addbtn {
		position: absolute;
		right: 0;
		bottom: 6rpx;
		width: 150rpx;
		height: 50rpx;
		background: #FFFFFF;
		border: 1rpx solid #FF862B;
		border-radius: 25rpx;
		color: #FF862B;
		font-size: 16rpx;
		line-height: 50rpx;
		text-align: center;
		box-sizing: border-box;
	}

	.nomore {
		text-align: center;
		color: #999999;
	}

	.shops {
		padding: 0 30rpx;

		.con_detail {
			width: 100%;
			display: flex;
			margin-bottom: 20rpx;
			align-items: center;
			.right {
				margin-left: 20rpx;
				overflow: hidden;
				flex-grow:2;
				// border-bottom: 1rpx solid #f5f5f5;
				.title {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.middle {
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin: 5rpx 0;

					.sale {
						image {
							width: 22rpx;
							height: 22rpx;
							margin-right: 10rpx;
						}
					}

					.dis {
						text {
							margin: 0 10rpx;
						}
					}
				}

				.freight {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;

					text {
						margin: 0 10rpx;
					}
				}

				.discount {
					display: flex;
					margin: 20rpx 0;

					.coupon {
						width: 144rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						background: url(../../static/quan.png) no-repeat;
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
						width: 154rpx;
						height: 38rpx;
						line-height: 38rpx;
						text-align: center;
						background: url(../../static/quan1.png) no-repeat;
						background-size: 100% 100%;
						position: relative;
						font-size: 16rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FD4950;
						margin-bottom: 10rpx;
						margin-right: 10rpx;
					}
				}
			}
		}
	}
</style>
