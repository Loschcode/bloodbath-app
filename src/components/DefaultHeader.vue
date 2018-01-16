<template>
  <div class="row row-full header">
    <div class="gr-4 gr-2@mobile">
      <slot name="left"></slot>
    </div>
    <div class="gr-4 gr-8@mobile">
      <div class="header__title">
        <slot name="center"></slot>
      </div>
    </div>
    <div class="gr-4 gr-2@mobile">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: []
}
</script>
