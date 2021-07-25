<template>
    <view class="">
        <view class="common" v-if="problemList.length!=0">
            <view v-for="(item,i) in problemList" :key="i">
                <view class="problem" @click='click_active(i)'>
                    <view style="display: flex;align-items: center;">
                        <view class="problem_suoyin" style="width: 40rpx;height: 40rpx;color:#fff;position:relative;">
                            <image src="../../../static/fixation.png" style="width:100%;height:100%;" mode="aspectFill"></image>
                                <!-- <view style="width: 40rpx;height: 40rpx;color: #e6e6e6;position:relative;"> -->
                                    <text
                                        style="position:absolute;top:60%;left:50%;transform:translate(-60%,-60%);font-size:24rpx;color: #333333;">{{i+1}}</text>
                                <!-- </view> -->
                            
                        </view>
                        <view class="problem_title">
                            {{item.title}}
                        </view>
                    </view>
                    <!-- <uni-icons type="arrowright" :class="i===suoyin?'jt2':''" class="jt1"></uni-icons> -->
                    <!-- <u-icon name="arrow-right" :class="i==suoyin?'jt2':''" class="jt1"></u-icon> -->
                    <u-icon name="arrow-up" v-if="i===suoyin"></u-icon>
                    <u-icon name="arrow-right" v-if="i!==suoyin"></u-icon>

                </view>
                <view :class="i == suoyin?'active':''" class="problem_list">
                    <!-- <rich-text :nodes="item.content"></rich-text> -->
                    <rich-text :nodes="item.content"></rich-text>
                    <!-- 	{{item.content}} -->

                </view>




            </view>
        </view>
        <view style="text-align: center; width: 100%;" v-else>
            <image v-if="problemList.length==0" src="../../../static/datanull.png" class="imgsss"
                style="width: 344rpx;height: 300rpx; margin-top: 60%;"></image>

        </view>
    </view>
</template>

<script>
    export default {

        data() {
            return {
                cdnUrl: "",
                suoyin: '-1',
                flag: false,
                problemList: [],
                richTest: "1111111111"
            }
        },
        onLoad() {
            this.cdnUrl = this.$cdnUrl
        },
        methods: {
            init() {
                let self = this

                self.request({
                    url: "ShptUapi/public/index.php/App/question",
                    data: {}
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        this.problemList = res.data.data
                        console.log(this.problemList)
                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg
                        })
                    }
                })


            },
            click_active(e) {

                if (!this.flag) {
                    this.flag = true
                    this.suoyin = e
                } else {
                    this.flag = false
                    this.suoyin = e = '-1'
                }

            },

        },
        onShow() {
            this.init()
        }
    }
</script>
<style>
    page {
        background-color: #FFFFFF;
    }
</style>
<style lang="scss">
    .none {
        text-align: center;
        margin-top: 50rpx;
    }

    .common {
        .problem {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30rpx 30rpx;
            background: #fff;

            .problem_title {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin: 0 10rpx;
            }
        }

        .problem_list {
            width: 100%;
            height: 0;
            overflow: hidden;
            padding: 0 70rpx;
            background: #fff;
            font-size: 13px;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            box-sizing: border-box;
        }

        .active {
            height: auto;
            white-space: pre-wrap;
            margin: 0 auto;
        }

        .jt1 {
            transform: rotate(0deg);
            transition: all .4s;
        }

        .jt2 {
            transform: rotate(-90deg);
        }
    }
</style>
