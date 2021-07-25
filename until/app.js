// 测试
const baseUrl = 'http://test.jianyunkeji.net/';
const cdnUrl = 'http://cdn.jianyunkeji.net/'; 

 
// 正式
/* const baseUrl = 'https://app.jianyunkeji.cn/';
const cdnUrl = 'http://cdn.jianyunkeji.cn/';  */

const request = function(options) {
    options.data = options.data || {}
    if (!options.data.token) {
        options.data.token = this.$token();
    }
    if (!options.data.device) {
        options.data.device = this.$device();
    }
    return new Promise((res, rej) => {
        uni.request({
            url: baseUrl + options.url,
            data: options.data,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: options.type || 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.data.msg == '登录状态失效，请重新登录~！') {
                    console.log(baseUrl + options.url)
                    uni.removeStorageSync('token')
                }
                // if(data.data.cmd=='popup_to_login'){
                // 	uni.clearStorageSync()
                // }
                if (data.data.msg == '你的账号已在别处登录，请重新登录~！') {
                   // uni.navigateTo({
                   //     url:'/pages/login/welcome/welcome'
                   // })
                   uni.removeStorageSync('token')
                }
                res(data);
            },
            fail: function(data) {
                rej(data)
            }
        })
    })
}

const formatTime = date => {
    date = new Date(date * 1000);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(
        ':')
}

const formatdate = date => {
    date = new Date(date);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-');
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


const fmoney = (s, n) => {
    n = 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    // s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + '';  
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
//获取某一天的时间 day:0 代表今天 1 代表明天
const getDay = function(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
};
const doHandleMonth = function(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
};
export {
    request,
    cdnUrl,
    baseUrl,
    formatTime,
    formatdate,
    fmoney,
    getDay,
    // unipay
}
