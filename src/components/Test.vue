<template>
  <div class="test">
    {{createAnonymousUser}}
  </div>
</template>

<script>
import { createAnonymousUser } from '@/store/models/user'

export default {
  created () {
    this.createAnonymousUser()
  },

  methods: {
    createAnonymousUser
  }
}
</script>
