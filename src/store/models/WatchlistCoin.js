import { ShowWatchlistCoin, IndexWatchlistCoins, CreateWatchlistCoin } from '../schemas/watchlistCoin.gql'

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

export const createWatchlistCoin = async (vm, marketCoinId) => {
  await vm.$apollo.mutate({
    mutation:  CreateWatchlistCoin,
    variables: {
      marketCoinId
    },
    update: (store, { data: { createWatchlistCoin } }) => {
      vm.createWatchlistCoin = createWatchlistCoin
    }
  }).then((data) => {
    return data
  })
}
