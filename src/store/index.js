import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

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
  },
  plugins: [createPersistedState({
    paths:['databaseRunProjectData']
  })]
})
