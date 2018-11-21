import GetCurrentUser from '@/store/gql/user.gql'

export const currentUser = {
  query: GetCurrentUser,
  result ({ data }) {
  }
}
