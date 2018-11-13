import { Model } from '@vuex-orm/core'

export default class User extends Model {
  static entity = 'users'

  static fields () {
    return {
      id: this.increment(),
      email: this.string(''),
      role: this.string(''),
      token: this.string(''),
      createdAt: this.attr(null)
    }
  }
}
