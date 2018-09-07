<template>
  <div class="coins">
    <default-header>
    </default-header>

    <!--Preferences  -->
    <div v-if="currentUser && userSetting">

      <div v-if="!isConnected()" class="section">
        <div class="row">
          <div class="gr-12 gr-12@mobile gr-12@tablet gr-centered">
            <div class="module-alert +pointer" @click="goConnect()">
              <div class="module-alert__title">
                Welcome to Bloodbath !
              </div>
              <div class="module-alert__content">
                This small project was made to get simple data about the cyrpto market trends. Flashy colors show you the degree of variation of your portfolio or watchlist 🤘 is it all bloody ? See red and go away. Numbers going to the moon ? See purple and check your cash grow in live and full details 👍
                <br /><br />
                Feel free to sign up if you like it 😄
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">

        <div class="row">
          <div class="gr-12 gr-12@mobile gr-12@tablet gr-centered">

            <div class="module">
              <div class="module__title">
                <h2>My preferences</h2>
              </div>

              <div class="module__content">

                <div v-if="baseCurrencies && currentBaseCurrency">

                  <div class="section">
                    <div class="row">
                    <!-- Currency -->
                    <div class="section__title">
                      Change Currency
                    </div>

                    <div class="section__content">
                      <div class="gr-3 gr-12@mobile gr-12@tablet" v-for="baseCurrency in baseCurrencies">

                        <a @click="setCurrentCurrency" :id="baseCurrency.id" class="+pointer">
                          <div class="mini-module" v-bind:class="{ 'mini-module--active': isCurrentCurrency(baseCurrency) }">
                            <div class="mini-module__title">
                              <h2>{{ baseCurrency.code }}</h2>
                            </div>
                            <div class="mini-module__content">
                              {{ baseCurrency.full_name }}
                            </div>
                            <div class="mini-module__footer">
                              {{ baseCurrency.exchange_rate }} / BTC
                            </div>
                          </div>
                        </a>

                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

              <div class="module__content">

                <div v-if="primaryMarketCoin">
                  <!-- Search -->
                  <search-coins contextProp="primary">
                    <div slot="title">
                      Change primary coin ({{ primaryMarketCoin.name }})
                    </div>
                  </search-coins>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Footer is here -->
      <default-footer />

    </div>

  </div>
</template>

<script>
import router from '@/router'

import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import CoinPreview from '@/components/CoinPreview'
import SearchCoins from '@/components/SearchCoins'
import Connect from '@/components/Connect'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchBaseCurrencies')
  },

  destroyed () {
  },

  computed: {
    currentUser () {
      return this.$store.getters.getCurrentUser
    },

    userSetting () {
      return this.$store.getters.getUserSetting
    },

    primaryMarketCoin () {
      return this.$store.getters.getMarketCoin(this.userSetting.primary_market_coin_id)
    },

    baseCurrencies () {
      return this.$store.getters.getBaseCurrencies
    },

    currentBaseCurrency () {
      return this.$store.getters.getBaseCurrency(this.userSetting.base_currency_id)
    }
  },

  methods: {
    goConnect () {
      router.push({ name: 'connect', params: { } })
    },

    isConnected () {
      return this.currentUser.role !== 'anonymous'
    },

    setCurrentCurrency (event) {
      let baseCurrencyId = event.currentTarget.id
      this.$store.dispatch('updateUserSetting', { changeset: { base_currency_id: baseCurrencyId } })
      this.$noty.info(`The application will show everything in ${this.$store.getters.getBaseCurrency(parseInt(baseCurrencyId)).full_name}`)
    },

    isCurrentCurrency (baseCurrency) {
      return baseCurrency.id === this.currentBaseCurrency.id
    }
  },

  components: {
    DefaultFooter,
    DefaultHeader,
    CoinPreview,
    SearchCoins,
    Connect
  }
}
</script>
