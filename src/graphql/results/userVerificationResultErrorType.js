import { messages } from './messages';

module.exports = class UserVerificationResultError {
  constructor(message) {
    this.__typename = "UserVerificationResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
