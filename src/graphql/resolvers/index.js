import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
  },
  ...userFields,
  ...userQRCodeFields,
};

export default resolvers;
