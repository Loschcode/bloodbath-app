<template>
  <div class="index">
    <div class="loader__full-page">
      <loader-wave>
        <span slot="quote">
          Coin : n.m. A small, round piece of metal, usually silver or copper coloured, that is used as money.
        </span>
        <span slot="text">
          Collecting basic information
        </span>
      </loader-wave>
    </div>

    <div v-show="dataSynced"></div>
  </div>
</template>

<script>
import LoaderWave from '@/components/LoaderWave'
import RedirectService from '@/services/RedirectService'

import { userPortfolio } from '@/store/models/UserPortfolio'
import { userSetting } from '@/store/models/UserSetting'

export default {
  data () {
    return {
    }
  },

  computed: {
    dataSynced () {
      return this.userSetting && this.userPortfolio
    }
  },

  updated () {
    if (this.dataSynced) {
      this.redirect()
    }
  },

  methods: {
    redirect () {
      new RedirectService(this, {
        userSetting: this.userSetting
      }).fromIndex(this.userPortfolio)
    }
  },

  apollo: {
    userSetting,
    userPortfolio
  },

  components: {
    LoaderWave
  }
}
</script>
