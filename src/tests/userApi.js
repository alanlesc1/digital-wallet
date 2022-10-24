import axios from 'axios';
import { API_URL } from './api';

const RETURN_CURRENT_USER_GRAPHQL = `query me {
  me {
    __typename
    ... on User {
      isActive
      name
      email
    }

    ... on NotAuthenticatedError {
      message
    }

    ... on Error {
      message
    }
  }
}
`;

export const returnCurrentUser = async token =>
  axios.post(API_URL, {
    query: RETURN_CURRENT_USER_GRAPHQL,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });
