import axios from 'axios';
import { push } from 'react-router-redux';
import IPCONFIG from '../IPCONFIG';
export const FETCH_USERS_STARTED = 'users/FETCH_USERS_STARTED';
export const FETCH_USERS_RECEIVED = 'users/FETCH_USERS_RECEIVED';
export const POST_USERS_STARTED = 'users/POST_USERS_STARTED';
export const POST_USERS_RECEIVED = 'users/POST_USERS_RECEIVED';


const initialState = {
  items: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_STARTED:
      return {
        items: [],
        loading: true,
      };
    case FETCH_USERS_RECEIVED:
      return {
        items: action.users,
        loading: false,
      };
    case POST_USERS_STARTED:
      return state;
    default:
      return state;
  }
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch({
      type: FETCH_USERS_STARTED,
    });
    if (localStorage.getItem('user') !== 'undefined') {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user && user.token) {
        axios
          .get(IPCONFIG + 'api/User', {
            headers: { Authorization: 'Bearer ' + user.token },
          })
          .then(result => {
            dispatch({
              type: FETCH_USERS_RECEIVED,
              users: result.data,
            });
          });
      } else dispatch(push('/login'));
    }
  };
};
