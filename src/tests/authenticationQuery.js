export const SIGNUP_QUERY = `mutation signup($name: String!, $email: String!, $password: String!) {
  signup(name: $name, email: $email, password: $password) {
    __typename
    ... on SignupResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }
    ... on SignupResultError {
      message
    }
  }
}
`;

export const GENERATE_VERIFICATION_CODE_QUERY = `mutation generateUserVerification($email: String!, $password: String!) {
  verifyUser(email: $email, password: $password) {
    __typename
    ... on UserVerificationResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }
    ... on UserVerificationResultError {
      message
    }
  }
}
`;

export const VERIFY_USER_QUERY = `mutation verifyUser(
  $email: String!
  $password: String!
  $verificationCode: String
) {
  verifyUser(
    email: $email
    password: $password
    verificationCode: $verificationCode
  ) {
    __typename
    ... on UserVerificationResultSuccess {
      user {
        isActive
        name
        email
        isUserVerified
      }
    }
    ... on UserVerificationResultError {
      message
    }
  }
}
`;

export const LOGIN_QUERY = `mutation login($email: String!, $password: String!, $fcmToken: String!) {
  login(email: $email, password: $password, fcmToken: $fcmToken) {
    __typename
    ... on LoginResultSuccess {
      user {
        isActive
        name
        email
        userRoles {
          isActive
          roleName
        }
      }
    }
    ... on LoginResultError {
      message
    }
  }
}
`;

export const LOGIN_TOKEN_QUERY = `mutation login($email: String!, $password: String!, $fcmToken: String!) {
  login(email: $email, password: $password, fcmToken: $fcmToken) {
    __typename
    ... on LoginResultSuccess {
      token
    }  
    ... on LoginResultError {
      message
    }
  }
}
`;
