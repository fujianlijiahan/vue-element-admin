const save = {
  state: {
    saveDisabled: false
  },
  mutations: {
    setSaveDisabled: (state, saveDisabled) => {
      state.saveDisabled = saveDisabled
    }
  },
  actions: {
    setSaveDisabledActions({ commit }, saveDisabled) {
      commit('setSaveDisabled', saveDisabled)
    }
  }
}
export default save
