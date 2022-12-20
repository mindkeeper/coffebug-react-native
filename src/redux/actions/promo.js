import {getPromos} from '../../modules/api/promo';
import ACTION_STRING from './actionString';

const {getPromo, pending, rejected, fulfilled} = ACTION_STRING;

const getPromoPending = () => ({
  type: getPromo.concat(pending),
});

const getPromoRejected = error => ({
  type: getPromo.concat(rejected),
  payload: {error},
});

const getPromoFulfilled = data => ({
  type: getPromo.concat(fulfilled),
  payload: {data},
});

const getPromoThunk = (query, cbSuccess, cbDenied) => async dispatch => {
  try {
    dispatch(getPromoPending());
    const result = await getPromos(query);
    dispatch(getPromoFulfilled(result.data));
    typeof cbSuccess === 'function' && cbSuccess();
  } catch (error) {
    console.log(error);
    dispatch(getPromoRejected(error));
    typeof cbDenied === 'function' && cbDenied();
  }
};

const promoActions = {getPromoThunk};

export default promoActions;
