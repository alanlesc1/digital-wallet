import { messages } from './messages';

module.exports = class ProductCategoryResultError {
  constructor(message) {
    this.__typename = "ProductCategoryResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
