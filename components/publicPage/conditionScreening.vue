<template>
		<view class="headTitle">
			<view class="headTitleItem font-24" @click="getColor(index)" :class="{action:headColor==index}"
				v-for="(item,index) in headTitlt" :key="item">
				<view style="display: flex;">
					<view>{{item}}</view>
					<view v-if="index>0" style="position: relative;">
						<span class="iconfont icon-paixujiantoushang" :class="upSelct==0&&index==headColor?'icon-style1':'icon-style'"></span>
						<span class="iconfont icon-paixujiantouxia"   :class="upSelct==1&&index==headColor?'icon-style1':'icon-style'" style="position: absolute;transform: translateX(-100%);"></span>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
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
</style>
