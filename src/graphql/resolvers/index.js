import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';
import { userPaymentMethodQueries, userPaymentMethodMutations, userPaymentMethodFields } from './userpaymentmethod';
import { merchantQueries, merchantMutations, merchantFields } from './merchant';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
    ...userPaymentMethodQueries,
    ...merchantQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
    ...userPaymentMethodMutations,
    ...merchantMutations,
  },
  ...userFields,
  ...userQRCodeFields,
  ...userPaymentMethodFields,
  ...merchantFields,
};

export default resolvers;
