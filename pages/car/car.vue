<template>
	<view class="" style="padding-bottom: 30px;">
		<u-navbar :is-back="false"  title="购物车">
			<view slot="right" style="padding-right: 30rpx;"  @click="updata=!updata" v-if="cartList!=0">
				{{updata?'完成':'编辑'}}
			</view>
		</u-navbar>
		<view class="msg"  v-if="cartList!=0">
			<view v-for="(item,i) in cartList" :key="i" style="background-color: #FFFFFF;">
				<view class="msg_tit">
					<view class="tit_left">
						<view class="choose" v-if="!item.allDisable">
							<image src="../../static/fixation.png"></image>
						</view>
						<view class="choose" v-else @click="getShops(!item.web_select,i)">
							<image src="../../static/choose.png" mode="" v-if="item.web_select"></image>
							<image src="../../static/fk_icon.png" mode="" v-else></image>
						</view>
						<view class="tit" @click="goShop(item.supplier_id)">
							<image src="../../static/case.png" mode="" class="image1"></image>

							<text style="max-width: 260rpx;white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
								word-break: break-all;">{{item.supplier_name}}</text>
							<image src="../../static/back1.png" mode="" class="image2"></image>
						</view>
					</view>
				</view>
				<view style="display:flex;align-items:center;padding-bottom: 20rpx;" v-for="(items,k) in item.info"
					:key="k">
					<view class="choose1" v-if="items.goods_status!=2">
						<image src="../../static/fixation.png"></image>
					</view>
					<view class="choose1" @click="getGoods(items.cart_index,i,k)" v-else>
						<image src="../../static/choose.png" mode="" v-if="items.web_select"></image>
						<image src="../../static/fk_icon.png" mode="" v-else></image>
					</view>
					<view class="con">
						<view class="img" style="position: relative;">
							<image v-if='items.goods_status!=2' src="../../static/shopOff.png" mode=""
								style="width: 80rpx;height: 30rpx;position: absolute;top: 35%;left: 25%;translate: 50% 50%;z-index: 2;">
							</image>
							<image :src="cdnUrl+items.sku_pic" mode=""></image>
						</view>
						<view class="right" @click="goGoodsDetail(items.goods_index,items.goods_status)">
							<view class="right_msg" style="display: flex;">
								{{items.goods_name}}
							</view>
							<view class="norms">{{items.goods_norms==''?'无规格':items.goods_norms}}</view>
							<view class="num">
								<view class="">
									<text class="text1">￥</text>
									<text class="text2">{{items.sku_cost_price/100}}</text><text class="price"
										style="text-decoration: line-through;margin-left: 20rpx;">￥{{items.sku_market_price / 100}}</text>
								</view>
								<view class="num_count">
									<image src="../../static/desc.png"
										@click.stop="descCount(i,k,items.goods_count,items.sku_inventory)"></image>
									<text>{{items.goods_count}}</text>
									<image src="../../static/add.png"
										@click.stop="addCount(i,k,items.goods_count,items.sku_inventory)"
										v-if="items.goods_status=='2'"></image>
									<image src="../../static/greyAdd.png" v-else @click.stop=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="none_img" v-else>
			<image src="/static/carNone.png" mode=""></image>
			<view
				style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">
				购物车空空如也~</view>
		</view>

		<view class="foot" v-if="cartList!=0">
			<view style="" class="left">
				<view @click="allSelect(!allSel)" style="display: flex;align-items: center;">
					<image v-if='allSel' style="width: 36rpx;height: 36rpx;" src="../../static/choose.png" mode="">
					</image>
					<image v-else style="width: 36rpx;height: 36rpx;" src="../../static/fk_icon.png" mode=""></image>
					<text style="margin-left: 30rpx;">全选</text>
				</view>
				<view v-if="!updata">
					合计:<span style='color: #FF6351;'>￥{{allNum}}</span>
				</view>
				<view style="border-radius: 30px;line-height: 60rpx;text-align: center
;width: 150rpx;height: 60rpx;background-color:#FF3636;color: #FFFFFF;"  v-if='updata' @click="delCartGood()">删除</view>
			</view>
			<view  v-if="!updata" class="right" @click="sumbit">结算</view>
		</view>

		<view style="background-color: #f5f5f5;width: 100%;height: 30rpx;"></view>
		<view class="recommend" v-if="goodsList.length&&!cartList.length">
			<view class="recommend_tit">
				<view class="word" style="margin-bottom: 20rpx;">
					<image src="../../static/recommendShop.png" mode="" style="width: 360rpx;height: 28rpx;"></image>
				</view>
			</view>
			<view class="common_goods" >
				<u-waterfall v-model="goodsList">
					<template v-slot:left="{leftList}">
						<view v-for="(item,i) in leftList" :key="i">
							<view class="common_con" @click="goGoodsDetail(item.goods_index,2)">
								<view class="">
									<image :src="cdnUrl + item.goods_icon" mode=""></image>
									<view class="name">
										{{item.goods_name}}
									</view>
									<view class="price">
										<text>
											￥{{item.goods_cost/100?item.goods_cost/100:'暂无'}}
										</text>
										<text style="margin-right: 30rpx;color: #999999;">
											销量{{item.goods_sale}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}" >
						<view v-for="(item,i) in rightList" :key="i" style="padding-left: 30rpx;">
							<view class="common_con" @click="goGoodsDetail(item.goods_index,2)">
								<view class="">
									<image :src="cdnUrl + item.goods_icon" mode=""></image>
									<view class="name">
										{{item.goods_name}}
									</view>
									<view class="price">
										<text>
											￥{{item.goods_cost/100?item.goods_cost/100:'暂无'}}
										</text>
										<text style="margin-right: 30rpx;color: #999999;">
											销量{{item.goods_sale}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
			</view>
			<view style="text-align: center;" v-if="!goodsList.length&&!cartList.length">
				<image src="../../static/noshop.png" style="width: 360rpx;height: 300rpx;" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				updata:false,//编辑购物车状态
				leftList: [], //瀑布流左数据
				rightList: [], //瀑布流右数据
				allNum: 0, //购物车选中的全部金额
				allSel: 0, //购物车是否全选
				timer: null, //定时器
				cdnUrl: '',
				goodsList: [],
				cartList: [],
				showRadio: false,
				checked: false,
				cart_index: [],
				pageCount: '10',
				page: '0',
				count: '10',
			}
		},
		methods: {
			// 获取购物车数据
			init() {
				let self = this
				self.request({
					url: 'ShptUapi/public/index.php/Cart/cartList',
					data: {
						page: "1",
						count: "10",
					}
				}).then(res => {
					if (res.data.success) {
						self.cartList = res.data.data.info
						for (let a = 0; a < self.cartList.length; a++) {
							let disable = 0;
							for (let b of self.cartList[a].info) {
								if (b.goods_status == 2) {
									disable = 1;
									break;
								}
							}
							self.cartList[a].allDisable = disable;
						}
					} else {
						if (res.data.msg == '登录状态失效，请重新登录~！') {
							uni.showModal({
								content: '未登录，请先登录',
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url: '/pages/my/my'
										})
									} else if (res.cancel) {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}
								}
							})
						}
					}
				});
			},
			//获取优选好物
			getSelectGoods() {
				let self = this
				self.request({
					url: 'ShptUapi/public/index.php/index/recommend_shop',
					data: {
						page: self.page,
						count: self.count
					}
				}).then(res => {
					if (res.data.success) {
						for (var i = 0; i < res.data.data.list.length; i++) {
							self.goodsList.push(res.data.data.list[i])
						}
					}
				})
			},
			//去店铺主页
			goShop(e) {
				uni.navigateTo({
					url: '/pages/common/shopHome?id=' + e
				})
			},
			//去商品详情页
			goGoodsDetail(e, status) {
                console.log(1)
				if (status == '2') {
					uni.navigateTo({
                        url:'../shop/goodsDeatil?id=' + e
					})
				} else {
					uni.navigateTo({
						// url: '/pages/my/Nocommunity',
                        url:'../my/evaluate/nocommunity'
					})
				}

			},
			// 购物车全选按钮
			allSelect(q) {
				let self = this;
				// 切换选中状态
				self.allSel = q;
				q ? self.allNum = 0 : ''
				// 遍历所有商品将状态值改为已选中
				for (let a = 0; a < self.cartList.length; a++) {
					self.cartList[a].allDisable == 1 ? self.getShops(q, a) : ''
				}
			},
			// （选中时使用）计算合计金额
			calculationNum(e, k, y) {
				let self = this;
				y == 1 ? self.allNum += self.cartList[e].info[k].goods_count * self.cartList[e].info[k].sku_cost_price /
					100 : self
					.allNum -= self.cartList[e].info[k].goods_count * self.cartList[e].info[k].sku_cost_price / 100
			},
			// 计算合计金额
			calculationNum1(e, k, y) {
				let self = this;
				y == 1 ? self.allNum += self.cartList[e].info[k].sku_cost_price / 100 : self.allNum -= self.cartList[e]
					.info[k].sku_cost_price /
					100
			},
			// 店铺的全选
			getShops(q, index) {
				let self = this
				self.cartList[index].web_select = q
				for (let i = 0; i < self.cartList[index].info.length; i++) {
					self.cartList[index].info[i].goods_status == 2 ? self.getGoods('', index, i, q) : ''
				}
			},
			// 商品的选择
			getGoods(e, index, ci, k) {
				let istrue = 0;
				if (k) {
					istrue = k
					this.cartList[index].info[ci].web_select = k
				} else {
					istrue = !this.cartList[index].info[ci].web_select
					this.cartList[index].info[ci].web_select = !this.cartList[index].info[ci].web_select
				}
				this.isShopSel(index)
				this.isAllSel()
				this.calculationNum(index, ci, istrue)
				this.editCartIndex(this.cartList[index].info[ci].cart_index, this.cartList[index].info[ci].web_select)
				console.log(this.cart_index)
			},
			// 修改数组中index
			editCartIndex(e, k) {
				let self = this;
				if (k == 1) {
					self.cart_index.push(e)
				} else {
					let a = self.cart_index.indexOf(e);
					self.cart_index.splice(a, 1)
				}
			},
			// 判断一个店铺内的商品是否被全部选中
			isShopSel(index) {
				let shopSel = 1;
				for (let a of this.cartList[index].info) {
					if (a.goods_status == 2) {
						!a.web_select ? shopSel = 0 : ''
					}
				}
				this.cartList[index].web_select = shopSel
			},
			// 判断是否全选
			isAllSel() {
				let shopSel = 1;
				for (let b of this.cartList) {
					if (b.allDisable == 1) {
						b.web_select == 1 ? '' : shopSel = 0
					}
				}
				this.allSel = shopSel
			},
			// 删除取消选择的商品index值
			delectCarIndex(e) {
				let self = this;

			},
			//增加购物车商品数量
			addCount(index, ci, goods_count, sku_stock) {
				uni.showLoading({
					title: "请稍等",
					mask: true
				})
				let self = this;
				let shopInfo = self.cartList[index].info[ci]
				if (shopInfo.goods_count < shopInfo.sku_inventory) {
					self.request({
						url: 'ShptUapi/public/index.php/Cart/editCart',
						data: {
							cart_index: shopInfo.cart_index,
							goods_count: shopInfo.goods_count + 1,
						}
					}).then(res => {
						uni.hideLoading()
						if (res.data.success) {
							// 不重新请求是因为购物车顺序会变
							// self.init()
							self.cartList[index].info[ci].goods_count = shopInfo.goods_count + 1
							if (self.cartList[index].info[ci].web_select) self.calculationNum1(index, ci, 1)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '超出商品库存数量',
						icon: 'none'
					})
				}
			},
			//减少购物车商品数量
			descCount(index, ci, goods_count, sku_stock) {
				let self = this;
				let shopInfo = self.cartList[index].info[ci]
				if (shopInfo.goods_count > 1) {
					self.request({
						url: 'ShptUapi/public/index.php/Cart/editCart',
						data: {
							cart_index: shopInfo.cart_index,
							goods_count: shopInfo.goods_count - 1,
						}
					}).then(res => {
						if (res.data.success) {
							// 不重新请求是因为购物车顺序会变
							// self.init()
							self.cartList[index].info[ci].goods_count = shopInfo.goods_count - 1;
							if (self.cartList[index].info[ci].web_select) self.calculationNum1(index, ci, 0)
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				} else {
					let self = this;
					self.request({
						url: 'ShptUapi/public/index.php/Cart/deleteCart',
						data: {
							cart_index: shopInfo.cart_index,
						}
					}).then(res => {
						if (res.data.success) {
							this.init()
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}

			},
			// 删除购物车内的商品
			delCartGood(){
				let self = this;
				self.request({
					url:'ShptUapi/public/index.php/Cart/deleteCart',
					data:{
						cart_index:self.cart_index
					}
				}).then(res => {
				if (res.data.success) {
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					this.init()
					} else {
						uni.showToast({
						title: res.data.msg,
						icon: 'none'
						})
					}
				})
			},
			// 结算
			sumbit() {
				if (this.cart_index.length > 0) {
					uni.navigateTo({
						url: '../shop/confirmorder?cart_index=' + this.cart_index.toString()
					})
				} else {
					uni.showToast({
						title: '最少选择一个商品',
						icon: 'none'
					})
				}
			}
		},
		onReachBottom() {
			if (this.page < this.pageCount) {
				this.page++
				this.getSelectGoods()
			}
		},
		onLoad() {
			this.cdnUrl = this.$cdnUrl;
		},
		onShow() {
			let self = this
			self.page=1;
			self.pageCount=1
			self.goodsList = []
			self.init()
			self.getSelectGoods()
		},
		// 监听页面卸载事件
		onUnload() {
			this.cart_index = []
		},
		// 监听页面隐藏事件
		onHide() {
			this.cart_index = []
			this.allNum = 0;
			this.allSel = 0;
			// 判断是否有定时器任务，如果有清除定时器任务防止对后续页面产生影响
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.foot {
		width: 100%;
		display: flex;
		position: fixed;
		z-index: 4;
		bottom: 0rpx;
		height: 100rpx;
		.left {
			padding: 0 30rpx;
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FFFFFF;
		}

		.right {
			width: 200rpx;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			background: linear-gradient(180deg, #FF6351, #FF672D);
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.pageTitle {
		height: 88rpx;
		width: 100%;
		background-color: #FFFFFF;
		line-height: 88rpx;
		position: fixed;
		top: 0rpx;
		text-align: center;
		z-index: 3;

		.center {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}

		.right {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			position: absolute;
			right: 20rpx;
			top: 0rpx;
		}
	}

	.none_img {
		text-align: center;

		image {
			width: 470rpx;
			height: 345rpx;
			margin-top: 150rpx;
		}
	}

	.recommend {
		padding: 30rpx 24rpx 80rpx;
		background-color: #fff;

		.recommend_tit {
			text-align: center;
			display: flex;
			justify-content: center;

			// align-items: center;
			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 10rpx;
				vertical-align: middle;
			}
		}

		.common_goods {
			padding: 20rpx 5rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.common_con {
				width: 330rpx;
				// height: 600rpx;
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
						width: 130rpx;
						// height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						background: url(../../static/quan1.png) no-repeat;
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
					display: flex;
					justify-content: space-between;
					margin: 20rpx 16rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(255, 63, 63, 1);
					// margin-left: 16rpx;


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

	.msg {
		// background-color: #fff;
		border-radius: 10rpx;
		// background-color: #fff;

		.msg_tit {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			line-height: 80rpx;

			.tit_left {
				display: flex;
				max-width: 550rpx;

				.tit {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;

					.image1 {
						width: 37rpx;
						height: 33rpx;
						margin-right: 20rpx;
					}

					.image2 {
						width: 13rpx;
						height: 24rpx;
						margin: 0 10rpx;
					}
				}

				.choose {
					margin: 6rpx 30rpx;

					image {
						width: 36rpx;
						height: 36rpx;
					}
				}
			}

			.clear {
				padding-right: 30rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}
		}

		.choose1 {
			height: 160rpx;
			line-height: 160rpx;
			margin: 0 30rpx;

			image {
				width: 36rpx;
				height: 36rpx;
			}
		}

		.con {
			padding: 20rpx 30rpx 20rpx 0;
			display: flex;
			flex: 1;

			.img {
				margin-right: 20rpx;

				image {
					width: 140rpx;
					height: 140rpx;
				}
			}

			.right {
				flex: 1;

				.right_msg {
					height: 80rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					line-height: 40rpx;
				}

				.norms {
					display: inline-block;
					padding: 10rpx;
					background: rgba(245, 245, 245, 1);
					border-radius: 4rpx;
					color: rgba(153, 153, 153, 1);
					font-size: 24rpx;
				}

				.num {
					margin-top: 20rpx;
					font-family: PingFang SC;
					color: rgba(153, 153, 153, 1);
					display: flex;
					justify-content: space-between;

					.text1 {
						font-size: 22rpx;
						color: rgba(255, 54, 54, 1);
					}

					.text2 {
						font-size: 30rpx;
						color: rgba(255, 54, 54, 1);
					}

					.text3 {
						font-size: 20rpx;
						font-family: PingFang SC;
						font-weight: 400;
						text-decoration: line-through;
						color: #999999;
						margin-left: 10rpx;
					}

					.count {
						font-size: 30rpx;
						color: #999;

						.text4 {
							font: 22rpx;
						}
					}

					.num_count {
						image {
							width: 36rpx;
							height: 36rpx;
							vertical-align: middle;
						}

						text {
							margin: 0 30rpx;
						}
					}
				}
			}
		}

		.total_money {
			display: flex;
			justify-content: flex-end;
			padding: 30rpx 0;
			align-items: center;

			.money1 {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				text {
					color: #FD484F;
				}
			}

			.money2 {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				text-decoration: line-through;
			}

			.pay_btn {
				width: 160rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: #F6281B;
				border-radius: 30rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin: 0 30rpx;
			}
		}
	}

	.collect_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;

		.radio {
			margin-left: 30rpx;
		}

		.del {
			width: 150rpx;
			height: 60rpx;
			margin: 20rpx 30rpx;
			line-height: 60rpx;
			background: #FF3636;
			text-align: center;
			color: #fff;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			border-radius: 30rpx;
		}

		.bottom_right {
			.settlement {
				width: 200rpx;
				height: 100rpx;
				line-height: 100rpx;
				background: #25AE6D;
				text-align: center;
				color: #fff;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				margin-left: 20rpx;
			}
		}
	}

	.tit-tip {
		width: 90rpx;
		height: 30rpx;
		background: linear-gradient(-38deg, #FF6326, #FF4D5A);
		border-radius: 4rpx;
		color: #FFFFFF;
		line-height: 30rpx;
		font-size: 26rpx;
		text-align: center;
		margin-left: 10rpx;
		padding: 0 6rpx;
	}
</style>
