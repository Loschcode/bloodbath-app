import router from '@/router'

class RedirectService {
  constructor (vm, { userSetting }) {
    this.vm = vm
    this.userSetting = userSetting
  }

  fromIndex (userPortfolio) {
    if (this._hasPortfolio(userPortfolio)) {
      this._goPortfolio()
    } else {
      this._goWatchlist()
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

  _hasPortfolio (userPortfolio) {
    return userPortfolio.portfolioCoins.length > 0
  }

  _isWeather () {
    return this.userSetting.weather
  }
}

export default RedirectService
