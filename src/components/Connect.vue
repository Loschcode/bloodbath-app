<template>
  <div class="connect">
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
            <input type="submit" class="button button__important" value="Create a new account" @click="tryRegister">
          </div>
        </div>
      </div>

      <div class="module__after-footer">
        <a @click="switchAuthenticate">
          Already have an account ? Log in
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
              <input type="submit" class="button" value="Access my account" @click="tryAuthenticate">
            </div>

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
    },

    tryAuthenticate () {
      this.$store.dispatch('authenticateUser', this.authenticateData)
    }
  },

  components: {
    DefaultHeader
  }
}
</script>
