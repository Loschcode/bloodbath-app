import gql from 'graphql-tag'

export const WATCHLIST_COINS_QUERY = gql`
  query WatchlistCoinsQuery {
    watchlistCoins {
      id
      code
    }
  }
`

// export const GET_COIN_QUERY = gql`
//   query getCoinQuery ($id: String!) {
//     coin(id: $id) {
//       id
//       label
//     }
//   }
// `
