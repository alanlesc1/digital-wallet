import { expect } from 'chai';
import * as authApi from './authenticationApi';
import * as eventApi from './eventApi';

describe('Event', function () {
  let token;

  before(async function () {
    const loginVariables = {
      "email": authApi.DEFAULT_USER_EMAIL,
      "password": authApi.DEFAULT_USER_PASSWORD,
      "fcmToken": authApi.DEFAULT_USER_FCM_TOKEN
    };

    const loginToken = await authApi.loginToken(loginVariables);
    token = loginToken.data.data.login.token;
  });

  it('creates a new event', async function () {
    const variables = {
      "input": {
        "name": authApi.DEFAULT_EVENT_NAME,
        "startDate": authApi.DEFAULT_EVENT_START_DATE,
        "endDate": authApi.DEFAULT_EVENT_END_DATE
      }
    };

    const expectedResult = {
      "data": {
        "createEvent": {
          "C_Event_ID": "1",
          "name": authApi.DEFAULT_EVENT_NAME
        }
      }
    };

    const result = await eventApi.createEvent(token, variables);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates an event', async function () {
    const variables = {
      "C_Event_ID": 1,
      "input": {
        "isActive": true,
        "name": authApi.DEFAULT_EVENT_NAME,
        "startDate": authApi.DEFAULT_EVENT_START_DATE,
        "endDate": authApi.DEFAULT_EVENT_END_DATE
      }
    };

    const expectedResult = {
      "data": {
        "updateEvent": {
          "C_Event_ID": "1",
          "name": authApi.DEFAULT_EVENT_NAME
        }
      }
    };

    const result = await eventApi.updateEvent(token, variables);
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

    const result = await eventApi.returnEvents(token, variables);
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
            "name": authApi.DEFAULT_EVENT_NAME
          },
          "merchant": {
            "name": authApi.DEFAULT_MERCHANT_NAME
          }
        }
      }
    };

    const result = await eventApi.createEventMerchant(token, variables);
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
            "name": authApi.DEFAULT_EVENT_NAME
          },
          "merchant": {
            "name": "Test Merchant"
          }
        }
      }
    };

    const result = await eventApi.updateEventMerchant(token, variables);
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
                "name": authApi.DEFAULT_EVENT_NAME
              },
              "merchant": {
                "name": authApi.DEFAULT_MERCHANT_NAME
              }
            }
          ]
        }
      }
    };

    const result = await eventApi.returnEventMerchants(token, variables);
    expect(result.data).to.eql(expectedResult);
  });
});
