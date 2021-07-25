<template>
	<web-view :src="src"></web-view>
</template>
<script>

	export default {
		data(){
			return {
				src:''
			}
		},
		onLoad(){
			this.request({
			    url: 'ShptUapi/public/index.php/UserConsumers/getAgreement',
			    data: {
                    type:"1"
			    }
			}).then(res=>{
				 console.log(res);
                 var datas = res.data.data
                 // for (var i = 0; i < datas.length; i ++) {
                 //     var dict = datas[i]
                 //     if (dict.agreement_type==1) {
                         this.src = this.$cdnUrl + datas.agreement_content;
                         
                         console.log(this.src);
                         // return
                     // }
                 // }
				
			})
		}
	}
</script>

<style>
</style>
 