// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from './router'
import axios from 'axios';
import url from './api/url.js';
import globalMeans from './public/index.js';
import 'babel-polyfill'
Vue.config.productionTip = false
// es6Promise .polyfill();
Vue.use(iView);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import cache from './vuex/vuex.js';
Vue.prototype.$cache = cache;

// https://www.cnblogs.com/zhaojunhao/p/9622299.html
//md5加密-type是字符串
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

Vue.prototype.$domain = 'http://10.1.101.120:9999';
Vue.prototype.$means = globalMeans;
Vue.prototype.$url = url;

import recharge from './components/recharge.vue';
import withdrawal from './components/withdrawal.vue';
import manageBank from './components/manageBank.vue';
import addBank from './components/addBank.vue';
import manageAlipay from './components/manageAlipay.vue';
import addAlipay from './components/addAlipay.vue';
import withdrawalPassword from './components/withdrawalPassword.vue';
import know from './components/know.vue';
import mail from './components/mail.vue';
import notice from './components/notice.vue';
import pagination from './components/pagination.vue';
import consult from './components/consult.vue';
import loginPassword from './components/loginPassword.vue';
import gameTheme from './components/game_theme.vue';
import safeDeposit from './components/safeDeposit.vue';
Vue.component('recharge',recharge);
Vue.component('withdrawal',withdrawal);
Vue.component('manageBank',manageBank);
Vue.component('addBank',addBank);
Vue.component('manageAlipay',manageAlipay);
Vue.component('addAlipay',addAlipay);
Vue.component('withdrawalPassword',withdrawalPassword);
Vue.component('know',know);
Vue.component('mail',mail);
Vue.component('notice',notice);
Vue.component('pagination',pagination);
Vue.component('consult',consult);
Vue.component('loginPassword',loginPassword);
Vue.component('gameTheme',gameTheme);
Vue.component('safeDeposit',safeDeposit);


import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let routeScreen = ['/login','/neutralgear'];
    if (to.path == '/login') {
        sessionStorage.removeItem('token');
    }else if(routeScreen.indexOf(to.path)==-1&&from.path == '/'){
        next({path: '/neutralgear'});
    }

    let user = sessionStorage.getItem('token');
    let beforeRouterArr = ['/login'];
    if (!user && beforeRouterArr.indexOf(to.path)==-1) {
        next({path: '/login'});
    } else {
        NProgress.start();
        next()
    }
}); 
router.afterEach(transition => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
