<template>
  <div class="coin-preview">
    <div v-if="marketCoin && userMarketCoin">
        <div class="gr-12 gr-12@mobile">
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

              <a @click="clickAction" class="+pointer">
                <coin-preview-content :marketCoinProp="marketCoin" />
              </a>

            </div>
            <div class="module__footer">
              <div class="row">
                <div class="gr-10">
                  <!-- Was moved for now -->
                </div>
                <div class="gr-2">
                  <div class="module__footer-action">
                    <div class="row">
                      <div class="gr-12">
                        <coin-action-favorite :userMarketCoinProp="userMarketCoin" />
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
import AnimatedNumber from '@/components/AnimatedNumber'
import CoinActionFavorite from '@/components/CoinActionFavorite'
import CoinPreviewContent from '@/components/CoinPreviewContent'
import EventBus from '@/misc/EventBus'
import router from '@/router'

export default {
  props: [
    'contextProp',
    'marketCoinProp'
  ],

  data () {
    return {
      context: null
    }
  },

  replace: true,

  created () {
    this.context = this.contextProp

    this.$store.commit('setMarketCoin', this.marketCoinProp)
    this.$store.dispatch('subscribeMarketCoin', this.marketCoinProp)
  },

  mounted () {
    EventBus.$on('CoinPreviewClick', event => {
      let matchingCoin = event.marketCoin.id === this.marketCoinProp.id
      let matchingContext = event.context === this.context
      console.log(matchingCoin && matchingContext)
      if (matchingCoin && matchingContext) {
        // TODO : this is not workign, make it work.
        console.log('multiple response')
        this.clickAction()
      }
    })
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoin.id })
    EventBus.$off('CoinPreviewClick')
  },

  watch: {
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

    clickAction (event) {
      console.log('dispatch click action')
      if (event) {
        event.preventDefault()
      }
      if (this.context === 'portfolio') {
        this.createPortfolioCoin()
      } else if (this.context === 'primary') {
        this.updatePrimaryCoin()
      } else if (this.context === 'coins') {
        router.push({ name: 'coin', params: { coinName: this.marketCoin.code } })
      }
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
    AnimatedNumber,
    CoinPreviewContent,
    CoinActionFavorite
  }
}
</script>
