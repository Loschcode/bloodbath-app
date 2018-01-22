<script>
/**
* USER get the user info easily from local storage
*/
export default {
  /**
  * We transmit the `cable` at intitialization
  * and DRY it up.
  */
  install (Vue) {
    Vue.prototype.$user = {

      /**
       * We set the user and stringify it for storage
       * Because localStorage is limited to string / value pair
       */
      set (userObject) {
        let user = JSON.stringify(userObject)
        return localStorage.setItem('user', user)
      },

      /**
       * get global user data
       */
      data () {
        let user = localStorage.getItem('user')
        if (user === null) {
          return user
        } else {
          return JSON.parse(localStorage.getItem('user'))
        }
      },

      /**
       * get the token from the user data (helper)
       */
      token () {
        if (this.data() === null) {
          return null
        } else {
          return this.data().token
        }
      }
    }
  }
}
</script>
