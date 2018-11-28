import { ShowPortfolioCoin, IndexPortfolioCoins } from '../schemas/portfolioCoin.gql'

export const portfolioCoins = {
  query () {
    return IndexPortfolioCoins
  }
}

export const portfolioCoin = {
  query () {
    return ShowPortfolioCoin
  },
  variables () {
    return {
      id: this.portfolioCoinId
    }
  },
  skip () {
    return !this.portfolioCoinId
  }
}
