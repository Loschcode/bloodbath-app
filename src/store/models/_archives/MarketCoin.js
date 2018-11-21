import { Model } from '@vuex-orm/core'

export default class MarketCoin extends Model {
  static entity = 'marketCoins'

  static fields () {
    return {
      id: this.increment(),
      symbol: this.string(''),
      code: this.string(''),
      name: this.string(''),
      coinName: this.string(''),
      fullName: this.string(''),
      logoUrl: this.string(''),
      marketCap: this.number(0),
      price: this.number(0),
      dayOpen: this.number(0),
      dayHigh: this.number(0),
      dayLow: this.number(0),
      allTimeHigh: this.number(0),
      rank: this.number(0),
      priceVariation: this.number(0),
      dayHighVariation: this.number(0),
      dayLowVariation: this.number(0)
    }
  }
}
