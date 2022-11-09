import { expect } from 'chai';
import * as api from './api';
import * as authQuery from './authenticationQuery';
import * as eventQuery from './eventQuery';
import * as testData from './testData';

describe('Event', function () {
  let token;

  before(async function () {
    const loginVariables = {
      "email": testData.DEFAULT_USER_EMAIL,
      "password": testData.DEFAULT_USER_PASSWORD,
      "fcmToken": testData.DEFAULT_USER_FCM_TOKEN
    };

    const loginToken = await api.request(authQuery.LOGIN_TOKEN_QUERY, loginVariables, null);
    token = loginToken.data.data.login.token;
  });

  it('creates a new event', async function () {
    const variables = {
      "input": {
        "name": testData.DEFAULT_EVENT_NAME,
        "startDate": testData.DEFAULT_EVENT_START_DATE,
        "endDate": testData.DEFAULT_EVENT_END_DATE
      }
    };

    const expectedResult = {
      "data": {
        "createEvent": {
          "C_Event_ID": "1",
          "name": testData.DEFAULT_EVENT_NAME
        }
      }
    };

    const result = await api.request(eventQuery.CREATE_EVENT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates an event', async function () {
    const variables = {
      "C_Event_ID": 1,
      "input": {
        "isActive": true,
        "name": testData.DEFAULT_EVENT_NAME,
        "startDate": testData.DEFAULT_EVENT_START_DATE,
        "endDate": testData.DEFAULT_EVENT_END_DATE
      }
    };

    const expectedResult = {
      "data": {
        "updateEvent": {
          "C_Event_ID": "1",
          "name": testData.DEFAULT_EVENT_NAME
        }
      }
    };

    const result = await api.request(eventQuery.UPDATE_EVENT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of events', async function () {
    const variables = {
      "filter": {
        "publicId": "VDIXZF7CCBUN"
      }
    };

    const expectedResult = {
      "data": {
        "events": {
          "__typename": "Events",
          "events": []
        }
      }
    };

    const result = await api.request(eventQuery.RETURN_EVENTS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new event merchant', async function () {
    const variables = {
      "input": {
        "C_Event_ID": 1,
        "C_Merchant_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "createEventMerchant": {
          "event": {
            "name": testData.DEFAULT_EVENT_NAME
          },
          "merchant": {
            "name": testData.DEFAULT_MERCHANT_NAME
          }
        }
      }
    };

    const result = await api.request(eventQuery.CREATE_EVENT_MERCHANT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates an event merchant', async function () {
    const variables = {
      "C_EventMerchant_ID": 1,
      "input": {
        "isActive": true,
        "C_Event_ID": 1,
        "C_Merchant_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "updateEventMerchant": {
          "event": {
            "name": testData.DEFAULT_EVENT_NAME
          },
          "merchant": {
            "name": testData.DEFAULT_MERCHANT_NAME
          }
        }
      }
    };

    const result = await api.request(eventQuery.UPDATE_EVENT_MERCHANT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of event merchants', async function () {
    const variables = {
      "filter": {
        "C_Event_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "eventMerchants": {
          "__typename": "EventMerchants",
          "eventMerchants": [
            {
              "event": {
                "name": testData.DEFAULT_EVENT_NAME
              },
              "merchant": {
                "name": testData.DEFAULT_MERCHANT_NAME
              }
            }
          ]
        }
      }
    };

    const result = await api.request(eventQuery.RETURN_EVENT_MERCHANTS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });
});
