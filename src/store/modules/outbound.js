export default {
  namespaced: true,
  state: {
    Outcurrtent: []
  },
  mutations: {
    editOutbound(state, palyad) {
      state.Outcurrtent = palyad
      console.log(state.Outcurrtent)
    }
  },
  actions: {}
}
