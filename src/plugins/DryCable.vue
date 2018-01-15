<script>
import _ from 'lodash'

export default {
  /**
   * We transmit the `cable` at intitialization
   * and DRY it up.
   */
  install (Vue, cable) {
    Vue.prototype.$drycable = {
      /**
       * subscribe to a channel
       * @param  {object} scope     context from vuejs
       * @param  {string} modelName a camelCase model name
       */
      subscribe (scope, modelName) {
        const channel = _.upperFirst(`${modelName}Channel`)
        const receivedModel = _.snakeCase(modelName)

        /**
         * We subscribe to the correct channel
         * e.g. MarketCoinChannel
         */
        cable.subscriptions.create(
          { channel: channel, id: scope[modelName].id },
          {
            connected (data) {
              console.log(`connected to ${channel}`)
              // this.perform('ping')
            },

            /**
             * Now we split the different actions
             * and act accordingly
             */
            received (data) {
              if (data.action === 'show') {
                scope[modelName] = data[receivedModel]
              }
            }
          }
        )
      }
    }
  }
}
</script>
