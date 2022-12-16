import ACTION_STRING from '../actions/actionString';

const initialState = {
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: '',
  cart: {
    productId: '',
    price: '',
    image: '',
    productName: '',
    sizeId: '',
    qty: 0,
    promoId: '1',
    deliveryId: '',
    paymentId: '',
    subtotal: 0,
  },
  history: [],
  pagination: {},
};

const transactionReducer = (prevState = initialState, {type, payload}) => {
  const {
    createTransaction,
    getHistory,
    transactionData,
    transactionReset,
    pending,
    rejected,
    fulfilled,
  } = ACTION_STRING;
  switch (type) {
    case createTransaction.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case createTransaction.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case createTransaction.concat(fulfilled):
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
      };

    case getHistory.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getHistory.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case getHistory.concat(fulfilled):
      const newHistory = payload.data.data;
      const page = payload.data.meta.page;
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        history: page > 1 ? [...prevState.history, ...newHistory] : newHistory,
        pagination: payload.data.meta,
      };

    case transactionData:
      return {
        ...prevState,
        cart: {
          productId: payload.data.productId,
          price: payload.data.price,
          image: payload.data.image,
          productName: payload.data.productName,
          qty: payload.data.qty || 0,
          sizeId: payload.data.sizeId,
          promoId: '1',
          deliveryId: payload.data.deliveryId || '',
          paymentId: payload.data.paymentId || '',
          subtotal: payload.data.subtotal || 0,
        },
      };

    case transactionReset:
      return initialState;

    default:
      return prevState;
  }
};

export default transactionReducer;
