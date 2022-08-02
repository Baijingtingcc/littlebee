export default {
  namespaced: true,
  state: {
    Outcurrtent: [],
    currentEditId: ''
  },
  mutations: {
    editOutbound(state, palyad) {
      state.Outcurrtent = palyad
      console.log(state.Outcurrtent)
    },
    editCurrent(state, palyad) {
      state.currentEditId = palyad.id
    },
    closeCurrentId(state) {
      state.currentEditId = ''
    }
  },
  actions: {}
}
