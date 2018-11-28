import { ShowWatchlistCoin, IndexWatchlistCoins } from '../schemas/watchlistCoin.gql'

export const watchlistCoins = {
  query () {
    return IndexWatchlistCoins
  }
}

export const watchlistCoin = {
  query () {
    return ShowWatchlistCoin
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
