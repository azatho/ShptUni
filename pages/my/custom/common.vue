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
            // console.log(option.src)
			this.src=this.$cdnUrl+option.src
            
            uni.setNavigationBarTitle({
            	title: option.title
            });
            
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
