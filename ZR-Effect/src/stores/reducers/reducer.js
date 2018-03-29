import { combineReducers } from 'redux';
import work1 from './work';
import app from './app';
import material from './material';
import rotoFrontendActeractive from './roto-frontend-acteractive';

export default combineReducers({
  work1,
  material,
  app,
  rotoFrontendActeractive
});
