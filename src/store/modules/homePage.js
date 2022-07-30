import {
  Message
} from 'element-ui'
export default {
  namespaced: true,
  state: {
    mainTagList: []
  },
  mutations: {
    setTags(state, palyad) {
      if (JSON.stringify(state.mainTagList).indexOf(JSON.stringify(palyad)) === -1) {
        state.mainTagList.push(palyad)
      } else {
        Message({
          message: '你已经在当前页面了,请不要重复点击哦',
          type: 'warning'
        })
        return
      }
      console.log(state.mainTagList)
    },
    editTags(state, palyad) {
      state.mainTagList = state.mainTagList.filter(item => item.id !== palyad.id)
    }
  },
  actions: {}
}
