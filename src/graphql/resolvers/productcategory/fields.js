const productCategoryFields = {
  ProductCategory: {
    parentProductCategory: async (productCategory, _, { db }) => {
      const pc = await db.MProductCategory.findOne({
        where: {
          ...productCategory.parent_ProductCategory_ID,
        },
      });

      const result = {
        __typename: "ProductCategory",
        ...pc.toJSON()
      };

      return result;
    },
  }
};

export default productCategoryFields;
