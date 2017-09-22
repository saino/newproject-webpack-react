import { connect } from 'react-redux'
import Work from '../components/user/works'
import {logout} from '../actions'

const mapStateToProps=(state)=>{
  return{
      user:{
          userID:state.userInfo.id,
          name:state.userInfo.login,
          fullInfo:state.userInfo.fullInfo
      }
  }
}

export default connect(mapStateToProps,{logout} )(Work)