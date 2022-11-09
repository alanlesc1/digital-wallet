import { messages } from './messages';

module.exports = class PriceListResultError {
  constructor(message) {
    this.__typename = "PriceListResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
