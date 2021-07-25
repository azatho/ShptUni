<template>
    <view class="imgbox">
        <view class="PresonsTitle">
            成功邀请人数:{{askPresons}}
        </view>
        <view class="aaa">
            <image class="one" src="../../../../static/inviteToRegister/lookAllAsk.png" mode=""></image>
            <view class="" style="height: 98%;position: relative;" v-if="userList.length>0">
                <view style="height: 40rpx;">
                </view>
                <view class="userCon">
					<scroll-view scroll-y="true" style="height:98%;" @scrolltolower="xialajiazai">
						<view class="userTitle">
						    <text>用户信息</text>
						    <text>用户级别</text>
						</view>
						<view class="userItem" v-for="(item,index) in userList" :key="index">
						    <view class="userItemLeft">
						        <view class="">
						            <image :src="$imgUrl(item.photo)" mode="" style="margin-right: 20rpx;"></image>
						        </view>
						        <view class="userInfo">
						            <text class="usetName">{{item.name}}</text>
						            <text>{{item.phone}}</text>
						        </view>
						    </view>
						    <text class="userItemRight" @click="getUser(index)">{{item.rank_name}}></text>
						</view>
					</scroll-view>
        
                </view>
            </view>
            <view v-if="userList.length==0" style="height: 98%;position: relative;left: 25%;top: 30%;">
                <!-- <img :src="cdnUrl+'XianxiangUapi/static/datanull.png'" alt="" style="width: 344rpx;height: 300rpx;z-index: 100;"> -->
                <image class="one" src="../../../../static/datanull.png"
                    style="width: 344rpx;height: 300rpx;z-index: 100;" mode=""></image>
            </view>
        </view>

       <view>
            <u-popup v-model="show" mode="center" :closeable="true" :mask="true" border-radius="20" width="500rpx"
                height="564rpx">
                <view class="information">成员信息</view>
                <view class="inforItem" style="display: flex;align-items: center;">
                    用户头像
                    <image class="inforItemimg" :src="getImg" mode="" style="border-radius: 50%;margin-left: 20rpx;">
                    </image>
                </view>
                <view class="inforItem">
                    用户昵称: {{oneUserInfor.name}}
                </view>
                <view class="inforItem">
                    等 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级: {{oneUserInfor.rank_name}}
                </view>
                <view class="inforItem">
                    手&nbsp;机&nbsp;号: {{oneUserInfor.phone}}
                </view>
                <view class="inforItem">
                    性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别: {{oneUserInfor.sex?oneUserInfor.sex:'无'}}
                </view>
                <view class="inforItem">
                    直接推荐: {{oneUserInfor.straight_num}}人
                </view>
                <view class="inforItem">
                    注册时间: {{time}}
                </view>
            </u-popup>
        </view>
    </view>
</template>


<script>
    export default {
        data() {
            return {
                cdnUrl: "",
                askPresons: 0,
                userList: [],
                show: false,
                oneUserInfor: {
                    name:"",
                    rank_name:"",
                    phone:"",
                    sex:"",
                    straight_num:"",
                },
                page: 1,
				pageIndex:1,
            }

        },
        onLoad(e) {
            this.cdnUrl = this.$cdnUrl
            this.askPresons = e.straight_num
			this.init();
        },
        computed: {
            getImg() {
                if (this.oneUserInfor) {
                    return this.$imgUrl(this.oneUserInfor.photo)
                }
                return ""
            },
            time() {
                if (this.oneUserInfor) {
                    return this.$time(this.oneUserInfor.regtime, 2)
                }
                return ""
            }
        },
        onPullDownRefresh() {
			this.userList=[],
			this.page=1;
			this.pageIndex=1;
            this.init();
        },
        methods: {
			xialajiazai(){
				console.log('到底了');
					if(this.page<this.pageIndex){
						this.page ++
						this.init();
					}
			},
            getUser(e) {
                this.oneUserInfor = this.userList[e]
                this.show = true
            },
            init() {
                let self = this;
            self.request({
                url: 'ShptUapi/public/index.php/UserInvite/invite',
                data: {
                    page: this.page,
					type:1,
					count:20,
                }
            }).then(res => {
                uni.stopPullDownRefresh();
                if (res.data.success) {
					self.pageIndex=res.data.data.total_page
                    this.userList.length>0?this.userList=[...this.userList,...res.data.data.list]:this.userList=res.data.data.list

                } else {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }
            })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .imgbox {
        width: 100%;
        height: 2024rpx;
        background: linear-gradient(0deg, #E9443F, #FD635E);
        padding: 27rpx;
        box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
        padding-bottom: 60rpx;

        .aaa {
            width: 100%;
            height: 98%;
            margin-top: 30rpx;
            position: relative;
        }

        .inforItemimg {
            width: 70rpx;
            height: 70rpx;
        }

        .information {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            text-align: center;
            color: #333333;
            line-height: 66rpx;
        }

        .inforItem {
            padding-left: 40rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 60rpx;
        }

        .PresonsTitle {
            font-size: 26rpx;
            height: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
        }

        .one {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            // border: 1px dashed #FFFFFF;
        }

        .userCon {
            padding: 67rpx 40rpx 67rpx 67rpx;
            padding-top: 27rpx;
            padding-bottom: 0;
            top: 40rpx;
            width: auto;
            height: calc(100% - 80rpx);
            // overflow: auto;

            .userTitle {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10rpx;
            }

            .userItem {
                display: flex;
                justify-content: space-between;
                align-content: center;
                border-bottom: 1px solid #F5F5F5;
                padding: 15rpx 0;

                .userItemLeft {
                    display: flex;
                    justify-content: space-between;

                    image {
                        width: 64rpx;
                        height: 64rpx;
                        border-radius: 50%;
                    }

                    .userInfo {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                    }

                    .userName {
                        font-size: 26rpx;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: #666666;
                    }

                    .userPhone {
                        font-size: 22rpx;
                        font-family: PingFang SC;
                        font-weight: 400;
                        color: #999999;
                    }
                }

                .userItemRight {
                    font-size: 26rpx;
                    line-height: 64rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #666666;
                }
            }
        }
    }
</style>
