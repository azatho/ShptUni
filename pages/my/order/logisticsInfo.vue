<template>
	<view class="box">
		<!-- 纵向排列 -->
		<view class="title" v-if="type">
			<u-tabs name="cate_name" :gutter="80" :list="titleList" active-color="#FD635E" :is-scroll="true"
				:current="current" @change="change"></u-tabs>
		</view>
		<view class="banner" v-if="isShow==false">
			<view class="title1">
				<view class="text">
					{{dataTxt.txt1}}{{obj.order_id?obj.order_id:""}}
				</view>
				<view class="text">
					{{dataTxt.txt2}}{{obj.result.expName?obj.result.expName:""}}
				</view>
				<view class="text">
					{{dataTxt.txt3}}{{obj.order_contacts?obj.order_contacts:""}}
				</view>
				<view class="text">
					{{dataTxt.txt4}}{{obj.order_phone?obj.order_phone:""}}
				</view>
			</view>
		</view>
		<view class="content" v-if="isShow==false">
			<steps active-color="#FD635E" :options="textLsit" direction="column" :active="0"></steps>
		</view>
		<image src="../../../static/datanull.png" class="img" v-if="isShow"></image>

	</view>
</template>

<script>
	import steps from "../../../components/uni-steps/uni-steps.vue"
	export default {
		data() {
			return {
				
				type: 0,
				dataTxt: {
					txt1: "",
					txt2: "",
					txt3: "",
					txt4: ""
				}, //文字
				titleList: [

				],
				order_index: "",
				current: 0,
				obj: {
					result: {
						expName: ""
					}
				},
				info:'',//物流信息
				textLsit: [],
				isShow: false
			};
		},
		components: {
			steps
		},
		onLoad(e) {
			if (e.type) this.type = e.type
			this.order_index = e.order_index
			this.init()
		},
		methods: {
			// 请求售后物流信息
			init() {
				let self = this;
				let url = "";
				let data = {};
				self.type == 0 ? url = 'ShptUapi/public/index.php/Service/searchExpress' : url =
					'ShptUapi/public/index.php/Order/searchExpress'
				self.type == 0 ? data = {
					barter_index: self.order_index
				} : data = {
					order_index: self.order_index
				}
				self.request({
					url: url,
					data: data
				}).then(res => {
					if (res.data.success) {
						self.info=res.data.data
						if(res.data.data.list.length==0){
							self.isShow=true;
						}else{
							self.titleList = res.data.data.list.map(item => {
								return {
									cate_name: item.cate_name
								}
							})
							self.dataTxt = {
								txt1: "订单编号：",
								txt2: "国内承运人：",
								txt3: "买家姓名：",
								txt4: "买家电话：",
							}
							self.obj = res.data.data.list[0];
							self.textLsit = self.obj.result.list.map(el => {
								return {
									title: el.status,
									desc: el.time
								}
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
			change(index) {
				let self = this
				self.current=index
				self.obj = self.info.list[index];
				self.textLsit = self.obj.result.list.map(el => {
					return {
						title: el.status,
						desc: el.time
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		overflow: hidden;

		.title {
			width: 100%;
			height: 72rpx;
			border-top: 1px solid #F5F5F5;
			// border-bottom: 2px solid #999999;
		}

		.banner {
			height: 170rpx;
			width: 100%;
			padding: 30rpx;

			// margin-top: 30rpx;
			.title1 {
				margin-top: 20rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;

				.text {
					margin-bottom: 20rpx;
				}
			}
		}

		.content {
			padding :0 30rpx;
			padding-right: 20rpx;
			padding-top: 30rpx;
			margin-top: 60rpx;
			// width: 100%;
		}

		.img {
			width: 396rpx;
			height: 343rpx;
			margin-left: 177rpx;
			margin-top: 340rpx;
		}
	}
</style>
