<template>
    <view class="">
        <view style="text-align: center; width: 100%;">
            <image v-if="feedbackList.length==0" src="../../../static/datanull.png" class="imgsss"
                style="width: 344rpx;height: 300rpx; margin-top: 60%;"></image>

        </view>
        <view v-for="(item,i) in feedbackList" :key="i" style="margin-bottom:20rpx">
            <view class="panel">
                <view class="title">
                    <view>{{item.feedback_addtime?$time(item.feedback_addtime,1):""}}</view>
                    <view :class="item.status=='2'?'color1':'color2'">{{item.status=='2'?'已回复':'未回复'}}</view>
                </view>
                <view class="content" @click="getDetail(item.feedback_index)">
                    <view>
                        <text>反馈内容：</text> {{item.feedback_content}}
                    </view>
                    <view class="detail">查看详情>></view>
                </view>
            </view>
        </view>
        <view v-if="feedbackList.length>0" class="tip">
            {{tip}}
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                feedbackList: [],
                page: 1,
                count: 20,
                tip: '',
                countAll: 0,
                cdnUrl: ""
            }
        },
        onReachBottom() {
            if (this.countAll > this.page) {
                this.page++
                this.init()
            }
        },
        onLoad() {
            this.cdnUrl = this.$cdnUrl
        },
        methods: {
            init() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/App/feedbackList',
                    data: {
                        page: self.page,
                        count: self.count,
                    }
                }).then(res => {
                    // console.log(res.data.data.info)
                    // self.countAll = res.data.data.total % 20
                    if (res.data.data.info == '') {
                        self.tip = "暂无更多~"
                    } else {
                        // for (let i = 0; i < res.data.data.info.length; i++) {
                            // res.data.data.info[i].feedback_addtime = formatTime(res.data.data.info[i]
                            //     .feedback_addtime * 1000)
                            //     console.log(res.data.data.info[i])
                            // self.feedbackList.push(res.data.data.info[i])
                            self.feedbackList = res.data.data.info
                        // }
                        console.log(self.feedbackList)
                    }
                })

            },
            getDetail(e) {
                uni.navigateTo({
                    url: './feedbackDetail?p=' + uni.getStorageSync('parameter') + '&t=' + uni.getStorageSync(
                        'token') + '&index=' + e
                })
            }
        },
        onLoad() {
            this.init()
        }
    }
</script>

<style lang="scss">
    page {
        width: 100%;
        padding-top: 20rpx;
        background-color: #F6F5F8;
    }

    .tip {
        text-align: center;
    }

    .panel {
        background-color: #fff;

        .title {
            padding: 15px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #F5F5F5;

            .color1 {
                color: #0055F2;
            }

            .color2 {
                color: #F20000;
            }
        }

        .content {
            padding: 15px;

            text {
                font-family: Source Han Sans CN;
                font-weight: 300;
                color: rgba(153, 153, 153, 1);
                color: #999;
            }

            .detail {
                font-size: 26rpx;
                font-family: Source Han Sans CN;
                font-weight: 300;
                color: rgba(153, 153, 153, 1);
                text-align: right;
                color: #999;
                margin-top: 15rpx;
            }
        }
    }
</style>
