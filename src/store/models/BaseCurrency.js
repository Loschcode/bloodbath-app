import { ShowBaseCurrency, IndexBaseCurrencies } from '../schemas/baseCurrency.gql'

export const baseCurrencies = {
  query () {
    return IndexBaseCurrencies
  }
}

export const baseCurrency = {
  query () {
    return ShowBaseCurrency
  },
  variables () {
    return {
      id: this.baseCurrencyId
    }
  },
  skip () {
    return !this.baseCurrencyId
  }
}
