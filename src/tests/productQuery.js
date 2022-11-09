export const CREATE_PRODUCT_CATEGORY_QUERY = `mutation createProductCategory($input: ProductCategoryInput!) {
  createProductCategory(input: $input) {
    ... on ProductCategory {
      M_ProductCategory_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const UPDATE_PRODUCT_CATEGORY_QUERY = `mutation updateProductCategory($M_ProductCategory_ID: ID!, $input: ProductCategoryInput!) {
  updateProductCategory(M_ProductCategory_ID: $M_ProductCategory_ID, input: $input) {
    ... on ProductCategory {
      M_ProductCategory_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_PRODUCT_CATEGORIES_QUERY = `query productCategories($filter: ProductCategoryFilter!) {
  productCategories(filter: $filter) {
    __typename
    ... on ProductCategories {
      productCategories {
        name
      }
    }
    ... on ProductCategoryResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const CREATE_PRODUCT_QUERY = `mutation createProduct($input: ProductInput!) {
  createProduct(input: $input) {
    ... on Product {
      M_Product_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const UPDATE_PRODUCT_QUERY = `mutation updateProduct($M_Product_ID: ID!, $input: ProductInput!) {
  updateProduct(M_Product_ID: $M_Product_ID, input: $input) {
    ... on Product {
      M_Product_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_PRODUCTS_QUERY = `query products($filter: ProductFilter!) {
  products(filter: $filter) {
    __typename
    ... on Products {
      products {
        name
      }
    }
    ... on ProductResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const CREATE_PRICE_LIST_QUERY = `mutation createPriceList($input: PriceListInput!) {
  createPriceList(input: $input) {
    ... on PriceList {
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const UPDATE_PRICE_LIST_QUERY = `mutation updatePriceList($M_PriceList_ID: ID!, $input: PriceListInput!) {
  updatePriceList(M_PriceList_ID: $M_PriceList_ID, input: $input) {
    ... on PriceList {
      M_PriceList_ID
      name
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_PRICE_LISTS_QUERY = `query priceLists($filter: PriceListFilter!) {
  priceLists(filter: $filter) {
    __typename
    ... on PriceLists {
      priceLists {
        name
      }
    }
    ... on PriceListResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const CREATE_PRODUCT_PRICE_QUERY = `mutation createProductPrice($input: ProductPriceInput!) {
  createProductPrice(input: $input) {
    ... on ProductPrice {
      priceList {
          name
      }
      product {
          name
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const UPDATE_PRODUCT_PRICE_QUERY = `mutation updateProductPrice($M_ProductPrice_ID: ID!, $input: ProductPriceInput!) {
  updateProductPrice(M_ProductPrice_ID: $M_ProductPrice_ID, input: $input) {
    ... on ProductPrice {
      priceList {
          name
      }
      product {
          name
      }
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;

export const RETURN_PRODUCT_PRICES_QUERY = `query productPrices($filter: ProductPriceFilter!) {
  productPrices(filter: $filter) {
    __typename
    ... on ProductPrices {
      productPrices {
        priceList {
            name
        }
        product {
            name
        }
      }
    }
    ... on ProductPriceResultError {
      message
    }
    ... on Error {
      __typename
      message
    }
  }
}
`;
