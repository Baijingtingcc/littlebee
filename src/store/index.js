import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import homePage from './modules/homePage'
import getters from './getter'
import invoice from './modules/invoice'
import editPage from './modules/editPage'
import reservoir from './modules/reservoir'
import outbound from '@/store/modules/outbound'
import CheckDetails from '@/store/modules/CheckDetails'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  mutations: {},
  actions: {},
  modules: {
    login,
    homePage,
    invoice,
    editPage,
    reservoir,
    outbound,
    CheckDetails
  }
})
