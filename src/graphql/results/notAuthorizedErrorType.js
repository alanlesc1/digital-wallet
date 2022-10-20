import { messages } from './messages';

module.exports = class NotAuthorizedError {
  constructor() {
    this.__typename = "NotAuthorizedError";
    this.message = messages.notAuthorizedMessage;
  };
};
