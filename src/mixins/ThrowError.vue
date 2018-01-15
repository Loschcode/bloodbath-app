<script>
export default {
  props: {
  },
  mounted () {
  },
  methods: {
    throwError (error) {
      console.warn(error.response.data)
      return false
    }
  }
}
</script>
