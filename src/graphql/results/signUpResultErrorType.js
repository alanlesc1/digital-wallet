import { messages } from './messages';

module.exports = class SignUpResultError {
  constructor(message) {
    this.__typename = "SignUpResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
