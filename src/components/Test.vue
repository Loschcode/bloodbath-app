<template>
  <div class="test">
    {{currentUser}}
  </div>
</template>

<script>
import { currentUser } from '@/store/models/user'

export default {
  apollo: {
    currentUser
  }
}
</script>
