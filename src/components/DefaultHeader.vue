<template>
  <div class="row row-full header">
    <div class="gr-3 gr-4@tablet gr-12@mobile">
      <slot name="left">
        <!-- By default we have a go back link -->
        <div class="header__back">
          <router-link :to="{ name: 'home'}">
            <span class="icon-back"></span>
          </router-link>
        </div>
      </slot>
    </div>
    <div class="gr-6 gr-8@mobile">
      <slot name="center"></slot>
    </div>
    <div class="gr-3 gr-2@mobile">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: []
}
</script>
