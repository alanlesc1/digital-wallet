import { messages } from './messages';

module.exports = class UserQRCodeNotFoundError {
  constructor() {
    this.__typename = "UserQRCodeNotFoundError";
    this.message = messages.userQRCodeNotFoundMessage;
  };
};
