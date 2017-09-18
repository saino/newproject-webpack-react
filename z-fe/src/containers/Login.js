import { connect } from 'react-redux'
import Login from '../components/login'
import { login } from '../actions'

const mapStateToProps=(state)=>{
    return{
        login:state.userInfo.login,
    }
  }
export default connect(mapStateToProps, {login})(Login)