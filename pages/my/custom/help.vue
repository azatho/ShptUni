<template>
    <view class="">
        <view class="help_list" v-if='helpList.length!=0' v-for="(item,i) in helpList" :key="i" @click="goDetail(item)">
            <view class="help_list_top">
                {{item.title}}
            </view>
            <view class="help_list_foot">
                <view class="help_list_foot_left">
                    {{item.help_des}}
                </view>
                <view class="help_list_foot_right">
                    <!-- {{item.add_time}} -->
                    {{formatTime(item.add_time)}}
                </view>
            </view>
        </view>
        <view v-else style="text-align: center; width: 100%;">
            <image v-if="helpList.length==0" src="../../../static/datanull.png" class="imgsss"
                style="width: 344rpx;height: 300rpx; margin-top: 60%;"></image>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                helpList: [],
                showVideo: true,
                controls: false, //
                cdnUrl: ""
            }
        },
        methods: {
            init() {
                let self = this

                self.request({
                    url: 'ShptUapi/public/index.php/App/help',
                    data: {
                        page: self.page,
                        count: self.count,
                    }
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        // for (let i = 0; i < res.data.data.length; i++) {
                        //     res.data.data[i].add_time = formatTime(res.data.data[i].add_time * 1000)
                        // };
                        self.helpList = res.data.data

                    } else {
                        uni.showToast({
                            icon: 'none',
                            title: res.data.msg
                        })
                    }
                })
                
            },
            goDetail(item) {
                // helpApi.browsingHistory({
                //     id: item.id,
                //     type: "2"
                // }).then(res => {
                    console.log(item.help_content)
                // })
                if (item.type == 1) {
                    uni.navigateTo({
                        
                        url:"helpDetail?src=" + item.help_content
                        
                        // url: 'helpDetail?src=' + item.help_content,

                    })
                } else {
                    // this.request({
                    // 	url:'/public/index.php/Recommend/helpPv',
                    // 	data:{
                    // 		help_id:item.id
                    // 	},
                    // 	success:function(res){
                    // 		console.log(res)
                    // 	}
                    // })
                    uni.navigateTo({
                        url: './videoCommon?url=' + item.video_url + '&img=' + item.video_cover
                    })
                }
            }
        },
        onShow() {
            this.cdnUrl = this.$cdnUrl
            this.init()
        }
    }
</script>
<style>
    page {
        background-color: #FFFFFF;
    }
</style>
<style lang="scss">
    .help_list {
        background: #fff;
        border-bottom: 1px solid #f5f5f5;
        padding: 20px 10px;

        .help_list_top {
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(33, 33, 33, 1);
        }

        .help_list_foot {
            display: flex;
            justify-content: space-between;
            margin-top: 10rpx;
            font-size: 22rpx;
            font-family: PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
        }
    }

    .none {
        text-align: center;
        margin-top: 50rpx;
    }
</style>
