<template>
  <div class="row row-full header">
    <div class="gr-4 gr-2@mobile">
    </div>
    <div class="gr-4 gr-8@mobile">
      <div class="header__title">
        <h1>
          {{ marketCoinProp.full_name }}
        </h1>
      </div>
    </div>
    <div class="gr-4 gr-2@mobile">
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
