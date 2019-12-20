import axios from 'axios';
import IPCONFIG from '../IPCONFIG';


export const FETCH_OFFER_STARTED = 'login/FETCH_OFFER_STARTED';
export const FETCH_OFFER_SUCCESS = 'login/FETCH_OFFER_SUCCESS';
export const FETCH_OFFER_FAILED = 'login/FETCH_OFFER_FAILED';


const initialState = {
  offer: {},
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFER_STARTED:
      return {
        loading: true,
        offer: {},
      };
    case FETCH_OFFER_SUCCESS:
      return {
        loading: false,
        offer: {
          ...action.payload,
        },
      };
    case FETCH_OFFER_FAILED:
      return {
        loading: false,
        offer: {},
      };
    default:
      return state;
  }
};

export const fetchOffer = id => {
  return dispatch => {
    dispatch({
      type: FETCH_OFFER_STARTED,
    });
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .get(IPCONFIG + 'api/Offers/' + id, {
        headers: { Authorization: 'Bearer ' + user.token },
      })
      .then(result => {
        dispatch({
          type: FETCH_OFFER_SUCCESS,
          payload: result.data,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_OFFER_FAILED,
        });
      });
  };
};
