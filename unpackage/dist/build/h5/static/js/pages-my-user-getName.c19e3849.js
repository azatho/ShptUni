(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-user-getName"],{5154:function(t,e,n){"use strict";var i=n("aeaf"),a=n.n(i);a.a},9259:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"userlist"},[n("v-uni-view",{staticStyle:{"font-size":"26rpx"}},[t._v("昵称:")]),n("v-uni-view",{staticStyle:{flex:"1"}},[n("v-uni-input",{staticStyle:{"font-size":"26rpx"},attrs:{type:"text",value:t.name,maxlength:"8",placeholder:"请输入昵称~"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.getName.apply(void 0,arguments)}}})],1)],1),n("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirm.apply(void 0,arguments)}}},[t._v("确定")])],1)},o=[]},aeaf:function(t,e,n){var i=n("b223");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("9f38993e",i,!0,{sourceMap:!1,shadowMode:!1})},b223:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".userlist[data-v-28447c61]{display:-webkit-box;display:-webkit-flex;display:flex;padding:%?20?% %?30?%;width:100%;height:%?80?%;line-height:%?80?%;font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#333;border-bottom:%?1?% solid #f5f5f5}.userlist uni-input[data-v-28447c61]{width:100%;height:%?80?%;line-height:%?80?%;margin-left:%?10?%}.btn[data-v-28447c61]{margin:%?500?% %?30?% 0;height:%?90?%;line-height:%?90?%;text-align:center;background:#f6281b;border-radius:45px;font-size:%?30?%;font-family:PingFang SC;font-weight:500;color:#fff}",""]),t.exports=e},b87a:function(t,e,n){"use strict";n.r(e);var i=n("9259"),a=n("c6eb");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("5154");var u,s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"28447c61",null,!1,i["a"],u);e["default"]=r.exports},c6eb:function(t,e,n){"use strict";n.r(e);var i=n("fa2b"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},fa2b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{name:""}},methods:{getName:function(t){this.name=t.detail.value},confirm:function(){var e=this;""==this.name?uni.showToast({title:"昵称不能为空~",icon:"none"}):e.request({url:"ShptUapi/public/index.php/UserConsumers/user_edit",data:{device:this.$device(),name:e.name}}).then((function(t){t.data.success?(uni.showToast({title:t.data.msg,icon:"none"}),setTimeout((function(){uni.navigateBack({url:"./userInfo"})}))):uni.showToast({title:t.data.msg,icon:"none"})}),(function(e){t("log",e," at pages/my/user/getName.vue:63")}))}},onLoad:function(e){this.name=e.name,t("log",e.name," at pages/my/user/getName.vue:70")}};e.default=n}).call(this,n("0de9")["log"])}}]);