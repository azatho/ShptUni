<!-- 积分明细页面 -->
<template>
    <view>

        <view v-if="data.length==0" class="noData" style="text-align: center;">

            <image src="../../../static/datanull.png" mode="" style='width: 344rpx;height: 298rpx;'></image>

        </view>
        <view class="data" v-else v-for="(item,index) in data" :key='index'>
            <view>
                <view class="font-26" style="color: #333333;">{{item.type_name}}</view>
                <view class="font-22" style="color: #999999;margin-top: 10rpx;">{{$timeConvert(item.time)}}</view>
            </view>
            <view class="">
                <view class="num font-26" style="color: #ED3432;font-weight: bold;text-align: right;">
                    {{$returnFloat1(item.type_amount)}}

                </view>
                <view v-if="status==0" class="num font-26" style="color: #999999;font-weight: 400;margin-top: 10rpx;">
                    本金余额：{{$returnFloat(item.later)}}
                </view>
            </view>

        </view>
        
    </view>
</template>
<!-- 111 -->
<script>
    export default {
        data() {
            return {

                // navList: ['全部', '支出', '收入'], //导航条

                data: [], //列表数据
                pageIndex: "1", //当前页数
                total_page: "0", //总页数
                status: "0",
                type: "1"
            }
        },
        onLoad(e) {
            this.data = [];
            this.pageIndex = 1
            if (e.status == 4) {
                //鸿运星奖励记录
                this.status = 4
                uni.setNavigationBarTitle({
                    title: '奖励记录'
                })
                this.ajaxPoint("ShptUapi/public/index.php/user/user_cash_change", {
                    count: "20",
                    page: this.pageIndex,
                    type: "4"
                });
                
            } else if (e.status == 3) {
                //营收明细
                this.status = 3
                uni.setNavigationBarTitle({
                    title: '营收明细'
                })
                this.ajaxPoint("ShptUapi/public/index.php/user/user_cash_change", {
                    count: "20",
                    page: this.pageIndex,
                    type: "3"
                })
                
            } else {
                //充值记录
                this.status = 0
                uni.setNavigationBarTitle({
                    title: '充值记录'
                })
                this.ajaxPoint("ShptUapi/public/index.php/user/user_consumption_change", {
                    count: "20",
                    page: this.pageIndex,
                    type: "3"
                })
            }
        },

        onReachBottom() {
            console.log(this.total_page)
            console.log(this.pageIndex)
            if (this.pageIndex < this.total_page) {
                this.pageIndex++
                if (e.status == 4) {
                    //鸿运星奖励记录
                    this.status = 4
                    this.ajaxPoint("ShptUapi/public/index.php/user/user_cash_change", {
                        count: "20",
                        page: self.pageIndex,
                        type: "4"
                    })
                } else if (this.status == 3) {
                    //营收明细
                    this.ajaxPoint("ShptUapi/public/index.php/user/user_cash_change", {
                        count: "20",
                        page: self.pageIndex,
                        type: "3"
                    })
                } else {
                    //充值记录
                    this.ajaxPoint("ShptUapi/public/index.php/user/user_consumption_change", {
                        count: "20",
                        page: self.pageIndex,
                        type: "3"
                    })
                }
            }
        },
        methods: {
            // 请求列表数据
            ajaxPoint(url, data) {
                let self = this
                self.request({
                    url: url,
                    data: data
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.data.length > 0 ? self.data = [...self.data, ...res.data.data.list] : self.data =
                            res.data.data.list
                        self.total_page = res.data.data.total_page
                        console.log(self.total_page)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },

        }
    }
</script>

<style scoped lang="scss">
    .nav {
        height: 80rpx;
        line-height: 80rpx;
        background-color: #F5F5F5;
        display: flex;
        justify-content: space-around;
    }

    .navSelct {
        color: #FC4950;
        border-bottom: 4rpx solid #FC4950;
    }

    .noData {
        margin-top: 49%;
    }

    .data {
        border-bottom: 1rpx solid #F5F5F5;
        padding: 30rpx;
        display: flex;
        justify-content: space-between;
    }
</style>
