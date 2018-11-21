import gql from 'graphql-tag'

export const currentUser = {
  query: gql`query currentUserQuery {
    currentUser {
      id
      email
    }
  }`,
  result ({ data }) {
  }
}
