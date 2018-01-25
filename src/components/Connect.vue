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

      <!-- Register -->
      <div class="row">
        <div class="gr-6 gr-centered">

          <div class="module">
            <div class="module__title">
              <h2>Are you new ?</h2>
            </div>
            <div class="module__content">
              <div class="module__content-connect">
                <input type="text" v-model="registerData.email" placeholder="my-email@gmail.com" v-on:keydown.enter="tryRegister">
                <input type="password" v-model="registerData.password" placeholder="password" v-on:keydown.enter="tryRegister">
                <input type="submit" class="button" value="Create my account" @click="tryRegister">
              </div>
            </div>
            <div class="module__footer">
            </div>
          </div>

        </div>
      </div>

      <!-- Login -->
      <div class="row">
        <div class="gr-6 gr-centered">

          <div class="module">
            <div class="module__title">
              <h2>Already member ?</h2>
            </div>
            <div class="module__content">
              <div class="module__content-connect">
                <input type="text" v-model="authenticateData.email" placeholder="my-email@gmail.com" v-on:keydown.enter="tryAuthenticate">
                <input type="password" v-model="authenticateData.password" placeholder="password" v-on:keydown.enter="tryAuthenticate">
                <input type="submit" class="button" value="Access my account" @click="tryAuthenticate">
              </div>
            </div>
            <div class="module__footer">
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
    // TODO : get out if this.$user.isConnected()
  },

  methods: {
    tryRegister () {
      this.$axios
      .post(`connect/register`, this.registerData)
      .then(
        (response) => {
          this.$user.set(response.data.user)
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
          this.$user.set(response.data.user)
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
