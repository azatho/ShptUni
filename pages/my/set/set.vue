<template>
    <view class="page">

        <view class="title">
            消息设置
        </view>

        <view class="hang">
            <view class="txt">消息推送设置</view>
            <switch :checked="is_push" @change="change" color="#FD635E" />
        </view>

        <view class="title">
            安全设置
        </view>

        <view class="hang" @click="chPhone(phone)">
            <view class="txt">修改手机号</view>
            <view class="right">
                {{phone.length>0?phone:""}}
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>

        <view class="title">
            其他
        </view>
        <view class="hang" @click="goPage()">
            <view class="txt">个人资料管理</view>
            <view class="right">
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>
        <view class="hang" @click="goSet()">
            <view class="txt">权限管理</view>
            <view class="right">
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>
        <view class="hang" @click="checkVersion()">
            <view class="txt">版本更新</view>
            <view class="right">
                {{version.length>0?version:""}}
            </view>
        </view>
        <!-- <view class="hang" @click="clean()">
            <view class="txt">清理缓存</view>
            <view class="right">
                {{phone.length>0?phone:""}}
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view> -->

        <button class="butt" @click="quit()">退出登录</button>


        <view>
            <uni-popup ref="popup" type="center">
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
    export default {
        data() {
            return {
                phone: "",
                version: "",
                //推送开关是否开启
                is_push: 0,
                //当前是iOS还是安卓
                type: "ios",
                //更新内容
                update_content: [],
                //apk下载地址
                downloadURL: "",
                //是否是强制更新 0不强制  1强制
                force_update: 0
            }
        },
        onShow() {
            this.phone = uni.getStorageSync("phone")
            if (this.phone) {
                this.phone = this.phone.replace(/^(\d{3})\d{4}(\d+)/, '$1****$2');
            }
            this.version = plus.runtime.version; //获取当前版本号  

            this.is_push = parseInt(uni.getStorageSync("is_push"))
            // console.log(typeof(this.is_push))
            console.log(this.is_push)
            switch (uni.getSystemInfoSync().platform) {

                case 'android':

                    console.log('运行Android上')
                    this.type = "android"
                    break;

                case 'ios':

                    console.log('运行iOS上')
                    this.type = "ios"
                    break;

                default:

                    console.log('运行在开发者工具上')

                    break;

            }
        },
        methods: {

            change(e) {
                console.log(e.target.value)
                let push = 0
                if (e.target.value == true) {
                    push = 1
                }
                let self = this;
                uni.showLoading()
                self.request({
                    url: 'ShptUapi/public/index.php/App/launchPush',
                    data: {
                        is_push: push
                    }
                }).then(res => {
                    uni.hideLoading()
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                    if (res.data.success) {
                        self.is_push = !self.is_push
                        
                        uni.setStorage({
                            key: 'is_push',
                            data: self.is_push,
                            success: function() {
                                console.log('success push', self.is_push,typeof(self.is_push));
                            }
                        });
                        
                    } 
                    // else {
                    //     uni.showToast({
                    //         title: res.data.msg,
                    //         icon: 'none'
                    //     })
                    // }
                })
            },
            // 修改手机号
            chPhone(e) {
                uni.navigateTo({
                    url: '../user/amendPhone?phone=' + e
                })
            },
            goPage() {
                uni.navigateTo({
                    url: '../user/userInfo'
                })
            },
            goSet() {
                if (this.type == "ios") {
                    var UIApplication = plus.ios.import("UIApplication");
                    var application2 = UIApplication.sharedApplication();
                    var NSURL2 = plus.ios.import("NSURL");
                    // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");        
                    var setting2 = NSURL2.URLWithString("app-settings:");
                    application2.openURL(setting2);

                    plus.ios.deleteObject(setting2);
                    plus.ios.deleteObject(NSURL2);
                    plus.ios.deleteObject(application2);
                } else {
                    // console.log(plus.device.vendor);
                    var Intent = plus.android.importClass("android.content.Intent");
                    var Settings = plus.android.importClass("android.provider.Settings");
                    var Uri = plus.android.importClass("android.net.Uri");
                    var mainActivity = plus.android.runtimeMainActivity();
                    var intent = new Intent();
                    intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
                    intent.setData(uri);
                    mainActivity.startActivity(intent);
                }
            },
            // 版本更新
            checkVersion() {
                uni.showLoading({
                    title: '努力加载中...',
                    mask: false
                });
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/user/version_update',
                    data: {
                        version: self.version,
                        // version: 0.1,
                        type: self.type
                    }
                }).then(res => {
                    uni.hideLoading();
                    console.log(res)
                    if (res.data.success) {
                        if (res.data.data.is_version == 1) {
                            self.downloadURL = self.$imgUrl(res.data.data.new_url)
                            self.update_content = res.data.data.update_content

                            self.force_update = res.data.data.force_update
                            self.$refs.popup.open()
                        } else {
                            uni.showToast({
                                title: "已经是最新版本了~",
                                icon: 'none'
                            })
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 退出登录
            quit() {
                let self = this

                uni.showModal({
                    title: '提示',
                    content: '您确定退出登录吗？',
                    success(res) {
                        if (res.confirm) {
                            self.request({
                                url: 'ShptUapi/public/index.php/login/logOut',
                                data: {},
                            }).then(res => {

                                if (res.data.success) {
                                    uni.clearStorageSync('token');
                                    uni.showToast({
                                        title: '退出成功',
                                        icon: 'none'
                                    })
                                    setTimeout(() => {
                                        uni.navigateBack({

                                        })
                                    }, 2000)
                                }
                            })
                        }
                    }
                })
            },
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
                    console.log(this.downloadURL)
                    uni.showLoading({
                        title:'下载中...'
                    })
                    var dtask = plus.downloader.createDownload(this.downloadURL, {}, function(d, status) {
                        uni.hideLoading();
                        uni.showToast({
                            title: '下载成功...',
                            mask: false,
                            duration: 1500,

                        });
                         console.log(this.downloadURL)
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
                this.$refs.popup.close()
            }
        }
    }
</script>

<style lang="scss">
    .page {
        background-color: #F5F5F5;
    }

    .hang {
        border-top: 2rpx solid #F5F5F5;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        display: flex;
        justify-content: space-between;
        text-align: center;
        line-height: 50px;
        padding: 5rpx 30rpx;
        box-sizing: border-box;

        background-color: #FFFFFF;
    }

    .hang image {
        width: 100%;
        height: 100%;
        vertical-align: middle;
    }

    .hang .txt1 {
        color: #999999;
    }

    .hang .txt2 {
        width: 120rpx;
        height: 50rpx;
    }

    .hang .right {
        display: flex;
        justify-content: space-between;
    }

    .hang .right .one image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
    }

    .hang .right .two {
        width: 17rpx;
        height: 32rpx;
        margin-left: 20rpx;
    }

    .title {
        padding-left: 30rpx;
        padding-top: 13rpx;
        padding-bottom: 13rpx;
        /* text-align: center; */
        /* line-height: 50px; */
        color: #999999;
    }

    .butt {
        /* width: 690rpx; */
        height: 90rpx;
        background: #FD635E;
        border-radius: 45rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 90rpx;
        text-align: center;
        position: fixed;
        bottom: 60rpx;
        left: 30rpx;
        right: 30rpx;
    }

    .dialog {
        width: 458rpx;
        height: 520rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;
        background-image: url(../../../static/version_bg.png);
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
