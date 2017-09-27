import { connect } from 'react-redux'
import Profile from '../components/user/profile'
import {updateUser,getUser,getUserSuc,getUserFailure} from '../actions'

const mapStateToProps=(state)=>{
  return{
      userInfo:{
          userID:state.userInfo.id,
          name:state.userInfo.name,
          nick:state.userInfo.nick,
          qq:state.userInfo.qq
      }
  }
}

export default connect(mapStateToProps,{updateUser,getUser,getUserSuc,getUserFailure} )(Profile)