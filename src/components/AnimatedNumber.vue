<template>
  <div>
    <div v-if="animatedColors">
      <div v-if="showValue">
        <div v-if="valueUp">
          <span class="number__up">{{ formattedValue() }}</span>
        </div>
        <div v-else>
          <span class="number__down">{{ formattedValue() }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="numberColors">
        <div v-if="value > 0">
          <span class="number__positive">{{ formattedValue() }}</span>
        </div>
        <div v-else>
          <span class="number__negative">{{ formattedValue() }}</span>
        </div>
      </div>
      <div v-else>
        <span>{{ formattedValue() }}</span>
      </div>
    </div>
  </div>
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
      required: false,
      default: false
    },
    animatedColors: {
      type: Boolean,
      required: false,
      default: true
    },
    numberColors: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function () {
    return {
      changingValue: 0,
      valueUp: true,
      showValue: true
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      // NOTE : this code should be cleaned up and improved
      this.showValue = false
      this.$nextTick(() => {
        this.showValue = true
        this.loopValue(newValue, oldValue)
      })
    }
  },

  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {

    /**
     * We loop the value to have a cool animated effect on the numbers
     */
    loopValue: function (newValue, oldValue) {
      if (oldValue > newValue) {
        this.valueUp = false
      } else if (oldValue === newValue) {
      } else {
        this.valueUp = true
      }
      this.tween(oldValue, newValue)
    },

    formattedValue: function () {
      let digits = this.changingValue
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

      new TWEEN.Tween({ changingValue: startValue })
        .to({ changingValue: endValue }, 500)
        .onUpdate(function (object) {
          vm.changingValue = object.changingValue.toFixed(6)
        })
        .start()

      animate()
    }
  }
}
</script>
