(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-adress-addressList"],{"03a5":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[t._l(t.addressList.list,(function(e,a){return t.addressList.list.length>0?i("v-uni-view",{key:a,staticClass:"userAdressInfo",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.carryAndGo(e)}}},[i("v-uni-view",{staticStyle:{"border-bottom":"2rpx solid #F5F5F5"}},[i("v-uni-view",[i("span",[t._v(t._s(e.contacts))]),i("span",{staticStyle:{"margin-left":"40rpx"}},[t._v(t._s(e.phone))])]),i("v-uni-view",{staticStyle:{margin:"30rpx 60rpx 30rpx 0"}},[t._v(t._s(e.address))])],1),i("v-uni-view",{staticClass:"selectCont"},[i("viwe",[i("v-uni-radio-group",{on:{change:function(n){arguments[0]=n=t.$handleEvent(n),t.radioChange(n,e)}}},[i("v-uni-label",{key:e.index,staticClass:"radio",staticStyle:{display:"flex","align-items":"center"}},[i("v-uni-radio",{attrs:{color:"#FF6351",value:e.index,checked:e.index==t.selectRadio}}),i("v-uni-text",{staticStyle:{"margin-left":"15rpx"}},[t._v("默认地址")])],1)],1)],1),i("v-uni-view",{staticStyle:{display:"flex",color:"#8F8F8F"}},[i("v-uni-view",{staticStyle:{display:"flex","align-items":"center"},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.updataAdress(e)}}},[i("v-uni-image",{staticStyle:{width:"36rpx",height:"36rpx"},attrs:{src:n("c62c"),mode:""}}),i("span",{staticClass:"icontxt"},[t._v("编辑")])],1),i("v-uni-view",{staticStyle:{"margin-left":"50rpx",display:"flex","align-items":"center"},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.delAdress(e)}}},[i("v-uni-image",{staticStyle:{width:"36rpx",height:"36rpx"},attrs:{src:n("6642"),mode:""}}),i("span",{staticClass:"icontxt"},[t._v("删除")])],1)],1)],1)],1):t._e()})),0==t.addressList.list.length?i("v-uni-view",{staticStyle:{"text-align":"center"}},[i("img",{staticClass:"noData",attrs:{src:t.$cdnUrl+"/ShptUapi/static/noaddress.png",alt:""}})]):t._e(),i("v-uni-view",{staticStyle:{height:"150rpx"}}),i("v-uni-view",[i("v-uni-view",{staticClass:"sureBind",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.$u.throttle(t.confirm,1e3)}}},[t._v("新增收货地址")])],1)],2)},s=[]},"06c5":function(t,e,n){"use strict";n("a630"),n("fb6a"),n("d3b7"),n("25f0"),n("3ca3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=s;var i=a(n("6b75"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e){if(t){if("string"===typeof t)return(0,i.default)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?(0,i.default)(t,e):void 0}}},"0f65":function(t,e,n){var i=n("90cf");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("10ba2920",i,!0,{sourceMap:!1,shadowMode:!1})},2909:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=d;var i=o(n("6005")),a=o(n("db90")),s=o(n("06c5")),r=o(n("3427"));function o(t){return t&&t.__esModule?t:{default:t}}function d(t){return(0,i.default)(t)||(0,a.default)(t)||(0,s.default)(t)||(0,r.default)()}},3427:function(t,e,n){"use strict";function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"4c6f":function(t,e,n){"use strict";n.r(e);var i=n("a378"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},6005:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=s;var i=a(n("6b75"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t){if(Array.isArray(t))return(0,i.default)(t)}},6642:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABACAYAAABGHBTIAAAFWElEQVRoQ+1ba2gcVRT+zu3usk1rfWFsSH3URwWtotJCi78ELVYREUqrrRZSyNzZHwqJ1pCq7dY+FGoNRLI7M5tYiAptURCUgkp/qKC1WKygpVi1UQgpSX3HTYo798gts6UNm5ntziRs7Qzsr73n3O+7595zzsw5l3CRPRQF3/7+/lnFYlES0c4o9E3QMcLMHUS0R0pZDKs/EsK9vb1XuK7bAeC5sIAmkd+eSqV2tLS0/BFWfySENQjLsh4UQmxi5qsACAAcEpzGpgCcZOZO0zT3h9R3WjwywtlsVjQ3N2uyCwAkS6WSBlvzk0gk9KL9C+D7wcHBkWw2G0pfGUhkhGtmNs2CFx/hXC53uRBiqRBitl5sZg579qbZZv7TMbMQQpRKpdK3w8PDx8hxnDXMvB5A2hP9XxH2/JQ+/4PM3E2WZe0gomfryixTBIaZX9WEHyaipwE0RxROpghuzWrLfmqciHaQDieNjY03JxKJhUqpBBFF4v5rhhexIBGdJqyUGlVKfXHxeemIF7Tu1cUWrnsThQToa+G+vr5LXNe9XefGo6OjB9vb28dCzjcl4rlc7hYhxHxmPprJZAb8JvElbNv2Q0TUycwpIvownU6/snbt2n+mBHWNSnt6emYnEokuAIsA/MLMO03T/HQydb6EHcfZyMybPeEBZl5mmuaxarBZlvUIES0kom+Y+TMp5Z9+cj09PdfMmDFjGRFdxsyfmKb5VTXzOI6zgJk/AnCdN36jlHJLTYRt294GYIMn/KMQYlVra+uhICCFQuFq13XfI6IlAI4QUYdhGB/4yTmO8yQzvw7gUgC7ATwlpTwZNJdlWYuISI+/0Ru7TUr5Qk2EHcfZwsxl4R+UUiszmczXVYLYC2C+NzYrpSzvlIriE3bTz8y8ohor27Z9N4A9AG7yFG+RUm6cVsKFQmGJUuptADd4E2+WUmb9Fsq2bf3/Jm/McQCPSym/DFrceiUcaOEJhH8CsDomXMHcsYWBujjD8ZaeuDvjMxw7rcoBKnZasdM6d2cEvTzUlFpWyLRiLx176XNz6Ti1nOwlIvbSsZeOvfTkr9i1fvGIwxIQx+E4DsdxOP6mVdG7xolHnHjEiUeceJxZgTjTqr6YtpSIdG2pXEwLrC1ZlrWZiMpFsONCiNWtra0HLojakuM4i5lZVw+v14CJaJNhGC8FFNN0Ia1ccBsQQqyopjRbF2Epn883CyH2AbgDwG9EtN4wjDf8CFuWZRLRawBmAjiUTCaXr1u3buSCsHA2m03MnTt3ORHdC0B/rnlXSjnkB75QKMxTSq0AcC2A/YZh7COiwL7PurBwmVg+n28cGxv7u9pmmF27dqXHx8fnZDKZ4SDLlv+vK8LVgg4zbioJHyOilYZhHA4DMGrZfD5/lxBCO8jIWx6OE9EThmF8HjXoMPry+fw9Qoi3yhEBYXJp27a3AnjeA/QrgJeHhoa6orpwEYaoltWdwE1NTW0AOgFc6YXArYZhvDiZ7qDGtLNjo/aY3zGzUSwWD7e1ten+40AvGpZUJXlmpq6urnRDQ8OdROQAuK18Qyco5gcRNgDo2DjLm1gTPMLMu4noIDOP6zsFU0FqUgsRKSHETKXUYiJ6DMCtZ11HGgXwjJRSL0LFx5ewbvoSQmxn5vsnSOuuOv1zo7z7dB4LpxdZN7Dp35mHiD5WSm3w6+/yJazj4qlTpx4lIn2Wyz1X54FrWof+BWB9KpXqb2lpGa/Jwlqou7t7TjqdfoCZ1wC4D0DDtNKoYjJmPiCEeNN13XeCkpbABnHtIHK53LxkMrmKmVeeFe+qgDItQ35n5vcBOCdOnDgaFEH+A0h8lnLhJPgwAAAAAElFTkSuQmCC"},"67b0":function(t,e,n){"use strict";var i=n("0f65"),a=n.n(i);a.a},"6b75":function(t,e,n){"use strict";function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},7471:function(t,e,n){var i=n("c085");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("41d28adf",i,!0,{sourceMap:!1,shadowMode:!1})},8238:function(t,e,n){"use strict";n.r(e);var i=n("03a5"),a=n("4c6f");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("e4d7"),n("67b0");var r,o=n("f0c5"),d=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"3da97295",null,!1,i["a"],r);e["default"]=d.exports},"90cf":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".selectCont[data-v-3da97295]{height:%?90?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-right:%?60?%;line-height:%?90?%;color:#8f8f8f;font-size:%?26?%}.icontxt[data-v-3da97295]{margin-left:%?10?%;font-size:%?26?%}.iconfont[data-v-3da97295]{font-size:%?36?%}.userAdressInfo[data-v-3da97295]{margin-top:%?20?%;width:100%;\n\t/* height: 250rpx; */background-color:#fff;padding:%?30?% %?30?% 0}.noData[data-v-3da97295]{width:%?445?%;height:%?435?%;margin-top:%?193?%}.sureBind[data-v-3da97295]{width:%?690?%;height:%?90?%;background:#ff6351;border-radius:%?45?%;margin:%?50?% %?30?% 0;line-height:%?90?%;text-align:center;color:#fff;font-size:%?30?%;position:fixed;bottom:%?33?%}",""]),t.exports=e},a378:function(t,e,n){"use strict";var i=n("4ea4");n("99af"),n("d3b7"),n("25f0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("b85c")),s=i(n("2909")),r={data:function(){return{addressList:{list:[]},selectRadio:"",adressInfo:{},oldPage:0,pageIndex:1,conunt:20,oldIndex:""}},onShow:function(){this.pageIndex=1,this.addressList.list=[],this.getAdressList(0)},onLoad:function(t){t.type&&(this.oldPage=t.type,this.oldIndex=t.addressIndex)},onReachBottom:function(){this.pageIndex<this.addressList.page&&(++this.pageIndex,this.getAdressList(0))},onPullDownRefresh:function(){this.pageIndex=1,this.addressList.list=[],this.getAdressList(0)},methods:{carryAndGo:function(t){1==this.oldPage&&(uni.setStorageSync("addressList",t),uni.navigateBack({delta:1}))},radioChange:function(t,e){var n=this;n.adressInfo=e,n.selectRadio=t.detail.value,n.request({url:"ShptUapi/public/index.php/Address/editDefault",data:{index:n.adressInfo.index}}).then((function(t){t.data.success?(uni.showToast({title:"设置成功",icon:"none"}),n.getAdressList(1)):uni.showToast({title:t.data.msg,icon:"none"})}))},getAdressList:function(t){var e=this;this.request({url:"ShptUapi/public/index.php/Address/addressList",data:{page:this.pageIndex,limit:this.conunt}}).then((function(n){if(uni.stopPullDownRefresh(),n.data.success){if(e.addressList.list.length>0&&0==t){e.addressList.list=[].concat((0,s.default)(e.addressList.list),(0,s.default)(n.data.data.list));for(var i=0;i<e.addressList.list.length;i++)e.addressList.list[i].index=e.addressList.list[i].index.toString()}else{e.addressList=n.data.data;for(var r=0;r<e.addressList.list.length;r++)e.addressList.list[r].index=e.addressList.list[r].index.toString()}var o,d=(0,a.default)(e.addressList.list);try{for(d.s();!(o=d.n()).done;){var l=o.value;if(l.default_address){e.selectRadio=l.index;break}}}catch(u){d.e(u)}finally{d.f()}}else uni.showToast({title:n.data.msg,icon:"none"})}))},confirm:function(){uni.navigateTo({url:"addAddress?type=0"})},updataAdress:function(t){uni.navigateTo({url:"addAddress?type=1&item="+JSON.stringify(t)})},delAdress:function(t){t.index==this.oldIndex&&uni.removeStorageSync("addressList");var e=this;e.request({url:"ShptUapi/public/index.php/Address/deleteAddress",data:{index:t.index}}).then((function(t){t.data.success?(uni.showToast({title:t.data.msg,icon:"none"}),e.getAdressList(1)):uni.showToast({title:t.data.msg,icon:"none"})}))}}};e.default=r},b85c:function(t,e,n){"use strict";n("a4d3"),n("e01a"),n("d28b"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=s;var i=a(n("06c5"));function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=(0,i.default)(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var a=0,s=function(){};return{s:s,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o=!0,d=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return o=t.done,t},e:function(t){d=!0,r=t},f:function(){try{o||null==n["return"]||n["return"]()}finally{if(d)throw r}}}}},c085:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-3da97295]{background-color:#f5f5f5}body.?%PAGE?%[data-v-3da97295]{background-color:#f5f5f5}",""]),t.exports=e},c62c:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAkCAYAAAAD3IPhAAAC6UlEQVRYR+2Yy2sTURTGv3PHxI0SaQpuXLb+BRFxJemMtQu19RXTh7gQjLhwKRTBpQiupVZUEMWmk6bdlYD3Jogb0YqruGpWbgJ2IGl3anLkyoyM0jaTTFIQcjeBmfOd+5vvnMzjENwlpTwM4BqAEwAOeMfb+SWivGmaj4NqVldX90ej0RdENMHM90kLpZRpInoC4GDQRDvE1U3TPBQkR7lcjlar1TyAM258jYrF4klmVgAMAAygzMzVIAn9MUTUFELYyWTyWSutbdvRgYGBPBF5IFoyp2HeMLMFoN5oNMZHR0fftkoW5rwGicfjSwDO+vIsOI5zlZRSW7pHmPmhZVl3wmzUSrsbSCqVamgYXRq9Zk3TfNAqYafnXZAcgHO+HFnHcWY0iD62JzDbgRDR4sbGxrQHsicwa2trkc3NzRwzj/scsR3HmfKD9BxGg9RqtRwR/QUihJhOJpM//y15z8qkQer1ug1gwrdpTggxtR1Iz5xxHbH1nTUoSE9gXEcWAZz3QJh5yTCMyZ0c8eK6Wia3WbPMfMHnyJIQoiVIV51xHckC+APCzHnDMNKtHOmqM/Pz85Hh4eEFZr7oK02+UqlMZjKZH0FvlKHLVCqV9jUajSwR/QEBsLy+vp5uByR0mTRIs9lcAHDJd/XLsVgsnUgkAjmilLrMzLeZeTaUM1LKW0T0yAeyEovFrgQF0Tql1HsAxwG8CguTISLvza5tEBfmA4BjAF6HgrFt24jH4zeYOVKpVOba7ZGuwgT9l+wWp5TqjjN9mG44sFOOfpn6zrTbX/2e+S96Rkr5kYgS3rPpG4BBIno+MjJyvd2ah41XSn0FcATAU/2gfAlgBsB3Zh6zLKsUdoOg+mKxeJqZCzqemW9SoVAYikQin90Bkf6w0i9LX9zxSNC8ncQNAsi4MyFHCDHkDYvGiEh/lHc0seqExKfRBqRM01z5DaOXlPIogLsAThGRHqmJkJu0km8x8ycA9yzLeqeDfwEObd8Hez+UcgAAAABJRU5ErkJggg=="},db90:function(t,e,n){"use strict";function i(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}n("a4d3"),n("e01a"),n("d28b"),n("a630"),n("d3b7"),n("3ca3"),n("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},e4d7:function(t,e,n){"use strict";var i=n("7471"),a=n.n(i);a.a}}]);