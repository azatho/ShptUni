<template>
    <view style="background-color: #fff;padding-top: 100rpx;" v-if="webview==false">
        <view class="img">
            <image :src="cdnUrl+company.small_logo" mode="aspectFill"></image>
        </view>
        <view class="project_name">
            <view class="">{{company.project_name}}</view>
        </view>
        <view style="padding: 0 30rpx;">
            <view class="content">
                <view class="" style="color: color: #333333;">公司名称</view>
                <view class="" style="color: #666666;">{{company.company_name}}</view>
            </view>
            <view class="content" v-if="company.service_phone!='' ">
                <view class="" style="color:#333333;">联系电话</view>
                <view class="" style="color: #7EAEF5;" @click="callPhone(company.service_phone)">
                    {{company.service_phone}}</view>
            </view>
            <view class="content" v-if="company.service_email">
                <view class="" style="color:  #333333;">联系邮箱</view>
                <view class="" style="color: #7EAEF5;">{{company.service_email}}</view>
            </view>
            <view class="content" v-if="company.website">
                <view class="" style="color:  #333333;">官方网站</view>
                <view class="" style="color: #7EAEF5;" @click="gourl(company.website)">{{company.website}}</view>
            </view>
            <view class="content" v-if="company.public_wechat!='' ">
                <view class="" style="color: #333333;">微信公众号</view>
                <view class="erText" style="color: #666666;">{{company.public_wechat}}
                    <image class="er" src="../../../static/er.png" mode="aspectFill" @click="openEr()"></image>
                </view>
            </view>
            <view class="content" v-if="company.public_wechat!='' ">
                <view class="" style="color: #333333;">简介</view>
                <view class="" style="color: #7EAEF5;" @click="gojian()">查看简介</view>
            </view>
            <view class="content1">
                <view class="" style="margin-bottom: 10px;color: #333333;">联系地址</view>
                <view class="" style="color: #666666;">{{company.company_address}}</view>
            </view>

        </view>
        <view class="copyright" v-if="company.copyright!='' ">
            <view class="" style="color:#333333;">版权信息</view>
            <view style="margin-top: 10rpx;color: #666666;">{{company.copyright}}</view>
        </view>
        <view style="width:100%;height:20px;background:rgba(245,245,245,1);"></view>
        	<view class="agreement" @click="goAgreement" style="color: color: #333333;">
			查看APP相关协议<image src="../../../static/back1.png" mode="aspectFill"></image>
		</view>
        <!-- 查看弹窗 -->
        <view class="window" v-if="see">
            <view class="particulars">
                <image src="../../../static/fwsdel.png" class="del" @click="getdel()" mode="aspectFill"></image>
                <view class="hang">
                    <image :src="cdnUrl+company.wx_code_url" mode="aspectFill"></image>
                </view>
            </view>
        </view>
        <!-- 查看简介 -->
        <view class="window1" v-if="seeJian">
            <view class="particulars1">
                <image src="../../../static/fwsdel.png" class="del1" @click="getdel1()" mode="aspectFill"></image>
                <view class="hang1">
                    <view class="">
                        {{company.des}}
                    </view>
                </view>
            </view>
        </view>
    </view>
    <view v-else>
        <web-view :webview-styles="webviewStyles" :src="officialHref"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                officialHref: "",
                webview: false,
                see: false,
                company: {},
                logo: '',
                cdnUrl: '',
                seeJian: false,
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            //拨打电话
            callPhone(phone) {

                uni.makePhoneCall({
                    phoneNumber: phone //仅为示例
                });
            },

            // 关闭查看
            getdel() {
                this.see = false
            },
            getdel1() {
                this.seeJian = false
            },
            openEr() {
                this.see = true;
            },
            gourl(url) {
                this.webview = true
                if (url.split('https')[0] != '') {
                    this.officialHref = 'https://' + url;
                } else {
                    this.officialHref = url;
                }
            },
            gojian(jian) {
                this.seeJian = true;
            },
            //协议列表
            goAgreement(){
                console.log(111)
            	// uni.navigateTo({
            	// 	url:'agreement'
            	// })
                uni.navigateTo({
                    url:"agreement"
                })
            },
            init() {
                this.cdnUrl = this.$cdnUrl
                let self = this
                
                self.request({
                    url: "ShptUapi/public/index.php/UserConsumers/aboutWe",
                    data: {}
                }).then(res => {
                    self.company = res.data.data
                    // console.log(res)
                })

            }
        }
    }
</script>

<style>
    page {
        background-color: #FFFFFF;
    }
</style>
<style lang="scss">
    // page{
    // 	background-color: #f5f5f5;
    // }
    .project_name {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        position: relative;
        top: -70rpx;
        text-align: center;
    }

    .img {
        width: 150rpx;
        height: 150rpx;
        margin: auto;
        box-shadow: 0px 0px 32rpx 0px rgba(166, 166, 166, 0.3);
        border-radius: 15rpx;
        margin-bottom: 100rpx;

        image {
            width: 150rpx;
            height: 150rpx;
        }
    }

    .content1 {
        padding: 20rpx 0;
        border-bottom: 1rpx solid #f5f5f5;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
    }

    .content {
        padding: 20rpx 0;
        border-bottom: 1rpx solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);

        .erText {
            top: -15rpx;
            position: relative;
        }

        .er {
            position: relative;
            top: 10rpx;
            width: 50rpx;
            height: 50rpx;
            margin-left: 20rpx;
        }
    }

    .copyright {
        padding: 20rpx 30rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
    }

    .agreement {
        padding: 30rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);

        image {
            width: 17rpx;
            height: 32rpx;
            float: right;
        }

    }

    /* 二维码弹窗 */
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
        height: 500rpx;
        background: #FFFFFF;
        border-radius: 20rpx;
        padding: 40rpx;
        box-sizing: border-box;
    }

    .particulars .hang {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .particulars .hang image {
        position: relative;
        top: -30rpx;
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    .particulars .del {
        position: relative;
        top: -25rpx;
        left: 400rpx;
        width: 36rpx;
        height: 36rpx;
    }

    /* 简介弹窗 */
    .window1 {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        font-family: PingFang SC;
        font-weight: 400;
    }

    .particulars1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 700rpx;
        height: 800rpx;
        background: #FFFFFF;
        padding: 40rpx;
        box-sizing: border-box;
        border-radius: 10rpx;
    }

    .particulars1 .hang1 {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .particulars1 .hang1 image {
        position: relative;
        top: -30rpx;
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    .particulars1 .del1 {
        position: relative;
        top: -25rpx;
        left: 612rpx;
        width: 36rpx;
        height: 36rpx;
    }
</style>
