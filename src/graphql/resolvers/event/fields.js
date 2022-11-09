const eventFields = {
  Event: {
    priceList: async (event, _, { db }) => {
      const priceList = await db.MPriceList.findOne({
        where: {
          ...event.M_PriceList_ID,
        },
      });

      const result = {
        __typename: "PriceList",
        ...priceList.toJSON()
      };

      return result;
    },
  }
};

export default eventFields;
