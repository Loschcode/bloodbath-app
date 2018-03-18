<template>
  <div class="index">
    <!-- TODO HERE :
      - collect if the weather is on on the basic profile
      on full page with reversed color
      - show portfolio weather
      - or show coin weather
      - add buttons (white borders) depending the section to "see more" or "go to portfolio"
    -->
    <div class="loader__full-page">
      <loader-cube>
        <span slot="text">
          Collecting basic information
        </span>
      </loader-cube>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { mapGetters } from 'vuex'
import LoaderCube from '@/components/LoaderCube'

export default {
  data () {
    return {
      hasPortfolio: null
    }
  },

  created () {
    this.$store.dispatch('fetchPortfolioCoins')
  },

  watch: {
    portfolioCoins (newValue, oldValue) {
      if (newValue.length === 0) {
        this.hasPortfolio = false;
        // router.push({ name: 'coins', params: { } })
      } else {
        this.hasPortfolio = true;
        // router.push({ name: 'portfolio', params: { } })
      }
    }
  },

  computed: {
    ...mapGetters({
      portfolioCoins: 'getPortfolioCoins'
    })
  },

  components: {
    LoaderCube
  }
}
</script>
