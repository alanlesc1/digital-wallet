import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

const userPaymentMethodQueries = {
  userPaymentMethods: combineResolvers(
    isAuthenticated,
    async (_, args, { db, results }) => {
      try {
        const paymentMethods = await db.MUserPaymentMethod.findAll({
          where: {
            C_User_ID: args.filter.C_User_ID,
          },
        });

        const result = {
          __typename: "UserPaymentMethods",
          userPaymentMethods: paymentMethods.map(element => {
            return {
              __typename: "UserPaymentMethod",
              ...element.toJSON()
            }
          })
        };

        return result;
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    }
  )
};

export default userPaymentMethodQueries;
