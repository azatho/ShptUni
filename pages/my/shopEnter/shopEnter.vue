<!-- 商户入驻 -->
<template>
	<view v-if="displys">
		<!-- 自定义导航栏 -->
        <u-navbar :title="nav_title" title-color="#000000"></u-navbar>
        <!-- 页面内容 -->
		<view class="bgcImg" v-if="rank==1">
			<view class="bgc2">
				<image src="../../../static/BussinessIn.png"></image>
			</view>
			<view class="bgc3">
				<view class="bgc4">
					<view class="yuan"></view>手机端入驻流程<view class="yuan"></view>
				</view>
				<view class="one">
					<view class="left">01</view>
					<view class="right">
						<view>入驻前请先阅读开店须知，确认自己符合个人开店的相关规定</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">02</view>
					<view class="right">
						<view>填写相关店铺、法人证件资料等信息，提交审核</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">03</view>
					<view class="right">
						<view>我们将会在1-5个工作日内完成审核并通知您。</view>
					</view>
				</view>
			</view>
			<view class="bgc3">
				<view class="bgc4">
					<view class="yuan"></view>电脑端入驻流程<view class="yuan"></view>
				</view>
				<view class="one">
					<view class="left">01</view>
					<view class="right">
						<view>打开网址</view>
						<view style="word-break:break-all">{{wangzhi}}
							<image src="../../../static/enter6.png" class="img1" @click="fz(wangzhi)"></image>
						</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">02</view>
					<view class="right">
						<view>点击“商家入驻”，进行手机号验证</view>
					</view>
				</view>
				<view class="img2">
					<image src="../../../static/enter5.png"></image>
				</view>
				<view class="one">
					<view class="left">03</view>
					<view class="right">
						<view>根据提示信息填写商家的资料，填写后请等待1-5个工作日平台审核</view>
					</view>
				</view>
			</view>
			<view class="bgc5">
				<view class="bgc4">
					<view class="yuan"></view>供货商入驻须知<view class="yuan"></view>
				</view>
				<view class="text">
					<view>1.我没有实体店，可以开店吗？</view>
					<view>答：不可以，入驻此平台前，需要有线下实体店铺。</view>
					<view>2.我在平台已经开了个店了，我用别人的身份证再开一个店可以吗？</view>
					<view>答：不可以。未经平台同意，将本人账号提供给他人作开店使用，否则由此导致相关争议、诉讼及因店铺经营中的违法违规行为导致一切人身、财产权益损害，均由本人自行承担全部民事、行政及刑事责任。
					</view>
					<view>3.我可以把店铺转租给其他人吗?</view>
					<view>答：不可以。未经平台同意，将本人账号提供给他人作开店使用，否则由此导致相关争议、诉讼及因店铺经营中的违法违规行为导致一切人身、财产权益损害，均由本人自行承担全部民事、行政及刑事责任。
					</view>
					<view>4.我可以开多个店吗?</view>
					<view>答：不可以。一张身份证（一张营业执照）只能开一个店铺。开店后请保持营业执照存续状态，不得注销；如若发现营业执照被注销、吊销，平台将会对店铺做出永久关闭的处置。</view>
					<view>5.我已经开过店，现在想要注销原来的店铺重新开店，可以吗?</view>
					<view>答：不可以，平台暂时不提供注销店铺的服务。用户一但成功开店就无法再用身份证（营业执照）另开一家店铺。</view>
				</view>
			</view>
			<view class="btn" @click="getenter()">
				<image src="../../../static/btn1.png"></image>
			</view>
		</view>
		<view class="audit" v-if="rank==2">
			<!-- 审核参考applyposition.vue页面 -->
			<view v-if="shopEnterInfo.supplier_status==1||shopEnterInfo.supplier_status==3">
				<!-- steps步骤条  纵向排列-->
				<uni-steps activeColor='#333333' :options="options" direction="column" :active="0" v-if="shopEnterInfo.supplier_status==1">
				</uni-steps>
				<view v-if="shopEnterInfo.supplier_status==3">
					<uni-steps :options="options1" direction="column" :active="2"></uni-steps>
					<view class="txt">失败原因：{{shopEnterInfo.refuse_reason}}<text @click="resubmit()">重新提交</text></view>
				</view>
			</view>
			<view style="position: fixed;bottom: 30rpx;width: 100%;text-align: center;font-size: 26rpx;color: #999999;">审核时间为1-5个工作日，如有疑问请联系客服</view>
		</view>
		<!-- 手机号弹窗提示 禁用==>在接口中调用方法-->
		<view class="beijing" v-if="incomes">
			<view class="tanchuang">
				<view class="title">提示</view>
				<view class="character">
					<view>尚未绑定手机号，请先绑定</view>
				</view>
				<view class="know">
					<view class="one" style="border-right: 2px solid #F5F5F5;color: #999999;" @click="getcancel()">取消
					</view>
					<view class="one" @click="openincome()">去绑定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
                nav_title:"",
				shopEnterInfo:{
					supplier_status:','
				},//店铺入驻信息
				cdnUrl: '',
				baseUrl: '',
				displys: false,
				isAddGoods: false,
				wangzhi: 'https://app.jianyunkeji.cn/ShptShopControl/start/#/user/login',
				wangzhi1: 'https://app.jianyunkeji.cn/ShptShopControl/start/#/user/login',
				phone: '', //存储userinfo所有数据
				incomes: false, //手机弹窗
				rank: 1,
				applyInfo: {
					apply_status: 1
				}, //返现接口存放的数据集合
				// 审核进度变量
				options: [{
					title: '信息提交成功,等待审核',
					desc: '2019-04-19 17:27'
				}, ], //格式源
				options1: [{
						title: '信息提交成功,等待审核',
						desc: '2019-04-19 17:27'
					},
					{
						title: '信息审核失败',
						desc: '2019-04-19 17:27'
					},
				],
				active: '0', //当前步骤
				state: '0', //切换审核进度是否成功
				SupplierCenter: {
					today_money:'0',
					month_money:'0',
					all_money:'0',
					cash:'0',
					virtual_cash:'0',
					supplier_score:"0",
				},
				business: true, //营业中
				status: '',
			}
		},
		methods: {
			//进货记录
			jinhuojilu() {
				uni.navigateTo({
					url: './addproduct/jinhuojilu'
				})
			},
			//添加商品
			addprouct() {
				this.isAddGoods = true;
			},
			// 返回上一页
			black() {
				uni.switchTab({
					url: '../my'
				})
			},
			// 个人资料
			urser() {
				let self = this
	/* 			if (uni.getStorageSync('token')) {
					self.request({
						url: 'ugo/api/mall.php?c=getUserInfo',
						data: {
							token: uni.getStorageSync('token')
						}
					}).then(res => {
						if (res.data.success) {
							self.phone = res.data.data.phone
						}
					}, rej => {
						console.log(rej);
					})
				} */
			},
			// 审核
			getSupplierStatus() {
				let self = this
				if (uni.getStorageSync('token')) {
					self.request({
						url: 'ShptUapi/public/index.php/UserSupplier/getSupplier',
						data: {
						}
					}).then(res => {
						if (res.data.success) {
							self.shopEnterInfo=res.data.data
							if(self.shopEnterInfo.length==0){
								// uni.setNavigationBarTitle({
								// 	title:'商户入驻'
								// })
								self.rank=1;
                                
                                self.nav_title = '商户入驻'
								self.displys=true
							}else{
								// uni.setNavigationBarTitle({
								// 	title:'审核进度'
								// })
								self.rank=2;
                                self.nav_title = '审核进度'
								self.displys=true
								if(self.shopEnterInfo.supplier_status==1){
									self.options[0].desc=self.formatTime(self.shopEnterInfo.submit_time)
									console.log(self.options[0].desc)
								}
								if(self.shopEnterInfo.supplier_status==3){
									self.options1[0].desc=self.formatTime(self.shopEnterInfo.submit_time)
									self.options1[1].desc=self.formatTime(self.shopEnterInfo.audit_time)
								}
							}

							}
					}, rej => {
						console.log(rej);
					})
				}
			},
			// 复制
			fz(id) {
				let self = this
				uni.setClipboardData({
					data: id,
					success: function(data) {
						uni.getClipboardData({
							success: function(data) {
								uni.showToast({
									icon: 'none',
									title: '复制成功~'
								})
							},
							fail: function(err) {},
							complete: function(res) {}
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
			},
			// 入驻按钮
			getenter() {
					uni.navigateTo({
						url: './commercialenter'
					});
			},
			// 重新提交文字==>变回到门店申请页面
			resubmit() {
				uni.navigateTo({
					url: './commercialenter?status=1'
				})
			},
			fzs(id) {
				let self = this
				uni.setClipboardData({
					data: id,
					success: function(data) {
						uni.getClipboardData({
							success: function(data) {
								self.holo.toast({
									icon: 'none',
									title: '复制成功~'
								})
							},
							fail: function(err) {},
							complete: function(res) {}
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
			},
			cancel() {
				this.isAddGoods = false;
			}
		},
		onShow() {
			this.cdnUrl = this.$cdnUrl
			this.baseUrl = this.$baseUrl
			this.getSupplierStatus()
			// this.urser()
		},
		onLoad(options) {
		},
	}
</script>

<style scoped lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	page image {
		width: 100%;
		height: 100%;
	}

	.flexd {
		position: fixed;
		left: 0;
		top: 0;
		width: 749rpx;
		height: 88rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.16);
		line-height: 88rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		font-family: PingFang SC;
		z-index: 111111;
	}

	.flexd .left {
		width: 17rpx;
		height: 32rpx;
		position: absolute;
		top: 6rpx;
		left: 30rpx;
	}

	.flexd .center {
		font-size: 32rpx;
		font-weight: 700;
		color: #333333;
	}

	.bgcImg {
		// margin-top: 88rpx;
	}

	.audit {
		padding-top: 88rpx;
	}

	.adminsistration {
		margin-top: 88rpx;
	}

	/* 审核进度 */
	.txt {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		margin: -5rpx 50rpx;
		color: #999999;
	}

	.txt text {
		color: #FC4950;
		margin-left: 20rpx;
	}

	/* 申请页面布局 */
	.bgcImg {
		background-image: url(../../../static/enter1.png);
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
		padding-bottom: 150rpx;
	}

	.bgcImg image {
		width: 100%;
		height: 100%;
	}

	.bgc2 {
		width: 749rpx;
		height: 491rpx;
	}

	.bgc4 {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #EC2215;
		margin-top: -10rpx;
	}

	.bgc4 .yuan {
		display: inline-block;
		width: 7rpx;
		height: 7rpx;
		border-radius: 50%;
		background-color: #EC2215;
		margin: 10rpx;
	}

	.bgc3 {
		width: 750rpx;
		height: 630rpx;
		background-image: url(../../../static/enter3.png);
		background-size: 100% 100%;
		padding: 50rpx 100rpx;
		box-sizing: border-box;
	}

	.bgc3 .img1 {
		width: 28rpx;
		height: 28rpx;
		vertical-align: middle;
		margin-left: 15rpx;
	}

	.bgc3 .one {
		display: flex;
		align-items: center;
		font-family: PingFang SC;
		margin-top: 30rpx;
	}

	.bgc3 .one .left {
		width: 69rpx;
		height: 69rpx;
		background: #FD6C65;
		border-radius: 50%;
		text-align: center;
		line-height: 69rpx;
		font-size: 30rpx;
		font-weight: 800;
		color: #FFFFFF;
	}

	.bgc3 .one .right {
		margin-left: 30rpx;
		font-size: 26rpx;
		font-weight: 500;
		color: #333333;
		flex: 1;
	}

	.bgc3 .img2 {
		width: 22rpx;
		height: 47rpx;
		margin: 20rpx 20rpx 30rpx;
	}

	.bgc5 {
		width: 750rpx;
		background-image: url(../../../static/enter7.png);
		background-size: 100% 100%;
		padding: 50rpx 100rpx;
		box-sizing: border-box;
	}

	.bgc5 .text {
		padding: 30rpx 0;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
	}

	.bgc5 .text view {
		margin-bottom: 5rpx;
	}

	.btn {
		background-color: #f85147;
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		width: 750rpx;
		height: 120rpx;
	}

	.orderBox {
		background-color: #fff;
		padding: 30rpx;
		margin-top: 20rpx;

		.orderBoxTitle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #F5F5F5;
			padding: 10rpx 0;

			view:nth-child(1) {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
			}

			view:nth-child(2) {
				font-size: 24rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #999999;
			}
		}

		.orderBoxBottom {
			display: flex;
			justify-content: space-between;
			padding: 10rpx 0;
		}
	}

	/* 手机号弹窗 */
	.beijing {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);
	}

	.beijing .tanchuang {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		height: 320rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 30rpx;
		padding-bottom: 0;
		box-sizing: border-box;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.beijing .tanchuang .title {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: center;
		margin-bottom: 40rpx;
	}

	.beijing .tanchuang .character view {
		text-align: center;
	}

	.beijing .tanchuang .know {
		position: absolute;
		bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #F93A2D;
		border-top: 2px solid #F5F5F5;
		width: 440rpx;
		padding-top: 30rpx;
	}

	.beijing .tanchuang .know .one {
		width: 200rpx;
		height: 50rpx;
		text-align: center;
	}

	/* 管理中心 */
	.adminsistration {
		background-color: #F5F5F5;
		height: 100%;
		width: 100%;
	}

	.adminsistration .shopadmin {
		width: 100%;
		height: 180rpx;
		background: #FFFFFF;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.shopadmin .img1 image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 6rpx;
	}

	.shopadmin .lables {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		margin-left: -100rpx;
	}

	.shopadmin .lables .text {
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.shopadmin .pressbutt image {
		width: 130rpx;
		height: 50rpx;
	}

	.shopadmin .pressbutt .one {
		position: relative;
	}

	.shopadmin .pressbutt .one text {
		position: absolute;
		top: 10rpx;
		left: 16rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.shopadmin .pressbutt .two {
		position: relative;
	}

	.shopadmin .pressbutt .two text {
		position: absolute;
		top: 10rpx;
		right: 16rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.adminsistration .money {
		width: 690rpx;
		background: #FD635E;
		border-radius: 15rpx;
		margin: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 10rpx;
		box-sizing: border-box;
	}

	.money .left {
		width: 100%;
		display: flex;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.money .left .one {
		font-size: 48rpx;
		font-weight: 800;
	}

	.statistics {
		width: 100%;
		height: 205rpx;
		background: #FFFFFF;
		padding: 30rpx;
		padding-bottom: 10rpx;
		box-sizing: border-box;
	}

	.statistics .shang {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #222222;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		box-sizing: border-box;
	}

	.statistics .xia {
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx;
	}

	.statistics .xia .oen {
		text-align: center;
		font-size: 26rpx;
		font-family: HiraginoSansGB;
		font-weight: normal;
		color: #666666;
	}

	.statistics .xia .oen .num {
		font-size: 36rpx;
		font-weight: bold;
		color: #222222;
	}

	.information {
		width: 100%;
		// height: 320rpx;
		background: #FFFFFF;
		padding: 30rpx;
		margin-top: 20rpx;
	}

	.information .shang {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #222222;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #F5F5F5;
		box-sizing: border-box;
	}

	.information .xia .right {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 40rpx;
		flex: 1;
		margin-right: 30rpx;
	}

	.information .xia .left {
		border-right: 2px solid #F5F5F5;
		padding-right: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}

	.information .xia .right .oen {
		text-align: center;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
		/* width: 150rpx; */
		width: 20%;
	}

	.information .xia .right .oen .num {
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.footer {
		display: flex;
		margin: 30rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.footer .right {
		flex: 1;
	}

	.footer .right .img1 {
		width: 28rpx;
		height: 28rpx;
	}

	.management {
		background: #fff;
		margin: 20rpx 0;
		padding: 10rpx 0rpx;

		h2 {
			padding: 0rpx 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #222222;
		}
	}

	.content {
		width: 690rpx;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 10rpx;
	}
</style>
