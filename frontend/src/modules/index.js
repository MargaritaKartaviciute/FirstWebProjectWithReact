import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import offers from './offers';
import offer from './offer';
import register from './register';
import login from './login';
import profile from './profile';
import users from './users';
import userOffers from './userOffers';

export default combineReducers({
  routing: routerReducer,
  offers,
  offer,
  register,
  login,
  profile,
  users,
  userOffers,
});
