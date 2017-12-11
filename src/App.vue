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
  name: 'app',
  data () {
    return {}
  },
  created () {
    if (!this.$auth.check()) {
      console.log('definitely not logged-in')

      this.$auth.login({
        data: { anonymous: true },
        // data: { auth: {email: 'test@test.com', password: 'test'} }, <-- normal logging
        rememberMe: true,
        fetchUser: false
      })
      .then(() => {
        console.log('yeahboi')
      }, (res) => {
        this.error = res.data
      })
    }
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
