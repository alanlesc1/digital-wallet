/*
Used to declare the QR Code current schema version.
For version 1.0, data is just the QR Code UUID (table UserQRCodes.uuid) 
*/
const currentQRCodeSchemaVersion = "1.0";

const userQRCodeQueries = {
  myCurrentQRCode: async (_, args, { authUser, db, results }) => {
    if (authUser) {
      try {
        // Find existing
        let existing = await db.MUserQRCode.findOne({
          where: {
            C_User_ID: authUser.C_User_ID,
            isActive: true
          },
          order: [
            ['created', 'DESC'],
          ]
        });

        // If not found, return an error
        if (!existing) {
          return results.create(results.UserQRCodeNotFoundError);
        }

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

export default userQRCodeQueries;
