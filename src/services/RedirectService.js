import router from '@/router'

class RedirectService {
  constructor (vm) {
    this.vm = vm
  }

  fromIndex (portfolioCoins) {
    if (portfolioCoins.length === 0) {
      this.goWatchlist()
    } else {
      this.goPortfolio()
    }
  }

  goWatchlist () {
    if (this._isWeather()) {
      router.push({ name: 'watchlist-weather', params: { } })
    } else {
      router.push({ name: 'watchlist', params: { } })
    }
  }

  goPortfolio () {
    if (this._isWeather()) {
      router.push({ name: 'portfolio-weather', params: { } })
    } else {
      router.push({ name: 'portfolio', params: { } })
    }
  }

  _isWeather () {
    return this.vm.userSetting.weather
  }
}

export default RedirectService
