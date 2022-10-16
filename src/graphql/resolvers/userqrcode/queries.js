import { MUserQRCode } from '../../../db/models';
import {
  ResultsFactory,
  UserQRCodeNotFoundError,
  NotAuthenticatedError,
  Error
} from '../../helpers/resultsFactory';

/*
Used to declare the QR Code current schema version.
For version 1.0, data is just the QR Code UUID (table UserQRCodes.uuid) 
*/
const currentQRCodeSchemaVersion = "1.0";

const userQRCodeQueries = {
  myCurrentQRCode: async (_, args, { ctx }) => {
    if (ctx) {
      try {
        // Find existing
        let existing = await MUserQRCode.findOne({
          where: {
            C_User_ID: ctx.C_User_ID,
            isActive: true
          },
          order: [
            ['created', 'DESC'],
          ]
        });

        // If not found, return an error
        if (!existing) {
          return ResultsFactory.create({ type: UserQRCodeNotFoundError });
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

export default userQRCodeQueries;
