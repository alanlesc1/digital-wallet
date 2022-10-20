module.exports = class UserVerificationResultSuccess {
  constructor(user) {
    this.__typename = "UserVerificationResultSuccess";
    this.user = user.toJSON();
  };
};
