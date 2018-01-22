<script>
import _ from 'lodash'
/**
* DRYCABLE allows you to subscribe and unsubscribe to channels easily
*/
export default {
  /**
  * We transmit the `cable` at intitialization
  * and DRY it up.
  */
  install (Vue, cable) {
    Vue.prototype.$drycable = {
      currentChannels: [],

      /**
      * We unsubscribe the channels
      */
      unsubscribeAll () {
        this.currentChannels.forEach(function (channel, index, object) {
          channel.unsubscribe()
          object.splice(index, 1)
        })
        console.log('unsubscribed all channels')
      },

      unsubscribe (channel) {
        channel.unsubscribe()
        console.log(`unsubscribed from ${channel}`)
      },

      /**
      * subscribe to a channel
      * @param  {object} scope context from VueJS
      * @param  {string} modelName a camelCase model name
      * @param  {function} onShow a specific callback to mutate data mnanually (optional)
      *
      * USE CASES
      *
      * You can use it in a very DRY way to refresh the variable depending the context
      * this will automatically mutate this.marketCoin from the calling place (scope + model)
      * and work with the reactiveness of VueJS
      *
       this.$drycable.subscribe(this, 'marketCoin')
      *
      * You can use it with custom callback so it changes whatever you want within your system -
      * It is especially useful in case of VueX Store or things like that which can't mutate variables
      * like this.marketCoin but have to commit() the changes and render through computed()
      *
       this.$drycable.subscribe(this, 'marketCoin', function (channel, marketCoin) {
         vm.channel = channel
         vm.$store.commit('setMarketCoin', marketCoin)
       })
      *
      */
      subscribe (scope, modelName, onShow) {
        const channelName = _.upperFirst(`${modelName}Channel`)
        const receivedModel = _.snakeCase(modelName)

        /**
        * We subscribe to the correct channel
        * e.g. MarketCoinChannel
        */
        var channel = cable.subscriptions.create(
          { channel: channelName, id: scope[modelName].id },
          {
            connected (data) {
              console.log(`connected to ${channelName}.${scope[modelName].id}`)
            },

            /**
            * Now we split the different actions
            * and act accordingly
            */
            received (data) {
              if (data.action === 'show') {
                console.log(`received data from ${channelName}.${scope[modelName].id}`)
                /**
                 * We can make a specific action onShow if we have something like a store
                 * and the refresh is complicated to setup
                 */
                if (_.isUndefined(onShow)) {
                  scope[modelName] = data[receivedModel]
                } else {
                  onShow(channel, data[receivedModel])
                }
              }
            }
          }
        )
        this.currentChannels.push(channel)
        return channel
      }
    }
  }
}
</script>
