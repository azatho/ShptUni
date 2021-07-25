<template>
    <view class="goods">

        <u-navbar title="商品详情" title-color="#333333">
            <view slot="right" color="#333333" style="padding-right: 30rpx;font-size: 26rpx;" @click="show_share()"
                v-if="isShare==1">
                分享
            </view>
        </u-navbar>

        <!-- 轮播图 -->
        <view class="banner">
            <view v-if="videoBtn==1&&showVideo" class="video">
                <video style="position:relative;" :src="$cdnUrl+goods_info.shopInfo.goods_video"
                    :poster="$cdnUrl+goods_info.shopInfo.goods_video_cover" object-fit="fill" :controls="true">
                    <cover-view @click="vBtn(0)" :class="videoBtn==0?'videoBtn1':''" class="videoBtn"
                        style="left: 305rpx;">
                        视频
                    </cover-view>
                    <cover-view @click="vBtn(1)" :class="videoBtn==1?'videoBtn1':''" class="videoBtn"
                        style="left: 385rpx;">
                        图片
                    </cover-view>
                </video>
            </view>
            <view v-if="videoBtn==0" class="topImg">
                <swiper class="banner_img" :autoplay="autoplay" :interval="interval" :duration="duration"
                    circular="true">
                    <swiper-item v-for="(item, i) in goods_info.shopInfo.goods_icon" :key="i">
                        <view class="swiper-item">
                            <image :src="$cdnUrl + item"></image>
                        </view>
                    </swiper-item>
                </swiper>
                <view v-if='showVideo'>
                    <view @click="vBtn(0)" :class="videoBtn==0?'videoBtn1':''" class="videoBtn" style="left: 305rpx;">视频
                    </view>
                    <view @click="vBtn(1)" :class="videoBtn==1?'videoBtn1':''" class="videoBtn" style="left: 385rpx;">图片
                    </view>
                </view>
                <view v-if="videoBtn==0" class="total">共{{ goods_info.shopInfo.goods_icon.length }}张</view>
            </view>
        </view>
        <!-- 商品名称、简介、价格、销量等信息 -->
        <view class="goodsTitle">
            <view class="title">{{ goods_info.shopInfo.goods_name }}</view>
            <view class="intro" style="">{{goods_info.shopInfo.goods_intro}}</view>
            <view class="price"
                style="display: flex;justify-content: space-between;align-items: center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">
                <view class="txt1">{{ '￥'+goods_info.shopInfo.group_work_price / 100}}</view>
                <view style="font-size: 26rpx;">销量{{goods_info.shopInfo.goods_sale}}</view>
            </view>
            <view style="font-size: 26rpx;margin-top: 12rpx;">拼中次数: <span
                    style="margin-left: 20rpx;color: #FF1C1C;">{{goods_info.GroupWork.sroup_num}}</span>
            </view>
        </view>
        <!-- 分割线 -->
        <view class="commonBgc"
            v-if="goods_info.shopInfo.group_work_status==2||goods_info.shopInfo.group_work_status==4||goods_info.shopInfo.group_work_status==5">
        </view>
        <!-- 拼团时间 -->
        <view
            v-if="goods_info.shopInfo.group_work_status==2||goods_info.shopInfo.group_work_status==4||goods_info.shopInfo.group_work_status==5"
            style="height: 93rpx;padding: 0 30rpx;display: flex;align-items: center;justify-content: space-between;font-size: 26rpx;">
            <view style="display: flex;">
                <image src="../../static/time.png" alt="" style='width: 36rpx;height: 36rpx;'></image>
                <view style="margin: 0 30rpx 0 10rpx;">拼团时间</view>
            </view>
            <view style="margin-left: 20rpx;" v-if="goods_info.GroupWork.start_time">
                {{$time(goods_info.GroupWork.start_time,4)+' 开始'}}--{{$time(goods_info.GroupWork.end_time,4)+' 结束'}}
            </view>
            <view style="margin-left: 20rpx;" v-else>暂未开始</view>
        </view>
        <!-- 分割线 -->
        <view class="commonBgc"></view>
        <!-- 模态框列表 -->
        <view style="width: 100%;height: 93rpx;display: flex;align-items: center;font-size: 26rpx;">
            <view style="margin: 0 30rpx;">发货</view>
            <image src="../../static/address.png" alt="" style='width: 36rpx;height: 36rpx;'></image>
            <view style="margin-left: 20rpx;">
                {{goods_info.shopInfo.region_province_name}}-{{goods_info.shopInfo.region_city_name}}
            </view>
        </view>
        <view class="base_msg">
            <view class="choose" @click="getParameter" v-if="goods_info.goods_text">
                <view style="display:flex;flex: 1;">
                    <view style="margin-right: 30rpx;color: #333333;width:60rpx">参数</view>
                    <view style="color: #999999;flex:1;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
                        {{ goods_info.goods_text ? goods_info.goods_text : '暂无' }}
                    </view>
                </view>
                <view class="right_img">
                    <image src="../../static/back.png"></image>
                </view>
            </view>
            <view class="choose" @click="getParameter">
                <view style="display:flex;flex: 1;">
                    <view style="margin-right: 30rpx;color: #333333;width:60rpx">运费</view>
                    <view style="color: #999999;">{{goods_info.templates}}</view>
                </view>
                <view class="right_img">
                    <image src="../../static/back.png"></image>
                </view>
            </view>
        </view>
        <!-- 分割线 -->
        <view class="commonBgc"></view>
        <!-- 商品评价 （只显示最新的一条） -->
        <view class="talk" v-if="goods_info.commentInfo.comment_index">
            <view class="title">
                评价
            </view>
            <view class="content1">
                <view style="display: flex;">
                    <image :src="$cdnUrl+goods_info.commentInfo.comment_user_photo" class="img"></image>
                    <view class="item-c">
                        <view class="zz">
                            <text style="margin-right: 15rpx;">{{goods_info.commentInfo.comment_nick}}</text>
                            <u-rate :gutter='5' :disabled="true" active-color="#FFC600" :count="5"
                                v-model="goods_info.commentInfo.comment_score"></u-rate>
                        </view>
                        <view class="gray" style="font-size: 24rpx;">
                            ({{goods_info.commentInfo.commentName}})
                        </view>
                        <view class="tt">
                            {{goods_info.commentInfo.comment_content}}
                        </view>
                    </view>
                </view>
                <view class="time">
                    {{formatTime(goods_info.commentInfo.comment_time)}}
                </view>
            </view>
            <view style="display: flex;margin-left: 60rpx;margin-bottom: 50rpx;">
                <view v-for="(item,index) in goods_info.commentInfo.comment_images" :key='index'>
                    <image style="width: 130rpx;height: 130rpx;margin-right: 20rpx;margin-top: 20rpx;"
                        :src="$cdnUrl+item" mode="" @click="showBigImage(item)"></image>
                </view>
            </view>
            <view
                style="width: 100%;height: 70rpx;text-align: center;line-height: 70rpx;color: #999999;font-size: 26rpx;"
                @click="goComments(goods_info.shopInfo.goods_index)">查看全部>></view>
        </view>
        <!-- 分割线 -->
        <view class="commonBgc" v-if="goods_info.commentInfo.comment_index"></view>
        <!-- 店铺信息 -->
        <view class="shopMsg" @click="goShopDetail(goods_info.supplier_info.supplier_id)">
            <view class="left">
                <image :src="$cdnUrl+goods_info.supplier_info.supplier_icon" class="case"></image>
                <view style="margin-left: 30rpx;">
                    <view>{{goods_info.supplier_info.supplier_name}}</view>
                    <view
                        style="margin-top: 10rpx;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">
                        {{$returnPeople(goods_info.supplier_info.supplier_collect)}}人关注
                    </view>
                </view>
            </view>
            <view
                style="display: flex;align-items: center;font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #999999;">
                查看店铺
                <image src="../../static/back.png" style="width: 17rpx;height: 32rpx;margin-left: 30rpx;"></image>
            </view>

        </view>
        <!-- 分割线 -->
        <view class="commonBgc"></view>

        <!-- 标题栏 -->
        <view class="navTitle">
            <view class="nav" :class="navSel==index?'navSel':''" v-for='(item,index) in navList' :key="index"
                @click="selectNav(index)">{{item}}</view>
        </view>
        <view v-if='navSel==0' style="padding-bottom: 10rpx;">
            <rich-text :nodes="goods_info.h_goods_details.replace(/\<img/gi, '<img style=max-width:100%;height:auto;')">
            </rich-text>
        </view>
        <view v-if="navSel==1" style="padding:  0 30rpx;padding-bottom: 10rpx;">
            <view v-if="goods_info.goods_params.length>0">
                <view v-for="(item, index) in goods_info.goods_params" :key="index"
                    style=" width: 100%;display: flex;justify-content: space-between;align-items: center;border-bottom: 2rpx solid #999999;padding: 30rpx 0;">
                    <view>{{item.name}}</view>
                    <view style="width: 505rpx;">{{item.value}}</view>
                </view>
            </view>
            <view v-else style="text-align: center;"><img src="../../static/nodata.png" alt=""
                    style='width: 480rpx;height: 360rpx;margin-top: 100rpx;'></view>
        </view>
        <view v-if="navSel==2" style="padding-bottom: 10rpx;">
            <rich-text :nodes="goods_info.h_policy.replace(/\<img/gi, '<img style=max-width:100%;height:auto;')">
            </rich-text>
        </view>

        <view style="padding-top: 120rpx;background-color: #FFFFFF;"></view>
        <!-- 底部栏 -->
        <view class="foot" style='position: fixed;bottom: 0rpx;width: 100%;background-color: #FFFFFF;'>
            <view v-if='!goods_info.shopInfo.goods_status==6'></view>
            <view v-else style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
                <view style="display: flex;height: 100rpx;background-color: #FFFFFF;align-items: center;">
                    <view class="fontimg" @click="goShopDetail(goods_info.supplier_info.supplier_id)">
                        <image src="../../static/goShop.png" mode=""></image>
                        <view>店铺</view>
                    </view>
                    <view class="fontimg" @click="getServiceInfo()">
                        <image src="../../static/customerService.png" mode=""></image>
                        <view>客服</view>
                    </view>
                    <view class="fontimg" v-if="goods_info.is_store==1" @click="collectShop(2)">
                        <image src="../../static/Collection.png" mode=""></image>
                        <view>收藏</view>
                    </view>
                    <view class="fontimg" v-else @click="collectShop(1)">
                        <image src="../../static/Collections.png" mode=""></image>
                        <view>收藏</view>
                    </view>

                </view>
                <!-- group_work_status2 "0普通详情  1我要参团  2我要参团置灰  3参与中  4参与中置灰", -->
                <view style="display: flex;"
                    v-if="goods_info.shopInfo.group_work_status==2||goods_info.shopInfo.group_work_status>=4">
                    <view  @click="getCantuan()"
                        :class="goods_info.shopInfo.group_work_status2==2||goods_info.shopInfo.group_work_status2==4?'btn2':'btn1'">
                        {{goods_info.shopInfo.group_work_status2<=2?'我要参团':'参与中'}}
                    </view>
                    <view
                        style="width: 213rpx;text-align: center;border-radius:0 36rpx 36rpx 0;background-color: #F13D6C;color: #FFFFFF;font-size: 22rpx;"
                        @click="sure_pintuan()">
                        <view :class="goods_info.shopInfo.group_work_status==2?'btn':''">
                            轻松拼团{{goods_info.shopInfo.group_work_status==2?'':'中'}}
                            <view v-if="goods_info.shopInfo.group_work_status==4" style="font-size: 22rpx;">（点击可关闭）
                            </view>
                        </view>
                    </view>
                </view>

                <!-- <view style="display: flex;" v-if="goods_info.shopInfo.group_work_status==5" @click="noActive">
                    <view class="btn" style="border-radius: 36rpx 0 0 36rpx;background-color:#CCCCCC ;color: #FFFFFF;">
                        我要参团</view>
                    <view class="btn" style="border-radius:0 36rpx 36rpx 0;background-color: #DFDFDF;color: #FFFFFF;">
                        <view style="height: 20rpx;">轻松拼团</view>
                    </view>
                </view> -->

                <view style="display: flex;"
                    v-if="goods_info.shopInfo.group_work_status==1||goods_info.shopInfo.group_work_status==3"
                    @click="sure_pintuan()">
                    <view :class="goods_info.shopInfo.group_work_status==1?'btn3':'btn4'"
                        style="text-align: center;line-height:72rpx;width: 426rpx;height: 72rpx;border-radius: 36rpx;">
                        {{goods_info.shopInfo.group_work_status==1?'预定轻松拼团':'已预定(点击可关闭)'}}
                    </view>
                </view>
            </view>
        </view>
        <!-- 客服弹窗 -->
        <u-mask :show="showService" @click="showService = false" style="text-align: center;">
            <view
                style="background-color: #FFFFFF;width: 500rpx;height: 600rpx;margin: 0 auto;margin-top: 200rpx;border-radius: 20rpx;">
                <view style="width: 100%;height: 70rpx;line-height: 70rpx;text-align: center;">联系客服</view>
                <scroll-view scroll-y="true" style="height: 530rpx;">
                    <view
                        style="border-top: 1rpx solid #F5F5F5;border-bottom: 1rpx solid #F5F5F5;height: 185rpx;text-align: left;padding-left: 100rpx;"
                        v-for="(item,index) in serviceInfo" :key="index">
                        <view style="padding-top: 15rpx;">{{item.service_name}} <span
                                style="color: #999999;font-size: 22rpx;margin-left: 20rpx;">
                                ({{item.service_start}}--{{item.service_end}})</span></view>
                        <view style="padding-top: 15rpx;color: #999999;">微信: <span
                                style="color: #1E63B5;text-decoration: underline;">{{item.service_wechat}}</span>
                            <image style="width: 30rpx;height: 30rpx;margin-left: 30rpx;"
                                src="../../static/gysCopyPic1.png" mode="" @click.stop="fz(item.service_wechat)">
                            </image>
                        </view>
                        <view style="padding-top: 15rpx;color: #999999;">电话: <span
                                style="color: #1E63B5;text-decoration: underline;">{{item.service_phone}}</span>
                            <image style="width: 30rpx;height: 30rpx;margin-left: 30rpx;" src="../../static/tel.png"
                                mode="" @click.stop="getPhone(item.service_phone)"></image>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view>
                <image src="../../static/icon-chahao.png" mode="" style="margin-top: 40rpx;width: 44rpx;height: 44rpx;">
                </image>
            </view>
        </u-mask>
        <!-- 产品运费 -->
        <view class="common" v-if="showTemplates">
            <view class="common_con">
                <uni-icons type="closeempty" size="30" class="close" @click="close" color="#999999"></uni-icons>
                <view class="common_tit">运费说明</view>
                <block v-if="goods_info.freight_data!= ''">
                    <view style="padding: 0 30rpx;"> 说明:<span
                            style="color: #999999;margin-left: 20rpx;">{{goods_info.freight_data}}</span></view>
                </block>
                <view style="text-align: center;margin-top: 20px;color: #ccc;" v-else>暂无运费说明信息</view>
            </view>
        </view>


        <view>
            <uni-popup ref="popup_share" type="bottom">

                <view class="" style="text-align: center;margin-bottom: 80rpx;border-radius: 20rpx;">
                    <image :src="$imgUrl(goods_share)"
                        style="z-index: 3;width: 500rpx;height: 800rpx;border-radius: 20rpx;" mode=""></image>
                </view>

                <view class="share_custom">

                    <view class="share_bottom">
                        <view class="left" @click="weChatFriend">
                            <image src="../../static/inviteToRegister/wechat_logo.png"
                                style="width: 90rpx;height: 90rpx;" mode=""></image>
                            <view class="cons">
                                微信好友
                            </view>
                        </view>

                        <view class="right" @click="weChatTimeline">
                            <image src="../../static/inviteToRegister/wechatmoments.png"
                                style="width: 90rpx;height: 90rpx;" mode=""></image>
                            <view class="cons">
                                朋友圈
                            </view>
                        </view>

                        <view class="right" @click="savePhoto">
                            <image src="../../static/saveIcon.png" style="width: 90rpx;height: 90rpx;" mode=""></image>
                            <view class="cons">
                                保存图片
                            </view>
                        </view>
                    </view>

                    <view class="share_cancel" @click="close_share">
                        取消
                    </view>
                </view>
            </uni-popup>
        </view>
        <u-mask style="display: flex;justify-content: center;" :show="showAgreement">
            <view
                style="border-radius: 20rpx;width: 500rpx;height: 600rpx;background-color: #FFFFFF;margin-top: 350rpx;">
                <view>
                    <view style="width: 100%;height: 100rpx;line-height: 100rpx;text-align: center;">
                        {{agreementList.agreement_title}}</view>
                    <view style="padding:0 30rpx;">
                        <scroll-view scroll-y="true" style="height: 340rpx;">
                            <rich-text :nodes="agreementList.agreement_content"></rich-text>
                        </scroll-view>
                    </view>
                    <view
                        style="padding-left:30rpx;display: flex;align-items: center;height: 40rpx;line-height: 40rpx;">
                        <view style="margin-right: 10rpx;">
                            <image @click.stop="agreementStatus=0" v-if="agreementStatus" src="../../static/choose.png"
                                style="width: 36rpx;height: 36rpx;" mode=""></image>
                            <image @click.stop="agreementStatus=1" v-if="!agreementStatus"
                                src="../../static/fk_icon.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
                        </view>
                        <view><text style="font-size: 26rpx;">我已阅读并同意</text><text
                                style="font-size: 26rpx;color: rgba(252, 89, 87, 1);">《拼团抢购协议》</text></view>
                    </view>
                </view>
                <view
                    style="padding-top: 40rpx;display: flex;padding: 30rpx;justify-content: space-between;position: relative;bottom: 15rpx;">
                    <view
                        style="color: #999999;;font-size: 30rpx;border: 1px solid #CCCCCC;border-radius: 35px;;width: 210rpx;height: 70rpx;text-align: center;line-height: 70rpx;"
                        @click.stop="agreementStatus=0" @click="showAgreement = false">取消</view>
                    <view
                        style="color: #FFFFFF;;font-size: 30rpx;background: #FC5957;border-radius: 35px;;width: 210rpx;height: 70rpx;text-align: center;line-height: 70rpx;"
                        @click="sure_shop()">确定</view>
                </view>
            </view>
        </u-mask>

        <!-- 选择抢中结果类型弹窗 -->
        <u-mask style="display: flex;justify-content: center;" :show="showChooseResult">
            <view
                style="border-radius: 20rpx;width: 500rpx;height: 400rpx;background-color: #FFFFFF;margin-top: 600rpx;">
                <view>
                   <view style="width: 100%;height: 130rpx;line-height: 130rpx;font-size: 30rpx;font-family: PingFang SC;font-weight: 500;text-align: center;">
                       请选择抢中结果类型
                   </view>
                   <view style="width: 100%;text-align: center;align-items: center;">
                       
                       <radio-group @change="radioChange" >
                           <label style="display: flex;margin-right: 20rpx;" v-for="(item, index) in items"
                               :key="item.value">
                               <view style="height: 60rpx;line-height: 60rpx;margin-left: 120rpx;">
                                   <radio :value="item.value" :checked="index === current" color="#F4483C" style="transform:scale(0.7)" />
                               </view>
                               <view style="height: 60rpx;line-height: 60rpx;">{{item.name}}</view>
                           </label>
                       </radio-group>
                       
                   </view>
                   
                </view>
                <view
                    style="padding-top: 40rpx;display: flex;padding: 30rpx;justify-content: space-between;margin-top: 40rpx;">
                    <view
                        style="color: #999999;;font-size: 30rpx;border: 1px solid #CCCCCC;border-radius: 35px;;width: 210rpx;height: 70rpx;text-align: center;line-height: 70rpx;"
                        @click.stop="chooseResultStatus=0" @click="cancel_choose()">取消</view>
                    <view
                        style="color: #FFFFFF;;font-size: 30rpx;background: #FC5957;border-radius: 35px;;width: 210rpx;height: 70rpx;text-align: center;line-height: 70rpx;"
                        @click="sure_choose()">确定</view>
                </view>
            </view>
        </u-mask>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                items: [{
                        value: '1',
                        name: '立即发货'
                    },
                    {
                        value: '2',
                        name: '兑换拼购积分'
                    },
                ],
                current:0,
                showChooseResult: false, //是否弹出选择抢中结果类型弹窗
                chooseResultStatus:0,//是否选择抢中结果类型
                showVideo: false, //是否显示视频
                agreementStatus: 0, //是否同意拼团协议
                agreementList: {
                    agreement_title: '',
                }, //拼购协议内容
                showAgreement: false, //展示拼购协议
                videoBtn: 0, //详情页按钮
                serviceInfo: '', //客服信息
                showService: false, //显示客服弹窗
                is_agreement: false, //是否同意拼购协议
                group_id: "", //拼购活动ID
                type: "0", //0立即购买 1加入购物车
                selectSkuInfo: {}, //选中的规格信息
                navSel: '0', //选中的标签页默认值选中第一个
                navList: ["图文介绍", "规格参数", "包装售后"], //详情标签页
                total_score: "", //购物车中的商品积分
                cdnUrl: '',
                goods_id: '', //商品id
                controls: true,
                autoplay: true,
                interval: 2000,
                videoOften: 0,
                duration: 500,
                videoTit: '商品详情',
                currentChange: '0',
                showImg: true,
                changeBtn: [{
                    index: '0',
                    name: '视频'
                }, {
                    index: '1',
                    name: '图片'
                }],
                showBgc: false,
                totalNum: 0, //购物车总数
                evaluateInfo: [],
                showCoupon: false, //事都显示优惠券弹窗
                showTemplates: false, //是否显示运费弹框
                specsModel: false, //规格的弹窗
                sku: [], //规格信息
                sku_value: [], //规格值信息
                sku_price: [], //价格信息
                feeModel: false, //配送费弹窗
                parameterModel: false, //参数弹窗
                current_spacs: '-1', //规格当前索引
                current_spacs1: '-1', //规格属性当前索引
                goods_info: {
                    GroupWork: {
                        sroup_num: 0,
                        start_time: '00:00',
                        end_time: "00:00",
                    },
                    h_goods_details: "",
                    h_policy: "",
                    shopInfo: {
                        goods_video: "",
                        goods_cost: 0,
                        goods_sale: 0,
                        goods_name: "",
                        goods_intro: "",
                        group_work_price: 0,
                        goods_icon: [],
                    },
                    supplier_info: {
                        supplier_icon: "",
                        supplier_collect: 0,
                        supplier_name: "",
                    },
                    commentInfo: {
                        comment_content: ""
                    }
                },
                goods_count: 1, //商品数量
                goods_price: '', //商品价格
                sku_stock: '', //库存
                sku_spacs: '', //规格
                skuIndex_list: [],
                skuIndex: '',
                supplier_info: {}, //店铺信息
                sku_pic: '', //选择商品规格显示的图片
                chooseOption: '0',
                total_cost: '',
                total_price: '',
                low_price: '',
                cartIndex: '',
                videoContext: null,
                videoFlag: false,
                showLogin: true,
                goHome: false,
                goods_name: '',
                goods_album: '',
                array: [], //规格信息7
                isShare: 1, //1显示分享 0关闭分享
                goods_share: "" //分享链接
            };
        },
        onReady(res) {
            this.videoContext = uni.createVideoContext('myVideo');
        },
        methods: {
            sure_choose () {
                this.showChooseResult = false
                this.sure_pintuan();
            },
            cancel_choose() {
                this.showChooseResult = false
                this.showAgreement = false
                this.agreementStatus = 0
            },
            radioChange: function(evt) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].value === evt.detail.value) {
                        this.current = i;
                        // this.type = evt.detail.value;
                        break;
                    }
                }
            },
            showBigImage(item) {
                let imgUrl = this.$imgUrl(item)
                console.log(imgUrl)
                uni.previewImage({
                    urls: [imgUrl]
                });

            },
            // 立即购买
            buy(e) {
                uni.navigateTo({
                    url: 'confirmorder'
                })
            },
            // 切换按钮
            vBtn(e) {
                e == 0 ? this.videoBtn = 1 : this.videoBtn = 0
            },
            // 跳转至商品评价页面
            goComments(e) {
                uni.navigateTo({
                    url: "comments?id=" + e
                })
            },
            // 收藏、取消收藏  商品
            collectShop(e) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Goods/collectShop',
                    data: {
                        goods_index: self.goods_info.shopInfo.goods_index,
                        status: e
                    }
                }).then(res => {
                    if (res.data.success) {
                        self.goods_info.is_store == 2 ? self.goods_info.is_store = 1 : self.goods_info
                            .is_store = 2
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
            },
            // 选择的标签页
            selectNav(e) {
                this.navSel = e
            },
            // 跳转至登录页面
            goLogin() {
                uni.switchTab({
                    url: '/pages/my/my'
                });
            },
            // 请求商品详情数据
            init() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Goods/getShopDetail',
                    data: {
                        goods_index: self.goods_id,
                        group_goods_index: self.group_id
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        if (res.data.data.shopInfo.goods_video != '') {
                            self.showVideo = true;
                            self.videoBtn = 1;
                        }
                        self.goods_info = res.data.data; //商品详情所有信息
                        self.supplier_info = res.data.data.brandInfo; //店铺信息
                        self.sku = res.data.data.skuInfo; //规格信息
                        self.selectSkuInfo = res.data.data.skuInfo[0]; //默认选中的规格信息
                        self.sku_value = res.data.data.next_sku.map(el => {
                            el.next_sku.map(res => {
                                res.select = false;
                                return res
                            })
                            return el;
                        }); //规格属性值
                        self.sku_price = res.data.data.goods_sku_price; //商品不同规格的价格
                        self.goods_name = self.goods_info.goods_name;
                        // self.goods_album = self.goods_info.goods_album[0];
                        self.array = self.sku_value.map(el => {
                            el.next_sku[0].select = true
                            return el
                        })
                        // this.share();
                        // this.share1();
                        self.isShare = res.data.data.share_button
                    }
                });
            },
            //去店铺首页
            goShopDetail(e) {
                uni.navigateTo({
                    url: "ShopHomepage?id=" + e
                });
            },
            // 打电话
            getPhone(e) {
                console.log(e);
                let self = this;
                uni.makePhoneCall({
                    phoneNumber: e
                });
            },
            //打开运费说明弹框
            getParameter() {
                this.videoBtn = 0
                this.showTemplates = true;
            },
            //关闭运费说明弹框
            close() {
                this.showTemplates = false;
                this.specsModel = false;
                this.showCoupon = false;
            },
            //点击规格
            getSpacs(e) {
                this.specsModel = true;
                this.goods_count = 1;
            },
            // 点击切换获取规格和库存
            getPrice(parent, child, pn, cn) {
                let self = this;
                // 切换之前将所有的规格被选中状态改为false
                self.array[pn].next_sku = self.sku_value[pn].next_sku.map(el => {
                    el.select = false
                    return el
                });
                // 用于接受被选中的多规格商品得到规格
                let skuInfo = [];
                // 将被选中的多规格商品的选中状态改为true
                self.array[pn].next_sku[cn].select = true;
                // 拿到被选中的skuinfo值
                for (let a of self.array) {
                    for (let b of a.next_sku) {
                        b.select == true ? skuInfo.push(a.sku_index + ":" + b.sku_index) : ''
                    }
                }
                // 匹配多规格商品的skuinfo,拿到的值赋值selectSkuInfo用来展示
                for (let c of self.sku) {
                    c.sku_info.indexOf(skuInfo.toString()) != -1 ? self.selectSkuInfo = c : ''
                }
            },
            // goBack() {
            // 	window.location.href = this.$baseUrl + 'loveUgo/#/'
            // },

            //增加商品数量
            addCount() {
                if (this.goods_count < this.selectSkuInfo.sku_inventory) {
                    this.goods_count++;
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '库存不足哦~'
                    });
                }
            },
            //减少商品数量
            descCount() {
                if (this.goods_count > 1) {
                    this.goods_count--;
                } else {
                    uni.showToast({
                        icon: 'none',
                        title: '至少选择一个哦~'
                    });
                }
            },
            // 弹出分享选择框
            show_share() {
                let self = this;
                self.videoBtn = 0;
                self.request({
                    url: 'ShptUapi/public/index.php/Goods/goods_share',
                    data: {
                        goods_index: self.goods_id,
                        group_goods_index: self.group_id
                    }
                }).then(res => {
                    if (res.data.success) {
                        let a = new Date();
                        self.goods_share = self.$cdnUrl + res.data.data.goods_share + '?' + a;
                        self.$refs.popup_share.open()
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })


            },
            // 分享微信好友
            weChatFriend() {
                let self = this;
                self.$refs.popup_share.close()
                uni.share({
                    provider: "weixin",
                    scene: "WXSceneSession",
                    type: 2,
                    imageUrl: self.goods_share,
                    success: function(res) {
                        console.log("success:" + JSON.stringify(res));
                        uni.showToast({
                            title: '分享成功~',
                            icon: 'none'
                        })
                    },
                    fail: function(err) {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });


            },
            // 分享微信朋友圈
            weChatTimeline() {
                let self = this;
                self.$refs.popup_share.close()
                uni.share({

                    provider: "weixin",
                    scene: "WXSenceTimeline",
                    type: 2,
                    imageUrl: self.goods_share,
                    success: function(res) {
                        console.log("success:" + JSON.stringify(res));
                        uni.showToast({
                            title: '分享成功~',
                            icon: 'none'
                        })
                    },
                    fail: function(err) {
                        console.log("fail:" + JSON.stringify(err));
                    }
                });

            },
            // 下载图片保存到本地
            savePhoto() {
                this.$refs.popup_share.close()
                let imgUrl = this.$imgUrl(this.goods_share)
                console.log(imgUrl)
                uni.showLoading({
                    title: "下载中，请稍等"
                })
                uni.downloadFile({
                    url: imgUrl, //这里为图片路径  
                    success: (res) => {
                        uni.hideLoading();
                        uni.showLoading({
                            title: "保存中中，请稍等~"
                        })
                        if (res.statusCode === 200) {
                            uni.saveImageToPhotosAlbum({
                                filePath: res.tempFilePath,
                                success: function() {
                                    uni.hideLoading();
                                    uni.showToast({
                                        title: '保存成功！',
                                        icon: 'none'
                                    })
                                },
                                fail: function() {
                                    uni.hideLoading();
                                    uni.showToast({
                                        title: '保存失败，请稍后重试！',
                                        icon: 'none'
                                    })
                                }
                            });
                        } else {
                            uni.hideLoading();
                        }
                    },
                    fail() {
                        uni.hideLoading();
                        uni.showToast({
                            title: '下载失败，请稍后重试！',
                            icon: 'none'
                        })
                    }
                });
            },
            close_share() {
                this.$refs.popup_share.close()
            },
            // 活动已结束
            noActive() {
                uni.showToast({
                    title: '此活动即将结束，请参与下一轮',
                    icon: 'none'
                })
            },
            // 添加商品至购物车
            addCar() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Cart/addCart',
                    data: {
                        goods_index: self.selectSkuInfo.sku_goods,
                        sku_index: self.selectSkuInfo.sku_index,
                        goods_count: self.goods_count,
                    }
                }).then(res => {
                    if (res.data.success) {
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
            },
            // 开启轻松拼团
            sure_pintuan() {
                if (this.agreementStatus == 0&&this.goods_info.shopInfo.group_work_status==2) {
                    this.showAgreement = true
                } else {
                    let self = this;
                    let type = '';
                    self.goods_info.shopInfo.group_work_status == 2 || self.goods_info.shopInfo.group_work_status == 1 ?
                        type = 0 : type = 1
                    self.request({
                        url: 'ShptUapi/public/index.php/goods/join_group_work_v2',
                        data: {
                            group_goods_index: self.group_id,
                            type: type,
                            is_ecg:self.current
                        }
                    }).then(res => {
                        if (res.data.success) {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                            self.init()
                        } else {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    })
                }

            },
            // 提交订单或者添加购物车
            sure_shop() {
                this.showAgreement = false
                if (this.agreementStatus == 0) {
                    uni.showToast({
                        title: '请同意协议后再参与拼团',
                        icon: 'none'
                    })
                    return
                }
                this.agreementStatus = 1
                // this.agreementStatus==0
                this.showChooseResult = true
            },
					getCantuan(){
							// // <!-- group_work_status2 "0普通详情  1我要参团  2我要参团置灰  3参与中  4参与中置灰", -->
							if (this.goods_info.shopInfo.group_work_status2 == 2 || this.goods_info.shopInfo.group_work_status2 ==
							    4) {
							    return;
							}
							let self = this;
							self.request({
							    url: 'ShptUapi/public/index.php/goods/is_group_work',
							    data: {
							        group_goods_index: self.group_id
							    }
							}).then(res => {
							    if (res.data.success) {
							        if (self.type == 0) {
							            uni.navigateTo({
							                url: 'confirmorderGroup?goods_id=' + self.goods_id +
							                    '&group_goods_index=' + self.group_id + '&group_index=' + self
							                    .goods_info.GroupWork.group_index
							            })
							        } else {
							            self.addCar()
							        }
							    } else {
							        uni.showToast({
							            title: res.data.msg,
							            icon: 'none'
							        })
							    }
							})
						},
            //打开全部评价
            getComment(e) {
                if (uni.getStorageSync('token')) {
                    uni.navigateTo({
                        url: './comment?id=' + this.goods_id
                    });
                } else {
                    uni.showModal({
                        content: '未登录，请先登录',
                        success: function(res) {
                            if (res.confirm) {
                                uni.switchTab({
                                    url: '/pages/my/my'
                                });
                            }
                        }
                    });
                }
            },
            // 复制信息到剪切板上
            fz(e) {
                uni.setClipboardData({
                    data: e,
                    success: function() {
                        uni.showToast({
                            title: "复制成功",
                            icon: 'none'
                        })
                    },
                    fail: function() {
                        uni.showToast({
                            title: '复制失败',
                            icon: 'none'
                        })
                    }
                });
            },
            // 商品客服
            getServiceInfo() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Goods/getService',
                    data: {
                        service_id: self.goods_info.shopInfo.service_id
                    }
                }).then(res => {
                    if (res.data.success) {
                        self.serviceInfo = res.data.data
                        this.videoBtn = 0
                        self.showService = true
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            //点击播放暂停轮播
            play() {
                this.autoplay = false;
            },
            //点击暂停开始轮播
            stop() {
                this.autoplay = true;
            },
            // 获取拼购协议
            getagreementList() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/getAgreement',
                    data: {
                        type: 4
                    },
                }).then(res => {
                    if (res.data.success) {
                        self.agreementList = res.data.data
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
        },
        onShow() {
            this.getagreementList();
            this.goods_count = 1;
            if (uni.getStorageSync('token')) {
                this.showLogin = false;
            }
            uni.setNavigationBarTitle({
                title: '商品详情'
            })
        },
        onLoad(option) {
            this.cdnUrl = this.$cdnUrl;
            this.goods_id = option.id;
            this.group_id = option.group_id
            if (option.share) {
                this.goHome = true;
            }
            this.init();
        },
        // onPageScroll(e) {
        // 	if (e.scrollTop > 300) {
        // 		this.showBgc = true;
        // 	} else {
        // 		this.showBgc = false;
        // 	}
        // }
    };
</script>

<style lang="scss">
    page {
        height: 100%;
    }

    .videoBtn {
        z-index: 2;
        width: 60rpx;
        height: 30rpx;
        background-color: #FFFFFF;
        font-size: 20rpx;
        text-align: center;
        line-height: 30rpx;
        border-radius: 15rpx;
        position: absolute;
        bottom: 30rpx;
    }

    .videoBtn1 {
        background-color: rgba(255, 255, 255, 0.3)
    }

    .foot {
        display: flex;

        .btn {
            font-size: 24rpx;
            width: 213rpx;
            height: 72rpx;
            line-height: 72rpx;
            text-align: center;


        }

        .btn1 {
            font-size: 24rpx;
            width: 213rpx;
            height: 72rpx;
            line-height: 72rpx;
            text-align: center;

            border-radius: 36rpx 0 0 36rpx;
            background-color: #DE43D8;
            color: #FFFFFF;
        }

        .btn2 {
            font-size: 24rpx;
            width: 213rpx;
            height: 72rpx;
            line-height: 72rpx;
            text-align: center;
            border-radius: 36rpx 0 0 36rpx;
            background-color: #DFDFDF;
            color: #FFFFFF;
        }

        .btn3 {
            background: linear-gradient(30deg, #FD4950, #FF6F60);
            color: #FFFFFF;
        }

        .btn4 {
            border: 1px solid #FD4950;
            color: #FD4950;
        }

        .fontimg {
            margin: 0 30rpx;

            image {
                width: 36rpx;
                height: 36rpx;
            }

            view {
                font-size: 20rpx;
                font-family: Source Han Sans CN;
                font-weight: 300;
                color: #999999;
            }
        }
    }

    .navTitle {
        width: 100%;
        display: flex;
        height: 70rpx;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2rpx solid #F5F5F5;

        .nav {
            width: 33%;
            border-right: 3rpx solid #EEEEEE;
            text-align: center;
            font-size: 26rpx;
        }

        .navSel {
            color: #FD4950;
        }
    }

    .commonBgc {
        width: 100%;
        height: 20rpx;
        background-color: #F5F5F5;
    }

    .talk {
        // height: 360rpx;
        width: 100%;
        padding-left: 30rpx;
        padding-right: 30rpx;

        .title {
            margin-top: 29rpx;
            font-size: 30rpx;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #333333;
        }

        .content1 {
            margin-top: 40rpx;
            display: flex;
            justify-content: space-between;
            width: 100%;
            // height: 100%;

            .img {
                width: 60rpx;
                height: 60rpx;
                margin-right: 15rpx;
                border-radius: 50%;
            }

            .item-c {
                // height: 260rpx;
                // width: 430rpx;

                .zz {
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #333333;

                }

                .tt {

                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                    margin-left: 8rpx;
                    margin-top: 25rpx;
                }




            }

            .time {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 100%;

            }


        }
    }

    .goods {
        height: 100%;

        // padding-bottom: 100rpx;
        // box-sizing: border-box;
        .top {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            height: 90rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 333;

            .arrow {
                width: 120rpx;
                height: 100%;
                line-height: 90rpx;
                text-align: center;

                image {
                    width: 22rpx;
                    height: 37rpx;
                }
            }

            .share {
                width: 120rpx;
                height: 100%;
                line-height: 90rpx;
                text-align: center;

                image {
                    width: 40rpx;
                    height: 40rpx;
                }
            }
        }

        .banner {
            position: relative;
            height: 750rpx;

            .video {
                width: 100%;
                height: 100%;
                position: relative;

                video {
                    width: 100%;
                    height: 100%;
                }
            }

            .topImg {
                width: 100%;
                position: relative;
                height: 750rpx;

                .change {
                    position: absolute;
                    left: 50%;
                    bottom: 30rpx;
                    transform: translateX(-50%);
                    display: flex;
                    z-index: 333;

                    view {
                        width: 90rpx;
                        height: 40rpx;
                        line-height: 40rpx;
                        text-align: center;
                        background: rgba(153, 153, 153, 0.3);
                        border-radius: 30rpx;
                        font-size: 20rpx;
                        font-family: PingFang SC;
                        font-weight: 300;
                        color: rgba(255, 255, 255, 1);
                        margin: 0 10rpx;
                    }

                    .selected {
                        background: rgba(153, 153, 153, 1);
                    }
                }

                .banner_img {
                    width: 100%;
                    height: 750rpx;
                    position: relative;

                    image {
                        width: 100%;
                        height: 750rpx;
                    }

                    video {
                        width: 100%;
                        height: 100%;
                    }
                }

                .total {
                    position: absolute;
                    bottom: 30rpx;
                    right: 30rpx;
                    padding: 0 10rpx;
                    height: 30rpx;
                    line-height: 30rpx;
                    text-align: center;
                    color: #fff;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 15rpx;
                    font-size: 20rpx;
                }
            }
        }

        .goodsTitle {
            padding: 30rpx;
            background-color: #fff;

            .title {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #000000;
            }

            .intro {
                margin-top: 20rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
            }

            .price {
                margin-top: 20rpx;

                .txt {
                    color: #ff1c1c;
                    font-size: 24rpx;
                }

                .txt1 {
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #ff1c1c;
                }

                .txt2 {
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    text-decoration: line-through;
                    color: #999999;
                    margin-left: 10rpx;
                }
            }

            .btns {
                height: 60rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30rpx;

                .collect {
                    width: 118rpx;
                    height: 47rpx;
                    line-height: 47rpx;
                    text-align: center;
                    background: #ffffff;
                    border: 1rpx solid #333333;
                    border-radius: 24rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;

                    image {
                        width: 27rpx;
                        height: 26rpx;
                        vertical-align: middle;
                        margin-right: 5rpx;
                        margin-top: -3rpx;
                    }
                }

                .addShop {
                    width: 220rpx;
                    height: 60rpx;
                    line-height: 60rpx;
                    text-align: center;
                    background: linear-gradient(30deg, #fd4950, #ff6f60);
                    border-radius: 30rpx;
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #ffffff;
                }
            }
        }

        .base_msg {
            padding: 0 30rpx;
            font-size: 26rpx;

            view {
                height: 90rpx;
                line-height: 90rpx;
            }

            .address {
                display: flex;
                justify-content: space-between;
                font-size: 26rpx;
                font-family: Source Han Sans CN;
                color: rgba(51, 51, 51, 1);
                border-bottom: 1rpx solid #f5f5f5;

                image {
                    width: 26rpx;
                    height: 26rpx;
                    vertical-align: middle;
                }
            }

            .choose {
                display: flex;
                justify-content: space-between;
                font-size: 26rpx;
                font-family: Source Han Sans CN;

                .right_img {
                    width: 18rpx;

                    image {
                        width: 18rpx;
                        height: 30rpx;
                    }
                }

                .discount {
                    display: flex;
                    margin: 25rpx 0;

                    view {
                        width: 140rpx;
                        height: 40rpx;
                        line-height: 40rpx;
                        text-align: center;
                        position: relative;
                        font-size: 16rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #fff;
                        margin-bottom: 10rpx;
                        margin-right: 10rpx;
                    }

                    .coupon {
                        background: url(../../static/quan1.png) no-repeat;
                        background-size: 100% 100%;
                    }

                    .coupon1 {
                        background: url(../../static/quan.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }

        .evaluate {
            padding: 0 30rpx;

            .evaluate_tit {
                margin: 30rpx 0 40rpx;
                font-size: 30rpx;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
            }

            .user_msg {
                display: flex;
                justify-content: space-between;

                .user_left {
                    display: flex;
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);

                    image {
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                        margin-right: 20rpx;
                    }

                    .star {
                        width: 22rpx;
                        height: 22rpx;
                        margin: 0 0 0 10rpx;
                    }

                    .label {
                        font-size: 24rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                    }
                }

                .time {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }
            }

            .content {
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                margin-top: 20rpx;
                padding-left: 80rpx;
            }

            .imgs {
                display: flex;
                flex-wrap: wrap;
                padding-left: 80rpx;

                image {
                    width: 130rpx;
                    height: 130rpx;
                    margin: 20rpx 10rpx 0;
                }
            }

            .lookAll {
                margin-top: 30rpx;
                width: 100%;
                height: 90rpx;
                text-align: center;

                text {
                    display: inline-block;
                    width: 150rpx;
                    height: 50rpx;
                    line-height: 50rpx;
                    margin-top: 20rpx;
                    text-align: center;
                    background: #ffffff;
                    border: 1rpx solid #999999;
                    border-radius: 25rpx;
                    font-size: 24rpx;
                    font-family: Source Han Sans CN;
                    color: #333;
                }
            }
        }

        .shopMsg {
            padding: 30rpx;
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            align-items: center;

            .left {
                // flex: 1;
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #333333;
                display: flex;
                align-items: center;

                .case {
                    border-radius: 10rpx;
                    width: 100rpx;
                    height: 100rpx;
                    vertical-align: middle;
                    margin-right: 14rpx;
                }

                .image {
                    width: 13rpx;
                    height: 26rpx;
                    margin-left: 10rpx;
                }
            }

            .right {
                height: 80rpx;
                text-align: right;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                display: flex;
                align-items: center;

                image {
                    width: 26rpx;
                    height: 26rpx;
                    margin-right: 10rpx;
                }
            }
        }

        .goods_imgs {
            width: 100%;
            margin-bottom: 100rpx;

            image {
                width: 100%;
            }
        }

        .addGoods {
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            height: 98rpx;
            line-height: 98rpx;
            background: #ffffff;
            box-shadow: 0px -1rpx 1rpx 0px rgba(102, 102, 102, 0.19);

            .carImg {
                width: 103rpx;
                height: 103rpx;
                position: absolute;
                top: -20rpx;
                left: 30rpx;
            }

            .totalNum {
                width: 35rpx;
                height: 35rpx;
                line-height: 35rpx;
                text-align: center;
                color: #fff;
                background: #333333;
                border-radius: 50%;
                position: absolute;
                top: -20rpx;
                left: 100rpx;
                font-size: 18rpx;
                font-family: PingFang SC;
            }

            .word {
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #7a7a7a;
                margin-left: 150rpx;

                .price {
                    font-size: 36rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #ff3f3f;
                }

                .price1 {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    text-decoration: line-through;
                    color: #999999;
                    margin-left: 10rpx;
                }
            }

            .account {
                width: 160rpx;
                height: 60rpx;
                background: linear-gradient(30deg, #f6281b, #ff5f53);
                border-radius: 30rpx;
                color: #fff;
                line-height: 60rpx;
                text-align: center;
                font-size: 30rpx;
                font-family: PingFang SC;
                position: absolute;
                right: 30rpx;
                top: 20rpx;
            }

            .account1 {
                width: 160rpx;
                height: 60rpx;
                background: linear-gradient(270deg, #c6c6c6, #e8e8e8);
                box-shadow: 0px -1px 1px 0px rgba(102, 102, 102, 0.19);
                border-radius: 30rpx;
                color: #fff;
                line-height: 60rpx;
                text-align: center;
                font-size: 30rpx;
                font-family: PingFang SC;
                position: absolute;
                right: 30rpx;
                top: 20rpx;
            }
        }

        .common {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            // z-index: 22222;

            .common_con {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                min-height: 800rpx;
                background: rgba(255, 255, 255, 1);
                border-radius: 30rpx 30rpx 0px 0px;

                .close {
                    position: absolute;
                    right: 30rpx;
                    top: 30rpx;
                    color: #999999;
                }

                .common_tit {
                    height: 120rpx;
                    line-height: 120rpx;
                    text-align: center;
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                }

                .common_tit1 {
                    font-size: 26rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #999999;
                    padding: 0 30rpx 30rpx 30rpx;
                }

                .ricket_list {
                    margin-bottom: 100rpx;
                    height: 630rpx;
                }

                .ricket1 {
                    background-image: url(../../static/youhui1.png);
                }

                .ricket2 {
                    background-image: url(../../static/youhui.png);
                }

                .ricket {
                    width: 655rpx;
                    height: 210rpx;
                    background-size: cover;
                    padding: 30rpx 20rpx;
                    box-sizing: border-box;
                    margin-bottom: 15rpx;
                    font-family: PingFang SC;
                    color: #ffffff;
                    font-weight: bold;
                    margin: auto;

                    .one {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 26rpx;

                        .ricket_left {
                            display: flex;
                            justify-content: space-between;

                            .money {
                                display: flex;

                                .txt1 {
                                    font-size: 34rpx;
                                    padding-top: 10rpx;
                                }

                                .txt2 {
                                    font-size: 84rpx;
                                }
                            }

                            .glibly {
                                margin-top: 20rpx;
                                margin-left: 10rpx;

                                .txt4 {
                                    font-size: 20rpx;
                                    margin-top: 10rpx;
                                }
                            }
                        }
                    }

                    .two {
                        .txt {
                            font-size: 20rpx;
                            opacity: 0.6;
                        }
                    }
                }

                .intro {
                    display: flex;
                    font-size: 26rpx;
                    font-family: Source Han Sans CN;
                    padding: 0 40rpx;
                    margin-bottom: 50rpx;

                    .left1 {
                        color: rgba(153, 153, 153, 1);
                        width: 130rpx;
                    }

                    .right1 {
                        color: rgba(51, 51, 51, 1);
                        flex: 1;
                    }
                }

                .sure {
                    width: 690rpx;
                    height: 80rpx;
                    line-height: 80rpx;
                    text-align: center;
                    background: #fc4950;
                    border-radius: 40rpx;
                    position: absolute;
                    bottom: 10rpx;
                    left: 30rpx;
                    color: #fff;
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                }
            }

            .common_con1 {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                min-height: 530rpx;
                max-height: 900rpx;
                overflow-y: auto;
                padding-bottom: 270rpx;
                background: rgba(255, 255, 255, 1);
                border-radius: 30rpx 30rpx 0px 0px;

                .close {
                    position: absolute;
                    right: 30rpx;
                    top: 30rpx;
                    color: #999999;
                }

                .spacs_img {
                    display: flex;
                    padding: 30rpx 30rpx 0 30rpx;

                    .img {
                        margin-right: 20rpx;
                        width: 200rpx;
                        height: 200rpx;

                        image {
                            width: 200rpx;
                            height: 200rpx;
                            border-radius: 10rpx;
                        }
                    }

                    .price {
                        font-size: 26rpx;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: rgba(255, 28, 28, 1);
                        margin-top: 20rpx;

                        text {
                            font-size: 30rpx;
                        }
                    }

                    .choose {
                        font-size: 26rpx;
                        font-family: Source Han Sans CN;
                        font-weight: 300;
                        color: rgba(51, 51, 51, 1);
                        margin: 20rpx 0;
                    }

                    .rest {
                        font-size: 26rpx;
                        font-family: Source Han Sans CN;
                        font-weight: 300;
                        color: rgba(153, 153, 153, 1);
                    }
                }

                .spacs_info {
                    padding: 0 30rpx;

                    .spacs_tit {
                        font-size: 26rpx;
                        font-family: Source Han Sans CN;
                        font-weight: 300;
                        color: rgba(51, 51, 51, 1);
                        margin-top: 30rpx;
                    }

                    .options {
                        view {
                            padding: 10rpx 20rpx;
                            border-radius: 10rpx;
                            font-size: 26rpx;
                            font-family: Source Han Sans CN;
                            font-weight: 300;
                            color: rgba(51, 51, 51, 1);
                            display: inline-block;
                            border: 1rpx solid #f5f5f5;
                            margin: 20rpx 20rpx 0 0;
                        }

                        .option {
                            background: rgba(253, 99, 94, 0.2);
                            border: 1rpx solid #fd635e;
                        }
                    }
                }

                .sure_num {
                    width: 100%;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    background-color: #fff;

                    .buy_num {
                        padding: 0 30rpx;
                        height: 88rpx;
                        line-height: 88rpx;
                        border-top: 1rpx solid #f5f5f5;
                        border-bottom: 1rpx solid #f5f5f5;
                        display: flex;
                        justify-content: space-between;
                        font-size: 30rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);

                        .num {
                            image {
                                width: 36rpx;
                                height: 36rpx;
                                vertical-align: middle;
                            }

                            text {
                                margin: 0 30rpx;
                            }
                        }
                    }

                    .sure {
                        margin: 30rpx;
                        height: 90rpx;
                        line-height: 90rpx;
                        text-align: center;
                        background: #fc4950;
                        border-radius: 45rpx;
                        font-size: 36rpx;
                        font-family: Source Han Sans CN;
                        font-weight: 300;
                        color: rgba(255, 255, 255, 1);
                    }
                }
            }
        }
    }

    .share_custom {
        width: 100%;
        height: 340rpx;
        display: flex;
        flex-direction: column;
        background-color: #FFFFFF;
        border-radius: 20px 20px 0px 0px;

        .share_cancel {
            text-align: center;
            height: 80rpx;
            line-height: 80rpx;
            font-size: 36rpx;
            margin: 30rpx;
            border-radius: 10rpx;
            border: 1px solid #EEEEEE;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }

        .share_bottom {
            margin-top: 30rpx;
            display: flex;
            justify-content: space-between;
            text-align: center;

            .left {
                width: 50%;

                .cons {
                    margin-top: 20rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                }
            }

            .right {
                width: 50%;

                .cons {
                    margin-top: 20rpx;
                    font-family: PingFang SC;
                    font-weight: 400;
                    color: #333333;
                }
            }
        }
    }
</style>
