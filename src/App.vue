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
    // TODO : abstract this shit somewhere else
    if (!this.$auth.check()) {
      console.log('definitely not logged-in')
      // TODO : Make the anonymous login
      this.$auth.login({
        data: {email: 'test@test.com', password: '12345678'},
        redirect: false
      })
      .then((res) => {
        console.log('token : ' + this.$auth.token())
      }, (res) => {
        console.log('failed log-in')
        this.error = res.data
      })
    }
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
