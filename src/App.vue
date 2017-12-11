<template>
  <div id="app">
    <div v-if="$auth.ready()">

      <div v-if="$auth.check()">
        <router-view/>
      </div>

      <div v-else>
        Recovering history ...
      </div>

    </div>

    <div v-else>
        Loading ...
    </div>

  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
