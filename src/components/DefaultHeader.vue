<template>
  <div class="row row-full header">
    <div class="gr-2">
      <slot name="left">
        <!-- By default we have a go back link -->
        <div class="header__back">
          <router-link :to="{ name: 'coins'}">
            <span class="icon-back"></span>
          </router-link>
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
export default {
  props: []
}
</script>
