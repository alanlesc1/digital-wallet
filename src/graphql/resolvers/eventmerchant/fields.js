const eventMerchantFields = {
  EventMerchant: {
    event: async (eventMerchant, _, { db }) => {
      const event = await db.MEvent.findOne({
        where: {
          ...eventMerchant.C_Event_ID,
        },
      });

      const result = {
        __typename: "Event",
        ...event.toJSON()
      };

      return result;
    },

    merchant: async (eventMerchant, _, { db }) => {
      const merchant = await db.MMerchant.findOne({
        where: {
          ...eventMerchant.C_Merchant_ID,
        },
      });

      const result = {
        __typename: "Merchant",
        ...merchant.toJSON()
      };

      return result;
    },
  }
};

export default eventMerchantFields;
