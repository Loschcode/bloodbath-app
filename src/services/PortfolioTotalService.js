import _ from 'lodash'

class PortfolioTotalService {
  constructor (vm, portfolioCoins) {
    this.vm = vm
    this.portfolioCoins = portfolioCoins
  }

  allTimeHigh () {
    var allTimeHigh = 0.0

    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        allTimeHigh += (marketCoin.allTimeHigh * portfolioCoin.quantity)
      }
    })

    return allTimeHigh
  }

  capital () {
    var total = 0.0

    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        total += (marketCoin.price * portfolioCoin.quantity)
      }
    })

    return total
  }

  low () {
    let total = 0.0

    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        total += (marketCoin.dayLow * portfolioCoin.quantity)
      }
    })
    return total
  }

  high () {
    let total = 0.0

    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        total += (marketCoin.dayHigh * portfolioCoin.quantity)
      }
    })
    return total
  }

  variation () {
    var variations = []
    var quantities = 0
    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        let variation = marketCoin.priceVariation * (portfolioCoin.quantity * marketCoin.price)
        variations.push(variation)
        quantities += (portfolioCoin.quantity * marketCoin.price)
      }
    })
    return (_.sum(variations) / quantities)
  }

  lowVariation () {
    var variations = []
    var quantities = 0

    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        let variation = marketCoin.dayLowVariation * (portfolioCoin.quantity * marketCoin.day_low)
        variations.push(variation)
        quantities += (portfolioCoin.quantity * marketCoin.dayLow)
      }
    })
    return (_.sum(variations) / quantities)
  }

  highVariation () {
    var variations = []
    var quantities = 0

    this.portfolioCoins.forEach(function (portfolioCoin, index, object) {
      let marketCoin = portfolioCoin.marketCoin
      if (!_.isNil(marketCoin)) {
        let variation = marketCoin.dayHighVariation * (portfolioCoin.quantity * marketCoin.dayHigh)
        variations.push(variation)
        quantities += (portfolioCoin.quantity * marketCoin.dayHigh)
      }
    })
    return (_.sum(variations) / quantities)
  }
}

export default PortfolioTotalService
