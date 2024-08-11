import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      organizations {
        id
        name
        users {
          id
          name
          surname
          email
        }
      }
    }
  }
`;
