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
        if (this.userSetting.weather) {
          router.push({ name: 'coins-full-weather', params: { } })
        } else {
          router.push({ name: 'coins', params: { } })
        }
      } else {
        if (this.userSetting.weather) {
          router.push({ name: 'portfolio-full-weather', params: { } })
        } else {
          router.push({ name: 'portfolio', params: { } })
        }
      }
    }
  },

  computed: {
    userSetting () {
      return this.$store.getters.getUserSetting
    },

    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins'
    })
  },

  components: {
    LoaderCube
  }
}
</script>
