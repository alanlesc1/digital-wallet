import { userQueries, userMutations, userFields } from './user';
import { userQRCodeQueries, userQRCodeMutations, userQRCodeFields } from './userqrcode';
import { userPaymentMethodQueries, userPaymentMethodMutations, userPaymentMethodFields } from './userpaymentmethod';
import { merchantQueries, merchantMutations, merchantFields } from './merchant';
import { merchantUserQueries, merchantUserMutations, merchantUserFields } from './merchantuser';
import { productCategoryQueries, productCategoryMutations, productCategoryFields } from './productcategory';
import { productQueries, productMutations, productFields } from './product';
import { priceListQueries, priceListMutations, priceListFields } from './pricelist';
import { productPriceQueries, productPriceMutations, productPriceFields } from './productprice';
import { eventQueries, eventMutations, eventFields } from './event';
import { eventMerchantQueries, eventMerchantMutations, eventMerchantFields } from './eventmerchant';

const resolvers = {
  Query: {
    ...userQueries,
    ...userQRCodeQueries,
    ...userPaymentMethodQueries,
    ...merchantQueries,
    ...merchantUserQueries,
    ...productCategoryQueries,
    ...productQueries,
    ...priceListQueries,
    ...productPriceQueries,
    ...eventQueries,
    ...eventMerchantQueries,
  },
  Mutation: {
    ...userMutations,
    ...userQRCodeMutations,
    ...userPaymentMethodMutations,
    ...merchantMutations,
    ...merchantUserMutations,
    ...productCategoryMutations,
    ...productMutations,
    ...priceListMutations,
    ...productPriceMutations,
    ...eventMutations,
    ...eventMerchantMutations,
  },
  ...userFields,
  ...userQRCodeFields,
  ...userPaymentMethodFields,
  ...merchantFields,
  ...merchantUserFields,
  ...productCategoryFields,
  ...productFields,
  ...priceListFields,
  ...productPriceFields,
  ...eventFields,
  ...eventMerchantFields,
};

export default resolvers;
