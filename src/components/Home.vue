<template>
  <div>
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <h1>CryptoScreen</h1>
      </div>
    </default-header>

    <div class="loader">
      {{ msg }}
    </div>
  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'

export default {
  data () {
    return {
      msg: 'Welcome to Cryptoscreen'
    }
  },

  components: {
    DefaultHeader
  }
}
</script>

<style lang="scss" scoped>
</style>
