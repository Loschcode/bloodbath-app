<template>
  <div>
    <div class="row row-full footer-placeholder"></div>
    <div class="row row-full footer">
      <div class="gr-4">
        <div class="footer__right-border">
          <router-link :to="{ name: 'coins' }">
            <div class="footer__title">Coins</div>
            <div class="footer__content">
              <div class="footer__content-digits">
                <div v-if="primaryMarketCoin">
                  <animated-number :value="primaryMarketCoin.price" :type="`money`" /> {{ primaryMarketCoin.name }}
                </div>
                <div v-else>
                  -
                </div>
              </diV>
            </div>
          </router-link>
        </div>
      </div>
      <div class="gr-4">
        <router-link :to="{ name: 'portfolio' }">
          <div class="footer__title">Portfolio</div>
          <div class="footer__content">
            <div class="footer__content-digits">
              <portfolio-capital />
            </div>
          </div>
          </router-link>
        </div>
        <div class="gr-4">
          <div class="footer__left-border">
            <div v-if="this.$user.isConnected()">
              <router-link :to="{ name: 'setting' }">
                <div class="footer__title">My account</div>
                <div class="footer__content">{{ this.$user.data().email }}</div>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ name: 'connect' }">
                <div class="footer__title">My account</div>
                <div class="footer__content">You are not logged-in</div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioCapital from '@/components/PortfolioCapital'
import AnimatedNumber from '@/components/AnimatedNumber'

export default {
  data () {
    return {
    }
  },

  created () {
    this.$store.dispatch('fetchMarketCoin', { id: this.$user.data().user_setting.primary_market_coin_id })
  },

  destroyed () {
    this.$store.dispatch('unsubscribeMarketCoin', { id: this.$user.data().user_setting.primary_market_coin_id })
  },

  computed: {
    primaryMarketCoin () {
      return this.$store.getters.getMarketCoin(this.$user.data().user_setting.primary_market_coin_id)
    }
  },

  components: {
    PortfolioCapital,
    AnimatedNumber
  }
}
</script>
