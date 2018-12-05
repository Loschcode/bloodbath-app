import { ShowMarketCoin, IndexMarketCoins } from '../schemas/marketCoin.gql'

export const marketCoins = {
  query () {
    return IndexMarketCoins
  },
  variables () {
    return {
      filter:  this.marketCoinsFilter,
      limit:  this.marketCoinsLimit
    }
  }
}

export const marketCoin = {
  query () {
    return ShowMarketCoin
  },
  variables () {
    return {
      id:      this.marketCoinId
    }
  },
  skip () {
    return !this.marketCoinId
  }
}
