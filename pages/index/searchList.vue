<template>
	<view>
		<u-navbar :is-back="false" title="">
		<view class="status_bar">
			<view class="left_img" @click="back">
				<image src="../../static/leftback.png" mode=""></image>
			</view>
			<view class="input">
				<input type="text" v-model="value" placeholder="请输入关键词" />
				<image src="../../static/search(1).png" class="search_img" @click="search"></image>
				<view class="del" @click="del">
					<image src="../../static/del.png"></image>
				</view>
			</view>
			<view class="searchWord" @click="search">
				搜索
			</view>
		</view>
		</u-navbar>
		<view style="border: 2rpx solid #F5F5F5;">
			<u-tabs active-color='#FF6260' inactive-color='#999999' :list="listdata" :is-scroll="false"
				:current="current1" @change="change"></u-tabs>
		</view>
		<view class="">

			<view class="recommend" v-if="list.length != 0">

				<view class="common_goods" v-if="current1==0">
					<view class="tap">
						<view class="item" :class="{'active':active=='0'}" @tap="change1">
							<view class="text">
								综合
							</view>
						</view>.
						<view class="item" :class="{'active':active=='1'}" @tap="change2">
							<view class="text">
								销量
							</view>
							<image src="../../static/none.png" class="img" v-show="sale=='0'"></image>
							<image src="../../static/up11.png" class="img" v-show="sale=='1'"></image>
							<image src="../../static/down11.png" class="img" v-show="sale=='2'"></image>
						</view>
						<view class="item" :class="{'active':active=='2'}" @tap="change3">
							<view class="text">
								价格
							</view>
							<image src="../../static/none.png" class="img" v-show="price=='0'"></image>
							<image src="../../static/up11.png" class="img" v-show="price=='1'"></image>
							<image src="../../static/down11.png" class="img" v-show="price=='2'"></image>
						</view>
					</view>
					<u-waterfall v-model="list"> 
						<template v-slot:left="{leftList}">
							<view v-for="(item, index) in leftList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<view class="common_con" @click="goShopDetail(item.goods_index)">

									<image :src="cdnUrl + item.goods_icon" mode=""></image>
									<view class="name">
										{{ item.goods_name }}
									</view>
									<view class="intro">{{item.goods_intro}}</view>
									<view class="price"
										style="display: flex;justify-content: space-between;align-items: center;">
										<view class="shopPrice" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}
										</view>
										<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}</view>
									</view>

								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view v-for="(item, index) in rightList" :key="index">
								<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
								<view class="common_con" @click="goShopDetail(item.goods_index)">

									<image :src="cdnUrl + item.goods_icon" mode=""></image>
									<view class="name">
										{{ item.goods_name }}
									</view>
									<view class="intro">{{item.goods_intro}}</view>
									<view class="price"
										style="display: flex;justify-content: space-between;align-items: center;">
										<view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}
										</view>
										<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}</view>
									</view>

								</view>
							</view>
						</template>
					</u-waterfall>
				</view>
				<view v-if="current1 == '1'" style="padding-top: 70rpx;padding-bottom: 80rpx;">
					<view class="shops" v-if="list.length!=0">
						<view v-for="(item,i) in list" :key="i"  style="border: 1rpx solid #F5F5F5;padding: 20rpx;margin-bottom: 30rpx;">
							<view class="con_detail" @click="goShopHome(item.supplier_id)">
								<image :src="$cdnUrl+item.supplier_icon" mode="" style="width: 100rpx;height: 100rpx;border-radius: 10px;"></image>
								<view class="right">
									<view class="title">
										{{item.supplier_name}}
									</view>
									<view class="middle" style="margin-top: 20rpx;">
										<view class="dis">
											{{item.supplier_collect}}人收藏
										</view>
									</view>
								</view>
								<view  style="width: 100rpx;height: 42rpx;line-height: 42rpx;background: linear-gradient(180deg, #FF6351, #FF672D);border-radius: 21rpx;text-align: center;color: #FFFFFF;font-size: 24rpx;font-family: PingFang SC;font-weight: 400;">进店</view>
							</view>
							<view style="display:flex;background-color: #F9F9F9;border-radius: 10rpx;">
								<view v-for="(items,index) in item.goods" :key="index" style="margin:20rpx  0  0 20rpx;" @click="goShopDetail(items.goods_index)">
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
			
		</view>
		<view class="noneImg" v-if="list.length<1">
			<image src="../../static/nodata.png" mode="" style="width: 480rpx;height: 360rpx;"></image>
		</view>
	<!-- 	<u-loadmore v-if="list.length!=0" bg-color="rgb(240, 240, 240)" :status="status" :load-text="loadText"
			@loadmore="clkloadMore"></u-loadmore> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current1: 0,
				listdata: [{
					name: "商品"
				}, {
					name: "线上店铺",
				}],
				flowList: [],
				cdnUrl: '',
				value: '',
				list: [],
				page: '1',
				type: '',
				count: 20,
				leftList: [],
				rightList: [],
				status: 'loadmore',
				totalPage: 1,
				loadText: {
					loadmore: '上拉或点击加载更多',
					loading: '努力加载中',
					nomore: '没有更多了'
				},
				active: "0",
				sale: "0",
				price: "0",
				goods_search:""
			};
		},
		methods: {
			// 跳转到店铺主页
			goShopHome(e){
				uni.navigateTo({
					url:'../shop/ShopHomepage?id='+e
				})
			},
			// tab标签选择
			change(index) {
				console.log(index)
				this.list=[]
				this.current1 = index
				if(index==0){
					this.init()
				}else if(index==1){
					this.init2()
				}
			},
			init2(){
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/index/getStoreLists',
					data: {
						page: this.page,
						count:this.count,
						supplier_name:self.value
					}
				}).then(res => {
					if (res.data.success) {
						self.list = res.data.data.list
						self.total_page = res.data.data.total_page
						self.status = "loadmore"
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			// 搜索商品列表页
			init() {
				let self = this;
				this.list=[]
				self.request({
					url: 'ShptUapi/public/index.php/index/getShopList',
					data: {
						page: self.page,
						count: self.count,
						name: self.value,
						type: self.type,
						goods_search:self.goods_search
					}
				}).then(res => {
					if (res.data.success) {
						self.list = res.data.data.list
						console.log(self.list);
						self.total_page = res.data.data.total_page
						// console.log(self.leftList);
						self.status = "loadmore"
					}
				});
			},
			//返回到首页
			back() {
				if (this.type == 0) {
					uni.switchTab({
						url: './index'
					});
				} else {
					uni.redirectTo({
						url: '../supplyChain/index'
					});
				}

			},
			//搜索
			search() {
				//不能搜索店铺 只能商品
				if(this.current1==0){
					this.init()
				}else{
					this.init2()
				}
				
			},
			//清空搜索框的值
			del() {
				this.value = ''
			},
			//商品详情
			goGoodsDetail(e, id, type) {
				if (type == '0') {
					uni.navigateTo({
						url: '/pages/common/goodsDetail?id=' + e
					})
				}
				if (type == '6') {
					uni.navigateTo({
						url: '/pages/group/seckillDetail?skill_id=' + id
					})
				}
				if (type == '5') {
					uni.navigateTo({
						url: '/pages/group/goodsDetail?id=' + id
					})
				}
			},
			//店铺主页
			goShopDetail(e) {
				uni.navigateTo({
					url:'../shop/goodsDeatil?id='+e
				})
			},
			change1() {
				this.active = "0"
				this.price = "0"
				this.sale = "0"
				this.init()
			},
			change2() {
				this.active = "1"
				this.price = "0"
				this.type="1"
				if (this.sale == "0") {
					this.sale = "1"
					this.goods_search = "1"
				} else if (this.sale == "1") {
					this.sale = "2"
					this.goods_search = "0"
				} else if (this.sale == "2") {
					this.sale = "1"
					this.goods_search = "1"
				}
				this.init()
			
			},
			change3() {
				this.active = "2"
				this.sale = "0"
				this.type="2"
				if (this.price == "0") {
					this.price = "1"
					this.goods_search = "1"
					
				} else if (this.price == "1") {
					this.price = "2"
					this.goods_search = "0"
				} else if (this.price == "2") {
					this.price = "1"
					this.goods_search = "1"
				}
				this.init()
			},
			clkloadMore() {
				this.reachBtm()
			},
			reachBtm() {
				if (this.page < this.totalPage) {
					this.status = 'loading';
					this.page++;
					let self = this;
					if(self.current1==0){
						self.request({
							url: 'ShptUapi/public/index.php/index/getShopList',
							data: {
								page: self.page,
								count: self.count,
								name: self.value,
								type: self.type
							}
						}).then(res => {
							if (res.data.success) {
								self.list = self.list.concat(res.data.data.list)
								self.status = "loadmore"
								self.total_page = res.data.data.total_page
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								self.status = "nomore"
							}
						});
					}else if(self.current1==1){
						self.request({
							url: 'ShptUapi/public/index.php/index/getStoreLists',
							data: {
								page: this.page,
								count:this.count
							}
						}).then(res => {
							if (res.data.success) {
								self.list = res.data.data.list
								self.total_page = res.data.data.total_page
								self.status = "loadmore"
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								self.status = "nomore"
							}
						})
					}
				} else {
					self.status = "nomore"
				}
			},
		},

		onLoad(options) {
			// this.type = options.type
			this.cdnUrl = this.$cdnUrl
			this.value = options.value
			// this.lat = options.lat
			// this.lng = options.lng
			this.init();
		},
		//下拉加载更多
		onReachBottom() {
			this.reachBtm()
		
		},
	};
</script>

<style lang="scss">
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
	.tap {
		width: 750rpx;
		height: 60rpx;
		background: #FFFFFF;
		border-top: 2rpx solid #eef2f4;
		border-bottom: 2rpx solid #eef2f4;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	
		.item {
			margin-left: 37rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			// background-color: pink;
			height: 100%;
			width: 200rpx;
	
			.img {
				width: 12rpx;
				height: 22rpx;
				margin-left: 15rpx;
			}
		}
	
		.active {
			color: #FF625E;
		}
	}
	.recommend {
		// padding: 30rpx 24rpx 0;

		.recommend_tit {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.word {
				font-size: 29rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #F42A02;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
				}
			}

			.word1 {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999;

				image {
					width: 24rpx;
					height: 24rpx;
					vertical-align: middle;
				}
			}
		}

		.common_goods {
			// padding: 20rpx 5rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.common_con {
				width: 330rpx;
				// height: 640rpx;
				background: rgba(255, 255, 255, 1);
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				margin-bottom: 30rpx;
				overflow: hidden;
				position: relative;
				margin-left: 30rpx;

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
					-webkit-line-clamp: 1;
				}

				.intro {
					padding: 0 10rpx;
					margin: 10rpx 0;
					// height: 70rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 300;
					color: #666666;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}

				.discount {
					padding: 0;
					display: flex;

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
						margin-right: 5rpx;
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
						color: #fd4950;
						margin-bottom: 10rpx;
						margin-right: 5rpx;
					}
				}

				.price {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					margin-left: 16rpx;
					// text {
					// 	margin-left: 20rpx;
					// 	font-size: 22rpx;
					// 	font-family: PingFang SC;
					// 	font-weight: 400;
					// 	color: rgba(153, 153, 153, 1);
					// 	text-decoration: line-through;
					// }
				}

				.shop {
					// width: 310rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					background-color: #f63b42;
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
							color: #cfcfcf;
						}
					}
				}
			}
		}
	}

	.noneImg {
		margin: 200rpx 0 0;
		text-align: center;

		image {
			width: 640rpx;
			height: 480rpx;
		}
	}

	.status_bar {
		padding: 15rpx 30rpx;
		display: flex;

		.left_img {
			width: 50rpx;
			height: 70rpx;

			image {
				margin-top: 19rpx;
				width: 18rpx;
				height: 32rpx;
			}
		}

		.input {
			width: 410rpx;
			height: 70rpx;
			padding: 0 70rpx 0 60rpx;
			line-height: 70rpx;
			height: 70rpx;
			background: rgba(238, 241, 244, 1);
			border-radius: 4rpx;
			position: relative;

			input {
				height: 70rpx !important;
				line-height: 70rpx !important;
			}

			.search_img {
				width: 30rpx;
				height: 28rpx;
				position: absolute;
				top: 20rpx;
				left: 25rpx;
			}

			.del {
				width: 80rpx;
				height: 70rpx;
				position: absolute;
				top: 0;
				right: 0;

				image {
					width: 30rpx;
					height: 30rpx;
					margin: 20rpx 0 0 25rpx;
				}
			}
		}  

		.searchWord {
			margin-left: 30rpx;
			height: 70rpx;
			flex: 1;
			text-align: center;
			line-height: 70rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}

	.goods_msg {
		padding: 40rpx 30rpx 0;
		display: flex;

		.good_img {
			image {
				width: 160rpx;
				height: 160rpx;
				background: #F5F5F5;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
		}

		.right {
			.title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: wrap;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.tip {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin: 8rpx 0 15rpx;

				text {
					margin-right: 30rpx;
				}
			}

			.discount {
				display: flex;
				flex-wrap: wrap;

				view {
					width: 150rpx;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					position: relative;
					font-size: 16rpx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-bottom: 10rpx;
					margin-right: 10rpx;
				}

				.coupon {
					background: url(../../static/quan.png) no-repeat;
					background-size: 100% 100%;
					color: #fff;
				}

				.coupon1 {
					background: url(../../static/quan1.png) no-repeat;
					background-size: 100% 100%;
					color: #ff3b32;
				}

			}

			.price {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(255, 63, 63, 1);

				text {
					margin-left: 20rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					text-decoration: line-through
				}
			}
		}
	}

	.shop_msg {
		width: 690rpx;
		margin: auto;
		padding: 0 0 0 180rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid #f5f5f5;
		height: 66rpx;
		line-height: 66rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;

		image {
			width: 29rpx;
			height: 29rpx;
			vertical-align: middle;
			margin-right: 10rpx;
		}

		text {
			margin-left: 20rpx;
		}
	}
</style>
