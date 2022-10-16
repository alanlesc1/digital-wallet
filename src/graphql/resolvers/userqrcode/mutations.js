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
  renewMyCurrentQRCode: async (_, args, { ctx }) => {
    if (ctx) {
      try {
        // Deactivate existing active records
        await sequelize.query('UPDATE C_UserQrCode SET IsActive = ? WHERE C_User_ID = ?',
          {
            replacements: [false, ctx.C_User_ID]
          });

          // Create a new one
        const existing = await MUserQRCode.create({
          C_User_ID: ctx.C_User_ID
        });

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
