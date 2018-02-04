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
    title: 'CryptoScreen',
    link: [
      { rel: 'stylesheet', href: 'https://file.myfontastic.com/mLeXuFUMRFSYfxjxh5UTTd/icons.css' },
      { rel: 'favicon', href: '/static/images/favicon.ico' }
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
