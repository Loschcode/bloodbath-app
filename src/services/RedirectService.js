import router from '@/router'

class RedirectService {
  constructor (vm, { userSetting }) {
    this.vm = vm
    this.userSetting = userSetting
  }

  fromIndex (portfolioCoins) {
    if (portfolioCoins.length === 0) {
      this._goWatchlist()
    } else {
      this._goPortfolio()
    }
  }

  _goWatchlist () {
    if (this._isWeather()) {
      router.push({ name: 'watchlist-weather', params: { } })
    } else {
      router.push({ name: 'watchlist', params: { } })
    }
  }

  _goPortfolio () {
    if (this._isWeather()) {
      router.push({ name: 'portfolio-weather', params: { } })
    } else {
      router.push({ name: 'portfolio', params: { } })
    }
  }

  _isWeather () {
    return this.userSetting.weather
  }
}

export default RedirectService
