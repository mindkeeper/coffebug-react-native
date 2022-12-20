import ACTION_STRING from '../actions/actionString';

const initialState = {
  isLoading: false,
  isError: false,
  error: '',
  promos: [],
  pagination: {},
};

const promoReducer = (prevState = initialState, {type, payload}) => {
  const {getPromo, pending, fulfilled, rejected} = ACTION_STRING;

  switch (type) {
    case getPromo.concat(pending):
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        error: '',
      };

    case getPromo.concat(rejected):
      return {
        ...prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case getPromo.concat(fulfilled):
      const newData = payload.data.data;
      const page = payload.data.meta.page;
      return {
        ...prevState,
        isLoading: false,
        promos: page > 1 ? [...prevState.promos, ...newData] : newData,
        pagination: payload.data.meta,
      };

    default:
      return prevState;
  }
};

export default promoReducer;
