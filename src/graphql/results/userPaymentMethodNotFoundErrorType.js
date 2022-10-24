import { messages } from './messages';

module.exports = class UserPaymentMethodNotFoundError {
  constructor() {
    this.__typename = "UserPaymentMethodNotFoundError";
    this.message = messages.userPaymentMethodNotFoundMessage;
  };
};
