<template>
  <div class="connect">

    <default-header />

    <div class="connect-module">
      <div class="row">
        <div class="gr-4 gr-8@tablet gr-10@mobile gr-centered">

          <!-- Sign up -->
          <div v-if="newMember">

            <div class="module">
              <div class="module__title">
                <h2>My account</h2>
              </div>
              <div class="module__content">
                <div class="module__content-connect">
                  <div class="row">
                    <input ref="input" class="input__important" type="text" v-model="registerData.email" placeholder="my-email@gmail.com" v-on:keydown.enter="tryRegister" autofocus>
                    <input type="password" class="input__important" v-model="registerData.password" placeholder="password" v-on:keydown.enter="tryRegister">
                  </div>
                  <input type="submit" class="button button__important" value="Sign up" @click="tryRegister">
                </div>
              </div>
            </div>

            <div class="connect-module__links">
              <a @click="switchAuthenticate">
                <span class="icon-log-in"></span> Already have an account ? Sign in
              </a>
            </div>


          </div>
          <div v-else>

            <!-- Login -->
            <div class="module">
              <div class="module__title">
                <h2>My account</h2>
              </div>
              <div class="module__content">
                <div class="module__content-connect">
                  <div class="row">
                    <!-- Currency -->
                    <input ref="input" type="text" v-model="authenticateData.email" placeholder="my-email@gmail.com" v-on:keydown.enter="tryAuthenticate" autofocus>
                    <input type="password" v-model="authenticateData.password" placeholder="password" v-on:keydown.enter="tryAuthenticate">
                  </div>
                  <div class="row">
                    <input type="submit" class="button" value="Sign in" @click="tryAuthenticate">
                  </div>

                </div>
              </div>
            </div>

            <div class="connect-module__links">
              <a @click="switchRegister">
                <span class="icon-log-in"></span> No account ? Sign up now !
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import DefaultFooter from '@/components/DefaultFooter'

export default {
  data () {
    return {
      newMember: true,

      registerData: {
        email: null,
        password: null
      },
      authenticateData: {
        email: null,
        password: null
      }
    }
  },

  watch: {
    newMember () {
      this.$nextTick(() => {
        if (this.$refs.input) {
          this.$refs.input.focus()
        }
      })
    }
  },

  mounted () {
    if (this.$refs.input) {
      this.$refs.input.focus()
    }
  },

  methods: {
    switchAuthenticate () {
      this.newMember = false
    },

    switchRegister () {
      this.newMember = true
    },

    tryRegister () {
      this.$store.dispatch('registerUser', this.registerData)

      // Google Analytics Action
      this.$ga.event({
        eventCategory: 'connect',
        eventAction: 'tryRegister',
        eventValue: ''
      })
    },

    tryAuthenticate () {
      this.$store.dispatch('authenticateUser', this.authenticateData)
    }
  },

  components: {
    DefaultHeader,
    DefaultFooter
  }
}
</script>
