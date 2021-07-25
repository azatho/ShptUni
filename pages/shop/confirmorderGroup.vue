<template>
	<view class="">
		<!-- 选择地址栏 -->
		<view style="width: 100%;height: 20rpx;"></view>
		<view v-if="showAddress" class="address" @click="goAddress" style="background-color: #FFFFFF;">
			<view class="img">
				<image src="../../static/address1.png" mode=""></image>
			</view>
			<view class="right" >
				<view class="right_msg">
					{{addressInfo.contacts}}
					<text>{{addressInfo.phone}}</text>
				</view>
				<view class="address_msg">{{addressInfo.address}}</view>
				<image src="../../static/back.png" mode=""></image>
			</view>
		</view>
		<view v-else class="noAddress" @click="goAddress" style="font-size: 26rpx;background-color: #FFFFFF;">
			您暂时还没有收货地址,去设置地址
		</view>
		<!-- 分割线 -->
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
		<!-- 商品显示  商品详情直接购买下单-->
		<view class="msg">
			<view class="tit">
				<!-- @click="goShop(orderInfo.order_supplier)" -->
				<image src="../../static/case.png" mode=""></image>
				{{goods_info.supplierInfo.supplier_name}}
			</view>
			<view>
				<view v-for="(item,i) in goods_list" :key="i" class="con" >
					<view class="img">
						<image :src="cdnUrl+item.goods_icon" mode=""></image>
					</view>
					<view class="right">
						<view class="right_msg">
						{{item.goods_name}}
						</view>
						<view class="norms">{{item.skuInfos?item.skuInfos:'无'}}</view>
						<view class="num">
							<view>
								<text class="text1">￥</text>
								<text class="text2">{{$returnFloat(item.goods_cost)}}</text>
							</view>
							<!-- <view class="count">
								<text class="text4">×</text>
								{{item.goods_count?item.goods_count:'暂无'}}
							</view> -->
						</view>
					</view>
				</view>
			</view>
			<view class="remark">
				<textarea value="" placeholder="给商家留言（选填）" @input="getContent" />
			</view>
		</view>
		

		<!-- 分割线 -->
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;" v-if="!type"></view>
		
		<!-- 订单价个显示 -->
		<view class="base_msg" v-if='!type'>
			<view class="msg_con">
				<view class="">商品总价</view>
				<view class="">￥{{goods_info.total_price/100?$returnFloat(goods_info.total_price):'0'}}</view>
			</view>
			<view class="msg_con" v-if='goods_info.goods_gold>0'>
				<view class="">金币</view>
				<view class="">{{goods_info.goods_gold/100}}金币</view>
			</view>
			<view class="msg_con">
				<view class="total">订单总价</view>
				<view class="price">{{goods_info.total_price!=0?'￥'+$returnFloat(goods_info.total_price):'0'}}
                {{goods_info.goods_gold>0?"+"+$returnFloat(goods_info.goods_gold)+'金币':''}}
				</view>
			</view>
		</view>
		<view class="base_msg" v-else>
			<view class="msg_con">
				<view class="">商品总价</view>
				<view class="">￥{{carGoodsInfo.order_price/100?carGoodsInfo.order_price/100:'0'}}</view>
			</view>
			<view class="msg_con">
				<view class="">配送费</view>
				<view class="">￥{{carGoodsInfo.freightInfo/100||'0'}}</view>
			</view>
			<view class="msg_con">
				<view class="total">订单总价</view>
				<view class="price">{{carGoodsInfo.total_price!=0?'￥'+carGoodsInfo.total_price/100:'0'}}
				</view>
			</view>
		</view>
		
		<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>	
		<view style="background-color: #f5f5f5;width: 100%;height: 156rpx;"></view>
		<view class="sumbit_bgc">
			<view class="sumbit" @click="sure">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	jweixin
	// } from "../../until/jweixin.js";
	export default {
		data() {
			return {
				goods_index:"",	// 商品ID
				group_goods_index:"",//活动ID
				group_index:"",//活动时间ID
				carOrder_remark:{},//购物车提交订单备注
				carGoodsInfo:[],//购物车订单信息
				// :{},//购物车订单信息
				orderInfor:"",//订单信息
				type:0,//判断是否为购物车订单
				cash:"",//我的余额
				cdnUrl: '',
				tuan_id: '', //团id
				sku_index: '', //规格id
				goods_count: '', //数量
				goods_info: {
					supplierInfo:{
						supplier_name:"",
					}
				}, //订单全部信息
				goods_list: {}, //商品信息
				addressInfo: {}, //地址信息
				showAddress: false,
				address_id: '', //收获地址id
				order_remark: '', //订单备注
				express_price: '', //配送费
				orderType: '', //判断是拼团还是普通商品提交的订单
				total_money: '', //订单总价
				total_price: '', //商品总价
				payInfo: {}, //提交订单返回的结果
				cart_index: '', //购物车提交订单时cart_index
				showOrderStatus: false,
				order_index: '', //查询订单支付结果
				price: '',
				flag: false,
				opType: "",
			}
		},
		methods: {
			//获取地址
			getAddress() { 
				let self = this
				self.request({
					url: "ShptUapi/public/index.php/Address/addressList",
					data:{}
				}).then(res => {
					if (res.data.data.list.length != 0) {
						for (let i = 0; i < res.data.data.list.length; i++) {
							if (res.data.data.list[i].default_address == '1') {
								self.showAddress = true
								self.addressInfo = res.data.data.list[i]
								self.address_id = res.data.data.list[i].index
							}
							
							this.init()
						}
					} else {
						self.showAddress = false
						self.addressInfo = {}
						self.address_id = ''
						this.init()
					}
				})
			},
			// 跳转至地址列表页面
			goAddress() {
				uni.navigateTo({
					url: '../my/adress/addressList?type=1'
				})
			},
			// 活动订单提交
			submit(){
				let self = this;
				self.request({
					url:'ShptUapi/public/index.php/order/activity_submit_order',
					data:{
						group_goods_index:self.group_goods_index,
						group_index:self.group_index,
						order_remark:self.order_remark,
						address_id:self.address_id,
					}
				}).then(res => {
				if (res.data.success) {
					console.log(res)
					uni.navigateTo({
						url:'payGroupOrder?order_index='+res.data.data.order_index
					})
					} else {
						uni.showToast({
						title: res.data.msg,
						icon: 'none'
						})
					}
				})
			},
			//确认订单
			init() {
				let self = this
				self.request({
					url: 'ShptUapi/public/index.php/order/activity_confirm_order',
					data: {
						group_goods_index: self.group_goods_index,
						group_index: self.group_index,
						address_id:self.address_id
					},
				}).then(res => {
                    console.log(res)
					if (res.data.success) {
						self.goods_info = res.data.data;
						self.goods_list = res.data.data.goodsInfo;
					}
				})
			},
			//提交订单
			sure() {
				let self = this
				if (this.address_id == '') {
					uni.showToast({
						icon: 'none',
						title: '还未添加收货地址'
					})
					return
				}
				self.submit();
			},
			// 获取留言信息
			getContent(e) {
				this.order_remark = e.detail.value
			},
		},
		// 监听页面被隐藏
		onHide(){
			uni.removeStorageSync('addressList')
		},
		// 监听页面被卸载
		onUnload(){
			uni.removeStorageSync('addressList')
		},
		onShow() {
			if(uni.getStorageSync('addressList')){
				this.addressInfo=uni.getStorageSync('addressList')
				this.address_id=this.addressInfo.index
				this.showAddress=true
			}else{
				this.getAddress()
			}
		},
		onLoad(option) {
			this.cdnUrl = this.$cdnUrl
			this.group_goods_index=option.group_goods_index;
			this.group_index=option.group_index
			
		}
	};
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.noAddress {
		padding: 30rpx;
	}

	.tit-tip{
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
	.address {
		padding: 20rpx 30rpx;
		display: flex;
		border-top: 1rpx solid #f5f5f5;

		.img {
			margin-right: 20rpx;

			image {
				width: 58rpx;
				height: 58rpx;
			}
		}

		.right {
			flex: 1;
			position: relative;

			.right_msg {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);

				text {
					font-size: 24rpx;
					color: rgba(153, 153, 153, 1);
					margin-left: 10rpx;
				}
			}

			.address_msg {
				font-size: 26rpx;
				font-weight: 400;
				margin-top: 10rpx;
			}

			image {
				width: 18rpx;
				height: 32rpx;
				position: absolute;
				top: 20rpx;
				right: 30rpx;
			}
		}
	}

	.order_status {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 90rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.status {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			image {
				width: 44rpx;
				height: 44rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}

		.pt {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.time {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FD4950;

			image {
				width: 17rpx;
				height: 32rpx;
				vertical-align: middle;
				margin-left: 20rpx;
			}

			.txt {
				color: #999;
			}
		}
	}

	.msg {
		// margin: 15rpx 0;
		background-color: #fff;
		padding: 20rpx 0;
		border-radius: 10rpx;

		.tit {
			padding: 0 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);

			image {
				width: 37rpx;
				height: 33rpx;
				vertical-align: middle;
				margin-right: 20rpx;
			}
		}

		.con {
			margin-top: 30rpx;
			// height: 160rpx;
			padding: 20rpx 30rpx;
			display: flex;
			flex-wrap: wrap;
			border-top: 1rpx solid #f5f5f5;

			.img {
				margin-right: 20rpx;

				image {
					width: 160rpx;
					height: 160rpx;
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

					.count {
						font-size: 30rpx;
						color: #999;

						.text4 {
							font: 22rpx;
						}
					}
				}
			}
		}

		.remark {
			box-sizing: border-box;
			height: 150rpx;
			background-color: #f5f5f5;
			margin: 20rpx 30rpx 0 30rpx;
			padding: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			border-radius: 10rpx;

			textarea {
				font-size: 26rpx;
				width: 100% !important;
				height: 100% !important;
			}
		}
	}

	.base_msg {
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		.msg_con {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 30rpx;

			.total {
				color: #333;
			}

			.price {
				color: #FF3F3F;
			}
		}

		.msg_con:first-child {
			margin-top: 0;
		}
	}

	.sumbit_bgc {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 100rpx;
		position: fixed;
		bottom: 20rpx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 2rpx solid #f5f5f5;

		.money {
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;

			text {
				color: #FC4950;
			}
		}

		.sumbit {
			width: 690rpx;
			height: 90rpx;
			background: #FF6351;
			border-radius: 35rpx;
			line-height: 90rpx;
			text-align: center;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			border-radius: 45rpx;
		}
	}

	.common {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 22222;

		.common_con {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 650rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 30rpx 30rpx 0px 0px;

			.close {
				position: absolute;
				right: 30rpx;
				top: 30rpx;
				color: #999999;
			}

			.common_tit {
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				border-bottom: 2rpx solid #f5f5f5;
			}

			.intro {
				display: flex;
				height: 530rpx;

				.classify_left {
					width: 140rpx;
					height: 100%;
					background-color: #f5f5f5;

					.style {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #333;
						background-color: #fff;
					}

					.style1 {
						height: 90rpx !important;
						line-height: 90rpx;
						text-align: center;
						font-size: 26rpx;
						color: #333;
					}
				}

				.classify_right {
					flex: 1;
					box-sizing: border-box;

					.con {
						padding: 0 30rpx;
						display: flex;
						justify-content: space-between;
						height: 90rpx;
						line-height: 90rpx;
						border-bottom: 2rpx solid #f5f5f5;
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;

						.time1 {
							color: #FD4950;
						}
					}
				}
			}
		}
	}

	.getScore-box {
		height: 96rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32rpx;

		.gs-right {
			display: flex;
			align-items: center;
		}
	}
</style>
