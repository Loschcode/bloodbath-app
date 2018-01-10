<template>
  <div id="app">

    <!-- The header is specific to each section -->
    <div class="content">
      <auth-routing />
    </div>
    <default-footer />

  </div>
</template>

<script>
import DefaultFooter from '@/components/DefaultFooter'
import AuthRouting from '@/components/AuthRouting'

export default {
  name: 'app',
  data () {
    return {}
  },

  created () {
  },

  components: {
    DefaultFooter,
    AuthRouting
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
