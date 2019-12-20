import axios from 'axios';
import { push } from 'react-router-redux';
import IPCONFIG from '../IPCONFIG';


export const LOGIN_STARTED = 'login/LOGIN_STARTED';
export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'login/LOGIN_FAILURE';
export const LOGOUT = 'login/LOGOUT';

export const AVATAR_PHOTO_CHANGED = 'login/AVATAR_PHOTO_CHANGED';
export const PHOTO_RECEIVED = 'login/PHOTO_RECEIVED';
export const PHOTO_FETCH_STARTED = 'login/PHOTO_FETCH_STARTED';


const initialState = {
  loggedIn: false,
  loading: true,
  user: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loggedIn: false,
        loading: true,
        user: null,
        error: null, 
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        loading: false,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: null,
      };
    case AVATAR_PHOTO_CHANGED:
    return {
      ...state,
      user: {
        ...state.user,
        avatarPhoto: action.payload,
        error: null,
      }
    }
    case PHOTO_RECEIVED:
    return {
      ...state,
      avatarLoaded: true,
      user: {
        ...state.user,
        avatarPhoto: action.payload
      }
    }
    case PHOTO_FETCH_STARTED: 
    return {
      ...state,
      avatarLoaded: false
    }
    default:
      return state;
  }
};

export const login = (Email, Password) => {
  return dispatch => {
    dispatch({
      type: LOGIN_STARTED,
      user: {
        Email,
        Password,
      },
    });
    axios
      .post(IPCONFIG + 'api/Account/authenticate', {
        Email,
        Password,
      })
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result.data));
        dispatch(push('/offers'));
        dispatch({
          type: LOGIN_SUCCESS,
          user: result.data,
        });
      })
      .catch(error => {
        console.dir(error);
        dispatch({
          type: LOGIN_FAILURE,
          payload: (error.response ? error.response.data : "Prasome prisijungti is naujo"),
        });
      });
  };
};

export const logout = () => {
  localStorage.removeItem('user');
  return dispatch => {
    dispatch({
      type: LOGOUT,
    });
  };
};

export const takeTokenFromLocalStorage = () => dispatch => {
  let token = JSON.parse(localStorage.getItem('user'));
  if (token) {
    dispatch({
      type: LOGIN_SUCCESS,
      user: token,
    });
  } else {
    dispatch({
      type: LOGIN_FAILURE,
      payload: null
    });
  }
};

export const fetchPhoto = (userId) => {
  return dispatch => {
    dispatch({
      type: PHOTO_FETCH_STARTED
    })
    axios.get("http://localhost:5000/api/user/photo/" + userId, {
      headers: { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token },
    })
    .then(response => {
      dispatch({
        type: PHOTO_RECEIVED,
        payload: response.data
      })
    })
   
  }
}
