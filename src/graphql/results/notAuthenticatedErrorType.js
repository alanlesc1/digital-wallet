import { messages } from './messages';

module.exports = class NotAuthenticatedError {
  constructor() {
    this.__typename = "NotAuthenticatedError";
    this.message = messages.notAuthenticatedMessage;
  };
};
