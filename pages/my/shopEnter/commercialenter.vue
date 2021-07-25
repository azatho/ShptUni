<!-- 商户入驻 - 店铺资料 -->
<template>
    <view>
        <!-- 导航栏 -->
        <u-navbar :title="nav_title" title-color="#000000"></u-navbar>
        <!-- 页面内容 -->
        <view class="bgc" v-if="reveal == 1">
            <view class="proposer">
                <view class="radio">
                    <view class="area">店铺名称</view>
                    <input type="text" placeholder="请输入店铺名称" :value="shopaddress" @input="goshop" />
                </view>
                <view class="radio">
                    <view class="area">联系人</view>
                    <input type="text" placeholder="请输入联系人" :value="linkman" @input="goname" />
                </view>
                <view class="radio">
                    <view class="area">联系电话</view>
                    <input placeholder="请输入联系电话" type="number" maxlength="11" :value="phone" @input="gophone" />
                </view>
                <view class="radio">
                    <view class="area">经营类别</view>
                    <view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;"
                        @click="getcategory">
                        <text>{{ category }}</text>
                        <image src="../../../static/back.png" style="width: 15rpx; height: 30rpx; margin-left: 15rpx;">
                        </image>
                    </view>
                </view>
                <view class="">
                    <view class="area" style="padding: 30rpx;font-size: 26rpx;">店铺简介:</view>
                    <view style="display: flex;justify-content: center;align-items: center;position: relative;">
                        <textarea
                            style="height: 300rpx;width: 690rpx;background-color: #F5F5F5;padding: 20rpx;box-sizing: border-box;font-size: 26rpx;"
                            maxlength="200" placeholder="请描述申请缘由，最多输入200个字。" v-model="shopDec"
                            @input="monitor"></textarea><!-- v-html="textareas" -->
                        <text
                            style="position: absolute;right: 50rpx;bottom: 50rpx;font-size: 24rpx;color: #999999;">{{num}}/200</text>
                    </view>
                </view>
                <view class="radio">
                    <!-- <citydata @get_reginId="getId" :id='1' :nnn="objs"></citydata> -->
                    <view class="area">店铺地址</view>
                    <view style="width: 520rpx; color: #999999; font-size: 26rpx; text-align: right;"
                        @click="getstaddress">
                        <text>{{ staddress?staddress:"请选择省市区" }}</text>
                        <image src="../../../static/back.png" style="width: 15rpx; height: 30rpx; margin-left: 15rpx;">
                        </image>
                    </view>
                </view>
                <view class="inpadd">
                    <input type="text" placeholder="请输入详细地址" v-model="address" />
                </view>
                <!-- 上传图片 -->
                <view class="hang">
                    <view class="phopphoto">
                        <view>（1张）</view>
                        <view class="txt">
                            <view>1.建议尺寸：500*500</view>
                            <view>2.为保证图片质量，大小不小于500KB</view>
                        </view>
                    </view>
                    <image src="../../../static/appimg.png" @click="addImg2(1)" v-if="!imgs2"></image>
                    <image :src="cdnUrl + imgs2" @click="addImg2(1)" v-else></image>
                </view>
                <view class="addimg">
                    <view class="text">店铺照片（最多上传5张）</view>
                    <view class="text1" style="margin-bottom: 0;">1.建议尺寸：500*500</view>
                    <view class="text1" style="margin-top: 0;">2.为保证图片质量，大小不小于500KB</view>
                    <view v-for="(item, i) in imgs" :key="i" style="display: inline-block;position: relative;">
                        <image :src="cdnUrl + item" style="width: 120rpx;height: 120rpx;margin: 0 40rpx 20rpx 0;">
                        </image>
                        <image src="../../../static/del.png" class="cha" @click="dels(i)"></image>
                    </view>
                    <image src="../../../static/appimg.png" @click="addImg(1)"></image>
                </view>
                <view class="hang ">
                    <view class="phopphoto">
                        <view>上传视频（选填） </view>
                        <view class="txt">
                            <view>1.建议比例： 16:9</view>
                            <view>2.建议大小为20MB</view>
                        </view>
                    </view>
                    <view style="display: inline-block;position: relative;">
                        <image src="../../../static/appimg.png" @click="addVideo()" v-if="video == ''"></image>
                        <video style="width: 130rpx;height: 130rpx;" :src="cdnUrl + video" :controls='false'
                            v-else></video>
                        <image v-if="video != ''" src="../../../static/del.png"
                            style="width:44rpx;height: 44rpx;position: absolute;top: -20rpx;right: -20rpx;"
                            @click="delsVideo(i)"></image>
                    </view>

                    <!-- <image :src="cdnUrl + video" @click="addImg2()" ></image> -->
                </view>
                <view class="hang" style="border-bottom: 0rpx solid #f5f5f5;">
                    <view class="phopphoto">
                        <view>上传视频封面图片（选填）</view>
                        <view class="txt">
                            <view>1.建议比例： 16:9</view>
                            <view>2.单张大小不小于500KB</view>
                        </view>
                    </view>
                    <image src="../../../static/appimg.png" @click="addImg2(2)" v-if="imgsVideoPic == ''"></image>
                    <image :src="cdnUrl + imgsVideoPic" @click="addImg2(2)" v-else></image>
                </view>
                <view class="next" @click="presents()">下一步</view>
                <!--@click="presents()" -->
            </view>
        </view>

        <view class="bgc" v-if="reveal == 2">
            <view class="radio">
                <view class="area">法人姓名</view>
                <input type="text" placeholder="请输入法人真实姓名" :value="linkmans" @input="getname" />
            </view>
            <view class="radio">
                <view class="area">法人身份证号</view>
                <input type="text" placeholder="请输入法人身份证号" :value="identity" style="width: 510rpx;"
                    @input="getidentity" />
            </view>
            <view class="hang" style="border-bottom:2rpx solid #f5f5f5">
                <view class="phopphoto">
                    <view>法人代表身份证人像面</view>
                    <view class="txt">
                        <view>1、人像面需清晰</view>
                    </view>
                </view>
                <image src="../../../static/appimg.png" @click="addImg2(3)" v-if="imgs5 == ''"></image>
                <image :src="cdnUrl + imgs5" @click="addImg2(3)" v-else></image>
            </view>
            <view class="hang">
                <view class="phopphoto">
                    <view>法人代表身份证国徽面</view>
                    <view class="txt">
                        <view>1、国徽面需清晰拍出有效期等文字信息</view>
                    </view>
                </view>
                <image src="../../../static/appimg.png" @click="addImg2(4)" v-if="imgs3 == ''"></image>
                <image :src="cdnUrl + imgs3" @click="addImg2(4)" v-else></image>
            </view>
            <view class="time" style="margin-bottom: 20rpx;">
                <view class="left">
                    <view class="permit">身份证有效期</view>
                </view>
                <view class="lang" @click="golang()">
                    <image src="../../../static/noaffirm.png" v-if="!checked"></image>
                    <image src="../../../static/choose.png" v-else></image>
                    长期有效
                </view>
                <picker class="shot" mode="date" :start="startData()" @change="bindDateChange1">
                    {{ date }}
                    <image src="../../../static/mores.png"></image>
                </picker>
            </view>
            <view style="width: 100%;height:20rpx;background-color: #f5f5f5;"></view>
            <view class="hang" style="border-bottom:2rpx solid #f5f5f5">
                <view class="phopphoto">
                    <view>营业执照照片</view>
                    <view class="txt">
                        <view>1、需文字清晰、边框完整、露出国徽</view>
                        <view>2、拍复印件需加盖印章，可用有效特许证件代替</view>
                    </view>
                </view>
                <image src="../../../static/appimg.png" @click="addImg2(5)" v-if="imgs4 == ''"></image>
                <image :src="cdnUrl + imgs4" @click="addImg2(5)" v-else></image>
            </view>
            <view class="time" style="margin-bottom: 20rpx;">
                <view class="left">
                    <view class="permit">营业执照有效期</view>
                </view>
                <view class="lang" @click="golangs()">
                    <image src="../../../static/noaffirm.png" v-if="!business"></image>
                    <image src="../../../static/choose.png" v-else></image>
                    长期有效
                </view>
                <picker class="shot" mode="date" :start="startData()" @change="bindDateChanges2">
                    {{ dates }}
                    <image src="../../../static/mores.png"></image>
                </picker>
            </view>
            <view style="width: 100%;height:20rpx;background-color: #f5f5f5;"></view>
            <view class="addimg" style="margin-bottom: 100rpx;">
                <view class="text">其他相关许可证照片(最多5张）</view>
                <view class="text1" style="margin-bottom: 0;">1、需文字清晰、边框完整、露出国徽</view>
                <view class="text1" style="margin-top: 0;">2、拍复印件需加盖印章，可用有效特许证件代替</view>
                <view v-for="(item, i) in imgsArr" :key="i" style="display: inline-block;position: relative;">
                    <image :src="cdnUrl + item" style="width: 120rpx;height: 120rpx;margin: 0 40rpx 20rpx 0;"></image>
                    <image src="../../../static/del.png" class="cha" @click="delsArr(i)"></image>
                </view>
                <image src="../../../static/appimg.png" @click="addImg(2)"></image>
            </view>
            <view class="xieyi" style="display: flex; margin-left: 200rpx;">
                <view @click="goagree">
                    <image src="../../../static/xz.png" v-if="agree == true"></image>
                    <image src="../../../static/fk_icon.png" v-else></image>
                    <text>我已阅读并同意</text>
                </view>
                <text style="color:#F6281B;" @click="getagreement">《开店规则必看》</text>
            </view>
            <view class="butt" @click="getbutt">提交审核</view>
        </view>
        <!-- 联系地址的弹窗 -->
        <view class="addressModel" v-if="visibles" @click="cancel_addresss">
            <view class="showModel">
                <picker-view :value="value" @change="bindChanges">
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in provinceLists" :key="index">{{ item.region_name }}
                        </view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in cityLists" :key="index">{{ item.region_name }}</view>
                    </picker-view-column>
                    <picker-view-column>
                        <view class="item" v-for="(item, index) in countryLists" :key="index">{{ item.region_name }}
                        </view>
                    </picker-view-column>
                </picker-view>
                <view class="btns">
                    <view class="sure" @click="cancel_addresss">取消</view>
                    <view class="cancel" @click="sure_addresss">确定</view>
                </view>
            </view>
        </view>
        <!-- 经营类目弹窗 -->
        <view class="tanchuang" v-if="operate">
            <view class="beijing">
                <view class="operats">
                    <view class="text">请选择经营类目</view>
                    <view class="del" @click="del">
                        <image src="../../../static/del.png"></image>
                    </view>
                    <view class="operxuan" style="padding-left: 30rpx;">
                        <block v-for="(item, id) in operatrs" :key="id">
                            <view :class="item.scope_index == operatrsid ? 'xuan' : 'xuan1'"
                                @click="getoperatrs(item.scope_index, item.scope_name)">{{ item.scope_name }}</view>
                        </block>
                    </view>
                    <view class="sure" @click="getsure()">确定</view>
                </view>
            </view>
        </view>
    </view>
</template>

<!-- <script src="https://mapapi.qq.com/web/mapComponents/geoLocation/v/geolocation.min.js"></script> -->
<!-- <script charset="utf-8" src="https://map.qq.com/api/gljs?v=1.exp&key=HQKBZ-O3E36-6L3SU-MRXQU-RFFYQ-NZBJ5"></script> -->

<script>
    import citydata from '../adress/citydata.vue';
    // import { jweixin } from '../../until/jweixin.js';
    export default {
        components: {
            citydata
        },
        data() {
            return {
                nav_title: '商户入驻',
                num: "0", //店铺简介字数
                shopDec: "", //店铺简介
                imgsVideoPic: "", //视频封面图片
                video: "", //视频路径地址
                cdnUrl: '',
                baseUrl: '',
                category: '请选择经营类目', //经营类目
                taking: '开始时间', //营业时间
                takingend: '结束时间',
                open_time: '', //营业时间(集合)
                startDate: '',
                endDate: '',
                linkman: '', //联系人
                phone: '', //联系电话
                shopaddress: '',
                staddress: '请选择省市区', //店铺地址
                address: '', //详细地址
                imgs2: "", //店铺logo
                operate: false, //经营类目弹窗
                location: false, //地址弹窗
                operatrs: [],
                operatrsid: 1,
                value: [],
                visibles: false, //区域选择框
                province_names: '', //市名
                city_names: '', //城市名
                county_names: '', //区名
                province_ids: '-1',
                city_ids: '-1',
                county_ids: '-1',
                provinceLists: [],
                cityLists: [],
                countryLists: [],
                current_values: [-1, -1, -1],
                // 下一步
                linkmans: '',
                identity: '',
                imgs5: '', //人面面
                imgs3: '', //国徽面
                imgs4: '', //营业执照
                imgs: [], //五张店铺环境
                imgsArr: [], //相关许可证相片
                date: '请选择到期时间',
                checked: false, //身份证
                business: false, //营业照
                dates: '请选择到期时间',
                agree: true,
                reveal: 1,
                reveals: false,
                card_indate: '', //身份证有限期
                license_indate: '', //营业执照有效期
                // 审核返现
                supplier_status: '', //审核状态
                id: 0,
                clickStatus: false,
                takingStart: 0,
                takingendStart: 0,
                supplier_id: "", //重新提交入驻申请ID
                status:''//1需要返现
            };
        },
        methods: {
            // 商店简介字数实时显示
            monitor(e) {
                this.num = e.detail.value.length
            },
            // 返回上一页
            //限制身份证有效期选择
            startData() {
                var now = new Date();
                var year = now.getFullYear(); //年
                var month = now.getMonth() + 1; //月
                var day = now.getDate(); //日
                if (String(month).length == 1) {
                    month = String('0') + String(month);
                }
                if (String(day).length == 1) {
                    day = String('0') + String(day);
                }
                return year + '-' + month + '-' + day;
            },
            //获取省市区id
            getId(obj) {
                this.address = '';
                console.log(obj);
                if (obj.province_name && obj.city_name && obj.county_name) {
                    this.staddress = obj.province_name + obj.city_name + obj.county_name;
                    this.province_names = obj.province_name;
                    this.city_names = obj.city_name;
                    this.county_names = obj.county_name;
                    this.province_ids = obj.province_id;
                    this.city_ids = obj.city_id;
                    this.county_ids = obj.county_id;
                }
            },
            // 返回上一页
            black() {
                if (this.reveal == 2) {
                    this.reveal = 1;
                    this.nav_title = "商户入驻"
                    this.objs = {
                        show: true, //必传
                        province_name: this.province_names,
                        city_name: this.city_names,
                        county_name: this.county_names,
                        province_id: this.province_ids,
                        city_id: this.city_ids,
                        county_id: this.county_ids
                    };
                } else {
                    uni.navigateTo({
                        url: './shopEnter'
                    });
                }
            },
            // 获取经营类目
            manages() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/UserSupplier/getScope'
                }).then(res => {
                    console.log(res)
                    if (res.data.success) {
                        self.operatrs = res.data.data;
                    }
                });
            },
            getcategory() {
                this.operate = true;

            },
            getoperatrs(e, name) {
                this.operatrsid = e;
                this.category = name;
            },
            getsure() {
                if (this.category == '请选择经营类目') {
                    this.category = '蔬菜粮油';
                    this.operatrsid = 1;
                }
                this.operate = false;
            },
            del() {
                this.operate = false;
            },
            // 营业时间
            gettaking() {},
            // 开始时间
            bindDateChange(e) {
                this.taking = e.target.value;
            },
            // 结束时间
            bindDateChanges(e) {
                this.takingend = e.target.value;
            },
            // 联系人
            goname(e) {
                this.linkman = e.detail.value;
            },
            // 法人姓名
            getname(e) {
                this.linkmans = e.detail.value;
            },
            // 法人身份证
            getidentity(e) {
                // var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                // if(e.detail.value.length==18){
                // if(reg.test(e.detail.value)){
                this.identity = e.detail.value;
                // 	}else {
                // 		uni.showToast({
                // 			icon:'none',
                // 		    title: '请输入正确的身份证号',
                // 		    duration: 300
                // 		});
                // 	}
                // }
            },
            // 电话
            gophone(e) {
                this.phone = e.detail.value;
            },
            // 店铺地址
            getstaddress() {
                this.visibles = true;
                this.getProvinceLists();
            },
            goshop(e) {
                this.shopaddress = e.detail.value;
            },
            // 区域选择框隐藏
            cancel_addresss() {
                this.visibles = false;
            },
            // 区域选择框点击确定
            sure_addresss() {
                this.visibles = false;
                this.latFlag = false;

                this.staddress = this.province_names + this.city_names + this.county_names;
            },
            // 省
            getProvinceLists() {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/City/city_list',
                    data: {},
                    type: "post"
                }).then(
                    res => {
                        if (res.data.success) {
                            self.provinceLists = res.data.data.list;
                            self.getCityLists(res.data.data.list[0].region_id);
                            self.province_ids = self.provinceLists[0].region_id;
                            self.province_names = self.provinceLists[0].region_name;
                        }
                    },
                    rej => {
                        console.log(rej);
                    }
                );
            },
            // 市区
            getCityLists(e) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/City/city_list',
                    data: {
                        type: 2,
                        city_id: e
                    },
                    type: "post"
                }).then(
                    res => {
                        if (res.data.success) {
                            self.cityLists = res.data.data.list;
                            self.getCountryLists(res.data.data.list[0].region_id);
                            self.city_ids = self.cityLists[0].region_id;
                            self.city_names = self.cityLists[0].region_name;
                        }
                    },
                    rej => {
                        console.log(rej);
                    }
                );
            },
            // 乡镇
            getCountryLists(e) {
                let self = this;
                self.request({
                    url: 'ShptUapi/public/index.php/City/city_list',
                    data: {
                        type: 3,
                        city_id: e
                    },
                    type: "post"
                }).then(
                    res => {
                        if (res.data.success) {
                            self.countryLists = res.data.data.list;
                            self.county_ids = self.countryLists[0].region_id;
                            self.county_names = self.countryLists[0].region_name;
                        }
                    },
                    rej => {
                        console.log(rej);
                    }
                );
            },
            // 中间区域选择
            bindChanges(e) {
                const val = e.detail.value;
                if (val[0] != this.current_values[0]) {
                    let a = val[0];
                    console.log('选择了省')
                    if (val[0]) {
                        this.getCityLists(this.provinceLists[a].region_id);
                        this.current_values.splice(0, 1, a)
                        this.province_ids = this.provinceLists[a].region_id;
                        this.province_names = this.provinceLists[a].region_name
                    }
                }
                if (val.length == 2 && val[1] != this.current_values[1]) {
                    let b = val[1];
                    console.log('选择了市')
                    if (val[1]) {
                        this.getCountryLists(this.cityLists[b].region_id);
                        this.city_names = this.cityLists[b].region_name;
                        this.current_values.splice(1, 1, b)
                        this.city_ids = this.cityLists[b].region_id;
                    }
                }
                console.log(val.length == 3);
                if (val.length == 3 && val[2] != this.current_values[2]) {
                    let c = val[2];
                    this.county_names = this.countryLists[c].region_name;
                    this.current_values.splice(2, 1, c)
                    this.county_ids = this.countryLists[c].region_id;
                }
            },
            // 上传视频
            addVideo() {
                let self = this,
                    header = {}; // 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
                uni.chooseVideo({
                    maxDuration: 60,
                    count: 1,
                    sourceType: ['camera', 'album'],
                    success: function(res) {
                        console.log(res);
                        uni.showLoading({
                            title: '加载中'
                        });
                        uni.uploadFile({
                            url: self.baseUrl + '/ShptSapi/public/supplier.php/Upload/img', //+url地址
                            filePath: res.tempFilePath, //临时路径 tempFilePaths
                            name: 'file',
                            formData: {
                                module: "store_video"
                            },
                            success: function(res) {
                                console.log(res);
                                uni.hideLoading();
                                let data = JSON.parse(res.data);
                                if (data.code == 0) {
                                    uni.showToast({
                                        title: '上传成功'
                                    });
                                    self.video = data.data;
                                } else {
                                    uni.showToast({
                                        icon: 'none',
                                        title: '上传失败，请重试~'
                                    });
                                }
                            },
                            fail: function(res) {
                                // console.log(res)
                            }
                        });
                    }
                });
            },
            // 上传图片
            addImg2(e) {
                let self = this,
                    header = {}; // 获取到一个本地资源的临时文件路径后，可通过此接口将本地资源上传到指定服务器
                uni.chooseImage({
                    count: 1,
                    success: function(res) {
                        console.log(res);
                        uni.showLoading({
                            title: '加载中'
                        });
                        uni.uploadFile({
                            url: self.baseUrl + 'ShptSapi/public/supplier.php/Upload/img', //+url地址
                            filePath: res.tempFilePaths.join(','), //临时路径 tempFilePaths
                            name: 'file',
                            formData: {
                                module: "store_entry"
                            },
                            method: 'POST',
                            success: function(res) {
                                console.log(res);
                                uni.hideLoading();
                                let data = JSON.parse(res.data);
                                if (data.code == 0) {
                                    uni.showToast({
                                        title: '上传成功'
                                    });
                                    switch (e) {
                                        case 1:
                                            self.imgs2 = data.data;
                                            break;
                                        case 2:
                                            self.imgsVideoPic = data.data;
                                            break;
                                        case 3:
                                            self.imgs5 = data.data;
                                            break;
                                        case 4:
                                            self.imgs3 = data.data;
                                            break;
                                        case 5:
                                            self.imgs4 = data.data;
                                            break;
                                        case 6:
                                            self.video = data.data;
                                            break;
                                    }
                                } else {
                                    uni.showToast({
                                        icon: 'none',
                                        title: '上传失败，请重试~'
                                    });
                                }
                            },
                            fail: function(res) {
                                // console.log(res)
                            }
                        });
                    }
                });
            },
            // 下一步
            presents() {
                let self = this;
                console.log(self.taking);
                if (self.category == '请选择经营类目') {
                    uni.showToast({
                        icon: 'none',
                        title: '经营类目不能为空'
                    });
                } else if (!self.shopaddress) {
                    uni.showToast({
                        icon: 'none',
                        title: '店铺名称不能为空'
                    });
                } else if (!self.linkman) {
                    uni.showToast({
                        icon: 'none',
                        title: '联系人不能为空'
                    });
                } else if (self.shopDec = '') {
                    uni.showToast({
                        icon: 'none',
                        title: '店铺简介不能为空'
                    });
                } else if (!/^1[0-9]{10}$/.test(self.phone)) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入正确的手机号'
                    });
                } else if (self.province_ids == '-1' && self.city_ids == '-1' && self.county_ids == '-1') {
                    uni.showToast({
                        icon: 'none',
                        title: '请选择所在区域'
                    });
                } else if (!self.address) {
                    uni.showToast({
                        icon: 'none',
                        title: '详细地址不能为空'
                    });
                } else if (self.imgs2.length == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '店铺logo不能为空'
                    });
                }else if (self.imgs.length == 0) {
                    uni.showToast({
                        icon: 'none',
                        title: '店铺照片不能为空'
                    });
                } else {
                    this.reveal = 2;
                    this.nav_title = "资质认证"
                }
            },
            addImg(e) {
                let self = this,
                    header = {
                        // 'Content-Type': 'multipart/form-data'
                    };

                // let img_count = 1
                // if (e == 1) {
                //     img_count = 5
                // }
                uni.chooseImage({
                    count: 1,
                    success: function(res) {
    
                        uni.showLoading({
                            title: '加载中'
                        });
                        uni.uploadFile({
                            url: self.$baseUrl + '/ShptSapi/public/supplier.php/Upload/img',
                            filePath: res.tempFilePaths.join(','),
                            name: 'file',
                            formData: {
                                module: "store_entry"
                            },
                            success: function(res) {
                                uni.hideLoading();
                                let data = JSON.parse(res.data);
                                if (data.code == 0) {
                                    uni.showToast({
                                        title: '上传成功'
                                    });
                                    if (e == 1) {
                                        if (self.imgs.length <= 4) {
                                            self.imgs.push(data.data);
                                            console.log(self.imgs)
                                        } else {
                                            uni.showToast({
                                                icon: 'none',
                                                title: '最多上传5张图片'
                                            });
                                        }
                                    } else {
                                        // self.imgs=data.data;
                                        if (self.imgsArr.length <= 4) {
                                            self.imgsArr.push(data.data);
                                        } else {
                                            uni.showToast({
                                                icon: 'none',
                                                title: '最多上传5张图片'
                                            });
                                        }
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
            dels(e) {
                for (var i = 0; i < this.imgs.length; i++) {
                    if (i == e) {
                        this.imgs.splice(i, 1);
                    }
                }
            },
            // 删除视频
            delsVideo() {
                this.video = ''
            },
            delsArr(e) {
                for (var i = 0; i < this.imgsArr.length; i++) {
                    if (i == e) {
                        this.imgsArr.splice(i, 1);
                    }
                }
            },
            // 长期有效显示状态
            golang(e) {
                if (this.checked == true) {
                    this.checked = false;
                } else {
                    this.checked = true;
                    this.date = '请选择到期时间';
                    this.card_indate = 0;
                }
            },
            // 其他时间下拉框
            bindDateChange1(e) {
                this.checked = false;
                this.date = e.target.value;
                this.card_indate = this.date;
                console.log(this.card_indate);
            },
            bindDateChanges2(e) {
                this.business = false;
                this.dates = e.target.value;
                this.license_indate = this.dates;
            },
            golangs() {
                if (this.business == true) {
                    this.business = false;
                } else {
                    this.business = true;
                    this.dates = '请选择到期时间';
                    this.license_indate = 0;
                }
            },
            // 是否同意
            goagree() {
                if (this.agree == true) {
                    this.agree = false;
                } else {
                    this.agree = true;
                }
            },
            // 转跳到协议页面
            getagreement() {
                uni.navigateTo({
                    url: 'agreement?type=' + '1'
                });
            },
            getbutt() {
                let self = this;
                if (!self.linkmans) {
                    uni.showToast({
                        icon: 'none',
                        title: '法人姓名不能为空'
                    });
                } else if (!self.identity) {
                    uni.showToast({
                        icon: 'none',
                        title: '法人身份证号不能为空'
                    });
                } else if (self.imgs5.length == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '人像面不能为空'
                    });
                } else if (self.imgs3.length == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '国徽面不能为空'
                    });
                } else if (!self.checked && self.card_indate == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '请选择身份证有效期'
                    });
                } else if (self.imgs4.length == '') {
                    uni.showToast({
                        icon: 'none',
                        title: '营业执照不能为空'
                    });
                } else if (self.license_indate == '' && !self.business) {
                    uni.showToast({
                        icon: 'none',
                        title: '请选择营业执照有效期'
                    });
                } else if (!self.agree) {
                    uni.showToast({
                        icon: 'none',
                        title: '请勾选开店规则'
                    });
                } else {
                    self.request({
                        method: 'POST',
                        url: 'ShptUapi/public/index.php/UserSupplier/addEditSupplierInfo',
                        data: {
                            supplier_desp: self.shopDec, //商品简介
                            video_url: self.video, //视频
                            video_pic: self.imgsVideoPic, //视频封面图片
                            supplier_scope: self.operatrsid, //id
                            supplier_name: self.shopaddress,
                            frequent_phone: self.phone,
                            frequent_name: self.linkman,
                            supplier_province: self.province_ids,
                            supplier_city: self.city_ids,
                            supplier_county: self.county_ids,
                            supplier_address: self.address,
                            supplier_contacts: self.linkmans,
                            supplier_banner: self.imgs,
                            card_number: self.identity,
                            supplier_icon: self.imgs2,
                            front_image: self.imgs5,
                            reverse_image: self.imgs3,
                            license_image: self.imgs4,
                            card_indate: self.card_indate,
                            license_indate: self.license_indate,
                            other_card: self.imgsArr.join(','),
                            supplier_id: self.supplier_id
                        }
                    }).then(
                        res => {
                            if (res.data.success) {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                                setTimeout(function() {
                                    uni.navigateTo({
                                        url: './shopEnter'
                                    });
                                }, 1000);
                            } else {
                                uni.showToast({
                                    title: res.data.msg,
                                    icon: 'none'
                                })
                            }
                        },
                        rej => {
                            console.log(rej);
                        }
                    );
                }
            },

            getSupplierInfo() {
                let self = this;
                if (uni.getStorageSync('token')) {
                    self.request({
                        url: 'ShptUapi/public/index.php/UserSupplier/getSupplier',
                        data: {}
                    }).then(
                        res => {
                            if (res.data.success) {
                                console.log(res.data.data)
                                self.supplier_id = res.data.data.supplier_id;
                                self.category = res.data.data.scope_name;
                                self.operatrsid = res.data.data.supplier_scope;
                                self.shopaddress = res.data.data.supplier_name;
                                self.linkman = res.data.data.frequent_name;
                                self.phone = res.data.data.frequent_phone;
                                self.address = res.data.data.supplier_address;
                                self.imgs2 = res.data.data.supplier_icon;
                                self.linkmans = res.data.data.supplier_contacts;
                                self.identity = res.data.data.card_number;
                                self.imgs5 = res.data.data.front_image;
                                self.imgs3 = res.data.data.reverse_image;
                                self.date = res.data.data.card_indate;
                                self.imgs4 = res.data.data.license_image;
                                self.dates = res.data.data.license_indate;
                                self.province_ids = res.data.data.supplier_province;
                                self.city_ids = res.data.data.supplier_city;
                                self.county_ids = res.data.data.supplier_county;
                                self.province_names = res.data.data.province_name;
                                self.city_names = res.data.data.city_name;
                                self.county_names = res.data.data.county_name;
                                self.shopDec = res.data.data.supplier_desp;
                                this.staddress = res.data.data.province_name + res.data.data.city_name + res.data
                                    .data.county_name;
                                // !self.checked && self.card_indate=='' 身份证有效期判断回显
                                if (res.data.data.card_indate == 0) {
                                    self.checked = true;
                                } else {
                                    self.card_indate = res.data.data.card_indate;
                                }
                                // self.license_indate=='' && !self.business   营业执照有效期判断回显
                                if (res.data.data.license_indate == 0) {
                                    self.business = true;
                                } else {
                                    self.license_indate = res.data.data.license_indate;
                                }
                                //获取坐标
                                self.clickStatus = true;
                                if (res.data.data.other_card != '') {
                                    self.imgsArr = res.data.data.other_card.split(',');
                                }
                                if (res.data.data.supplier_banner != '') {
                                    self.imgs = res.data.data.supplier_banner.split(',');
                                }
                                if (self.operatrsid != '') {
                                    for (var i = 0; i < self.operatrs.length; i++) {
                                        if (self.operatrsid == self.operatrs[i].id) {
                                            self.category = self.operatrs[i].name;
                                        }
                                    }
                                }
                                self.taking = self.open_time.split('-')[0];
                                self.takingend = self.open_time.split('-')[1];
                                if (self.date == 0) {
                                    this.checked = true;
                                    self.date = '请选择到期时间';
                                }
                                if (self.dates == 0) {
                                    this.business = true;
                                    self.dates = '请选择到期时间';
                                }
                            }
                        },
                        rej => {
                            console.log(rej);
                        }
                    );
                }
            }
        },
        onLoad(e) {
            this.status = e.status
        },
        onShow() {
            let self = this;
            this.cdnUrl = this.$cdnUrl;
            this.baseUrl = this.$baseUrl;
            this.manages();
            if (this.status == 1) {
                self.getSupplierInfo();
            }
            
        }
    };
</script>

<style lang="scss">
    page {
        background-color: #fff;
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
        background: #ffffff;
        box-shadow: 0rpx 0rpx 5rpx 0rpx rgba(0, 0, 0, 0.16);
        line-height: 88rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        font-family: PingFang SC;
        z-index: 111111;
    }

    .flexd .left {
        width: 17rpx;
        height: 32rpx;
    }

    .flexd .center {
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
    }

    .bgc {
        background-color: #ffffff;
        // margin-top: 88rpx;
    }

    .starts {
        width: 120rpx;
        text-align: center;
    }

    .radio {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /* margin-top: 20rpx; */
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        border-bottom: 1rpx solid #f5f5f5;
        padding: 30rpx;
        box-sizing: border-box;
    }

    .radio image {
        width: 26rpx;
        height: 26rpx;
        vertical-align: middle;
        margin-right: 10rpx;
    }

    .radio input {
        width: 560rpx;
        height: 30rpx;
        line-height: 30rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-align: right;
    }

    .inpadd {
        padding: 30rpx;
        display: flex;
        border-bottom: 1rpx solid #f5f5f5;
    }

    .inpadd input {
        width: 100%;
        height: 30rpx;
        line-height: 30rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .btn {
        width: 140rpx;
        height: 50rpx;
        line-height: 50rpx;
        background: #fd635e;
        border-radius: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
    }

    .map {
        width: 100%;
        // height: 500rpx;
        height: 288rpx;
    }

    .titles {
        padding: 10rpx 0 10rpx 30rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fd635e;
    }

    .hang {
        font-size: 26rpx;
        font-family: HiraginoSansGB;
        font-weight: normal;
        color: #222222;
        box-sizing: border-box;
        padding: 35rpx 30rpx;
        display: flex;
        justify-content: space-between;
        border-bottom: 1rpx solid #f5f5f5;
    }

    .hang .phopphoto {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .hang .phopphoto .txt1 {
        font-family: PingFang SC;
        font-weight: 400;
    }

    .hang .phopphoto .txt {
        font-size: 24rpx;
        color: #999999;
        padding-top: 20rpx;
    }

    .hang image {
        width: 130rpx;
        height: 130rpx;
    }

    .next {
        margin: 15rpx auto;
        width: 690rpx;
        height: 90rpx;
        background-color: #FD635E;
        border-radius: 45rpx;
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 90rpx;
        text-align: center;

        margin-top: 200rpx;
        margin-bottom: 100rpx;
    }

    .tanchuang {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .beijing {
        width: 100%;
        height: 660rpx;
        background: #ffffff;
        border-radius: 30rpx 30rpx 0px 0px;
        position: fixed;
        left: 0;
        bottom: 0;
    }

    .operats {
        width: 100%;
        padding: 30rpx 0;
        position: relative;
    }

    .operats .text {
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        text-align: center;
    }

    .operats .del image {
        position: absolute;
        right: 30rpx;
        top: 30rpx;
        width: 34rpx;
        height: 34rpx;
    }

    .operats .operxuan {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        margin-top: 30rpx;
    }

    .operats .operxuan .xuan {
        width: 210rpx;
        height: 60rpx;
        background: rgba(246, 40, 27, 0.15);
        border-radius: 6rpx;
        line-height: 60rpx;
        text-align: center;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f6281b;
        margin-bottom: 30rpx;
        margin-right: 30rpx;
    }

    .operats .operxuan .xuan1 {
        width: 210rpx;
        height: 60rpx;
        background: rgba(153, 153, 153, 0.15);
        border-radius: 6rpx;
        line-height: 60rpx;
        text-align: center;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-bottom: 30rpx;
        margin-right: 30rpx;
    }

    .operats .sure {
        width: 690rpx;
        height: 90rpx;
        background: #f6281b;
        border-radius: 45rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 36rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        position: absolute;
        left: 30rpx;
        bottom: -140rpx;
    }

    /* 区域选择框 */
    .addressModel {
        width: 100%;
        height: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 22;

        .showModel {
            width: 100%;
            height: 700rpx;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 111111;
            background-color: #fff;

            picker-view {
                width: 100%;
                height: 600rpx;
            }

            .item {
                line-height: 34px;
                text-align: center;
            }

            .btns {
                display: flex;

                view {
                    width: 50%;
                    height: 100rpx;
                    line-height: 100rpx;
                    text-align: center;
                }
            }

            .sure {
                border-right: 1rpx solid #f5f5f5;
            }
        }
    }

    .addimg {
        background-color: #ffffff;
        padding: 30rpx;
        font-family: PingFang SC;
        font-weight: 400;
        border-bottom: 1rpx solid #f5f5f5;
    }

    .addimg image {
        width: 120rpx;
        height: 120rpx;
        margin-bottom: 20rpx;
    }

    .addimg .cha {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        top: -20rpx;
        right: 20rpx;
    }

    .addimg .text {
        font-size: 26rpx;
        color: #333333;
    }

    .addimg .text1 {
        font-size: 22rpx;
        color: #999999;
        margin: 30rpx 0;
    }

    .time {
        background-color: #ffffff;
        padding: 0 30rpx;
        height: 70rpx;
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 26rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .time .lang image {
        width: 36rpx;
        height: 36rpx;
        vertical-align: middle;
        margin-right: 5rpx;
        padding-left: 40rpx;
    }

    .time .shot image {
        width: 26rpx;
        height: 26rpx;
        vertical-align: middle;
        margin-left: 15rpx;
    }

    .butt {
        width: 690rpx;
        height: 90rpx;
        background: #fd635e;
        border-radius: 45rpx;
        line-height: 90rpx;
        text-align: center;
        font-size: 36rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin: 30rpx;
    }

    .xieyi {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 400;
        color: #000000;
        text-align: center;
        margin-bottom: 20rpx;
        margin-top: 100rpx;
    }

    .xieyi image {
        width: 32rpx;
        height: 32rpx;
        vertical-align: middle;
        margin-right: 10rpx;
    }
</style>
