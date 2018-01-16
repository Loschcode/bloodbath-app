<template>
  <div class="coin-header">
  <h1>
    {{ marketCoin.full_name }}
  </h1>
  </div>
</template>

<script>
export default {
  props: [
    'marketCoin'
  ],

  data () {
    return {}
  }
}
</script>
