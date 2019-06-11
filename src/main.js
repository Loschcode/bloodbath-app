// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link'; // concat
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { withClientState } from 'apollo-link-state'
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities'

import Vue from 'vue';

import VueApollo from 'vue-apollo';
import App from './App';
import router from './router';
import store from './store';

import _ from 'lodash';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';
import VueMeta from 'vue-meta';
import VueNoty from 'vuejs-noty';
import VueAnalytics from 'vue-analytics';

import IdleService from '@/services/IdleService';

import AnimatedNumber from '@/mixins/AnimatedNumber';

// NOTE : to reset users or memory
// just uncomment this line
// localStorage.clear()

// Global configuration
Vue.config.productionTip = false

const isProd = process.env.NODE_ENV === 'production';

const httpLink = new HttpLink({
  uri: process.env.GRAPHQL_ENDPOINT
})

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      token: localStorage.getItem('userToken') || null
    }
  })
  return forward(operation)
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  link:              ApolloLink.from([authMiddleware, httpLink]),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient:  apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

// ActionCable configuration
// Configuration is made on connection
// Because for this project we don't
// any connection out of token

// Axios configuration
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)

console.log('Environment : ' + process.env.NODE_ENV)
console.log('Api : ' + process.env.API)

// Api end point
Vue.axios.defaults.baseURL = process.env.API

// VueCookie configuration
Vue.use(VueCookie)

// VueMeta
Vue.use(VueMeta)

// NotyJS
Vue.use(VueNoty, {
  theme:       'mint',
  timeout:     1000,
  progressBar: true,
  layout:      'topRight'
})

Vue.use(VueAnalytics, {
  id:    'UA-115751020-1',
  router,
  debug: {
    enabled:     !isProd,
    sendHitTask: isProd
  }
})

// Idle management
new IdleService().start()

// VueRouter
// Vue.use(Router)

// VueMeta
// Vue.use(Meta)

// Mixins
Vue.mixin(AnimatedNumber)

/* eslint-disable no-new */
new Vue({
  el:         '#app',
  apolloProvider,
  router,
  store,
  template:   '<App/>',
  components: { App },

  created () {
    axios.interceptors.request.use(config => {
      /**
       * if the token isn't already present we add it up to the system
       * we also keep the other data by merging the objects
       */
      config.params = _.merge(
        { token: this.$store.getters.getUserToken },
        config.params
      )
      return config
    })

    // axios.interceptors.response.use((response) => {
    //   return response
    // })
  }
})
