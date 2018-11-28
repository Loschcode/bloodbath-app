<template>
  <div class="default-header">
    <div
      class="row header"
      ref="header"
    >

      <!-- Watchlist Section -->
      <div class="gr-4">
        <div :class="isWatchlistSectionClass()">
          <div class="header__right-border">
            <router-link :to="{ name: 'watchlist' }">
              <div class="header__title">Watchlist</div>
              <div class="header__content">
                <div class="header__content-digits">
                  <div v-if="primaryMarketCoin">
                    <div class="+desktop">
                      <animated-number
                        :value="primaryMarketCoin.price"
                        :type="`money`"
                      /> / {{ primaryMarketCoin.name }}
                    </div>
                    <div class="+mobile">
                      <animated-number
                        :value="primaryMarketCoin.price_variation"
                        :type="`percent`"
                        :animatedColors="false"
                        :numberColors="true"
                      /> {{ primaryMarketCoin.name }}
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
                <div class="header__title">Settings</div>
                <div class="header__content +desktop">{{ currentUser.email }}</div>
                <div class="header__content +mobile">Logged-in</div>
              </router-link>
            </div>
            <div v-else>
              <router-link :to="{ name: 'setting' }">
                <div class="header__title">Settings</div>
                <div class="header__content +desktop">You are not logged-in</div>
                <div class="header__content +mobile">Sign-up for free</div>
              </router-link>
            </div>
          </div>
        </div>

      </div>

    </div>

    <div class="row">

      <div v-if="isWatchlistSection()">
        <watchlist-header />
      </div>
      <div v-else-if="isPortfolioSection()">
        <portfolio-header />
      </div>
      <div v-else-if="isSettingSection()">
      </div>

    </div>

  </div>
</template>

<script>
import WatchlistHeader from '@/components/WatchlistHeader'
import PortfolioCapital from '@/components/PortfolioCapital'
import PortfolioHeader from '@/components/PortfolioHeader'

import { currentUser } from '@/store/models/User'
import { userSetting } from '@/store/models/UserSetting'

export default {
  data () {
    return {
    }
  },

  methods: {
    fullyLoaded () {
      return this.currentUser
    },

    isWatchlistSectionClass () {
      if (this.isWatchlistSection()) {
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

    isWatchlistSection () {
      return this.$route.name === 'watchlist'
    },

    isPortfolioSection () {
      return this.$route.name === 'portfolio'
    },

    isSettingSection () {
      return this.$route.name === 'setting'
    }
  },

  computed: {
    isConnected () {
      if (this.currentUser) {
        return this.currentUser.role !== 'anonymous'
      }
    },

    primaryMarketCoin () {
      if (this.userSetting) {
        return this.userSetting.primaryMarketCoin
      }
    },

    currentBaseCurrency () {
      return this.userSetting.baseCurrency
    }
  },

  apollo: {
    currentUser,
    userSetting
  },

  components: {
    WatchlistHeader,
    PortfolioCapital,
    PortfolioHeader
  }
}
</script>
