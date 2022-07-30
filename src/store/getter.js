const getters = {
  todos: state => state.login.todoInformation,
  tags: state => state.homePage.mainTagList,
  pageList: state => state.invoice.pageList,
  currList: state => state.editPage.currList,
  current: state => state.reservoir.currtentRes
}
export default getters
