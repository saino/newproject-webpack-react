import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import {combineReducers} from 'redux';
import app from './app';
import user from './user';
import step from './step';
import frame from './frame';
import scene from './scene';
import material from './material';
import imageData from './imageData';
import compose from './compose';
import userWorks from './userWorks';
import rotoProcess from './roto-process';
import work1 from './work1';

const rootReducer = combineReducers({
  app,
  user,
  step,
  scene,
  frame,
  material,
  imageData,
  compose,
  userWorks,
  rotoProcess,
  work1,
});

export default rootReducer;
