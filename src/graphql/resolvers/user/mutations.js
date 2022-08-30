import { User } from '../../../db/models';
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { jwtSecret } from '../../../../src/config/environment';

const userMutations = {
  signUp: async (_, { name, email, password }) => {
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return jsonwebtoken.sign({ id: user.id, login: user.login }, jwtSecret, {
      expiresIn: "3m",
    });
  },
  login: async (_, { email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);

      if (valid) {
        return jsonwebtoken.sign({ id: user.id, email: user.email }, jwtSecret, {
          expiresIn: "1d",
        });
      }
    }

    throw new Error("Invalid email/password");
  },
};

export default userMutations;
