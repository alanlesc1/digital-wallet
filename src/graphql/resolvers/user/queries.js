import { User } from '../../../db/models';

const userQueries = {
  currentUser: async (_, args, { user }) => {
    if (user) {
      return await User.findOne({ where: { id: user.id } });
    }
    
    throw new Error("Not an authenticated user");
  },
};

export default userQueries;
