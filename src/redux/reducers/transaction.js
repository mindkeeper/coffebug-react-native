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
    size_id: '',
    qty: 0,
    promo_id: '1',
    delivery_id: '',
    payment_id: '',
    subtotal: 0,
  },
  history: [],
};

const transactionReducer = (prevState = initialState, {type, payload}) => {
  const {
    createTransaction,
    getHistory,
    transactionData,
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
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        history: payload.data.data,
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
          size_id: payload.data.sizeId,
          promo_id: '1',
          delivery_id: payload.data.deliveryId || '',
          payment_id: payload.data.paymentId || '',
          subtotal: payload.data.subtotal || 0,
        },
      };

    default:
      return prevState;
  }
};

export default transactionReducer;
