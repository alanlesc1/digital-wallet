import { messages } from './messages';

module.exports = class ProductPriceResultError {
  constructor(message) {
    this.__typename = "ProductPriceResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
