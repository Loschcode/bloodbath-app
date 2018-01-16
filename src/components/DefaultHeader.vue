<template>
  <div class="row row-full header">
    <div class="gr-4 gr-2@mobile">
      <slot name="left">
        <!-- By default we have a go back link -->
        <div class="header__back">
          <router-link :to="{ name: 'home'}">
            <span class="icon-back"></span>
          </router-link>
        </div>
      </slot>
    </div>
    <div class="gr-4 gr-8@mobile">
      <!-- Any title -->
      <div class="header__title">
        <slot name="center"></slot>
      </div>
    </div>
    <div class="gr-4 gr-2@mobile">
      <!-- Nothing yet -->
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: []
}
</script>
