<template>
	<!-- 售后列表 -->
	<view>
		<u-navbar :is-back="false" title="售后列表" :title-bold='true'>
			<image src="../../../static/backarrow.png" style="width: 17rpx;height: 32rpx;margin-left: 30rpx;" mode="" @click="back"></image>
		</u-navbar>
		<!-- 头部导航 -->
		<view class="listMethods">
			<view :class="navSel==index?'action':''" v-for="(item,index) in title" :key="index" @click="changeNav(index)">
				{{item}}
			</view>
		</view>
        <view  v-if="salesList.length!=0">
            <view class="ItemList" v-for="(item,index) in salesList" :key='index' >
            	<!-- 信息编号 -->
            	<view class="titleserial">
            		<view class="serial">
            			售后编号 : {{item.service_order}}
            		</view>
            		<view :class="item.text=='审核拒绝'?'error':'success'  ">
            			{{item.text}}
            		</view>
            	</view>
            	<view class="box" >
            		<view class="imginfo">
            			<image :src="$cdnUrl+item.image" mode=""></image>
            		</view>
            		<view class="textInfo" style="display: flex;justify-content: space-between;flex-direction: column;">
            			<text class="titleInfo">
            				{{item.goods_name}}
            			</text>
            			<view class="numInfo">
            				<!-- <text>{{item.goods_intro}}</text> -->
            				<text>x {{item.goods_count}}</text>
            			</view>
            			<text class="price" >￥{{$returnFloat(item.total_price)}}</text>
            		</view>
            	</view>
            	<!-- 售后详情 -->
            	<view class="information">
            		<view class="detaiBtn" style="font-size: 26rpx;" @click="salesInfo(item)">
            			售后详情
            		</view>
            	</view>
            </view>
        </view>
		
        
        <view v-else style="text-align: center; margin-top: 200rpx;">
        	<image src="../../../static/datanull.png" style="width: 344rpx;height: 300rpx; margin-top: 50%;"></image>
        </view>
        
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPage:0,//判断上个页面
				navSel:0,//选中的标题头
				title:['换货','退货'],//标题数据
				page:1,//当前页数（默认为一）
				count:10,//一页多少条
				pageIndex:1,//最大页数
				salesList:'',//售后列表信息
			}
		},
		onLoad(option) {
			if (option.type)this.navSel=option.type
			if (option.page)this.oldPage=option.page
			this.init()
		},
		onShow() {},
		onReachBottom() {
			if (this.page<this.pageIndex){
				this.page++;
				this.init()
			}
		},     
		methods: {
			back(){
				let a=3
				this.oldPage==1?a=1:''
				uni.navigateBack({
					delta:a
				})
			},
			// 售后详情页面
			salesInfo(e){
				console.log(e)
				if (this.navSel==0){
					uni.navigateTo({
						url:'exchangeDetails?id='+e.service_id
					})
				}else{
					uni.navigateTo({
						url:'salesInfo?id='+e.service_id
					})
				}
			},
			// 切换标题头
			changeNav(e){
				this.navSel=e
				this.salesList=[];
				this.page=1;
				this.pageIndex=1;
				this.init()
			},
			// 获取售后列表信息
			init(){
				let self = this;
				let type=0;
				if(self.navSel==0)type=1
				self.request({
					url:'ShptUapi/public/index.php/Service/serviceOrderList',
					data:{
						type:type,
						page:self.page,
						count:self.count,
					}
				}).then(res => {
				if (res.data.success) {
					self.pageIndex=res.data.data.toatal_page
					self.salesList.length>0?self.salesList=[...self.salesList,...res.data.data.list]:self.salesList=res.data.data.list
                    
                    console.log(self.salesList)
					} else {
						uni.showToast({
						title: res.data.msg,
						icon: 'none'
						})
					}
				})
			},
		},
	};
</script>
<style lang="scss">
	// <!-- 头部导航 -->
	.listMethods {
		height: 90rpx;
		line-height: 70rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-evenly;
		align-content: center;
		border-bottom: 20rpx solid #F7F7F7;

		.action {
			font-family: FZLanTingHei-EB-GBK;
			font-weight: 600;
			color: #05B882;
			font-size: 30rpx;
			border-bottom: 2px solid #05B882;
		}
	}

	.ItemList {
		border-bottom: 20rpx solid #F5F5F5;

		.titleserial {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 20rpx 0;

			.serial {
				font-size: 26rpx;
				font-family: Hiragino Sans GB;
				font-weight: 600;
				color: #222222;
			}

			.error {
                font-size: 26rpx;
				color: #EF1D22;
			}

			.success {
                font-size: 26rpx;
				color: #05B882;
			}

		}

		.box {
			width: 100%;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			border-bottom: 1px solid #F5F5F5;
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
				
				.titleInfo {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
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
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
				}

				.price {
					font-size: 36rpx;
					font-family: Rubik;
					font-weight: 600;
					color: #222222;
				}
			}
		}


		.information {
			height: 80rpx;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			padding: 0 20rpx;
			box-sizing: border-box;

			.detaiBtn {
				padding: 0 28rpx;
				border-radius: 28rpx;
				border: 1px solid #05B882;
				height: 54rpx;
				line-height: 50rpx;
				color: #05B882;
				box-sizing: border-box;
			}
		}
	}
</style>
