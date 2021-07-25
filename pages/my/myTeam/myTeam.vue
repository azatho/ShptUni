<!-- 服务商中心 -->
<template>
    <view>
        <!-- 头部区 -->
        <view class="head">
            <view class="left">
                <!-- 这里后台拼了cdn -->
                <image :src="$imgUrl(serverInfo.photo)"></image>
                <view>
                    <view class="txt1">{{serverInfo.name}}</view>
                    <view class="txt2">{{serverInfo.phone}}</view>
                </view>
            </view>

        </view>
        <!-- 消息区 -->
        <view class="news" v-if="newsList.length != 0">
            <view class="news_img">
                <image src="../../../static/news_team.png"></image>
            </view>
            <view class="news_word">
                <swiper :autoplay="autoplay" :interval="interval1" :vertical="vertical" circular="true">
                    <swiper-item v-for="(item, i) in newsList" :key="i" @click="goNewInfo(item.content)">
                        <view class="word">{{item.title}}！</view>
                    </swiper-item>
                </swiper>
            </view>
            <view @click="getAll" style="color: #999999;font-size: 24rpx;margin-right: 30rpx;width: 100rpx;">全部>></view>
        </view>


        <!-- 可提现区 -->
        <view style="width: 100%;height: 300rpx;background-color: #F5F5F5;">
            <view class="blanne">
                <view>累计营收(元)</view>
                <view style="display: flex;justify-content: space-between;margin: 40rpx 0 20rpx;">
                    <view class="txt3">{{serverInfo.revenue_breakdown?$returnFloat(serverInfo.revenue_breakdown):0.00}}
                    </view>
                    <view class="txt4" @click="goblance()">营收明细</view>
                </view>
            </view>
        </view>


        <!-- 我的团队 -->
        <view class="time">
            <view style="font-size: 30rpx;margin-bottom: 40rpx;font-weight: 500;">我的团队</view>
            <view style="display: flex; justify-content: space-between;align-items: center;margin-bottom: 10rpx;">
                <view class="inp">
                    <image src="../../../static/search1.png"></image>
                    <input type="number" maxlength="11" @input="iptNum" placeholder="请输入手机号搜索团队成员"
                        placeholder-style="height:70rpx;line-height: 70rpx;" v-model="phone" />
                    <image src="../../../static/fwsdel.png" v-if="phone.length!=0" @click="reset"></image>
                </view>
                <text style="font-size: 30rpx;color: #ECC2A9;" @click="getsearch">搜索</text>
            </view>
            <!-- 个人信息 -->
            <block>
                <view style="width: auto;" v-for="(item,index) in teamList" :key="index">
                    <view class="user">
                        <view style="display: flex; align-items: center;">
                            <view class="one">

                                <image :src="$imgUrl(item.photo)"></image>
                                <view class="rank">{{item.rank_name}}</view>
                            </view>
                            <view class="two">
                                <view>用户昵称：{{item.name}}</view>
                                <view style="margin-top: 10rpx;">手机号码：{{item.phone | mobileFilter}}</view>
                            </view>
                        </view>
                        <view @click="getsee(index)">查看>></view>
                    </view>


                    <view class="btmall" style="display: flex;flex-direction:row;">
                        <view
                            style="display: flex;flex-direction:column;width: 25%;height: 80rpx;text-align: center;color: #999999;margin-top: 35rpx;font-size: 26rpx;">
                            <view>{{item.invitation_num}}</view>
                            <view style="font-size: 26rpx;">邀请人数</view>
                        </view>
                        <view
                            style="display: flex;flex-direction:column;width: 25%;height: 80rpx;text-align: center;color: #999999;margin-top: 35rpx;font-size: 26rpx;">
                            <view>{{item.join_num}}</view>
                            <view style="font-size: 26rpx;">参团次数</view>
                        </view>
                        <view
                            style="display: flex;flex-direction:column;width: 25%;height: 80rpx;text-align: center;color: #999999;margin-top: 35rpx;font-size: 26rpx;">
                            <view>{{item.get_num}}</view>
                            <view style="font-size: 26rpx;">抢中次数</view>
                        </view>
                        <view
                            style="display: flex;flex-direction:column;width: 25%;height: 80rpx;text-align: center;color: #999999;margin-top: 35rpx;font-size: 26rpx;">
                            <view>{{item.zhang_num}}</view>
                            <view style="font-size: 26rpx;">鸿运勋章</view>
                        </view>
                    </view>
                </view>
                <!-- <loadmore :content-text="contentText" :status="status" @clickLoadMore="reachBtm"
                    v-if="isshow&&teamList.length!=0"></loadmore> -->
                <view class="zwsj" v-if="teamList.length==0">
                    <image src="../../../static/datanull.png"></image>
                </view>
            </block>
        </view>
        <!-- 查看弹窗 -->
        <view class="window" v-if="see">
            <view class="particulars">
                <image src="../../../static/fwsdel.png" class="del" @click="getdel()"></image>
                <view style="font-size: 36rpx;font-weight: bold;text-align: center;margin-bottom: 40rpx;">成员详情</view>
                <view class="hang">
                    <view>用户头像</view>
                    <image :src="$imgUrl(teamMember.photo)" style="margin-left: 16rpx;"></image>

                </view>
                <view class="hang">
                    <view>用户昵称</view>：
                    <text>{{teamMember.name}}</text>
                </view>
                <view class="hang">
                    <view>等&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp级</view>：
                    <text class="rank">{{teamMember.rank_name}}</text>

                </view>
                <view class="hang">
                    <view>手&nbsp机&nbsp&nbsp号</view>：
                    <text>{{teamMember.phone}}</text>
                </view>
                <view class="hang">
                    <view>性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别</view>：
                    <text v-if="teamMember.sex==''">男</text>
                    <text v-if="teamMember.sex=='女'">女</text>
                </view>
                <view class="hang">
                    <view>直接推荐</view>：
                    <text>{{teamMember.invitation_num}}人</text>
                </view>

                <view class="hang">
                    <view>注册时间</view>：

                    <text> {{$time(teamMember.regtime,0)}}</text>

                </view>
            </view>
        </view>
    </view>
</template>

<script>
    // import serverBusinessAPI from "../../api/index/serverBusiness.js"
    import loadmore from "../../../components/uni-load-more/uni-load-more.vue"
    export default {
        components: {
            loadmore
        },
        data() {
            return {
                phone: '', //手机号
                see: false, //弹窗是否显示
                interval1: 3000,
                autoplay: true, //是否自动切换
                //放六个数据的对象
                dataInfo: {},
                //公告列表
                newsList: [],
                //服务商 tab栏要传的day
                // 全部传 -1 当天传0 昨天传1 7天传7 30天传30   默认为0
                day: 0,
                //团队列表
                teamList: [],
                //数组备份  用于重置数组
                preList: [],
                //服务商信息
                serverInfo: {},
                flag: true,
                isshow: true,
                //要查询的页码
                page: 1,
                //一页多少条
                count: 20,
                //当前页
                currentPage: "",
                //总页数
                lastPage: "",
                //判断触底加载是否触发调用接口
                flag1: true,
                vertical: true,
                status: 'more',
                statusTypes: [{
                    value: 'more',
                    text: '加载前',
                    checked: true
                }, {
                    value: 'loading',
                    text: '加载中',
                    checked: false
                }, {
                    value: 'noMore',
                    text: '没有更多',
                    checked: false
                }],
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多了'
                }
            }
        },
        onLoad() {
            this.init();
        },
        //触底分页
        onReachBottom() {
        //     if (this.flag1) {
                this.reachBtm();
            // }

        },
        filters: {
            mobileFilter(val) {
                let reg = /^(.{3}).*(.{4})$/
                return val.replace(reg, '$1****$2')
            }
        },
        methods: {
            init() {
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/personal',
                    data: {}
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.serverInfo = res.data.data.userinfo;
                        if (self.serverInfo.phone != 0) {
                            // // 正则表达式手机号隐藏中间4位
                            // if (self.serverInfo.phone) {
                            // 	self.serverInfo.phone = self.serverInfo.phone.replace(/^(\d{3})\d{4}(\d+)/,'$1****$2');
                            // }
                        } else {
                            self.serverInfo.phone = ''
                        }
                    } else {
                        self.showlogin = false;
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                }, rej => {
                    console.log(rej);
                })

                //拿团队信息
                this.getTeamList({
                    count: this.count,
                    page: this.page
                });
                this.getNews();
            },
            getNews() {
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/Recommend/newList',
                    data: {
                        region: "2"
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.newsList = res.data.data
                    }
                }, rej => {
                    console.log(rej);
                })
            },
            //触底加载
            reachBtm() {
                console.log(123)
                this.status = "loading"
                // this.flag1 = false
                if (this.page <= this.lastPage) {
                    this.page++;
                    this.getTeamList({
                        count: this.count,
                        page: this.page
                    })
                }
            },

            getTeamList(data) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserInvite/invite',
                    data: data
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        // this.teamList = res.data.data
                        let result = res.data.data.list
                        //备份原数组
                        self.preList = self.teamList;

                        self.teamList.length > 0 ? self.teamList = [...self.teamList, ...result] : self
                            .teamList = result

                        self.lastPage = res.data.data.total_page
                        // this.currentPage = res.data.current_page
                        if (res.data.data.length < self.count) {
                            self.status = "nomore"
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            //重置搜索栏   值清0    还原数组
            reset() {
                this.phone = ""
                this.teamList = []
                this.getTeamList({
                    count: this.count,
                    page: 1
                })
                this.isshow = true
            },
            //跳公告列表
            getAll() {
                uni.navigateTo({
                    url: '../../index/nweList?type=2'
                })
            },
            // 跳转至新闻公告页面
            goNewInfo(e) {
                uni.navigateTo({
                    url: '../../index/newsInfo?src=' + e
                })
            },
            // 余额记录
            goblance() {
                uni.navigateTo({
                    url: '../groupPrincipal/rechargeDetail?status=3'
                })

            },

            //长度为0 就反显 后期看需求 是否更改  例如长度小于11 就反显
            //长度为0 就反显 后期看需求 是否更改  例如长度小于11 就反显
            //长度为0 就反显 后期看需求 是否更改  例如长度小于11 就反显
            iptNum(e) {
                console.log(123)

                if (e.detail.value.length == 0) {
                    // this.teamList = this.preList
                    this.getTeamList({
                        count: this.count,
                        page: this.page
                    })
                }

            },
            // 手机号
            getphone(e) {
                this.phone = e.detail.value
            },
            // 搜索
            getsearch() {
                this.teamList = [];
                this.getTeamList({
                    count: this.count,
                    page: this.page,
                    phone: this.phone
                })
            },
            // 查看弹窗
            getsee(e) {
                this.see = true
                this.teamMember = this.teamList[e]
            },
            // 关闭查看
            getdel() {
                this.see = false
            },

        }
    }
</script>

<style lang="scss">
    page {
        /* background-color: #F5F5F5; */
        /* width: 100%;
	height: 100%; */
    }

    page image {
        width: 100%;
        height: 100%;
    }

    /* 头部 */
    .head {
        display: flex;
        justify-content: space-between;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        align-items: center;
        background-color: #FFFFFF;
    }

    .head .left {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .head .left image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
    }

    .head .left .txt1 {
        color: #333333;
        font-size: 30rpx;
    }

    .head .right {
        /* width: 100rpx; */
        height: 50rpx;
        display: flex;
        align-items: center;
    }

    .head .right image {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
        vertical-align: middle;
    }

    /* 消息区 */
    .news {
        width: 100%;
        height: 70rpx;
        // margin: 0 30rpx;
        // background: rgba(255, 255, 255, 1);
        padding-left: 30rpx;
        padding-right: 30rpx;
        background-color: rgba(236, 194, 169, 0.2);
        display: flex;
        align-items: center;

        .news_img {
            width: 32rpx;
            height: 32rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .news_word {
            flex: 1;

            padding-left: 20rpx;

            swiper {
                height: 70rpx;

                .word {
                    height: 70rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 26rpx;
                    line-height: 75rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    // color: #f63b42;
                }
            }
        }

        .more {
            height: 70rpx;
            line-height: 70rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            color: #999;
            display: flex;
            align-items: center;

            image {
                width: 28rpx;
                height: 28rpx;
                padding-top: 5rpx;
            }
        }
    }

    // /* 消息区 */
    // .massge {
    //     width: 100%;
    //     background-color: rgba(236, 194, 169, 0.2);
    //     /* padding: 30rpx; */
    //     font-size: 24rpx;
    //     font-family: PingFang SC;
    //     font-weight: 400;
    //     color: #333333;
    // }

    // .massge image {
    //     width: 32rpx;
    //     height: 32rpx;
    //     vertical-align: middle;
    //     margin-right: 10rpx;
    // }

    /* 可提现区 */
    .blanne {
        width: 690rpx;
        height: 240rpx;
        background-image: url(../../../static/wfsbgc.png);
        background-size: cover;
        margin: 30rpx;
        padding: 30rpx 50rpx 30rpx 40rpx;
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #ECC2A9;
        box-sizing: border-box;
    }

    .blanne .txt3 {
        font-size: 44rpx;
    }

    .blanne .txt4 {
        width: 135rpx;
        height: 50rpx;
        background: #ECC2A9;
        border-radius: 25rpx;
        line-height: 50rpx;
        font-weight: 300;
        color: #3B3B3B;
        text-align: center;
    }

    /* 数据明细 */
    .detail {
        padding: 40rpx 30rpx 50rpx 30rpx;
        background-color: #FFFFFF;
        width: 100%;
        box-sizing: border-box;
    }

    .tabs {
        width: 690rpx;
        height: 60rpx;
        margin-top: 48rpx;
        display: flex;
        border-radius: 30rpx;
        color: #ECC2A9;
        border: 1rpx solid #ECC2A9;
        align-items: center;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .tabs .lb:nth-child(1) {
        border: none;
        border-radius: 30rpx 0 0 30rpx;
    }

    .tabs .lb:nth-child(5) {
        border-radius: 0 30rpx 30rpx 0;
    }

    .tabs .lb {
        height: 100%;
        line-height: 60rpx;
        color: #484848;
        font-size: 26rpx;
        flex: 1;
        text-align: center;
        border-left: 1rpx solid #ECC2A9;
    }

    .tabs .bg {
        height: 100%;
        line-height: 60rpx;
        font-size: 26rpx;
        flex: 1;
        text-align: center;
        background-color: #ECC2A9;
        color: #484848;
    }

    .detail .first {
        width: 30%;
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #333333;
        text-align: center;
        margin-top: 50rpx;
    }

    .detail .first .txt5 {
        font-size: 44rpx;
        font-weight: 400;
    }

    /* 我的团队 */
    .time {
        padding: 30rpx;
        background-color: #FFFFFF;
        box-sizing: border-box;
    }

    .time .inp {
        width: 600rpx;
        height: 70rpx;
        position: relative;
        background: #F5F5F5;
        border-radius: 35rpx;
    }

    .time .inp image {
        width: 29rpx;
        height: 29rpx;
        position: absolute;
        left: 20rpx;
        top: 20rpx;
    }

    .time .inp image:last-child {
        width: 29rpx;
        height: 29rpx;
        position: absolute;
        left: 550rpx;
        top: 20rpx;
    }

    .time .inp input {
        width: 550rpx;
        height: 70rpx;
        // line-height: 70rpx;
        background: #F5F5F5;
        border-radius: 35rpx;
        padding-left: 60rpx;
        box-sizing: border-box;
        font-size: 26rpx;
    }

    /* 个人信息 */
    .user {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        padding: 20rpx 30rpx ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1rpx solid #F5F5F5;
    }

    .user .one {
        position: relative;
    }

    .user image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
    }

    .user .rank {
        width: 110rpx;
        height: 26rpx;
        background: #FFFFFF;
        border: 1rpx solid #8F7D6D;
        border-radius: 13rpx;
        font-size: 18rpx;
        text-align: center;
        line-height: 26rpx;
        color: #8F7D6D;
        position: absolute;
        left: -15rpx;
        bottom: -10rpx;
    }

    .user .two {
        margin-left: 50rpx;
    }

    .btmall {
        margin-top: 10rpx;
        // width: 80%;
        height: 125rpx;
        background: #FFFFFF;
        // border-radius: 10rpx;
        overflow: hidden;
        position: relative;
        background-image: url(../../../static/teamNumBg.png);
        background-size: 100% 125rpx;
        // padding-top: 20rpx;
        margin-bottom: 20rpx;
    }

    /* 弹窗 */
    .window {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        font-family: PingFang SC;
        font-weight: 400;
    }

    .particulars {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 500rpx;
        height: 564rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
        padding: 40rpx;
        box-sizing: border-box;
    }

    .particulars .del {
        position: absolute;
        right: 30rpx;
        top: 50rpx;
        width: 36rpx;
        height: 36rpx;
    }

    .particulars .hang {
        display: flex;
        font-size: 24rpx;
        color: #333333;
        align-items: center;
        margin: 10rpx;
        // width: 600rpx;
        // text-align-last:justify;
        // text-align: justify;

        // text-justify: distribute-all-lines;
    }

    .particulars .hang image {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        vertical-align: middle;
    }

    .hang view {
        width: 110rpx;
        text-align: justify;
        text-align-last: justify;
        text-justify: inter-ideograph;
    }

    .hang text {
        text-aline: justify;
    }

    .swiper {
        height: 80rpx;
        overflow: hidden;
    }

    .swiper-item {
        margin-left: 37rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 27rpx;
    }

    .zwsj {
        height: 330rpx;
        width: 380rpx;
        margin: 180rpx auto;

        image {
            width: 100%;
            height: 100%;
        }
    }
</style>
