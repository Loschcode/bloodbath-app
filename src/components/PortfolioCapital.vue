<template>
  <div class="portfolio-capital">
    <div v-if="totalCapital">
      <animated-number
        :value="totalCapital"
        :type="`money`"
      />
    </div>
    <div v-else>
      Make one now !
    </div>
  </div>
</template>

<script>
import AnimatedNumber from '@/components/AnimatedNumber'

import { portfolioCoins } from '@/store/models/portfolioCoin'

export default {
  data () {
    return {
    }
  },

  computed: {
    totalCapital () {
      var total = 0.0

      if (this.portfolioCoins) {
        this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
          let marketCoin = portfolioCoin.marketCoin
          total += (marketCoin.price * portfolioCoin.quantity)
        })
      }

      return total
    }
  },

  apollo: {
    portfolioCoins
  },

  components: {
    AnimatedNumber
  }
}
</script>
