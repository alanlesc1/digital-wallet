const productFields = {
  Product: {
    productCategory: async (product, _, { db }) => {
      const productCategory = await db.MProductCategory.findOne({
        where: {
          ...product.M_ProductCategory_ID,
        },
      });

      const result = {
        __typename: "ProductCategory",
        ...productCategory.toJSON()
      };

      return result;
    },
  }
};

export default productFields;
