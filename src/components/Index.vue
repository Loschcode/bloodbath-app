<template>
  <div class="index">
    <div class="loader">
      Recovering informations ...
    </div>
  </div>
</template>

<script>
// import router from '@/router'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  watch: {
    portfolioCoins (newValue, oldValue) {
      if (newValue.length === 0) {
        router.push({ name: 'coins', params: { } })
      } else {
        router.push({ name: 'portfolio', params: { } })
      }
    }
  },

  computed: {
    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins'
    })
  },

  created () {
    console.log('accessing index')
  },

  components: {

  }
}
</script>
