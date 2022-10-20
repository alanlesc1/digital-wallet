module.exports = class SignUpResultSuccess {
  constructor(user) {
    this.__typename = "SignUpResultSuccess";
    this.user = user.toJSON();
  };
};
