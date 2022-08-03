export default {
  namespaced: true,
  state: {
    currtentMasterID: ''
  },
  mutations: {
    sureEdit(state, palyad) {
      state.currtentMasterID = palyad
    }
    // close(state) {
    //   state.currtentMasterID = ''
    // }
  },
  actions: {}
}
