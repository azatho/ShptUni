<template>
	<searchHistory></searchHistory>
</template>

<script>
	import searchHistory from "../../components/publicPage/search_history.vue"
export default {
	components:{
		searchHistory
	},
	data() {
		return {
			
		};
	},
	methods: {
	
	},
	onShow() {
	},
	onLoad() {
	}
};
</script>

<style lang="scss">
.status_bar {
	padding: 15rpx 30rpx;
	display: flex;
	.left_img {
		width: 50rpx;
		height: 70rpx;
		image {
			margin-top: 19rpx;
			width: 18rpx;
			height: 32rpx;
		}
	}
	.input {
		width: 410rpx;
		height: 70rpx;
		padding: 0 70rpx 0 60rpx;
		line-height: 70rpx;
		height: 70rpx;
		background: rgba(238, 241, 244, 1);
		border-radius: 4rpx;
		position: relative;
		input {
			height: 70rpx !important;
			line-height: 70rpx !important;
		}
		.search_img {
			width: 30rpx;
			height: 28rpx;
			position: absolute;
			top: 20rpx;
			left: 25rpx;
		}
		.del {
			width: 80rpx;
			height: 70rpx;
			position: absolute;
			top: 0;
			right: 0;
			image{
				width: 30rpx;
				height: 30rpx;
				margin: 20rpx  0 0 25rpx;
			}
		}
	}
	.searchWord{
		height: 70rpx;
		flex: 1;
		text-align: center;
		line-height: 70rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}
}
.title {
	padding: 0 30rpx;
	display: flex;
	height: 70rpx;
	align-items: center;
	justify-content: space-between;
	.word {
		ont-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}
	.del {
		width: 50rpx;
		text-align: right;
		image {
			width: 32rpx;
			height: 32rpx;
		}
	}
}
.history_list {
	display: flex;
	padding: 0 30rpx;
	flex-wrap: wrap;
	.history {
		padding: 10rpx 40rpx;
		background-color: #f5f5f5;
		border-radius: 30rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		margin: 20rpx 20rpx 0 0;
	}
}
.none_history{
	text-align: center;
	margin-top: 100rpx;
}
</style>
