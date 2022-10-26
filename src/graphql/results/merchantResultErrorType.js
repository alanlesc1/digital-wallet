import { messages } from './messages';

module.exports = class MerchantResultError {
  constructor(message) {
    this.__typename = "MerchantResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
