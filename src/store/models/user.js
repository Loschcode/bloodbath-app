import GetCurrentUser from '../schemas/user.gql'

export const currentUser = {
  query: GetCurrentUser,
  result ({ data }) {
  }
}
