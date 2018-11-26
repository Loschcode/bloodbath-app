import { CreateAnonymousUser, ShowCurrentUser } from '../schemas/user.gql'

export const currentUser = {
  query: ShowCurrentUser,
  result ({ data }) {
  }
}

export const createAnonymousUser = async () => {
  await this.$apollo.mutate({
    mutation: CreateAnonymousUser,
    variables: {}
  })
}
