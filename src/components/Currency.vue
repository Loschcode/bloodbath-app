<template>
  <div>
    {{ msg }}{{ $route.params.id }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Currency is '
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
