import { combineReducers } from 'redux';
import work from './work';
import app from './app';
import material from './material';
import videoMaterial from "./video-mateiral";
import rotoFrontendActeractive from './roto-frontend-acteractive';
import roto from './roto';
import pagination from './pagination'

export default combineReducers({
  work,
  material,
  videoMaterial,
  pagination,
  app,
  rotoFrontendActeractive,
  roto,
});
