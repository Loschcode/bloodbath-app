/**
 * Because the Javascript is a piece of crap where everyone rewrite fuck everything
 * I decided to make helpers to go faster at writing stores
 */
import _ from 'lodash'

export default {
  /**
   * we set the entry within the store or replace it
   */
  // NOTE : no idea if this works
  set (store, entry, matcher) {
    let current = store.find(current => current[matcher] === entry[matcher])
    if (_.isUndefined(current)) {
      store.push(entry)
    } else {
      let index = store.indexOf(current)
      store.splice(index, 1, entry)
    }
    return store
  }
}
