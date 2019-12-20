import axios from 'axios';
import { push } from 'react-router-redux';
import IPCONFIG from '../IPCONFIG';
export const FETCH_OFFERS_STARTED = 'offers/FETCH_OFFERS_STARTED';
export const FETCH_OFFERS_RECEIVED = 'offers/FETCH_OFFERS_RECEIVED';
export const POST_OFFER_STARTED = 'offers/POST_OFFER_STARTED';
export const POST_OFFER_RECEIVED = 'offers/POST_OFFER_RECEIVED';


const initialState = {
  items: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFERS_STARTED:
      return {
        items: [],
        loading: true,
      };
    case FETCH_OFFERS_RECEIVED:
      return {
        items: action.offers,
        loading: false,
      };
    case POST_OFFER_STARTED:
      return state;
    default:
      return state;
  }
};

export const fetchOffers = () => {
  return dispatch => {
    dispatch({
      type: FETCH_OFFERS_STARTED,
    });
    if (localStorage.getItem('user') !== 'undefined') {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        axios
          .get(IPCONFIG + 'api/Offers', {
            headers: { Authorization: 'Bearer ' + user.token },
          })
          .then(result => {
            dispatch({
              type: FETCH_OFFERS_RECEIVED,
              offers: result.data,
            });
          });
      } else dispatch(push('/login'));
    }
  };
};

export const postNewOffer = offer => {
  return dispatch => {
    dispatch({
      type: POST_OFFER_STARTED,
    });
    axios.post(IPCONFIG + 'api/Offers', offer).then(result => {
      dispatch({
        type: POST_OFFER_RECEIVED,
        newOffer: result.data,
      });
    });
  };
};
