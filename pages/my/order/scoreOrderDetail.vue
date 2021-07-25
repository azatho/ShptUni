<!-- 订单详情页面 -->
<template>
	<view>
		<!-- 头 -->
		<u-navbar :is-back="false"  title="订单详情">
			<image src="../../../static/backarrow.png" style="width: 20rpx;height: 36rpx;margin-left: 20rpx;" mode="" @click.stop="goIntegralOrder"></image>
		</u-navbar>
		<view class="head">
			{{orderInfo.order_status==0?'已取消':orderInfo.order_status==1?'待支付':orderInfo.order_status==2?'待发货':orderInfo.order_status==3?'待发货':orderInfo.order_status==4?'已部分发货':orderInfo.order_status==5?'待收货':orderInfo.order_status==6?'已完成':''}}
		</view>
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 地址 -->
		<view class="site">
			<view class="img">
				<image src="../../../static/address1.png"></image>
				<view class="center">
					<view class="txt">{{orderInfo.order_contacts}}<text>{{orderInfo.order_phone}}</text></view>
					<view class="dizhi">{{orderInfo.order_province+orderInfo.order_city+orderInfo.order_county+orderInfo.order_address}}</view>
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 商品详情 -->
		<view class="list">
			<view class="one" @click="goShop(orderInfo.order_supplier,orderInfo.supplier_status)">
				<view class="left">
					<image src="../../../static/case.png" class="img1"></image>
					{{orderInfo.supplier_name}}
					<image src="../../../static/back1.png" class="img2"></image>
				</view>
			</view>
			<!-- 确认收货时显示的样式 -->
			<block v-for="(items,k) in goods_list" :key="k">
				<view class="two" @click="goDetail(items.goods_index,items.goods_id,items.goods_status,items.jump_type)">
					<view class="img">
						<image :src="$cdnUrl+items.image" v-if="items.image"></image>
						<view v-else
							style="width: 100%;height: 100%;border:1px solid #f5f5f5;color:#ccc; text-align: center; line-height: 160rpx;">
							暂无图片
						</view>
					</view>
					<view class="details">
						<view class="title">
						<text style="margin-right: 10rpx;width:80rpx;height: 30rpx;border-radius: 4rpx;background: linear-gradient(30deg, #FD4950, #FF6F60); color: #FFFFFF;">积分</text>
						{{items.goods_name || '暂无名称'}}</view>
						<view style="display: flex;justify-content: space-between;align-items:center">
							<view class="bgc">{{items.sku_name?items.sku_name:'无'}}</view>
							<view class="xia">
								<view class="num">×{{items.goods_count?items.goods_count:'暂无'}}</view>
							</view>
						</view>
						<view class="xia">
							<view class="univalence">
								{{items.sku_hot_integral!=0?items.sku_hot_integral/100+'积分':''}}
								</view>
								<view style="display: flex;">
								<!-- 	<view class="btn2" style="margin-right: 20rpx;" v-if="items.goods_order_status==2"
											@click.stop="goEvalute(items)">
											去评价</view>
									<view class="btn2" v-if="(items.goods_order_status>1)&&(items.goods_exchange_type==1||items.goods_return_type==1)&&items.complete!=1"
										@click.stop="afterSale(items)">
										{{items.goods_after_sale==0?"申请售后":items.complete==0?'售后中':''}}</view> -->
								</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 备注 -->
			<view class="remark">
				<view>备注</view>
				<view class="txt2">{{orderInfo.order_remark?orderInfo.order_remark:'你没有填写备注'}}</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 订单价格 -->
		<view class="price">
			<view class="goodprice">
				<view class="one">商品积分</view>
				<view class="two">
					{{orderInfo.order_integral/100}}积分
				</view>
			</view>
			<view class="goodprice">
				<view class="one1">订单总价</view>
				<view class="two1">
					{{orderInfo.order_integral/100}}积分
				</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view style="width: 100%; height: 20rpx; background-color: #F5F5F5;"></view>
		<!-- 订单信息 -->
		<view class="order">
			<view class="txt"><text></text>订单信息</view>
			<view class="serial">
				<view>订单编号：{{orderInfo.order_id}}</view>
				<view class="copy" @click="fz(orderInfo.order_id)">复制</view>
			</view>
			<view class="serial">下单时间：{{$time(orderInfo.order_time,1)}}</view>
			<view class="serial" v-if="orderInfo.order_status==0">取消时间：{{$time(orderInfo.cancel_time,1)}}</view>
			<view class="serial" v-if="orderInfo.order_status!=0&&orderInfo.order_status!=1">
				支付时间：{{$time(orderInfo.payment_time,1)}}</view>
			<view class="serial" v-if="orderInfo.order_status==5||orderInfo.order_status==6">
				发货时间：{{$time(orderInfo.fahuo_time,1)}}</view>
			<view v-if="orderInfo.order_status==6">收货时间：{{$time(orderInfo.confirm_time,1)}}</view>
		</view>

		<!-- 按钮 -->
		<view class="btn" >
			<view
				:class="orderInfo.order_status==5||orderInfo.order_status==1?'btn1':orderInfo.order_status==2?'bttn2':''"
				v-if="orderInfo.order_status!=3 && orderInfo.order_status!=4"
				@click="getStatus(orderInfo.order_status,orderInfo.order_index,orderInfo.order_type,orderInfo.order_integral,orderInfo.user_coupon)">
				{{orderInfo.order_status==1?'去支付':orderInfo.order_status==2?'该订单不支持退款':orderInfo.order_status==5?'确认收货':''}}
			</view>
			<view class="btn2" v-if="orderInfo.order_status==1" @click="cancleOrder(orderInfo.order_index)">
				取消订单
			</view>
			<view class="btn3" v-if="orderInfo.order_status>4"
				@click="gowuliu(orderInfo.order_index)">
				查看物流
			</view>
			<view  class="btn2" v-if="orderInfo.order_status==0" style="color: #999999;border-color: #999999;">已取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_index: '', //订单自增编号
				time: true, //订单是否取消==>送达时间
				orderInfo: {},
				cdnUrl: '',
				goods_list: [],
				data: '', //
			}
		},
		methods: {
			goIntegralOrder(){
				uni.redirectTo({
					url:"scoreOrder"
				})
			},
			// 去评价页面
			goEvalute(e){
				uni.navigateTo({
					url:'../evaluate/evaluate?index='+e.order_goods_index+'&icon='+e.image+'&goods_name='+e.goods_name
				})
			},
			// 获取订单详情信息
			init() {
				let self = this;
				self.request({
					url: 'ShptUapi/public/index.php/Order/orderDetailV2',
					data: {
						order_index: self.order_index
					},
				}).then(res => {
					if (res.data.success) {
						self.goods_list = res.data.data.goods
						self.orderInfo = res.data.data
					} else {
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}, rej => {
					console.log(rej);
				})
			},
			//去店铺主页
			goShop(id, supplier) {
				if (supplier != 2) {
					uni.navigateTo({
						url:'../evaluate/nocommunity?supplier=1'
					})
				} else {
					uni.navigateTo({
						url:"../../shop/ShopHomepage?id="+id
					})
				}
			},
			// 去对应的商品页面
			goDetail(index, id, status, type) {
				if (type == '3') {
					uni.navigateTo({
						url: '../group/seckillDetail?skill_id=' + id
					})
				} else {
					if (status == '2') {
						uni.navigateTo({
                            url:'../../shop/couponGoodsDetail?id=' + index
							// url: '../common/goodsDetail?id=' + index
						})
					} else {
						uni.navigateTo({
							url: '../evaluate/nocommunity'
						})
					}
				}
			},
			// 申请售后按钮
			afterSale(e) {
				if(e.goods_after_sale==0){
					uni.navigateTo({
						url:"../afterSales/afterSales?info="+JSON.stringify(e)
					})
				}else{
					let type='';
					e.goods_after_sale==2?type=0:type=1
					uni.navigateTo({
						url:"../afterSales/salesList?type="+type+'&page=1'
					})
				}
				
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
			// 底部按钮
			//取消订单
			cancleOrder(e) {
				let self = this;
				uni.showModal({
					content: '确定取消吗？',
					success: function(res) {
						if (res.confirm) {
							self.request({
								url: 'ShptUapi/public/index.php/Order/cancelOrder',
								data: {
									order_index: e,
								},
							}).then(res => {
								if (res.data.success) {
									uni.showToast({
										title: res.data.msg
									})
									self.init()
								} else {
									uni.showToast({
										icon: 'none',
										title: res.data.msg
									})
								}
							}, rej => {
								console.log(rej);
							})
						} else if (res.cancel) {}
					}
				})
			},
			//根据不同状态进行不同操作
			getStatus(e, order_index, order_type, order_total_price, user_coupon) {
				let self = this;
				if (e == 6) { //去评价页面
					uni.navigateTo({
						url: './publishComment?index=' + order_index
					})
				} else if (e == 1) { //去支付==>直接支付
					uni.navigateTo({
						url:"../../shop/payCouponOrder?order_index="+order_index+'&order_integral='+order_total_price
					})				
				} else if (e == 5 || e == 4) { // 4/5查看物流 / 5确认收货==>收货接口
					self.request({
						url: 'ShptUapi/public/index.php/Order/confirmOrder',
						data: {
							order_index: order_index,
						},
					}).then(res => {
						if (res.data.success) {
							uni.showToast({
								icon:'success',
								title: res.data.msg
							})
							self.page = 1
							self.orderList = []
							self.init()
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						}
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 查看物流
			gowuliu(order_index) {
				uni.navigateTo({
					url: 'logisticsInfo?order_index='+order_index+'&type=1'
				})
			},
		},
		onLoad(option) {
			this.order_index=option.id
			this.cdnUrl = this.$cdnUrl
			this.init()
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
	.bttn2{
		text-align: center;
		color:#999999 ;
		width: 310rpx;
		height: 70rpx;
		line-height: 70rpx;
		background: #FFFFFF;
		border: 1rpx solid #999999;
		border-radius: 35rpx;
	}
	.head {
		width: 750rpx;
		height: 70rpx;
		background: #F6281B;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 70rpx;
		padding: 0 30rpx;
	}

	/* 地址 */
	.site {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 30rpx 20rpx;
		background-color: #FFFFFF
	}

	.site image {
		width: 100%;
		height: 100%;
	}

	.site .img {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.img image {
		width: 64rpx;
		height: 64rpx;
	}

	.site .img .center {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-left: 30rpx;
		width: 470rpx;
	}

	.img .center .txt {
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}

	.center .txt text {
		font-size: 24rpx;
		color: #999999;
		margin-left: 10rpx;
	}

	.img .center .dizhi {
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.site .right {
		width: 17rpx;
		height: 32rpx;
	}

	/* 送达时间 */
	.time {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		border-top: 1rpx solid #F5F5F5;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		background-color: #FFFFFF
	}

	.time .txt2 {
		font-size: 26rpx;
		font-weight: 400;
		color: #F6281B;
	}

	.time .txt3 {
		font-size: 26rpx;
		font-weight: 400;
		color: #CCCCCC;
	}

	.time image {
		width: 17rpx;
		height: 32rpx;
		margin-left: 20rpx;
		vertical-align: middle;
	}

	/* 订单详情 */
	.list {
		background-color: #FFFFFF;
		padding: 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.list image {
		width: 100%;
		height: 100%;
	}

	.list .one {
		display: flex;
		justify-content: space-between;
		font-family: Source Han Sans CN;
		font-size: 30rpx;
	}

	.list .one .left {
		font-weight: 400;
		color: #333333;
		display: flex;
		align-items: center;
	}

	.list .one .img1 {
		width: 37rpx;
		height: 33rpx;
		margin-right: 10rpx;
	}

	.list .one .img2 {
		width: 13rpx;
		height: 26rpx;
		padding-top: 4rpx;
		margin-left: 20rpx;
	}

	.list .two {
		display: flex;
		border-bottom: 1rpx solid #F5F5F5;
		padding: 30rpx 0;
		box-sizing: border-box;
	}

	.list .two .img {
		width: 160rpx;
		height: 160rpx;
		margin-right: 20rpx;
	}

	.list .two .details {
		flex: 1;
	}

	.two .details .title {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.two .details .bgc {
		height: 40rpx;
		background: #F5F5F5;
		border-radius: 4rpx;
		line-height: 40rpx;
		/* text-align: center; */
		overflow: hidden;
		padding: 0 15rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		margin: 20rpx 0;
	}

	.two .details .xia {
		display: flex;
		justify-content: space-between;
		font-family: Source Han Sans CN;
	}

	.details .xia .univalence {
		font-size: 30rpx;
		font-weight: 400;
		color: #FF3636;
	}

	.details .xia .btn2 {
		width: 140rpx;
		height: 48rpx;
		border: 1rpx solid #F6281B;
		border-radius: 24rpx;
		line-height: 48rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #F6281B;
	}

	.details .xia .num {
		font-size: 26rpx;
		font-weight: 300;
		color: #999999;
	}

	.list .remark {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-top: 20rpx;
	}

	.list .remark .txt2 {
		margin-top: 20rpx;
		font-size: 26rpx;
		font-weight: 400;
	}

	/* 价格单元 */
	.price {
		padding: 20rpx 30rpx 0;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		background-color: #FFFFFF;
	}

	.price .goodprice {
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
	}

	.price .goodprice .one1 {
		color: #333333;
	}

	.price .goodprice .two1 {
		color: #FF3F3F;
	}

	/* 订单信息 */
	.order {
		width: 100%; 
		padding: 35rpx 30rpx;
		background-color: #FFFFFF;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9A9A9A;
		box-sizing: border-box;
		margin-bottom: 130rpx;

	}

	.order .txt {
		display: flex;
		align-items: center;
	}

	.order .txt text {
		display: inline-block;
		width: 4rpx;
		height: 30rpx;
		background: #F6281B;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.order .txt {
		font-size: 30rpx;
		font-weight: 500;
		color: #343434;
		padding-bottom: 30rpx;
	}

	.order .serial {
		display: flex;
		justify-content: space-between;
		padding-bottom: 25rpx;
	}

	.order .serial .copy {
		text-decoration: underline;
		color: #F6281B;
	}

	/* 按钮 */
	.btn {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row-reverse;
		width: 749rpx;
		height: 90rpx;
		background: #FFFFFF;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.btn .btn1 {
		width: 180rpx;
		height: 70rpx;
		padding: 0 10rpx;
		background: #F6281B;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #FFFFFF;
		margin-left: 40rpx;
	}

	.btn .btn2 {
		width: 180rpx;
		height: 70rpx;
		padding: 0 10rpx;
		border: 1rpx solid #F6281B;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #F6281B;
	}

	.btn .btn3 {
		width: 190rpx;
		height: 70rpx;
		padding: 0 10rpx;
		border: 1rpx solid #F6281B;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: Source Han Sans CN;
		font-weight: 300;
		color: #F6281B;
	}
</style>


