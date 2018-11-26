import Cable from '@/misc/Cable'
import _ from 'lodash'
import { createAnonymousUser } from '@/store/models/User'

class ConnectService {
  constructor (vm, userToken) {
    this.vm = vm
    this.userToken = userToken
  }

  /**
  * We take care of the connection
  */
  perform () {
    if (!_.isNil(this.userToken)) {
      this._connectAll(this.userToken)
    } else {
      this._connectAnonymous()
    }

    console.log('userToken : ' + this.userToken)
    this._connectCable()
  }

  /**
  * process the anonymous log-in
  * this will create a new user
  * and connect it completely
  */
  async _connectAnonymous () {
    console.log('connect anonymous ...')
    const response = await createAnonymousUser(this.vm)
    localStorage.setItem('userToken', response.token)
  }

  /**
  * ensure connection on action cable
  * and the classic AJAX
  */
  _connectAll () {
    console.log('connectAll with : ' + this.userToken)
    this._connectCable()
  }

  /**
  * connect to the action cable system
  */
  _connectCable () {
    Cable.connect(this.userToken)
  }
}

export default ConnectService
