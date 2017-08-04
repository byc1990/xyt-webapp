/**
 * @module vuex/getters
 */
export default {
  /**
   * Get the state for temporary data what you had store
   * @param state - from vuex/state
   * @example let state = store.getters.temporaryData
   */
  getSideMenu: (state) => { return state.isSideActive },
  getOverlay: (state) => { return state.isOverlay },
  currentUserInfo: (state) => { return state.currentUserInfo },
}
