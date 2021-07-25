<template>
    <view class="box">
        <view class="header">
            <view class="header-t">
                <view class="header-l">
                    <view class="text">
                        可提现金额 (元) :
                    </view>
                    <view class="num">
                        {{$returnFloat(balance)}}
                    </view>
                </view>
                <view class="header-r" @click="openRules()">
                    <view style="display: flex;align-items: center;">
                        <view class="text">
                            提现规则
                        </view>

                        <image src="../../../static/rullrespon.png"
                            style="width: 32rpx;height: 32rpx;margin-left: 10rpx;"></image>

                    </view>
                    <u-modal v-model="rulesShow" title="提现规则说明"
                        :title-style="{'margin-bottom':'30rpx','font-size':'30rpx','font-weight':'bold'}"
                        :content-style="{'font-size':'26rpx','color':'#999999','margin-bottom':'10rpx','margin-left':'30rpx','margin-right':'30rpx'}">
                        {{rulesList}}
                        <!-- <view v-for="(item,index) in rulesList"
                            style="color: #333333;margin-left: 30rpx;margin-bottom: 7rpx;">{{index+1}}.{{item}}</view> -->
                    </u-modal>
                </view>
            </view>
            <view class="header-b">
                <view class="item-l">
                    提现中 (元) : {{$returnFloat(in_cash)}}
                </view>
                <view class="item-r">
                    累计提现 (元) : {{$returnFloat(cumulative)}}
                </view>
            </view>
        </view>
        <view class="way">
            <view class="blue">
            </view>
            <view class="text">
                请选择提现方式
            </view>
        </view>
        <view class="banner">
            <view class="item" style="display: flex;justify-content: space-between;" @click="goWithdrawal(0)">
                <view style="display: flex;align-items: center;">
                    <image src="../../../static/yhcar.png" class="img"></image>
                    <view class="text">
                        银行卡
                    </view>
                </view>
                <view class="bind" v-if="isBinkCard==1">
                    提现 >
                </view>
                <view class="bind" v-else>
                    立即绑定银行卡 >
                </view>
            </view>
            <view class="line">
            </view>
            <!-- <view class="item" style="display: flex;justify-content: space-between;" @click="goWithdrawal(1)">
                <view style="display: flex;align-items: center;">
                    <image src="../../../static/weChatPay.png" class="img"></image>
                    <view class="text">
                        微信
                    </view>
                </view>
                <view class="bind" v-if="isWeChat==1">
                    提现 >
                </view>
                <view class="bind" v-else>
                    立即绑定微信 >
                </view>
            </view>
            <view class="line">
            </view> -->
            <view class="item" style="display: flex;justify-content: space-between;" @click="goWithdrawal(2)">
                <view style="display: flex;align-items: center;">
                    <image src="../../../static/zfb.png" class="img"></image>
                    <view class="text">
                        支付宝
                    </view>
                </view>
                <view class="bind" v-if="isALi==1">
                    提现 >
                </view>
                <view class="bind" v-else>
                    立即绑定支付宝 >
                </view>
            </view>
        </view>
        <view class="way">
            <view class="blue">
            </view>
            <view class="text">
                提现记录
            </view>
        </view>
        <view class="footer">
            <!-- <image src="../../static/null.png" class="img"></image> -->
            <view v-if="moneyRecordList.length>0">
                <view class="item" v-for="(item,index) in moneyRecordList" :key="item.extract_index">
                    <view class="item-l">
                        <view class="text-t">
                            <view class="weight">
                                提现
                            </view>
                            <view class="solid">
                                {{wxOrCard(item.withdrawal_type)}}
                            </view>
                        </view>
                        <view class="text-b">
                            {{$time(item.extract_time,2)}}
                        </view>
                    </view>
                    <view class="item-r">
                        <view class="num">
                            -{{$returnFloat(item.extract_money)}}
                        </view>
                        <view class="text-r text111" v-if="item.payment_status==0">
                            提现中
                        </view>
                        <view class="text-r text111" v-if="item.payment_status==1">
                            提现成功
                        </view>
                        <view class="text111" v-if="item.payment_status==2">
                            <view class="text-l" @click="open(item)">
                                查看驳回原因
                            </view>
                            <view class="text-r" v-if="item.payment_status==2">
                                已驳回
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view v-else style="text-align: center;margin-top: 100rpx;">
                <image src="../../../static/datanull.png" style="width: 344rpx;height: 300rpx;" mode=""></image>
            </view>

        </view>
        <view>
            <uni-popup ref="popup" type="center">
                <view class="dialog">
                    <view class="dia-t">
                        驳回原因
                    </view>
                    <view class="dia-c">
                        {{refund_reason}}
                    </view>
                    <view class="dia-f" @tap="close">
                        我知道了
                    </view>
                </view>
            </uni-popup>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 用户标识全局的
                token: "",
                // 得到的金额数据
                balance: 0.00,
                in_cash: 0.00,
                cumulative: 0.00,

                // 得到的提现记录数据
                moneyRecordList: [],
                // 提现列表请求页数
                pageIndex: "1",
                //从接口拿到总页数
                total_page: "0",
                rulesShow: false,
                rulesList: "",
                // 是否绑定银行卡 1绑定
                isBinkCard: "2",
                // 是否绑定微信 1绑定
                isWeChat: "2",
                // 是否绑定支付宝 1绑定
                isALi: "2",

                userInfo: {},
                hasUserInfo: false,
                refund_reason: "",

                status: ""
            }
        },
        onLoad(e) {
            this.status = e.status
            console.log(this.status)
        },
        onShow() {
            this.moneyRecordList = [];
            this.pageIndex = 1;
            this.getMoneyInfo();
        },
        onReachBottom() {
            ++this.pageIndex
            if (this.pageIndex < this.total_page) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserExtract/extract_list',
                    data: {
                        count: "10",
                        page: this.pageIndex,
                        type: 1,
                    }
                }).then(res => {
                    if (res.data.success) {

                        if (this.moneyRecordList.length > 0) {
                            this.moneyRecordList = [...this.moneyRecordList, ...res.data.data.list]
                        } else {
                            this.moneyRecordList = res.data.data.list
                        }

                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            }
        },
        onPullDownRefresh() {
            console.log('refresh');

            this.moneyRecordList = [];
            this.pageIndex = 1;
            this.getMoneyInfo();
        },
        methods: {
            getMoneyInfo() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/user/user_money',
                    data: {}
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {

                        let data = res.data.data
                        if (self.status == 1) {
                            self.balance = data.cash;
                            self.in_cash = data.total_in_cash;
                            self.cumulative = data.total_extract_cash;
                        } else {
                            self.balance = data.consumption;
                            self.in_cash = data.total_in_consumption;
                            self.cumulative = data.total_extract_consumption;
                        }

                        this.isBinkCard = data.bank
                        this.isWeChat = data.wx
                        this.isALi = data.alipay
                        this.rulesList = data.withdraw_rule;
                        console.log(this.rulesList)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })

                // 拿到提现列表数据
                self.request({
                    url: 'ShptUapi/public/index.php/UserExtract/extract_list',
                    data: {
                        count: "10",
                        page: self.pageIndex,
                        type: self.status,
                    }
                }).then(res => {
                    console.log(res)
                    uni.stopPullDownRefresh();
                    if (res.data.success) {

                        self.total_page = res.data.data.total_page
                        self.moneyRecordList = res.data.data.list
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }

                })

            },
            // 跳转到提现页面
            goWithdrawal(e) {
                if (e == 0) {
                    //提现到银行卡
                    if (this.isBinkCard == 1) {
                        uni.navigateTo({
                            url: "withdrawal?cash=" + this.balance + '&bank=1&status=' + this.status
                        })
                    } else {
                        this.goAddMyCard();
                    }

                } else if (e == 1) {
                    //提现到微信
                    console.log(this.isWeChat)
                    if (this.isWeChat == 1) {
                        this.gowx()
                    } else {
                        this.wxBind()
                    }

                } else {
                    //提现到支付宝
                    if (this.isALi == 1) {
                        uni.navigateTo({
                            url: "withdrawal?cash=" + this.balance + '&ali=1&status=' + this.status
                        })
                    } else {
                        this.goBindALiPay();
                    }

                }

            },
            //绑定银行卡
            goAddMyCard() {
                uni.navigateTo({
                    // url:"../myCard/addMyCard?cash="+this.money.cash
                    url: "addMyCard?cash=" + this.balance+ '&status=' + this.status
                })
            },
            //提现到微信
            gowx() {
                uni.navigateTo({
                    // url:"../myCard/withdrawal?userInfo="+JSON.stringify(res.userInfo)+'&cash='+this.money.cash+'&weixin=1'
                    url: "withdrawal?weixin=1" + '&cash=' + this.balance + '&status=' + this.status
                })
            },
            //绑定支付宝
            goBindALiPay() {
                uni.navigateTo({
                    url: "addALIMsg?cash=" + this.balance + '&status=' + this.status
                })
            },
            openRules() {
                this.rulesShow = true;
            },

            // 跳转到微信提现
            wxBind() {
                // var that = this

                // if (that.isWeChat == 1) {
                //     that.gowx()
                // } else {

                //     wx.login({
                //         success(res) {
                //             console.log(res)
                //             myCashApi.get_openid({
                //                 code: res.code
                //             }).then(res => {
                //                 if (res.status == 200) {

                //                 } else {
                //                     uni.showToast({
                //                         title: res.message,
                //                         icon: "none"
                //                     })
                //                 }
                //             })
                //         }
                //     })
                //     wx.getUserProfile({
                //         desc: "用于完善用户信息",
                //         success: (res) => {
                //             uni.navigateTo({
                //                 url: "../myCard/withdrawal?userInfo=" + JSON.stringify(res
                //                         .userInfo) +
                //                     '&cash=' + this.money.cash + '&weixin=1'
                //             })
                //         }
                //     })
                // }

                let self = this;

                uni.getProvider({
                    service: 'oauth',
                    success: function(res) {
                        console.log(res.provider);
                        //支持微信、qq和微博等
                        if (~res.provider.indexOf('weixin')) {
                            uni.login({
                                provider: 'weixin',
                                success: function(loginRes) {
                                    console.log('-------获取openid(unionid)-----');
                                    console.log(JSON.stringify(loginRes));
                                    // 获取用户信息
                                    uni.getUserInfo({
                                        provider: 'weixin',
                                        success: function(infoRes) {
                                            console.log('-------获取微信用户所有-----');
                                            console.log(JSON.stringify(infoRes
                                                .userInfo));

                                            let data = infoRes.userInfo

                                            self.request({
                                                url: 'ShptUapi/public/index.php/UserConsumers/binding_wechat',
                                                data: {
                                                    wechat_openid: data
                                                        .openId,
                                                    wechat_unionID: data
                                                        .unionId,
                                                    nickName: data.nickName
                                                }
                                            }).then(res => {
                                                console.log(res)
                                                if (res.data.success) {
                                                    self.isWeChat = true
                                                }
                                                uni.showToast({
                                                    title: res.data
                                                        .msg,
                                                    icon: 'none'
                                                })

                                            })
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            },
            // 查看原因打开弹层
            open(e) {
                this.refund_reason = e.refund_reason
                // 通过组件定义的ref调用uni-popup方法
                this.$refs.popup.open()
            },
            // 关闭弹层
            close() {
                this.$refs.popup.close()
            },
            // 将得到的状态转换为对应的值
            wxOrCard(e) {
                if (e == 1) {
                    return "微信零钱"
                } else if (e == 2) {
                    return "支付宝"
                } else {
                    return "银行卡"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        .header {
            width: 750rpx;
            height: 260rpx;
            background: linear-gradient(0deg, #FD635E, #FD635E);
            padding: 30rpx;
            box-sizing: border-box;

            .header-b {
                display: flex;
                justify-content: space-between;
                margin-top: 81rpx;

                .item-l {
                    width: 245rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 23rpx;
                }

                .item-r {
                    width: 268rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 23rpx;

                }
            }

            .header-t {
                display: flex;
                justify-content: space-between;


                .header-l {
                    width: 216rpx;

                    .text {
                        font-size: 26rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #FFFFFF;
                        line-height: 25rpx;
                    }

                    .num {
                        width: 179rpx;
                        font-size: 60rpx;
                        font-family: Arial;
                        font-weight: 400;
                        color: #FFFFFF;
                        line-height: 45rpx;
                        margin-top: 27rpx;
                    }
                }

                .header-r {
                    width: 180rpx;
                    height: 50rpx;
                    background-color: rgba(255, 255, 255, 0.3);
                    color: #e1edff;
                    border-radius: 25rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    .text {
                        margin-left: 10rpx;
                        margin-bottom: 6rpx;
                        line-height: 50rpx;
                    }

                    .img {
                        width: 32rpx;
                        height: 32rpx;
                        margin: 6rpx;
                    }
                }

            }


        }

        .way {
            width: 750rpx;
            height: 70rpx;
            background: #F5F5F5;
            display: flex;
            align-items: center;

            .blue {
                width: 5rpx;
                height: 30rpx;
                background: #FD635E;
                margin-left: 30rpx;
            }

            .text {
                width: 182rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 25rpx;
                margin-left: 17rpx;
                margin-bottom: 2rpx;

            }
        }

        .banner {
            width: 750rpx;
            height: 183rpx;

            .item {
                display: flex;
                align-items: center;
                height: 90rpx;
                margin-left: 31rpx;

                .img {
                    width: 44rpx;
                    height: 44rpx;
                }

                .text {
                    width: 78rpx;
                    line-height: 25rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    margin-left: 22rpx;

                }

                .bind {
                    // width: 80%;
                    margin-right: 30rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 25rpx;
                }
            }

            .line {
                width: 719rpx;
                height: 2rpx;
                background: #F5F5F5;
                margin-left: 31rpx;

            }
        }

        .footer {

            width: 100%;

            .img {
                width: 344rpx;
                height: 298rpx;
                margin-top: 201rpx;
                margin-left: 202rpx;
            }

            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2rpx solid #f5f5f5;

                .item-l {
                    margin: 30rpx 0;
                    margin-left: 30rpx;

                    .text-t {
                        display: flex;
                        justify-content: flex-start;
                        margin-bottom: 10rpx;

                        .weight {
                            font-size: 26rpx;
                            font-family: PingFang SC;
                            font-weight: 500;
                            color: #333333;
                        }

                        .solid {
                            font-size: 26rpx;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: #999999;
                            margin-left: 10rpx;
                        }
                    }

                    .text-b {
                        font-size: 22rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #999999;
                    }
                }

                .item-r {
                    margin-right: 30rpx;

                    .num {
                        font-size: 26rpx;
                        font-family: PingFang SC;
                        font-weight: bold;
                        color: #FF5454;
                        text-align: right;
                    }

                    .text {
                        display: flex;
                        justify-content: space-between;
                        width: 220rpx;
                        text-align: right;

                        .text-l {

                            font-size: 26rpx;
                            font-family: PingFang SC;
                            font-weight: 400;
                            text-decoration: underline;
                            color: #2897FF;
                            margin-right: 35rpx;


                        }

                        .text-r {
                            font-size: 26rpx;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: #999999;
                            display: inline-block;

                        }
                    }
                }
            }
        }

        .text111 {
            text-align: right;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            width: 300rpx;

            .text-l {
                text-decoration: underline;
                color: #FD635E;
                margin-right: 35rpx;
                display: inline-block;
            }

            .text-r {
                display: inline;
            }

        }
    }

    .dialog {
        width: 500rpx;
        height: 300rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;

        .dia-t {

            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #333333;
            margin: 30rpx auto;
            text-align: center;

        }

        .dia-c {

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            margin: 0 28rpx;


        }

        .dia-f {
            width: 100%;
            height: 90rpx;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #FD635E;
            text-align: center;
            line-height: 90rpx;
            margin-top: 25rpx;
            border-top: 2rpx solid #f5f5f5;

        }

    }
</style>
