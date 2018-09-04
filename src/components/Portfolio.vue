<template>
  <div class="coins">
    <default-header>
      <div slot="left">
        <span class="icon-right"></span> <span>Portfolio</span>
      </div>
    </default-header>

    <!-- My capital -->
    <div v-if="portfolioCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              Total investment
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-12 gr-centered">

            <div class="gr-12 gr-12@mobile gr-12@tablet">
              <div class="module">
                <div class="module__bubble">

                  <div class="row">
                    <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">
                      <div class="market-weather__icon">
                        <span :class="`icon-${currentStyle()} coin-weather__${currentStyle()} coin-weather--static`"></span>
                      </div>

                      <div class="market-weather__title">
                        <span><coin-weather :variationProp="totalVariation" /></span>
                      </div>

                      <div class="market-weather__info">
                        <span>based on your total capital</span>
                      </div>

                    </div>
                  </div>

                  <div class="row">

                    <div class="gr-4 gr-centered gr-12@mobile gr-6@tablet">

                      <div class="module__content-digits --extra-big">
                        <portfolio-capital />
                        <div><animated-number :value="totalVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
                      </div>

                      <div class="module__content-details">
                        <div class="row">
                          <div class="gr-6">
                            <div class="module__footer-low">
                              <div>LOW</div>
                              <div><animated-number :value="totalLow" :type="`money`" /></div>
                              <!-- Variation is the same than the day low / high of the coin itself -->
                              <div><animated-number :value="totalLowVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
                            </div>
                          </div>
                          <div class="gr-6">
                            <div class="module__footer-high">
                              <div>HIGH</div>
                              <div><animated-number :value="totalHigh" :type="`money`" /></div>
                              <!-- Variation is the same than the day low / high of the coin itself -->
                              <div><animated-number :value="totalHighVariation" :type="`percent`" :animatedColors="false" :numberColors="true" /></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="gr-10">
                      <div class="module__footer-details">
                      </div>
                    </div>
                    <div class="gr-2">
                      <div class="module__footer-action +no-margin-top">
                        <a><span @click="goPortfolioFullWeather" class="icon icon-fullscreen"></span></a>
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

    <!-- My coins -->
    <div v-if="portfolioCoins.length">
      <div class="section">
        <div class="row">
          <div class="gr-12">
            <div class="section__title">
              My coins
            </div>
          </div>
        </div>

        <div class="row">
          <div class="gr-3 gr-12@mobile gr-6@tablet" v-for="portfolioCoin in portfolioCoins">
            <portfolio-coin :portfolioCoinProp="portfolioCoin" />
          </div>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div v-if="portfolioCoins" class="row">
      <div class="gr-12">
        <search-coins contextProp="portfolio" :focusProp="false">
          <div slot="title">
            Add coins
          </div>
        </search-coins>
      </div>
    </div>

    <!-- Footer is here -->
    <default-footer />

  </div>
</template>

<script>
import CoinWeather from '@/components/CoinWeather'
import Weather from '@/misc/Weather'
import AnimatedNumber from '@/components/AnimatedNumber'
import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import PortfolioCoin from '@/components/PortfolioCoin'
import PortfolioCapital from '@/components/PortfolioCapital'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import router from '@/router'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchPortfolioCoins')
  },

  watch: {
  },

  computed: {
    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins',
      userSetting: 'getUserSetting',
      totalLow: 'getTotalLow',
      totalHigh: 'getTotalHigh',
      totalVariation: 'getTotalVariation',
      totalLowVariation: 'getTotalLowVariation',
      totalHighVariation: 'getTotalHighVariation'
    })
  },

  mounted () {
  },

  methods: {
    goPortfolioFullWeather () {
      router.push({ name: 'portfolio-full-weather', params: { } })
    },

    currentStyle () {
      return Weather.style(this.totalVariation)
    }
  },

  components: {
    AnimatedNumber,
    CoinWeather,
    Weather,
    DefaultFooter,
    DefaultHeader,
    PortfolioCapital,
    PortfolioCoin,
    SearchCoins,
    EventBus
  }
}
</script>
