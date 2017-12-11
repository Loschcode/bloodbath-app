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
        data: {email: 'test@test.com', password: '12345678'}
      })
      .then((res) => {
        console.log(res.data)
        console.log('success log-in')
        console.log('token : ' + this.$auth.token())
      }, (res) => {
        console.log('fail log-in')
        this.error = res.data
      })
    }
  }
}
</script>

<style lang="scss">
   @import 'assets/scss/main.scss'
</style>
