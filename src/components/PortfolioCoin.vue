<template>
  <div class="portfolio-coin">
    <div v-if="portfolioCoin">

        <div class="gr-12 gr-12@mobile">
          <div class="module">
            <div class="module__title">
            </div>
            <div class="module__content">
            </div>
            <div class="module__footer">
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import CoinPreviewTitle from '@/components/CoinPreviewTitle'
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
    // INFINITE LOOP
    this.$store.commit('setPortfolioCoin', this.portfolioCoinProp)
  },

  watch: {
  },

  computed: {
    portfolioCoin () {
      return this.$store.getters.getPortfolioCoin(this.portfolioCoinProp.id)
    }
  },

  methods: {
  },

  components: {
    CoinPreviewTitle,
    CoinPreviewContent
  }
}
</script>
