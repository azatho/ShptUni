<!-- 新增/修改地址 -->
<template>
	<view class="body">
		<view style="padding:0 30rpx;">
			<view class="content">
				<view class="" style="margin-right: 24rpx;">收货人</view>
				<view class="contentInput">
					<input type="text" value="" placeholder="请输入收货人姓名" style="font-size: 26rpx;" v-model="getName"/>
				</view>
			</view>
			<view class="content">
				<view class="">手机号码</view>
				<view class="contentInput">
					<input type="number" maxlength="11" value="" placeholder="请输入手机号码" style="font-size: 26rpx;" v-model="getNum" @input="matchingPhone"/>
				</view>
			</view>
			<citydata @get_reginId="getId" :nnn="objs"></citydata>
			<view class="content">
				<view class="">详细地址</view>
				<view class="contentInput">
					<input type="text" value="" placeholder="详细地址,  如1层101室"  style="font-size: 26rpx;" v-model="getAdressDetailed"/>
				</view>
			</view>
		</view>
		<view style="height: 20rpx;background-color: #F5F5F5;"></view>
		<view style="display:flex;justify-content: space-between;margin-top: 30rpx;padding: 0 30rpx;height: 250rpx;">
			<view style="font-size: 26rpx;font-family: PingFang SC;font-weight: 400;color: #333333;">设为默认地址</view>
			<view><switch :checked="isDefault_address==0?false:true" @change="selectIsDefault" color="#FF6351"/> </view>
		</view>
			<view>
				<view class="sureBind" @click="$u.throttle(confirm,1000)">
					保存
				</view>
			</view>
	</view>
</template>

<script>
	import citydata from './citydata.vue'
	export default {
		components:{
			citydata
		},
		data() {
			return {
				// 是否设为默认地址
				checked:false,
				objs:{},
				getNum:"",
				getName:"",
				getAdress:"点击选择收货地址 >",
				getAdressDetailed:"",
				selectArea:"",
				province_id:"",
				province_name:"",
				city_id:"",
				city_name:"",
				county_id:"",
				county_name:"",
				isDefault_address:1,
				longitude:"",
				latitude:"",
				address_id:"",
				isSelectDetailed:"",
				id:"",
			}
		},
		onLoad(e){
			this.address_id=e.type
			if(e.item){
				let adressInfo =JSON.parse(e.item)
				this.id=adressInfo.index
				this.getName=adressInfo.contacts
				this.getNum=adressInfo.phone
				this.getAdress=adressInfo.full_address
				this.latitude=adressInfo.lat
				this.longitude=adressInfo.lng
				this.getAdressDetailed=adressInfo.address
				this.isDefault_address=adressInfo.default_address
				this.province_name=adressInfo.province_name
				this.city_name=adressInfo.city_name
				this.county_name=adressInfo.county_name
				this.province_id=adressInfo.province_id
				this.city_id=adressInfo.city_id
				this.county_id=adressInfo.county_id
				this.objs = {
					show:true,//必传
					province_name:adressInfo.province_name,
					city_name:adressInfo.city_name,
					county_name:adressInfo.county_name,
					province_id:adressInfo.province_id,
					city_id:adressInfo.city_id,
					county_id:adressInfo.county_id
				}
			}
		},
		methods: {
			selectIsDefault(e){
				console.log(e)
				if(e.detail.value){
					this.isDefault_address=1
				}else{
					this.isDefault_address=0
				}
			},
			// 保存地址
			confirm(){
				let self=this;
				if(self.getName==""){
					uni.showToast({
						title:"请输入收货人姓名",
						icon:'none'
					})
					return
				}
				if(self.getNum==""){
					uni.showToast({
						title:"请输入手机号码",
						icon:'none'
					})
					return
				}
				if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(self.getNum)){
					uni.showToast({
						title:"手机号错误,请重新输入",
						icon:"none"
					})
					return
				}
				if(self.objs.city_id===false&&self.selectArea==""){
					uni.showToast({
						title:"请选择所在区域",
						icon:'none'
					})
					return
				}
				if(self.getAdressDetailed==""){
					uni.showToast({
						title:"请输入详细地址",
						icon:'none'
					})
					return
				}
                console.log(self.getAdress)
				self.request({
					url:"ShptUapi/public/index.php/Address/addAddress",
					data:{
						full_address:self.getAdress,
						lng:self.longitude,
						lat:self.latitude,
						address_id:self.address_id,
						address:self.getAdressDetailed,
						province_id:self.province_id,
						province_name:self.province_name,
						city_id:self.city_id,
						city_name:self.city_name,
						county_id:self.county_id,
						county_name:self.county_name,
						contacts:self.getName,
						phone:self.getNum,
						index:self.id,
						default_address:self.isDefault_address
					}
				}).then(res => {
				        console.log(res)
				        if (res.data.success) {
							uni.showToast({
							        title:"编辑成功",
							        icon:'none'
							})
							setTimeout(function(){
								uni.navigateBack({
									delta:1
								})
							},1000)
				        } else {
				                uni.showToast({
				                title: res.data.msg,
				                icon: 'none'
				                })
				        }
				})
			},
			matchingPhone(){
				let reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
				if (this.getNum.length==11){
					if (!reg_tel.test(this.getNum)){
						uni.showToast({
							title:"手机号错误,请重新输入",
							icon:"none"
						})
					}
				}
			},
			// 省市区
			getId(obj){
				this.selectArea=obj
				this.province_name = obj.province_name;
				this.city_name = obj.city_name;
				this.county_name = obj.county_name;
				this.province_id = obj.province_id;
				this.city_id = obj.city_id;
				this.county_id = obj.county_id;
			},
			// 获取详细地址
			// getAdresss(){
			// 	let that=this
			// 	uni.chooseLocation({
			// 		success: function(res) {
			// 			console.log(res)
			// 			that.longitude=res.longitude
			// 			that.latitude=res.latitude
			// 			// that.position[0].longitude=res.longitude
			// 			// that.position[0].latitude=res.latitude
			// 			that.getAdress=res.name
			// 		},
			// 		fail:function(res){
			// 			if(res.errMsg=='chooseLocation:fail auth deny')
			// 			uni.showModal({
			// 				title:"请授权位置信息",
			// 				content:"检测到您未打开地理位置权限,请前往开启",
			// 				confirmText:"前往开启",
			// 				showCancel:false,
			// 				success:(res)=>{
			// 					uni.openSetting({
			// 						success:(res)=>{
			// 						}
			// 					})
			// 				}
			// 			})
			// 		}
			// 	});
			// },
			
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style scoped lang="scss">
	
	.sureBind{
		width: 690rpx;
		height: 90rpx;
		background:#FF6351;
		border-radius: 45rpx;
		margin:0 30rpx ;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
		font-size: 30rpx;
	}
	.contentInput{
		flex-grow:1;
        
        input::placeholder {
                font-size: 26rpx;
            }
	}
	.contentInput .txt{
		margin-left: 60rpx;
		color: #999999;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.body{
		// padding: 30rpx;
	}
	.content{
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		input{
			margin-left: 60rpx;
			text-align: left;
			font-weight:400;
			color: #999999;
		}
		image{
			width:17rpx;
			height:32rpx;
			vertical-align: middle;
			margin-left: 20rpx;
		}
	}
</style>
