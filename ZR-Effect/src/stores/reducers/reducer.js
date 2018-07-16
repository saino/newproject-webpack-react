import { combineReducers } from 'redux';
import work from './work';
import app from './app';
import material from './material';
import videoMaterial from "./video-mateiral";
import rotoFrontendActeractive from './roto-frontend-acteractive';
import roto from './roto';
import rotoAi from './roto-ai';
import rotoMaterial from './roto-material';
import rotoMaterialTemp from './roto-material-temp';
import pagination from './pagination';
import frame from './frame-num';
import userMaterial from './user-material';

export default combineReducers({
  work,
  material,
  videoMaterial,
  pagination,
  frame,
  rotoMaterial,
  app,
  rotoAi,
  rotoMaterialTemp,
  rotoFrontendActeractive,
  roto,
  userMaterial
});
