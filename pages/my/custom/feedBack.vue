<template>
    <view class="containe">
        <!-- <image class="background" src="../../static/feedbackBgc1.png" mode="aspectFill"></image> -->
        <!-- <view class="record" @click="goRecord">记录</view> -->
        <view class="top1">
            <view class="top1-img">
                <image src="../../../static/kefuAvatar.png" mode="aspectFill"></image>
            </view>
            <view  class="" style="font-size: 30rpx;width: 620rpx;height: 76rpx;">
                遇到问题了？点击  <text style="color: #7EAEF5;" >在线客服</text>我们将立刻解答您的问题。
            </view>
            <button style="opacity: 0;position: absolute;width: 130rpx;height: 76rpx;left: 330rpx;top:0;" type="default"
                open-type="contact"></button>
        </view>
        <view class="top1Line">

        </view>
        <view class="bg_center">
            <!-- <image src="../../static/black.png" mode="aspectFill"></image> -->
            <view class="fk_center">
                <view class="fk_title"
                    style="font-size: 30rpx;font-weight: bolder;display: flex;justify-content: space-between;">
                    <view style="display: flex;align-items: center;"><text class="tip"></text> 反馈类型：</view><text
                        @click="goRecord"
                        style="color: #7EAEF5;font-size: 26rpx;text-decoration: underline;">查看反馈记录>></text>
                </view>
                <view class="fk_list">
                    <view v-for="(item, i) in fk" :key="i" @click="change_fk(item.id, item.name)">
                        <image :src="item.id === suoyin ? item.icon2 : item.icon" style="width: 39rpx;height:39rpx;">
                        </image>
                        <text>{{ item.name }}</text>
                    </view>
                </view>
                <!-- 反馈内容 -->
                <view class="contener">
                    <view class="contener_title" style="font-size: 30rpx;font-weight: bolder;"> <text
                            class="tip"></text> 反馈内容：</view>
                    <view
                        style="width:690rpx;border-radius: 10rpx; height:260rpx;position: relative;margin-top: 10rpx;background-color: #F5F5F5;">
                        <!-- <image src="../../static/region_bg.png" mode="aspectFill" class="region_bg"></image> -->
                        <textarea v-model="content" placeholder="请简要描述你在使用过程中的问题和意见" name="textarea" maxlength="-1"
                            style="background-color: rgba(0,0,0,0); width: 660rpx;position: absolute;z-index: 2; height:80%;color: #969696;font-size:24rpx;font-family:PingFang SC;font-weight:400;padding: 10px;padding-left: 20rpx;" />
                    </view>
                </view>

            </view>

        </view>
        <view class="top1Line">

        </view>
        <view class="btm">
            <view class="" style="font-size: 30rpx;font-weight: bolder;display: flex;align-items: center;">
                <text class="tip"></text> 您的联系方式
            </view>
            <view class="weui-input">
                <text style="font-size: 30rpx; font-weight: 400;">邮箱(选填):</text>
                <input @input="email" placeholder="以便我们给您回复" placeholder-style="font-size:30rpx" />
            </view>
            <view class="weui-input">
                <text style="font-size: 30rpx; font-weight: 400;">其他(选填):</text>
                <input @input="qt" placeholder="如QQ或手机号" type="number" placeholder-style="font-size:30rpx" />
            </view>
        </view>
        <view style="margin-top: 91rpx;" class="btn" @click="submit">
            提交
        </view>
    </view>
</template>

<script>

    export default {

        data() {
            return {
                fk: [{
                        id: 1,
                        icon: '../../../static/yuan.png',
                        icon2: '../../../static/yuan2.png',
                        name: '咨询'
                    },
                    {
                        id: 2,
                        icon: '../../../static/yuan.png',
                        icon2: '../../../static/yuan2.png',
                        name: '建议'
                    },
                    {
                        id: 3,
                        icon: '../../../static/yuan.png',
                        icon2: '../../../static/yuan2.png',
                        name: '其他'
                    }
                ],
                suoyin: 1,
                content: '',
                phone: '',
                device_type: '',
                type: '咨询',
                cdnUrl: ''
            };
        },
        methods: {
			goServer(){
				console.log(111)
				uni.navigateTo({
					url:'../meiqia'
				})
			},
            change_fk(i, name) {
                this.suoyin = i
                this.type = name;
            },

            email(e) {
                this.device_type = e.detail.value;
            },
            qt(e) {
                this.phone = e.detail.value;
            },
            submit() {
                let that = this;
                if (!that.content) {
                    uni.showToast({
                        icon: 'none',
                        title: '反馈内容不能为空',
                        duration: 2000
                    });
                } else {
                    that.request({
                        url: 'ShptUapi/public/index.php/App/feedback',
                        method: 'POST',
                        data: {

                            feedback_type: that.suoyin,
                            feedback_content: that.content,
                            feedback_email: that.device_type,
                            feedback_other: that.phone,
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.success) {
                            uni.showToast({
                                icon: 'none',
                                title: res.data.msg,
                                duration: 1000
                            });
                            this.content = "";
                            this.device_type = "";
                            this.phone = '';

                            setTimeout(() => {
                                uni.navigateBack({

                                })
                            }, 1000)

                        } else {
                            uni.showToast({
                                icon: 'none',
                                title: res.data.msg,
                                duration: 1000
                            });
                        }
                    })

                }
            },
            goRecord() {

                uni.navigateTo({
                    url: 'feedbackList'
                })
            }
        },
        onShow() {
            this.cdnUrl = this.$cdnUrl
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100%;

    }

    .record {
        width: 150rpx;
        // height: 80rpx;
        // line-height: 80rpx;
        text-align: center;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        // color: black;
        float: right;

    }

    .bg_center {
        width: 690rpx;
        margin: 0 30rpx;
        padding-top: 30rpx;
    }

    .fk_center {
        width: 690rpx;
        height: 480rpx;
        /* border: 1px solid red; */
        z-index: 100;
        // position: absolute;
        // left: 50%;
        // top: 50%;
        // transform: translate(-50%, -50%);
    }

    .fk_title {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
    }

    .fk_list {
        display: flex;
        width: 460rpx;
        justify-content: space-between;
        margin-top: 20rpx;
    }

    .fk_list view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 110rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
    }

    .contener {
        height: 360rpx;
        margin-top: 30rpx;
    }

    .contener_title {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-top: 20rpx;
        margin-bottom: 30rpx;
        display: flex;
        align-items: center;
    }

    .region_bg {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 0;

    }

    .weui-input {
        margin-top: 30rpx;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding: 10rpx 0;
    }

    .weui-input text {
        display: inline-block;
        min-width: 210rpx;
    }

    .btn {
        width: 690rpx;
        height: 80rpx;
        margin: 0 auto;
        display: flex;
        color: #FFFFFF;
        background-color: #3699FF;
        align-items: center;
        // line-height: 80rpx;
        justify-content: center;
        font-size: 26rpx;
        text-align: center;
        border-radius: 10rpx;
    }

    .textarea {
        // background-color: ;

    }

    .top1 {
        width: 690rpx;
        height: 136rpx;

        .top1-img {
            width: 54rpx;
            height: 54rpx;

            image {
                width: 100%;
                height: 100%;
            }

            margin-right: 11rpx;
        }

        margin-left: 30rpx;

        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .top1Line {
        height: 20rpx;
        background-color: #f5f5f5;
    }

    .btm {
        padding: 34rpx 30rpx 0;
    }

    .tip {
        display: inline-block;
        width: 4rpx;
        height: 36rpx;
        background: #7EAEF5;
        margin-right: 21rpx;
    }
</style>
