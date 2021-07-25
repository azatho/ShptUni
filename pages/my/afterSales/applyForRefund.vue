<template>
    <!-- 申请退款 -->
    <view>
        <view class="box">
            <view class="imginfo">
                <image :src="$cdnUrl+info.sku_pic" mode=""></image>
            </view>
            <view class="textInfo">
                <text class="titleInfo">
                    {{info.goods_name}}
                </text>
                <view class="numInfo">
                    <text class="price">￥{{$returnFloat(info.goods_price)}}</text>
                    <text class="num">x{{info.goods_count}}</text>
                </view>
            </view>
        </view>
        <!-- // -->

        <view class="returnList">
            <view class="item">
                <view class="infomation">
                    <view class="content">
                        请编辑数量
                    </view>
                </view>
                <view class="count" style="margin-right: 30rpx;">
                    <u-number-box v-model="refoundNum" :min="1" :max='info.goods_count'></u-number-box>
                </view>
            </view>
        </view>
        <view class="returnList">
            <view class="item" @click="reasonShow=true">
                <view class="infomation">
                    <view class="content" v-if="type==0">
                        请选择退款原因
                    </view>
                    <view class="content" v-else>
                        请选择换货原因
                    </view>
                </view>
                <view class="infomation">
                    <view class="content" style="text-align: right;">{{reasonText}}</view>
                </view>
                <view class="go">
                    <!-- > -->
                    <image src="../../../static/back.png" style="width: 16rpx;height: 32rpx;margin-left: 20rpx;"
                        mode=""></image>
                </view>
                <u-picker v-model="reasonShow" mode="selector" :default-selector="[0]" :range="reasonList"
                    range-key="content" @confirm="sureReason"></u-picker>
            </view>
            <view>
            </view>
        </view>
        <!-- 问题描述 -->
        <view class="describe">
            <view class="descirbeTitle">
                问题描述
            </view>
            <view class="describeConent">
                <textarea v-model="service_content" maxlength="300" placeholder="请您进行问题描述" />
            </view>
        </view>

        <!-- //上传图片 -->
        <view class="addimg">
            <view v-for="(item,i) in imgs" :key="i" style="display: inline-block;position: relative;">
                <image :src="$cdnUrl+item" style="width: 120rpx;height: 120rpx;margin: 0 19rpx 20rpx 0;"></image>
                <image src="../../../static/caca.png" class="cha" @click="del(i)"></image>
            </view>
            <image src="../../../static/addtp.png" @click="addImg" v-if="imgs.length<5"></image>
            <view style="font-size: 24rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">(最多5张)</view>
        </view>
        <!-- //提交按钮 -->
        <view class="btn">
            <button type="default" @click="submit">提交申请</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                service_content: "", //问题描述
                refoundNum: 1, //售后数量
                reasonShow: false, // 原因选择器
                index: 0, //原因列表索引
                info: {
                    goods_count: 1
                }, //售后商品信息
                type: "", //售后类型
                reasonList: [], //售后原因
                reasonText: "", //选择的售后原因文字
                reasonCode: "", //选择的售后code
                imgs: [], //售后上传的图片
            }
        },
        onLoad(option) {
            this.type = option.type
            console.log(this.type)
            if (option.info) this.info = JSON.parse(option.info)
            if (this.type == 0) {
                uni.setNavigationBarTitle({
                    title: '申请退款'
                })
            } else {
                uni.setNavigationBarTitle({
                    title: '申请换货'
                })
            }
        },
        onShow() {
            this.getReason()
        },
        methods: {
            // 提交售后申请
            submit() {
                let self = this;
                console.log(self.type)
                self.request({
                    url: 'ShptUapi/public/index.php/Service/serviceOrder',
                    data: {
                        order_goods_index: self.info.order_goods_index,
                        service_type: self.type,
                        service_goods_count: self.refoundNum,
                        service_content: self.service_content,
                        service_images: self.imgs,
                        reason: self.reasonText,
                    }
                }).then(res => {
                    if (res.data.success) {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        let pagetype = 0;
                        if (self.type == 0) pagetype = 1
                        setTimeout(function() {
                            uni.navigateTo({
                                url: 'salesList?type=' + pagetype
                            })
                        }, 1000)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 确定售后原因
            sureReason(e) {
                this.index = e[0];
                this.reasonText = this.reasonList[this.index].content;
                this.reasonCode = this.reasonList[this.index].code;
            },
            // 获取售后原因
            getReason() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/Service/serviceReasonList',
                    data: {
                        type: self.type
                    }
                }).then(res => {
                    if (res.data.success) {
                        self.reasonList = res.data.data
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 添加图片
            addImg() {
                let self = this,
                    header = {
                        // 'Content-Type': 'multipart/form-data'
                    };
                uni.chooseImage({
                    count: 1,
                    success: function(res) {
                        uni.showLoading({
                            title: '加载中'
                        })
                        uni.uploadFile({
                            url: self.$baseUrl + 'ShptSapi/public/supplier.php/Upload/img',
                            filePath: res.tempFilePaths.join(','),
                            name: 'file',
                            formData: {
                                token: uni.getStorageSync('token'),
                                device: '0'
                            },
                            // header: header,
                            success: function(res) {
                                uni.hideLoading()
                                let data = JSON.parse(res.data);
                                if (data.code == 0) {
                                    uni.showToast({
                                        title: '上传成功'
                                    });
                                    if (self.imgs.length <= 4) {
                                        self.imgs.push(data.data);
                                    } else {
                                        uni.showToast({
                                            icon: 'none',
                                            title: '最多上传5张图片'
                                        });
                                    }
                                } else {
                                    uni.showToast({
                                        icon: 'none',
                                        title: '上传失败，请重试~'
                                    });
                                }
                            }
                        });
                    }
                });
            },
            // 删除图片
            del(e) {
                for (var i = 0; i < this.imgs.length; i++) {
                    if (i == e) {
                        this.imgs.splice(i, 1)
                    }
                }
            },
        },
    };
</script>
<style lang="scss">
    .box {
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;
        display: flex;
        border-bottom: 20rpx solid #F5F5F5;
        ;

        .imginfo {
            width: 160rpx;
            height: 160rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .textInfo {
            flex: 1;
            box-sizing: border-box;
            padding-left: 20rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .titleInfo {
                font-size: 26rpx;
                height: 68rpx;
                font-family: PingFang SC;
                font-weight: 600;
                color: #333333;
                overflow: hidden;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }

            .numInfo {
                margin: 10rpx 0 6rpx;
                display: flex;
                justify-content: space-between;
                font-size: 30rpx;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;

                .price {
                    color: #FF3636;
                }

                .mun {
                    color: #999999
                }
            }
        }
    }

    .returnList {
        height: 130rpx;
        background-color: white;
        padding: 0rpx 0 0 25rpx;
        box-sizing: border-box;
        margin-bottom: 2rpx;

        .item {
            width: 100%;
            border-bottom: 1px solid #F5F5F5;
            display: flex;
            justify-content: space-between;

            .infomation {
                flex: 1;
                font-size: 26rpx;
                font-family: PingFang SC;

                .content {
                    width: 100%;
                    height: 130rpx;
                    line-height: 130rpx;
                    font-family: PingFang SC;
                    // font-weight: 600;
                    color: #333333;
                }
            }

            .go {
                padding-right: 30rpx;
                text-align: center;
                height: 130rpx;
                font-size: 40rpx;
                color: #CCCCCC;
                line-height: 130rpx;
            }

            .count {
                width: 200rpx;
                text-align: content;
                padding-top: 40rpx;
                box-sizing: border-box;

                .set {
                    border: 1px solid #CCCCCC;
                    font-size: 30rpx;
                    font-family: PingFang SC;
                    font-weight: 600;
                    color: #333333;
                    width: 50rpx;
                    height: 50rpx;
                    line-height: 50rpx;
                    display: inline-block;
                    text-align: center;
                }

                .one {
                    border-top-left-radius: 5px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 5px;
                }

                .tow {
                    border-top-left-radius: 0px;
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 0px;
                }

                .num {
                    height: 50rpx;
                    line-height: 50rpx;
                    padding: 0 30rpx;
                    font-size: 26rpx;
                    border-top: 1px solid #CCCCCC;
                    border-bottom: 1px solid #CCCCCC;
                    display: inline-block;
                    text-align: center;
                }
            }
        }
    }

    // 问题描述
    .describe {
        padding: 30rpx;
        box-sizing: border-box;

        .descirbeTitle {
            font-size: 30rpx;
            font-family: PingFang SC;
            font-weight: 600;
            color: #000000;
            margin-bottom: 30rpx;
        }

        .describeConent {
            textarea {
                width: 100%;
                background-color: #F5F5F5;
                padding: 20rpx;
                border-radius: 10rpx;
                box-sizing: border-box;
            }
        }
    }

    //上传 图片
    // 图片
    .addimg {
        padding: 30rpx;

        image {
            width: 120rpx;
            height: 120rpx;
            margin-bottom: 20rpx;
        }

        .cha {
            width: 40rpx;
            height: 40rpx;
            position: absolute;
            top: -20rpx;
            right: 0rpx;
        }
    }

    // 提交按钮
    .btn {
        position: fixed;
        bottom: 40rpx;
        left: 0;
        width: 100%;
        height: 80rpx;
        z-index: 10000;

        button {
            border-radius: 18px;
            width: 90%;
            color: #fff;
            background-color: #26AD70;
        }
    }
</style>
