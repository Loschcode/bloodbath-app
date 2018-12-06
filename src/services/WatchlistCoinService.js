import { createWatchlistCoin } from '@/store/models/WatchlistCoin'
import EventsService from '@/services/EventsService'

class WatchlistCoinService {
  constructor (vm, marketCoin) {
    this.vm = vm
    this.marketCoin = marketCoin

    this.events = new EventsService(vm)
  }

  /**
  * We take care of the connection
  */
  async create () {
    try {
      console.log('create watchlist coin ...')
      await createWatchlistCoin(this.vm, this.marketCoin.id)
      this.events.success(`${this.marketCoin.coinName} added to your watchlist !`)
    } catch (error) {
      this.events.error('We were unable to add a coin on your watchlist')
    }
  }

  async destroy () {
    try {
      // console.log('create watchlist coin ...')
      // await destroyWatchlistCoin(this.vm, this.marketCoin.id)
      // this.events.success(`${this.marketCoin.coinName} removed from your watchlist !`)
    } catch (error) {
      this.events.error('We were unable to remove a coin from your watchlist')
    }
  }
}

export default WatchlistCoinService
