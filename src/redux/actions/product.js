import ACTION_STRING from './actionString';
import {
  getProducts as apiGetProducts,
  getDetail as apiGetDetail,
  createProduct as apiCreateProduct,
} from '../../modules/api/product';

const {
  getProducts,
  getProductDetails,
  createProduct,
  pending,
  rejected,
  fulfilled,
} = ACTION_STRING;

const getProductsPending = () => ({
  type: getProducts.concat(pending),
});

const getProductsRejected = error => ({
  type: getProducts.concat(rejected),
  payload: {error},
});

const getProductsFulfilled = data => ({
  type: getProducts.concat(fulfilled),
  payload: {data},
});

const getProductDetailsPending = () => ({
  type: getProductDetails.concat(pending),
});

const getProductDetailsRejected = error => ({
  type: getProductDetails.concat(rejected),
  payload: {error},
});

const getProductDetailsFulfilled = data => ({
  type: getProductDetails.concat(fulfilled),
  payload: {data},
});

const createProductPending = () => ({
  type: createProduct.concat(pending),
});

const createProductRejected = error => ({
  type: createProduct.concat(rejected),
  payload: {error},
});

const createProductFulfilled = data => ({
  type: createProduct.concat(fulfilled),
  payload: {data},
});

const getProductsThunk = (query, cbSuccess, cbDenied) => {
  return async dispacth => {
    try {
      dispacth(getProductsPending());
      const result = await apiGetProducts(query);
      dispacth(getProductsFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispacth(getProductsRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const getProductDetailsThunk = (id, cbSuccess, cbDenied) => {
  return async dispacth => {
    try {
      dispacth(getProductDetailsPending());
      const result = await apiGetDetail(id);
      dispacth(getProductDetailsFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispacth(getProductDetailsRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const createProductThunk =
  (body, token, cbSuccess, cbDenied) => async dispacth => {
    try {
      dispacth(createProductPending());
      const result = await apiCreateProduct(body, token);
      dispacth(createProductFulfilled(result.data));
      typeof cbSuccess() === 'function' && cbSuccess(result.data.data.id);
    } catch (error) {
      console.log(error);
      dispacth(createProductRejected(error));
      typeof cbDenied === 'function' && cbDenied();
    }
  };

const productActions = {
  getProductDetailsThunk,
  getProductsThunk,
  createProductThunk,
};

export default productActions;
