<template>
  <div class="portfolio-coin">
    <div v-if="portfolioCoin">

        <div class="gr-12 gr-12@mobile gr-12@tablet">
          <div class="module">

            <router-link :to="{ name: 'coin', params: { coinName: marketCoin.code } }">

            <div class="module__title">
              <div class="gr-2">
                <div class="module__title-portfolio">
                  <span class="icon-portfolio --on"></span>
                </div>
              </div>
              <div class="gr-10">
                <h2>{{ marketCoin.coin_name }} <span class="module__subtitle">{{ marketCoin.name }}</span></h2>
              </div>
            </div>

            </router-link>

            <div class="module__content">
              <div class="module__content-folio">

                <div v-if="editQuantity">
                  <!-- Edit quantity of the coin -->
                  <input type="number" ref="input" v-model="portfolioCoin.quantity" placeholder="0.000" v-on:keydown.enter="updateQuantity">
                </div>

                <div v-else>
                  <!-- Portfolio coin content -->
                  <portfolio-coin-content :marketCoinProp="marketCoin" :portfolioCoinProp="portfolioCoin" />
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
                <div class="module__footer-action">
                  <div class="row">
                    <div class="gr-12">
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
import AnimatedNumber from '@/components/AnimatedNumber'
import PortfolioCoinContent from '@/components/PortfolioCoinContent'
import _ from 'lodash'

export default {
  props: [
    'portfolioCoinProp'
  ],

  data () {
    return {
      editQuantity: false
    }
  },

  created () {
    this.$store.commit('setPortfolioCoin', this.portfolioCoinProp)
    if (this.portfolioCoinProp.market_coin) {
      this.$store.commit('setMarketCoin', this.portfolioCoinProp.market_coin)
      this.$store.dispatch('subscribeMarketCoin', this.portfolioCoinProp.market_coin)
    }
  },

  mounted () {
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.marketCoin.id })
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

  computed: {
    portfolioCoin () {
      return this.$store.getters.getPortfolioCoin(this.portfolioCoinProp.id)
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.portfolioCoinProp.market_coin_id)
    }
  },

  methods: {
    enableEditQuantity (event) {
      event.preventDefault()
      this.editQuantity = true
    },

    updateQuantity (event) {
      event.preventDefault()
      this.$store.dispatch('updatePortfolioCoin', { id: this.portfolioCoin.id, changeset: { quantity: this.portfolioCoin.quantity } })
      this.$noty.success(`Your portfolio now contains ${this.portfolioCoin.quantity} ${this.marketCoin.code} !`)
    },

    destroyPortfolioCoin (event) {
      event.preventDefault()
      this.$store.dispatch('destroyPortfolioCoin', { id: this.portfolioCoin.id })
      this.$noty.success(`You removed ${this.marketCoin.code} from your portfolio !`)
    }
  },

  components: {
    AnimatedNumber,
    PortfolioCoinContent
  }
}
</script>
