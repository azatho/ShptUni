<!-- 积分兑换记录 -->
<template>
	<view class="box">
		<view v-if="exchangeList.length==0" style="text-align:center;"> 
			<image src="../../../static/nodata.png" alt="暂无数据" style="margin-top: 200rpx;width: 480rpx;height: 360rpx;"></image>
			<view class="font-30" style="color: #999999;">暂无数据</view>
		</view>
		<view class="boxItem" v-else v-for="(item,index) in exchangeList" @click="goInfor(item)">
				<view class="itemTime">
						{{formatTime(item.order_time)}}
				</view>
				<view class="itemConten">
					<view class="itemImg">
						<image :src="$cdnUrl+item.goods_icon" mode=""></image>
					</view>
					<view class="itemText">
						{{item.goods_name}}
					</view>
					<view class=" ">
						<!-- 对应下商品type的价格显示 -->
						<view class="font-24" style="align-items: center;">
							<view style="font-size: 24rpx;" >{{'-'+$returnFloat(parseInt(item.order_integral))}}积分
							</view>
						</view>
					</view>
					<view style="margin-left: 30rpx;"><image style="width: 13rpx;height: 26rpx;" src="../../../static/back1.png" mode=""></image></view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() { 
			return {
				pageIndex:0,//默认起始页
				exchangeList:[],//兑换记录
			}
		},
		// 下拉生命周期事件
		onReachBottom(){
			if(this.pageIndex<this.exchangeList.page){
				this.pageIndex++
				this.ajax()
			}
		},
		onShow(){
			this.exchangeList=[]
			this.pageIndex=0;
			this.ajax()
		},
		
		methods: {
			// 跳转到订单详情页面
			goInfor(e){
				uni.navigateTo({
					url:'../order/scoreOrderDetail?id='+e.order_index
				})
			},
			// 请求兑换列表数据
			ajax(){
				let self =this
				self.request({
					url:"ShptUapi/public/index.php/order/ehg_log_list_v2",
					data:{
						page:self.pageIndex
					}
				}).then(res => {
				        if (res.data.success) {
							// 原先是否有数据，如果有，拼接数据，如果没有直接赋值
							self.exchangeList.length>0?self.exchangeList=[...self.exchangeList,...res.data.data.data]:self.exchangeList=res.data.data.data
						} else {
				                uni.showToast({
				                title: res.data.msg,
				                icon: 'none'
				                })
				        }
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
</style>
<style lang="scss">
.box{
	padding: 20rpx 25rpx;
	box-sizing: border-box;
	.boxItem{
		margin-bottom: 20rpx;
		height: 200rpx;
		background: #FFFFFF;
		border-radius: 10px;
		padding: 20rpx;
		box-sizing: border-box;
		.itemTime{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
		.itemConten{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.itemImg{
				width: 100rpx;
				height: 100rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.itemText{
				flex: 1;
				font-size: 26rpx;
				line-height: 40rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				padding: 10rpx;
				overflow: hidden;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}
			.itemIntegral{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				   &:after {
				        content: ">";
								font-weight: 600;
								font-size: 35rpx;
								opacity: 0.5;
				    }
			}
		}
	}
}
</style>
