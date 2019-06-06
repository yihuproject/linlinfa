// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import VueJsonp  from 'vue-jsonp'
import qs from 'qs'
import './assets/reset.css'
import'./assets/css/initInput.css'
import './assets/style.styl'
import Vant from 'vant'
import 'vant/lib/index.css'
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: '2KrGibP5ES5RSW38Rq3O0w01u5vUncXQ'
// })
// import VueAMap from 'vue-amap'
import VueBetterScroll from 'vue2-better-scroll'
axios.defaults.withCredentials = false
axios.defaults.baseURL = 'http://47.111.27.189:88'
axios.defaults.headers = {'Content-Type':'application/x-www-form-urlencoded'}//对象方式传递
Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(VueJsonp)
// Vue.use(VueAMap)
Vue.use(VueBetterScroll)
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

// console.log(VueAMap.AMapManager);
// VueAMap.initAMapApiLoader({
//   key: 'cc057120de66c43f0499244a1a187e0c',
//   plugin: [
//     'AMap.Autocomplete',
//      'AMap.PlaceSearch', 
//      'AMap.Scale', 
//      'AMap.OverView',
//       'AMap.ToolBar', 
//       'AMap.MapType',
//        'AMap.PolyEditor',
//         'AMap.CircleEditor',
//         ],
//   v: '1.4.4',
//   uiVersion: '1.0.11' // 版本号
// });

// Vue.prototype.HOST = '/api'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})