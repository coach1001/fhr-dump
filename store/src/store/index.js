// src/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import entities from '../../static/entities.js'
import config from '../../static/config.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    loading: false,
    base: config.API_BASE,
    adBase: config.AUTH_AD,
    ...entities
  },
  mutations: {
    SET_ARRAY: (state, query) => {
      state[`${query.entity}_all`] = query.data
    },
    SET_ONE: (state, query) => {
      state[`${query.entity}_one`] = query.data
    },
    SET_URLS: (state, query) => {
      state.base = query.API_BASE
      state.adBase = query.AUTH_AD
    },
    SET_USER: (state, query) => {
      state.user = query
    }
  },
  actions: {
    // INIT_STATE: ({commit, state}, config) => {
    //   commit('SET_URLS', config)
    //   return fetch(state.base)
    // },
    FETCH_ARRAY: async ({commit, state}, query) => {
      let param = ''
      if (query.params == null) {
        param = ''
      } else {
        if (query.params.length > 0) {
          param += '?'
          query.params.map((p) => {
            param += `${p.field}=${p.operator}.${p.value}`
            param += '&'
          })
          param = param.slice(0, -1)
        }
      }
      const entityRef = await fetch(`${state.base}${query.entity}${param}`)
      const entityData = await entityRef.json()
      commit('SET_ARRAY', {
        data: entityData,
        entity: query.entity
      })
    },
    FETCH_ONE: async ({commit, state}, query) => {
      const entityRef = await fetch(`${state.base}${query.entity}?id=eq.${query.id}`)
      const entityData = await entityRef.json()
      commit('SET_ONE', {
        data: entityData[0],
        entity: query.entity
      })
    },
    ACTION_ARRAY: async ({commit, dispatch, state}, query) => {
      let requests = _(state[query.entity].all).differenceBy(query.data, 'id').value()
      requests.map((request) => {
        request.__action__ = 'DELETE'
      })
      query.data.map((row) => {
        if (row.id) {
          requests.push({...row, __action__: 'PATCH'})
        }
      })
      query.data.map((row) => {
        if (!row.id) {
          requests.push({...row, __action__: 'POST'})
        }
      })
      await Promise.all(requests.map(async request => {
        let action = request.__action__
        let param = ''
        if (action !== 'POST') {
          param = `?id=eq.${request.id}`
        }
        delete request.__action__
        let requestConfig = {
          method: action,
          body: JSON.stringify(request),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        await fetch(`${state.base}${query.entity}${param}`, requestConfig)
      }))
    },
    ACTION_ONE: async ({commit, dispatch, state}, query) => {
      let param = ''
      let requestConfig = {
        method: query.action,
        body: JSON.stringify(query.data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      if (query.action !== 'POST') {
        param = `?id=eq.${query.data.id}`
      }
      await fetch(`${state.base}${query.entity}${param}`, requestConfig)
      if (query.action === 'DELETE') {
        commit('SET_ONE', {}, query.entity)
      }
    },
    LOGIN_AD: async ({commit, dispatch, state}, query) => {
      let body = {
        email: query.email,
        pass: query.password
      }
      let requestConfig = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      body.email = query.email
      body.pass = query.password
      try {
        const authRef = await fetch(`${state.adBase}`, requestConfig)
        const authObj = await authRef.json()
        console.log(authObj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  getters: {
    loading: state => { return state.loading },
    dashboardProjects: state => { return state.view_dashboard_projects_all }
  }
})

export default store
