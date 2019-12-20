import axios from 'axios';
import { push } from 'react-router-redux';
import IPCONFIG from '../IPCONFIG';

export const FETCH_OFFERS_STARTED = 'offers/FETCH_OFFERS_STARTED';
export const FETCH_OFFERS_RECEIVED = 'offers/FETCH_OFFERS_RECEIVED';

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
    default:
      return state;
  }
};

export const fetchUserOffers = id => {
  return dispatch => {
    dispatch({
      type: FETCH_OFFERS_STARTED,
    });
    if (localStorage.getItem('user') !== 'undefined') {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        axios
          .get(IPCONFIG + 'api/Offers/?userid=' + id, {
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
