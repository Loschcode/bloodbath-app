<template>
  <div class="index">
    <loader-cube>
      <span slot="text">
        Recovering information
      </span>
    </loader-cube>
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
    LoaderCube
  }
}
</script>
