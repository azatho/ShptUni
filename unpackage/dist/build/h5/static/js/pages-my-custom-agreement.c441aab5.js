(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-custom-agreement"],{"0f71":function(t,n,r){var e=r("6141");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var a=r("4f06").default;a("83713702",e,!0,{sourceMap:!1,shadowMode:!1})},"40fd":function(t,n,r){"use strict";var e=r("0f71"),a=r.n(e);a.a},6141:function(t,n,r){var e=r("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-page-body[data-v-76655242]{background-color:#f5f5f5}.agreement[data-v-76655242]{padding:%?30?%;font-size:%?26?%;font-family:PingFang SC;font-weight:500;color:#333}.agreement uni-image[data-v-76655242]{width:%?17?%;height:%?32?%;float:right}body.?%PAGE?%[data-v-76655242]{background-color:#f5f5f5}',""]),t.exports=n},"618a":function(t,n,r){"use strict";var e;r.d(n,"b",(function(){return a})),r.d(n,"c",(function(){return i})),r.d(n,"a",(function(){return e}));var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticStyle:{"background-color":"#fff"}},[e("v-uni-view",{staticStyle:{width:"100%",height:"20rpx",background:"rgba(245,245,245,1)"}}),t._l(t.list,(function(n,a){return[e("v-uni-view",{key:a+"_0",staticClass:"agreement",staticStyle:{"border-bottom":"1rpx solid #f5f5f5"},on:{click:function(r){arguments[0]=r=t.$handleEvent(r),t.registerAgreement(n.agreement_content,n.agreement_title)}}},[t._v(t._s(n.agreement_title)),e("v-uni-image",{attrs:{src:r("8f2a"),mode:""}})],1)]}))],2)},i=[]},"8f2a":function(t,n){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAbCAQAAADmWnZyAAABWklEQVQoz33SyyuEYRTH8XdMijRliIyFySUkO8VGyh9gqZRsWChZoCwMRVGUZDFEJDuXyUKxEaXcMnO+z6tZaCymNG7FxDDGZUpYe+fJs/10Tuf8zmMY/z3pZMVsO8nUIpskODht9Nk1qHq4IMkO9Rrez5Z2wiTZktofWwofOaSbCJ+yKtUaPnTSxxXvLFOp4fMc1c8NCRb95ZrB/LkM8UBceU23hgMFjPNEjEmzULdzEVPE5FHGjvM1bLplhlfuZdCfq6suZYE4t+KRilS1nVbJHt88KG+K/dhpVAG+CInHQj57oEHt8kGQ5kPnHxpJo45tlZSQar3M+NvQpmrUhvokLB3BLAtJtazyQYSuI4eVKtQSb3Ktes+yrScvY45X7gIDKcubbvHyQlQNm3nWTFxM8kyMCVzW31fCKFGJi+5UMk2UhMz7i3VBr/Msa7qQDcOQFmZVE+k6+wX8M8l32GpG9gAAAABJRU5ErkJggg=="},b8bf:function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{list:[]}},methods:{init:function(){var t=this;t.request({url:"ShptUapi/public/index.php/UserConsumers/agreementList",data:{}}).then((function(n){t.list=n.data.data}))},registerAgreement:function(t,n){uni.navigateTo({url:"common?src="+t+"&title="+n})}},onShow:function(){this.init()}};n.default=e},c72d:function(t,n,r){"use strict";r.r(n);var e=r("b8bf"),a=r.n(e);for(var i in e)"default"!==i&&function(t){r.d(n,t,(function(){return e[t]}))}(i);n["default"]=a.a},f7b1:function(t,n,r){"use strict";r.r(n);var e=r("618a"),a=r("c72d");for(var i in a)"default"!==i&&function(t){r.d(n,t,(function(){return a[t]}))}(i);r("40fd");var o,u=r("f0c5"),c=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,"76655242",null,!1,e["a"],o);n["default"]=c.exports}}]);