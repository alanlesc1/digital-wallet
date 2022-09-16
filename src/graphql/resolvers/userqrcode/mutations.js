import { sequelize, UserQRCode } from '../../../db/models';
import {
  ResultsFactory,
} from '../../helpers/resultsFactory';

const userQRCodeMutations = {
  userQRCode: async (_, { renew }, { user }) => {
    if (user) {
      try {
        // Deactivate existing active records
        if (renew) {
          await sequelize.query('UPDATE "UserQRCodes" SET "isActive" = ? WHERE "UserId" = ?',
            {
              replacements: [false, user.id]
            });
            console.log(user.id);
        }

        // Find existing
        let existing = await UserQRCode.findOne({
          where: {
            UserId: user.id,
            isActive: true
          },
          order: [
            ['createdAt', 'DESC'],
          ]
        });

        // If not found, create a new one
        if (!existing) {
          existing = await UserQRCode.create({
            UserId: user.id
          });
        }

        return {
          __typename: "UserQRCode",
          dataType: 'PlainText',
          data: existing.uuid
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

export default userQRCodeMutations;
