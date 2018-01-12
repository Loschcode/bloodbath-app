<template>
  <div id="app">

    <!-- The header is specific to each section -->
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

  components: {
    DefaultFooter,
    ConnectRouting
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
