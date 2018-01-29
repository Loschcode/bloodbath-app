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
    <div v-if="userSetting">
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

                <div v-if="baseCurrencies">

                  <div class="section">
                    <div class="row">
                    <!-- Currency -->
                    <div class="section__title">
                      Change Currency
                    </div>

                    <div class="section__content">
                      <div class="gr-3 gr-12@mobile" v-for="baseCurrency in baseCurrencies">

                        <a @click="setCurrentCurrency" :id="baseCurrency.id">
                          <div class="mini-module" v-bind:class="{ '--active': isCurrentCurrency(baseCurrency) }">
                            <div class="mini-module__title">
                              <h2>{{ baseCurrency.code }}</h2>
                            </div>
                            <div class="mini-module__content">
                              {{ baseCurrency.full_name }}
                            </div>
                            <div class="mini-module__footer">
                              {{ baseCurrency.exchange_rate }} USD
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
    this.$store.dispatch('fetchBaseCurrencies')
  },

  destroyed () {
  },

  computed: {
    userSetting () {
      return this.$store.getters.getUserSetting
    },

    primaryMarketCoin () {
      return this.$store.getters.getMarketCoin(this.userSetting.primary_market_coin_id)
    },

    baseCurrencies () {
      return this.$store.getters.getBaseCurrencies
    }
  },

  methods: {
    setCurrentCurrency (event) {
      let baseCurrencyId = event.currentTarget.id
      this.$store.dispatch('updateUserSetting', { changeset: { base_currency_id: baseCurrencyId } })
    },

    isCurrentCurrency (baseCurrency) {
      return baseCurrency.id === this.userSetting.base_currency_id
    },
    tryLogOut () {
      this.$store.commit('unsetCurrentUser')
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
