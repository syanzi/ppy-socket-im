import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import * as filters from "./common/filters"; // 全局过滤器
import * as hdwlStore from "./utils/auth";

import "normalize.css/normalize.css"; // a modern alternative to CSS resets

import ElementUi from "element-ui";
import "./lib/css/element-variables.scss";

import "./lib/css/base.scss";
import "./icons"; // icon

Vue.use(ElementUi, { size: "medium" });

import Bmob from "hydrogen-js-sdk";
 Bmob.initialize("502deacedcc8c37c7fa0e0613b7bf443", "758ef5187183e8ca7b28e1e3e4e1912e"); //第一个
// Bmob.initialize("0d5b23e295eec928d22527883466a2b5", "239dbd2b48b3974fb93fefa5563de07b"); //第二个
// Bmob.initialize("fa492d7074e8781d08594bf3a40f0572", "5d4269b47fa2fcc79b65fee9440544ee"); //第三个


import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import "./role";
import "./common/directives";

Vue.prototype.Bmob = Bmob;
Vue.prototype.$ppyStore = hdwlStore;


Vue.config.productionTip = false;
// 注册全局实用程序过滤器（register global utility common）.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

