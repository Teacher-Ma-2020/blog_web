// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios';
import Element from 'element-ui'
import Vuex from 'vuex'



import "element-ui/lib/theme-chalk/index.css"
import "./axios"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './permission.js' // 路由拦截

// import thljs from 'highlight.js';

// import 'highlight.js/styles/atom-one-dark.css' //样式


Vue.use(mavonEditor)
// use
Vue.use(Vuex)
Vue.use(Element)

Vue.prototype.$http=axios;
Vue.config.productionTip = false



Vue.directive('highlight',function(el){
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })

})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})






