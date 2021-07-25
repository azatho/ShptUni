<template>
	<view class="">
		<view class="" v-if="news_list.length!=0">
			<view class="news_list" v-for="(item, i) in news_list" :key="i" @click="goNews(item.content)">
				<view style="display:flex;justify-content: space-between;">
					<view class="news_title">{{ item.title }}</view>
					<view class="news_time">{{ item.time }}</view>
				</view>
				<view class="news_itro">{{ item.edit_user }}</view>
			</view>
		</view>
		<view class="noneImg" v-else>
			<image src="../../static/zwsj.png" mode=""></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			news_list: []
		};
	},
	props: {
		'type':{
			type:[String,Number]
		}
	},
	created(){
		this.init();
	},
	methods: {
		init() {
			let self = this;
			this.request({
				url: 'ShptUapi/public/index.php/Recommend/newList',
				data:{
					region:self.type
				}
			}).then(res=> {
					self.news_list = res.data.data;
				})
		},
		goNews(e) {
			uni.navigateTo({
				url: "newsInfo?src="+e
			});
		}
	},
};
</script>

<style lang="scss">
.news_list {
	padding: 20rpx 30rpx;
	border-bottom: 1px solid #f5f5f5;
	.news_title {
		font-size: 30rpx;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.news_time {
		color: #999;
		font-size: 26rpx;
	}
	.news_itro {
		color: #666;
		font-size: 26rpx;
		margin-top: 10rpx;
	}
}
.noneImg{
	text-align: center;
	margin-top: 200rpx;
	image{
		width: 640rpx;
		height: 480rpx;
	}
}


</style>
