<!-- 修改名字页面 -->
<template>
    <view>
        <view class="userlist">
            <view style="font-size: 26rpx;">昵称:</view>
            <view style="flex: 1;">
                <input style="font-size: 26rpx;" type="text" :value="name" maxlength="8" placeholder="请输入昵称~" @input="getName" />
            </view>
        </view>
        <view class="btn" @click="confirm">确定</view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
            }
        },
        methods: {
            getName(e) {
                this.name = e.detail.value
            },
            confirm() {
                let self = this
                if (this.name == '') {

                    uni.showToast({
                        title: '昵称不能为空~',
                        icon: 'none'
                    })
                } else {
                    self.request({
                        url: 'ShptUapi/public/index.php/UserConsumers/user_edit',
                        data: {
                            device: this.$device(),
                            name: self.name,
                        },
                    }).then(res => {

                        if (res.data.success) {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                            setTimeout(function() {
                                uni.navigateBack({
                                    url: './userInfo'
                                })
                                // uni.navigateTo({
                                // 	url:'./userInfo'
                                // },500)
                            })
                        } else {

                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    }, rej => {
                        console.log(rej)
                    })
                }
            },
        },
        onLoad(options) {
            this.name = options.name
            console.log(options.name);
        }
    }
</script>

<style>
    .page {
        
    }
    .userlist {
        display: flex;
        padding: 20rpx 30rpx;
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        border-bottom: 1rpx solid #F5F5F5;
    }

    .userlist input {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        margin-left: 10rpx;
    }

    .btn {
        margin: 500rpx 30rpx 0;
        height: 90rpx;
        line-height: 90rpx;
        text-align: center;
        background: #F6281B;
        border-radius: 45px;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }
</style>
