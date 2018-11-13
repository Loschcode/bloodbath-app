// User Model
import { Model } from '@vuex-orm/core'

export default class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.increment(),
      email: this.string(''),
      role: this.string(''),
      token: this.string(''),

      created_at: this.attr(''),
      updated_at: this.attr(''),
      last_seen_at: this.attr('')
    }
  }
}

// has_one :user_setting, dependent: :delete
// has_one :user_portfolio, dependent: :delete
// has_one :user_watchlist, dependent: :delete
//
// has_many :watchlist_coins, through: :user_watchlist
// has_many :portfolio_coins, through: :user_portfolio
