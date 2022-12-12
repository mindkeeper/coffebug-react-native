import ACTION_STRING from './actionString';
import {
  getProducts as apiGetProducts,
  getDetail as apiGetDetail,
} from '../../modules/api/product';

const {getProducts, getProductDetails, pending, rejected, fulfilled} =
  ACTION_STRING;

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

const productActions = {getProductDetailsThunk, getProductsThunk};

export default productActions;
