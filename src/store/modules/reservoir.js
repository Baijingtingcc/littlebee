import {
  getCurrent
} from '@/api/reservoir'
export default {
  namespaced: true,
  state: {
    currtentID: ''
  },
  mutations: {
    edit(state, palyad) {
      state.currtentID = palyad
    },
    closeId(state) {
      state.currtentID = null
    }
  },
  actions: {

  }
}
