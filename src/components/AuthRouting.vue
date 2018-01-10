<template>
  <div class="auth-routing" v-if="$auth.ready()">
    <div v-if="$auth.check()">
      <router-view />
    </div>

    <div v-else>
      <div class="loader">
        Recovering history ...
      </div>
    </div>

  </div>

  <div v-else>
    <div class="loader">
      Loading ...
    </div>
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
