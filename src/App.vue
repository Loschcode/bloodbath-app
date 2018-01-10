<template>
  <div id="app">

    <default-header />
    <auth-routing />
    <default-footer />

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
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
    DefaultHeader,
    DefaultFooter,
    AuthRouting
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
