// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Utils from './assets/script/utils.js'
import Axios from 'axios'
import './assets/style/icon.css'
import $ from 'jquery'

import moment from 'moment'
import Global_ from './components/Global'
import MenuUtils from '@/utils/MenuUtils'
import promise from 'es6-promise';
promise.polyfill();
import 'url-search-params-polyfill'


// import fontawesome from '@fortawesome/fontawesome'
// import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
// import solid from '@fortawesome/fontawesome-free-solid'
// import regular from '@fortawesome/fontawesome-free-regular'
// import brands from '@fortawesome/fontawesome-free-brands'

// import FontIcon from './components/FontIcon.vue';

Vue.config.productionTip = false

// fontawesome.library.add(solid)
// fontawesome.library.add(regular)
// fontawesome.library.add(brands)

// Vue.prototype.$ELEMENT = { size: 'small' };
// Vue.component(Button.name, Button);
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$http = Axios;
Vue.prototype.$moment = moment;//日期格式化控件
Vue.prototype.GLOBAL = Global_;
// Vue.prototype.$utils = Utils;
// Vue.component('font-awesome-icon', FontAwesomeIcon);
// Vue.component('FontIcon', FontIcon);

/* eslint-disable no-new */

// http request 请求拦截器，有token值则配置上token值
Axios.interceptors.request.use(
  config => {
    var userStr = sessionStorage.getItem("user");
    if (userStr) {
      var user = JSON.parse(userStr);
      if (user && user.token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers.Authorization = "Bearer " + user.token;
        config.headers['Content-Type'] = "application/x-www-form-urlencoded";
        config.headers['Accept']='application/json';
      }
    }

    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            } //登录成功后跳入浏览的当前页面
          })
        case 500:
          // router.replace({
          //   path: '/login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   } //登录成功后跳入浏览的当前页面
          // })
      }
    }
    return Promise.reject(error.response.data)
  }
);
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

//在main.js内
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);


let data = JSON.parse(window.sessionStorage.getItem('menu'))
if (data){
  //这里是防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以我们重新add一次
  let routes = []
  MenuUtils(routes,data)
  router.addRoutes(routes)
  window.sessionStorage.removeItem('isLoadNodes')
}
router.beforeEach((route, redirect, next) => {
  let data = JSON.parse(window.sessionStorage.getItem('menu'))
  if(data&&route.path === '/login'){
    //这里不使用router进行跳转，是因为，跳转到登录页面的时候，是需要重新登录，获取数据的，这个时候，会再次向router实例里面add路由规则，
    //而next()跳转过去之后，没有刷新页面，之前的规则还是存在的，但是使用location的话，可以刷新页面，当刷新页面的时候，整个app会重新加载
    //而我们在刷新之前已经把sessionStorage里的user移除了，所以上面的添加路由也不行执行
    window.sessionStorage.removeItem('menu')
    window.sessionStorage.removeItem('isLoadNodes')
    window.location.href = '/'
    return false
  }
  if (!data && route.path !== '/login') {
    next({ path: '/login' })
  } else {
    if (route.path) {
      next()
    } else {
      next({ path: '/nofound' })
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
