<template>
  <div class="coin">
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


    <div class="section">

    <div class="row">

      <div class="gr-2 gr-12@mobile gr-12@tablet">
        <div class="+desktop">
          <div class="module__bubble module__bubble--fixed">
            <div class="module__bubble-logo">
              <img :src="marketCoin.logo_url" />
            </div>
          </div>
        </div>
      </div>


      <div class="gr-8 gr-12@mobile gr-12@tablet">
        <div class="">
          <div class="module__bubble module__bubble--fixed">
            <div class="module__bubble-title">
              <span>{{ marketCoin.full_name }}</span>
            </div>
          </div>
        </div>
      </div>


      <div class="gr-2 gr-12@mobile gr-12@tablet">
        <div class="+desktop">
          <div class="module__bubble module__bubble--fixed">
            <div class="module__bubble-action">
              <div v-if="userMarketCoin">
                <coin-action-favorite :userMarketCoinProp="userMarketCoin" :marketCoinProp="marketCoin" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    </div>

    <div v-if="portfolioCoin">

      <div class="section">
        <!-- Market -->
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My investment
            </div>
          </div>

          <div class="row">
            <div class="gr-12">
              <div class="module">

          <div class="row">

            <div class="gr-12 gr-centered">

              <div class="gr-12 gr-12@mobile gr-12@tablet">

                <div class="row">

                  <div class="+desktop">
                    <div class="gr-12 gr-centered">
                      <div class="module__title +centered">
                        <h2>You currently own <animated-number :value="portfolioCoin.quantity" :type="`quantity`" /> {{marketCoin.code}} valued at <animated-number :value="marketCoin.price" :type="`money`" /> per unit</h2>
                      </div>
                    </div>
                  </div>
                  <div class="+mobile">
                    <div class="gr-12 gr-centered">
                      <div class="module__title +centered">
                        <h2>You currently own <br /><animated-number :value="portfolioCoin.quantity" :type="`quantity`" /> {{marketCoin.code}}<br /> valued at <br /><animated-number :value="marketCoin.price" :type="`money`" /> per unit</h2>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <div class="row">

          <div class="gr-4 gr-12@mobile gr-12@tablet">
              <div class="module__content">

                <div class="module__content-digits --ultra-small --opacity">
                  Lowest 24 hours capital
                </div>

                <div class="module__content-digits">
                  <div>
                    <animated-number :value="currentLow()" :type="`money`" />
                  </div>
                  <div class="module__content-digits --small">
                    <animated-number :value="marketCoin.day_low_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
                  </div>
                </div>
              </div>
          </div>

          <div class="gr-4 gr-12@mobile gr-12@tablet">
              <div class="module__content">

                <div class="module__content-digits --ultra-small --opacity">
                  Current capital
                </div>

                <div class="module__content-digits">
                  <div>
                    <animated-number :value="currentValue()" :type="`money`" />
                  </div>
                  <div class="module__content-digits --small">
                    <animated-number :value="marketCoin.price_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
                  </div>
                </div>
              </div>
          </div>

          <div class="gr-4 gr-12@mobile gr-12@tablet">
              <div class="module__content">
                <div class="module__content-digits --ultra-small --opacity">
                  Highest 24 hours capital
                </div>
                <div class="module__content-digits">
                  <div>
                    <animated-number :value="currentHigh()" :type="`money`" />
                  </div>
                  <div class="module__content-digits --small">
                    <animated-number :value="marketCoin.day_high_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
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

    </div>

    <div class="section">

      <!-- Units -->
      <div class="row">
        <div class="gr-12">
          <div class="section__title">
            Units
          </div>
        </div>
      </div>

      <div class="row">

        <!-- Low 24 Price -->
        <div class="gr-3 gr-12@mobile gr-12@tablet">
          <div class="module">
            <div class="module__title +centered">
              <h2>Lowest 24 hours price</h2>
            </div>
            <div class="module__content">
              <div class="module__content-digits">
                <div v-if="marketCoin">
                  <div>
                    <animated-number :value="marketCoin.day_low" :type="`money`" />
                  </div>
                  <div class="module__content-digits --small">
                    <animated-number :value="marketCoin.day_low_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
                  </div>
                </div>
                <div v-else>
                  -
                </div>
              </div>
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>

        <!-- Current Price -->
        <div class="gr-6 gr-12@mobile gr-12@tablet">
          <div class="module">
            <div class="module__title +centered">
              <h2>Current Price</h2>
            </div>
            <div class="module__content">
              <div class="module__content-digits">
                <div v-if="marketCoin">
                  <div>
                    <animated-number :value="marketCoin.price" :type="`money`" />
                  </div>
                  <div class="module__content-digits --small">
                    <animated-number :value="marketCoin.price_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
                  </div>
                </div>
                <div v-else>
                  -
                </div>
              </div>
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>


        <!-- High Price -->
        <div class="gr-3 gr-12@mobile gr-12@tablet">
          <div class="module">
            <div class="module__title +centered">
              <h2>Highest 24 hours price</h2>
            </div>
            <div class="module__content">
              <div class="module__content-digits">
                <div v-if="marketCoin">
                  <div>
                    <animated-number :value="marketCoin.day_high" :type="`money`" />
                  </div>
                  <div class="module__content-digits --small">
                    <animated-number :value="marketCoin.day_high_variation" :type="`percent`" :animatedColors="false" :numberColors="true" />
                  </div>
                </div>
                <div v-else>
                  -
                </div>
              </div>
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>


        <!-- Open Price -->
        <div class="gr-12 gr-centered gr-12@mobile gr-12@tablet">
          <div class="module">
            <div class="module__title +centered">
              <h2>Open Price</h2>
            </div>
            <div class="module__content">
              <div class="module__content-digits">
                <div v-if="marketCoin">
                  <animated-number :value="marketCoin.day_open" :type="`money`" />
                </div>
                <div v-else>
                  -
                </div>
              </div>
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>

      </div>

      <!-- Market -->
      <div class="row">
        <div class="gr-12">
          <div class="section__title">
            Market
          </div>
        </div>

        <div class="gr-12">
          <div class="module">
            <div class="module__title +centered">
              <h2>Market Capitalization</h2>
            </div>
            <div class="module__content">
              <div class="module__content-digits">
                <div v-if="marketCoin">
                  <animated-number :value="marketCoin.market_cap" :type="`big-money`" />
                </div>
                <div v-else>
                  -
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
import DefaultHeader from '@/components/DefaultHeader'
import CoinHeader from '@/components/CoinHeader'
import CoinActionFavorite from '@/components/CoinActionFavorite'
import AnimatedNumber from '@/components/AnimatedNumber'
import ThrowError from '@/mixins/ThrowError'
// import moment from 'moment'
import _ from 'lodash'

export default {
  data () {
    return {
      coinName: _.upperCase(this.$route.params.coinName),
      variation: 0.0
    }
  },

  created () {
    this.$store.dispatch('fetchMarketCoin', { id: this.coinName })
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoin.id })
  },

  computed: {
    marketCoin () {
      return this.$store.getters.getMarketCoinByCode(this.coinName)
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

    currentValue () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.price
      return quantity * price
    },

    currentLow () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.day_low
      return quantity * price
    },

    currentHigh () {
      let quantity = this.portfolioCoin.quantity
      let price = this.marketCoin.day_high
      return quantity * price
    }

    // solveDayOpenTime () {
    //   if (!this.marketCoin) {
    //     return null
    //   }
    //   let date = moment().subtract(24, 'hour').fromNow()
    //   return `From ${date}`
    // },
    //
    // solvePriceTime () {
    //   if (!this.marketCoin) {
    //     return null
    //   }
    //   let date = moment(this.marketCoin.updated_at).fromNow()
    //   return `From ${date}`
    // }
  },

  components: {
    DefaultHeader,
    CoinHeader,
    CoinActionFavorite,
    AnimatedNumber
  },

  mixins: [
    ThrowError
  ]

}
</script>
