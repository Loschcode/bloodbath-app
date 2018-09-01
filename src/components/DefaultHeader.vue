<template>
  <div class="default-header">
    <div class="row row-full header" ref="header">

      <!-- Coin Section -->
      <div class="gr-4">
        <div :class="isCoinSectionClass()">
          <div class="header__right-border">
            <router-link :to="{ name: 'coins' }">
              <div class="header__title">Coins</div>
              <div class="header__content">
                <div class="header__content-digits">
                  <div v-if="primaryMarketCoin">
                    <div class="+desktop">
                      <animated-number :value="primaryMarketCoin.price" :type="`money`" /> {{ primaryMarketCoin.name }}
                    </div>
                    <div class="+mobile">
                      <animated-number :value="primaryMarketCoin.price_variation" :type="`percent`" :animatedColors="false" :numberColors="true" /> {{ primaryMarketCoin.name }}
                    </div>
                  </div>
                  <div v-else>
                    -
                  </div>
                </diV>
              </div>
            </router-link>
          </div>
        </div>

      </div>

      <!-- Portfolio Section -->
      <div class="gr-4">
        <div :class="isPortfolioSectionClass()">
          <router-link :to="{ name: 'portfolio' }">
            <div class="header__title">Portfolio</div>
            <div class="header__content">
              <div class="header__content-digits">
                <portfolio-capital />
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Setting Section -->
      <div class="gr-4">
        <div :class="isSettingSectionClass()">
          <div class="header__left-border">
            <div v-if="isConnected">
              <router-link :to="{ name: 'setting' }">
                <div class="header__title">My account</div>
                <div class="header__content +desktop">{{ currentUser.email }}</div>
                <div class="header__content +mobile">Logged-in</div>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ name: 'setting' }">
                <div class="header__title">My account</div>
                <div class="header__content +desktop">You are not logged-in</div>
                <div class="header__content +mobile">Sign-up now</div>
              </router-link>
            </div>
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

  watch: {
    userSetting (newValue, oldValue) {
      if (newValue) {
        this.$store.dispatch('fetchMarketCoin', { id: newValue.primary_market_coin_id })
      }
    },

    /**
     * If the primary coin is changed we change the listener to the channel
     * We also use this entry to listen to first channels
     */
    primaryMarketCoin (newValue, oldValue) {
      if (oldValue) {
        if (oldValue.id !== newValue.id) {
          this.$store.dispatch('unsubscribeMarketCoinChannel', { id: oldValue.id })
          this.$store.dispatch('subscribeMarketCoinChannel', newValue)
        }
      } else {
        this.$store.dispatch('subscribeMarketCoinChannel', newValue)
      }
    }
  },

  methods: {
    fullyLoaded () {
      return this.currentUser
    },

    isCoinSectionClass () {
      if (this.isCoinsSection()) {
        return 'header__highlight'
      }
    },

    isPortfolioSectionClass () {
      if (this.isPortfolioSection()) {
        return 'header__highlight'
      }
    },

    isSettingSectionClass () {
      if (this.isSettingSection()) {
        return 'header__highlight'
      }
    },

    isCoinsSection () {
      return this.$route.name === 'coins'
    },

    isPortfolioSection () {
      return this.$route.name === 'portfolio'
    },

    isSettingSection () {
      return this.$route.name === 'setting'
    }
  },

  created () {
    if (this.userSetting) {
      this.$store.dispatch('fetchMarketCoin', { id: this.userSetting.primary_market_coin_id })
    }
  },

  destroyed () {
    if (this.primaryMarketCoin) {
      this.$store.dispatch('unsubscribeMarketCoinChannel', this.primaryMarketCoin)
    }
  },

  computed: {
    userSetting () {
      return this.$store.getters.getUserSetting
    },

    currentUser () {
      return this.$store.getters.getCurrentUser
    },

    isConnected () {
      return this.currentUser.role !== 'anonymous'
    },

    primaryMarketCoin () {
      if (this.userSetting) {
        return this.$store.getters.getMarketCoin(this.userSetting.primary_market_coin_id)
      }
    }
  },

  components: {
    PortfolioCapital,
    AnimatedNumber
  }
}
</script>
