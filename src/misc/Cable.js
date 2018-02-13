import Vue from 'vue'
import ActionCable from 'actioncable'
import DryCable from '@/plugins/DryCable'

var cable = {
  cable: null,

  config: {
    cableDomain: process.env.CABLE
  },

  connect (token) {
    console.log('connect to action cable ...')

    this.cable = ActionCable.createConsumer(`${this.config.cableDomain}/cable?token=${token}`)
    Vue.prototype.$cable = this.cable

    Vue.use(DryCable, this.cable)

    console.log('action cable connected.')
  }
}

console.log('Cable : ' + cable.config.cableDomain)

export default cable
