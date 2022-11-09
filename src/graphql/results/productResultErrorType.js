import { messages } from './messages';

module.exports = class ProductResultError {
  constructor(message) {
    this.__typename = "ProductResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
