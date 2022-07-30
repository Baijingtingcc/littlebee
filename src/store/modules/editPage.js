import {
  getWarehouseForm
} from '@/api/warehouse'
export default {
  namespaced: true,
  state: {
    currList: {}
  },
  mutations: {
    editCurrent(state, palyad) {
      state.currList = palyad
    }
  },
  actions: {
    async editWareHouse(context, palyad) {
      const {
        data
      } = await getWarehouseForm(palyad)
      context.commit('editCurrent', data.data)
    }
  }
}
