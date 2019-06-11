import EventsService from './EventsService';

class IdleService {
  interval = 60000; // every 10 seconds
  timeout = 5; // 5 minutes reload idle
  idleCounter = 0;
  expirationConfirmed = false;

  constructor (vm) {
    this.vm = vm

    this.events = new EventsService(vm)
  }

  start () {
    this._checker()
    this._timer()
  }

  _expired () {
    // TODO test that
    this.events.reboot()
  }

  _checker () {
    var self = this
    document.onmousemove = document.onkeypress = function () {
      if (self.expirationConfirmed) {
        self._expired()
      } else {
        this.idleCounter = 0
      }
    }
  }

  _timer () {
    var self = this
    window.setInterval(function () {
      if (++self.idleCounter >= self.timeout) {
        self.expirationConfirmed = true
      }
    }, this.interval)
  }
}

export default IdleService
