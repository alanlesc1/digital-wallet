const productPriceFields = {
  ProductPrice: {
    priceList: async (productPrice, _, { db }) => {
      const priceList = await db.MPriceList.findOne({
        where: {
          ...productPrice.M_PriceList_ID,
        },
      });

      const result = {
        __typename: "PriceList",
        ...priceList.toJSON()
      };

      return result;
    },

    product: async (productPrice, _, { db }) => {
      const product = await db.MProduct.findOne({
        where: {
          ...productPrice.M_Product_ID,
        },
      });

      const result = {
        __typename: "Product",
        ...product.toJSON()
      };

      return result;
    },
  }
};

export default productPriceFields;
