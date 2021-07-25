<!-- 注册协议页面  -->
<template>
	<view>
		<web-view :src="$cdnUrl+strings"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				strings:'',
				type:'',
			}
		},
		methods: {
			init(){
				let self = this
				self.request({
					url:'ShptUapi/public/index.php/UserConsumers/getAgreement',
					data:{
						type:self.type
					}
				}).then(res=>{
					if(res.data.success){
						uni.setNavigationBarTitle({
							title:res.data.data.agreement_title
						})
						self.strings=res.data.data.agreement_content
					}
				})	
			},
		},
		onLoad(options) {
			if(options.type=='1'){
				this.type='3'
			}
			if (options.type=='0'){
				this.region='20'
			}
			if (options.type=='2'){
				this.region='21'
			}
			this.init()
		}
	}
</script>

<style>
page{
	margin: 0 30rpx;
}
</style>
