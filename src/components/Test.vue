<template>
  <div class="test">
    {{createAnonymousUser}}
  </div>
</template>

<script>
import { createAnonymousUser } from '@/store/models/User'

export default {
  data () {
    return {
      createAnonymousUser: {}
    }
  },

  created () {
    createAnonymousUser(this)
  }

  // apollo: {
  //   createAnonymousUser
  // }
}
</script>
