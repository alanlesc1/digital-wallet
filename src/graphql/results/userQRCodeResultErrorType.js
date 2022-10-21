import { messages } from './messages';

module.exports = class UserQRCodeResultError {
  constructor(message) {
    this.__typename = "UserQRCodeResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
