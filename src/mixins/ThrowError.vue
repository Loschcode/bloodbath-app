<script>
export default {
  props: {
  },
  mounted () {
  },
  methods: {
    throwError (error) {
      console.log(error.response.data)
      return false
    }
  }
}
</script>
