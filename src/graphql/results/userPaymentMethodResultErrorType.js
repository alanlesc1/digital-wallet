import { messages } from './messages';

module.exports = class UserPaymentMethodResultError {
  constructor(message) {
    this.__typename = "UserPaymentMethodResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
