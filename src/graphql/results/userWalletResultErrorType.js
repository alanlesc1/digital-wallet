import { messages } from './messages';

module.exports = class UserWalletResultError {
  constructor(message) {
    this.__typename = "UserWalletResultError";
    this.message = message ? message : messages.serverInternalErrorMessage;
  };
};
