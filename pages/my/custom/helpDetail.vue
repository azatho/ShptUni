<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(option){
			// this.src=this.$cdnUrl+option.src;
			//不清楚为什么这个网页在cdn里 先这样吧= =
			this.src=this.$cdnUrl + option.src
		},
		onShow() {
		
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
