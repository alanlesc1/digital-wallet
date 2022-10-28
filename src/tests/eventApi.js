import axios from 'axios';
import { API_URL } from './api';

const CREATE_EVENT_GRAPHQL = `mutation createEvent($input: EventInput!) {
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

export const createEvent = async (token, variables) =>
  axios.post(API_URL, {
    query: CREATE_EVENT_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const UPDATE_EVENT_GRAPHQL = `mutation updateEvent($C_Event_ID: ID!, $input: EventInput!) {
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

export const updateEvent = async (token, variables) =>
  axios.post(API_URL, {
    query: UPDATE_EVENT_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_EVENTS_GRAPHQL = `query events($filter: EventFilter!) {
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

export const returnEvents = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_EVENTS_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const CREATE_EVENT_MERCHANT_GRAPHQL = `mutation createEventMerchant($input: EventMerchantInput!) {
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

export const createEventMerchant = async (token, variables) =>
  axios.post(API_URL, {
    query: CREATE_EVENT_MERCHANT_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const UPDATE_EVENT_MERCHANT_GRAPHQL = `mutation updateEventMerchant($C_EventMerchant_ID: ID!, $input: EventMerchantInput!) {
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

export const updateEventMerchant = async (token, variables) =>
  axios.post(API_URL, {
    query: UPDATE_EVENT_MERCHANT_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });

const RETURN_EVENT_MERCHANTS_GRAPHQL = `query eventMerchants($filter: EventMerchantFilter!) {
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

export const returnEventMerchants = async (token, variables) =>
  axios.post(API_URL, {
    query: RETURN_EVENT_MERCHANTS_GRAPHQL,
    variables,
  },
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    });