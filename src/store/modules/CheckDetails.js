export default {
  namespaced: true,
  state: {
    currtentMasterID: ''
  },
  mutations: {
    edit(state, palyad) {
      state.currtentMasterID = palyad
    },
    close(state) {
      state.currtentMasterID = ''
    }
  },
  actions: {}
}
