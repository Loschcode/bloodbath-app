<template>
  <div class="portfolio-coin">
    <div v-if="portfolioCoin">

        <div class="gr-12 gr-12@mobile">
          <div class="module">
            <div class="module__title">
              <div class="gr-2">
                <div class="module__title-folio">
                  <span class="icon-folio --on"></span>
                </div>
              </div>
              <div class="gr-10">
                <h2>{{ marketCoin.coin_name }} <span class="module__subtitle">{{ marketCoin.name }}</span></h2>
              </div>
            </div>
            <div class="module__content">
              HERE VALUES
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import CoinPreviewContent from '@/components/CoinPreviewContent'

export default {
  props: [
    'portfolioCoinProp'
  ],

  data () {
    return {
    }
  },

  created () {
    this.$store.commit('setMarketCoin', this.portfolioCoinProp.market_coin)
    this.$store.commit('setPortfolioCoin', this.portfolioCoinProp)
  },

  watch: {
  },

  computed: {
    portfolioCoin () {
      return this.$store.getters.getPortfolioCoin(this.portfolioCoinProp.id)
    },

    marketCoin () {
      return this.$store.getters.getMarketCoin(this.portfolioCoinProp.market_coin.id)
    }
  },

  methods: {
  },

  components: {
    CoinPreviewContent
  }
}
</script>
