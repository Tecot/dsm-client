import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    databaseRunProjectData: ''
  },
  getters: {
  },
  mutations: {
    setDatabaseRunProjectData(state, data) {
      state.databaseRunProjectData = data
    }
  },
  actions: {
  },
  modules: {
  }
})
