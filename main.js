import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
//挂在全局方法
import config from "./common/config.js"
Vue.prototype.config=config

import lib from "./common/lib.js"
Vue.prototype.lib=lib

import request from "./common/request.js";
Vue.prototype.$http = request;

import chat from "./common/chat.js";
Vue.prototype.$chat = chat;

import User from "./common/user.js"
Vue.prototype.User = User
// 引入全局组件
import divider from "./components/common/divider.vue";
Vue.component("divider",divider);
import noThing from "./components/common/no-thing.vue";
Vue.component("no-thing",noThing);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
