<template>
  <div class="test">
    {{currentUser}}
  </div>
</template>

<script>
import CurrentUser from '@/store/models/CurrentUser'

export default {
  computed: {
    currentUser: () => CurrentUser.all()
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
