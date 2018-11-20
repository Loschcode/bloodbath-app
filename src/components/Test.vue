<template>
  <div class="test">
    {{currentUsers}}
  </div>
</template>

<script>
import CurrentUser from '@/store/models/CurrentUser'

export default {
  computed: {
    currentUsers: () => CurrentUser.all()
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      await CurrentUser.fetch()
    }
  }
}
</script>
