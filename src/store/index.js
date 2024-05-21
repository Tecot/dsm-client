import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    databaseRunProjectData: '',
    contigDetailData: '',
  },

  getters: {
  },

  mutations: {
    SET_DATABASE_RUN_PROJECT_DATA(state, payload) {
      state.databaseRunProjectData = payload
    },
    SET_CONTIG_DETAIL_DATA(state, payload) {
      state.contigDetailData = payload
      console.log(state.contigDetailData)
    }
  },

  actions: {
    setDatabaseRunProjectData(context, payload) {
      context.commit('SET_DATABASE_RUN_PROJECT_DATA', payload)
    },
    setContigDetailData(context, payload) {
      context.commit('SET_CONTIG_DETAIL_DATA', payload)
    }
  },

  modules: {
  },

  plugins: [
    createPersistedState(
      {
        paths:[
          'databaseRunProjectData', 
          'contigDetailData'
        ]
      }
    )
]
})
