import gql from 'graphql-tag'

export const GET_USER_SETTING_QUERY = gql`
query UserSettingQuery {
  getUserSetting {
    id
    weather
    primaryMarketCoin {
      id
    }
    baseCurrency {
      id
    }
  }
}
`

export const GET_PORTFOLIO_COINS_QUERY = gql`
query PortfolioCoinQuery {
  getPortfolioCoins {
    id
    quantity
    marketCoin {
      id
    }
  }
}
`

export const GET_PORTFOLIO_COIN_QUERY = gql`
query PortfolionQuery ($id: ID!) {
  getPortfolioCoin(id: $id) {
    id
    quantity
    marketCoin {
      id
    }
  }
}
`

export const GET_WATCHLIST_COIN_QUERY = gql`
query WatchlistCoinQuery ($id: ID!) {
  getWatchlistCoin(id: $id) {
    id
    marketCoin {
      id
    }
  }
}
`

export const GET_WATCHLIST_COINS_QUERY = gql`
query WatchlistCoinsQuery {
  getWatchlistCoins {
    id
    marketCoin {
      id
    }
  }
}
`

export const GET_WATCHLIST_QUERY = gql`
query WatchlistQuery {
  getWatchlist {
    id
    watchlistWeather
  }
}
`

export const GET_MARKET_COIN_QUERY = gql`
query MarketCoinQuery ($id: ID!) {
  getMarketCoin(id: $id) {
    id
    symbol
    code
    name
    coinName
    fullName
    logoUrl
    marketCap
    price
    dayOpen
    dayHigh
    dayLow
    allTimeHigh
    rank
    priceVariation
    dayHighVariation
    dayLowVariation
  }
}
`
