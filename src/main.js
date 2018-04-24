import Vue from 'vue'
import Vuex from 'vuex'
import page from 'page'
import axios from 'axios'
import routes from './router/routes'


// axios.defaults.baseURL = 'http://192.168.29.79:8005'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.axios = axios
Vue.prototype.page = page
Vue.config.productionTip = false
Vue.use(Vuex)

axios.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  // config.data.unionsCode= '500';

  return config;
},(error) =>{
  _.toast("错误的传参", 'fail');
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  const data = response.data
  return data
},(error) =>{
});

const curCode = {
  state: {
    code: 1
  },
  mutations:{
    changeCode(state,newCode){
      state.code = newCode
    }
  }
}
const store = new Vuex.Store({
  modules: {
    curCode
  }
})
/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  store,
  data: {
    ViewComponent: { render: h => h('div', 'loading...') }
  },
  render (h) { return h(this.ViewComponent) }
})
routes.forEach(route => {
  const Component = route.component
  page(route.path, () => {
    app.ViewComponent = Component
    document.title=route.title
  })
})
page({
  hashbang : true
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
