<template>
    <web-view :src="src"></web-view>
</template>
<script>
    export default {
        data() {
            return {
                src: ''
            }
        },
        onLoad(e) {
            if (e.type == '5') {

                uni.setNavigationBarTitle({
                    title: '金币说明'
                })
            } else if (e.type == '6') {
                uni.setNavigationBarTitle({
                    title: '鸿运勋章说明'
                })
            }else if(e.type=='8'){
				uni.setNavigationBarTitle({
				    title: '拼团积分说明'
				})
			}

            this.request({
                url: 'ShptUapi/public/index.php/UserConsumers/getAgreement',
                data: {
                    type: e.type
                }
            }).then(res => {
                console.log(res);
                var datas = res.data.data
				this.src = this.$cdnUrl + datas.agreement_content;
            })
        }
    }
</script>

<style>
</style>
