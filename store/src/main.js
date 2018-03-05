// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// let objForEntities = ''
// store.dispatch('INIT_STATE', config).then((res) => {
//   res.json().then((swagger) => {
//     const definitions = swagger.definitions

//     Object.keys(definitions).map((key, index) => {
//       store.state[key] = {}
//       store.state[key].all = []
//       store.state[key].one = {}
//       objForEntities += `${key}_one: {},\n${key}_all: [],\n`
//     })
//     console.log(objForEntities)
//     /* eslint-disable no-new */
//     new Vue({
//       el: '#app',
//       router,
//       store,
//       components: { App },
//       template: '<App/>'
//     })
//   })
// })
