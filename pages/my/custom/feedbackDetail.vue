<template>
    <view class="">
        <view class="feedback_detail">
            <view class="feedback_label">反馈类别：</view>
            <view class="feedback_content">{{feedbackInfo.feedback_type}}</view>
        </view>
        <view class="feedback_detail">
            <view class="feedback_label">反馈内容：</view>
            <view class="feedback_content">{{feedbackInfo.feedback_content}}</view>
        </view>
        <view class="feedback_detail">
            <view class="feedback_label">反馈时间：</view>
            <view class="feedback_content">{{feedbackInfo.feedback_addtime?$time(feedbackInfo.feedback_addtime,1):''}}</view>
        </view>
        <view class="feedback_detail">
            <view class="feedback_label">平台回复：</view>
            <view class="feedback_content">{{feedbackInfo.feedback_answer?feedbackInfo.feedback_answer:'暂无回复内容'}}</view>
        </view>
    </view>
</template>


<script>
    export default {
        data() {
            return {
                feedback_index: '', //反馈id
                feedbackInfo: {}
            }
        },
        methods: {
            init() {
                let self = this

                self.request({
                    url: 'ShptUapi/public/index.php/App/feedbackDetail',
                    data: {
                        feedback_index: self.feedback_index
                    }
                }).then(res => {
                    console.log(res)
                    self.feedbackInfo = res.data.data
                    // res.data.data.feedback_addtime = self.$time(res.dadta.data.feedback_addtime )
                })

            }
        },
        onLoad(option) {
            this.feedback_index = option.index
        },
        onShow() {
            this.init()
        }
    }
</script>

<style>
    .feedback_detail {
        display: flex;
        padding: 20rpx;
        font-size: 26rpx;
    }

    .feedback_label {
        width: 150rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        word-break: keep-all;
    }

    .feedback_content {
        color: #333;
    }
</style>
