<template>
  <div class="row row-full header">
    <div class="gr-4">
    </div>
    <div class="gr-4">
      <div class="header__title">
        <h1>
          {{ marketCoinProp.full_name }}
        </h1>
      </div>
    </div>
    <div class="gr-4">
    </div>
  </div>
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
