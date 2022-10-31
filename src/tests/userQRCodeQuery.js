export const RETURN_USER_CURRENT_QRCODE_QUERY = `query userCurrentQRCode($C_User_ID: ID!) {
  userCurrentQRCode(C_User_ID: $C_User_ID) {
    __typename
    ... on UserQRCode {
      schemaVersion
      dataType
    }

    ... on UserQRCodeResultError {
      message
    }

    ... on Error {
      message
    }
  }
}
`;

export const RENEW_USER_CURRENT_QRCODE_QUERY = `mutation renewUserCurrentQRCode($C_User_ID: ID!) {
  renewUserCurrentQRCode(C_User_ID: $C_User_ID) {
        __typename
        ... on UserQRCode {
          schemaVersion
          dataType
        }
    
        ... on UserQRCodeResultError {
          message
        }
    
        ... on Error {
          message
        }
      }
    }
    `;
