import { GetWatchlistCoin, GetWatchlistCoins } from '../schemas/watchlistCoin.gql'

export const watchlistCoins = {
  query () {
    return GetWatchlistCoins
  },
}

export const watchlistCoin = {
  query () {
    return GetWatchlistCoin
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