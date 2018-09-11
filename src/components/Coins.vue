<template>
  <div class="coins">
    <div v-if="!fullyLoaded()">

      <div class="loader__full-page">
        <loader-wave>
          <span slot="quote">
            Coin : n.m. A small, round piece of metal, usually silver or copper coloured, that is used as money.
          </span>
          <span slot="text">
            Recovering coins history
          </span>
        </loader-wave>
      </div>

    </div>
    <div v-else>

      <default-header />

      <!-- Watchlist Coins -->
      <div v-if="watchlistCoins.length">
        <div class="section">
          <div class="row">
            <div class="gr-12">
              <div class="section__title">
                My watchlist
              </div>
            </div>
          </div>

          <div class="row">
            <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="watchlistCoin in watchlistCoins">
              <coin-preview contextProp="coins" :marketCoinProp="watchlistCoin.market_coin" />
            </div>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="row">
        <div class="gr-12">
          <search-coins contextProp="watchlist" />
        </div>
      </div>

      <!-- Footer is here -->
      <default-footer />

    </div>

  </div>
</template>

<script>
import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
import SearchCoins from '@/components/SearchCoins'
import LoaderWave from '@/components/LoaderWave'

import EventBus from '@/misc/EventBus'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchWatchlistCoins')
  },

  computed: {
    ...mapGetters({
      watchlistCoins: 'getWatchlistCoins',
      userSetting: 'getUserSetting'
    })
  },

  mounted () {
  },

  methods: {
    fullyLoaded () {
      return this.userSetting.id !== null
    }
  },

  components: {
    DefaultFooter,
    DefaultHeader,
    CoinPreview,
    SearchCoins,
    LoaderWave,
    EventBus
  }
}
</script>
