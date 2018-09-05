<template>
  <div class="coin-preview">
    <div v-if="marketCoin && userMarketCoin">
        <div class="gr-12 gr-12@mobile gr-12@tablet">
          <div class="module">

            <a @click="clickAction" class="+pointer">

            <div class="module__title">
              <div class="row">
                <div class="gr-2">
                  <div v-if="isPrimaryCoin()">
                    <div class="module__title-primary">
                      <span class="icon-primary"></span>
                    </div>
                  </div>
                  <div v-else-if="isPortfolioCoin()">
                    <div class="module__title-portfolio">
                      <span class="icon-portfolio"></span>
                    </div>
                  </div>
                  <div v-else-if="isFavoriteCoin()">
                    <div class="module__title-favorite">
                      <span class="icon-watch-on"></span>
                    </div>
                  </div>
                  <div v-else>
                    <div class="module__title-default">
                      <span class="icon-default"></span>
                    </div>
                  </div>
                </div>

                <div class="gr-10">
                  <h2>{{ marketCoin.coin_name }} <span class="module__subtitle">{{ marketCoin.name }}</span></h2>
                </div>

              </div>
            </div>

            </a>


            <div class="module__content">

              <div v-if="marketCoin.price">

              <a @click="clickAction" class="+pointer">
                <div v-if="flipped">
                  <coin-preview-flipped :marketCoinProp="marketCoin" />
                </div>
                <div v-else>
                  <coin-preview-content :marketCoinProp="marketCoin" />
                </div>
              </a>

              </div>
              <div v-else>
                <loader-wave>
                  <span slot="text"></span>
                </loader-wave>
              </div>

            </div>

            <div class="module__footer">
              <div class="row">
                <div class="gr-10">
                  <div class="module__footer-details">
                    <div v-if="userSetting.weather && marketCoin.price_variation">
                      <span><coin-weather :variationProp="marketCoin.price_variation" /></span>
                    </div>
                  </div>
                </div>
                <div class="gr-2">
                  <div class="module__footer-action">
                    <div class="row">
                      <div class="gr-12">
                        <coin-action-favorite :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoinProp" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

    </div>
  </div>
</template>

<script>
import CoinActionFavorite from '@/components/CoinActionFavorite'
import CoinPreviewContent from '@/components/CoinPreviewContent'
import CoinPreviewFlipped from '@/components/CoinPreviewFlipped'
import LoaderWave from '@/components/LoaderWave'
import CoinWeather from '@/components/CoinWeather'
import EventBus from '@/misc/EventBus'

export default {
  props: [
    'contextProp',
    'marketCoinProp'
  ],

  data () {
    return {
      context: null,
      flipped: false
    }
  },

  replace: true,

  created () {
    this.context = this.contextProp

    this.$store.commit('setMarketCoin', this.marketCoinProp)
    this.$store.dispatch('subscribeMarketCoinChannel', this.marketCoinProp)
  },

  mounted () {
    EventBus.$on('CoinPreviewClick', event => {
      let matchingCoin = event.marketCoin.id === this.marketCoinProp.id
      let matchingContext = event.context === this.context
      if (matchingCoin && matchingContext) {
        this.clickAction()
      }
    })
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoinChannel', { id: this.marketCoinProp.id })
    EventBus.$off('CoinPreviewClick')
  },

  computed: {
    currentUser () {
      return this.$store.getters.getCurrentUser
    },

    userSetting () {
      return this.$store.getters.getUserSetting
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    },

    userMarketCoin () {
      if (this.marketCoin) {
        return this.$store.getters.getUserMarketCoinByMarketCoin(this.marketCoin.id)
      }
    },

    portfolioCoin () {
      if (this.marketCoin) {
        return this.$store.getters.getPortfolioCoinByMarketCoin(this.marketCoin.id)
      }
    }
  },

  methods: {
    isFavoriteCoin () {
      return this.userMarketCoin.favorited_at
    },

    isPortfolioCoin () {
      return this.portfolioCoin
    },

    isPrimaryCoin () {
      return this.marketCoin.id === this.userSetting.primary_market_coin_id
    },

    flipCoin () {
      if (this.flipped) {
        this.flipped = false
      } else {
        this.flipped = true
      }
    },

    clickAction (event) {
      if (event) {
        event.preventDefault()
      }
      if (this.context === 'portfolio') {
        this.createPortfolioCoin()
        this.$noty.info(`${this.marketCoin.code} is now part of your portfolio !`)
      } else if (this.context === 'primary') {
        this.updatePrimaryCoin()
        this.$noty.info(`${this.marketCoin.coin_name} is now your primary coin ! Look at the header ...`)
      } else if (this.context === 'watchlist') {
        this.addToWatchlist()
        this.$noty.info(`${this.marketCoin.coin_name} added to your watchlist !`)
      } else if (this.context === 'coins') {
        this.flipCoin()
      }
    },

    addToWatchlist () {
      this.$store.dispatch('updateUserMarketCoin', { id: this.userMarketCoin.id, changeset: { favorited_at: true } })
    },

    updatePrimaryCoin () {
      this.$store.dispatch('updateUserSetting', { changeset: { primary_market_coin_id: this.marketCoin.id } })
    },
    /**
     * In case of portfolio context, it'll be the action
     */
    createPortfolioCoin () {
      this.$store.dispatch('createPortfolioCoin', { changeset: { market_coin_id: this.marketCoin.id } })
    }
  },

  components: {
    CoinPreviewFlipped,
    CoinPreviewContent,
    CoinActionFavorite,
    CoinWeather,
    LoaderWave
  }
}
</script>
