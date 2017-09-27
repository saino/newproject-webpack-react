import { connect } from 'react-redux'
import User from '../components/user/index'
import {logout,getUser} from '../actions'

const mapStateToProps=(state)=>{
  return{
      userInfo:{
          userID:state.userInfo.id,
          name:state.userInfo.name,
          nick:state.userInfo.nick
      }
  }
}

export default connect(mapStateToProps,{logout,getUser} )(User)