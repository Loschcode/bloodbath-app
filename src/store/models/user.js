import GetCurrentUser from '@/store/schemas/user.gql'

export const currentUser = {
  query: GetCurrentUser,
  result ({ data }) {
  }
}
