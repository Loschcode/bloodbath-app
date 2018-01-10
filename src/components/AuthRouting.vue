<template>
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
</template>

<script>
export default {

  data () {
    return {}
  },

  created () {
    this.doAuth({email: 'test@test.com', password: '12345678'})
  },

  methods: {
    /**
     * Authenticate the client
     */
    doAuth: function (credentials) {
      if (!this.$auth.check()) {
        console.log('definitely not logged-in')

        this.$auth.login({
          data: credentials,
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
}
</script>
