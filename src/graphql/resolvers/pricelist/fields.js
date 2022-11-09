const priceListFields = {
  PriceList: {
    productPrices: async (priceList, _, { db }) => {
      const productPrices = await db.MProductPrice.findAll({
        where: {
          ...priceList.M_PriceList_ID,
        },
      });

      const result = productPrices.map(element => {
        return {
          __typename: "ProductPrice",
          ...element.toJSON()
        }
      });

      return result;
    },
  }
};

export default priceListFields;
