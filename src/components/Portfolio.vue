<template>
  <div class="coins">
    <default-header />

    <!-- My portfolio -->
    <div v-if="portfolioCoins">

      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="outside-text">
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My portfolio
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="portfolioCoin in portfolioCoins" :key="portfolioCoin.id">
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
            Add to portfolio
          </div>
        </search-coins>
      </div>
    </div>

    <!-- Footer is here -->
    <default-footer />

  </div>
</template>

<script>
import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import PortfolioCoin from '@/components/PortfolioCoin'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import { portfolioCoins } from '@/store/models/PortfolioCoin'
import { userSetting } from '@/store/models/UserSetting'

export default {
  data () {
    return {
    }
  },

  apollo: {
    portfolioCoins,
    userSetting
  },

  components: {
    DefaultFooter,
    DefaultHeader,
    PortfolioCoin,
    SearchCoins,
    EventBus
  }
}
</script>
