<template>
    <view style="background-color: #fff;">
        <view style="width:100%;height:20rpx;background:rgba(245,245,245,1);"></view>
        <block v-for="(item,i) in list" :key="i">
            <view class="agreement" @click="registerAgreement(item.agreement_content,item.agreement_title)"
                style="border-bottom: 1rpx solid #f5f5f5;">
                {{item.agreement_title}}
                <image src="../../../static/back.png" mode=""></image>
            </view>
        </block>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            init() {
                let self = this

                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/agreementList',
                    data: {}
                }).then(res => {
                    self.list = res.data.data
                    // console.log(res)
                })
            },
            registerAgreement(e, a) {
                // console.log(e, a)
                uni.navigateTo({
                    // url: "common" 
                    url: 'common?src=' + e + '&title=' + a
                })
            }
        },
        onShow() {
            this.init()
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f5f5f5;
    }

    .agreement {
        padding: 30rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);

        image {
            width: 17rpx;
            height: 32rpx;
            float: right;
        }
    }
</style>
