import { Model } from '@vuex-orm/core'

export default class CurrentUser extends Model {
  static entity = 'currentUsers'

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
