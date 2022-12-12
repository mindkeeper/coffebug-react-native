import ACTION_STRING from '../actions/actionString';

const initialState = {
  isLoading: false,
  isError: false,
  error: '',
  products: [],
  productDetail: {},
};

const productReducer = (prevState = initialState, {type, payload}) => {
  const {getProducts, getProductDetails, pending, rejected, fulfilled} =
    ACTION_STRING;
  switch (type) {
    case getProducts.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };

    case getProducts.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case getProducts.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        products: payload.data.data,
      };

    case getProductDetails.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
      };

    case getProductDetails.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case getProductDetails.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        productDetail: payload.data.data,
      };

    default:
      return prevState;
  }
};

export default productReducer;
