<template>
  <div class="coins">
    <default-header>
      <div slot="left">
        <span class="icon-right"></span> <span>Portfolio</span>
      </div>
    </default-header>

    <!-- My coins -->
    <div v-if="portfolioCoins.length">

      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="outside-text">
              Your investment was worth <span><animated-number :value="totalAllTimeHigh" :type="`money`" /></span> at its highest point
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="portfolioCoin in portfolioCoins">
            <portfolio-coin :portfolioCoinProp="portfolioCoin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div v-if="portfolioCoins" class="row">
      <div class="gr-12">
        <search-coins contextProp="portfolio" :focusProp="false">
          <div slot="title">
            Add coins
          </div>
        </search-coins>
      </div>
    </div>

    <!-- Footer is here -->
    <default-footer />

  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'
import DefaultFooter from '@/components/DefaultFooter'
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

  watch: {
  },

  computed: {
    ...mapGetters({
      totalAllTimeHigh: 'getTotalAllTimeHigh',
      portfolioCoins: 'getPortfolioCoins',
      userSetting: 'getUserSetting'
    })
  },

  mounted () {
  },

  methods: {
  },

  components: {
    AnimatedNumber,
    DefaultFooter,
    DefaultHeader,
    PortfolioCoin,
    SearchCoins,
    EventBus
  }
}
</script>
