<template>
  <div class="portfolio-coin">
    <div v-if="portfolioCoin && marketCoin">

        <div class="gr-12 gr-12@mobile gr-12@tablet">
          <div class="module">

            <a @click="clickAction" class="+pointer">

            <div class="module__title">
              <div class="gr-2">
                <div class="module__title-portfolio">
                  <span class="icon-portfolio --on"></span>
                </div>
              </div>
              <div class="gr-10">
                <h2>{{ marketCoin.coinName }} <span class="module__subtitle">{{ marketCoin.name }}</span></h2>
              </div>
            </div>

            </a>

            <div class="module__content">
              <div class="module__content-folio">

                <!-- Preloader to make sure we have the informations -->
                <div v-if="editQuantity">
                  <!-- Edit quantity of the coin -->
                  <input type="number" ref="input" v-model="portfolioCoin.quantity" placeholder="0.000" v-on:keydown.enter="updateQuantity">
                </div>

                <div v-else>

                  <div v-if="marketCoin.price && portfolioCoin.quantity">

                    <a @click="clickAction" class="+pointer">
                      <div v-if="flipped">
                        <coin-preview-flipped :marketCoinProp="marketCoin" />
                      </div>
                      <div v-else>
                        <portfolio-coin-content :marketCoinProp="marketCoin" :portfolioCoinProp="portfolioCoin" />
                      </div>
                    </a>

                  </div>
                  <div v-else>
                    <loader-wave>
                      <span slot="text"></span>
                    </loader-wave>
                  </div>

                </div>

              </div>

            </div>
            <div class="module__footer">
              <div v-if="editQuantity">
                <div class="module__footer-action">
                  <a @click="destroyPortfolioCoin">
                    <span class="icon icon-trash"></span>
                  </a>
                  <a @click="updateQuantity">
                    <span class="icon --selected icon-confirm"></span>
                  </a>
                </div>
              </div>
              <div v-else>
                <div class="row">
                  <div class="gr-10">
                    <div class="module__footer-details">
                      <div v-if="userSetting.weather && marketCoin.priceVariation">
                        <span><coin-weather :variationProp="marketCoin.priceVariation" /></span>
                      </div>
                    </div>
                  </div>
                  <div class="gr-2">
                    <div class="module__footer-action">
                      <a @click="enableEditQuantity">
                        <span class="icon icon-pencil"></span>
                      </a>
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
import PortfolioCoinContent from '@/components/PortfolioCoinContent'
import CoinPreviewFlipped from '@/components/CoinPreviewFlipped'
import CoinWeather from '@/components/CoinWeather'
import LoaderWave from '@/components/LoaderWave'
import _ from 'lodash'

import { marketCoin } from '@/store/models/MarketCoin'
import { userSetting } from '@/store/models/UserSetting'

export default {
  props: [
    'portfolioCoinProp'
  ],

  data () {
    return {
    }
  },

  created () {
    this.portfolioCoinId = this.portfolioCoinProp.id
    this.marketCoinId = this.portfolioCoinProp.marketCoin.id
  },

  watch: {
    editQuantity (newValue, oldValue) {
      this.$nextTick(() => {
        if (!_.isUndefined(this.$refs.input)) {
          this.$refs.input.focus()
        }
      })
    },
    portfolioCoin () {
      if (this.portfolioCoin.quantity <= 0.0) {
        this.editQuantity = true
      } else {
        this.editQuantity = false
      }
    }
  },

  apollo: {
    marketCoin,
    userSetting
  },

  methods: {
    flipCoin () {
      if (this.flipped) {
        this.flipped = false
      } else {
        this.flipped = true
      }
    },

    clickAction () {
      this.flipCoin()
    },

    enableEditQuantity (event) {
      event.preventDefault()
      this.editQuantity = true
    },

    updateQuantity (event) {
      event.preventDefault()
      this.$store.dispatch('updatePortfolioCoin', { id: this.portfolioCoin.id, changeset: { quantity: this.portfolioCoin.quantity } })
      this.$noty.info(`Your portfolio now contains ${this.portfolioCoin.quantity} ${this.marketCoin.code} !`)
    },

    destroyPortfolioCoin (event) {
      event.preventDefault()
      this.$store.dispatch('destroyPortfolioCoin', { id: this.portfolioCoin.id })
      this.$noty.info(`You removed ${this.marketCoin.code} from your portfolio !`)
    }
  },

  components: {
    PortfolioCoinContent,
    CoinPreviewFlipped,
    CoinWeather,
    LoaderWave
  }
}
</script>
