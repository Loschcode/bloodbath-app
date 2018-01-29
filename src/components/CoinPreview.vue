<template>
  <div class="coin-preview">
    <div v-if="marketCoin">
        <div class="gr-12 gr-12@mobile">
          <div class="module">

            <a @click="clickAction">

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
                      <span class="icon-favorite-on"></span>
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

              <a @click="clickAction">
                <coin-preview-content :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
              </a>

            </div>
            <div class="module__footer">
              <coin-preview-favorite :userMarketCoinProp="userMarketCoin" />
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import CoinPreviewFavorite from '@/components/CoinPreviewFavorite'
import CoinPreviewContent from '@/components/CoinPreviewContent'
import router from '@/router'

export default {
  props: [
    'contextProp',
    'marketCoinProp',
    'userMarketCoinProp',
    'portfolioCoinProp'
  ],

  data () {
    return {
      context: null
    }
  },

  created () {
    this.context = this.contextProp

    this.$store.commit('setMarketCoin', this.marketCoinProp)
    this.$store.commit('setUserMarketCoin', this.userMarketCoinProp)
    if (this.portfolioCoinProp) {
      this.$store.commit('setPortfolioCoin', this.portfolioCoinProp)
    }
    this.$store.dispatch('subscribeMarketCoin', this.marketCoinProp)
  },

  watch: {
  },

  computed: {
    userSetting () {
      return this.$store.getters.getUserSetting()
    },

    currentUser () {
      return this.$store.getters.getCurrentUser()
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.marketCoinProp.id)
    },

    userMarketCoin () {
      return this.$store.getters.getUserMarketCoin(this.userMarketCoinProp.id)
    },

    portfolioCoin () {
      if (this.portfolioCoinProp) {
        return this.$store.getters.getPortfolioCoin(this.portfolioCoinProp.id)
      }
    }
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoinProp.id })
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

    clickAction (event) {
      event.preventDefault()
      if (this.context === 'portfolio') {
        this.createPortfolioCoin()
      } else if (this.context === 'primary') {
        this.updatePrimaryCoin()
      } else if (this.context === 'coins') {
        router.push({ name: 'coin', params: { coinName: this.marketCoin.code } })
      }
    },

    updatePrimaryCoin () {
      this.dispatch('updatePrimaryCoin', { changeset: { primary_market_coin_id: this.marketCoin.id } })
    },
    /**
     * In case of portfolio context, it'll be the action
     */
    createPortfolioCoin () {
      this.$store.dispatch('createPortfolioCoin', { changeset: { market_coin_id: this.marketCoin.id } })
    }
  },

  components: {
    CoinPreviewContent,
    CoinPreviewFavorite
  }
}
</script>
