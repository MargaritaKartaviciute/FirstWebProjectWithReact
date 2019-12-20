import axios from 'axios';
import IPCONFIG from '../IPCONFIG';


export const FETCH_PROFILE_STARTED = 'profile/FETCH_PROFILE_STARTED';
export const FETCH_PROFILE_SUCCESS = 'profile/FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILED = 'profile/FETCH_PROFILE_FAILED';
export const AVATAR_PHOTO_CHANGED = 'login/AVATAR_PHOTO_CHANGED';

const initialState = {
  loading: true,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_STARTED:
      return {
        loading: true,
        user: {},
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        loading: false,
        user: {
          ...action.payload,
        },
      };
    case FETCH_PROFILE_FAILED:
      return {
        loading: false,
        user: {},
      };
    default:
      return state;
  }
};

export const fetchProfile = (id, UserIdWhoFetches) => {
  return dispatch => {
    dispatch({
      type: FETCH_PROFILE_STARTED,
    });
    let user = JSON.parse(localStorage.getItem('user'));
    axios
      .get(
        IPCONFIG + 'api/user/withEndorses/' +
          id +
          '?endorserId=' +
          UserIdWhoFetches,
        { headers: { Authorization: 'Bearer ' + user.token } }
      )
      .then(result => {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: result.data,
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_PROFILE_FAILED,
        });
      });
  };
};

export const updateProfilePhoto = (newPhoto) => {
  return dispatch => {
    dispatch({
      type: AVATAR_PHOTO_CHANGED,
      payload: newPhoto
    });
  };
};
