import { User } from '../../../db/models';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from '../../../../src/config/environment';
import { generateNewVerification, verifyCode } from '../../../helpers/userVerification';

const userMutations = {
  signUp: async (_, { name, email, password }) => {
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return user;
  },
  verifyUser: async (_, { email, password, verificationCode }) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        if (user.isUserVerified)
          throw new Error("User is already verified!");

        if (!user.verificationCode && verificationCode)
          throw new Error("Generate a verification code first!");

        // Check for previously generated verification code
        if (verificationCode) {
          await verifyCode(user, verificationCode);
        }
        // Generate a new verification code
        else {
          await generateNewVerification(user);
        }

        await user.reload();
        return user;
      }
    }

    throw new Error("Invalid email/password");
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        if (!user.isUserVerified)
          throw new Error("Not a verified user");

        const token = jsonwebtoken.sign({ id: user.id, email: user.email }, jwtSecret, {
          expiresIn: "1d",
        });

        return { token: token, user: { ...user.toJSON() } };
      }
    }

    throw new Error("Invalid email/password");
  },
};

export default userMutations;
