<!-- 我的评论列表页面 -->
<template> 
	<view>
		<view v-if="evaluateInfo.length">
			<view class="critic"  v-for="(item,i) in evaluateInfo" :key='i'>
				<view class="img">
					<!-- 用户头像 -->
					<image :src="cdnUrl+item.comment_user_photo"></image>
				</view>
				<view class="right">
					<!-- 第一行 -->
					<view class="one">
						<view class="shopstar">
							<!-- 用户名 -->
							<view class="" style="display: flex;align-items: center;">
								<view class="shop" style="max-width: 120px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;flex: 1;">
								  <text>{{item.comment_nick}}</text>	
								</view>
							</view>
						</view>
						<view class="time">{{$time(item.comment_time,0)}}</view>
					</view>
					<!-- 第二行 -->
					<view class="two">{{item.comment_content}}</view>
					<!-- 图片行 -->
					<view class="tupian">
						<image :src="cdnUrl+itemt" v-for="(itemt,k) in item.comment_images" :key="k" @click="prewImg(k,item.comment_images)"></image>
					</view>
					<!-- 第三行 -->
					<view class="three" @click="goshangpin(item.comment_goods_id,item.goods_status)">
						<view class="img1">
							<image :src="cdnUrl+item.image" v-if="item.image"></image>
						<view v-else style="width: 100%;height: 100%;border:1px solid #FFFFFF;color:#ccc; text-align: center; line-height: 108rpx; font-size: 20rpx;">
							暂无图片
						</view>
						</view>
						<view class="right">
							<view class="title">{{item.goods_name || '暂无名称'}}</view>
							<view class="last">
								<view class="mony" >{{item.goods_price!=0?'￥'+item.goods_price/100:''}}</view>
								<view class="num">×{{item.goods_count}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="none">没有更多评论了~</view>
		</view>
		<view v-else style="text-align: center; margin-top: 200rpx;">
			<image src="../../../static/datanull.png" style="width: 344rpx;height: 300rpx; margin-top: 50%;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:0,
				pageCount:'',
				cdnUrl:'',
				imgsarray:[],
				evaluateInfo:[],//数据集合
			}
		},
		methods: {
			init(){
				let self = this;
				self.request({
					url:'ShptUapi/public/index.php/User/myRating',
					data:{
						page:self.page,
						count:10,
					},
				}).then(res=>{
					if(res.data.success){
						self.pageCount=res.data.pageCount
						self.evaluateInfo.length>0?self.evaluateInfo=[...self.evaluateInfo,...res.data.data]:self.evaluateInfo=res.data.data
					}
				},rej=>{
					console.log(rej);
				})
			},
			//查看大图
			prewImg(index,imgs){
				var self  = this;
				for(var i = 0;i<imgs.length;i++){
					imgs[i]=self.cdnUrl+imgs[i]
					self.imgsarray.push(imgs[i])
				}
				// console.log(self.imgsarray);
				uni.previewImage({
					current:index-1,
					urls:self.imgsarray,
					loop:true,
					indicator: 'number'
				})
			},
			// 到商品页面
			goshangpin(id,goods_status){
				if (goods_status == 2) {
					uni.navigateTo({
						url:'../../shop/goodsDeatil?id='+id
					})
				} else {
					uni.navigateTo({
						url: './nocommunity'
					})
				}
			}
		},
		onReachBottom(){
			if(this.page<this.pageCount){
				this.page++
				this.init()
			}
		},
		onShow() {
			this.evaluateInfo=[]
			this.page=0
			this.cdnUrl=this.$cdnUrl
			this.init()
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
	.none {
		text-align: center;
		margin-top: 10rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}
.critic {
	background-color: #FFFFFF;
	margin: 20rpx 30rpx;
	border-radius: 10px;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
}
.critic image {
	width: 100%;
	height: 100%;
}
.critic .img {
	width: 80rpx;
	height: 80rpx;
	border-radius: 10rpx;
	margin-right: 30rpx;
}
.critic .right {
	flex: 1;
}
.critic .one {
	display: flex;
	justify-content: space-between;
	margin-bottom: 40rpx;
}
.one .shopstar .shop{
	font-size: 30rpx;
	font-weight: bold;
	color: #333333;
}
.one .shopstar .star {
	width: 30rpx;
	height: 28rpx;
	margin-right: 10rpx;
}
.one .time {
	font-size: 26rpx;
	font-weight: 400;
	color: #999999;
}
.critic .right .two {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.critic .right .three {
	display: flex;
	justify-content: space-between;
	background: #F5F5F5;
	padding: 12rpx 20rpx 15rpx;
	margin-top: 20rpx;
}
.three .img1 {
	width: 130rpx;
	height: 130rpx;
	margin-right: 20rpx;
}
.three .right .title{
	font-size: 20rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	flex: 1;
}
.three .right .last {
	display: flex;
	justify-content: space-between;
	font-family: Source Han Sans CN;
	margin-top: 30rpx;
}
.three .last .mony {
	font-size: 25rpx;
	font-weight: 400;
	color: #ED5736;
}
.three .last .num {
	font-size: 22rpx;
	font-weight: 300;
}
.tupian {
	display: flex;
	flex-wrap: wrap;
}
.tupian image {
	width: 130rpx;
	height: 130rpx;
	margin-top: 20rpx;
	margin-right: 20rpx;
}
</style>
