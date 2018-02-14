<template>
  <div class="index">
    <div class="loader">
      <span class="loader__text">Recovering informations</span>

      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>

    </div>
  </div>
</template>

<script>
import router from '@/router'
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
