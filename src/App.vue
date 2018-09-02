<template>
  <div id="app">
    <connect-routing />
  </div>
</template>

<script>
import ConnectRouting from '@/components/ConnectRouting'

export default {
  name: 'app',
  data () {
    return {}
  },

  created () {
  },

  metaInfo: {
    title: 'Bloodbath - Crypto Weather & Portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Cryptocurrencies market weather and portfolio management' }
    ],
    link: [
      { rel: 'icon', href: '/static/images/icons/favicon.png', type: 'image/png' }
    ]
  },

  components: {
    ConnectRouting
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
