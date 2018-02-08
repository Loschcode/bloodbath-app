<template>
  <span v-if="currentBaseCurrency">
    <span v-if="animatedColors">
      <span v-if="showValue">
        <span v-if="valueUp">
          <span class="number__up">{{ endValue }}</span>
        </span>
        <span v-else>
          <span class="number__down">{{ endValue }}</span>
        </span>
      </span>
    </span>
    <span v-else>
      <span v-if="numberColors">
        <span v-if="value > 0">
          <span class="number__positive">{{ endValue }}</span>
        </span>
        <span v-else>
          <span class="number__negative">{{ endValue }}</span>
        </span>
      </span>
      <span v-else>
        <span>{{ endValue }}</span>
      </span>
    </span>
  </span>
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
      baseValue: 0,
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

  created () {
    if ((!this.currentBaseCurrency) && (this.userSetting) && (this.userSetting.base_currency_id)) {
      this.$store.dispatch('fetchBaseCurrency', { id: this.userSetting.base_currency_id })
    }
  },

  computed: {
    /**
     * We format the value to % / $ and with some precision over the final number
     */
    endValue () {
      if ((this.type === 'money') || (this.type === 'big-money')) {
        return this.processMoney(this.baseValue)
      }

      if (this.type === 'percent') {
        return this.processPercent(this.baseValue)
      }

      if (this.type === 'quantity') {
        return this.processQuantity(this.baseValue)
      }

      return currentValue
    },

    userSetting () {
      return this.$store.getters.getUserSetting
    },

    currentBaseCurrency () {
      if (this.userSetting) {
        return this.$store.getters.getBaseCurrency(this.userSetting.base_currency_id)
      }
    }
  },

  mounted: function () {
    // this.loopValue()
    this.tween(0, this.value)
  },

  methods: {
    processQuantity (value) {
      return numeral(value).format('0,0.00')
    },

    processPercent (value) {
      let end = numeral(value).format('0,0.00%')
      if (value > 0.00) {
        end = `+${end}`
      }
      return end
    },

    processMoney (value) {
      let symbol = this.currentBaseCurrency.symbol
      let exchangeRate = this.currentBaseCurrency.exchange_rate

      let exchangeDigits = (value / exchangeRate)
      let end = value

      if (this.type === 'money') {
        end = numeral(exchangeDigits).format(`0,0.000`)
      } else {
        end = numeral(exchangeDigits).format(`0,0`)
      }

      return `${symbol}${end}`
    },

    /**
     * We loop the value to have a cool animated effect on the numbers
     */
    loopValue (newValue, oldValue) {
      this.refreshValueColor(newValue, oldValue)
      this.tween(oldValue, newValue)
    },

    /**
     * We refresh the color if needed (it will highlight in red or green with the SCSS)
     */
    refreshValueColor (newValue, oldValue) {
      if (oldValue > newValue) {
        this.valueUp = false
      } else if (oldValue < newValue) {
        this.valueUp = true
      }
    },

    /**
     * Animation tweak to go from 0,1,2,3 progressively
     */
    tween (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ baseValue: startValue })
        .to({ baseValue: endValue }, 500)
        .onUpdate(function (object) {
          vm.baseValue = object.baseValue.toFixed(6)
        })
        .start()

      animate()
    }
  }
}
</script>
