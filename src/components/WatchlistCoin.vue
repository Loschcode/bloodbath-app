<template>
  <div class="watchlist-coin">
    <div v-if="marketCoin && watchlistCoin">

      <div class="gr-12 gr-12@mobile gr-12@tablet">
        <div>
          <coin-preview contextProp="coins" :marketCoinProp="marketCoin" :watchlistCoinProp="watchlistCoin" />
        </div>

      </div>

    </div>

    <div v-else>
      <loader-wave>
        <span slot="text"></span>
      </loader-wave>
    </div>

  </div>
</template>

<script>
import { GET_USER_SETTING_QUERY, GET_WATCHLIST_COIN_QUERY, GET_MARKET_COIN_QUERY } from '@/constants/graphql'

import AnimatedNumber from '@/components/AnimatedNumber'
import CoinPreview from '@/components/CoinPreview'
import LoaderWave from '@/components/LoaderWave'

export default {
  props: [
    'watchlistCoinProp'
  ],

  data () {
    return {
      watchlistCoin: null,
      marketCoin:    null,
      marketCoinId:  null,
      userSetting:   null
    }
  },

  watch: {
  },

  computed: {
  },

  methods: {
  },

  apollo: {
    getUserSetting: {
      query: GET_USER_SETTING_QUERY,

      result ({ data }) {
        this.userSetting = data.getUserSetting
      }
    },

    getWatchlistCoin: {
      query: GET_WATCHLIST_COIN_QUERY,

      result ({ data }) {
        this.watchlistCoin = data.getWatchlistCoin
        this.marketCoinId = data.getWatchlistCoin.marketCoin.id
      },

      variables () {
        return {
          id: this.watchlistCoinProp.id
        }
      }
    },

    getMarketCoin: {
      query: GET_MARKET_COIN_QUERY,

      result ({ data }) {
        this.marketCoin = data.getMarketCoin
      },

      variables () {
        return {
          id: this.marketCoinId
        }
      },

      skip () {
        return !this.marketCoinId
      }
    }
  },

  components: {
    AnimatedNumber,
    CoinPreview,
    LoaderWave
  }
}
</script>
