<template>
  <div class="row row-full header">
    <div class="gr-2">
      <slot name="left">
        <!-- By default we have a go back link -->
        <div class="header__back">
          <a href="#" @click="backLink">
            <span class="icon-back"></span>
          </a>
        </div>
      </slot>
    </div>
    <div class="gr-8">
      <slot name="center"></slot>
    </div>
    <div class="gr-2">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import router from '@/router'

export default {
  props: [],

  methods: {
    backLink () {
      return router.go(-1)
    }
  }
}
</script>
