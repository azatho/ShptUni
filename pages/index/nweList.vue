
<template>
	<newList :type='type'></newList>
</template>

<script>
	import newList from '../../components/publicPage/news.vue'
export default {
	components:{
		newList
	},
	data() {
		return {
			type:0,//分类
		};
	},
	onLoad(e){
		this.type=e.type
	},
	methods: {
		
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
