<!-- 个人资料页面 -->
<template>
    <view>
        <view class="hang" @click="getImg()">
            <view class="txt">头像</view>
            <view class="right">
                <view class="one">
                    <image :src="userinfo.photo" mode=""></image>
                </view>
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>

        <view class="hang" @click="chPhone(userinfo.phone)">
            <view class="txt">手机号</view>
            <view class="right">
                {{userinfo.phone?userinfo.phone:""}}
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>

        <view class="hang" @click="getName(userinfo.name)">
            <view class="txt">昵称</view>
            <view class="right">
                {{userinfo.name?userinfo.name:""}}
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>
        <view class="hang" @click="editSex()">
            <view class="txt">性别</view>
            <view class="right">
                {{userinfo.sex?userinfo.sex:"请选择"}}
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>

        <view class="hang">
            <view class="txt">级别</view>
            <view class="right">
                {{userinfo.rank_name?userinfo.rank_name:"普通用户"}}

            </view>
        </view>
        <view class="hang">
            <view class="txt">推荐人</view>
            <view class="right">
                {{userinfo.referrer?userinfo.referrer:''}}
            </view>
        </view>
        <view class="hang">
            <view class="txt">注册时间</view>
            <view class="right">
                {{userinfo.regtime?formatTime(userinfo.regtime):""}}
            </view>
        </view>

        <view class="hang">
            <view class="txt">
                绑定微信账号
            </view>
            <view class="right" style="display: flex;">

                <view class="" v-if="isWeChat" @click="cancelBind()">
                    已绑定
                </view>
                <view v-else style="color: #999999;" @click="toBind()">
                    未绑定
                </view>
                <!-- 未绑定    已绑定 等加字段 -->
                <view class="two">
                    <image src="../../../static/back.png"></image>
                </view>
            </view>
        </view>


        <!-- <view class="hang" @click="gopush()">
            <view class="txt">消息推送设置</view>
            <view class="right">
                <view class="two">
                    <image src="../../static/back.png"></image>
                </view>
            </view>
        </view> -->
        <button class="butt" @click="quit()">退出登录</button>
        <view class="model" v-if="showModel" @click="cancel">
            <view class="model_con">
                <view class="sex" @click="getSex('男')">男</view>
                <view class="sex" @click="getSex('女')">女</view>
                <view class="line"></view>
                <view class="sex" @click="cancel()">取消</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                cdnUrl: '',
                baseUrl: '',
                showModel: false, //性别弹窗
                userinfo: [], //存储userinfo所有数据
                user: [], //存储data中的数据
                isWeChat: false,
            }
        },
        methods: {
            init() {
                let self = this
                if (self.$token()) {
                    self.request({
                        url: 'ShptUapi/public/index.php/UserConsumers/personal',
                        data: {
                            token: self.$token(),
                            device: self.$device()
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.data.success) {
                            self.userinfo = res.data.data.userinfo
                            if (self.userinfo.wechat_openid.length > 0) {
                                self.isWeChat = true
                            } else {
                                self.isWeChat = false
                            }
                            if (self.userinfo.photo.indexOf('https')) {
                                self.userinfo.photo = self.cdnUrl + self.userinfo.photo
                            }
                            if (self.userinfo.referrer != 0) {
                                // 正则表达式手机号隐藏中间4位
                                if (self.userinfo.referrer) {
                                    self.userinfo.referrer = self.userinfo.referrer.replace(
                                        /^(\d{3})\d{4}(\d+)/,
                                        '$1****$2');
                                }
                            } else {
                                self.userinfo.referrer = ''
                            }

                        }
                    }, rej => {
                        console.log(rej);
                    })
                }
            },
            // 修改头像
            getImg() {
                let self = this,
                    header = {
                        // "Content-Type": "multipart/form-data"
                    };
                console.log(self.baseUrl + 'ShptSapi/public/supplier.php/Upload/img')
                uni.chooseImage({
                    count: 1,
                    success: function(res) {
						uni.compressImage({
						  src: res.tempFilePaths[0],
						  quality: 80,
						  width:220,
						  height:220,
						  success: red => {
							  uni.uploadFile({
							      url: self.baseUrl + 'ShptSapi/public/supplier.php/Upload/img', //+url地址
							      filePath: red.tempFilePath,
							      name: 'file',
							      method: 'GET',
							  
							      formData: {
							  
							          module: 'head_portrait'
							      },
							      // header: header,
							      success: function(res) {
							          let string = JSON.parse(res.data)
							          console.log(string.data)
							  
							          let img_url = string.data
							          self.request({
							              url: 'ShptUapi/public/index.php/UserConsumers/user_edit',
							              data: {
							                  device: self.$device(),
							                  photo: img_url
							              },
							          }).then(res => {
							              console.log(res)
							              if (res.data.success) {
							  
							                  uni.showToast({
							                      title: res.data.msg,
							                      icon: 'none'
							                  })
							                  self.init()
							  
							              }
							          }, rej => {
							              console.log(rej);
							          })
							  
							  
							      },
							  })
						  }
						})

                    }
                })
            },
            // 修改名字
            getName(name) {
                uni.navigateTo({
                    url: 'getName?name=' + name
                })
            },
            // 修改手机号
            chPhone(e) {
                uni.navigateTo({
                    url: 'amendPhone?phone=' + e
                })
            },
            // 打开性别弹窗
            editSex() {
                this.showModel = true
            },
            // 上传性别
            getSex(e) {
                let self = this
                self.request({
                    url: 'ShptUapi/public/index.php/UserConsumers/user_edit',
                    data: {
                        device: self.$device(),
                        sex: e
                    },
                }).then(res => {
                    if (res.data.success) {

                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        self.init()
                        self.showModel = false
                    }
                }, rej => {
                    console.log(rej);
                })
            },
            // 弹窗取消按钮
            cancel() {
                this.showModel = false
            },
            // 取消绑定微信
            cancelBind() {
                let self = this;
                uni.showModal({
                    title: '是否取消绑定',
                    success(res) {
                        if (res.confirm) {
                            self.request({
                                url: 'ShptUapi/public/index.php/UserConsumers/unbundling_wechat',
                                data: {}
                            }).then(res => {
                                if (res.data.success) {
                                    self.isWeChat = false
                                 }
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            
                            })
                        }
                    }
                })
            },
            // 绑定微信
            toBind() {
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
                                                    nickName:data.nickName
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
                                data: {

                                    device: self.$device(),

                                },
                            }).then(res => {
                                uni.clearStorageSync('token');
                                if (res.data.success) {

                                    uni.showToast({
                                        title: '退出成功',
                                        icon: 'none'
                                    })
                                    // setTimeout(() => {
                                        // uni.navigateBack({
                                        // })
                                        uni.reLaunch({
                                            url: "../my"
                                        })
                                    // }, 1000)

                                }
                            })
                        }
                    }
                })
            },
        },
        onShow() {
            this.cdnUrl = this.$cdnUrl
            this.baseUrl = this.$baseUrl

            this.init()
        }
    }
</script>

<style>
    page {
        position: relative;
        /* padding-bottom: 100rpx; */
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

    .butt {
        width: 690rpx;
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
        bottom: 30rpx;
        left: 30rpx;
    }

    .model {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1;
    }

    .model .model_con {
        width: 690rpx;
        position: absolute;
        bottom: 30rpx;
        left: 50%;
        transform: translate(-50%);
        background-color: #F5F5F5;
        border-radius: 20rpx;
    }

    .model .model_con .sex {
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        font-size: 26rpx;
        color: #333333;
    }

    .model .model_con .line {
        width: 100%;
        height: 10rpx;
        background-color: #eee;
    }
</style>
