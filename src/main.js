import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import moment from 'moment'
import { request } from "./network/request";
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
  loading:require('./assets/imgLoading.png')
})

Vue.prototype.$request=request
axios.defaults.baseURL='/api'
Vue.prototype.axios=axios
Vue.config.productionTip = false
Vue.filter('playnum',function(value){
  let x=value
 if(value>100000){
   x=(value/10000).toFixed(1)+`万`
 }
 return x
})
Vue.filter('timeFormat',function (time) {
      var m =parseInt(time/60000)
      var s = Math.round(time/1000 % 60)
  if(m<10){
    m='0'+m
  }
  if (s < 10) {
    s = "0" + s;
  }
  return `${m}:${s}`
})
Vue.filter('dateFormat',function(time){
    return moment(time).format('YYYY-MM-DD')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
