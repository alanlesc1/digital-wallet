export const CREATE_EVENT_QUERY = `mutation createEvent($input: EventInput!) {
  createEvent(input: $input) {
    ... on Event {
      C_Event_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const UPDATE_EVENT_QUERY = `mutation updateEvent($C_Event_ID: ID!, $input: EventInput!) {
  updateEvent(C_Event_ID: $C_Event_ID, input: $input) {
    ... on Event {
      C_Event_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_EVENTS_QUERY = `query events($filter: EventFilter!) {
  events(filter: $filter) {
    __typename
    ... on Events {
      events {
        name
      }
    }
    ... on EventResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const CREATE_EVENT_MERCHANT_QUERY = `mutation createEventMerchant($input: EventMerchantInput!) {
  createEventMerchant(input: $input) {
    ... on EventMerchant {
      event {
        name
      }
      merchant {
          name
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const UPDATE_EVENT_MERCHANT_QUERY = `mutation updateEventMerchant($C_EventMerchant_ID: ID!, $input: EventMerchantInput!) {
  updateEventMerchant(C_EventMerchant_ID: $C_EventMerchant_ID, input: $input) {
    ... on EventMerchant {
      event {
        name
      }
      merchant {
          name
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_EVENT_MERCHANTS_QUERY = `query eventMerchants($filter: EventMerchantFilter!) {
  eventMerchants(filter: $filter) {
    __typename
    ... on EventMerchants {
      eventMerchants {
        event {
          name
        }
        merchant {
            name
        }
      }
    }
    ... on EventMerchantResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;
