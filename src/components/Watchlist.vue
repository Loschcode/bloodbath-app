<template>
  <div class="coins">
    <div v-if="appReady()">
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
            <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="watchlistCoin in watchlistCoins" v-bind:key="watchlistCoin.id">
              <watchlist-coin :watchlistCoinProp="watchlistCoin" />
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

    <div v-else>
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

  </div>
</template>

<script>
import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import WatchlistCoin from '@/components/WatchlistCoin'
import SearchCoins from '@/components/SearchCoins'
import LoaderWave from '@/components/LoaderWave'

import EventBus from '@/misc/EventBus'

import { watchlistCoins } from '@/store/models/WatchlistCoin'
import { userSetting } from '@/store/models/UserSetting'

export default {
  data () {
    return {
      watchlistCoins: []
    }
  },

  created () {
  },

  mounted () {
  },

  methods: {
    appReady () {
      return this.userSetting
    }
  },

  components: {
    DefaultFooter,
    DefaultHeader,
    WatchlistCoin,
    SearchCoins,
    LoaderWave,
    EventBus
  },

  apollo: {
    userSetting,
    watchlistCoins
  }
}
</script>
