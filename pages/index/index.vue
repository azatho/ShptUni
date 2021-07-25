<template>
    <view class="index">
        <u-navbar :is-back="false" v-if="showTitle">
            <view class="search" style="z-index: 5;">
                <view class="right" @click="goSearch()">
                    请输入关键字<strong></strong>
                    <view class="searchImg">
                        <image src="../../static/search(1).png" style="width:34rpx;height: 34rpx;"></image>
                    </view>
                </view>
                <view @click="goMessage()">
                    <image src="../../static/message.png" mode="" style="width:38rpx;height: 38rpx;"></image>
                </view>
            </view>
        </u-navbar>
        <!-- 一级分类导航条 -->
        <view class="firstNav" v-if="showTitle">
            <view style="width: 630rpx;">
                <u-tabs active-color="#FD4950" :list="list" :current="current" @change="changeTabs"></u-tabs>
            </view>
            <view @click="getClass"
                style="background: #fff;width: 140rpx;display: flex;align-items: center;justify-content: center;">
                <image src="/static/classifyy.png" mode="" style="width: 32rpx;height: 32rpx;"></image>分类
            </view>
        </view>
        <view class="zhanwei"></view>
        <view style="width:100%;height: 10rpx;background-color: #F5F5F5;"></view>
        <!-- 轮播图 -->
        <view v-if="current==0">
            <view class="banner">
                <swiper class="swiper" previous-margin='30rpx' next-margin='30rpx' :indicator-dots="indicatorDots"
                    circular="true" :autoplay="autoplay" :interval="interval" :duration="duration"
                    indicator-color="#ccc" indicator-active-color="#fff">
                    <swiper-item style="border-radius: 10rpx;" v-if="videoInfo.video_url!=''">
                        <view v-if="!autoplay">
                            <video :src="$cdnUrl+videoInfo.video_url" :autoplay="false" @ended="playSwiper"
                                @pause='playSwiper'
                                style="padding-left: 10rpx;width: 100%;height:  300rpx;border-radius: 10px;"
                                object-fit="fill">
                            </video>
                        </view>
                        <view v-if="videoInfo.video_cover!=''&&autoplay" @click="autoplay=false"
                            style="position: relative;">
                            <image :src="$cdnUrl+videoInfo.video_cover"
                                style="padding-left: 10rpx;width: 100%;height: 300rpx;border-radius: 10px;" mode="">
                            </image>
                            <image src="../../static/playVideo.png" mode=""
                                style=";width: 100rpx;height: 100rpx;z-index: 2;position: absolute;bottom: 35%;left: 45%;translate: -50% -50%;">
                            </image>
                        </view>
                    </swiper-item>
                    <swiper-item v-for="(item, i) in images" :key="i">
                        <image :src="cdnUrl + item.banner_pic" style="border-radius: 10px;margin: 0 10rpx;"></image>
                    </swiper-item>
                </swiper>
            </view>
            <!-- 新闻 -->
            <view class="news" v-if="news.length != 0">
                <view class="news_img">
                    <image src="../../static/news.png"></image>
                </view>
                <view class="news_word">
                    <swiper :autoplay="autoplay" :interval="interval1" :vertical="vertical" circular="true">
                        <swiper-item v-for="(item, i) in news" :key="i" @click="goNewInfo(item.content)">
                            <view class="word">{{item.title}}！</view>
                        </swiper-item>
                    </swiper>
                </view>
                <view @click="goNewList" style="color: #999999;font-size: 24rpx;margin-left: 30rpx;">全部>></view>
                <!-- <view class="more" @click="goMoreNews">更多
					<image src="../../static/rightarrow.png" mode=""></image>
				</view> -->
            </view>

            <!-- 分类 -->
            <view class="classify">
                <block v-for="(item, i) in classify" :key="i">
                    <view class="class_con" @click="goClassify(item.name, item.class_id)">
                        <view class="class_image">
                            <image :src="cdnUrl + item.img" mode=""></image>
                        </view>
                        {{ item.name }}
                    </view>
                </block>
            </view>

            <view style="width:100%;height: 20rpx;background-color: #F5F5F5;" v-if='isShowactive'></view>
            <!-- 拼团 活动-->
            <view class="limitTime" v-if='isShowactive' style="padding:30rpx;">
                <view class="limit_top" v-if="limitShop.length != 0">
                    <view class="title" style="display: flex;justify-content: space-between;">
                        <view class="word">限时拼购</view>
                        <view style="color: #FFFFFF;" @click="goActiveList()">查看更多>></view>
                    </view>
                    <view style="display:flex;background-color: #FFFFFF;border-radius: 10rpx;height: 260rpx;">
                        <view v-for="(items,index) in limitShop" :key="index" style="margin:20rpx  0  0 20rpx;"
                            @click="goActiveList()">
                            <image :src="$cdnUrl+items.goods_icon" mode="scaleToFill"
                                style="width: 140rpx;height: 140rpx;border: 1rpx solid #F5F5F5;border-radius: 10px;">
                            </image>
                            <view style="width: 140rpx;">
                                <view class="shopName">{{items.goods_name}}</view>
                                <view class="shopPrice">￥{{$returnFloat(items.group_price)}}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view style="width: 690rpx;" v-else @click="goActiveList()">
                    <image src="../../static/active_noGoods.png" style="width: 690rpx;height: 140rpx;"
                        mode="scaleToFill"></image>
                </view>
            </view>

			<view style="text-align: center;" v-if="isShowactive">
				<button style="padding-top: 20rpx;background-color: #FFFFFF;" class="btn" @click="showRewardedVideoAd">	
						<image src="../../static/guanggao.png" style="width: 690rpx;height: 140rpx;" mode=""></image>
				</button>
			</view>
	
            <!-- 分割线 -->
            <view style="width:100%;height: 20rpx;background-color: #F5F5F5;"></view>
            <!-- 优选好物 -->
            <view class="recommend" v-if="goodsList.length != 0">
                <view class="recommend_tit">
                    <view class="word">
                        <image src="../../static/hostSales1.png" mode="" style="margin-right: 10rpx;"></image>积分兑换专区
                    </view>
                </view>
                <u-waterfall v-model="goodsList">
                    <template v-slot:left="{leftList}">
                        <view class="common_goods">
                            <block v-for="(item, index) in leftList" :key="index">
                                <view class="common_con" @click="goScoreShopDetail(item.goods_sort, item.goods_index)">
                                    <view class="">
                                        <image :src="cdnUrl + item.goods_icon" mode=""></image>
                                        <view class="name">
                                            {{ item.goods_name }}
                                        </view>
                                        <view class="intro">{{item.goods_intro}}</view>
                                        <view class="price"
                                            style="display: flex;justify-content: space-between;align-items: center;">
                                            <view class="" style="margin: 20rpx 0;">{{$returnFloat(item.hot_integral)}}积分
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
                                <view class="common_con" @click="goScoreShopDetail(item.goods_sort, item.goods_index)">
                                    <view class="">
                                        <image :src="cdnUrl + item.goods_icon" mode=""></image>
                                        <view class="name">
                                            {{ item.goods_name }}
                                        </view>
                                        <view class="intro">{{item.goods_intro}}</view>
                                        <view class="price"
                                            style="display: flex;justify-content: space-between;align-items: center;">
                                            <view class="" style="margin: 20rpx 0;">{{$returnFloat(item.hot_integral)}}积分
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
        <view v-if='current!=0'>
            <view class="banner" v-if="typeListInfo.slideshow.length>0">
                <swiper class="swiper" previous-margin='30rpx' next-margin='30rpx' :indicator-dots="indicatorDots"
                    circular="true" :autoplay="autoplay" :interval="interval" :duration="duration"
                    indicator-color="#ccc" indicator-active-color="#fff">
                    <swiper-item v-for="(item, i) in typeListInfo.slideshow" :key="i">
                        <image :src="cdnUrl + item.banner_pic" style="border-radius: 10px;margin: 0 10rpx;"></image>
                    </swiper-item>
                </swiper>
            </view>
            <view v-if='typeListInfo.type_list.length>0' style="padding-top: 30rpx;">
                <swiper class="swiper" style="height: 200rpx" :indicator-dots="true" circular="true" :autoplay="false"
                    :interval="interval" :duration="duration" indicator-color="#ccc" indicator-active-color="#fff">
                    <swiper-item v-for="(item, i) in typeListInfo.type_list" :key="i">
                        <view style="display: flex;">
                            <view v-for="(items,index) in item" :key="index" style="width: 25%;text-align: center;"
                                @click="goClassify(items.name, items.class_id)">
                                <image :src="cdnUrl + items.img"
                                    style="border-radius: 10px;width: 100rpx;height: 100rpx;"></image>
                                <view style="margin-top: 10rpx;font-size: 24rpx;">{{items.name}}</view>
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>
            <view class="recommend" style="padding-left: 10rpx;" v-if='typeListInfo.hots_shop.length>0'>
                <view style="display: flex;justify-content: center;align-items: center;">
                    <image src="../../static/hotShop.png" alt=""
                        style='width: 44rpx;height: 44rpx;margin-right: 20rpx;'></image>
                    <view>热销商品</view>
                </view>
                <view class="common_goods">
                    <block v-for="(item, i) in typeListInfo.hots_shop" :key="i">
                        <view class="common_con" @click="goshopDetail(item.goods_sort, item.goods_index)"
                            style="width: 210rpx;margin-left: 25rpx;">
                            <view class="">
                                <image :src="cdnUrl + item.goods_icon" mode="" style="width: 216rpx;height: 216rpx;">
                                </image>
                                <view class="name">
                                    {{ item.goods_name }}
                                </view>
                                <!-- <view class="intro">{{item.goods_intro}}</view> -->
                                <view class="price"
                                    style="display: flex;justify-content: space-between;align-items: center;">
                                    <view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}</view>
                                    <!-- 							<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}</view> -->
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
                <view @click="getMoreShop(list[current])"
                    style="display: flex;justify-content: center;align-items: center;margin-bottom: 30rpx;">查看更多 <image
                        src="../../static/nextPage.png" mode="" style="width: 32rpx;height: 32rpx;margin-left: 20rpx;">
                    </image>
                </view>
            </view>
            <view style="width:100%;height: 20rpx;background-color: #F5F5F5;"
                v-if='typeListInfo.recommend_shop.length>0'></view>
            <view class="recommend" style="padding-left: 10rpx;" v-if='typeListInfo.recommend_shop.length>0'>
                <view style="display: flex;justify-content: center;align-items: center;">
                    <image src="../../static/newShop.png" alt=""
                        style='width: 44rpx;height: 44rpx;margin-right: 20rpx;'>
                    </image>
                    <view>新品推荐</view>
                </view>
                <view class="common_goods">
                    <block v-for="(item, i) in typeListInfo.recommend_shop" :key="i">
                        <view class="common_con" @click="goshopDetail(item.goods_sort, item.goods_index)"
                            style="width: 210rpx;margin-left: 25rpx;">
                            <view class="">
                                <image :src="cdnUrl + item.goods_icon" mode="" style="width: 216rpx;height: 216rpx;">
                                </image>
                                <view class="name">
                                    {{ item.goods_name }}
                                </view>
                                <!-- <view class="intro">{{item.goods_intro}}</view> -->
                                <view class="price"
                                    style="display: flex;justify-content: space-between;align-items: center;">
                                    <view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}</view>
                                    <!-- 							<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}</view> -->
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
                <view style="display: flex;justify-content: center;align-items: center;">查看更多</view>
            </view>
            <view class="recommend" style="padding-left: 10rpx;" v-if='typeListInfo.vip_shop.length>0'>
                <view style="display: flex;justify-content: center;align-items: center;">
                    <image src="../../static/vipShop.png" alt=""
                        style='width: 36rpx;height: 36rpx;margin-right: 20rpx;'>
                    </image>
                    <view>精品推荐</view>
                </view>
                <view class="common_goods">
                    <block v-for="(item, i) in typeListInfo.vip_shop" :key="i">
                        <view class="common_con" @click="goshopDetail(item.goods_sort, item.goods_index)"
                            style="width: 210rpx;margin-left: 25rpx;">
                            <view class="">
                                <image :src="cdnUrl + item.goods_icon" mode="" style="width: 216rpx;height: 216rpx;">
                                </image>
                                <view class="name">
                                    {{ item.goods_name }}
                                </view>
                                <!-- <view class="intro">{{item.goods_intro}}</view> -->
                                <view class="price"
                                    style="display: flex;justify-content: space-between;align-items: center;">
                                    <view class="" style="margin: 20rpx 0;">￥{{$returnFloat(item.goods_cost)}}</view>
                                    <!-- 							<view style="margin-right: 20rpx;color: #999999;">销量{{item.goods_sale}}</view> -->
                                </view>
                            </view>
                        </view>
                    </block>
                </view>
                <view style="display: flex;justify-content: center;align-items: center;">查看更多</view>
            </view>
        </view>

        <!-- 新闻弹窗 -->
        <u-mask :show="newMaskShow" style="display: flex;justify-content: center;" @click="closeMaskNew">
            <view>
                <view
                    style="border-radius: 10rpx;;position: relative;width: 500rpx;height: 600rpx;background-color: #FFFFFF;margin-top: 350rpx;">
                    <view style="margin: 0 auto;height: 100rpx;line-height: 100rpx;text-align: center;">
                        {{newsInfo.title}}
                    </view>
                    <view style="padding: 30rpx;">
                        <scroll-view scroll-y="true" style="height: 410rpx;">
                            <rich-text :nodes="newsInfo.content"></rich-text>
                        </scroll-view>
                    </view>
                    <view
                        style="position:absolute;bottom: 20rpx;left: 50rpx;margin: 0 auto;width: 400rpx;height: 70rpx;text-align: center;line-height: 70rpx;border-radius: 45rpx;border: 2rpx solid #999999;color: #999999">
                        我已知晓</view>
                </view>
                <view style="text-align: center;margin-top: 50rpx;" @click="closeMaskNew">
                    <image src="../../static/icon-chahao.png" style="width: 44rpx;height: 44rpx;" mode=""></image>
                </view>
            </view>
        </u-mask>

        <!-- 用户协议弹窗 -->
        <!-- <u-mask :show="useMaskShow" style="display: flex;justify-content: center;">
            <view style="display: flex;flex-direction: column;">

                <view
                    style="text-align: center;font-size: 30rpx;border-radius: 10rpx;position: relative;width: 500rpx;height: 700rpx;background-color: #FFFFFF;margin-top: 350rpx;">
                    <view style="margin-top: 30rpx;height: 30rpx;line-height: 30rpx;">
                        用户服务及隐私协议
                    </view>

                    <view style="padding: 20rpx;">
                        <view style="font-size: 26rpx; text-align: left;">
                            请您务必谨慎阅读、充分理解
                            <text style="color: #f63b42;" @click="yinsi">《用户服务及隐私协议》</text>
                            各条款，包括但不限于：
                        </view>

                        <view style="font-size: 26rpx; text-align: left;">
                            1.APP或SDK收集用户信息（包括但不限于IMEI、IMSI、设备MAC地址、软件列表、设备序列号、android ID）用来保证设备登录唯一性，
                            2.申请相册权限用于拍照、发布内容
                            3.为帮助你在app拨打咨询热线，我们可能会申请拨打电话权限
                            4.摄像头、GPS、 相册等敏感权限不会默认打开,只有经过您明确授权才能实现相关功能，你可以拒绝不会影响使用其它的功能
                        </view>
                    </view>
                    <view
                        style="display: flex;flex-direction: row;margin-bottom: 0rpx;height: 80rpx;line-height: 80rpx;">
                        <view style="text-align: center;margin-top: 50rpx;width: 50%;" @click="closeMaskUse">
                            取消
                        </view>
                        <view style="text-align: center;margin-top: 50rpx;width: 50%;color: #007AFF;"
                            @click="closeMaskUse">
                            同意
                        </view>
                    </view>
                </view>

            </view>
        </u-mask> -->
        <!-- 消息推送弹窗 -->
        <u-mask style="display: flex;justify-content: center;" :show="showOpen" @click="showOpen = false">
            <view
                style="width: 500rpx;height: 550rpx;border-radius: 18rpx;background-color: #FFFFFF;position: relative;top: 400rpx;">
                <view style="text-align: center;padding-top: 20rpx;">
                    <image src="../../static/openStatus.png" style="width: 477rpx;height:355rpx ;" mode=""></image>
                    <image @click="showOpen=false" src="../../static/open.png"
                        style="width: 28rpx;height: 28rpx;position: absolute;right: 30rpx;" mode=""></image>
                </view>
                <view style="text-align: center;padding-top: 56rpx;">
                    <image src="../../static/lijikaiqi.png" style="width: 479rpx;height: 119rpx;" mode=""
                        @click.stop="goPush()"></image>
                </view>
            </view>
        </u-mask>
        <view>
            <uni-popup ref="popup" type="center" :maskClick="false">
                <view class="dialog">
                    <!-- <image src="../../../static/version_bg.png" mode=""></image> -->
                    <!-- <view class="diaAll"> -->
                    <view class="dia-t">
                        版本更新啦
                    </view>
                    <view class="dia-c">
                        <view>
                            更新内容：
                        </view>
                        <scroll-view scroll-y="true" class="dia-text">
                            <view class="" v-for="(item,index) in update_content" key="index">
                                <view class="">
                                    {{item}}
                                </view>
                            </view>
                        </scroll-view>
                    </view>
                    <view class="dia-f" @tap="goUpdate">
                        立即更新
                    </view>
                    <view class="dia-close" @tap="close" v-if="force_update==0">
                        以后再说
                    </view>
                    <!-- </view> -->
                </view>
            </uni-popup>
        </view>
    </view>
</template>

<script>
	import AD from "../../until/ad.js"
    export default {
        data() {
            return {
				showTitle:true,//显示导航栏
                useMaskShow: true, //用户弹窗协议
                force_update: "",
                //更新内容
                update_content: [],
                version: "", //系统当前的版本号
                newMaskShow: false, //新闻弹框
                newsInfo: {
                    title: '', //标题
                    content: "", //内容
                }, //首页新闻公告弹窗信息
                today: "", //今天的日期 用于判断每日弹窗只谈一次
                showOpen: false,
                adress: {
                    province: "",
                    city: "",
                    district: ""
                }, //地址
                isShowactive: false, //是否显示拼购活动入口
                leftList: [], //瀑布流插槽对应数组
                rightList: [], //瀑布流插槽对应数组
                limitShop: [], //拼团活动信息
                loadStatus: "",
                list: [{
                    name: "首页"
                }],
                current: 0, //一级分类
                userinfo: "", //用户个人信息
                cdnUrl: '',
                page: "1", //优选好物第几页
                count: "5",
                pageCount: "",
                pageIndex: "", //优选好物最大页码数
                indicatorDots: false,
                indicatorDots1: false,
                autoplay: true,
                interval: 2000,
                duration: 500,
                interval1: 3000,
                vertical: true,
                current_classify: "",
                classfiyName: "", //选中当前的name
                classify: [], //分类列表
                news: [], //新闻列表
                seckillGoods: [], //秒杀商品列表
                goodsList: [], //优选好物列表
                showClassify: false,
                full_name: "",
                showNogoods: false,
                showLogin: false,
                referrer_openid: "",
                images: [], //banner列表3
                indicatorDots2: false,
                isMaskShow: false,
                videoInfo: {}, //首页轮播图视频信息
                typeListInfo: {
                    type_list: [],
                    slideshow: [],
                    hots_shop: [],
                    recommend_shop: [],
                    vip_shop: [],
                }, //分类首页
                downloadURL: "", //下载地址
            };
        },
        onLoad() {
            //#ifdef APP-PLUS
            this.version = plus.runtime.version; //获取当前版本号
            //#endif
            this.checkVersion();
            this.cdnUrl = this.$cdnUrl;
            this.init();
            this.recommend_shop();
            this.getClassOne();
            // #ifdef APP-PLUS  
            plus.push.getClientInfoAsync((info) => {
                uni.setStorageSync('cid', info.clientid);
            }, err => {});
            // #endif
        },
        onShow() {
            this.getLocation()
            if (uni.getStorageSync('token')) {
                this.useInfo()
            }
            this.init();
            if (uni.getStorageSync('isUserMask')==1){
                this.useMaskShow = false;
            }
                
        },
        onPullDownRefresh() {
            this.current = 0;
            this.goodsList = [];
            this.page = 1;
            this.init();
            this.recommend_shop();
            if (uni.getStorageSync('token')) {
                this.useInfo()
            }
        },
        onPageScroll() {
            this.autoplay = true
        },
        onReachBottom() {
            if (this.page < this.pageIndex) {
                this.page++;
                this.recommend_shop();
            }
        },
        methods: {
			// 打开广告
			   showRewardedVideoAd() {
			        // 调用后会显示 loading 界面
			        AD.show({
			          adpid: 1145747301, // HBuilder 基座测试广告位
			          adType: "RewardedVideo"
			        }, (res) => {
			          // 用户点击了【关闭广告】按钮
			          if (res && res.isEnded) {
			            // 正常播放结束
						this.getVideoNum()
			          } else {
			            // 播放中途退出
			          }
			        }, (err) => {
			          // 广告加载错误
			          console.log(err)
			        })
			      },
			//次数查询 
			getVideoNum(){
				let self = this;
				self.request({
					url:'ShptUapi/public/index.php/index/video_numb',
					data:{}
				}).then(res => {
				if (res.data.success) {
					if(res.data.msg='可获得奖励'){
						self.getVideoMoney()
					}
					} else {
						uni.showToast({
						title: res.data.msg,
						icon: 'none'
						})
					}
				})
			},
			// 获取观看奖励
			getVideoMoney(){
				let self = this;
				self.request({
					url:'ShptUapi/public/index.php/index/video_money',
				}).then(res => {
				if (res.data.success) {
					uni.showToast({
						title:'奖励已发放',
						icon:'none'
					})
					} else {
						uni.showToast({
						title: res.data.msg,
						icon: 'none'
						})
					}
				})
			},
            // 关闭用户协议弹窗
            closeMaskUse() {
                uni.setStorageSync('isUserMask', 1)
                this.useMaskShow = false;
            },
            yinsi() {
                uni.navigateTo({
                    url:'../my/custom/common?src=ShptMapi/agreement/20210702175244.html&&title=用户服务及隐私协议'
                })
            },
            // 版本更新
            checkVersion() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/user/version_update',
                    data: {
                        version: self.version,
                        // version: 0.1,
                        type: 'android'
                    }
                }).then(res => {
                    if (res.data.success) {
                        if (res.data.data.is_version == 1) {
                            self.downloadURL = self.$imgUrl(res.data.data.new_url)
                            self.update_content = res.data.data.update_content
                            self.force_update = res.data.data.force_update
							uni.hideTabBar()
							self.showTitle=false
                            self.$refs.popup.open()
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 下载
            goUpdate() {
                this.$refs.popup.close()
                //点击更新
                if (this.type == "ios") {
                    let appleId = 12345678 //app的appleId
                    plus.runtime.launchApplication({
                        action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
                    }, function(e) {
                        console.log('Open system default browser failed: ' + e.message);
                    });
                } else {
                    uni.showLoading({
                        title: '下载中...'
                    })
                    var dtask = plus.downloader.createDownload(this.downloadURL, {}, function(d, status) {
                        uni.hideLoading();
                        uni.showToast({
                            title: '下载成功...',
                            mask: false,
                            duration: 1500,

                        });
                        // 下载完成    
                        if (status == 200) {
                            plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {},
                                function(error) {
                                    uni.showToast({
                                        title: '安装失败',
                                        icon: 'none'
                                    });
                                })
                        } else {
                            uni.showToast({
                                title: '下载失败，请检查您的网络',
                                icon: 'none'
                            });
                        }
                    });
                    dtask.start();
                }
            },
            close() {
				uni.showTabBar()
				this.showTitle=true
                this.$refs.popup.close()
            },
            // 跳转至设置中
            goPush() {
                this.showOpen = false
                uni.navigateTo({
                    url: '../my/set/set'
                })
            },
            // 获取新闻弹框
            getMaskNew() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Recommend/newList',
                    data: {
                        region: 4,
                    }
                }).then(res => {
                    if (res.data.success) {
                        if (res.data.data.length != 0) {
                            self.newsInfo = res.data.data[0]
                            self.newMaskShow = true;
                        } else {
                            self.getMaskDay()
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 关闭新闻弹窗
            closeMaskNew() {
                let self = this;
                self.newMaskShow = false;
                self.getMaskDay();
            },
            // 获取日期
            getMaskDay() {
                let self = this
                let a = new Date()
                let msgShowDay = a.getFullYear() + '' + (a.getMonth() + 1) + '' + a.getDate();
                msgShowDay = parseInt(msgShowDay)
                if (uni.getStorageSync('msgShowDay')) {
                    if (uni.getStorageSync('msgShowDay') < msgShowDay) {
                        self.showOpen = true;
                        uni.setStorageSync('msgShowDay', msgShowDay)
                    }
                } else {
                    self.showOpen = true;
                    uni.setStorageSync('msgShowDay', msgShowDay)
                }
            },
            // 获取定位
            getLocation() {
                uni.getLocation({
                    type: 'gcj02',
                    geocode: true,
                    success: function(a) {
                        this.adress = a.address
                    }
                })
            },
            // 拼购商品详情
            goActiveGoods(e) {
                uni.navigateTo({
                    url: '../shop/groupGoodsDetail?id=' + e.goods_index + '&group_id=' + e.group_goods_index
                })
            },
            // 一级分类点击查看更多跳转二级分类列表
            getMoreShop(e) {
                uni.navigateTo({
                    url: "searchList2?goods_sort=" + e.class_id + '&class_name=' + e.name
                })
            },

            // 当视频暂停时恢复轮播
            playSwiper() {
                this.autoplay = true
            },
            //跳转到拼团活动列表页面
            goActiveList() {
                uni.navigateTo({
                    url: 'activeList'
                })
            },
            //跳转至二级分类
            goClassify(e, k) {
                uni.navigateTo({
                    url: 'searchList2?class_id=' + k
                })
            },
            // 跳转到消息列表
            goMessage() {
                uni.navigateTo({
                    url: "../my/information/information"
                })
            },
            // 个人中心信息
            useInfo() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/personal',
                    data: {}
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        res.data.data.userinfo.is_address ? self.isShowactive = true : '';
                        if (!self.isShowactive) {
                            uni.showModal({
                                title: "提示",
                                content: '您还未设置默认地址，请前去设置地址后再参与拼团',
                                confirmColor: "#FC5957",
                                cancelColor: "#999999",
                                success: function(res) {
                                    if (res.confirm) {
                                        uni.navigateTo({
                                            url: '../my/adress/addressList'
                                        })
                                    } else if (res.cancel) {
                                        console.log('进入到了取消')
                                        self.getMaskNew();
                                    }
                                }
                            })
                        } else {
                            self.getMaskNew();
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 切换一级分类
            changeTabs(index) {
                this.current = index
                this.getTypeList(this.list[index].class_id)
            },
            // 获取二级分类首页
            getTypeList(e) {
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/index/getTypeList',
                    data: {
                        id: e
                    },
                }).then(res => {
                    if (res.data.success) {
                        self.typeListInfo = res.data.data
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none',
                        })
                    }
                })
            },
            // 跳转至商品详情页面
            goshopDetail(a, b) {
                uni.navigateTo({
                    url: '../shop/goodsDeatil?id=' + b
                })
            },
			// 跳转至商品详情页面
			goScoreShopDetail(a, b) {
			    uni.navigateTo({
			        url: '../shop/couponGoodsDetail?id=' + b
			    })
			},
            // 跳转至新闻公告页面
            goNewInfo(e) {
                uni.navigateTo({
                    url: 'newsInfo?src=' + e
                })
            },
            // 获取优选好物列表
            recommend_shop() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/index/recommend_shop_v2',
                    data: {
                        page: this.page,
                        count: 2
                    }
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        self.pageIndex = res.data.total_page
                        self.goodsList.length > 0 ? self.goodsList = [...self.goodsList, ...res.data.data.list
                            ] :
                            self.goodsList = res.data
                            .data.list;
                        self.pageIndex = res.data.data.total_page
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 跳转至搜索页面
            goSearch() {
                uni.navigateTo({
                    url: 'search_hstory'
                })
            },
            // 跳转至新闻列表页面
            goNewList() {
                uni.navigateTo({
                    url: 'nweList?type=1'
                })
            },
            // 跳转商城
            getClass() {
                uni.switchTab({
                    url: 'goodShop'
                })
            },
            // 获取一级分类
            getClassOne() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/index/type_list',
                    data: {}
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        self.list = [...self.list, ...res.data.data]
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 获取商城首页
            init() {
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/index/index',
                    data: {
                        province: self.adress.province.substring(0, 2),
                        city: self.adress.city.substring(0, 2),
                        country: self.adress.district.substring(0, 2),
                    }
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        self.images = res.data.data.index_banner;
                        self.videoInfo = res.data.data.video;
                        self.news = res.data.data.news;
                        self.classify = res.data.data.type_list;
                        self.limitShop = res.data.data.limit_shop
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            }
        },
    };
</script>

<style>
    page {
        width: 100%;
    }
</style>
<style lang="scss">
    .zhanwei {
        width: 100%;
        height: 10rpx;
    }

    .index {
        padding-top: var(--status-bar-height);
        position: relative;
        height: 100%;
        box-sizing: border-box;
    }

    /deep/.uni-scroll-view::-webkit-scrollbar {
        /* 隐藏滚动条，但依旧具备可以滚动的功能 */
        display: none
    }

    .firstNav {

        display: flex;
        position: fixed;
        top: calc(var(--status-bar-height) + 75rpx);
        z-index: 2;
    }

    .search {
        width: 100%;
        // height: 98rpx;
        display: flex;
        box-sizing: border-box;
        align-items: center;
        justify-content: space-around;
        // position: fixed;
        // top: 0rpx;
        // left: 0;
        background-color: #FFFFFF;
        // padding-top:var(--status-bar-height) ;
        z-index: 333;

        .right {
            width: 600rpx;
            height: 80rpx;
            line-height: 80rpx;
            position: relative;
            background-color: #F5F5F5;
            border-radius: 6rpx;
            // margin-left: 20rpx;
            padding-left: 80rpx;
            box-sizing: border-box;
            font-size: 24rpx;
            color: #7e7e7e;

            .searchImg {
                width: 80rpx;
                height: 100%;
                margin-top: 10rpx;
                line-height: 80rpx;
                text-align: center;
                position: absolute;
                top: 0;
                left: 0;

                image {
                    width: 32rpx;
                    height: 32rpx;
                }
            }
        }

    }

    .topSearch {
        margin-top: 20rpx;
        position: relative;
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        box-sizing: border-box;
        font-size: 26rpx;
        font-family: Source Han Sans CN;
        font-weight: 300;
        color: #b1b1b1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        view {
            padding: 0 13rpx;
            display: inline-block;
        }

        .classify {
            position: absolute;
            top: 0;
            right: 30rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            color: #333333;
            padding: 0;
            display: flex;
            align-items: center;

            image {
                width: 32rpx;
                height: 32rpx;
                margin-right: 10rpx;
            }
        }
    }

    .banner {
        width: 100%;
        height: 300rpx;

        .swiper {
            width: 100%;
            height: 300rpx;
        }

        image {
            width: 100%;
            height: 100%;
        }
    }

    .hostSale {
        width: 702rpx;
        height: 222rpx;
        margin: auto;
        margin-top: 40rpx;

        .swiper {
            width: 100%;
            height: 222rpx;
        }

        image {
            width: 100%;
            height: 100%;
        }
    }

    .classify {
        margin-bottom: 30rpx;
        padding: 0 30rpx;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .class_con {
            width: 120rpx;
            text-align: center;
            font-size: 24rpx;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #4d4d4d;

            .class_image {
                width: 85rpx;
                height: 85rpx;
                border-radius: 50%;
                margin: auto;
                margin-top: 30rpx;
                margin-bottom: 20rpx;

                image {
                    width: 85rpx;
                    height: 85rpx;
                    border-radius: 50%;

                }
            }
        }
    }

    .news {
        width: 690rpx;
        height: 70rpx;
        margin: 0 30rpx;
        background: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;

        .news_img {
            width: 60rpx;
            height: 40rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .news_word {
            flex: 1;

            // padding-right: 20rpx;
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
                    color: #f63b42;
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

    .limitTime {
        display: flex;
        justify-content: space-between;

        .shopPrice {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FF3F3F;
            text-align: center;
            padding-right: 10rpx;
        }

        .shopName {
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-left: 10rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
        }

        .limit_top {
            padding: 0 15rpx 15rpx 15rpx;
            width: 100%;
            height: 346rpx;
            background-size: 100% 100%;
            background-image: url(data:image/png;base64,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);
            ;
            box-shadow: 0px 0px 24rpx rgba(87, 114, 149, 0.16);
            border-radius: 12rpx;

            .title {
                display: flex;
                align-items: center;
                width: 100%;
                height: 73rpx;
                border-radius: 12rpx;
                position: relative;

                .word {
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #fff;
                    margin-left: 24rpx;
                }

                image {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }

                .img {
                    width: 64rpx;
                    height: 100%;
                }

                .img1 {
                    width: 80rpx;
                    height: 100%;
                }

                .word1 {
                    display: felx;
                    align-items: center;

                    image {
                        width: 100rpx;
                        height: 72rpx;
                        right: 50rpx;
                        z-index: 222;
                    }

                    .title {
                        margin-right: 10upx;
                    }

                    .custom {
                        display: flex;
                        color: #fff;
                        margin-left: 60rpx;
                    }

                    .custom :nth-child(odd) {
                        background-color: #fff;
                        padding: 4rpx 4rpx;
                        color: #a78708;
                        border-radius: 10rpx;
                        text-align: center;
                    }

                    .custom :nth-child(even) {
                        padding: 0 10rpx;
                    }
                }
            }

            .goods {
                display: flex;

                // justify-content: center;
                .goods_con {
                    border-radius: 10rpx;
                    width: 662rpx;
                    height: 245rpx;
                    background-color: #FFFFFF;

                    .class_image {
                        width: 120rpx;
                        height: 120rpx;
                        margin: auto;

                        image {
                            width: 100%;
                            height: 100%;
                            margin-bottom: 20rpx;
                        }
                    }
                }

                .price {
                    font-size: 26rpx;
                    color: #f83023;
                    font-weight: 500;
                    text-align: center;
                    margin: 20rpx 0 4rpx;
                }

                .price1 {
                    font-size: 20rpx;
                    color: #c9c9c9;
                    font-weight: 400;
                    text-align: center;
                    text-decoration: line-through;
                }
            }
        }
    }

    .nearShops {
        padding: 0 24rpx;
        background-color: #fff;
        position: sticky;
        top: 88rpx;
        z-index: 800;

        .title {
            width: 100%;
            margin: 24rpx 0 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .word {
                font-size: 36rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #333333;
                display: flex;
                align-items: center;

                image {
                    width: 40rpx;
                    height: 40rpx;
                    vertical-align: middle;
                }
            }

            .word1 {
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

        .con {
            display: flex;

            .con_detail {
                width: 164rpx;
                background: #f63b42;
                box-shadow: 0px 0px 24rpx rgba(87, 114, 149, 0.16);
                border-radius: 12rpx 12rpx 0 0;
                margin-right: 15rpx;

                image {
                    width: 164rpx;
                    height: 164rpx;
                    border-radius: 12rpx;
                    background-color: #fff;
                }

                .name {
                    padding: 0 10rpx;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #fefefe;
                }

                .distance {
                    font-size: 16rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #fff;
                    margin-bottom: 5rpx;

                    image {
                        width: 24rpx;
                        height: 24rpx;
                        vertical-align: middle;
                        margin: 0 10rpx 0 14rpx;
                        background-color: rgba(0, 0, 0, 0);
                    }
                }
            }
        }
    }

    .recommend {
        padding: 30rpx 24rpx 0 24rpx;

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
            flex-wrap: wrap;
            // justify-content: space-between;

            .common_con {
                width: 340rpx;
                // height: 640rpx;
                // margin-right: 16rpx;
                background: rgba(255, 255, 255, 1);
                border: 1rpx solid #eee;
                border-radius: 10rpx;
                margin-bottom: 30rpx;
                overflow: hidden;
                position: relative;

                image {
                    width: 340rpx;
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

    .allClass {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 170rpx;
        left: 0;
        box-sizing: border-box;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 22233333;

        .allClassify {
            box-sizing: border-box;
            background-color: #fff;

            .con {
                padding: 20rpx 30rpx;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                view {
                    width: 200rpx;
                    height: 70rpx;
                    line-height: 70rpx;
                    text-align: center;
                    background: #ffffff;
                    border: 1rpx solid #cccccc;
                    border-radius: 4rpx;
                    margin-bottom: 30rpx;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                }

                .cur {
                    background: rgba(252, 73, 80, 0.3);
                    border: 1rpx solid #fc4950;
                }
            }

            .sure {
                width: 100%;
                height: 90rpx;
                background: #fc4950;
                line-height: 90rpx;
                text-align: center;
                font-size: 36rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }

    //4月26
    .sortClass {
        font-size: 23rpx;
    }

    .topTip {
        font-size: 26rpx;
        color: #FFFFFF;

        width: 129rpx;
        height: 50rpx;
        display: flex;
        justify-content: center;
        z-index: 99999999;
        background: #FD8D88;
        border-radius: 0rpx 25rpx 25rpx 0rpx;

        image {
            width: 20rpx;
            height: 20rpx;
        }

        line-height: 50rpx;
    }

    .tipbox {
        align-items: center;
        z-index: 99999999;
        top: 65rpx;
        position: absolute;
        width: 400rpx;
        // height: 400rpx;
        background: #FFFFFF;
        border-radius: 0rpx 6rpx 6rpx 0rpx;
        display: flex;
        flex-wrap: wrap;
        background-color: #FFFFFF;


    }

    .tipbox-item {
        width: 160rpx;
        height: 50rpx;
        border: 1rpx solid #CCCCCC;
        border-radius: 6rpx;
        line-height: 50rpx;
        font-size: 26rpx;
        color: #666666;
        margin-left: 16rpx;
        text-align: center;
    }

    .tipbox-item1 {

        width: 160rpx;
        height: 50rpx;
        background-color: #FFEFF0;
        ;
        border: 1rpx solid #CCCCCC;
        border-radius: 6rpx;
        line-height: 50rpx;
        font-size: 26rpx;
        color: #F2343B;
        margin-left: 16rpx;
        text-align: center;
    }

    .StockUp {
        width: 707rpx;
        height: 202rpx;
        margin-left: 21rpx;
        margin-top: 20rpx;

        image {
            width: 100%;
            height: 100%;

        }
    }

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        font-weight: 400;
        z-index: 10000;
        display: flex;
        justify-content: center;
    }

    .signIn-box {

        image {
            width: 330rpx;
            height: 160rpx;
            margin-left: 30rpx;
            margin-top: 7rpx;
        }
    }

    .dialog {
        width: 458rpx;
        height: 520rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;
        background-image: url(../../static/version_bg.png);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 30rpx;

        .dia-t {

            height: 120rpx;
            line-height: 120rpx;
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            // text-align: center;

        }

        .dia-c {

            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;
            margin-top: 38rpx;

            .dia-text {
                margin-top: 10rpx;
                height: 120rpx;
            }

        }

        .dia-f {
            margin-left: 25%;
            margin-right: 25%;
            margin-top: 30rpx;
            height: 60rpx;
            line-height: 60rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;

            text-align: center;

            border-radius: 30rpx;

            color: #FFFFFF;
            background-color: #FD484F;
        }

        .dia-close {
            margin-left: 25%;
            margin-right: 25%;
            margin-top: 15rpx;
            height: 60rpx;
            line-height: 60rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 400;

            text-align: center;
            text-decoration: underline;
            border-radius: 30rpx;

            color: #999999;
            background-color: #FFFFFF;
        }
    }
</style>
