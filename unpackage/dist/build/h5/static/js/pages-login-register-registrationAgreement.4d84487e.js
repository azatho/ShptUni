(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-register-registrationAgreement"],{acd0:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{src:""}},onLoad:function(){var t=this;this.request({url:"ShptUapi/public/index.php/UserConsumers/getAgreement",data:{type:"1"}}).then((function(n){e("log",n," at pages/login/register/registrationAgreement.vue:19");var r=n.data.data;t.src=t.$cdnUrl+r.agreement_content,e("log",t.src," at pages/login/register/registrationAgreement.vue:26")}))}};t.default=n}).call(this,n("0de9")["log"])},be90:function(e,t,n){"use strict";n.r(t);var r=n("e776"),a=n("f3a1");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);var u,c=n("f0c5"),o=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"6203b62c",null,!1,r["a"],u);t["default"]=o.exports},e776:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-web-view",{attrs:{src:e.src}})},i=[]},f3a1:function(e,t,n){"use strict";n.r(t);var r=n("acd0"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a}}]);