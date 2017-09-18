import { connect } from 'react-redux'
import User from '../components/user/index'

const mapStateToProps=(state)=>{
  return{
      user:{
          login:state.userInfo.login,
          name:state.userInfo.login
      }
  }
}

export default connect(mapStateToProps)(User)