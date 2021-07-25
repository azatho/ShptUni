<!-- 全部评价页面 ==>商品详情页面进来-->
<template>
	<view class="">
		<view class="btns">
			<view :class="type==0?'selected':''" @click="getType(0)">
				全部{{evaluateInfo.all}}
			</view>
			<view :class="type==1?'selected':''" @click="getType(1)">
				好评{{evaluateInfo.praise}}
			</view>
			<view :class="type==2?'selected':''" @click="getType(2)">
				中评{{evaluateInfo.commMiddle}}
			</view>
			<view :class="type==3?'selected':''" @click="getType(3)">
				差评{{evaluateInfo.negative}}
			</view>
			<view :class="type==4?'selected':''" @click="getType(4)" style="margin-right: 0;">
				有图{{evaluateInfo.image}}
			</view>
		</view>
		<view class="none" v-if="evaluateInfo.info.length==0">
			暂无评论
		</view>
		<view class="comments" v-else>
			<block v-for="(item,k) in evaluateInfo.info" :key="k">
				<view style="background-color: #f5f5f5;width: 100%;height: 20rpx;"></view>
				<view class="user_msg" >
					<view class="user_left">
						<image :src="$cdnUrl+item.comment_user_photo" ></image>
						<view class="">
							<view class="">
								{{$replacepos(item.comment_nick,1,item.comment_nick.length,'*') }}
						<u-rate :disabled="true" active-color="#FFC600" :count="5" v-model="item.comment_score"></u-rate>
							</view>
							<view class="label">
								{{item.commentName}}
							</view>
						</view>
					</view>
					<view class="time">
						{{formatTime(item.comment_time)}}
					</view>
				</view>
				<view class="content">
					{{item.comment_content}}
				</view>
				<view class="imgs">
					<image :src="cdnUrl+item" v-for="(item,j) in item.comment_images" :key="j"  @click="prewImg(item)"></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	// import {formatdate} from '@/util/common.js'
	export default{
		data(){
			return{
				page:1,
				pageCount:'',
				cdnUrl:'',
				goods_id:'',//商品id
				type:'0',
				evaluateInfo:{
					info:[]
				},

			}
		},
		methods:{
			init(){
				let self = this;
				self.request({
					url:'ShptUapi/public/index.php/Goods/getComment',//评论列表
					data:{
						count:10,
						page:self.page,
						comment_goods_id:self.goods_id,
						type:self.type
					},
				}).then(res=>{
					if(res.data.success){
						this.pageCount=res.data.data.total_page;
						self.evaluateInfo.info.length>0?self.evaluateInfo.info=[...self.evaluateInfo.info,...res.data.data.info]:self.evaluateInfo=res.data.data
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				},rej=>{
					console.log(rej);
				})
			},
			getType(e){
				this.type = e
				this.page=0
				this.evaluateInfo.info=[]
				this.init()
			},
            //查看大图
            prewImg(imgs){
            	let imgUrl = this.$imgUrl(imgs)
            	console.log(imgUrl)
            	uni.previewImage({
            	    urls: [imgUrl]
            	});
            	
            },
		},
		onShow(){
			this.evaluateInfo={
				info:[]
			}
			this.init()
		},
		onLoad(option) {
			this.cdnUrl=this.$cdnUrl,
			this.goods_id=option.id
		},
		onReachBottom(){
			if(this.page<this.pageCount){
				this.page++
				this.init()
			}
		}
	}
</script>

<style lang="scss">
	.btns{
		z-index: 33;
		padding: 30rpx 30rpx 0;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		view{
			width:120rpx;
			height:40rpx;
			display: inline-block;
			line-height: 40rpx;
			text-align: center;
			background:rgba(204,204,204,1);
			border-radius:30rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin: 0 20rpx 30rpx 0;
		}
		.selected{
			background:rgba(253, 99, 94, 1);
		}
	}
	.none{
		padding: 350rpx 0 0;
		text-align: center;
	}
	.comments{
		padding-top: 100rpx;
		.user_msg{
			padding: 0 30rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;
			.user_left{
				display: flex;
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(51,51,51,1);
				image{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.star{
					width: 22rpx;
					height: 22rpx;
					margin: 0 0 0 10rpx;
				}
				.label{
					
					font-size:24rpx;
					font-family:PingFang SC;
					font-weight:400;
					color:rgba(153,153,153,1);
				}
			}
			.time{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
		}
		.content{
			font-size:26rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
			margin-top: 20rpx;
			padding-left: 110rpx;
		}
		.imgs{
			display: flex;
			flex-wrap: wrap;
			padding-left: 110rpx;
			margin-bottom: 20rpx;
			image{
				width: 130rpx;
				height: 130rpx;
				margin: 20rpx 10rpx 0;
			}
			
		}
	}
	
</style>
