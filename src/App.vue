<template>
  <div id="app">
    <div v-if="$auth.ready()">
      <router-view/>
    </div>

    <div v-if="!$auth.ready()">
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
