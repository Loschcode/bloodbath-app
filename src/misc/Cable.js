import Vue from 'vue'
import ActionCable from 'actioncable'
import DryCable from '@/plugins/DryCable'

export default {
  cable: null,

  config: {
    cableDomain: 'ws://localhost:8000'
  },

  connect (token) {
    console.log('connect to action cable ...')

    this.cable = ActionCable.createConsumer(`${this.config.cableDomain}/cable?token=${token}`)
    Vue.prototype.$cable = this.cable

    Vue.use(DryCable, this.cable)

    console.log('action cable connected.')
  }
}
