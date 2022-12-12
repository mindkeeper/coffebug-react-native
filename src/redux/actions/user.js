import ACTION_STRING from './actionString';
import {getUser} from '../../modules/api/user';

const getUserPending = () => ({
  type: ACTION_STRING.getUser.concat(ACTION_STRING.pending),
});

const getUserRejected = error => ({
  type: ACTION_STRING.getUser.concat(ACTION_STRING.rejected),
  payload: {error},
});

const getUserFulfilled = data => ({
  type: ACTION_STRING.getUser.concat(ACTION_STRING.fulfilled),
  payload: {data},
});

const getUserThunk = (token, cbSuccess, cbDenied) => {
  return async dispatch => {
    try {
      dispatch(getUserPending());
      const result = await getUser(token);
      dispatch(getUserFulfilled(result.data));
      typeof cbSuccess === 'function' && cbSuccess();
    } catch (error) {
      dispatch(getUserRejected(error));
      typeof cbDenied === 'function' && cbDenied(error.response.data.msg);
    }
  };
};

const userAction = {
  getUserThunk,
};

export default userAction;
