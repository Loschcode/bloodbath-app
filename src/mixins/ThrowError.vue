<script>
import _ from 'lodash'

export default {
  props: {
  },
  mounted () {
  },
  methods: {
    throwError (error) {
      if (_.isEmpty(error.response)) {
        console.warn(error)
      } else {
        console.warn(error.response.data)
      }
      return false
    }
  }
}
</script>
