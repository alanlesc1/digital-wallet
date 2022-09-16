import { userQueries, userMutations } from './user';
import { userQRCodeQueries, userQRCodeMutations } from './userqrcode';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
  },
};

export default resolvers;
