/*
Used to declare the QR Code current schema version.
For version 1.0, data is just the QR Code UUID (table UserQRCodes.uuid) 
*/
const currentQRCodeSchemaVersion = "1.0";

const userQRCodeMutations = {
  renewMyCurrentQRCode: async (_, args, { authUser, db, results }) => {
    if (authUser) {
      try {
        // Deactivate existing active records
        await db.sequelize.query('UPDATE C_UserQrCode SET IsActive = ? WHERE C_User_ID = ?',
          {
            replacements: [false, authUser.C_User_ID]
          });

        // Create a new one
        const existing = await db.MUserQRCode.create({
          C_User_ID: authUser.C_User_ID
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
    } else {
      return results.create(results.NotAuthenticatedError);
    }
  }
};

export default userQRCodeMutations;
