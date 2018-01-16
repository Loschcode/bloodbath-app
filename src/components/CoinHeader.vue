<template>
  <h1>
    {{ marketCoin.full_name }}
  </h1>
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
