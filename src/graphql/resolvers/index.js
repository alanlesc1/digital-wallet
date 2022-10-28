import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';
import { userPaymentMethodQueries, userPaymentMethodMutations, userPaymentMethodFields } from './userpaymentmethod';
import { merchantQueries, merchantMutations, merchantFields } from './merchant';
import { merchantUserQueries, merchantUserMutations, merchantUserFields } from './merchantuser';
import { eventQueries, eventMutations, eventFields } from './event';
import { eventMerchantQueries, eventMerchantMutations, eventMerchantFields } from './eventmerchant';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
    ...userPaymentMethodQueries,
    ...merchantQueries,
    ...merchantUserQueries,
    ...eventQueries,
    ...eventMerchantQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
    ...userPaymentMethodMutations,
    ...merchantMutations,
    ...merchantUserMutations,
    ...eventMutations,
    ...eventMerchantMutations,
  },
  ...userFields,
  ...userQRCodeFields,
  ...userPaymentMethodFields,
  ...merchantFields,
  ...merchantUserFields,
  ...eventFields,
  ...eventMerchantFields,
};

export default resolvers;
