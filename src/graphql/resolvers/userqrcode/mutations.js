import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../authorization';

/*
Used to declare the QR Code current schema version.
For version 1.0, data is just the QR Code UUID (table UserQRCodes.uuid) 
*/
const currentQRCodeSchemaVersion = "1.0";

const userQRCodeMutations = {
  renewUserCurrentQRCode: combineResolvers(
    isAuthenticated,
    async (_, { C_User_ID }, { db, results }) => {
      try {
        // Deactivate existing active records
        await db.sequelize.query('UPDATE C_UserQrCode SET IsActive = ? WHERE C_User_ID = ?',
          {
            replacements: [false, C_User_ID]
          });

        // Create a new one
        const existing = await db.MUserQRCode.create({
          C_User_ID,
        });

        return {
          __typename: "UserQRCode",
          schemaVersion: currentQRCodeSchemaVersion,
          dataType: 'PlainText',
          data: existing.C_UserQrCode_UU
        };
      } catch (error) {
        console.error(error);
        return results.create(results.Error);
      }
    }
  )
};

export default userQRCodeMutations;
