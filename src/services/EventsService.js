import EventBus from '@/misc/EventBus'

class EventsService {
  constructor (vm) {
    this.vm = vm
  }

  /**
  * All the event bus related things
  */
  setup () {
    this._setupRebootEvent()
    this._setupCrashEvent()
    this._setupErrorEvent()
  }

  // private

  _refreshPage () {
    window.location.reload()
  }

  /**
  * We put a listener to the rebootEvent
  * when a crash needs a reboot and clear cache / session
  * we use this command
  */
  _setupRebootEvent () {
    EventBus.$on('rebootEvent', error => {
      if (error) {
        console.log(error)
        localStorage.clear()
      }
      this._refreshPage()
    })
  }

  /**
  * We put a listener to the crashEvent
  * This kind of error is major and lock the application itself
  * until the person refreshes the page entirely
  */
  _setupCrashEvent () {
    EventBus.$on('crashEvent', error => {
      if (error.message === 'Network Error') {
        this.vm.error = {
          message: 'Oh snap ! There is a network error, please refresh the page.',
          raw: error
        }
      } else {
        this.vm.error = {
          message: 'Oh snap ! Something went wrong, please refresh the page.',
          raw: error
        }
      }
    })
  }

  /**
  * We put a listener to the errorEvent
  * This kind of errors is minor and dispatch an error message
  */
  _setupErrorEvent () {
    EventBus.$on('errorEvent', error => {
      this.vm.$noty.error(error)
    })
  }
}

export default EventsService
