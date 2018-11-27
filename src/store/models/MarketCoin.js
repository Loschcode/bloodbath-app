import { ShowMarketCoin, IndexMarketCoins } from '../schemas/marketCoin.gql'

export const watchlistCoins = {
  query () {
    return IndexMarketCoins
  }
}

export const watchlistCoin = {
  query () {
    return ShowMarketCoin
  },
  variables () {
    return {
      id: this.watchlistCoinId
    }
  },
  skip () {
    return !this.watchlistCoinId
  }
}
