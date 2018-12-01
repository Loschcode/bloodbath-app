// import _ from 'lodash'

class PortfolioTotalService {
  constructor (vm, portfolioCoins) {
    this.vm = vm
  }

  allTimeHigh () {
    return 0
  }

  capital () {
    return 0
  }

  low () {
    return 0
  }

  high () {
    return 0
  }

  variation () {
    return 0
  }

  lowVariation () {
    return 0
  }

  highVariation () {
    return 0
  }
}

export default PortfolioTotalService

  // getTotalAllTimeHigh (state, getters) {
  //   var allTimeHigh = 0.0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       allTimeHigh += (marketCoin.all_time_high * portfolioCoin.quantity)
  //     }
  //   })

  //   return allTimeHigh
  // },

  // getTotalCapital (state, getters) {
  //   var total = 0.0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       total += (marketCoin.price * portfolioCoin.quantity)
  //     }
  //   })

  //   return total
  // },

  // getTotalLow (state, getters) {
  //   let total = 0.0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       total += (marketCoin.day_low * portfolioCoin.quantity)
  //     }
  //   })
  //   return total
  // },

  // getTotalHigh (state, getters) {
  //   let total = 0.0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       total += (marketCoin.day_high * portfolioCoin.quantity)
  //     }
  //   })
  //   return total
  // },

  // getTotalVariation (state, getters) {
  //   var variations = []
  //   var quantities = 0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       let variation = marketCoin.price_variation * (portfolioCoin.quantity * marketCoin.price)
  //       variations.push(variation)
  //       quantities += (portfolioCoin.quantity * marketCoin.price)
  //     }
  //   })
  //   return (_.sum(variations) / quantities)
  // },

  // getTotalLowVariation (state, getters) {
  //   var variations = []
  //   var quantities = 0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       let variation = marketCoin.day_low_variation * (portfolioCoin.quantity * marketCoin.day_low)
  //       variations.push(variation)
  //       quantities += (portfolioCoin.quantity * marketCoin.day_low)
  //     }
  //   })
  //   return (_.sum(variations) / quantities)
  // },

  // getTotalHighVariation (state, getters) {
  //   var variations = []
  //   var quantities = 0
  //   let portfolioCoins = getters.getPortfolioCoins

  //   portfolioCoins.forEach(function (portfolioCoin, index, object) {
  //     let marketCoin = getters.getMarketCoin(portfolioCoin.market_coin_id)
  //     if (!_.isNil(marketCoin)) {
  //       let variation = marketCoin.day_high_variation * (portfolioCoin.quantity * marketCoin.day_high)
  //       variations.push(variation)
  //       quantities += (portfolioCoin.quantity * marketCoin.day_high)
  //     }
  //   })
  //   return (_.sum(variations) / quantities)
  // }
