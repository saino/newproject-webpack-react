import { add, update, remove, findItem } from '../../utils/array-handle';

/*const defaultState = [
    {
        "id": 52288,
        "user_id": 52938,
        "type": "video",
        "status": 22771,
        "path": "7Ak5CoLCfM.mp4",
        "name": "xxx",
        "properties": {
            "length": 27145,
            "time": 1522141212838,
            "thumbnail": "B3IDRgiONk",
            "width": 30317,
            "height": 18410
        }
    },
    {
        "id": 53856,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10001,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10002,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10003,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10004,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10005,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10006,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10007,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 10008,
        "user_id": 54809,
        "type": "audio",
        "status": 96995,
        "path": "wNnkKjpUI1.mp4",
        "properties": {
            "length": 26145,
            "time": 1522141027690,
            "thumbnail": "ekDTdD0NCx",
            "width": 22139,
            "height": 20868
        }
    },
    {
        "id": 55597,
        "user_id": 56241,
        "type": "image",
        "status": 30756,
        "path": "SWvZzVquzI.mp4",
        "properties": {
            "length": 32390,
            "time": 1522140488698,
            "thumbnail": "GuMhDUHohG",
            "width": 9468,
            "height": 32974
        }
    }
]*/
const defaultState = [];

const actionTypes = {
    "GET_MATERIAL": "GET_MATERIAL",
    "CHANGE_MATERIAL": "CHANGE_MATERIAL"
}

export const changeMaterial = (materialItems) => {
    return  {
        type: actionTypes.CHANGE_MATERIAL,
        materialItems
    };
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.GET_MATERIAL:
      return state;
    case actionTypes.CHANGE_MATERIAL:
      if(Array.isArray(action.materialItems)){
          return [...action.materialItems];
      }
      const tmpState = state.map((materialItem)=>{
          if(materialItem.id===action.materialItems.id){
              return action.materialItems;
          }
          return materialItem;
      })
      return [...tmpState];
    case 'UPLOAD_MATERIAL':
      return add(state, action.material);
    default:
      return state;
  }
}
