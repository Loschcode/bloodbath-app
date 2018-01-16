<template>
  <div id="app">
    <div class="content">
      <connect-routing />
    </div>
    <default-footer />

  </div>
</template>

<script>
import DefaultFooter from '@/components/DefaultFooter'
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
      { rel: 'favicon', href: 'favicon.ico' }
    ]
  },

  components: {
    DefaultFooter,
    ConnectRouting
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
