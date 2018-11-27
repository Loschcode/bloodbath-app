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
import LoaderWave from '@/components/LoaderWave'
import RedirectService from '@/services/RedirectService'

export default {
  data () {
    return {
    }
  },

  created () {
  },

  watch: {
    portfolioCoins (newValue, oldValue) {
      // NOTE : maybe this will be moved with the logic of getting the portfolio etc ?
      RedirectService.new(this).fromIndex(newValue)
    }
  },

  computed: {
    // TODO get PortfolioCoins, userSetting
  },

  components: {
    LoaderWave
  }
}
</script>
