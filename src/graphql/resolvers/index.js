import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';
import { userWalletQueries, userWalletMutations, userWalletFields } from './userwallet';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
    ...userWalletQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
    ...userWalletMutations,
  },
  ...userFields,
  ...userQRCodeFields,
  ...userWalletFields,
};

export default resolvers;
