import { MUser, MUserRole } from '../../../db/models';
import {
  ResultsFactory,
  NotAuthenticatedError,
  Error
} from '../../helpers/resultsFactory';

const userQueries = {
  me: async (_, args, { ctx }) => {
    if (ctx) {
      try {
        const userModel = await MUser.findOne({
          where: { C_User_ID: ctx.C_User_ID },
          include: {
            model: MUserRole,
            as: 'userRoles'
          }
        });

        return {
          __typename: "User",
          ...userModel.toJSON()
        };
      } catch (error) {
        console.error(error);
        return ResultsFactory.create({ type: Error });
      }
    } else {
      return ResultsFactory.create({ type: NotAuthenticatedError });
    }
  }
};

export default userQueries;
