import gql from 'graphql-tag'

export const watchlistCoins = {
  query: gql`query watchlistCoinsQuery {
    watchlistCoins {
      id
      marketCoin {
        id
      }
    }
  }`,
  result ({ data }) {
    this.watchlistCoins = data.watchlistCoins
  }
}
