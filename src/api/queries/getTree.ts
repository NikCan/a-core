import { gql } from '@apollo/client';

export const GET_TREE = gql`
  query GetTree {
    modelTreeClasses {
      searched
      tree {
        id
        name
        description
        sort
        classTypes {
          id
          name
          description
          sort
          standard
          code
        }
        children {
          id
          name
          description
          children {
            id
            name
            description
            children {
              id
              name
              description
              children {
                id
                name
                description
                children {
                  id
                  name
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`;
