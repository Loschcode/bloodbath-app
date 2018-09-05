<template>
  <div class="index">
    <div class="loader__full-page">
      <loader-wave>
        <span slot="quote">
          Coin : n.m. A small, round piece of metal, usually silver or copper coloured, that is used as money.
        </span>
        <span slot="text">
          Collecting basic information
        </span>
      </loader-wave>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { mapGetters } from 'vuex'
import LoaderWave from '@/components/LoaderWave'

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
    LoaderWave
  }
}
</script>
