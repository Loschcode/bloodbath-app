<template>
  <div class="test">
    {{currentUser}}
  </div>
</template>

<script>
import { currentUser } from '@/store/models/CurrentUser'

export default {
  apollo: {
    currentUser
  }
}
</script>
