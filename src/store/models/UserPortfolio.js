import { ShowUserPortfolio } from '../schemas/UserPortfolio.gql'

export const userPortfolio = {
  query: ShowUserPortfolio,
  result ({ data }) {
    console.log('userPortfolio received')
  }
}
