<template>
  <div class="loader-wave">
    <div class="loader">

      <div class="loader__quote">
        <span class="loader__quote-outside">“</span>
        <slot name="quote"></slot>
        <span class="loader__quote-outside">”</span>
      </div>

      <span class="loader__text">
        <slot name="text"></slot>
      </span>

      <div class="sk-wave">
        <div class="sk-rect sk-rect1"></div>
        <div class="sk-rect sk-rect2"></div>
        <div class="sk-rect sk-rect3"></div>
        <div class="sk-rect sk-rect4"></div>
        <div class="sk-rect sk-rect5"></div>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  components: {
  }
}
</script>
