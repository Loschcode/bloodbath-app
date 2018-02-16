<template>
  <div class="index">
    <div class="loader__full-page">
      <loader-cube>
        <span slot="text">
          Collecting basic information
        </span>
      </loader-cube>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { mapGetters } from 'vuex'
import LoaderCube from '@/components/LoaderCube'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchPortfolioCoins')
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

  components: {
    LoaderCube
  }
}
</script>
