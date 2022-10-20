import { messages } from './messages';

module.exports = class Error {
  constructor(message) {
    this.__typename = "Error";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
