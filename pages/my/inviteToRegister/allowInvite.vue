<template>
    <view class="imgbox">
        <view class="one"></view>
        <image src="../../../static/inviteToRegister/yq1.png" class="img1" mode="scaleToFill"></image>

        <image src="../../../static/inviteToRegister/yq3.png" class="img3"></image>
        <image src="../../../static/inviteToRegister/yq4.png" class="img4"></image>
        <image src="../../../static/inviteToRegister/yq5.png" class="img5"></image>
        <image src="../../../static/inviteToRegister/yq6.png" class="img6"></image>
        <image src="../../../static/inviteToRegister/yq7.png" class="img7"></image>
        <image src="../../../static/inviteToRegister/yq7.png" class="img8"></image>
        <text class="text1">邀请好友</text>
        <text class="text2">好友注册</text>
        <text class="text3">获得相应奖励</text>
        <!-- <image src="../../../static/inviteToRegister/yq8.png" class="img9"></image> -->
        <image src="../../../static/inviteToRegister/yq9.png" class="img10"></image>

        <view class="num">
            分享<text> {{askPresons}} </text>位好友
        </view>
        <view class="lookAll">
            <text @click="goAllPresons">查看全部>></text>
        </view>

        <view class="askText">
            <view class="title">
                <view class="line">

                </view>
                <view class="title-c">
                    邀请说明
                </view>
                <view class="line">

                </view>
            </view>
            <view class="textTile">
                一、邀请奖励说明：
            </view>
            <view class="textCon">
                ·{{invitation_note1}}
            </view>
            <view class="textCon">
                ·{{invitation_note2}}
            </view>

            <view class="textTile" style="padding-bottom: 200rpx;">
                二、当您未邀请成功时，其他相应奖励不可领取！
            </view>
        </view>

        <view class="bottomBtn">
            <image src="../../../static/inviteToRegister/yq10.png" class="img-b" @click="goPage(0)"></image>
            <view class="img-c">
                <image src="../../../static/inviteToRegister/yq11.png" class="img-d" @click="show_share"></image>
                <!-- <button type="default" open-type="share" style="width: 100%;height: 100%;opacity: 0;position: absolute;
            		left: 0;
            		top: 0;"></button> -->
            </view>
            <image src="../../../static/inviteToRegister/yq12.png" class="img-b" @click="showImage"></image>


        </view>

 
        <view>
            <uni-popup ref="popup" type="center">
                <view class="dialog" style="width: 650rpx;height: 90vh;">
                    <!-- <view class="dia-image"> -->

					<view style="width: 100%;height: 5%;"></view>
                    <image :src="$imgUrl(share_poster)" style="width: 80%;height: 100%;margin:5%;margin-left: 10%;"   mode=""></image>

                    <!-- </view> -->
					<view>
						<view class="dia-f" @tap="goDownLoad">
						    下载
						</view>
						<view class="dia-close" @tap="close">
						    取消
						</view>
					</view>
              
                </view>
            </uni-popup>
        </view>

        <view>
            <uni-popup ref="popup_share" type="bottom">
                <view class="share_custom">
                    <view class="share_top">
                        分享给好友
                    </view>
                    <view class="share_bottom" >
                        <view class="left" @click="weChatFriend">
                            <image src="../../../static/inviteToRegister/wechat_logo.png"
                                style="width: 90rpx;height: 90rpx;" mode=""></image>
                            <view class="cons">
                                微信好友
                            </view>
                        </view>

                        <view class="right" @click="weChatTimeline">
                            <image src="../../../static/inviteToRegister/wechatmoments.png"
                                style="width: 90rpx;height: 90rpx;" mode=""></image>
                            <view class="cons">
                                朋友圈
                            </view>
                        </view>
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
                cdnUrl: "",
                askPresons: 0,
                img: "",
                share_poster: "",
                is_share: "", //0不允许分享  1允许
                share_url: "", //分享url
                share_title: "", //分享标题
                share_des: "", //分享描述
                share_logo: "" ,//分享图片
                invitation_note1:"",
                invitation_note2:""
            }
        },

        onLoad() {
            this.cdnUrl = this.$cdnUrl
            // console.log(indexApi)

		if(!this.$token()){
				uni.showToast({
					title:'您还未登录，将前往登录页面',
					icon:'none'
				})
				setTimeout(function(){
					uni.switchTab({
						url:'../my'
					})
				},1000)
			}else{  
				let self = this;
				self.request({
				    url: 'ShptUapi/public/index.php/UserInvite/invite',
				    data: {
				        page: 1,
						type:1,
				    }
				}).then(res => {
				    console.log(res)
				    if (res.data.success) {
				        self.askPresons = res.data.data.invitation_num
				        self.invitation_note1 = res.data.data.invitation_note1
				        self.invitation_note2 = res.data.data.invitation_note2
				    } else {
				        uni.showToast({
				            title: res.data.msg,
				            icon: 'none'
				        })
				    }
				})
				
				self.request({
				    url: 'ShptUapi/public/index.php/UserInvite/reg_photo',
				    data: {}
				}).then(res => {
				    if (res.data.success) {
				        this.img = res.data.data.reg_photo
                        
                        self.request({
                            url: 'ShptUapi/public/index.php/UserInvite/share_poster',
                            data: {}
                        }).then(res => {
                        
                            if (res.data.success) {
                                console.log(res.data.data.share_poster)
                                this.share_poster = res.data.data.share_poster
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            }
                        })
				    } else {
				        uni.showToast({
				            title: res.data.msg,
				            icon: 'none'
				        })
				    }
				})
				
				self.shareSet()
			}
     
        },
		onShow(){
		
		},
        methods: {

            shareSet() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserInvite/share_set',
                    data: {}
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.is_share = res.data.data.is_share
                        self.share_url = res.data.data.share_url
                        self.share_title = res.data.data.share_title
                        self.share_des = res.data.data.share_des
                        self.share_logo = res.data.data.share_logo

                        if (self.share_logo.split('https')[0] != '') {
                            self.share_logo = self.$cdnUrl + self.share_logo;
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            showToast() {
                this.$refs.uToast.show({
                    title: '分享成功',
                    type: 'default',
                })
            },
            goPage(e) {
                // if (e==0) {
                let imgUrl = this.$imgUrl(this.img)
                console.log(imgUrl)
                uni.previewImage({
                    urls: [imgUrl]
                });

            },
            showImage() {
                this.$refs.popup.open();
            },

            goDownLoad() {
                this.$refs.popup.close();
                let imgUrl = this.$imgUrl(this.share_poster)
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
            close() {
                this.$refs.popup.close()
            },
            // 弹出分享选择框
            show_share() {
                this.$refs.popup_share.open()
            },
            // 分享微信好友
            weChatFriend() {
                let self = this;
                self.$refs.popup_share.close();
                if (self.is_share == 1) {

                    uni.share({
                        provider: "weixin",
                        scene: "WXSceneSession",
                        type: 0,
                        href: self.share_url,
                        title: self.share_title,
                        summary: self.share_des,
                        imageUrl: self.share_logo,
                        success: function(res) {
                            console.log("success:" + JSON.stringify(res));
                            uni.showToast({
                                title: '分享成功~',
                                icon: 'none'
                            })
                        },
                        fail: function(err) {
                            console.log("fail:" + JSON.stringify(err));
                            // uni.showToast({
                            //     title: "fail:" + JSON.stringify(err),
                            //     icon: 'none'
                            // })
                        }
                    });
                } else {
                    uni.showToast({
                        title: '系统维护中~',
                        icon: 'none'
                    })
                }

            },
            weChatTimeline() {
                let self = this;
                self.$refs.popup_share.close();
                if (self.is_share == 1) {

                    uni.share({
                        provider: "weixin",
                        scene: "WXSenceTimeline",
                        type: 0,
                        href: self.share_url,
                        title: self.share_url,
                        summary: self.share_des,
                        imageUrl: self.share_logo,
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
                } else {
                    uni.showToast({
                        title: '系统维护中~',
                        icon: 'none'
                    })
                }
            },

            goAllPresons() {
                uni.navigateTo({
                    url: 'goAllPresons/goAllPresons?straight_num=' + this.askPresons
                });
            }

        }
    }
</script>

<style lang="scss" scoped>
    .imgbox {
        width: 100%;
        position: relative;
        background-color: #FD635E;
        height: 1700rpx;

        .one {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            // height: 2056rpx;
            background-color: #FD635E;
        }

        .img1 {
            width: 100%;
            height: 990rpx;
            position: absolute;
            left: 0rpx;
            top: 0rpx;
        }

        .img2 {
            width: 750rpx;
            height: 671rpx;
            position: absolute;
            left: 0rpx;
            top: 130rpx;
            // object-fit: fill;
        }

        .img3 {
            width: 670rpx;
            height: 350rpx;
            position: absolute;
            left: 40rpx;
            top: 443rpx;
        }

        .img4 {
            width: 97.5rpx;
            height: 97.5rpx;
            position: absolute;
            left: 94rpx;
            top: 603rpx;
        }

        .img5 {
            width: 97.5rpx;
            height: 97.5rpx;
            position: absolute;
            left: 320rpx;
            top: 603rpx;
        }

        .img6 {
            width: 97.5rpx;
            height: 97.5rpx;
            position: absolute;
            right: 117rpx;
            top: 603rpx;
        }

        .img7 {
            width: 82rpx;
            height: 22rpx;
            position: absolute;
            left: 218rpx;
            top: 635rpx;
        }

        .img8 {
            width: 82rpx;
            height: 22rpx;
            position: absolute;
            left: 439rpx;
            top: 635rpx;
        }

        .img9 {
            width: 650rpx;
            height: 131rpx;
            position: absolute;
            left: 50rpx;
            top: 1090rpx;

        }

        .text1 {
            position: absolute;
            left: 98rpx;
            top: 721rpx;
            font-size: 23rpx;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #666666;

        }

        .text2 {
            position: absolute;
            left: 303rpx;
            top: 721rpx;
            font-size: 23rpx;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #666666;
        }

        .text3 {
            position: absolute;
            right: 104rpx;
            top: 721rpx;
            font-size: 23rpx;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #666666;
        }

        .img10 {
            width: 670rpx;
            height: 254rpx;
            position: absolute;
            left: 40rpx;
            // top: 1100rpx;
            top: 841rpx;
        }

        .num {
            position: absolute;
            left: 68rpx;
            top: 973rpx;
            font-size: 30rpx;
            font-family: Source Han Sans CN;
            font-weight: 300;
            color: #666666;

            text {
                margin-left: 17rpx;
                margin-right: 17rpx;
                font-size: 59rpx;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: #FD635E;
            }
        }


        .lookAll {
            position: absolute;
            right: 105rpx;
            top: 991rpx;
            font-family: Source Han Sans CN;
            font-weight: 300;
            text-decoration: underline;
            font-size: 30rpx;
            color: #FD635E;
        }

        .askText {
            position: absolute;
            top: 1191rpx;
            left: 0;
            width: 100%;

            .title {
                padding: 0px 50rpx;
                display: flex;
                justify-content: space-around;
                align-items: center;

                width: 570rpx;
                margin: 0 auto;
                margin-bottom: 35rpx;

                .line {
                    width: 120rpx;
                    height: 2rpx;
                    background: #FFE6D5;
                }

                .title-c {

                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #FFE6D5;
                }
            }

            .textTile,
            .textCon {
                line-height: 45rpx;
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFE6D5;
                padding: 0px 50rpx;
            }

            .textCon {
                text-indent: 2em;
            }
        }

        .bottomBtn {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 124rpx;
            background-color: #E43634;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .img-b {

                width: 30%;
                height: 86rpx;
            }

            .img-c {

                width: 30%;
                height: 86rpx;
                position: relative;

                .img-d {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 86rpx;
                }
            }
        }
    }

    .dialog {
        display: flex;
		flex-direction: column;
		justify-content: space-between;
        // justify-content: center;
        // flex-direction: column;
        // width: 100%;
        text-align: center;

        .dia-f {
            margin-top: 40rpx;
            width: 100%;
            height: 88rpx;
            background-color: #FFFFFF;
            text-align: center;
            line-height: 88rpx;
            border-bottom: 1px solid #F5F5F5;
            border-radius: 10px 10px 0px 0px;
        }

        .dia-close {
            width: 100%;
            height: 88rpx;
            line-height: 88rpx;
            background-color: #FFFFFF;
            text-align: center;
            border-radius: 0px 0px 10px 10px;
        }
    }

    .share_custom {
        width: 100%;
        height: 300rpx;
        display: flex;
        flex-direction: column;
        background-color: #FFFFFF;
        border-radius: 20px 20px 0px 0px;

        .share_top {
            text-align: center;
            height: 80rpx;
            line-height: 80rpx;
            font-size: 26rpx;

        }

        .share_bottom {
            display: flex;
            justify-content: space-between;
            text-align: center;

            .left {
                width: 50%;

                .cons {
                    margin-top: 20rpx;
                    color: #999999;
                }
            }

            .right {
                width: 50%;

                .cons {
                    margin-top: 20rpx;
                    color: #999999;
                }
            }
        }
    }
</style>
