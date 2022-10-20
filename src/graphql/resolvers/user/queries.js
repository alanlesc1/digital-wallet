const userQueries = {
  me: async (_, args, { authUser, db, results }) => {
    if (authUser) {
      try {
        const userModel = await db.MUser.findOne({
          where: { C_User_ID: authUser.C_User_ID },
        });

        return {
          __typename: "User",
          ...userModel.toJSON()
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

export default userQueries;
