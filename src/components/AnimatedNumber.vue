<template>
<span>{{ formattedValue() }}</span>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import numeral from 'numeral'

export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: false
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    formattedValue: function () {
      let digits = this.tweeningValue
      if (this.type === 'money') {
        return numeral(digits).format('$0,0.000')
      } else if (this.type === 'big-money') {
        return numeral(digits).format('$0,0')
      } else if (this.type === 'percent') {
        return numeral(digits).format('0,0.00%')
      } else {
        return digits
      }
    },

    tween: function (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function (object) {
          vm.tweeningValue = object.tweeningValue.toFixed(6)
        })
        .start()

      animate()
    }
  }
}
</script>