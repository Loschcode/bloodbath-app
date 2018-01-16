<template>
  <div class="coin-preview">

    <!-- Base Price -->
    <div class="gr-12 gr-12@mobile">
      <div class="module">
        <div class="module__title">
          <h2>{{ marketCoin.name }}</h2>
        </div>
        <div class="module__content">
          {{ marketCoin.price }}
        </div>
        <div class="module__footer">
        </div>
      </div>
    </div>

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
