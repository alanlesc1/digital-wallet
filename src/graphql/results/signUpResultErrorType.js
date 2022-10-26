import { messages } from './messages';

module.exports = class SignupResultError {
  constructor(message) {
    this.__typename = "SignupResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
