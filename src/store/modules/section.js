import { getSectionAll } from '@/api/section'

const state = {
  sections: []
}

const getters = {
  sectionEnumFormat: (state) => (key) => {
    for (const item of state.sections) {
      if (item.id === key) {
        return item.name
      }
    }
    return null
  }
}

const actions = {
  initSection({ commit }, action) {
    getSectionAll().then(re => {
      commit('setSections', re.data)
      if (action !== undefined) {
        action()
      }
    })
  }
}

const mutations = {
  setSections: (state, sections) => {
    state.sections = sections
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
