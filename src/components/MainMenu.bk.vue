<template>
  <div class="main-menu">
    <div class="header__center-menu">
      <div class="row">
        <div class="gr-2 gr-12@mobile">
          <router-link :to="{ name: 'coins' }">
            Coins
          </router-link>
        </div>
        <div class="gr-2 gr-12@mobile">
          <router-link :to="{ name: 'portfolio' }">
            Portfolio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>
