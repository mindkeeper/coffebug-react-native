import ACTION_STRING from '../actions/actionString';

const initialState = {
  isLoading: false,
  isError: false,
  error: '',
  products: [],
  pagination: {},
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
      const newProduct = payload.data.data;
      const page = payload.data.meta.page;
      return {
        ...prevState,
        isLoading: false,
        products:
          page > 1 ? [...prevState.products, ...newProduct] : newProduct,
        pagination: payload.data.meta,
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
