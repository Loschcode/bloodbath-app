<template>
  <div class="coins">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <div class="header__title">
          <h1>Portfolio</h1>
        </div>
      </div>
    </default-header>

    <!-- Favorites Coins -->
    <div v-if="portfolioCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile" v-for="portfolioCoin in portfolioCoins">
            <portfolio-coin :portfolioCoinProp="portfolioCoin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <search-coins contextProp="portfolio">
      <div slot="title">
        Add new coin
      </div>
    </search-coins>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import PortfolioCoin from '@/components/PortfolioCoin'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchPortfolioCoins')
  },

  computed: {
    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins'
    })
  },

  mounted () {
  },

  methods: {
  },

  components: {
    DefaultHeader,
    PortfolioCoin,
    SearchCoins,
    EventBus
  }
}
</script>
