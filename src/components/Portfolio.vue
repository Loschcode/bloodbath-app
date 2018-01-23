<template>
  <div class="coins">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <div class="header__title">
          <h1>Portfolio</h1>
        </div>
      </div>
    </default-header>

    <!-- Search -->
    <search-coins>
      <div slot="title">
        Add new coin
      </div>
    </search-coins>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
// import CoinPreview from '@/components/CoinPreview'
import SearchCoins from '@/components/SearchCoins'
import EventBus from '@/misc/EventBus'

import { mapGetters } from 'vuex'

export default {
  data () {
    return {
    }
  },

  created () {
    // this.$store.dispatch('fetchFavoriteCoins')
    // this.$store.dispatch('fetchTopCoins')
  },

  computed: {
    ...mapGetters({
      // favoriteCoins: 'getFavoriteCoins',
      // topCoins: 'getTopCoins'
    })
  },

  mounted () {
  },

  methods: {
  },

  components: {
    DefaultHeader,
    // CoinPreview,
    SearchCoins,
    EventBus
  }
}
</script>
