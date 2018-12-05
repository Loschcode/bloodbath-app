<template>
  <div class="portfolio-header">
    <div v-if="appReady()">
      <div class="row">
        <div
          class="gr-12 gr-centered +pointer"
          @click="goPortfolioWeather"
        >
          <div class="gr-12 gr-12@mobile gr-12@tablet">
            <div class="module +no-margin">
              <div class="module__bubble">
                <div class="row">
                  <div class="gr-6 gr-centered gr-12@mobile gr-6@tablet">
                    <div class="market-weather__icon">
                      <span :class="`icon-${currentStyle()} watchlist-weather__${currentStyle()} watchlist-weather--static`"></span>
                    </div>

                    <div class="market-weather__title">
                      <span>
                        <coin-weather :variationProp="total.variation()" /></span>
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
                      <div>
                        <animated-number
                          :value="total.variation()"
                          :type="`percent`"
                          :animatedColors="false"
                          :numberColors="true"
                        />
                      </div>
                    </div>

                    <div class="module__content-details">
                      <div class="row">
                        <div class="gr-6">
                          <div class="module__footer-low">
                            <div>LOW</div>
                            <div>
                              <animated-number
                                :value="total.low()"
                                :type="`money`"
                              />
                            </div>
                            <!-- Variation is the same than the day low / high of the coin itself -->
                            <div>
                              <animated-number
                                :value="total.lowVariation()"
                                :type="`percent`"
                                :animatedColors="false"
                                :numberColors="true"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="gr-6">
                          <div class="module__footer-high">
                            <div>HIGH</div>
                            <div>
                              <animated-number
                                :value="total.high()"
                                :type="`money`"
                              />
                            </div>
                            <!-- Variation is the same than the day low / high of the coin itself -->
                            <div>
                              <animated-number
                                :value="total.highVariation()"
                                :type="`percent`"
                                :animatedColors="false"
                                :numberColors="true"
                              />
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
      </div>
    </div>

  </div>
</template>

<script>
import CoinWeather from '@/components/CoinWeather'
import WeatherHelper from '@/helpers/WeatherHelper'
import DefaultFooter from '@/components/DefaultFooter'
import DefaultHeader from '@/components/DefaultHeader'
import PortfolioCoin from '@/components/PortfolioCoin'
import PortfolioCapital from '@/components/PortfolioCapital'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import router from '@/router'

import { portfolioCoins } from '@/store/models/PortfolioCoin'

import PortfolioTotalService from '@/services/PortfolioTotalService'

export default {
  data () {
    return {
    }
  },

  computed: {
    total () {
      return new PortfolioTotalService(this, this.portfolioCoins)
    }
  },

  methods: {
    appReady () {
      return this.portfolioCoins
    },

    goPortfolioWeather () {
      router.push({ name: 'portfolio-weather', params: {} })
    },

    currentStyle () {
      return WeatherHelper.style(this.total.variation())
    }
  },

  apollo: {
    portfolioCoins
  },

  components: {
    CoinWeather,
    DefaultFooter,
    DefaultHeader,
    PortfolioCapital,
    PortfolioCoin,
    SearchCoins,
    EventBus
  }
}
</script>
