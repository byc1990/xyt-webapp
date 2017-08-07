import axios from 'axios'
import Vue from 'vue'
// import MintUI from 'mint-ui'

import Moment from 'moment'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import 'vue2-animate/src/vue2-animate.less'
import { ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import App from './App.vue'
import routes from './routes'
import store from './vuex/store'
import './assets/sass/screen.scss'
// import fnMixin from './assets/js/fn-mixins'

const _ = require('lodash')

Moment.locale('zh-CN')

const APP_ID = 'OS0xhC73XUcUgL4aFtX40SbV-gzGzoHsz'
const APP_KEY = 'HtkKwqncPMW8hHaNGCkfFs3U'
const AV = require('leancloud-storage')

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
})
_.assign(window, {
  AV,
  Vue,
  store,
  Moment,
  axios,
  rtpToken: null,
  userToken: null,
  currentUser: null,
})
const vueInit = () => {
  Vue.use(VueRouter)
  Vue.use(ToastPlugin)
  Vue.use(AlertPlugin)
  Vue.use(ConfirmPlugin)
  Vue.use(LoadingPlugin)
  // Vue.use(MintUI)

  // axios.defaults.baseURL = 'https://api.github.com'
  // axios.defaults.baseURL = globalArg.apiUrl
  // axios.defaults.headers.common['authorization'] = window.userToken || ''
  const router = new VueRouter({
    // mode: 'history',
    routes,
  })
  sync(store, router)

  Vue.config.devtools = true
  const app = new Vue({
    store,
    router,
    render: (h) => { return h(App) },
  }).$mount('App')
  _.assign(window, {
    app,
  })
  router.afterEach(() => {
    store.state.isSideActive = false
  })
}

vueInit()

