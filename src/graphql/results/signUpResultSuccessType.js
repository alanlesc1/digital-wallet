module.exports = class SignupResultSuccess {
  constructor(user) {
    this.__typename = "SignupResultSuccess";
    this.user = user.toJSON();
  };
};
