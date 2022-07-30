import {
  getBacklog
} from '@/api/user'
export default {
  namespaced: true,
  state: {
    // token: getToken()
    // 待办信息
    todoInformation: {}
  },
  mutations: {
    onTodoInformation(state, palyad) {
      state.todoInformation = palyad
    }
  },
  actions: {
    async getTodo(context) {
      const res = await getBacklog()
      console.log(res)
      context.commit('onTodoInformation', res.data.data)
    }
  }
}
