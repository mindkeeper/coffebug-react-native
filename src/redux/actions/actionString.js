const ACTION_STRING = {
  register: 'AUTH_REGISTER',
  login: 'AUTH_LOGIN',
  forgot: 'AUTH_FORGOT',
  reset: 'AUTH_RESET',
  logout: 'AUTH_LOGOUT',
  getUser: 'GET_USER',
  getProducts: 'GET_PRODUCTS',
  getProductDetails: 'GET_PRODUCT_DETAILS',
  createTransaction: 'CREATE_TRANSACTION',
  transactionData: 'TRANSACTION_DATA',
  getHistory: 'GET_HiSTORY',
  pending: '_PENDING',
  fulfilled: '_FULFILLED',
  rejected: '_REJECTED',
};

export default ACTION_STRING;
