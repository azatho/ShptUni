<template>
	<view>
		<view class="top">
			<view v-if="videoBtn==1&&showVideo" class="video">
				<video style="position:relative;" :src="cdnUrl+storeInfo.storeInfo.video_url"
					:poster="cdnUrl+storeInfo.storeInfo.video_pic" object-fit="fill" :controls="true">
					<cover-image @click.stop="goback" src="../../static/backpage.png" class="backimg backimg1"  mode=""></cover-image>
					<cover-image @click.stop="gofenxiang" src="../../static/fenxiang.png" class="fenxiang fenxiang1"  mode=""></cover-image>
					<cover-view @click="vBtn(0)" :class="videoBtn==0?'videoBtn1':''" class="videoBtn"
						style="left: 305rpx;">
						视频
					</cover-view>
					<cover-view @click="vBtn(1)" :class="videoBtn==1?'videoBtn1':''" class="videoBtn"
						style="left: 385rpx;">
						图片
					</cover-view>
				</video>
			</view>
			<view v-if="videoBtn==0">
				<view>
					<image @click.stop="goback" src="../../static/backpage.png" class="backimg "
						style="position: absolute;" mode=""></image>
				</view>
				<view style="width: 100%;position: absolute;display: flex;flex-direction: row-reverse;">
					<image @click.stop="gofenxiang" src="../../static/fenxiang.png" class="fenxiang" mode=""></image>
				</view>
			</view>
			<swiper v-if="videoBtn==0" class="banner_img" :autoplay="true" :interval="2000" :duration="500">
				<block v-for="(item,index) in storeInfo.storeInfo.supplier_banner" :key="index">
					<swiper-item>
						<view class="swiper-item">
							<image :src="cdnUrl+item"></image>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<view v-if="showVideo">
				<view @click="vBtn(0)" :class="videoBtn==0?'videoBtn1':''" class="videoBtn" style="left: 305rpx;">视频
				</view>
				<view @click="vBtn(1)" :class="videoBtn==1?'videoBtn1':''" class="videoBtn" style="left: 385rpx;">图片
				</view>
			</view>
			<view v-if="videoBtn==0" class="total">共{{ storeInfo.storeInfo.supplier_banner.length }}张</view>
		</view>

		<view style="padding: 0 30rpx;">
			<view
				style="width: 100%;height: 160rpx;border-bottom: 2rpx soild #f5f5f5; display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;">
					<view>
						<image :src="$cdnUrl+storeInfo.storeInfo.supplier_icon" mode=""
							style="width: 120rpx;height: 120rpx;"></image>
					</view>
					<view style="margin-left: 30rpx;">
						<view>{{storeInfo.storeInfo.supplier_name}}</view>
						<view style="font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">
							{{$returnPeople(storeInfo.storeInfo.supplier_collect)}}人关注
						</view>
						<view @click="openIntro"
							style="display: flex;align-items: center;margin-top: 20rpx;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">
							店铺简介 <image src="../../static/shopIntroIcon.png" mode=""
								style="width: 27rpx;height: 27rpx;margin-left: 20rpx;"></image>
						</view>
					</view>
				</view>
				<view>
					<view :class="storeInfo.is_store==1?'selbtn':'btn'"
						@click="collection(storeInfo.storeInfo.supplier_id)">{{storeInfo.is_store==1?'已收藏':'收藏'}}</view>
				</view>
			</view>
			<!-- 客服按钮 -->
			<view>
				<image src="../../static/servier.png" mode=""
					style="width: 80rpx;height: 80rpx;position: fixed;right: 0rpx;bottom: 100rpx;z-index: 100;"
					@click.stop="goServer"></image>
			</view>
			<!-- 筛选列表内容 -->
			<view class="headTitle">
				<view class="headTitleItem font-24" @click="getColor(index)" :class="{action:headColor==index}"
					v-for="(item,index) in headTitlt" :key="index">
					<view style="display: flex;">
						<view>{{item}}</view>
						<view v-if="index>0" style="position: relative;">

							<image v-if="upSelct==0&&headColor==index"
								style="margin-left: 10rpx;width: 16rpx;height: 24rpx;"
								src="../../static/icon-jiantoushang.png" mode=""></image>
							<image v-if='upSelct==1&&headColor==index'
								style="margin-left: 10rpx;width: 16rpx;height: 24rpx;"
								src="../../static/icon-jiantouxia.png" mode=""></image>
							<image v-if='headColor!=index' style="margin-left: 10rpx;width: 16rpx;height: 24rpx;"
								src="../../static/icon-jiantoushang.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="common_goods">
					<u-waterfall v-model="shopList.list" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<block v-for="(item, i) in leftList" :key="i">
								<view class="common_con" @click="goshopDetail(item.goods_index)">
									<view class="">
										<image :src="$cdnUrl + item.goods_icon" mode=""></image>
										<view class="name">
											{{ item.goods_name }}
										</view>
										<view class="intro">{{item.goods_intro}}</view>
										<view class="price"
											style="display: flex;justify-content: space-between;align-items: center;">
											<view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}
											</view>
											<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}
											</view>
										</view>
									</view>
								</view>
							</block>
						</template>
						<template v-slot:right="{rightList}">
							<block v-for="(item, i) in rightList" :key="i">
								<view class="common_con" @click="goshopDetail(item.goods_index)"
									style="margin-left: 20rpx;">
									<view class="">
										<image :src="$cdnUrl + item.goods_icon" mode=""></image>
										<view class="name">
											{{ item.goods_name }}
										</view>
										<view class="intro">{{item.goods_intro}}</view>
										<view class="price"
											style="display: flex;justify-content: space-between;align-items: center;">
											<view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}
											</view>
											<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}
											</view>
										</view>
									</view>
								</view>
							</block>
						</template>
					</u-waterfall>
					<!-- 加载更多 -->
					<!-- <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
				</view>

			</view>
		</view>
		<!-- 客服弹窗 -->
		<u-mask :show="showService" @click="openService" style="text-align: center;">
			<view style="background-color: #FFFFFF;width: 500rpx;height: 600rpx;margin: 0 auto;margin-top: 350rpx;border-radius: 20rpx;">
				<view style="width: 100%;height: 70rpx;line-height: 70rpx;text-align: center;">联系客服</view>
				<scroll-view scroll-y="true" style="height: 530rpx;">
					<view
						style="border-top: 1rpx solid #F5F5F5;border-bottom: 1rpx solid #F5F5F5;height: 185rpx;text-align: left;padding-left: 100rpx;"
						v-for="(item,index) in serviceInfo" :key="index">
						<view style="padding-top: 15rpx;">{{item.service_name}} <span
								style="color: #999999;font-size: 22rpx;margin-left: 20rpx;">
								({{item.service_start}}--{{item.service_end}})</span></view>
						<view style="padding-top: 15rpx;color: #999999;">微信: <span
								style="color: #1E63B5;text-decoration: underline;">{{item.service_wechat}}</span>
							<image style="width: 30rpx;height: 30rpx;margin-left: 30rpx;"
								src="../../static/gysCopyPic1.png" mode="" @click.stop="fz(item.service_wechat)">
							</image>
						</view>
						<view style="padding-top: 15rpx;color: #999999;">电话: <span
								style="color: #1E63B5;text-decoration: underline;">{{item.service_phone}}</span>
							<image style="width: 30rpx;height: 30rpx;margin-left: 30rpx;" src="../../static/tel.png"
								mode="" @click.stop="getPhone(item.service_phone)"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<view>
				<image src="../../static/icon-chahao.png" mode="" style="margin-top: 40rpx;width: 44rpx;height: 44rpx;">
				</image>
			</view>
		</u-mask>
		<u-mask :show="show" @click="show = false">
			<view class="shopInor">
				<view style="position:absolute;right: 0rpx;top: -30rpx;">
					<image src="../../static/tcdel.png" mode="" style="width: 48rpx;height: 48rpx;"></image>
				</view>
				<view>
					<image src="../../static/shopTitle.png" mode=""
						style="padding-top: 100rpx;width: 142rpx;height: 34rpx;"></image>
				</view>
				<scroll-view scroll-y="true" style="height: 600rpx;">
					<view
						style="overflow: hidden;text-overflow:ellipsis;;margin-top: 20rpx;text-align: left;margin: 0 auto;width: 440rpx;font-weight: 300;">
						{{storeInfo.storeInfo.supplier_desp}}
					</view>
				</scroll-view>

			</view>
		</u-mask>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serviceInfo: "", //客服信息
				showService: false, //客服弹窗
				videoBtn: 0, //视频按钮
				cdnUrl: '',
				changeBtn: [
					{
						index: '0',
						name: '图片'
					}
				],
				currentChange: '0',
				showVideo: false,
				showImg: false,
				show: false, //控制模态框
				leftList: [], //瀑布流左边数据
				rightList: [], //瀑布流右边数据
				headTitlt: ["综合", "销量", "价格"], //筛选条件
				shopId: "", //供应商ID
				storeInfo: {
					storeInfo: {
						supplier_banner: [],
						supplier_icon: "",
					}
				}, //供应商信息
				headColor: 0, //选中的筛选条件
				page: 1, //当前页数
				pageIndex: "", //最大页数
				shopList: {
					list: [] //商品数据类表
				}, //店铺商品信息
				upSelct: 0, //排序条件
			}
		},
		onShow() {

		},
		onLoad(option) {
			this.shopId = option.id;
			this.cdnUrl = this.$cdnUrl
			this.init();
			this.getServer();
		},
		onReachBottom() {
			if (this.page < this.pageIndex) {
				this.page++
				this.init()
			}
		},
		methods: {
			// 去分享页面
			gofenxiang() {
				uni.navigateTo({
					url: '../my/inviteToRegister/allowInvite'
				})
			},
			// 获取店铺客服信息
			getServer() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/UserSupplier/getServiceStore',
					data: {
						supplier_id: self.shopId
					}
				}).then(res => {
					if (res.data.success) {
						self.serviceInfo = res.data.data
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			// 关闭客服弹窗
			openService() {
				this.showService = false;
			},
			// 返回上级页面
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			openIntro() {
				this.videoBtn = 0
				this.show = true;
			},
			// 打电话
			getPhone(e) {
				uni.makePhoneCall({
					phoneNumber: e
				});
			},
			// 复制
			fz(id) {
				let self = this
				uni.setClipboardData({
					data: id,
					success: function(data) {
						uni.getClipboardData({
							success: function(data) {
								self.holo.toast({
									icon: 'none',
									title: '复制成功~'
								})
							},
							fail: function(err) {},
							complete: function(res) {}
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
			},
			// 跳转到美洽页面
			goServer() {
				this.videoBtn = 0;
				this.showService = true;
			},
			// 切换按钮
			vBtn(e) {
				e == 0 ? this.videoBtn = 1 : this.videoBtn = 0
			},
			// 跳转至商品详情
			goshopDetail(e) {
				uni.navigateTo({
					url: 'goodsDeatil?id=' + e
				})
			},
			// 收藏取消店铺
			collection(e) {
				let status = '';
				let self = this;
				self.storeInfo.is_store == 1 ? status = 2 : status = 1
				self.request({
					url: 'ShptUapi/public/index.php/UserSupplier/collectStore',
					data: {
						supplier_id: e,
						status: status
					}
				}).then(res => {
					if (res.data.success) {
						self.storeInfo.is_store = status;
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
			},
			//点击头部切换
			getColor: function(e) {
				if (this.headColor == e) {
					this.upSelct == 0 ? this.upSelct = 1 : this.upSelct = 0
				}
				this.headColor = e;
				this.page = 1;
				this.pageIndex = 1;
				this.shopList.list = [];
				this.$refs.uWaterfall.clear();
				console.log(this.shopList.list)
				this.getShopList();
			},
			// 获取店铺商品信息
			getShopList() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/index/getShopList',
					data: {
						page: self.page,
						count: 10,
						type: self.headColor,
						goods_search: self.upSelct,
						goods_supplier: self.shopId
					}
				}).then(res => {
					console.log(res)
					if (res.data.success) {
						self.pageIndex = res.data.data.total_page
						console.log(self.shopList.list.length)
						self.shopList.list.length > 0 ? self.shopList.list = [...self.shopList.list, ...res.data
								.data.list
							] :
							self.shopList.list = res.data.data.list
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			// 获取店铺主页下信息
			init() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/UserSupplier/getStore',
					data: {
						goods_supplier: self.shopId,
					}
				}).then(res => {
					if (res.data.success) {
						self.storeInfo = res.data.data
						if (self.storeInfo.storeInfo.video_url != '') {
							self.showImg = false,
							self.showVideo = true
							self.changeBtn = [{
						index: '0',
						name: '视频'
					},{
								index: '1',
								name: '图片'
							}]
						}
						this.getShopList()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			//切换视频图片
			getChange(e) {
				var index = e
				if (index == 1) {
					this.currentChange = index,
						this.showImg = true,
						this.showVideo = false
				} else {
					this.currentChange = index,
						this.showImg = false,
						this.showVideo = true
				}
			},
		}
	}
</script>

<style scoped lang="scss" scoped>
	.cover{
		z-index: 99999;
		position: absolute;
		top: var(--status-bar-height);
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.fenxiang {
		z-index: 99999;
		margin-right: 30rpx;
		margin-top: var(--status-bar-height);
		width: 55rpx;
		height: 55rpx;
	}
  
	.backimg {
		z-index: 99999;
		margin-left: 30rpx;
		margin-top: var(--status-bar-height);
		width: 55rpx;
		height: 55rpx;
	}
	.backimg1{
		position: absolute;
		top: 0rpx;
		left: 0rpx;
	}
	
	.fenxiang1{
		position: absolute;
		top: 0;
		right: 0rpx;
	}
	.videoBtn {
		z-index: 9999;
		width: 60rpx;
		height: 30rpx;
		background-color: #FFFFFF;
		font-size: 20rpx;
		text-align: center;
		line-height: 30rpx;
		border-radius: 15rpx;
		position: absolute;
		bottom: 30rpx;
	}

	.videoBtn1 {
		background-color: rgba(255, 255, 255, 0.3)
	}

	.top {
		width: 100%;
		height: 424rpx;
		position: relative;

		.change {
			position: absolute;
			bottom: 65rpx;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			z-index: 1111;

			view {
				width: 90rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				background: rgba(255, 255, 255, .3);
				border-radius: 30rpx;
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 300;
				color: rgba(51, 51, 51, 1);
				margin: 0 10rpx;
			}

			.selected {
				background: rgba(255, 255, 255, 1);
			}
		}

		.video {
			width: 100%;
			height: 100%;
			position: relative;

			video {
				width: 100%;
				height: 100%;
			}
		}

		.banner_img {
			width: 100%;
			height: 424rpx;
			// height: 100%;

			image {
				width: 100%;
				height: 424rpx;
				// height: 100%;
			}
		}

		.total {
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			padding: 0 10rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			color: #fff;
			background: rgba(0, 0, 0, .3);
			border-radius: 15rpx;
			font-size: 20rpx;
		}
	}


	.shopInor {
		position: relative;
		text-align: center;
		margin: 0 auto;
		margin-top: 200rpx;
		width: 604rpx;
		height: 850rpx;
		background-size: 604rpx 850rpx;
		background-repeat: no-repeat;
		background-image: url(data:image/png;base64,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);
	}

	.icon-style {
		color: #CCCCCC;
	}

	.icon-style1 {
		color: #333333;
	}

	.common_goods {
		padding: 20rpx 5rpx;
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

	// 头部内容
	.headTitle {
		height: 60rpx;
		line-height: 60rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;

		.headTitleItem {
			margin-top: 10rpx;
			text-align: center;
		}

		.action {
			color: red;
		}
	}

	.btn {
		width: 100rpx;
		height: 42rpx;
		line-height: 42rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: linear-gradient(180deg, #FF6351, #FF672D);
		border-radius: 21px;
	}

	.selbtn {
		width: 100rpx;
		height: 42rpx;
		line-height: 42rpx;
		text-align: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		background: #FFFFFF;
		border-radius: 21px;
		border: 2rpx solid #999999;
	}
</style>
