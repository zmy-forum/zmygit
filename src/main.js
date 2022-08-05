import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import qs from 'qs'
import Vant from 'vant/es'
import 'vant/lib/index.css'

Vue.use(Vant)
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);
import Mui from 'vue-awesome-mui';
Vue.use(Mui);  //监听手机返回键
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI); //两个ui框架
Vue.prototype.$http=axios
//axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
Vue.prototype.$qs = qs;

import "lib-flexible/flexible"
import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
 
// // 禁止浏览器前进后退 另一部本在router的index.js中
// window.addEventListener('popstate', function() {
//   history.pushState(null, null, document.URL)
// })
