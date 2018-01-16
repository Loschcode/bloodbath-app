<template>  
  <h1>
    {{ marketCoinProp.full_name }}
  </h1>
</template>

<script>
export default {
  props: [
    'marketCoinProp'
  ],

  data () {
    return {}
  }
}
</script>
