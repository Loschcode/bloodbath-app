<template>
  <div class="test">
    {{users}}
  </div>
</template>

<script>
import User from '@/store/models/User'

export default {
  computed: {
    users: () => User.all()
  },

  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      await User.fetch()
    }
  }
}
</script>
