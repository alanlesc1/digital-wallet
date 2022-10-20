import { messages } from './messages';

module.exports = class LoginResultError {
  constructor(message) {
    this.__typename = "LoginResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
