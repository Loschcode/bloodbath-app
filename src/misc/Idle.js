import EventBus from '@/misc/EventBus'

var idle = {
  interval: 60000, // every 10 seconds
  timeout: 5, // 5 minutes reload idle
  idleCounter: 0,
  expirationConfirmed: false,

  expired () {
    EventBus.$emit('rebootEvent')
  },

  checker () {
    var self = this
    document.onmousemove = document.onkeypress = function () {
      if (self.expirationConfirmed) {
        self.expired()
      } else {
        this.idleCounter = 0
      }
    }
  },

  timer () {
    var self = this
    window.setInterval(function () {
      if (++self.idleCounter >= self.timeout) {
        self.expirationConfirmed = true
      }
    }, this.interval)
  },

  start () {
    this.checker()
    this.timer()
  }
}

export default idle
