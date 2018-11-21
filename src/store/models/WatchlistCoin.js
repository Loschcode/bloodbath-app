import gql from 'graphql-tag'

export const watchlistCoins = {
  query () {
    return gql`query watchlistCoinsQuery {
      watchlistCoins {
        id
        marketCoin {
          id
        }
      }
    }`
  },
  result ({ data }) {
  }
}

export const watchlistCoin = {
  query () {
    return gql`query watchlistCoinQuery ($id: ID!) {
      watchlistCoin(id: $id) {
        id
        marketCoin {
          id
        }
      }
    }`
  },
  result ({ data }) {
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
