/**
 * Created by PetitKero on 30/9/2016.
 */
const mutations = {
  toggleSideMenu(state) {
    state.isSideActive = !state.isSideActive
  },
  toggleOverlay(state) {
    state.isOverlay = !state.isOverlay
  },
  currentUserInfo(state, newSet) {
    state.currentUserInfo = newSet
  },
}

export default mutations
