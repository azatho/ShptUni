import Vue from 'vue'
import uView from "uview-ui";
Vue.use(uView);
import App from './App'
import {
	request,
	cdnUrl,
	baseUrl,
	formatTime,
	formatdate,
	fmoney,
	getDay,
    // unipay,
} from './until/app.js'
Vue.config.productionTip = false;
Vue.prototype.request = request; // 将网络请求挂载到vue原型上
Vue.prototype.$cdnUrl = cdnUrl; //  本地图片地址  注意点:前边一定要$(如果赋值的名字相同的情况下)
Vue.prototype.$baseUrl = baseUrl; // 代码图片地址  注意点:前边一定要$(如果赋值的名字相同的情况下)
Vue.prototype.formatTime = formatTime;
Vue.prototype.fmoney = fmoney;
Vue.prototype.formatdate = formatdate;
Vue.prototype.getDay = getDay;

App.mpType = 'app'
// const throttle = (func, delay) => {
//  let valid = true
//     return function() {
//        if(!valid){
//            //休息时间 暂不接客
//            return false 
//        }
//        // 工作时间，执行函数并且在间隔期内把状态位设为无效
//         valid = false
//         setTimeout(() => {
//             fn()
//             valid = true;
//         }, delay)
//     }
// }
// Vue.prototype.$throttle = throttle;

const time = (timestamp, num) => {
	timestamp = timestamp + '';
	timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
	var date = new Date(timestamp);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	if (num == 0) {
		return y + '-' + m + '-' + d;
	}
	if (num == 1) {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	}
	if (num == 2) {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
	}
	if (num == 3) {
		return h + ':' + minute + ':' + second;
	}
	if (num == 4) {
		return h + ':' + minute;
	}
}
Vue.prototype.$time = time;

const timeConvert = (timestamp, num) => {
	timestamp = timestamp + '';
	timestamp = timestamp.length == 10 ? timestamp * 1000 : timestamp;
	var date = new Date(timestamp);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	if (num == 0) {
		return y + '-' + m + '-' + d;
	} else {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	}
}
Vue.prototype.$timeConvert = timeConvert;

// 分转换成元的函数(固定保留两位小数)
const returnFloat = (value) => {
	let value1 = Math.round(parseFloat(value) * 100) / 10000;
	let xsd = value1.toString().split(".");
	if (xsd.length == 1) {
		value1 = value1.toString() + ".00";
		return value1;
	}
	if (xsd.length > 1) {
		if (xsd[1].length < 2) {
			value1 = value1.toString() + "0";
		}
		if (xsd[1].length > 2) {
			value1 = xsd[0] + '.' + xsd[1].slice(0, 2)
		}
		return value1;
	}
}
Vue.prototype.$returnFloat = returnFloat;
// 分转元(保留两位小数保留+-号)
const returnFloat1 = (value) => {
	let value1 = Math.round(parseFloat(value) * 100) / 10000;
	let xsd = value1.toString().split(".");
	if (xsd.length == 1) {
		value1 = value1.toString() + ".00";
		if (parseFloat(value1) > 0) {
			return '+' + value1;
		} else {
			return value1
		}
	}
	if (xsd.length > 1) {
		if (xsd[1].length < 2) {
			value1 = value1.toString() + "0";
		}
		if (xsd[1].length > 2) {
			value1 = xsd[0] + '.' + xsd[1].slice(0, 2)
		}
		if (parseFloat(value1) > 0) {
			return '+' + value1;
		} else {
			return value1
		}
	}
};
Vue.prototype.$returnFloat1 = returnFloat1;

// 用其他字符替换字符串中字符
const replacepos = (text, start, stop, replacetext) => {
	let mystr
	if (text.length > 2) {
		 mystr = text.substr(0, start) + replacetext + text.substr(stop - 1, stop);
	}
	if (text.length == 1) {
		 mystr = replacetext
	}
	if (text.length == 2) {
		 mystr = text[0] + replacetext
	}
	return mystr;
}
Vue.prototype.$replacepos = replacepos;

// 转换人数
const returnPeople = (value) => {
	let value2 = parseFloat(value)
	let value1 = '';
	value2 > 10000 ? value1 = (value2 / 10000) + '万' : value2 > 1000 ? value1 = (value2 / 1000) + '千' : value2 > 100 ?
		value1 = (value2 / 100) + '百' : value1 = value2
	return value1
}
Vue.prototype.$returnPeople = returnPeople;

const imgUrl = (url) => {
	let str = RegExp('http://');
	let str2 = RegExp('https://');
	let newUrl;
	//通过三元运算符进行判断该图片是否含有http域名，没有就拼接上去
	if (str.test(url) || str2.test(url)) {
		newUrl = url
	} else {
		newUrl = cdnUrl + url
	}
	// str.test(url) ? newUrl = url : newUrl = cdnUrl + url;

	return newUrl
}
Vue.prototype.$imgUrl = imgUrl;
//取设备唯一标识
const device = () => {

	let device = uni.getStorageSync('device')

	return device

}
Vue.prototype.$device = device;

//取token
const token = () => {
	let token = uni.getStorageSync('token')

	return token

}
Vue.prototype.$token = token;

//取rank
const rank = () => {
	let rank = uni.getStorageSync('rank')

	return rank
}
Vue.prototype.$rank = rank;

const app = new Vue({
	...App
})
app.$mount()
