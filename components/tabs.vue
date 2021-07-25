<template>
	<view style="width: 100%;height: 70rpx;">
		<view v-for="(item,i) in list" :key='i' class="">
			{{item.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// tap栏内容
				list:[
					{
						name:'商品',
						type:"0",
					},
					{
						name:'线上店铺',
						type:"1",		
					}],
				// 选中的商品栏
				selNav:"0",
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
