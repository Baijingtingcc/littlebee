import {
  getPageDetail
} from '@/api/warehouse'
export default {
  namespaced: true,
  state: {
    pageList: {}
  },
  mutations: {
    editPageList(state, palyad) {
      state.pageList = palyad
    }
  },
  actions: {
    async getPageDetail(context) {
      const {
        data: {
          data
        }
      } = await getPageDetail()
      context.commit('editPageList', data.records)
      console.log(data)
    }
  }
}
