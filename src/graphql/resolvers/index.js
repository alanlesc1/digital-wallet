import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';
import { userPaymentMethodQueries, userPaymentMethodMutations, userPaymentMethodFields } from './userpaymentmethod';
import { merchantQueries, merchantMutations, merchantFields } from './merchant';
import { merchantUserQueries, merchantUserMutations, merchantUserFields } from './merchantuser';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
    ...userPaymentMethodQueries,
    ...merchantQueries,
    ...merchantUserQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
    ...userPaymentMethodMutations,
    ...merchantMutations,
    ...merchantUserMutations,
  },
  ...userFields,
  ...userQRCodeFields,
  ...userPaymentMethodFields,
  ...merchantFields,
  ...merchantUserFields,
};

export default resolvers;
