import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';
import { userPaymentMethodQueries, userPaymentMethodMutations, userPaymentMethodFields } from './userpaymentmethod';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
    ...userPaymentMethodQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
    ...userPaymentMethodMutations,
  },
  ...userFields,
  ...userQRCodeFields,
  ...userPaymentMethodFields,
};

export default resolvers;
