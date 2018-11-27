import { ShowPortfolioCoin, IndexPortfolioCoins } from '../schemas/portfolioCoin.gql'

export const watchlistCoins = {
  query () {
    return IndexPortfolioCoins
  }
}

export const watchlistCoin = {
  query () {
    return ShowPortfolioCoin
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
