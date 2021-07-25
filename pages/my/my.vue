<template>
    <view>
        <!-- 头部 -->
        <view class="top" v-if="showlogin">
            <view class="xiaoxi" style="width: 60rpx;height: 60rpx;line-height: 60rpx;" @click="goinformation()">
                <image src="../../static/message.png" style="width: 36rpx;height: 34rpx;"></image>
            </view>

            <view class="hang1" @click="setUserInfo">
                <view class="left">
                    <view class="img">
                        <image :src="userinfo.photo" class="img1"></image>
                        <view class="img2">{{userinfo.rank_name}}</view>
                    </view>
                    <view class="txt">
                        <view class="txt1">{{userinfo.name}}</view>
                        <view class="txt2">{{userinfo.phone}}</view>
                    </view>
                </view>
				<view class="right" @click.stop="goPointsMall()">
					<image src="../../static/score.png" alt="兑换区图标"
						style="width: 36rpx;height: 36rpx;margin-left: 20rpx;"></image>
					<view class="font-26"
						style="font-weight: 400;height: 48rpx;line-height: 48rpx;margin-left: 20rpx;color: #FEE275;">兑换区
					</view>
				</view>
            </view>
            <view class="hang2">
                <view class="one" @click="gocollect()">
                    <view class="txt1">{{userinfo.collect_shop||0}}</view>
                    <view class="txt2">收藏商品</view>
                </view>
                <view class="one" @click="goshopcollect()">
                    <view class="txt1">{{userinfo.collect_store||0}}</view>
                    <view class="txt2">收藏店铺</view>
                </view>
                <view class="one" @click="browsing()">
                    <view class="txt1">{{userinfo.collect_record||0}}</view>
                    <view class="txt2">浏览记录</view>
                </view>

            </view>

            <!-- 金额 -->
            <view class="integral">
				<view style="display: flex;">
					<view class="custom_bg" @click="goMoney(0)" style="border-right: 1rpx solid #EEEEEE ;">
					    <view class="msg" style="color: #333333;">
					        {{$returnFloat(userinfo.cash)}}
					    </view>
					    <view class="text" style="color: #333333;">我的余额</view>
					</view>
					
					<view class="custom_bg" @click="goMoney(1)" style="border-right: 1rpx solid #EEEEEE ;">
					    <view class="msg" style="color: #333333;">
					        {{$returnFloat(userinfo.consumption)}}
					    </view>
					    <view class="text" style="color: #333333;">拼团本金</view>
					</view>
				</view>
				<view style="display: flex;border-top:1rpx solid #EEEEEE; ;">
					<view class="custom_bg" @click="goMoney(2)" style="border-right: 1rpx solid #EEEEEE ;">
					    <view class="msg" style="color: #333333;">
					        {{$returnFloat(userinfo.coupon)}}
					    </view>
					    <view class="text" style="color: #333333;">我的金币</view>
					</view>
					
					<view class="custom_bg" @click="goMoney(3)" style="border-right: 1rpx solid #EEEEEE ;">
					    <view class="msg" style="color: #333333;">
					        {{$returnFloat(userinfo.user_integral)}}
					    </view>
					    <view class="text" style="color: #333333;">拼团积分</view>
					</view>
				</view>
            </view>

            <!-- 订单管理 -->
            <view class="indent">
                <view class="one" @click="goallindent(0)">
                    <view class="left" style="font-size: 30rpx;font-family: PingFang SC;font-weight: 500;color: #333333;">订单管理</view>
                    <view class="right">
                        <text>全部订单</text>
                        <image src="../../static/back.png" class="img1"></image>
                    </view>
                </view>
                <view class="two">
                    <view class="first" @click="goallindent(1)">
                        <view class="img1">
                            <image src="../../static/qian1.png"></image>
                        </view>
                        <view class="txt">待支付</view>
                    </view>
                    <view class="first" @click="goallindent(2)">
                        <view class="img1">
                            <image src="../../static/qian2.png"></image>
                        </view>
                        <view class="txt">待发货</view>
                    </view>
                    <view class="first" @click="goallindent(3)">
                        <view class="img1">
                            <image src="../../static/qian3.png"></image>
                        </view>
                        <view class="txt">待收货</view>
                    </view>
                    <view class="first" @click="goallindent(4)">
                        <view class="img1">
                            <image src="../../static/qian4.png"></image>
                        </view>
                        <view class="txt">已完成</view>
                    </view>
                    <view class="first" @click="gonoshop()">
                        <!-- v-if="userinfo.refund_button==1&&userinfo.barter_button==1 || userinfo.refund_button==0&&userinfo.barter_button==1|| userinfo.refund_button==1&&userinfo.barter_button==0" -->
                        <view class="img1">
                            <image src="../../static/qian5.png"></image>
                        </view>
                        <view class="txt" @click="goSaleList()">售后</view>
                    </view>
                </view>
                <view class="three" @click="gogroup()">
                    <view class="one" style="margin-top: 25rpx; border-top: 2rpx solid #F5F5F5; padding-top: 10rpx;">
                        <view class="left" style="margin-top: 5rpx;font-size: 30rpx;font-family: PingFang SC;font-weight: 500;color: #333333;">拼购订单</view>
                        <view class="right" style="margin-top: 5rpx;">
                            <image src="../../static/back.png" class="img1"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="top" v-else>
            <view class="register">
                <view style="font-size: 30rpx;">您还未登陆哦~</view>
                <button class="bttn" @click="goLogin" plain="true">登录</button>
            </view>
        </view>
        <!-- 代理 -->
        <view v-if="showlogin" style="position: relative;top: 330rpx;">
            <view class="agency" @click="management()">
                <view class="left">
                    <image src="../../static/d3.png" class="img1"></image>
                    <text style="font-size: 26rpx;">您已抢中{{already_num}}次，抢中满{{need_num}}次将获得鸿运勋章奖励</text>
                </view>
                <view class="right">
                    <image src="../../static/back.png"></image>
                </view>
            </view>
        </view>
        <view style="height: 255rpx;" v-if="showlogin"></view>
        <!-- 常用功能 -->
        <view class="feature">
            <view class="txt" style="font-family: PingFang SC;font-weight: 500;color: #333333;font-size: 30rpx;">常用功能</view>
            <view class="layout">
                <view class="fath" @click="enter()">
                    <image src="../../static/case1.png"></image>
                    <text>商户入驻</text>
                </view>
                <view class="fath" @click="supplierEnter()">
                    <image src="../../static/team.png"></image>
                    <text>我的团队</text>
                </view>
                <view class="fath" @click="register()">
                    <image src="../../static/Invite.png" style='width:48rpx;height:48rpx'></image>
                    <text>邀请注册</text>
                </view>
                <view class="fath" @click="site()">
                    <image src="../../static/myAddressSite.png" style='width:48rpx;height:48rpx'></image>
                    <text>地址管理</text>
                </view>
                <view class="fath" @click="gocritic()">
                    <image src="../../static/myrefund.png"></image>
                    <text>我的评论</text>
                </view>
                <view class="fath" @click="kefu()">
                    <image src="../../static/kefu.png"></image>
                    <text>在线客服</text>
                </view>
                <view class="fath" @click="problem()">
                    <image src="../../static/myquestion.png"></image>
                    <text>常见问题</text>
                </view>
                <view class="fath" @click="feedback()">
                    <image src="../../static/feedback.png"></image>
                    <text>意见反馈</text>
                </view>
                <view class="fath" @click="aboutUs()">
                    <image src="../../static/about.png"></image>
                    <text>关于我们</text>
                </view>

                <view class="fath" @click="help()">
                    <image src="../../static/help.png"></image>
                    <text>帮助中心</text>
                </view>
                <view class="fath" @click="setPage()">
                    <image src="../../static/set.png"></image>
                    <text>设置</text>
                </view>
            </view>
        </view>

        <view class="recommend" v-if="goodsList.length != 0">
            <view class="recommend_tit">
                <view class="word">
                    <image src="../../static/hostSales1.png" mode="" style="margin-right: 10rpx;"></image>好物推荐
                </view>
            </view>
            <u-waterfall v-model="goodsList">
                <template v-slot:left="{leftList}">
                    <view class="common_goods" style="margin-right: 10rpx;">
                        <block v-for="(item, index) in leftList" :key="index">
                            <view class="common_con" @click="goshopDetail(item.goods_sort, item.goods_index)">
                                <view class="">
                                    <image :src="cdnUrl + item.goods_icon" mode=""></image>
                                    <view class="name">
                                        {{ item.goods_name }}
                                    </view>
                                    <view class="intro">{{item.goods_intro}}</view>
                                    <view class="price"
                                        style="display: flex;justify-content: space-between;align-items: center;">
                                        <view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}
                                        </view>
                                        <view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </block>
                    </view>
                </template>
                <template v-slot:right="{rightList}">
                    <view class="common_goods">
                        <block v-for="(item, index) in rightList" :key="index">
                            <view class="common_con" @click="goshopDetail(item.goods_sort, item.goods_index)">
                                <view class="">
                                    <image :src="cdnUrl + item.goods_icon" mode=""></image>
                                    <view class="name">
                                        {{ item.goods_name }}
                                    </view>
                                    <view class="intro">{{item.goods_intro}}</view>
                                    <view class="price"
                                        style="display: flex;justify-content: space-between;align-items: center;">
                                        <view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}
                                        </view>
                                        <view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </block>
                    </view>
                </template>
            </u-waterfall>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                showlogin: true, //判断是否登录
                userinfo: {
                    user_integral: '0',
                    cash: "0",
                    consumption: "0",
                    coupon: "0",
                }, //用于存放个人信息
                cdnUrl: '', //存放网络图片地址
                // agency: false, //是否是代理
                apply_status: "", //用户审核状态
                goodsList: [],
                showGoods: false, //是否展示商品
                "need_num": "0", //抢中次数需满几次
                "already_num": "0", //已中次数

                page: "1", //优选好物第几页
                count: "5",
                pageCount: "",
                pageIndex: "", //优选好物最大页码数
                leftList: [],
                rightList: []

            };
        },
        onLoad() {
            this.recommend_shop();
            let self = this;
            self.request({
                url:'ShptUapi/public/index.php/login/update_cid',
                data:{
                    registration_id: uni.getStorageSync('cid')
                }
            }).then(res => {
                // if (res.data.success) {
                    
                //  } else {
                //     uni.showToast({
                //          title: res.data.msg,
                //          icon: 'none'
                //      })
                //  }
            })
        },
        onShow() {
            this.isLogin();
            // this.getGoods();
            this.cdnUrl = this.$cdnUrl;
        },
        onPullDownRefresh() {
            // setTimeout(function() {
            //     uni.stopPullDownRefresh();
            // }, 1000);

            this.goodsList = [];
            this.page = 1;
            this.recommend_shop();
            this.isLogin();
            // this.getGoods();
            this.cdnUrl = this.$cdnUrl;
        },
        onReachBottom() {
            // this.loadStatus = 'loading';
            if (this.page < this.pageIndex) {
                this.page++;
                this.recommend_shop();
                // this.loadStatus = 'loadmore';
            }
        },
        methods: {
            // 跳转售后列表
            goSaleList() {
                uni.navigateTo({
                    url: 'afterSales/salesList'
                })
            },
            getMedal() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserMoney/medal_info',
                    data: {}
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        self.need_num = res.data.data.need_num
                        self.already_num = res.data.data.already_num
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            //判断是否登录
            isLogin() {
                let self = this
                let device = self.$token()
                console.log(device)
                if (self.$token()) {
                    self.showlogin = true;
                    self.getUserInfo();
                    self.getMedal();
                } else {
                    self.showlogin = false;
                }
            },

            // 获取审核信息
            getApplyInfo() {
                let self = this;
                self.request({
                    url: "ugo/api/app.php?c=rank_apply/getApplyInfo",
                    data: {}
                }).then(res => {
                    if (res.data.success) {
                        self.apply_status = res.data.data.apply_status
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
			// 积分兑换
			goPointsMall(){
				uni.navigateTo({
					url:"pointsExchange/pointsExchange"
				})
			},
            // 获取个人信息
            getUserInfo() {
                console.log(uni.getStorageSync('token'))
                console.log(uni.getStorageSync('device'))
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/personal_v2',
                    data: {}
                }).then(res => {
                    uni.stopPullDownRefresh();
                    console.log(res)
                    if (res.data.success) {
                        // self.showlogin = true;
                        console.log(res.data.data.userinfo)
                        self.userinfo = res.data.data.userinfo;
                        // uni.setStorage('rank', self.userinfo.rank)
                        uni.setStorage({
                            key: 'rank',
                            data: self.userinfo.rank,
                            success: function() {
                                console.log('success', self.userinfo.rank);
                            }
                        });
                        uni.setStorage({
                            key: 'phone',
                            data: self.userinfo.phone,
                            success: function() {
                                console.log('success', self.userinfo.phone);
                                // console.log(this.$token())
                            }
                        });

                        uni.setStorage({
                            key: 'is_push',
                            data: self.userinfo.is_push,
                            success: function() {
                                console.log('success push', self.userinfo.is_push, typeof(self
                                    .userinfo.is_push));
                            }
                        });
                        if (self.userinfo.photo.split('http').length != 2) {
                            self.userinfo.photo = self.cdnUrl + self.userinfo.photo
                        }
                        if (self.userinfo.phone != 0) {
                            // 正则表达式手机号隐藏中间4位
                            if (self.userinfo.phone) {
                                self.userinfo.phone = self.userinfo.phone.replace(/^(\d{3})\d{4}(\d+)/,
                                    '$1****$2');
                            }
                        } else {
                            self.userinfo.phone = ''
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
            },
            // 获取优选好物列表
            recommend_shop() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/index/recommend_shop',
                    data: {
                        page: self.page,
                        count: self.count
                    }
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        self.goodsList.length > 0 ? self.goodsList = [...self.goodsList, ...res.data.data
                            .list
                        ] : self.goodsList = res.data.data.list;
                        self.pageIndex = res.data.data.total_page
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 到用户个人信息页面
            setUserInfo() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: 'user/userInfo'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 去设置页面
            setPage() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: "set/set"
                    })
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }

            },
            // 登录
            goLogin() {
                uni.navigateTo({
                    url: "../login/welcome/welcome"
                })
            },
            getGoods() {
                let self = this;
                self.request({
                    url: 'api/app.php?c=goods/youLikeGoods',
                    data: {
                        // token: uni.getStorage('token')
                    },
                    success: function(res) {
                        if (res.data.success) {
                            if (res.data.data.list.length != 0) {
                                self.goodsList = res.data.data.list
                                self.showGoods = true
                            } else {
                                self.showGoods = false
                            }
                        }
                    }
                });
            },
            // 消息页面
            goinformation() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: 'information/information'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 收藏商品
            gocollect() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: 'collect/collectlist'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 收藏店铺
            goshopcollect() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: 'collect/shopcollect'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 浏览记录
            browsing() {
                if (this.$token()) {
                    uni.navigateTo({
                        url: 'collect/browsing'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            //金额
            goMoney(e) {
                console.log(e)
                if (this.$token()) {
                    if (e == 0) {
                        //我的余额
                        if (this.$token()) {
                            uni.navigateTo({
                                url: "myCash/myCash"
                            })
                        }
                    } else if (e == 1) {
                        //拼团本金
                        uni.navigateTo({
                            url: "groupPrincipal/groupPrincipal"
                        })
                    } else if (e == 2) {
                        //我的金币
                        uni.navigateTo({
                            url: "goldCoin/goldCoin"
                        })
                    }else if(e==3){
						uni.navigateTo({
							url:"goldCoin/integral"
						})
					}
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }

            },
            // 到全部订单==>订单列表
            goallindent(e) {
                if (this.$token()) {
                    uni.navigateTo({
                        url: "order/order?id=" + e
                    })
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 售后
            gonoshop() {
                if (this.$token()) {
                    uni.navigateTo({
                        // url:'./afterSaleList?barter_button='+this.userinfo.barter_button+'&refund_button='+this.userinfo.refund_button
                        url: './afterSaleList'
                    })
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 到拼团订单页面
            gogroup() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'order/groupOrder?id=0'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 申请管理
            applyposition() {
                if (this.$token() != '') {
                    if (this.userinfo.rank == 1) {
                        uni.navigateTo({
                            url: './applyposition'
                        });
                    }
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 跳转鸿运界面
            management() {
                if (this.$token() != '') {
                    // if (this.userinfo.rank == 4 || this.userinfo.rank == 3 || this.userinfo.rank == 2) {
                    uni.navigateTo({
                        url: 'medal/medal'
                    });
                    // }
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 商户入驻
            enter() {
                if (this.$token() == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                    return
                }
                if (this.userinfo.enter == 2) {
                    uni.showToast({
                        icon: 'none',
                        title: '您已入驻成功，请前往后台管理'
                    })
                    return
                }
                uni.navigateTo({
                    url: 'shopEnter/shopEnter?enter=' + this.userinfo.enter
                });
            },
            // 我的团队
            supplierEnter() {
                if (this.$rank() > 1) {
                    if (this.$token() == '') {
                        uni.showToast({
                            icon: 'none',
                            title: '未登录，请重新登录'
                        })
                        return
                    }

                    uni.navigateTo({
                        url: 'myTeam/myTeam'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '请升级后再查看'
                    })
                }

            },
            // 地址管理
            site() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'adress/addressList'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 邀请注册
            register() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'inviteToRegister/allowInvite'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 我的评论
            gocritic() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'evaluate/myComment'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 我的客服
            kefu() {

                if (uni.getStorageSync('token')) {

                    uni.navigateTo({
                    	url:'meiqia'
                    })
                } else {
                    uni.showToast({
                        title: '未登录，请重新登录',
                        icon: 'none'
                    })
                }
            },
            // 常见问题页面
            problem() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'custom/faq'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 意见反馈页面
            feedback() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'custom/feedBack'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 帮助中心页面
            help() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'custom/help'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 关于我们页面
            aboutUs() {
                if (this.$token() != '') {
                    uni.navigateTo({
                        url: 'custom/aboutUs'
                    });
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '未登录，请重新登录'
                    })
                }
            },
            // 跳转至商品详情页面
            goshopDetail(a, b) {
                uni.navigateTo({
                    url: '../shop/goodsDeatil?id=' + b
                })
            },
        }
    };
</script>

<style lang="scss">
    page {
        background-color: #f5f5f5;
    }

    /* 头部 */
    .top {
        width: 750rpx;
        height: 430rpx;
        background-image: url(../../static/mybgi.png);
        background-size: cover;
        color: #ffffff;
        position: relative;
    }

    .top .xiaoxi {
        // width: 36rpx;
        // height: 34rpx;
        position: absolute;
        right: 30rpx;
        top: 60rpx;
    }

    .top .register {
        color: #ffffff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .top .bttn {
        width: 260rpx;
        height: 60rpx;
        line-height: 55rpx;
        text-align: center;
        border-radius: 50rpx;
        border: 1rpx solid #fff !important;
        color: #ffffff;
        margin-top: 30rpx;
    }

    .top .hang1 {
        margin: 0 0 0 30rpx;
        padding-top: 120rpx;
        display: flex;
        justify-content: space-between;
    }

    .hang1 image {
        width: 100%;
        height: 100%;
    }

    .hang1 .left {
        display: flex;
        justify-content: space-between;
    }

    .hang1 .left .img {
        position: relative;
    }

    .hang1 .left .img1 {
        width: 114rpx;
        height: 114rpx;
        border-radius: 50%;
    }

    .hang1 .left .img2 {
        width: 138rpx;
        height: 35rpx;
        background: #FFFFFF;
        border: 1px solid #FD494F;
        border-radius: 18rpx;
        font-size: 22rpx;
        font-family: PingFang SC;
        text-align: center;
        line-height: 35rpx;
        font-weight: 500;
        color: #FD494F;
        position: absolute;
        left: -10rpx;
        top: 90rpx;
    }

    .hang1 .left .txt {
        color: #ffffff;
        font-family: PingFang SC;
        margin-left: 25rpx;
        padding-top: 20rpx;
    }

    .hang1 .txt .txt1 {
        font-size: 34rpx;
        font-weight: 500;
    }

    .hang1 .txt .txt2 {
        font-size: 24rpx;
        font-weight: 400;
    }

    .hang1 .right {
        width: 180rpx;
        height: 60rpx;
        background-color: rgba(48, 48, 48, 0.5);
        /* opacity: 0.5; */
        border-radius: 24rpx 0 0 24rpx;
        margin-top: 30rpx;
        display: flex;
        align-items: center;
    }

    .top .hang2 {
        margin: 40rpx 30rpx 0;
        display: flex;
        justify-content: space-between;
        text-align: center;
    }

    .top .hang2 .one {
        width: 25%;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
    }

    .hang2 .one .txt1 {
        font-size: 40rpx;
    }

    .hang2 .one .txt2 {
        font-size: 24rpx;
    }

    /* 金额 */
    .integral {
        background-image: url(../../static/money_bg.png);
        background-size: 100% 100%;
        position: relative;
        left: 0;
        top: 20rpx;
        width: 690rpx;
        height: 316rpx;
        box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);
        border-radius: 10rpx;
        margin: 0 30rpx;
        box-sizing: border-box;
        padding-top: 30rpx;

        .custom_bg {
            display: flex;
            flex-direction: column;
            padding-top: 30rpx;
            width:345rpx;
            height: 120rpx;

            text-align: center;

            .msg {
                height: 50%;
                line-height: 50%;
                font-size: 38rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #333333;
            }

            .text {
                // margin-top: 45rpx;
                padding-top: 20rpx;
                height: 50%;
                line-height: 50%;

                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
    }

    /* 订单管理 */
    .indent {
        position: relative;
        left: 0;
        top: 40rpx;
        width: 690rpx;
        height: 300rpx;
        background: #ffffff;
        box-shadow: 0rpx 0rpx 15rpx 0rpx rgba(179, 179, 179, 0.4);
        border-radius: 10rpx;
        margin: 0 30rpx;
        padding: 30rpx;
        box-sizing: border-box;
    }

    .indent image {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    /* 第一行 */
    .indent .one {
        display: flex;
        justify-content: space-between;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
    }

    .indent .one .left {
        color: #333333;
        font-weight: 500;
    }

    .indent .one .right {
        color: #999999;
        font-size: 24rpx;
    }

    .one .right .img1 {
        width: 14rpx;
        height: 26rpx;
        margin-left: 10rpx;
    }

    /* 第二行 */
    .indent .two {
        display: flex;
        justify-content: space-between;
        margin-top: 35rpx;
    }

    .indent .two .first {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-align: center;
    }

    .two .first .img1 {
        width: 44rpx;
        height: 43rpx;
        margin: auto;
    }

    .two .first .txt {
        padding-top: 25rpx;
    }

    /* 中奖 */
    .agency {
        width: 690rpx;
        height: 100rpx;

        line-height: 100rpx;
        border-radius: 10rpx;
        display: flex;
        justify-content: space-between;
        background-color: #FFFFFF;
        margin: 280rpx 30rpx 0;
        padding: 0 30rpx;
        box-sizing: border-box;
    }

    .agency image {
        width: 100%;
        height: 100%;
    }

    .agency .left {
        font-size: 24rpx;
        font-family: Source Han Sans CN;
        font-weight: 500;
        /* color: #f1d3a8; */
    }

    .agency .left .img1 {
        width: 44rpx;
        height: 44rpx;
        margin-right: 25rpx;
        vertical-align: middle;
    }

    .agency .right {
        width: 13rpx;
        height: 23rpx;
        vertical-align: middle;
    }

    /* 常用功能 */
    .feature {
        width: 690rpx;
        background: #ffffff;
        border: 1rpx solid #f5f5f5;
        border-radius: 10rpx;
        margin: 93rpx 30rpx 30rpx;
    }

    .feature .txt {
        font-size: 30rpx;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #666666;
        margin: 20rpx 0 50rpx 23rpx;
    }

    .feature .layout {
        display: flex;
        flex-wrap: wrap;
    }

    .feature .fath {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 25%;
        padding: 0 !important;
        font-size: 26rpx !important;
        line-height: none !important;
        color: #666 !important;
        margin-bottom: 46rpx;
    }

    .feature .fath image {
        width: 44rpx;
        height: 44rpx;
    }

    .feature .fath text {
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        height: 66rpx;
        line-height: 66rpx;
    }

    .foot {
        width: 100%;
        text-align: center;
        font-size: 22rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 36rpx;
        margin: 30rpx 0;
    }

    .recommend {
        padding: 30rpx 24rpx 0;

        .recommend_tit {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .word {
                font-size: 29rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #F42A02;
                display: flex;
                align-items: center;

                image {
                    width: 40rpx;
                    height: 40rpx;
                    vertical-align: middle;
                }
            }

            .word1 {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999;

                image {
                    width: 24rpx;
                    height: 24rpx;
                    vertical-align: middle;
                }
            }
        }

        .common_goods {
            padding: 20rpx 5rpx;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            .common_con {
                width: 330rpx;
                // height: 640rpx;
                background: rgba(255, 255, 255, 1);
                border: 1rpx solid #eee;
                border-radius: 10rpx;
                margin-bottom: 30rpx;
                overflow: hidden;
                position: relative;

                image {
                    width: 330rpx;
                    height: 330rpx;
                    border-radius: 10rpx 10rpx 0 0;
                }

                .name {
                    padding: 0 10rpx;
                    margin: 10rpx 0;
                    // height: 70rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                }

                .intro {
                    padding: 0 10rpx;
                    margin: 10rpx 0;
                    // height: 70rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 300;
                    color: #666666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                }

                .discount {
                    padding: 0;
                    display: flex;

                    .coupon {
                        width: 144rpx;
                        height: 38rpx;
                        line-height: 38rpx;
                        text-align: center;
                        background: url(../../static/quan.png) no-repeat;
                        background-size: 100% 100%;
                        position: relative;
                        font-size: 16rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #fff;
                        margin-bottom: 10rpx;
                        margin-right: 5rpx;
                    }

                    .coupon1 {
                        width: 154rpx;
                        height: 38rpx;
                        line-height: 38rpx;
                        text-align: center;
                        background: url(../../static/quan1.png) no-repeat;
                        background-size: 100% 100%;
                        position: relative;
                        font-size: 16rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #fd4950;
                        margin-bottom: 10rpx;
                        margin-right: 5rpx;
                    }
                }

                .price {
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 63, 63, 1);
                    margin-left: 16rpx;
                    // text {
                    // 	margin-left: 20rpx;
                    // 	font-size: 22rpx;
                    // 	font-family: PingFang SC;
                    // 	font-weight: 400;
                    // 	color: rgba(153, 153, 153, 1);
                    // 	text-decoration: line-through;
                    // }
                }

                .shop {
                    // width: 310rpx;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: #f63b42;
                    display: flex;
                    align-items: center;
                    padding: 10rpx;

                    .img {
                        image {
                            width: 50rpx;
                            height: 50rpx;
                            margin-right: 10rpx;
                        }
                    }

                    .right_shop {
                        width: 260rpx;

                        .title {
                            font-size: 20rpx;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: #fff;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        .tip {
                            font-size: 16rpx;
                            font-family: PingFang SC;
                            font-weight: 400;
                            color: #cfcfcf;
                        }
                    }
                }
            }
        }
    }
</style>
