import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geoInfoData: '',
    databaseRunProjectData: '',
    contigDetailData: '',
  },

  getters: {
  },

  mutations: {
    SET_GEO_INFO_DATA(state, payload) {
      state.geoInfoData = payload
    },
    SET_DATABASE_RUN_PROJECT_DATA(state, payload) {
      state.databaseRunProjectData = payload
    },
    SET_CONTIG_DETAIL_DATA(state, payload) {
      state.contigDetailData = payload
    }
  },

  actions: {
    setGeoInfoData(context, payload) {
      context.commit('SET_GEO_INFO_DATA', payload)
    },
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
          // 'geoData',
          'databaseRunProjectData', 
          'contigDetailData'
        ]
      }
    )
]
})
