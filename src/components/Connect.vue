<template>
  <div class="coins">
    <default-header>
      <div slot="left">
      </div>
      <div slot="center">
        <div class="header__title">
          <h1></h1>
        </div>
      </div>
      <div slot="right">
      </div>
    </default-header>

    <!-- Sign-up -->
    <div class="section">
      <div class="row">
        <div class="gr-12">
          <div class="section__title">

          </div>
        </div>
      </div>

      <!-- Sign up -->
      <div v-if="newMember">

      <div class="row">
        <div class="gr-6 gr-12@mobile gr-centered">

          <div class="module">
            <div class="module__title">
              <h2>Sign up</h2>
            </div>
            <div class="module__content">
              <div class="module__content-connect">
                <div class="module__content-connect-note">In order to keep your data safe and access them when you want, we recommend to register for free to our site.</div>
                <input type="text" v-model="registerData.email" placeholder="my-email@gmail.com" v-on:keydown.enter="tryRegister" autofocus>
                <input type="password" v-model="registerData.password" placeholder="password" v-on:keydown.enter="tryRegister">
                <input type="submit" class="button" value="Create my account" @click="tryRegister">
              </div>
            </div>
          </div>

          <div class="module__after-footer">
            <a @click="switchAuthenticate">
              Already have an account ? Log in
            </a>
          </div>

        </div>
      </div>

      </div>
      <div v-else>

      <!-- Login -->
      <div class="row">
        <div class="gr-6 gr-12@mobile gr-centered">

          <div class="module">
            <div class="module__title">
              <h2>Log in</h2>
            </div>
            <div class="module__content">
              <div class="module__content-connect">
                <input type="text" v-model="authenticateData.email" placeholder="my-email@gmail.com" v-on:keydown.enter="tryAuthenticate" autofocus>
                <input type="password" v-model="authenticateData.password" placeholder="password" v-on:keydown.enter="tryAuthenticate">
                <input type="submit" class="button" value="Access my account" @click="tryAuthenticate">
              </div>
            </div>
          </div>

          <div class="module__after-footer">
            <a @click="switchRegister">
              Don't have an account ? Sign Up
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

  created () {
  },

  methods: {
    switchAuthenticate () {
      this.newMember = false
    },

    switchRegister () {
      this.newMember = true
    },

    tryRegister () {
      this.$axios
      .post(`connect/register`, this.registerData)
      .then(
        (response) => {
          this.$store.commit('setCurrentUser', response.data.user)
          window.location.href = '/'
        },

        (error) => {
          console.warn(error)
        }
      )
    },

    tryAuthenticate () {
      this.$axios
      .post(`connect/authenticate`, this.authenticateData)
      .then(
        (response) => {
          this.$store.commit('setCurrentUser', response.data.user)
          window.location.href = '/'
        },

        (error) => {
          console.warn(error)
        }
      )
    }
  },

  components: {
    DefaultHeader
  }
}
</script>
