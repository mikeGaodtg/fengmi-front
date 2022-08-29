import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultPic:'3.jpg',
    orderPic:'blog03.jpg',
    baseUrl:'http://localhost:8081/',
    isLogin:true
  },
  getters: {
  },
  mutations: {
    toggleLogin (state) { // 变更状态 
      state.isLogin=!state.isLogin }
  },
  actions: {
  },
  modules: {
  }
})