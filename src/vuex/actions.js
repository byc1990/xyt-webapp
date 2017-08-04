/**
 * @module vuex/actions
 */
export default {
  /**
   * Mutate the temporary data to a new object
   * @param commit
   * @param {object} newSet
   * @example store.dispatch('temporaryData',object)
   */
  toggleSideMenu({ commit }) {
    commit('toggleSideMenu')
  },
  toggleOverlay({ commit }) {
    commit('toggleOverlay')
  },
  currentUserInfo({ commit }, newSet) {
    commit('currentUserInfo', newSet)
  },
}
