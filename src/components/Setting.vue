<template>
  <div class="coins">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <div class="header__title">
          <h1></h1>
        </div>
      </div>
      <div slot="right">
      </div>
    </default-header>

    <!--Preferences  -->
    <div class="section">
      <div class="row">
        <div class="gr-12">
          <div class="section__title">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="gr-10 gr-12@mobile gr-centered">

          <div class="module">
            <div class="module__title">
              <h2>My preferences</h2>
            </div>
            <div class="module__content">

              <div v-if="primaryMarketCoin">
                <coin-preview contextProp="coins" :marketCoinProp="primaryMarketCoin" :userMarketCoinProp="primaryMarketCoin.user_market_coin" :portfolioCoinProp="primaryMarketCoin.portfolio_coin" />
              </div>

              <!-- Search -->
              <search-coins contextProp="primary">
                <div slot="title">
                  Change primary coin
                </div>
              </search-coins>

            </div>
            <div class="module__footer">
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="gr-10 gr-12@mobile gr-centered">

          <div class="module">
            <div class="module__title">
              <h2>My account</h2>
            </div>
            <div class="module__content">
              <input type="submit" class="button button__danger" value="Log out from my account" @click="tryLogOut">
            </div>
            <div class="module__footer">
            </div>
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

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchMarketCoin', { id: this.userSetting.primary_market_coin.id })
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.userSetting.primary_market_coin.id })
  },

  computed: {
    userSetting () {
      // TODO : will be turned into a store soon
      return this.$user.data().user_setting
    },

    primaryMarketCoin () {
      return this.$store.getters.getMarketCoin(this.userSetting.primary_market_coin.id)
    }
  },

  methods: {
    tryLogOut () {
      this.$user.signOut()
      window.location.href = '/'
    }
  },

  components: {
    DefaultHeader,
    CoinPreview,
    SearchCoins
  }
}
</script>
