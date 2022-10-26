import { messages } from './messages';

module.exports = class MerchantUserResultError {
  constructor(message) {
    this.__typename = "MerchantUserResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
