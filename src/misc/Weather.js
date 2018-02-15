import _ from 'lodash'

var weather = {

  style (variation) {
    return _.snakeCase(this.current(variation)).replace(/_/g, '-')
  },

  current (variation) {
    variation = variation * 100

    /**
    * Positive
    */
    if (variation >= 30) {
      return 'Infinity and beyond'
    } else if (variation >= 20) {
      return 'To andromeda galaxy'
    } else if (variation >= 10) {
      return 'To the moon'
    } else if (variation >= 5) {
      return 'Very sunny'
    } else if (variation > 1.5) {
      return 'Sunny'
    }

    /**
    * Neutral
    */
    if (variation >= -1.5) {
      return 'Boring'
    }

    /**
    * Negative
    * @type {[type]}
    */
    if (variation <= -30) {
      return 'Death'
    } else if (variation <= -20) {
      return 'Apocalypse'
    } else if (variation <= -10) {
      return 'Bloodbath'
    } else if (variation <= -5) {
      return 'Bloody'
    } else if (variation < -1.5) {
      return 'Cloudy'
    }

    return ''
  }
}
export default weather
