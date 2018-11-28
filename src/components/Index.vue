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

  created () {
    Object.assign(this, {
      redirectService:  new RedirectService(this, {
        userSetting: this.userSetting
      })
    })
  },

  watch: {
    // NOTE this has been added here but maybe we could abstract everything down the services
    // and do GraphQL request directly from them, with context.
    userPortfolio (newValue, oldValue) {
      this.redirectService.fromIndex(newValue)
    }
  },

  apollo: {
    userPortfolio,
    userSetting
  },

  components: {
    LoaderWave
  }
}
</script>
