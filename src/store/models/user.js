import { CreateAnonymousUser, GetCurrentUser } from '../schemas/user.gql'

export const currentUser = {
  query: GetCurrentUser,
  result ({ data }) {
  }
}

export const createAnonymousUser = async () => {
  await this.$apollo.mutate({
    mutation: CreateAnonymousUser,
    variables: {}
  })
}

// async {
//     // Call to the graphql mutation
//     const result = await this.$apollo.mutate({
//       // Query
//       mutation: gql`mutation ($label: String!) {
//         addTag(label: $label) {
//           id
//           label
//         }
//       }`,
//       // Parameters
//       variables: {
//         label: this.newTag,
//       },
//     })
//   }
