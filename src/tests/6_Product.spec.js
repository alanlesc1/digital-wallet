import { expect } from 'chai';
import * as api from './api';
import * as authQuery from './authenticationQuery';
import * as productQuery from './productQuery';
import * as testData from './testData';

describe('Product', function () {
  let token;

  before(async function () {
    const loginVariables = {
      "email": testData.DEFAULT_USER_EMAIL,
      "password": testData.DEFAULT_USER_PASSWORD,
      "fcmToken": testData.DEFAULT_USER_FCM_TOKEN
    };

    const loginToken = await api.request(authQuery.LOGIN_TOKEN_QUERY, loginVariables, null);
    token = loginToken.data.data.login.token;
  });

  it('creates a new product category', async function () {
    const variables = {
      "input": {
        "value": testData.DEFAULT_PRODUCT_CATEGORY_VALUE,
        "name": testData.DEFAULT_PRODUCT_CATEGORY_NAME
      }
    };

    const expectedResult = {
      "data": {
        "createProductCategory": {
          "M_ProductCategory_ID": "1",
          "name": testData.DEFAULT_PRODUCT_CATEGORY_NAME
        }
      }
    };

    const result = await api.request(productQuery.CREATE_PRODUCT_CATEGORY_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates a product category', async function () {
    const variables = {
      "M_ProductCategory_ID": 1,
      "input": {
        "value": testData.DEFAULT_PRODUCT_CATEGORY_VALUE,
        "name": testData.DEFAULT_PRODUCT_CATEGORY_NAME
      }
    };

    const expectedResult = {
      "data": {
        "updateProductCategory": {
          "M_ProductCategory_ID": "1",
          "name": testData.DEFAULT_PRODUCT_CATEGORY_NAME
        }
      }
    };

    const result = await api.request(productQuery.UPDATE_PRODUCT_CATEGORY_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of product categories', async function () {
    const variables = {
      "filter": {
        "name": testData.DEFAULT_PRODUCT_CATEGORY_NAME
      }
    };

    const expectedResult = {
      "data": {
        "productCategories": {
          "__typename": "ProductCategories",
          "productCategories": [
            {
              "name": testData.DEFAULT_PRODUCT_CATEGORY_NAME
            }
          ]
        }
      }
    };

    const result = await api.request(productQuery.RETURN_PRODUCT_CATEGORIES_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new product', async function () {
    const variables = {
      "input": {
        "value": testData.DEFAULT_PRODUCT_VALUE,
        "name": testData.DEFAULT_PRODUCT_NAME,
        "productType": testData.DEFAULT_PRODUCT_TYPE,
        "M_ProductCategory_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "createProduct": {
          "M_Product_ID": "1",
          "name": testData.DEFAULT_PRODUCT_NAME
        }
      }
    };

    const result = await api.request(productQuery.CREATE_PRODUCT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates a product', async function () {
    const variables = {
      "M_Product_ID": 1,
      "input": {
        "value": testData.DEFAULT_PRODUCT_VALUE,
        "name": testData.DEFAULT_PRODUCT_NAME,
        "productType": testData.DEFAULT_PRODUCT_TYPE,
        "M_ProductCategory_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "updateProduct": {
          "M_Product_ID": "1",
          "name": testData.DEFAULT_PRODUCT_NAME
        }
      }
    };

    const result = await api.request(productQuery.UPDATE_PRODUCT_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of products', async function () {
    const variables = {
      "filter": {
        "name": testData.DEFAULT_PRODUCT_NAME
      }
    };

    const expectedResult = {
      "data": {
        "products": {
          "__typename": "Products",
          "products": [
            {
              "name": testData.DEFAULT_PRODUCT_NAME
            }
          ]
        }
      }
    };

    const result = await api.request(productQuery.RETURN_PRODUCTS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new price list', async function () {
    const variables = {
      "input": {
        "name": testData.DEFAULT_PRICE_LIST_NAME
      }
    };

    const expectedResult = {
      "data": {
        "createPriceList": {
          "name": testData.DEFAULT_PRICE_LIST_NAME
        }
      }
    };

    const result = await api.request(productQuery.CREATE_PRICE_LIST_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates a price list', async function () {
    const variables = {
      "M_PriceList_ID": 1,
      "input": {
        "name": testData.DEFAULT_PRICE_LIST_NAME
      }
    };

    const expectedResult = {
      "data": {
        "updatePriceList": {
          "M_PriceList_ID": "1",
          "name": testData.DEFAULT_PRICE_LIST_NAME
        }
      }
    };

    const result = await api.request(productQuery.UPDATE_PRICE_LIST_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of price lists', async function () {
    const variables = {
      "filter": {
        "name": testData.DEFAULT_PRICE_LIST_NAME
      }
    };

    const expectedResult = {
      "data": {
        "priceLists": {
          "__typename": "PriceLists",
          "priceLists": [
            {
              "name": testData.DEFAULT_PRICE_LIST_NAME
            }
          ]
        }
      }
    };

    const result = await api.request(productQuery.RETURN_PRICE_LISTS_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('creates a new product price', async function () {
    const variables = {
      "input": {
        "M_PriceList_ID": 1,
        "M_Product_ID": 1,
        "listPrice": testData.DEFAULT_PRODUCT_PRICE
      }
    };

    const expectedResult = {
      "data": {
        "createProductPrice": {
          "priceList": {
            "name": testData.DEFAULT_PRICE_LIST_NAME
          },
          "product": {
            "name": testData.DEFAULT_PRODUCT_NAME
          }
        }
      }
    };

    const result = await api.request(productQuery.CREATE_PRODUCT_PRICE_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('updates a product price', async function () {
    const variables = {
      "M_ProductPrice_ID": 1,
      "input": {
        "listPrice": testData.DEFAULT_PRODUCT_PRICE
      }
    };

    const expectedResult = {
      "data": {
        "updateProductPrice": {
          "priceList": {
            "name": testData.DEFAULT_PRICE_LIST_NAME
          },
          "product": {
            "name": testData.DEFAULT_PRODUCT_NAME
          }
        }
      }
    };

    const result = await api.request(productQuery.UPDATE_PRODUCT_PRICE_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });

  it('returns an array of product prices', async function () {
    const variables = {
      "filter": {
        "M_PriceList_ID": 1
      }
    };

    const expectedResult = {
      "data": {
        "productPrices": {
          "__typename": "ProductPrices",
          "productPrices": [
            {
              "priceList": {
                "name": testData.DEFAULT_PRICE_LIST_NAME
              },
              "product": {
                "name": testData.DEFAULT_PRODUCT_NAME
              }
            }
          ]
        }
      }
    };

    const result = await api.request(productQuery.RETURN_PRODUCT_PRICES_QUERY, variables, token);
    expect(result.data).to.eql(expectedResult);
  });
});
