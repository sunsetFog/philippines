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

// Vue.prototype.$domain = 'https://api.platform.com';
Vue.prototype.$domain = 'http://10.1.101.120:9999';
Vue.prototype.$means = globalMeans;
Vue.prototype.$url = url;



import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
      sessionStorage.removeItem('token');
  }
  let user = sessionStorage.getItem('token');
  let beforeRouterArr = ['/login'];
    if (!user && beforeRouterArr.indexOf(to.path)==-1) {
      next({path: '/login'})
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
