import EventBus from '@/misc/EventBus'

var idle = {
  interval: 60000,
  timeout: 1, // 1 minute total
  idleCounter: 0,

  expired () {
    EventBus.$emit('rebootEvent')
  },

  checker () {
    document.onmousemove = document.onkeypress = function () {
      this.idleCounter = 0
    }
  },

  timer () {
    var self = this
    window.setInterval(function () {
      if (++self.idleCounter >= self.timeout) {
        self.expired()
      }
    }, this.interval)
  },

  start () {
    this.checker()
    this.timer()
  }
}

export default idle
