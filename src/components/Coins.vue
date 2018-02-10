<template>
  <div class="coins">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <div class="header__title">
        </div>
      </div>
      <div slot="right">
      </div>
    </default-header>

    <div class="market-weather">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Market weather
            </div>
          </div>
        </div>

        <div class="row">
            <div class="gr-12 gr-12@mobile gr-12@tablet">

              <div class="module">
                <div class="module__bubble">

                  <div class="row">
                    <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">
                      <div class="market-weather__title">
                        <span class="market__weather__title--bloody">Bloody</span>
                      </div>
                      <div class="market-weather__info">
                        <span>based on the biggest market captializations</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

          </div>
        </div>


      </div>
    </div>

    <!-- Search -->
    <div class="row">
      <div class="gr-12">
        <search-coins contextProp="coins" />
      </div>
    </div>

    <!-- Favorites Coins -->
    <div v-if="favoriteCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My favorites coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="favoriteCoin in favoriteCoins">
            <coin-preview contextProp="coins" :marketCoinProp="favoriteCoin.market_coin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Top Coins -->
    <div v-if="topCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Top coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="topCoin in topCoins">
            <coin-preview contextProp="coins" :marketCoinProp="topCoin.market_coin" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchFavoriteCoins')
    this.$store.dispatch('fetchTopCoins')
  },

  computed: {
    ...mapGetters({
      favoriteCoins: 'getFavoriteCoins',
      topCoins: 'getTopCoins'
    })
  },

  mounted () {
  },

  methods: {
  },

  components: {
    DefaultHeader,
    CoinPreview,
    SearchCoins,
    EventBus
  }
}
</script>
