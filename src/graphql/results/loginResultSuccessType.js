module.exports = class LoginResultSuccess {
  constructor({ token, user }) {
    this.__typename = "LoginResultSuccess";
    this.token = token;
    this.user = user.toJSON();
  };
};
