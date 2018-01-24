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
            My Account
          </div>
        </div>
      </div>

      <div class="row">
        <div class="gr-4">
          <input type="submit" class="button button__danger" value="Log-out from my account" @click="tryLogOut">
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
    }
  },

  methods: {
    tryLogOut () {
      this.$user.signOut()
      window.location.href = '/'
    }
  },

  components: {
    DefaultHeader
  }
}
</script>
