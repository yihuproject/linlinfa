// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import cors from 'cors'
import qs from 'qs'
// import VueAMap from 'vue-amap'
import './assets/reset.css'
import'./assets/css/initInput.css'
import './assets/style.styl'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueBetterScroll from 'vue2-better-scroll'
import VueJsonp from "vue-jsonp"
// import AlloyFinger from 'alloyfinger'
// import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'
axios.defaults.withCredentials = false
// axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://47.92.244.60:88'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers = {'Content-Type':'application/x-www-form-urlencoded'}//对象方式传递
// axios.defaults.headers = {'Content-Type':'application/text-plain'}
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(Vant)
Vue.use(VueJsonp)
Vue.use(VueBetterScroll)
// Vue.use(VueAMap)
// VueAMap.initAMapApiLoader({
// 	key:"f41fddd3346f7ec6d561ad285f5aa624",
// 	plugin:['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
// 	v:"1.4.4"
// })

// 
// Vue.use(AlloyFingerPlugin,{
//   AlloyFinger
// })
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
// Vue.prototype.HOST = '/api'
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})