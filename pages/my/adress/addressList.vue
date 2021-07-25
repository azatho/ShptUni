<template>
	<view>
		<view v-if="addressList.list.length>0" v-for="(item,index) in addressList.list" :key="index" class="userAdressInfo"
			@click="carryAndGo(item)">
			<view style="border-bottom: 2rpx solid #F5F5F5;">
				<view>
					<span>{{item.contacts}}</span>
					<span style="margin-left: 40rpx;">{{item.phone}}</span>
				</view>
				<view style="margin:30rpx 60rpx 30rpx 0">
					{{item.address}}
				</view>
			</view>
			<view class="selectCont">
				<viwe>
					<radio-group @change="radioChange($event,item)">
						<label class="radio" style="display: flex;align-items: center;">
							<radio color="#FF6351" :value="item.index"
								:checked='item.index==selectRadio?true:false' /><text
								style="margin-left: 15rpx;">默认地址</text>
						</label>
					</radio-group>

				</viwe>
				<view style="display: flex;color: #8F8F8F;">
					<view style="display: flex;align-items: center;" @click.stop="updataAdress(item)">
						<image src="../../../static/bj.png"  style="width: 36rpx;height: 36rpx;" mode=""></image>
						<span class="icontxt">编辑</span>
					</view>
					<view style="margin-left: 50rpx;display: flex;align-items: center;" @click.stop="delAdress(item)">
						<image src="../../../static/del1.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
						<span class="icontxt">删除</span>
					</view>
				</view>
			</view>
		</view>
		<view style="text-align: center;" v-if='addressList.list.length==0'>
			<img :src="$cdnUrl+'/ShptUapi/static/noaddress.png'" alt="" class="noData">
		</view>
		<view style="height: 150rpx;"></view>
		<view>
			<view class="sureBind" @click="$u.throttle(confirm,1000)">
				新增收货地址
			</view>
		</view>
	</view>
</template>

<script>
    export default {
        data() {
            return {
                addressList: {
                    list: []
                },
                selectRadio: "",
                adressInfo: {},
                oldPage: 0,
                pageIndex: 1,
                conunt: 20,
                oldIndex: "", //传过来的现在选择的地址ID
            }
        },
        onShow() {
            this.pageIndex = 1
            this.addressList.list = []
            this.getAdressList(0);
        },
        onLoad(options) {
            if (options.type) {
                this.oldPage = options.type
                this.oldIndex = options.addressIndex
            }
        },
        onReachBottom() {
            if (this.pageIndex < this.addressList.page) {
                ++this.pageIndex;
                this.getAdressList(0)
            }
        },
        onPullDownRefresh() {
            console.log('refresh');

            this.pageIndex = 1
            this.addressList.list = []
            this.getAdressList(0);

        },
        methods: {
            // 点击跳转详情
            carryAndGo(e) {
                if (this.oldPage == 1) {
                    uni.setStorageSync('addressList', e)
                    uni.navigateBack({
                        delta: 1
                    })
                }
            },
            // 默认地址radio选中修改
            radioChange: function(evt, e) {
                let self = this
                self.adressInfo = e
                self.selectRadio = evt.detail.value
                self.request({
                    url: "ShptUapi/public/index.php/Address/editDefault",
                    data: {
                        index: self.adressInfo.index,
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        uni.showToast({
                            title: "设置成功",
                            icon: 'none'
                        })
                        self.getAdressList(1)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 获取收货地址列表
            getAdressList(e) {
                this.request({
                    url: "ShptUapi/public/index.php/Address/addressList",
                    data: {
                        page: this.pageIndex,
                        limit: this.conunt,
                    },
                }).then(res => {
                    uni.stopPullDownRefresh();
                    if (res.data.success) {
                        if (this.addressList.list.length > 0 && e == 0) {
                            this.addressList.list = [...this.addressList.list, ...res.data.data.list]
                        } else {
                            this.addressList = res.data.data
                        }
                        for (var a of this.addressList.list) {
                            if (a.default_address) {
                                this.selectRadio = a.index
                                break
                            }
                        }
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
            // 新增地址按钮函数
            confirm() {
                uni.navigateTo({
                    url: "addAddress?type=" + 0
                })
            },
            // 修改地址
            updataAdress(e) {
                uni.navigateTo({
                    url: "addAddress?type=" + 1 + "&item=" + JSON.stringify(e)
                })
            },
            // 删除地址
            delAdress(e) {
                if (e.index == this.oldIndex) {
                    uni.removeStorageSync('addressList')
                }
                let self = this
                self.request({
                    url: "ShptUapi/public/index.php/Address/deleteAddress",
                    data: {
                        index: e.index
                    },
                }).then(res => {
                    if (res.data.success) {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                        self.getAdressList(1)
                    } else {
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        })
                    }
                })
            },
        }
    }
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
<style scoped>
	.selectCont {
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		margin-right: 60rpx;
		line-height: 90rpx;
		color: #8F8F8F;
		font-size: 26rpx;
	}

	.icontxt {
		margin-left: 10rpx;
		font-size: 26rpx;
	}

	.iconfont {
		font-size: 36rpx;
	}

	.userAdressInfo {
		margin-top: 20rpx;
		width: 100%;
		/* height: 250rpx; */
		background-color: #FFFFFF;
		padding: 30rpx 30rpx 0;
	}

	.noData {
		width: 445rpx;
		height: 435rpx;
		margin-top: 193rpx;
	}

	.sureBind {
		width: 690rpx;
		height: 90rpx;
		background: #FF6351;
		border-radius: 45rpx;
		margin: 50rpx 30rpx 0;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
		position: fixed;
		bottom: 33rpx;
	}
</style>
