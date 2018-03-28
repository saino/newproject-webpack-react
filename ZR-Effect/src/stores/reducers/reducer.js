import { combineReducers } from 'redux';
import user from './user';
import work1 from './work';
import app from './app';
import material from './material'

export default combineReducers({
  user,
  work1,
  material,
  app
});
