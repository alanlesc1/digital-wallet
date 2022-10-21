import { messages } from './messages';

module.exports = class InvalidCardError {
  constructor() {
    this.__typename = "InvalidCardError";
    this.message = messages.invalidCardErrorMessage;
  };
};
