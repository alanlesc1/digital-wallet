import { messages } from './messages';

module.exports = class UserWalletNotFoundError {
  constructor() {
    this.__typename = "UserWalletNotFoundError";
    this.message = messages.userWalletNotFoundMessage;
  };
};
