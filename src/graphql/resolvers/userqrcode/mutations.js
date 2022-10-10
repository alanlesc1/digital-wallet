import { sequelize, MUserQRCode } from '../../../db/models';
import {
  ResultsFactory,
  NotAuthenticatedError,
} from '../../helpers/resultsFactory';

/*
Used to declare the QR Code current schema version.
For version 1.0, data is just the QR Code UUID (table UserQRCodes.uuid) 
*/
const currentQRCodeSchemaVersion = "1.0";

const userQRCodeMutations = {
  userQRCode: async (_, { renew }, { user }) => {
    if (user) {
      try {
        // Deactivate existing active records
        if (renew) {
          await sequelize.query('UPDATE C_UserQrCode SET IsActive = ? WHERE C_User_ID = ?',
            {
              replacements: [false, user.C_User_ID]
            });
        }

        // Find existing
        let existing = await MUserQRCode.findOne({
          where: {
            C_User_ID: user.C_User_ID,
            isActive: true
          },
          order: [
            ['created', 'DESC'],
          ]
        });

        // If not found, create a new one
        if (!existing) {
          existing = await MUserQRCode.create({
            C_User_ID: user.C_User_ID
          });
        } 

        return {
          __typename: "UserQRCode",
          schemaVersion: currentQRCodeSchemaVersion,
          dataType: 'PlainText',
          data: existing.C_UserQrCode_UU
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
