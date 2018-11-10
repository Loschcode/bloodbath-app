// User Model
import { Model } from '@vuex-orm/core'

export default class MarketCoin extends Model {
  static entity = 'marketCoins'

  static fields () {
    return {
      id: this.attr(null)
    }
  }
}
