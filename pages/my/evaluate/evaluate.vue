<!-- 发布评价页面 -->
<template>
	<view>
		<!-- 店铺名称 -->
		<view class="shop">
			<view class="img"><image :src="cdnUrl+icon" style="width: 120rpx;height: 120rpx;border-radius: 10rpx;"></image></view>
			<view class="shopname">
				<view class="comment" style="padding: 0rpx; margin-top: 10rpx;">
					<text>{{goods_name}}</text>
				</view>
			</view>
		</view>
		<!-- 整体评价 -->
		<view class="comment" style="padding: 30rpx;border-bottom: 1rpx solid #f5f5f5;">
			<text style="margin-right: 10rpx;">整体评价:</text>
			<u-rate :count="5" v-model="star_all" min-count	='1'></u-rate><text style="margin-left: 20rpx;color: #999999;">{{star_all=='1'?'很差':star_all=='2'?'差':star_all=='3'?'一般':star_all=='4'?'好':'很好'}}</text>
		</view>
		<!-- 评价 -->
		<view class="appraise">
			<textarea value="" style="color: #333333;"  placeholder="你对收到的商品还满意吗？说说你的看法吧" @input="getCon"/>
		</view>
		<!-- 添加图片 -->
		<view class="addimg">
			<view v-for="(item,i) in imgs" :key="i" style="display: inline-block;position: relative;">
				<image :src="cdnUrl+item" style="width: 120rpx;height: 120rpx;padding: 0 19rpx 0rpx 0;"></image>
				<image src="../../../static/del.png" class="cha" @click="del(i)"></image>
			</view>
			<image v-if="imgs.length<5" src="../../../static/addtp.png" @click="addImg"></image>
			<view style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">(最多5张)</view>
		</view>
		<view style="width: 100%;height: 20rpx;background-color: #f5f5f5;"></view>
		<!-- 评价2 -->
		<view style="">
			<view class="comment" style="padding: 30rpx;">
				<text>物流评价</text>
				<u-rate :count="5" v-model="star_logistics" min-count	='1'></u-rate><text style="margin-left: 20rpx;color: #999999;">{{star_logistics=='1'?'很差':star_logistics=='2'?'差':star_logistics=='3'?'一般':star_logistics=='4'?'好':'很好'}}</text>
			</view>
			<view class="comment" style="padding: 30rpx;">
				<text>服务评价</text>
				<u-rate :count="5" v-model="star_service" min-count	='1'></u-rate><text style="margin-left: 20rpx;color: #999999;">{{star_service=='1'?'很差':star_service=='2'?'差':star_service=='3'?'一般':star_service=='4'?'好':'很好'}}</text>
			</view>
		</view>
		<view class="sumbit" @click="sumbit">
			提交发布
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:"5",//星星最大数
				cdnUrl:'',
				goodsMsg:[],
				icon:'',//商品图片
				goods_name:"",//商品名称
				star_all:'5',//整体评价
				star_logistics:'5',//物流评价
				star_service:'5',//服务评价
				imgs:[],
				comment_content:'',//评价内容
				order_index:'',
			}
		},
		methods: {
			// 评价内容
			getCon(e){
				this.comment_content=e.detail.value
			},
			// 添加图片
			addImg(){
				let self = this,
					header = {
						// 'Content-Type': 'multipart/form-data'
					};
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title:'加载中'
						})
						uni.uploadFile({
							url: self.$baseUrl + 'ShptSapi/public/supplier.php/Upload/img',
							filePath: res.tempFilePaths.join(','),
							name: 'file',
							formData: {
								token: uni.getStorageSync('token'),
								device: '0'
							},
							// header: header,
							success: function(res) {
								uni.hideLoading()
								let data = JSON.parse(res.data);
								if (data.code==0) {
									uni.showToast({
										title: '上传成功'
									});
									if(self.imgs.length<=4){
										self.imgs.push(data.data);
									}else{
										uni.showToast({
											icon: 'none',
											title: '最多上传5张图片'
										});
									}
								} else {
									uni.showToast({
										icon: 'none',
										title: '上传失败，请重试~'
									});
								}
							}
						});
					}
				});
			},
			// 删除图片
			del(e){
				for(var i =0; i <this.imgs.length;i++){
					if(i==e){
						this.imgs.splice(i,1)
					}
				}
			},
			// 按钮
			sumbit(){
				console.log(this.order_index);
				let self = this;
				if(self.comment_content==''){
					uni.showToast({
						icon:'none',
						title:'请输入评论内容'
					})
				}else{
					self.request({
						url:'ShptUapi/public/index.php/Service/setComment',
						data:{
							comment_score:self.star_all,
							comment_content:self.comment_content,
							order_goods_index:self.order_index,
							comment_express_score:self.star_logistics,
							comment_service_score:self.star_service,
							comment_images:self.imgs.join(',')
						},
					}).then(res=>{
						if(res.data.success){
							uni.showToast({
								title:res.data.msg
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/my/my'
								})
							},500)
						}else{
							uni.showToast({
								icon:'none',
								title:res.data.msg
							})
						}
					},rej=>{
						console.log(rej);
					})
				}
			},
		},
		onLoad(option) {
			this.cdnUrl=this.$cdnUrl;
			this.order_index=option.index;
			this.icon=option.icon;
			this.goods_name=option.goods_name;
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}
.shop {
	display: flex;
	padding: 30rpx;
}
.shop image {
	width: 100%;
	height: 100%;
}
.shop .img {
	width: 120rpx;
	height: 120rpx;
	border-radius: 10rpx;
	margin-right: 20rpx;
}
.shop .shopname {
	font-size: 30rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #333333;
	margin-top: 10rpx;
	overflow : hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.shop .pirce {
	// margin-top: 40rpx;
	font-size: 34rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	color: #FF3636;
}
.comment{
		padding: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		image{
			width: 30rpx;
			height: 30rpx;
			margin: 0 0 0 20rpx;
			vertical-align: middle;
		}
	}
// 评价
.appraise {
	width: 691rpx;
	height: 201rpx;
	// background: #F5F5F5;
	border-radius: 10rpx;
	margin: 30rpx;
	margin-bottom: 0;
	padding: 20rpx;
	box-sizing: border-box;
}
.appraise textarea {
	font-size: 26rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #999999;
}
// 图片
.addimg{
		padding: 30rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 20rpx;
		}
		.cha{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: -20rpx;
			right: 0rpx;
		}
	}
.sumbit{
		margin: 50rpx 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background: #FF6351;
		border-radius: 45rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
</style>
