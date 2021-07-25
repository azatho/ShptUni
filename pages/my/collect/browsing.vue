<!-- 浏览记录页面 -->
<template>
    <view>

        <u-navbar title="浏览记录">
            <view slot="right" style="padding-right: 30rpx;color: #FF6251;" @click="compile" v-if="list!=0">
                {{showbj?'编辑':'完成'}}
            </view>
        </u-navbar>

        <view class="bgi" v-if="list.length==0">
            <image src="../../../static/datanull.png"></image>
            <!-- <view style="text-align:center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;margin: 50rpx 0;">暂无浏览记录</view> -->
        </view>
        <view class="brows" v-else style="padding-bottom: 100rpx;">
            <!-- <view style="margin-top: 128rpx;"></view> -->
            <view class="carry" v-for="(items,k) in list" :key="k">
                <view class="time">{{items.use_time}}</view>
                <view class="record" v-for="(item,i) in items.info" :key="i" @click="gobuy(item.goods_index)">
                    <view class="checked" v-if="showbj==false" @click.stop="getRadio(item.index,k,i)">
                        <label class="radio">
                            <radio value="r1" checked="true" style="transform:scale(0.9)" v-if="item.flag"
                                color="#FD484F"></radio>
                            <radio value="r1" style="transform:scale(0.9)" v-else></radio>
                        </label>
                    </view>
                    <view class="img">
                        <image :src="cdnUrl+item.image" v-if="item.image"></image>
                        <view v-else
                            style="width: 100%;height: 100%;border:1px solid #f5f5f5;color:#ccc; text-align: center; line-height: 120rpx;">
                            暂无图片
                        </view>
                    </view>
                    <view class="txt">
                        <view class="tilte">{{item.goods_name || '暂无名称'}}</view>
                        <view style="display: flex;justify-content: space-between;align-items: center;">
                            <view class="two">
                                <view class="money">{{item.goods_cost!=0?'￥'+$returnFloat(item.goods_cost):''}}</view>
                                <!-- <view class="money" v-if="item.goods_type!=0" style="margin-top: 5rpx;">{{item.goods_type==2&&item.goods_cost!=0?'或':''}}{{item.goods_score_cost!=0?'￥'+item.goods_score_cost/100:''}}{{item.goods_integral&&item.goods_score_cost!=0?'+':''}}{{item.goods_integral!=0?item.goods_integral/100+'积分':''}}</view> -->
                            </view>
                            <view class="gobuy" @click="gobuy(item.goods_index)">去购买</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 底部导航栏 -->
        <view class="btn" v-if="showbj==false &&list.length>0">
            <view class="left" @click="getAllRadio()">
                <label>
                    <radio :checked="browsall" color="#FD484F" style="transform:scale(0.9)"></radio>
                </label>
                全选
            </view>
            <view class="right" @click="cancelCollect()">删除</view>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                cdnUrl: '',
                list: [], //存放所有数据
                showbj: true, //编辑/完成 状态切换
                browsall: false, //全部选中
                checkedRadio: [], //全选
                counts: 0,
                total_page: 1, //总页数
                page: 1,
                count: 20
                // updata:false
            }
        },

        onPullDownRefresh() {
            console.log('refresh');

            this.page = 1;
            this.list = [];
            let data = {
                page: this.page,
                count: this.count
            }
            console.log(data)

            this.init(data)
        },
        onLoad() {
            // this.init()

            let data = {
                page: this.page,
                count: this.count
            }
            console.log(data)

            this.init(data)
            this.cdnUrl = this.$cdnUrl
        },
        async onReachBottom() {

            if (this.page >= this.total_page) {
                return
            }

            this.page = this.page + 1
            let data = {
                page: this.page,
                count: this.count
            }
            console.log(data)

            this.init(data)
        },
        methods: {

            init(data) {

                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/User/footHistory',
                    data: data,
                }).then(res => {
                    console.log(res)
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        
                    }for (var i = 0; i < res.data.data.list.length; i++) {

                            for (var j = 0; j < res.data.data.list[i].info.length; j++) {
                                res.data.data.list[i].info[j].flag = false
                                // this.counts =res.data.data.list[i][j]++
                                this.counts++
                                console.log(this.counts)
                            }
                        }
                        // self.list = res.data.data
                        console.log(self.list);

                        let result = res.data.data.list
                        self.total_page = res.data.data.total_page
                        self.list.length > 0 ? self.list = [...self.list, ...result] : self.list = result

                        console.log(self.list);
                }, rej => {
                    console.log(rej);
                })
            },
            // 返回上一页
            black() {
                uni.navigateBack({
                    delta: 1
                })
            },
            // 编辑/完成 按钮切换
            compile() {

                if (this.showbj) { //根据定义Boolean变量值，可多次切换文字
                    // rightText = '完成'
                    this.showbj = false
                } else {
                    // rightText = '编辑'

                    this.showbj = true
                    this.browsall = false;
                    for (var i = 0; i < this.list.length; i++) {
                        let items = this.list[i].info
                        for (var j = 0; j < items.length; j++) {
                            items[j].flag = false
                        }
                    }

                    this.checkedRadio = []

                }
            },
            // compiles() {
            //     this.showbj = true
            //     this.browsall = false;
            //     for (var i = 0; i < this.list.length; i++) {
            //         let items = this.list[i].info
            //         for (var j = 0; j < items.length; j++) {
            //             items[j].flag = false
            //         }
            //     }

            //     this.checkedRadio = []
            // },
            // 去购买
            gobuy(e) {
                uni.navigateTo({

                    url: '../../shop/goodsDeatil?id=' + e
                })
            },

            // 单个是否选中
            getRadio(e, pi, ci) { //订单号  每一天  每一天的每一条浏览记录
                console.log(ci)
                console.log(this.list[pi])
                let dataArray = this.list[pi]
                for (let j = 0; j < dataArray.info.length; j++) {
                    // console.log(ci + j)
                    if (ci == j) {
                        dataArray.info[ci].flag = !dataArray.info[ci].flag
                        if (dataArray.info[ci].flag == true) {
                            this.checkedRadio.push(e)
                            console.log(this.checkedRadio)
                        } else {
                            console.log(456)
                            this.checkedRadio.splice(this.checkedRadio.indexOf(e), 1)
                        }
                    }
                }

                for (let j = 0; j < this.list.length; j++) {

                    let array = this.list[j]

                    for (let i = 0; i < array.info.length; i++) {

                        if (array.info[i].flag == false) {
                            this.browsall = false;
                            console.log(this.browsall)
                        } else if (this.checkedRadio.length == this.counts && array.info[i].flag) {

                            this.browsall = true;
                        }
                    }
                }

            },
            // 是否全选
            getAllRadio() {
                this.checkedRadio = []
                this.browsall = !this.browsall
                console.log(this.list)
                if (this.browsall == true) {
                    console.log(1)
                    for (var i = 0; i < this.list.length; i++) {
                        let items = this.list[i].info
                        for (var j = 0; j < items.length; j++) {
                            items[j].flag = true
                            this.checkedRadio.push(items[j].index)
                        }
                    }
                } else {
                    console.log(0)
                    for (var i = 0; i < this.list.length; i++) {
                        let items = this.list[i].info
                        for (var j = 0; j < items.length; j++) {
                            items[j].flag = false
                        }
                    }

                    this.checkedRadio = []
                }
            },
            // 删除
            cancelCollect() {
                let self = this;
                if (self.checkedRadio.length == 0) {

                    uni.showToast({
                        title: '请至少选择一个记录',
                        icon: 'none'
                    })

                } else {
                    uni.showModal({
                        content: '确定删除吗？',
                        success: function(res) {
                            if (res.confirm) {

                                let type = 0
                                if (self.browsall == true) {
                                    type = 1
                                }
                                self.request({
                                    url: 'ShptUapi/public/index.php/User/delFoot',
                                    data: {
                                        foot_ids: self.checkedRadio.join(','),
                                        type: type
                                    }
                                }).then(res => {
                                    if (res.data.success) {

                                        let arr = self.list
                                        for (var i = 0; i < arr.length; i++) {
                                            let items = arr[i].info
                                            // console.log(items.length)
                                            // console.log("第一层循环" + i)
                                            for (var j = 0; j < items.length; j++) {
                                                // console.log("第二层循环" + j)
                                                // console.log(items)
                                                let index = self.checkedRadio.indexOf(self.list[i].info[j].index)
                                                // console.log(index)
                                                if (index >= 0) {
                                                    // console.log(j)
                                                    self.list[i].info.splice(j, 1);
                                                }
                                            }
                                        }

                                        console.log(self.list)


                                        self.counts = self.counts - self.checkedRadio.length;
                                        self.checkedRadio = [];
                                        if (self.browsall == true) {
                                            self.showbj = true
                                            self.browsall = false;

                                            self.list = [];

                                        }

                                        uni.showToast({
                                            title: res.data.msg,
                                            icon: 'none'
                                        })

                                    } else {
                                        uni.showToast({
                                            title: res.data.msg,
                                            icon: 'none'
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            },
        }
    }
</script>

<style>
    page {
        position: relative;
    }

    page image {
        width: 100%;
        height: 100%;
    }


    .bgi {
        width: 374rpx;
        height: 314rpx;
        margin: 500rpx auto;

        /* width: 476rpx;
        height: 372rpx;
        position: absolute;
        
        top: 50%;
        
        left: 50%;
        
        margin-top: -150px; 
        margin-left: -238rpx; */


    }

    /* 浏览记录内容 */
    .carry {
        padding: 30rpx;
        box-sizing: border-box;
        font-size: 26rpx;
        font-family: PingFang SC;
        color: #333333;
    }

    .carry .time {
        font-size: 30rpx;
        font-weight: 500;
        margin-bottom: 20rpx;
    }

    .carry .record {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10rpx;
        padding: 10rpx 0;
        box-sizing: border-box;
        border-bottom: 1rpx solid #F5F5F5;

    }

    .carry .record .checked {
        width: 36rpx;
        height: 36rpx;
        margin-right: 25rpx;
    }

    .carry .record .img {
        width: 120rpx;
        height: 120rpx;
        margin-right: 20rpx;
    }

    .carry .txt {
        flex: 1;
    }

    .carry .txt .tilte {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .carry .two {
        /* 		display: flex;
		justify-content: space-between; */
        margin-top: 20rpx;
    }

    .carry .two .money {
        color: #CF4F49;
        font-size: 26rpx;
    }

    .carry .gobuy {
        width: 100rpx;
        height: 40rpx;
        background: #FD484F;
        border-radius: 20rpx;
        line-height: 40rpx;
        text-align: center;
        font-size: 22rpx;
        color: #FFFFFF;
    }

    /* 底部按钮 */
    .btn {
        width: 750rpx;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 30rpx;
        padding-right: 0;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #FFFFFF;
        box-shadow: 0rpx 0rpx 2rpx 0rpx rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: space-between;
        font-family: PingFang SC;
    }

    .btn image {
        width: 36rpx;
        height: 36rpx;
        margin-right: 10rpx;
        vertical-align: middle;
    }

    .btn .left {
        font-size: 26rpx;
        font-weight: 400;
        color: #333333;
    }

    .btn .right {
        width: 200rpx;
        height: 100rpx;
        background: #FD484F;
        font-size: 30rpx;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 100rpx;
        text-align: center;
    }
</style>
