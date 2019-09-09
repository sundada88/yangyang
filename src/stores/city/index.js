const state = {
  nm: window.localStorage.getItem('cityName') || '北京',
  id: window.localStorage.getItem('cityId') || 1
}
const actions = {

}
const mutations = {
  CITY_INFO (state, payload) {
    state.nm = payload.nm
    state.id = payload.id
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
