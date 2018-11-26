import { CreateAnonymousUser, ShowCurrentUser } from '../schemas/user.gql'

export const currentUser = {
  query: ShowCurrentUser,
  result ({ data }) {
  }
}

export const createAnonymousUser = async (vm) => {
  await vm.$apollo.mutate({
    mutation: CreateAnonymousUser,
    variables: {},
    update: (store, { data: { createAnonymousUser } }) => {
      vm.createAnonymousUser = createAnonymousUser
    }
  }).then((data) => {
    return data
  })
}
