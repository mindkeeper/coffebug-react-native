import ACTION_STRING from '../actions/actionString';

const initialState = {
  profile: {
    username: '',
    first_name: '',
    last_name: '',
    display_name: '',
    genre: '',
    birthday: '',
    address: '',
    image: '',
    phone: '',
    email: '',
  },
  isLoading: false,
  isError: false,
  isFulfilled: false,
  error: null,
};

const userReducer = (prevState = initialState, {type, payload}) => {
  const {getUser, pending, rejected, fulfilled} = ACTION_STRING;
  switch (type) {
    case getUser + pending:
      return {
        ...prevState,
        isLoading: true,
        isError: false,
        isFulfilled: false,
      };
    case getUser + rejected:
      return {
        ...prevState,
        isError: true,
        isLoading: false,
        isFulfilled: false,
        error: payload.error,
        profile: {
          username: null,
          first_name: null,
          last_name: null,
          display_name: null,
          genre: null,
          birthday: null,
          address: null,
          image: null,
          phone: null,
          email: null,
        },
      };
    case getUser + fulfilled:
      return {
        ...prevState,
        isLoading: false,
        isError: false,
        isFulfilled: true,
        profile: {
          username: payload.data.data[0].username,
          first_name: payload.data.data[0].first_name,
          last_name: payload.data.data[0].last_name,
          display_name: payload.data.data[0].display_name,
          genre: payload.data.data[0].genre,
          birthday: payload.data.data[0].birthday,
          address: payload.data.data[0].address,
          image: payload.data.data[0].image,
          phone: payload.data.data[0].phone,
          email: payload.data.data[0].email,
        },
      };

    default:
      return prevState;
  }
};

export default userReducer;
