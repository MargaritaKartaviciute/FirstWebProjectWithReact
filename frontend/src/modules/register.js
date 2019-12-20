import axios from 'axios';
import { push } from 'react-router-redux';
import IPCONFIG from '../IPCONFIG';

export const REGISTER_STARTED = 'register/REGISTER_STARTED';
export const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'register/REGISTER_FAILURE';


const initialState = {
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_STARTED:
      return { loading: true,
        error: null,
       };
    case REGISTER_SUCCESS:
      return {
        loading:false,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        loading:false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const register = user => {
  return dispatch => {
    dispatch({
      type: REGISTER_STARTED,
    });
    axios
      .post(IPCONFIG + 'api/Account', user)
      .then(result => {
        dispatch(push('/login'));
        dispatch({
          type: REGISTER_SUCCESS,
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAILURE,
          payload: (error.response ? error.response.data : "Nežinoma klaida"),
        });
      });
  };
};
